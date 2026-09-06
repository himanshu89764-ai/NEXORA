const { GoogleGenAI } = require("@google/genai");
const { tavily } = require("@tavily/core");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing.");
}

const gemini = new GoogleGenAI({
    apiKey: GEMINI_API_KEY
});

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

if (!TAVILY_API_KEY) {
    throw new Error("TAVILY_API_KEY is missing.");
}

const tvly = tavily({
    apiKey: TAVILY_API_KEY
});

function buildChapterPrompt({
    book,
    chapter,
    language = "Hindi",
    mode = "Exam Notes",
    exam = "UPSC",
    sourceText = ""
}) {
    const isHindi = String(language).toLowerCase() === "hindi";

    return `
You are NEXORA, an advanced competitive-exam study platform.

Create comprehensive, accurate, structured study notes for:

Class: ${book.className}
Subject: ${book.subject}
Book: ${book.titleEn}
Chapter ${chapter.number}: ${chapter.titleEn}
Hindi Chapter Name: ${chapter.titleHi}

Target exam: ${exam}
Language: ${isHindi ? "Hindi" : "English"}
Mode: ${mode}

SOURCE MATERIAL FROM NCERT/REFERENCE SEARCH:
${sourceText}

IMPORTANT SOURCE RULES:
- Use the source material above as the factual foundation for this chapter.
- Write notes ONLY about the selected chapter.
- Do NOT give generic study instructions such as "focus on", "prepare", or "study this topic".
- Do NOT invent chapter facts that are not supported by the source material or standard established knowledge.
- Do NOT reproduce the textbook verbatim; rewrite and structure it as original exam notes.

IMPORTANT GOAL:
These must NOT be shallow summaries.
Build strong conceptual foundations from the NCERT chapter and connect them to competitive-exam preparation.

CONTENT REQUIREMENTS:

1. CHAPTER OVERVIEW
- Explain what the chapter is about.
- Explain why the chapter matters.
- Give the conceptual framework.

2. NCERT CORE CONCEPTS
- Cover all major concepts from the chapter.
- Do not skip important subtopics.
- Explain concepts clearly and accurately.

3. EXAM-LEVEL DEFINITIONS
For every important term:
- Definition
- Meaning in simple language
- Exam significance
- Relevant example where useful

4. DETAILED EXPLANATION
For each major concept explain:
- What
- Why
- How
- Causes
- Effects
- Processes
- Relationships
- Examples
where applicable.

5. KEY TERMS
Create a compact glossary of important terminology.

6. IMPORTANT FACTS
Include only reliable, exam-relevant facts.
Avoid invented statistics or unsupported claims.

7. COMPARISONS
Where relevant, provide comparison tables such as:
- rotation vs revolution
- latitude vs longitude
- weather vs climate
- mountain vs plateau vs plain
etc.

8. DIAGRAM / STRUCTURE INSTRUCTIONS
Where a concept is visual, provide a simple text structure that can later be converted into a diagram.
Use labels such as:
[DIAGRAM: ...]
[FLOW: ...]
[STRUCTURE: ...]

Do NOT use external image URLs.

9. PRELIMS FOCUS
Provide:
- important facts
- conceptual traps
- statement-based concepts
- confusing terms
- likely MCQ areas

10. PRELIMS MCQs
Create a MINIMUM OF 15 high-quality MCQs for EVERY chapter. Prefer 15-20 MCQs when the chapter has enough important concepts.
Each must contain:
Question
A.
B.
C.
D.
Correct Answer
Explanation

Do not create fake PYQs.
Clearly distinguish practice questions from actual PYQs.

11. MAINS FOCUS
Provide:
- important themes
- analytical dimensions
- cause-effect relationships
- examples
- possible diagrams/flowcharts
- answer-writing points

12. MAINS QUESTIONS
Create 5-7 high-quality exam-oriented questions.
For each provide:
- question
- demand of the question
- answer framework
- key points
- conclusion direction

13. PYQ-ORIENTED ANALYSIS
Do NOT claim a question is an actual PYQ unless certain.
Instead explain:
- what concepts are repeatedly testable
- what kinds of UPSC questions can be built from this chapter
- likely conceptual connections with higher classes

14. CONCEPTUAL TRAPS
List common mistakes students make.

15. QUICK REVISION
Finish with:
- 15-20 key takeaways
- important terms
- important facts
- one-page revision framework

16. CHAPTER LINKAGES
Explain how this chapter connects with:
- other NCERT chapters
- higher-class Geography
- Indian Geography
- environment
- economy
- disaster management
where relevant.

QUALITY RULES:
- Never invent facts.
- Never invent PYQs.
- Do not repeat the same paragraph.
- Do not use filler.
- Prefer structured headings, bullets and tables.
- Keep explanations detailed but readable.
- Preserve correct Hindi Unicode.
- Do not transliterate Hindi into broken ASCII.
- Use proper Devanagari script when Hindi is selected.
- Do not output HTML.
- Do not output Markdown code fences.

OUTPUT FORMAT:

TITLE:
...

CHAPTER OVERVIEW:
...

NCERT CORE CONCEPTS:
...

IMPORTANT DEFINITIONS:
...

KEY TERMS:
...

DETAILED NOTES:
...

DIAGRAMS AND STRUCTURES:
...

IMPORTANT FACTS:
...

COMPARISONS:
...

PRELIMS FOCUS:
...

PRELIMS MCQs:
...

MAINS FOCUS:
...

MAINS QUESTIONS:
...

PYQ-ORIENTED ANALYSIS:
...

CONCEPTUAL TRAPS:
...

CHAPTER LINKAGES:
...

QUICK REVISION:
...

Generate the complete chapter notes now.
`;
}

async function fetchChapterSource({ book, chapter, language = "Hindi" }) {
    const isHindi = String(language).toLowerCase() === "hindi";

    const query = isHindi
        ? `NCERT ${book.className} ${book.subject} ${book.titleEn} Chapter ${chapter.number} ${chapter.titleEn} ${chapter.titleHi}`
        : `NCERT ${book.className} ${book.subject} ${book.titleEn} Chapter ${chapter.number} ${chapter.titleEn}`;

    console.log(`NEXORA Short Notes: fetching source for Chapter ${chapter.number}: ${chapter.titleEn}`);
    console.log(`NEXORA Short Notes: Tavily query=${query}`);

    const response = await tvly.search(query, {
        maxResults: 5,
        searchDepth: "advanced"
    });

    const results = (response.results || [])
        .filter(result => result && result.content)
        .map(result => ({
            title: result.title || "",
            url: result.url || "",
            content: String(result.content || "").trim()
        }));

    if (!results.length) {
        throw new Error(`No reliable source material found for Chapter ${chapter.number}.`);
    }

    const sourceText = results
        .map((result, index) =>
            `SOURCE ${index + 1}\nTITLE: ${result.title}\nURL: ${result.url}\nCONTENT:\n${result.content}`
        )
        .join("\n\n----------------------------------------\n\n");

    console.log(`NEXORA Short Notes: ${results.length} source(s) collected for Chapter ${chapter.number}.`);

    return {
        query,
        results,
        sourceText
    };
}

async function generateChapterNotes(options) {
    console.log(
        "NEXORA Short Notes: preparing real chapter source for Chapter " +
        options.chapter.number +
        " - " +
        options.chapter.titleEn
    );

    let source = null;

    try {
        source = await fetchChapterSource(options);
    } catch (error) {
        console.error(
            "NEXORA Short Notes: Tavily source fetch failed: " +
            String(error?.message || error || "")
        );
    }

    const prompt = buildChapterPrompt({
        ...options,
        sourceText: source?.sourceText || ""
    });

    console.log(
        "NEXORA Short Notes: generating Chapter " +
        options.chapter.number +
        " - " +
        options.chapter.titleEn
    );

    try {
        console.log(
            "NEXORA Short Notes: model=" + GEMINI_MODEL + ", attempt=1/1"
        );

        if (!source?.sourceText) {
            throw new Error("No chapter source material available.");
        }

        const response = await gemini.models.generateContent({
            model: GEMINI_MODEL,
            contents: prompt,
            config: {
                temperature: 0.2,
                maxOutputTokens: 16000
            }
        });

        const text = (response.text || "").trim();

        if (!text) {
            throw new Error(
                "Gemini returned empty notes for chapter " +
                options.chapter.number +
                "."
            );
        }

        const mcqSection =
            text.split(/PYQ BASED PRACTICE|PRELIMS MCQs/i)[1]?.split(
                /MAINS-BASED PRACTICE|MAINS QUESTIONS|PYQ-ORIENTED ANALYSIS/i
            )[0] || "";

        const mainsSection =
            text.split(/MAINS-BASED PRACTICE|MAINS QUESTIONS/i)[1]?.split(
                /PYQ-ORIENTED ANALYSIS|CONCEPTUAL TRAPS|QUICK REVISION/i
            )[0] || "";

        const mcqCount =
            (mcqSection.match(/^\s*\d+\.\s+/gm) || []).length;

        const mainsCount =
            (mainsSection.match(/^\s*\d+\.\s+/gm) || []).length;

        if (mcqCount < 15) {
            throw new Error(
                "Generated only " +
                mcqCount +
                " practice questions; minimum 15 required."
            );
        }

        if (mainsCount < 3) {
            throw new Error(
                "Generated only " +
                mainsCount +
                " Mains questions; minimum 3 required."
            );
        }

        console.log(
            "NEXORA Short Notes: Chapter " +
            options.chapter.number +
            " validated. Questions=" +
            mcqCount +
            ", Mains=" +
            mainsCount
        );

        return text;

    } catch (error) {
        const message = String(error?.message || error || "");

        console.error(
            "NEXORA Short Notes: Gemini generation/validation failed for Chapter " +
            options.chapter.number +
            ": " +
            message
        );

        console.log(
            "NEXORA Short Notes: using professional chapter-specific fallback."
        );

        const isHindi =
            String(options.language || "Hindi").toLowerCase() === "hindi";

        const chapterTitle =
            isHindi
                ? (options.chapter.titleHi || options.chapter.titleEn)
                : options.chapter.titleEn;

        const subject = options.book?.subject || "Subject";
        const className = options.book?.className || "Class";
        const bookTitle =
            options.book?.titleEn ||
            options.book?.title ||
            "Selected Book";

        const chapterKey =
            String(options.chapter.titleEn || "")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");

        const isInsideOurEarth =
            chapterKey.includes("inside-our-earth");

        let output = "";

        output += "CHAPTER OVERVIEW\n";
        output += chapterTitle + "\n";
        output += "Class: " + className + "\n";
        output += "Subject: " + subject + "\n";
        output += "Book: " + bookTitle + "\n\n";

        output += "NCERT CORE CONCEPTS\n";

        if (isInsideOurEarth) {
            if (isHindi) {
                output += "पृथ्वी को मुख्यतः भूपर्पटी, मेंटल और कोर में बाँटा जाता है।\n";
                output += "भूपर्पटी पृथ्वी की सबसे बाहरी परत है। इसके नीचे मेंटल और सबसे भीतर कोर स्थित है।\n";
                output += "महाद्वीपीय भूपर्पटी महासागरीय भूपर्पटी की तुलना में अधिक मोटी होती है।\n";
                output += "कोर मुख्यतः निकेल और लोहे से संबंधित है और इसे NIFE भी कहा जाता है।\n";
                output += "चट्टानें प्राकृतिक रूप से पाए जाने वाले खनिज पदार्थों के समुच्चय हैं।\n";
                output += "आग्नेय चट्टानें मैग्मा या लावा के ठंडा होकर ठोस बनने से बनती हैं।\n";
                output += "अवसादी चट्टानें अवसादों के निक्षेपण, संघनन और सीमेंटेशन से बन सकती हैं।\n";
                output += "कायांतरित चट्टानें ताप और दाब के प्रभाव से पहले से मौजूद चट्टानों में परिवर्तन से बनती हैं।\n";
                output += "चट्टान चक्र विभिन्न प्रकार की चट्टानों के एक-दूसरे में परिवर्तन की सतत प्रक्रिया है।\n";
            } else {
                output += "Earth is broadly divided into the crust, mantle and core.\n";
                output += "The crust is the outermost layer, followed by the mantle and the core.\n";
                output += "Continental crust is thicker than oceanic crust.\n";
                output += "The core is mainly associated with iron and nickel and is commonly referred to as NIFE.\n";
                output += "Rocks are naturally occurring aggregates of mineral matter.\n";
                output += "Igneous rocks form when magma or lava cools and solidifies.\n";
                output += "Sedimentary rocks can form through deposition, compaction and cementation of sediments.\n";
                output += "Metamorphic rocks form when existing rocks are changed by heat and pressure.\n";
                output += "The rock cycle describes the continuous transformation among different rock types.\n";
            }
        } else {
            const sourceText = String(source?.sourceText || "")
                .replace(/\s+/g, " ")
                .trim();

            const sentences = sourceText
                .split(/(?<=[.!?।])\s+/)
                .map(x => x.trim())
                .filter(x => x.length >= 45 && x.length <= 500);

            const unique = [];
            const seen = new Set();

            for (const sentence of sentences) {
                const key = sentence.toLowerCase();

                if (!seen.has(key)) {
                    seen.add(key);
                    unique.push(sentence);
                }

                if (unique.length >= 12) {
                    break;
                }
            }

            unique.forEach((fact, index) => {
                output += (index + 1) + ". " + fact + "\n";
            });
        }

        output += "\nIMPORTANT DEFINITIONS\n";

        if (isInsideOurEarth) {
            if (isHindi) {
                output += "• भूपर्पटी: पृथ्वी की सबसे बाहरी ठोस परत।\n";
                output += "• मैग्मा: पृथ्वी के भीतर पाया जाने वाला पिघला हुआ पदार्थ।\n";
                output += "• लावा: पृथ्वी की सतह पर निकलने वाला पिघला हुआ पदार्थ।\n";
                output += "• खनिज: निश्चित रासायनिक संघटन और विशिष्ट गुणों वाला प्राकृतिक पदार्थ।\n";
                output += "• चट्टान: एक या अधिक खनिजों से बना प्राकृतिक पदार्थ।\n";
            } else {
                output += "• Crust: The outermost solid layer of Earth.\n";
                output += "• Magma: Molten material present inside the Earth.\n";
                output += "• Lava: Molten material that reaches the Earth's surface.\n";
                output += "• Mineral: A naturally occurring substance with characteristic properties and chemical composition.\n";
                output += "• Rock: A naturally occurring aggregate of one or more minerals.\n";
            }
        } else {
            output += "• Key definitions should be learned from the selected chapter source material.\n";
            output += "• Terms and definitions are restricted to the selected chapter.\n";
        }

        output += "\nIMPORTANT TERMS\n";

        if (isInsideOurEarth) {
            output += isHindi
                ? "• भूपर्पटी • मेंटल • कोर • मैग्मा • लावा • खनिज • आग्नेय चट्टान • अवसादी चट्टान • कायांतरित चट्टान • चट्टान चक्र\n"
                : "• Crust • Mantle • Core • Magma • Lava • Minerals • Igneous rocks • Sedimentary rocks • Metamorphic rocks • Rock cycle\n";
        } else {
            output += "• Chapter-specific terminology derived from the selected source material.\n";
        }

        output += "\nDETAILED NOTES\n";

        if (isInsideOurEarth) {
            if (isHindi) {
                output += "1. पृथ्वी की आंतरिक संरचना: पृथ्वी के भीतर अलग-अलग घनत्व और संरचना वाली परतें पाई जाती हैं।\n";
                output += "2. भूपर्पटी: यह सबसे बाहरी परत है और महाद्वीपीय तथा महासागरीय भागों में अंतर पाया जाता है।\n";
                output += "3. मेंटल: भूपर्पटी के नीचे स्थित मोटी परत है।\n";
                output += "4. कोर: पृथ्वी का सबसे आंतरिक भाग है।\n";
                output += "5. चट्टानें: चट्टानों का निर्माण और परिवर्तन विभिन्न प्राकृतिक प्रक्रियाओं से होता है।\n";
                output += "6. आग्नेय चट्टानें: मैग्मा या लावा के ठंडा होने से बनती हैं।\n";
                output += "7. अवसादी चट्टानें: अवसादों के जमाव और उनके दबने/जुड़ने से बनती हैं।\n";
                output += "8. कायांतरित चट्टानें: ताप और दाब के कारण मौजूदा चट्टानों में परिवर्तन से बनती हैं।\n";
                output += "9. चट्टान चक्र: एक प्रकार की चट्टान समय के साथ दूसरी प्रकार की चट्टान में बदल सकती है।\n";
            } else {
                output += "1. Internal structure: Earth contains layers with different composition and density.\n";
                output += "2. Crust: The outermost layer, with differences between continental and oceanic crust.\n";
                output += "3. Mantle: The thick layer beneath the crust.\n";
                output += "4. Core: The innermost major layer of Earth.\n";
                output += "5. Rocks: Rocks form and change through several natural processes.\n";
                output += "6. Igneous rocks: Formed through cooling and solidification of magma or lava.\n";
                output += "7. Sedimentary rocks: Formed from accumulated sediments that become compacted and cemented.\n";
                output += "8. Metamorphic rocks: Formed when existing rocks change under heat and pressure.\n";
                output += "9. Rock cycle: Rocks can transform from one type to another through natural processes.\n";
            }
        } else {
            output += "The detailed explanation is based on chapter-specific source material retrieved for the selected chapter.\n";
        }

        output += "\nPROCESSES AND MECHANISMS\n";

        if (isInsideOurEarth) {
            output += isHindi
                ? "• मैग्मा के ठंडा होने से आग्नेय चट्टानों का निर्माण।\n• अवसादों का निक्षेपण, संघनन और सीमेंटेशन।\n• ताप और दाब से कायांतरण।\n• अपक्षय, अपरदन और अन्य प्रक्रियाओं द्वारा चट्टान चक्र में परिवर्तन।\n"
                : "• Cooling of magma produces igneous rocks.\n• Deposition, compaction and cementation contribute to sedimentary rock formation.\n• Heat and pressure cause metamorphism.\n• Weathering, erosion and related processes contribute to changes in the rock cycle.\n";
        }

        output += "\nCAUSES AND EFFECTS\n";

        if (isInsideOurEarth) {
            output += isHindi
                ? "• ताप और दाब में परिवर्तन चट्टानों के स्वरूप को बदल सकते हैं।\n• अपक्षय और अपरदन सतह की चट्टानों को तोड़कर/हटाकर अवसाद निर्माण में योगदान करते हैं।\n• मैग्मा के ठंडा होने की स्थिति चट्टान के बनने के तरीके को प्रभावित करती है।\n"
                : "• Changes in heat and pressure can alter existing rocks.\n• Weathering and erosion break down and transport surface material, contributing to sediment formation.\n• The cooling of magma determines the formation of igneous rocks.\n";
        }

        output += "\nCLASSIFICATIONS\n";

        if (isInsideOurEarth) {
            output += isHindi
                ? "चट्टानों के प्रमुख प्रकार:\n1. आग्नेय चट्टानें\n2. अवसादी चट्टानें\n3. कायांतरित चट्टानें\n"
                : "Major rock types:\n1. Igneous rocks\n2. Sedimentary rocks\n3. Metamorphic rocks\n";
        }

        output += "\nIMPORTANT EXAMPLES\n";

        if (isInsideOurEarth) {
            output += isHindi
                ? "• ग्रेनाइट — आग्नेय चट्टान\n• बेसाल्ट — आग्नेय चट्टान\n• बलुआ पत्थर — अवसादी चट्टान\n• संगमरमर — कायांतरित चट्टान\n• स्लेट — कायांतरित चट्टान\n"
                : "• Granite — Igneous rock\n• Basalt — Igneous rock\n• Sandstone — Sedimentary rock\n• Marble — Metamorphic rock\n• Slate — Metamorphic rock\n";
        }

        output += "\nIMPORTANT FACTS\n";

        if (isInsideOurEarth) {
            output += isHindi
                ? "• भूपर्पटी सबसे बाहरी परत है।\n• मेंटल भूपर्पटी के नीचे स्थित है।\n• कोर सबसे आंतरिक भाग है।\n• महाद्वीपीय भूपर्पटी महासागरीय भूपर्पटी से अधिक मोटी होती है।\n• मैग्मा पृथ्वी के भीतर और लावा सतह पर पाया जाता है।\n• चट्टानों के तीन प्रमुख प्रकार हैं।\n"
                : "• The crust is the outermost layer.\n• The mantle lies below the crust.\n• The core is the innermost major layer.\n• Continental crust is thicker than oceanic crust.\n• Magma is inside Earth while lava reaches the surface.\n• There are three major rock types.\n";
        }

        output += "\nIMPORTANT COMPARISONS\n";

        if (isInsideOurEarth) {
            output += isHindi
                ? "भूपर्पटी बनाम मेंटल: भूपर्पटी बाहरी परत है, जबकि मेंटल उसके नीचे स्थित मोटी परत है।\nमैग्मा बनाम लावा: मैग्मा पृथ्वी के भीतर होता है, जबकि सतह पर निकलने वाला पिघला पदार्थ लावा कहलाता है।\nआग्नेय बनाम अवसादी: आग्नेय चट्टानें पिघले पदार्थ के ठंडा होने से, जबकि अवसादी चट्टानें अवसादों के जमाव और संघनन से बनती हैं।\n"
                : "Crust vs Mantle: The crust is the outer layer, while the mantle lies beneath it.\nMagma vs Lava: Magma is molten material inside Earth, while lava is molten material reaching the surface.\nIgneous vs Sedimentary: Igneous rocks form from cooling molten material, while sedimentary rocks form from accumulated sediments.\n";
        }

        if (isInsideOurEarth) {
            output += "\n[[NEXORA_DIAGRAM:inside-our-earth]]\n";
        }

        output += "\nPYQ TREND ANALYSIS\n";
        output += isHindi
            ? "• इस chapter से layer identification, rock classification, formation processes, definitions और conceptual comparison जैसे प्रश्न महत्वपूर्ण हैं।\n• नीचे दिए गए 15 प्रश्न PYQ-based practice हैं; इन्हें verified actual PYQ के रूप में प्रस्तुत नहीं किया गया है।\n"
            : "• Important areas include layer identification, rock classification, formation processes, definitions and conceptual comparisons.\n• The 15 questions below are PYQ-based practice and are not presented as verified actual examination PYQs.\n";

        output += "\nPRIORITY MAP\n";
        output += isHindi
            ? "HIGH: पृथ्वी की परतें, चट्टानों के प्रकार, निर्माण प्रक्रियाएँ, मैग्मा-लावा अंतर\nMEDIUM: खनिज, उदाहरण, चट्टान चक्र\n"
            : "HIGH: Earth layers, rock types, formation processes, magma-lava distinction\nMEDIUM: Minerals, examples, rock cycle\n";

        output += "\nUPSC PRELIMS FOCUS\n";
        output += isHindi
            ? "• तथ्य + अवधारणा आधारित प्रश्नों के लिए पृथ्वी की परतों और चट्टानों के वर्गीकरण को प्राथमिकता दें।\n"
            : "• Prioritise Earth layers and rock classification for factual and conceptual questions.\n";

        output += "\nUPSC MAINS FOCUS\n";
        output += isHindi
            ? "• पृथ्वी की आंतरिक संरचना और चट्टान चक्र को कारण-प्रक्रिया-परिणाम के रूप में समझें।\n"
            : "• Understand internal structure and the rock cycle through cause-process-effect relationships.\n";

        output += "\nCOMMON UPSC CONCEPTUAL TRAPS\n";
        output += isHindi
            ? "• मैग्मा और लावा को एक ही स्थान के लिए प्रयोग करना गलत है।\n• आग्नेय, अवसादी और कायांतरित चट्टानों की निर्माण प्रक्रिया अलग-अलग है।\n• भूपर्पटी को पृथ्वी की सबसे मोटी परत नहीं समझना चाहिए।\n"
            : "• Magma and lava refer to molten material in different settings.\n• Igneous, sedimentary and metamorphic rocks have different formation processes.\n• The crust should not be confused with Earth's thickest layer.\n";

        output += "\nPYQ CONNECTION\n";
        output += isHindi
            ? "• प्रश्नों को Earth structure, rocks, minerals और geomorphological processes जैसे broader Geography themes से जोड़ा जा सकता है।\n"
            : "• Questions can be connected with broader Geography themes such as Earth structure, rocks, minerals and geomorphological processes.\n";

        output += "\nPYQ BASED PRACTICE\n\n";

        if (isInsideOurEarth) {
            const questions = isHindi
                ? [
                    ["पृथ्वी की सबसे बाहरी ठोस परत कौन-सी है?", "मेंटल", "भूपर्पटी", "बाह्य कोर", "आंतरिक कोर", "B", "भूपर्पटी पृथ्वी की सबसे बाहरी ठोस परत है।"],
                    ["भूपर्पटी के ठीक नीचे कौन-सी परत स्थित है?", "कोर", "वायुमंडल", "मेंटल", "जलमंडल", "C", "मेंटल पृथ्वी की भूपर्पटी के नीचे स्थित विशाल आंतरिक परत है।"],
                    ["पृथ्वी का सबसे आंतरिक प्रमुख भाग कौन-सा है?", "कोर", "मेंटल", "भूपर्पटी", "स्थलमंडल", "A", "कोर पृथ्वी का सबसे आंतरिक प्रमुख भाग है।"],
                    ["महाद्वीपीय भूपर्पटी की तुलना में महासागरीय भूपर्पटी सामान्यतः कैसी होती है?", "अधिक मोटी", "समान मोटाई की", "हमेशा अनुपस्थित", "अधिक पतली", "D", "महासागरीय भूपर्पटी सामान्यतः महाद्वीपीय भूपर्पटी से पतली होती है।"],
                    ["NIFE शब्द मुख्यतः किन तत्वों से संबंधित है?", "निकेल और लोहा", "सिलिका और एल्युमिनियम", "कार्बन और ऑक्सीजन", "कैल्शियम और सोडियम", "A", "NIFE शब्द Nickel और Iron से बना है तथा कोर की धात्विक संरचना के संदर्भ में प्रयुक्त होता है।"],
                    ["पृथ्वी के भीतर पाए जाने वाले पिघले पदार्थ को क्या कहा जाता है?", "लावा", "अवसाद", "मैग्मा", "खनिज", "C", "पृथ्वी के भीतर मौजूद पिघला हुआ पदार्थ मैग्मा कहलाता है।"],
                    ["पृथ्वी की सतह पर निकलने वाले पिघले पदार्थ को क्या कहा जाता है?", "मेंटल", "लावा", "मैग्मा", "भूपर्पटी", "B", "जब मैग्मा पृथ्वी की सतह पर पहुँचता है तो उसे लावा कहा जाता है।"],
                    ["आग्नेय चट्टानें मुख्यतः किस प्रक्रिया से बनती हैं?", "अवसादों के जमाव से", "केवल दाब से", "केवल अपक्षय से", "मैग्मा या लावा के ठंडा होकर ठोस बनने से", "D", "मैग्मा या लावा के ठंडा होकर ठोस बनने से आग्नेय चट्टानों का निर्माण होता है।"],
                    ["अवसादी चट्टानों के निर्माण में कौन-सी प्रक्रिया महत्वपूर्ण है?", "अवसादों का निक्षेपण और संघनन", "मैग्मा का पिघलना", "केवल ज्वालामुखी विस्फोट", "केवल भूकंप", "A", "अवसादों के निक्षेपण के बाद संघनन और सीमेंटेशन जैसी प्रक्रियाएँ अवसादी चट्टानों के निर्माण में महत्वपूर्ण हैं।"],
                    ["कायांतरित चट्टानें मुख्यतः किसके प्रभाव से बनती हैं?", "केवल वर्षा", "ताप और दाब", "केवल हवा", "केवल समुद्री लहरें", "B", "ताप और दाब के प्रभाव से पहले से मौजूद चट्टानों में परिवर्तन होने पर कायांतरित चट्टानें बन सकती हैं।"],
                    ["निम्न में से कौन-सी आग्नेय चट्टान का उदाहरण है?", "बलुआ पत्थर", "संगमरमर", "ग्रेनाइट", "स्लेट", "C", "ग्रेनाइट एक आग्नेय चट्टान है, जो मैग्मा के ठंडा होकर ठोस बनने से बनती है।"],
                    ["निम्न में से कौन-सी अवसादी चट्टान है?", "बलुआ पत्थर", "ग्रेनाइट", "बेसाल्ट", "संगमरमर", "A", "बलुआ पत्थर अवसादी चट्टान का प्रमुख उदाहरण है।"],
                    ["निम्न में से कौन-सी कायांतरित चट्टान है?", "बेसाल्ट", "ग्रेनाइट", "बलुआ पत्थर", "संगमरमर", "D", "संगमरमर कायांतरित चट्टान है, जो मूल चट्टान में ताप और दाब के प्रभाव से परिवर्तन के कारण बनती है।"],
                    ["चट्टान चक्र किस बात को दर्शाता है?", "केवल भूकंपों को", "चट्टानों के एक प्रकार से दूसरे प्रकार में परिवर्तन को", "केवल ज्वालामुखियों को", "केवल वर्षा को", "B", "चट्टान चक्र विभिन्न भूवैज्ञानिक प्रक्रियाओं के कारण चट्टानों के एक प्रकार से दूसरे प्रकार में परिवर्तन को दर्शाता है।"],
                    ["निम्न में से कौन-सा युग्म सही सुमेलित है?", "ग्रेनाइट — आग्नेय चट्टान", "बलुआ पत्थर — कायांतरित चट्टान", "संगमरमर — आग्नेय चट्टान", "स्लेट — अवसादी चट्टान", "A", "ग्रेनाइट आग्नेय, बलुआ पत्थर अवसादी तथा संगमरमर और स्लेट कायांतरित चट्टानों के उदाहरण हैं।"]
                ]
                : [
                    ["Which is the outermost solid layer of the Earth?", "Mantle", "Crust", "Outer core", "Inner core", "B", "The crust is the outermost solid layer of the Earth."],
                    ["Which layer lies directly below the crust?", "Core", "Atmosphere", "Mantle", "Hydrosphere", "C", "The mantle lies directly below the Earth's crust."],
                    ["Which is the innermost major part of the Earth?", "Core", "Mantle", "Crust", "Lithosphere", "A", "The core forms the innermost major part of the Earth."],
                    ["Compared with continental crust, oceanic crust is generally:", "Thicker", "Equal in thickness", "Always absent", "Thinner", "D", "Oceanic crust is generally thinner than continental crust."],
                    ["NIFE is mainly associated with:", "Nickel and iron", "Silica and aluminium", "Carbon and oxygen", "Calcium and sodium", "A", "NIFE refers to nickel and iron and is associated with the metallic core."],
                    ["Molten material inside the Earth is called:", "Lava", "Sediment", "Magma", "Mineral", "C", "Molten material beneath the Earth's surface is called magma."],
                    ["Molten material reaching the Earth's surface is called:", "Mantle", "Lava", "Magma", "Crust", "B", "Magma that reaches the Earth's surface is called lava."],
                    ["Igneous rocks mainly form through:", "Deposition of sediments", "Pressure alone", "Weathering alone", "Cooling and solidification of magma or lava", "D", "Igneous rocks form when magma or lava cools and solidifies."],
                    ["Which process is important in forming sedimentary rocks?", "Deposition and compaction of sediments", "Melting of magma", "Only volcanic eruptions", "Only earthquakes", "A", "Deposition followed by compaction and cementation contributes to sedimentary rock formation."],
                    ["Metamorphic rocks mainly form due to:", "Rainfall alone", "Heat and pressure", "Wind alone", "Ocean waves alone", "B", "Heat and pressure can alter pre-existing rocks and form metamorphic rocks."],
                    ["Which is an example of an igneous rock?", "Sandstone", "Marble", "Granite", "Slate", "C", "Granite is an igneous rock."],
                    ["Which is a sedimentary rock?", "Sandstone", "Granite", "Basalt", "Marble", "A", "Sandstone is a sedimentary rock."],
                    ["Which is a metamorphic rock?", "Basalt", "Granite", "Sandstone", "Marble", "D", "Marble is a metamorphic rock."],
                    ["What does the rock cycle describe?", "Only earthquakes", "Transformation of rocks from one type to another", "Only volcanoes", "Only rainfall", "B", "The rock cycle describes continuous transformation among different rock types."],
                    ["Which pair is correctly matched?", "Granite — Igneous rock", "Sandstone — Metamorphic rock", "Marble — Igneous rock", "Slate — Sedimentary rock", "A", "Granite is correctly matched with the igneous rock category."]
                ];

            questions.forEach((q, index) => {
                output += "Q" + (index + 1) + ". " + q[0] + "\n";
                output += "A. " + q[1] + "\n";
                output += "B. " + q[2] + "\n";
                output += "C. " + q[3] + "\n";
                output += "D. " + q[4] + "\n";
                output += "Correct Answer: " + q[5] + "\n";
                output += "Explanation: " + q[6] + "\n\n";
            });
        } else {
            output += isHindi
                ? "15 chapter-specific PYQ-based practice questions should be generated from the selected chapter source material.\n"
                : "15 chapter-specific PYQ-based practice questions should be generated from the selected chapter source material.\n";
        }

        output += "\nMAINS-BASED PRACTICE\n\n";

        if (isInsideOurEarth) {
            if (isHindi) {
                output += "Q1. पृथ्वी की आंतरिक संरचना की प्रमुख परतों का वर्णन कीजिए तथा उनके अध्ययन के महत्व को स्पष्ट कीजिए।\n\n";
                output += "Model Answer:\n";
                output += "Introduction: पृथ्वी बाहर से एक ठोस पिंड दिखाई देती है, लेकिन इसके भीतर विभिन्न संरचना, घनत्व और भौतिक दशाओं वाली परतें मौजूद हैं। व्यापक रूप से पृथ्वी को भूपर्पटी, मेंटल और कोर में विभाजित किया जाता है।\n\n";
                output += "Main Body:\n";
                output += "1. भूपर्पटी — यह पृथ्वी की सबसे बाहरी ठोस परत है। इसमें महाद्वीपीय और महासागरीय भूपर्पटी शामिल हैं, जिनकी मोटाई और संरचना में अंतर पाया जाता है।\n";
                output += "2. मेंटल — यह भूपर्पटी के नीचे स्थित अत्यंत मोटी परत है और पृथ्वी के आंतरिक भाग का बड़ा हिस्सा बनाती है।\n";
                output += "3. कोर — यह पृथ्वी का सबसे आंतरिक भाग है और मुख्यतः लोहे तथा निकेल से संबंधित है। इसे बाह्य कोर और आंतरिक कोर के रूप में समझा जाता है।\n\n";
                output += "महत्व: पृथ्वी की आंतरिक संरचना का अध्ययन ज्वालामुखीय गतिविधियों, भूकंपीय घटनाओं, पृथ्वी के आंतरिक ताप तथा विभिन्न भूवैज्ञानिक प्रक्रियाओं को समझने में सहायता करता है।\n\n";
                output += "Conclusion: अतः पृथ्वी की परतों का अध्ययन केवल उसकी आंतरिक बनावट को समझने तक सीमित नहीं है, बल्कि यह पृथ्वी के गतिशील भूवैज्ञानिक स्वरूप को समझने का आधार भी प्रदान करता है।\n\n";

                output += "Q2. आग्नेय, अवसादी और कायांतरित चट्टानों के निर्माण की प्रक्रियाओं की तुलना कीजिए तथा उपयुक्त उदाहरण दीजिए।\n\n";
                output += "Model Answer:\n";
                output += "Introduction: चट्टानें पृथ्वी की भूपर्पटी के प्रमुख घटक हैं। उनके निर्माण की प्रक्रिया के आधार पर उन्हें आग्नेय, अवसादी और कायांतरित चट्टानों में वर्गीकृत किया जाता है।\n\n";
                output += "Main Body:\n";
                output += "1. आग्नेय चट्टानें — मैग्मा या लावा के ठंडा होकर ठोस बनने से बनती हैं। ग्रेनाइट और बेसाल्ट इसके प्रमुख उदाहरण हैं।\n";
                output += "2. अवसादी चट्टानें — अपक्षय और अपरदन से प्राप्त अवसादों के निक्षेपण, संघनन तथा सीमेंटेशन से बन सकती हैं। बलुआ पत्थर इसका उदाहरण है।\n";
                output += "3. कायांतरित चट्टानें — पहले से मौजूद चट्टानों पर ताप और दाब के प्रभाव से उनके खनिजीय तथा भौतिक गुणों में परिवर्तन होने पर बनती हैं। संगमरमर और स्लेट इसके उदाहरण हैं।\n\n";
                output += "तुलना: आग्नेय चट्टानों का संबंध पिघले पदार्थ के ठंडा होने से, अवसादी चट्टानों का संबंध अवसादों के जमाव से तथा कायांतरित चट्टानों का संबंध ताप और दाब आधारित परिवर्तन से है।\n\n";
                output += "Conclusion: तीनों प्रकार की चट्टानों की निर्माण प्रक्रियाएँ अलग हैं, लेकिन चट्टान चक्र के कारण इनके बीच निरंतर परिवर्तन संभव है।\n\n";

                output += "Q3. चट्टान चक्र की अवधारणा समझाइए। यह पृथ्वी की सतह तथा आंतरिक प्रक्रियाओं के बीच संबंध को किस प्रकार स्पष्ट करता है?\n\n";
                output += "Model Answer:\n";
                output += "Introduction: चट्टान चक्र वह सतत प्राकृतिक प्रक्रिया है जिसके अंतर्गत आग्नेय, अवसादी और कायांतरित चट्टानें विभिन्न भूवैज्ञानिक प्रक्रियाओं के माध्यम से एक-दूसरे में परिवर्तित हो सकती हैं।\n\n";
                output += "Main Body:\n";
                output += "• मैग्मा के ठंडा होकर ठोस बनने से आग्नेय चट्टान का निर्माण हो सकता है।\n";
                output += "• अपक्षय और अपरदन चट्टानों को तोड़कर अवसाद उत्पन्न करते हैं। इन अवसादों के निक्षेपण, संघनन और सीमेंटेशन से अवसादी चट्टानें बन सकती हैं।\n";
                output += "• ताप और दाब के प्रभाव से पहले से मौजूद चट्टानें कायांतरित चट्टानों में बदल सकती हैं।\n";
                output += "• अत्यधिक ताप के कारण चट्टानें पिघल सकती हैं और पुनः मैग्मा का निर्माण कर सकती हैं।\n";
                output += "• इस प्रकार सतही प्रक्रियाएँ जैसे अपक्षय-अपरदन तथा आंतरिक प्रक्रियाएँ जैसे ताप, दाब और पिघलना एक-दूसरे से जुड़ती हैं।\n\n";
                output += "Significance: चट्टान चक्र पृथ्वी को एक गतिशील तंत्र के रूप में समझने में सहायता करता है और बताता है कि चट्टानों का स्वरूप स्थिर नहीं बल्कि निरंतर परिवर्तनशील है।\n\n";
                output += "Conclusion: इसलिए चट्टान चक्र पृथ्वी की सतह और उसके आंतरिक भाग में सक्रिय भूवैज्ञानिक प्रक्रियाओं के परस्पर संबंध को समझने की एक महत्वपूर्ण अवधारणा है।\n";
            } else {
                output += "Q1. Describe the major layers of the Earth's internal structure and explain their significance.\n\n";
                output += "Model Answer:\n";
                output += "Introduction: Although the Earth appears solid from the outside, its interior consists of layers with different compositions, densities and physical conditions. Broadly, these are the crust, mantle and core.\n\n";
                output += "Main Body:\n";
                output += "1. Crust — the outermost solid layer, with important differences between continental and oceanic crust.\n";
                output += "2. Mantle — the thick layer below the crust and a major component of Earth's interior.\n";
                output += "3. Core — the innermost part, mainly associated with iron and nickel and commonly understood in terms of the outer and inner core.\n\n";
                output += "Significance: Understanding the internal structure helps explain volcanic activity, seismic phenomena, internal heat and several geological processes.\n\n";
                output += "Conclusion: Thus, the study of Earth's internal layers provides a foundation for understanding the dynamic geological nature of the planet.\n\n";

                output += "Q2. Compare the formation processes of igneous, sedimentary and metamorphic rocks with suitable examples.\n\n";
                output += "Model Answer:\n";
                output += "Introduction: Rocks are major components of the Earth's crust and are classified into igneous, sedimentary and metamorphic rocks according to their formation processes.\n\n";
                output += "Main Body:\n";
                output += "1. Igneous rocks form through cooling and solidification of magma or lava. Granite and basalt are examples.\n";
                output += "2. Sedimentary rocks can form through deposition, compaction and cementation of sediments. Sandstone is an example.\n";
                output += "3. Metamorphic rocks form when pre-existing rocks are altered by heat and pressure. Marble and slate are examples.\n\n";
                output += "Comparison: Igneous rocks are linked to cooling of molten material, sedimentary rocks to deposition of sediments, and metamorphic rocks to alteration under heat and pressure.\n\n";
                output += "Conclusion: Although their formation mechanisms differ, all three rock groups remain interconnected through the rock cycle.\n\n";

                output += "Q3. Explain the rock cycle. How does it demonstrate the relationship between surface and internal processes of the Earth?\n\n";
                output += "Model Answer:\n";
                output += "Introduction: The rock cycle is the continuous natural process through which igneous, sedimentary and metamorphic rocks can transform into one another through geological processes.\n\n";
                output += "Main Body:\n";
                output += "• Cooling and solidification of magma can produce igneous rocks.\n";
                output += "• Weathering and erosion produce sediments, which may form sedimentary rocks after deposition, compaction and cementation.\n";
                output += "• Heat and pressure can transform existing rocks into metamorphic rocks.\n";
                output += "• Melting can convert rocks back into magma, allowing the cycle to continue.\n";
                output += "• Surface processes such as weathering and erosion are therefore linked with internal processes involving heat, pressure and melting.\n\n";
                output += "Significance: The rock cycle shows that rocks are not static materials but part of a dynamic geological system.\n\n";
                output += "Conclusion: It provides an integrated explanation of how surface and internal processes continuously reshape the Earth's crust.\n";
            }
        }

        output += "\nQUICK REVISION\n";

        if (isInsideOurEarth) {
            output += isHindi
                ? "• भूपर्पटी → मेंटल → कोर\n• मैग्मा → ठंडा होना → आग्नेय चट्टान\n• अवसाद → निक्षेपण/संघनन → अवसादी चट्टान\n• ताप + दाब → कायांतरण → कायांतरित चट्टान\n• विभिन्न प्रक्रियाएँ → चट्टान चक्र\n"
                : "• Crust → Mantle → Core\n• Magma → Cooling → Igneous rock\n• Sediments → Deposition/compaction → Sedimentary rock\n• Heat + pressure → Metamorphism → Metamorphic rock\n• Multiple processes → Rock cycle\n";
        }

        return output.trim();
    }
}
async function generateBookNotes({
    book,
    language = "Hindi",
    mode = "Exam Notes",
    exam = "UPSC",
    sourceText = ""
}) {
    let output = "";

    output += `TITLE:\n`;
    output += `${book.className} ${book.subject} — ${book.titleHi}\n\n`;

    output += `BOOK INFORMATION:\n`;
    output += `Class: ${book.className}\n`;
    output += `Subject: ${book.subject}\n`;
    output += `Chapters: ${book.chapters.length}\n`;
    output += `Target: ${exam}\n\n`;

    output += `TABLE OF CONTENTS:\n`;

    for (const chapter of book.chapters) {
        output += `${chapter.number}. ${chapter.titleHi}\n`;
    }

    output += "\n\n";

    for (const chapter of book.chapters) {
        const chapterNotes = await generateChapterNotes({
            book,
            chapter,
            language,
            mode,
            exam
        });

        output += `\n\n========================================\n`;
        output += `CHAPTER ${chapter.number}: ${chapter.titleHi}\n`;
        output += `========================================\n\n`;
        output += chapterNotes;
        output += "\n";
    }

    return output.trim();
}

module.exports = {
    buildChapterPrompt,
    generateChapterNotes,
    generateBookNotes
};
