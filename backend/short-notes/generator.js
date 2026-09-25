
/* NEXORA UNIVERSAL MCQ QUALITY RULES V26 */

/* ============================================================
   NEXORA UNIVERSAL TOPIC-VISUAL + ALL-SUBJECT NOTES ENGINE
   ============================================================ */
const NEXORA_TOPIC_VISUAL_NOTES_RULES = `
UNIVERSAL TOPIC-WISE NOTES + VISUAL RULES — MANDATORY

1. Generate complete notes for EVERY supported subject, including:
   Geography, History, Polity, Economy, Environment, Science, Biology,
   Physics, Chemistry, Mathematics, English, Hindi and Other.

2. NEVER assume visuals are Geography-only.

3. TOPIC-WISE VISUAL PLACEMENT:
   Every important concept/topic that genuinely benefits from a visual
   MUST have its relevant diagram/map/flowchart/table/graph immediately
   BELOW that topic's explanation.
   Do NOT collect all diagrams at the end of the chapter.

4. VISUAL RELEVANCE:
   A visual must represent the exact topic being explained.
   NEVER insert an unrelated map/diagram merely to increase visual count.

5. SUBJECT RULES:
   - GEOGRAPHY:
     maps, globe, latitude/longitude, physical features, drainage,
     climate, winds, landforms, cross-sections, contour maps,
     topographic profiles and India/world maps whenever relevant.
   - HISTORY:
     timelines, process diagrams, trade routes, empire/territory maps,
     archaeological/site maps and cause-effect flowcharts whenever relevant.
   - POLITY:
     constitutional structure, institutional flowcharts, election/process
     diagrams, federal relations and hierarchy diagrams whenever relevant.
   - ECONOMY:
     circular flow, demand-supply graphs, production/cost graphs,
     inflation/unemployment relationships, fiscal/monetary flowcharts
     and other topic-specific graphs whenever relevant.
   - ENVIRONMENT:
     food chains/webs, ecological pyramids, cycles, biodiversity maps,
     pollution pathways, conservation flowcharts and ecosystem diagrams.
   - SCIENCE/BIOLOGY:
     labelled structures, processes, cycles, mechanisms and experiments.
   - PHYSICS:
     free-body diagrams, ray diagrams, circuit diagrams, motion graphs,
     wave diagrams, force/energy diagrams and formula relationships.
   - CHEMISTRY:
     molecular/atomic structures, reaction schemes, periodic trends,
     apparatus diagrams, bonding diagrams and process flowcharts.
   - MATHEMATICS:
     THIS IS MANDATORY.
     Include topic-specific mathematical visuals wherever useful:
     geometry figures, triangles, circles, coordinate graphs,
     number lines, algebraic graphs, functions, trigonometric figures,
     mensuration figures, probability trees, statistics charts,
     matrices/sets diagrams, sequences, calculus graphs, vectors,
     constructions and formula-linked diagrams.
     Mathematics notes must NOT be skipped just because the subject is
     formula-based.
   - ENGLISH/HINDI:
     grammar structures, sentence patterns, literary devices,
     writing formats, language-flow diagrams or tables where genuinely useful.

6. TOPIC-SPECIFICITY:
   Each visual must be tied to the exact current topic/chapter.
   The generator must prefer multiple DIFFERENT relevant visuals when
   the chapter naturally contains multiple visual concepts.

7. NO BLANK VISUALS:
   Never output an empty visual placeholder.
   If a visual marker is created, it must resolve to an actual diagram,
   chart, map, flowchart or structured visual.

8. VISUAL LABEL:
   Every visual should have a short descriptive title/caption and,
   where appropriate, labels/arrows/legend.

9. NOTES COMPLETENESS:
   Never reduce textual notes merely because visuals are present.
   Visuals supplement the notes; they do not replace concepts,
   definitions, examples, formulas, facts or explanations.

10. UNIVERSAL COVERAGE:
    Apply these rules to every chapter and every subject instead of
    hard-coding Geography as the only visual subject.
`;

const NEXORA_UNIVERSAL_MCQ_RULES = `
MCQ REQUIREMENTS — MANDATORY:
1. Generate exactly 15 chapter-specific MCQs whenever sufficient chapter evidence exists.
2. Number them strictly 1, 2, 3, 4 ... 15. Never restart numbering.
3. The QUESTION itself must be complete and meaningful, not merely a topic label.
4. Do NOT output only short labels such as "Earth?" or "Nationalism?".
5. Use complete question forms such as "What is Earth?", "Who was associated with...", "Which factor...", "What was the significance of...".
6. Include a genuine mixture of:
   - concept questions
   - definition/meaning questions
   - fact questions
   - name/person questions
   - place/location questions
   - date/event questions where relevant
   - classification/process questions
7. At least 3 of the 15 questions should be name/person/place/entity based whenever the chapter contains such evidence.
8. Every MCQ must have exactly four options A, B, C, D.
9. Correct answers must be distributed across A/B/C/D; do not make every answer A.
10. Every MCQ must contain:
    Question
    A-D options
    Correct Answer
    Explanation
11. Never label AI-generated practice questions as PYQs.
12. Questions must remain strictly chapter-specific and must not leak unrelated chapters.
13. Do not invent factual names, dates, places or events.
`;

/* NEXORA UNIVERSAL RELEVANT VISUAL RULES V26 */
const NEXORA_UNIVERSAL_VISUAL_RULES = `
RELEVANT VISUALS:
Choose multiple genuinely useful visuals when the chapter supports them.
Never insert an unrelated map merely because the subject is Geography.

For Earth/Geography chapters, use the relevant combination when supported by
the actual chapter content:
- maps
- globe / latitudes / longitudes
- motions of Earth
- major landforms of Earth
- major domains of Earth
- inside Earth / layers
- India map or climate/vegetation/wildlife only when the chapter actually requires it

A chapter may contain more than one visual.
Do not stop after one map when the chapter clearly requires additional figures.
Every visual must be tied to a concept actually discussed in the chapter.
`;



// backend/short-notes/generator.js

/* NEXORA_UNIVERSAL_POLICY_IMPORT_V13 */

/* NEXORA_UNIVERSAL_PROMPT_HELPER_V13 */
function nexoraUniversalPolicyPromptV13(selection = {}) {
  const __NEXORA_TOPIC_VISUAL_RULES = NEXORA_TOPIC_VISUAL_NOTES_RULES;
  const policy = getUniversalShortNotesPolicyV13();

  const exam = selection.exam || selection.examName || "Other";
  const language = selection.language || "English";
  const className = selection.className || selection.class || "";
  const subject = selection.subject || "";
  const book = selection.book || selection.bookName || "";
  const chapter = selection.chapter || selection.chapterName || "";

  return `
NEXORA UNIVERSAL TOPPER POLICY V13

SELECTED:
Class: ${className}
Subject: ${subject}
Book: ${book}
Chapter: ${chapter}
Exam: ${exam}
Language: ${language}

MINIMUM MCQs:
${policy.minimumMCQs}

MINIMUM DESCRIPTIVE/MAINS:
${policy.minimumMains}

MINIMUM MODEL-ANSWER LENGTH:
${policy.minimumMainsWords} words

TARGET MODEL-ANSWER LENGTH:
${policy.targetMainsWords} words

CHAPTER LOCK:
${policy.chapterLock ? "STRICT" : "NORMAL"}

NO GENERIC FILLER:
${policy.noGenericFiller ? "YES" : "NO"}

AUTHENTIC PYQ ONLY:
${policy.authenticPYQOnly ? "YES" : "NO"}

DIAGRAMS:
Only chapter-relevant diagrams/maps/flowcharts.

LANGUAGE:
Write the final educational content in ${language}.

EXAM:
Adapt the questions and explanations specifically for ${exam}.

IMPORTANT:
Do not generate content for any chapter other than:
${chapter}

Do not silently substitute another book.
Do not invent a PYQ.
Do not use unrelated examples merely to increase length.

The final result must be topper-level, accurate, source-grounded, structured and revision-friendly.
`;
}

function nexoraApplyUniversalPolicyV13(prompt, selection = {}) {
  return String(prompt || "") + "\n\n" + nexoraUniversalPolicyPromptV13(selection);
}
const {
  UNIVERSAL_SHORT_NOTES_POLICY_V13,
  getUniversalShortNotesPolicyV13
} = require("./universal-policy-v13");

const { GoogleGenAI } = require("@google/genai");
const { tavily } = require("@tavily/core");

/*
=========================================================
 NEXORA GENERIC SHORT NOTES ENGINE
 --------------------------------------------------------
 Supports:
 - Any Class / Level
 - Any Subject
 - Any Book / Course
 - Any Chapter / Topic
 - Any Exam / Target
 - Hindi / English / Hinglish
 - Gemini generation
 - Tavily chapter-specific research
 - Generic deterministic fallback
 - Chapter selection integrity
 - Source cleanup
 - Definitions
 - Key terms
 - Concepts
 - Processes
 - Classification
 - Cause/effect
 - MCQs
 - Descriptive questions
 - PYQ-safe handling
 - Relevant visual identification
=========================================================
*/

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL =
  process.env.GEMINI_MODEL || "gemini-3.6-flash";

const TAVILY_API_KEY = process.env.TAVILY_API_KEY || "";

const ai = GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: GEMINI_API_KEY })
  : null;

const webSearch = TAVILY_API_KEY
  ? tavily({ apiKey: TAVILY_API_KEY })
  : null;


/* =========================================================
   BASIC HELPERS
   ========================================================= */

function safeString(value, fallback = "") {
  if (value === null || value === undefined) {
    return fallback;
  }

  return String(value).trim();
}

function normalize(value) {
  return safeString(value)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function unique(items = []) {
  const seen = new Set();
  const result = [];

  for (const item of items) {
    const value = safeString(item);

    if (!value) continue;

    const key = normalize(value);

    if (!key || seen.has(key)) continue;

    seen.add(key);
    result.push(value);
  }

  return result;
}

function cleanText(text) {
  return safeString(text)
    .replace(/\r/g, "\n")
    .replace(/\t/g, " ")

    // Remove LaTeX math delimiters.
    .replace(/\$\$([^$]+)\$\$/g, "$1")
    .replace(/\$([^$]+)\$/g, "$1")

    // Convert common LaTeX commands to readable plain text.
    .replace(/\\text\{([^{}]*)\}/g, "$1")
    .replace(/\\mathrm\{([^{}]*)\}/g, "$1")
    .replace(/\\mathbf\{([^{}]*)\}/g, "$1")
    .replace(/\\textbf\{([^{}]*)\}/g, "$1")
    .replace(/\\textit\{([^{}]*)\}/g, "$1")

    // Common mathematical / geographical symbols.
    .replace(/\\circ/g, "°")
    .replace(/\^°/g, "°")
    .replace(/\\degree/g, "°")
    .replace(/\\times/g, "×")
    .replace(/\\pm/g, "±")
    .replace(/\\rightarrow/g, "→")
    .replace(/\\leftarrow/g, "←")
    .replace(/\\leftrightarrow/g, "↔")
    .replace(/\\approx/g, "≈")
    .replace(/\\geq/g, "≥")
    .replace(/\\leq/g, "≤")

    // Remove common LaTeX spacing commands.
    .replace(/\\[,;:!]/g, " ")
    .replace(/\\quad/g, " ")
    .replace(/\\qquad/g, " ")

    // Convert superscript/subscript forms commonly produced by AI.
    .replace(/\^\{([^{}]+)\}/g, "$1")
    .replace(/\^([A-Za-z0-9]+)/g, "$1")
    .replace(/_\{([^{}]+)\}/g, "$1")
    .replace(/(?<!NEXORA)_([A-Za-z0-9]+)/g, "$1")

    // Clean escaped braces/backslashes left by malformed math.
    .replace(/\\([{}])/g, "$1")
    .replace(/\\\\/g, "\\")

    // Convert common LaTeX fractions to readable plain text.
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "($1) ÷ ($2)")

    // Remove accidental dollar signs left around numbers/text.
    .replace(/\$/g, "")

    // Expand common time abbreviations for student readability.
    .replace(/\bIST\b/g, "IST (Indian Standard Time — भारतीय मानक समय)")
    .replace(/\bGMT\b/g, "GMT (Greenwich Mean Time — ग्रीनविच माध्य समय)")

    // Normalize common degree notation.
    .replace(/(\d)\s*°\s*(\d)/g, "$1°$2")

    .replace(/[ ]{2,}/g, " ")
    .replace(/\n[ ]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function cleanSentence(text) {
  return cleanText(text)
    .replace(/^[-•●▪◦*]+\s*/u, "")
    .replace(/^\d+[\).:-]\s*/u, "")
    .replace(/^[|:;,-]+\s*/u, "")
    .trim();
}

function limitText(text, max = 18000) {
  const value = cleanText(text);

  if (value.length <= max) {
    return value;
  }

  return value.slice(0, max);
}

function hasMeaningfulText(text, min = 30) {
  return cleanText(text).length >= min;
}

function normalizeClass(value) {
  const text = safeString(value);

  return text
    .replace(/\bclass\s*(\d+)(?:st|nd|rd|th)?\b/gi, "Class $1")
    .replace(/\b(\d+)(?:st|nd|rd|th)\s*(?:class)?\b/gi, "Class $1")
    .trim();
}

function cleanTitle(value) {
  return cleanSentence(value)
    .replace(/[“”"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isGenericValue(value) {
  const n = normalize(value);

  return [
    "",
    "general",
    "not specified",
    "unknown",
    "undefined",
    "null"
  ].includes(n);
}


/* =========================================================
   CHAPTER CONTEXT
   ========================================================= */

/* =========================================================
   CHAPTER CONTEXT
   GENERIC + SELECTION LOCKED
   ========================================================= */


/* ============================================================
   NEXORA_UNIVERSAL_TOPPER_NOTES_RULE_V1
   ============================================================ */

const NEXORA_UNIVERSAL_TOPPER_RULES = `
UNIVERSAL NEXORA SHORT NOTES RULES

1. The selected Exam, Class, Subject, Book and Chapter are immutable.

2. Adapt the difficulty, terminology and question style to the selected
   examination, but never change the selected chapter.

3. NCERT and verified standard/reference books must remain identifiable.
   Always display the exact selected book name in the notes.

4. Never invent a standard/reference book, author, chapter or chapter title.
   Use only verified catalogue/manifest information.

5. LANGUAGE:
   Produce the complete notes in the selected language.
   Do not silently switch language.

6. MCQs:
   Generate EXACTLY 15 chapter-specific MCQs whenever sufficient
   chapter evidence is available.
   Every MCQ must contain:
   Question
   A
   B
   C
   D
   Correct Answer
   Explanation

7. DESCRIPTIVE / MAINS:
   Generate EXACTLY 5 chapter-specific questions.
   Every question must have a complete Model Answer.
   Do not provide hints instead of answers.

8. EXAM QUALITY:
   Questions must be derived from the selected chapter and adapted to
   the selected examination.
   Never mix unrelated chapters.

9. PYQs:
   Only verified authentic PYQs may be labelled as PYQs.
   Never manufacture an AI-generated question and call it a PYQ.

10. VISUALS:
    If the chapter genuinely contains a map, labelled diagram,
    scientific figure, process, cycle, classification, timeline or
    other important visual, preserve/use the appropriate NEXORA diagram
    marker.
    Do not add decorative or unrelated diagrams.
    Important diagrams should be colour-labelled.

11. TOPPER NOTES STYLE:
    Use concise, high-information revision notes:
    - clear hierarchy
    - important terms
    - definitions
    - causes/effects
    - comparisons
    - processes
    - examples
    - exam focus
    - quick revision

12. Do not output:
    URLs
    advertisements
    SEO text
    unrelated web material
    source-retrieval commentary
    AI/Gemini/Tavily internal information.

13. QUALITY CHECK BEFORE FINAL OUTPUT:
    Verify Class + Subject + Book + Chapter + Exam + Language.
    Verify 15 MCQs.
    Verify 3 descriptive/Mains questions.
    Verify every descriptive question has a complete answer.
    Verify relevant visual markers are preserved.
`;


function chapterContext(options = {}) {
  const chapter =
    options.chapter &&
    typeof options.chapter === "object"
      ? options.chapter
      : {};

  const book =
    options.book &&
    typeof options.book === "object"
      ? options.book
      : {};

  const directBookTitle =
    typeof options.book === "string"
      ? options.book.trim()
      : "";

  /* -----------------------------------------
     CLASS / LEVEL
     ----------------------------------------- */

  const className = normalizeClass(
    options.className ||
    options.class ||
    options.classLevel ||
    options.level ||
    chapter.className ||
    chapter.class ||
    chapter.classLevel ||
    book.className ||
    book.class ||
    ""
  );

  /* -----------------------------------------
     SUBJECT
     ----------------------------------------- */

  const subject = safeString(
    options.subject ||
    chapter.subject ||
    book.subject ||
    ""
  );

  /* -----------------------------------------
     BOOK
     ----------------------------------------- */

  const bookValue =
    options.bookTitle ||
    options.bookName ||
    options.course ||
    directBookTitle ||
    book.titleEn ||
    book.titleHi ||
    book.title ||
    book.name ||
    book.bookTitle ||
    book.bookName ||
    book.id ||
    "";

  const bookTitle = safeString(bookValue);

  /* -----------------------------------------
     CHAPTER NUMBER
     ----------------------------------------- */

  const chapterNumber = safeString(
    chapter.number ||
    chapter.chapterNumber ||
    chapter.chapterNo ||
    chapter.no ||
    chapter.id ||
    options.chapterNumber ||
    options.chapterNo ||
    ""
  );

  /* -----------------------------------------
     CHAPTER ENGLISH TITLE
     ----------------------------------------- */

  const chapterTitle = cleanTitle(
    chapter.en ||
    chapter.titleEn ||
    chapter.title ||
    chapter.name ||
    chapter.chapterTitle ||
    chapter.titleEnglish ||
    options.chapterTitle ||
    options.topic ||
    ""
  );

  /* -----------------------------------------
     CHAPTER HINDI TITLE
     ----------------------------------------- */

  const chapterHindi = cleanTitle(
    chapter.hi ||
    chapter.titleHi ||
    chapter.hindiTitle ||
    chapter.chapterHindi ||
    options.chapterHindi ||
    ""
  );

  /* -----------------------------------------
     EXAM / TARGET
     ----------------------------------------- */

  const exam = safeString(
    options.exam ||
    options.targetExam ||
    options.target ||
    chapter.exam ||
    book.exam ||
    "General"
  );

  /* -----------------------------------------
     LANGUAGE
     ----------------------------------------- */

  const language = safeString(
    options.language ||
    "Hindi"
  );

  /* -----------------------------------------
     MODE
     ----------------------------------------- */

  const mode = safeString(
    options.mode ||
    "Exam Notes"
  );

  /* -----------------------------------------
     FINAL CONTEXT
     ----------------------------------------- */

  const context = {
    className,
    subject,
    book: bookTitle,
    chapterNumber,
    chapterTitle,
    chapterHindi,
    exam,
    language,
    mode
  };

  console.log(
    "NEXORA Selection Context:",
    JSON.stringify(context, null, 2)
  );

  return context;
}


/* =========================================================
   SELECTION INTEGRITY
   ========================================================= */

function buildSelectionFingerprint(ctx) {
  return [
    ctx.className,
    ctx.subject,
    ctx.book,
    ctx.chapterNumber,
    ctx.chapterTitle,
    ctx.chapterHindi,
    ctx.exam,
    ctx.language
  ]
    .map(normalize)
    .filter(Boolean)
    .join(" | ");
}

function selectedChapterTokens(ctx) {
  const values = [ctx.chapterTitle, ctx.chapterHindi];
  const stopWords = new Set([
    'the','and','of','in','to','for','a','an','is','are','on','our','from','with','by',
    'chapter','class','book','course','part','का','के','की','और','में','से','को','एक',
    'अध्याय','हमारी','हमारा','हमारे'
  ]);
  const words = [];
  for (const value of values) {
    words.push(...normalize(value).split(' ').map(word => word.trim()).filter(word => word.length >= 4 && stopWords.has(word) === false));
  }
  return unique(words);
}


function chapterMatchScore(text, ctx) {
  const source = normalize(text);

  if (!source) return 0;

  const title = normalize(ctx.chapterTitle);
  const hindi = normalize(ctx.chapterHindi);

  let score = 0;

  if (title && source.includes(title)) {
    score += 100;
  }

  if (hindi && source.includes(hindi)) {
    score += 100;
  }

  const tokens = selectedChapterTokens(ctx);

  let matches = 0;

  for (const token of tokens) {
    if (source.includes(token)) {
      matches++;
    }
  }

  if (tokens.length) {
    score += Math.round(
      (matches / tokens.length) * 60
    );
  }

  if (
    ctx.chapterNumber &&
    new RegExp(
      `\\bchapter\\s*${ctx.chapterNumber}\\b`,
      "i"
    ).test(source)
  ) {
    score += 30;
  }

  return score;
}

function sourceBelongsToSelectedChapter(result, ctx) {
  const title = safeString(result?.title || "");
  const content = safeString(
    result?.rawContent ||
    result?.content ||
    ""
  );

  const combinedRaw = title + "\n" + content;
  const combined = normalize(combinedRaw);

  if (!combined) return false;

  const chapterTitle = normalize(ctx.chapterTitle || "");
  const chapterHindi = normalize(ctx.chapterHindi || "");
  const book = normalize(ctx.book || "");
  const subject = normalize(ctx.subject || "");
  const className = normalize(ctx.className || "");
  const chapterNumber = safeString(ctx.chapterNumber || "");

  if (!chapterTitle && !chapterHindi) {
    return false;
  }

  /*
   * HARD REJECTION:
   * Reject obvious SEO, answer-bank and commercial pages.
   */
  const badPatterns = [
    /ncert\s+solutions/i,
    /question\s+answer/i,
    /online\s+tuition/i,
    /homework/i,
    /complete\s+solutions/i,
    /download\s+pdf/i,
    /buy\s+now/i,
    /join\s+telegram/i,
    /whatsapp\s+group/i,
    /advertisement/i,
    /privacy\s+policy/i,
    /terms\s+and\s+conditions/i,
    /related\s+posts/i,
    /read\s+more/i,
    /click\s+here/i,
    /all\s+rights\s+reserved/i
  ];

  const badHits = badPatterns.filter(
    pattern => pattern.test(combinedRaw)
  ).length;

  if (badHits >= 2) {
    return false;
  }

  /*
   * Reject pages dominated by links/noise.
   */
  const urlMatches =
    combinedRaw.match(/https?:\/\/|www\./gi) || [];

  const markdownLinks =
    combinedRaw.match(/\[[^\]]+\]\([^)]+\)/g) || [];

  if (
    urlMatches.length >= 3 ||
    markdownLinks.length >= 3
  ) {
    return false;
  }

  const domain = getDomain(result?.url);

  if (
    domain &&
    BAD_DOMAINS.some(
      bad =>
        domain === bad ||
        domain.endsWith("." + bad)
    )
  ) {
    return false;
  }

  const isOfficial =
    domain === "ncert.nic.in" ||
    domain.endsWith(".ncert.nic.in") ||
    domain === "epathshala.nic.in" ||
    domain.endsWith(".epathshala.nic.in") ||
    domain === "education.gov.in" ||
    domain.endsWith(".education.gov.in") ||
    domain === "diksha.gov.in" ||
    domain.endsWith(".diksha.gov.in") ||
    domain === "cbse.gov.in" ||
    domain.endsWith(".cbse.gov.in");

  /*
   * =========================================================
   * CHAPTER MATCHING
   *
   * Exact title is preferred, but not mandatory.
   * Many NCERT/ePathshala pages expose chapter content
   * without repeating the complete chapter title.
   *
   * Therefore use meaningful title keywords as a controlled
   * fallback, always combined with textbook context.
   * =========================================================
   */

  const exactChapter =
    !!chapterTitle &&
    combined.includes(chapterTitle);

  const exactHindiChapter =
    !!chapterHindi &&
    combined.includes(chapterHindi);

  const hasChapterNumber =
    !!chapterNumber &&
    new RegExp(
      "\\bchapter\\s*" +
      chapterNumber +
      "\\b",
      "i"
    ).test(combinedRaw);

  const hasBook =
    !!book &&
    combined.includes(book);

  const hasSubject =
    !!subject &&
    combined.includes(subject);

  const hasClass =
    !!className &&
    combined.includes(className);

  /*
   * Build meaningful keywords from the selected chapter.
   * Ignore very short/common words so that a page cannot
   * match merely because it contains "the", "of", "in", etc.
   */
  const chapterStopWords = new Set([
    "the",
    "and",
    "for",
    "with",
    "from",
    "into",
    "this",
    "that",
    "chapter",
    "part",
    "class",
    "book",
    "india",
    "modern",
    "world"
  ]);

  const chapterKeywords =
    chapterTitle
      .split(/[^a-z0-9]+/i)
      .map(word => word.trim())
      .filter(
        word =>
          word.length >= 5 &&
          !chapterStopWords.has(word)
      );

  const keywordHits =
    chapterKeywords.filter(
      word => combined.includes(word)
    ).length;

  const keywordCoverage =
    chapterKeywords.length
      ? keywordHits / chapterKeywords.length
      : 0;

  /*
   * Exact title is always strongest.
   */
  if (exactChapter || exactHindiChapter) {
    const contextSignals = [
      hasChapterNumber,
      hasBook,
      hasSubject,
      hasClass
    ].filter(Boolean).length;

    return true;
  }

  /*
   * Generic chapter names need stronger protection.
   */
  const genericChapterNames = new Set([
    "environment",
    "air",
    "water",
    "resources",
    "democracy",
    "power",
    "food",
    "matter",
    "motion",
    "force",
    "energy",
    "life"
  ]);

  const isGenericChapter =
    genericChapterNames.has(chapterTitle);

  if (isGenericChapter) {
    const strongSignals = [
      hasChapterNumber,
      hasBook,
      hasSubject,
      hasClass
    ].filter(Boolean).length;

    if (
      keywordHits >= 1 &&
      strongSignals >= 2
    ) {
      return true;
    }

    if (
      isOfficial &&
      keywordHits >= 1 &&
      strongSignals >= 1
    ) {
      return true;
    }

    return false;
  }

  /*
   * Non-generic chapter fallback.
   *
   * Require meaningful keyword coverage plus independent
   * textbook context. This avoids accepting an unrelated
   * chapter merely because one common word happens to match.
   */
  const contextSignals = [
    hasChapterNumber,
    hasBook,
    hasSubject,
    hasClass
  ].filter(Boolean).length;

  /*
   * Strong keyword match:
   * - at least 2 meaningful chapter keywords
   * - at least 50% keyword coverage
   * - at least one independent context signal
   */
  if (
    keywordHits >= 2 &&
    keywordCoverage >= 0.5 &&
    contextSignals >= 1
  ) {
    return true;
  }

  /*
   * Official educational source can use a slightly lower
   * threshold because NCERT/ePathshala pages may omit
   * metadata from the extracted text.
   */
  if (
    isOfficial &&
    keywordHits >= 2 &&
    keywordCoverage >= 0.4 &&
    contextSignals >= 1
  ) {
    return true;
  }

  /*
   * Chapter number + strong keyword match is also reliable.
   */
  if (
    hasChapterNumber &&
    keywordHits >= 2 &&
    keywordCoverage >= 0.4
  ) {
    return true;
  }

  return false;
}

/* =========================================================
   SOURCE QUALITY
   ========================================================= */

const BAD_DOMAINS = [
  "supercop.in",
  "quora.com",
  "brainly.in",
  "brainly.com",
  "coursehero.com",
  "chegg.com",
  "scribd.com",
  "slideshare.net",
  "toppr.com",
  "doubtnut.com",
  "vedantu.com",
  "byjus.com",
  "testbook.com",
  "adda247.com",
  "jagranjosh.com",
  "learncbse.in",
  "selfstudys.com"
];

const BAD_PHRASES = ['buy now','download pdf','join telegram','whatsapp group','subscribe','answer key','test series','mock test','coaching','registration','admission','coupon','offer','shopping','click here','login','sign up','privacy policy','terms and conditions','related posts','read more','share this','follow us','advertisement','advertising','all rights reserved','ncert solutions','question answer','online tuition','homework','complete solutions','this guide provides','whether you are looking','for your homework'];

const GOOD_DOMAINS = [
  "ncert.nic.in",
  "epathshala.nic.in",
  "education.gov.in",
  "diksha.gov.in",
  "cbse.gov.in",
  "gov.in",
  "nic.in"
];

function getDomain(url) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function sourceQualityScore(result, context = {}) {
  const title = normalize(result?.title);
  const content = normalize(
    result?.rawContent ||
    result?.content ||
    ""
  );

  const url = safeString(result?.url);
  const domain = getDomain(url);

  let score = 0;

  const chapter = normalize(context.chapter);
  const subject = normalize(context.subject);
  const book = normalize(context.book);
  const className = normalize(context.className);

  if (
    GOOD_DOMAINS.some(domainName =>
      domain === domainName ||
      domain.endsWith(`.${domainName}`)
    )
  ) {
    score += 80;
  }

  if (domain.includes("ncert")) {
    score += 45;
  }

  if (domain.includes("epathshala")) {
    score += 45;
  }

  if (domain.includes("gov.in")) {
    score += 25;
  }

  if (domain.includes("nic.in")) {
    score += 20;
  }

  if (chapter && title.includes(chapter)) {
    score += 60;
  }

  if (subject && title.includes(subject)) {
    score += 15;
  }

  if (book && title.includes(book)) {
    score += 15;
  }

  if (className && title.includes(className)) {
    score += 15;
  }

  for (const phrase of BAD_PHRASES) {
    if (
      title.includes(phrase) ||
      content.includes(phrase)
    ) {
      score -= 12;
    }
  }

  for (const badDomain of BAD_DOMAINS) {
    if (domain.includes(badDomain)) {
      score -= 50;
    }
  }

  if (content.length > 800) {
    score += 10;
  }

  if (content.length > 2000) {
    score += 10;
  }

  return score;
}


/* =========================================================
   SOURCE CLEANING
   ========================================================= */

function removeWebNoise(text) {
  let output = cleanText(text);

  if (!output) return "";

  const lines = output
    .split("\n")
    .map(line => cleanSentence(line))
    .filter(Boolean);

  const useful = [];

  for (const line of lines) {
    const n = normalize(line);

    if (!n) continue;

    if (
      n.length < 20 &&
      !/[।.!?]$/.test(line)
    ) {
      continue;
    }

    if (
      BAD_PHRASES.some(
        phrase => n.includes(normalize(phrase))
      )
    ) {
      continue;
    }

    if (
      /^https?:\/\//i.test(line) ||
      /^www\./i.test(line)
    ) {
      continue;
    }

    if (
      /^url\s*:/i.test(line) ||
      /^source\s*:/i.test(line) ||
      /^content\s*:/i.test(line) ||
      /^score\s*:/i.test(line) ||
      /^title\s*:/i.test(line)
    ) {
      continue;
    }

    useful.push(line);
  }

  return cleanText(
    unique(useful).join("\n")
  );
}

function cleanSourceResult(result, ctx) {
  const title = cleanTitle(result?.title || "");
  const content = removeWebNoise(result?.rawContent || result?.content || "");
  if (!content) return null;

  if (!sourceBelongsToSelectedChapter(result, ctx)) return null;

  const normalizedContent = normalize(`${title} ${content}`);

  const contaminationPhrases = [
    "ncert solutions", "question answer", "online tuition",
    "homework", "complete solutions", "this guide provides",
    "whether you are looking", "for your homework",
    "subscribe", "advertisement", "related posts",
    "read more", "click here", "buy now"
  ];

  const contaminationHits = contaminationPhrases.filter(
    phrase => normalizedContent.includes(normalize(phrase))
  ).length;

  if (contaminationHits >= 2) {
    return null;
  }

  return {
    title,
    url: safeString(result?.url),
    content,
    score: result?._score || 0
  };
}


/* =========================================================
   EXAM PROFILES
   ========================================================= */

function getExamProfile(
  exam = "",
  className = "",
  subject = ""
) {
  const e = normalize(exam);
  const c = normalize(className);
  const s = normalize(subject);

  const profile = {
    name: exam || "General",
    type: "general",
    objective: true,
    descriptive: false,
    formulas: false,
    definitions: true,
    pyq: false,
    difficulty: "moderate",
    focus: [],
    sections: []
  };

  if (
    e.includes("upsc") ||
    e.includes("civil services") ||
    e.includes("ias")
  ) {
    profile.type = "upsc";
    profile.objective = true;
    profile.descriptive = true;
    profile.pyq = true;
    profile.difficulty = "advanced";

    profile.focus = [
      "conceptual clarity",
      "Prelims-relevant facts",
      "Mains analytical understanding",
      "cause-effect relationships",
      "interlinkages"
    ];

    return profile;
  }

  if (
    e.includes("ssc") ||
    e.includes("railway") ||
    e.includes("rrb") ||
    e.includes("bank") ||
    e.includes("ibps") ||
    e.includes("sbi") ||
    e.includes("defence") ||
    e.includes("nda") ||
    e.includes("cds")
  ) {
    profile.type = "competitive";
    profile.objective = true;
    profile.descriptive = false;
    profile.pyq = true;

    profile.focus = [
      "important facts",
      "definitions",
      "conceptual distinctions",
      "objective practice"
    ];

    return profile;
  }

  if (
    e.includes("jee") ||
    e.includes("engineering entrance")
  ) {
    profile.type = "jee";
    profile.objective = true;
    profile.formulas = true;
    profile.pyq = true;
    profile.difficulty = "advanced";

    profile.focus = [
      "concepts",
      "formulae",
      "application",
      "numerical reasoning"
    ];

    return profile;
  }

  if (
    e.includes("neet") ||
    e.includes("medical entrance")
  ) {
    profile.type = "neet";
    profile.objective = true;
    profile.pyq = true;
    profile.difficulty = "advanced";

    profile.focus = [
      "core concepts",
      "NCERT facts",
      "scientific processes",
      "MCQ practice"
    ];

    return profile;
  }

  if (
    e.includes("pcs") ||
    e.includes("state pcs") ||
    e.includes("uppsc") ||
    e.includes("bpsc") ||
    e.includes("mppsc") ||
    e.includes("ras") ||
    e.includes("psc")
  ) {
    profile.type = "state_pcs";
    profile.objective = true;
    profile.descriptive = true;
    profile.pyq = true;
    profile.difficulty = "advanced";

    profile.focus = [
      "conceptual understanding",
      "Prelims facts",
      "Mains orientation",
      "state relevance where supported"
    ];

    return profile;
  }

  if (
    c.includes("class") ||
    /\b[1-9]\b/.test(c) ||
    /\b1[0-2]\b/.test(c) ||
    e.includes("school") ||
    e.includes("board") ||
    e.includes("cbse") ||
    e.includes("icse")
  ) {
    profile.type = "school";
    profile.objective = true;
    profile.descriptive = true;
    profile.pyq = false;
    profile.difficulty = "school";

    profile.focus = [
      "textbook concepts",
      "definitions",
      "examples",
      "exam understanding"
    ];

    return profile;
  }

  if (
    e.includes("college") ||
    e.includes("university") ||
    e.includes("graduation") ||
    e.includes("semester")
  ) {
    profile.type = "college";
    profile.objective = true;
    profile.descriptive = true;
    profile.difficulty = "advanced";

    profile.focus = [
      "detailed concepts",
      "theoretical understanding",
      "applications",
      "descriptive answers"
    ];

    return profile;
  }

  return profile;
}


/* =========================================================
   TARGET RULES
   ========================================================= */

function targetRules(profile) {
  switch (profile.type) {
    case "upsc":
      return `
- UPSC-oriented conceptual revision.
- Separate Prelims facts from analytical understanding.
- Explain causes, consequences and interrelationships.
- Mains questions should require explanation/analysis.
`;

    case "competitive":
      return `
- Objective examination orientation.
- Focus on important facts, concepts and distinctions.
- MCQs should test actual chapter knowledge.
- Keep revision concise.
`;

    case "jee":
      return `
- Concept + application orientation.
- Include formulas only where genuinely applicable.
- Numerical/application questions should be chapter-relevant.
`;

    case "neet":
      return `
- Strong focus on textbook/scientific concepts.
- Highlight factual distinctions and biological/scientific processes.
- MCQs should test conceptual understanding.
`;

    case "state_pcs":
      return `
- State PCS conceptual preparation.
- Prelims facts plus Mains-oriented understanding.
- State-specific facts only when actually supported.
`;

    case "school":
      return `
- Textbook-oriented explanation.
- Simple, accurate and exam-friendly.
- Definitions, examples, concepts and short-answer preparation.
`;

    case "college":
      return `
- Detailed academic explanation.
- Definitions, characteristics, theoretical relationships and applications.
- Include descriptive examination preparation.
`;

    default:
      return `
- General academic and exam-oriented revision.
- Clear concepts, definitions, examples and important facts.
`;
  }
}


/* =========================================================
   SEARCH QUERY BUILDER
   ========================================================= */

function buildSearchQueries(ctx) {
  const queries = [];

  const chapter = cleanText(
    ctx.chapterTitle ||
    ctx.chapterHindi ||
    ""
  );

  const chapterHindi = cleanText(
    ctx.chapterHindi || ""
  );

  const number = ctx.chapterNumber
    ? `Chapter ${ctx.chapterNumber}`
    : "";

  const classPart = cleanText(ctx.className || "");
  const subjectPart = cleanText(ctx.subject || "");
  const bookPart = cleanText(ctx.book || "");

  if (!chapter) {
    return [];
  }

  /*
   * STRICT CHAPTER-LOCKED SEARCH
   *
   * Generic chapter names such as "Environment" can match
   * unrelated academic pages. Every query therefore carries
   * as much selection context as possible.
   */

  if (bookPart) {
    queries.push(
      `"${chapter}" "${bookPart}" "${subjectPart}" "${classPart}"`
    );
  }

  if (number) {
    queries.push(
      `"${chapter}" "${number}" "${bookPart}" "${subjectPart}" "${classPart}"`
    );
  }

  queries.push(
    `"${chapter}" "${subjectPart}" "${classPart}" textbook`
  );

  queries.push(
    `"${chapter}" "${bookPart}" "${classPart}" textbook`
  );

  /*
   * Official NCERT / ePathshala sources.
   * These are intentionally restricted to official domains.
   */
  const bookNorm = normalize(bookPart);

  if (
    bookNorm.includes("ncert") ||
    bookNorm.includes("our environment") ||
    bookNorm.includes("first flight") ||
    bookNorm.includes("footprints") ||
    bookNorm.includes("democratic politics") ||
    bookNorm.includes("india and contemporary world")
  ) {
    queries.push(
      `"${chapter}" "${classPart}" "${subjectPart}" site:ncert.nic.in`
    );

    queries.push(
      `"${chapter}" "${classPart}" "${subjectPart}" site:epathshala.nic.in`
    );
  }

  /*
   * Hindi chapter search only when a separate Hindi title exists.
   */
  if (
    chapterHindi &&
    normalize(chapterHindi) !== normalize(chapter)
  ) {
    queries.push(
      `"${chapterHindi}" "${classPart}" "${subjectPart}" "${bookPart}"`
    );
  }

  return unique(
    queries
      .map(q => cleanText(q))
      .filter(Boolean)
  ).slice(0, 8);
}

/* =========================================================
   TAVILY CHAPTER SOURCE
   ========================================================= */



/* NEXORA_CHAPTER_FALLBACK_RECOVERY_V15 */
function nexoraChapterFallbackAllowedV15(book, chapter, exam, language) {
    const bookTitle = String(
        (book && (book.titleEn || book.title || book.name)) || ""
    ).trim();

    const chapterTitle = String(
        (chapter && (chapter.titleEn || chapter.title || chapter.name)) || ""
    ).trim();

    if (!chapterTitle) return false;

    const key = `${bookTitle} ${chapterTitle}`.toLowerCase();

    /*
     * Fallback is permitted only when the selected chapter/book are known.
     * It must never replace the selected chapter with another chapter.
     */
    return Boolean(
        chapter &&
        (
            chapter.number != null ||
            chapter.id ||
            chapter.key ||
            chapter.titleEn ||
            chapter.title
        )
    );
}

function nexoraBuildChapterRecoveryPromptV15({
    book,
    chapter,
    exam = "UPSC",
    language = "english"
} = {}) {
  const __NEXORA_TOPIC_VISUAL_RULES = NEXORA_TOPIC_VISUAL_NOTES_RULES;
    const bookTitle = String(
        (book && (book.titleEn || book.title || book.name)) || ""
    ).trim();

    const chapterNumber = String(
        (chapter && chapter.number != null) ? chapter.number : ""
    ).trim();

    const chapterTitleEn = String(
        (chapter && (chapter.titleEn || chapter.title || chapter.name)) || ""
    ).trim();

    const chapterTitleHi = String(
        (chapter && chapter.titleHi) || ""
    ).trim();

    const selectedTitle =
        String(language).toLowerCase().startsWith("hi")
            ? (chapterTitleHi || chapterTitleEn)
            : chapterTitleEn;

    return `
You are generating NEXORA exam notes.

STRICT SELECTED CHAPTER:
Book/Course: ${bookTitle || "Not specified"}
Chapter Number: ${chapterNumber || "Not specified"}
Chapter: ${selectedTitle}

IMPORTANT:
- Generate content ONLY for this exact selected chapter.
- Never substitute another chapter.
- Never say that source material is unavailable.
- Do not output SOURCE STATUS as the main content.
- Do not invent an authentic PYQ.
- If verified PYQs are unavailable, explicitly state that no verified authentic PYQ was added.
- Content must be factually grounded in standard textbook knowledge.
- Target exam: ${exam}
- Language: ${language}

REQUIRED STRUCTURE:
CHAPTER OVERVIEW
NCERT / CORE CONCEPTS
KEY DEFINITIONS
IMPORTANT TERMS
DETAILED NOTES
CAUSES / BACKGROUND
MAJOR EVENTS
IMPORTANT PERSONALITIES
IMPORTANT DATES
CONSEQUENCES / IMPACT
EXAM FOCUS
PRACTICE MCQs
AUTHENTIC PYQs
MAINS / DESCRIPTIVE QUESTIONS
LAST-MINUTE REVISION
ONE-PAGE MEMORY MAP

For UPSC/UPPCS/descriptive preparation:
- Include at least 15 chapter-specific MCQs with answers and explanations.
- Include 3 chapter-specific descriptive/Mains questions.
- Give a complete model answer for every descriptive question.
- Each model answer should be approximately 500-700 words when sufficient chapter content permits.
- Do not label AI-created questions as PYQs.
- Keep every question and answer strictly chapter-specific.

Return the actual educational content, not a status/error message.
`;
}



/* NEXORA_TOPPER_ENGINE_V1 */

const NEXORA_TOPPER_NOTE_REQUIREMENTS = `
NEXORA PERMANENT MAINS STANDARD V1

For UPSC, UPPCS, State PCS and other descriptive examinations:
- Produce EXACTLY 3 chapter-specific Mains/descriptive questions.
- Each question must be meaningfully different from the other two.
- Each question must have its own separate complete model answer.
- Target 500–700 words per answer where sufficient chapter material exists.
- Do not repeat the same answer with different wording.
- Do not label generated practice questions as PYQs.
- Authentic PYQs must remain separate and must only be included when verified.

NEXORA TOPPER-LEVEL SHORT NOTES ENGINE

The selected combination is authoritative:
EXAM + CLASS/LEVEL + SUBJECT + BOOK + CHAPTER + LANGUAGE + MODE.

Generate notes ONLY for the selected chapter.
Do NOT mix unrelated chapters, subjects, books, classes or examinations.
Do NOT invent a chapter, source, author, publication detail, PYQ or factual claim.

The output must feel like professionally prepared topper/revision notes rather than a generic AI summary.

MANDATORY CONTENT STRUCTURE:

1. CHAPTER TITLE
2. EXAM RELEVANCE
   - Explain why this chapter matters for the selected examination.
   - Adapt depth to the selected exam.
3. QUICK OVERVIEW
   - Short, high-density chapter summary.
4. CORE CONCEPTS
   - Explain every important concept clearly.
   - Use simple language first, then exam terminology.
5. DETAILED NOTES
   - Cover the important material systematically.
   - Use headings, subheadings, numbered points and bullets.
6. DEFINITIONS
   - Important definitions with precise meanings.
7. KEY TERMS
   - Important terminology and keywords.
8. FACTS / DATA / DATES / NAMES
   - Include only relevant and reliable facts.
9. CAUSES / FEATURES / PROCESS / EFFECTS
   - Use the structure appropriate to the chapter.
10. COMPARISONS
   - Use tables wherever comparison improves understanding.
11. EXAMPLES / APPLICATIONS
   - Give chapter-specific examples.
12. IMPORTANT EXAM POINTS
   - High-value facts and concepts suitable for revision.
13. COMMON CONFUSIONS / TRAPS
   - Distinguish concepts students commonly confuse.
14. VISUAL / DIAGRAM / FLOWCHART
   - Add useful chapter-specific diagrams, maps, timelines, flowcharts,
     tables or conceptual visuals whenever appropriate.
   - Never add an unrelated visual.
15. PRELIMS / OBJECTIVE PRACTICE
   - Create at least 15 chapter-specific MCQs where the selected exam uses
     objective questions.
   - Every MCQ must be derived from the chapter content.
   - Include four options and the correct answer.
   - Add a brief explanation for the answer.
16. AUTHENTIC PYQs
   - Include only verified/authentic PYQs when reliable PYQ data is available.
   - NEVER label AI-created questions as PYQs.
   - If verified PYQs are unavailable, explicitly say so.
17. MAINS / DESCRIPTIVE PRACTICE
   - Where the selected examination has descriptive/mains questions,
     provide 3 chapter-specific questions.
   - Give complete structured model answers where appropriate.
   - Long-form answers should normally be approximately 500–700 words
     when that level of answer is appropriate for the examination.
   - Use Introduction → Body → Examples/Data → Analysis → Conclusion
     where appropriate.
18. QUICK REVISION
   - One-page-style high-density revision section.
19. LAST-MINUTE REVISION
   - Very short bullets containing the most important takeaways.
20. EXAM CHECKLIST
   - What the student should remember before the examination.

QUALITY RULES:

- Never produce filler.
- Never repeat the same point unnecessarily.
- Never use generic advice in place of chapter content.
- Never change the selected language.
- Preserve important English technical terms in parentheses when useful.
- Use tables for comparisons.
- Use bullets for revision.
- Use chronological order for historical material.
- Use cause → process → effect structure for relevant topics.
- Use definition → formula → example → application for quantitative/science
  topics where appropriate.
- For Mathematics/Physics/Chemistry include formulas, variables, units,
  assumptions and solved examples where relevant.
- For Biology include processes, structures, functions and comparisons.
- For Geography include location, processes, maps/diagrams and examples.
- For History include chronology, causes, events, personalities,
  consequences and significance.
- For Polity include constitutional provisions, institutions,
  articles/terms only when reliable and relevant.
- For Economy include concepts, mechanisms, policy relevance and examples.
- For Environment include ecosystems, processes, conventions and examples
  where relevant.
- For English/Hindi/language subjects adapt the structure to the subject
  instead of forcing science-style sections.
- For JEE/NEET/GATE and similar technical exams prioritize concepts,
  formulas, problem-solving and exam-oriented practice.
- For UPSC/State PSC/UGC NET/other descriptive exams prioritize analytical
  understanding, interconnections and answer-writing.
- For SSC/RRB/Banking/other objective exams prioritize factual accuracy,
  shortcuts where legitimate, high-yield concepts and MCQ practice.
- For School/Board exams prioritize textbook-aligned concepts and
  examination-oriented explanation.
- Never manufacture citations or sources.
- Never manufacture a PYQ.
- Never claim a book's exact chapter if it has not been established by the
  selected catalogue/source.
- Keep the chapter boundary strict.
- The final result must be useful both for first learning and last-minute
  revision.
`;

function nexoraApplyTopperRequirements(prompt) {
  const base = String(prompt || "");
  return base + "\\n\\n" + NEXORA_TOPPER_NOTE_REQUIREMENTS;
}


async function fetchChapterSource(options = {}) {
  const ctx = chapterContext(options);

  if (!webSearch) {
    return {
      results: [],
      sourceText: "",
      queries: []
    };
  }

  const queries = buildSearchQueries(ctx);
  const allResults = [];

  console.log(
    `NEXORA Source Search: ${queries.length} chapter-specific queries`
  );

  for (const query of queries.slice(0, 8)) {
    try {
      const response = await webSearch.search(
        query,
        {
          searchDepth: "basic",
          maxResults: 6,
          includeAnswer: false,
          includeRawContent: true
        }
      );

      if (
        Array.isArray(response?.results)
      ) {
        allResults.push(
          ...response.results
        );
      }
    } catch (error) {
      console.error(
        "NEXORA Tavily query failed:",
        error?.message || error
      );
    }
  }

  /*
   * Deduplicate by URL.
   */
  const urlSeen = new Set();
  const deduped = [];

  for (const result of allResults) {
    const url = safeString(result?.url);

    const key = url ||
      `${safeString(result?.title)}|${safeString(result?.content)}`;

    if (urlSeen.has(key)) {
      continue;
    }

    urlSeen.add(key);
    deduped.push(result);
  }

  /*
   * Score.
   */
  const scored = deduped
    .map(result => ({
      ...result,
      _score: sourceQualityScore(
        result,
        {
          chapter: ctx.chapterTitle,
          subject: ctx.subject,
          book: ctx.book,
          className: ctx.className
        }
      )
    }))
    .sort(
      (a, b) =>
        b._score - a._score
    );

  /*
   * Clean and chapter-filter.
   */
  const cleaned = [];

  for (const result of scored) {
    const item = cleanSourceResult(
      result,
      ctx
    );

    if (!item) continue;

    cleaned.push({
      ...result,
      title: item.title,
      url: item.url,
      content: item.content,
      _score: item.score
    });
  }

  /*
   * Keep only useful chapter-specific sources.
   */
  const selected = cleaned
    .filter(result => {
      /*
       * FINAL HARD CHAPTER LOCK
       *
       * Never allow a source into the final evidence set
       * unless it passes the same strict chapter validation
       * used during source cleaning.
       */
      if (!sourceBelongsToSelectedChapter(result, ctx)) {
        return false;
      }

      const chapterScore =
        chapterMatchScore(
          `${result.title}\n${result.content}`,
          ctx
        );

      /*
       * Generic chapter names such as "Environment" require
       * a stronger score. Non-generic chapters can use the
       * normal threshold.
       */
      const chapterTitle =
        normalize(ctx.chapterTitle || "");

      const genericChapterNames = new Set([
        "environment",
        "air",
        "water",
        "resources",
        "democracy",
        "power",
        "food",
        "matter",
        "motion",
        "force",
        "energy",
        "life"
      ]);

      if (genericChapterNames.has(chapterTitle)) {
        return chapterScore >= 80;
      }

      return chapterScore >= 20;
    })
    .sort(
      (a, b) =>
        (b._score || 0) -
        (a._score || 0)
    )
    .slice(0, 8);

  const sourceBlocks = selected.map(
    (result, index) => {
      return `
CHAPTER SOURCE ${index + 1}

TITLE:
${result.title}

CONTENT:
${limitText(result.content, 6500)}
`;
    }
  );

  /*
   * FINAL SOURCE SANITIZATION
   *
   * Only chapter-specific evidence reaches Gemini/fallback.
   * Remove navigation, URLs and retrieval metadata without
   * removing genuine chapter sentences.
   */
  const sourceText = limitText(
    removeWebNoise(
      sourceBlocks
        .join("\n")
        .replace(/\[([^\]]+)\]\((?:https?:\/\/|www\.)[^)]*\)/gi, "$1")
        .replace(/https?:\/\/\S+/gi, "")
        .replace(/www\.\S+/gi, "")
        .replace(/\b(?:url|source|content|score|title)\s*:\s*[^\n]*/gi, "")
        .replace(/\b(?:prelims|contents|table of contents)\b/gi, "")
    ),
    36000
  );

  console.log(
    `NEXORA Source Search: ${selected.length} usable chapter-specific sources`
  );

  return {
    results: selected,
    sourceText,
    queries
  };
}


/* =========================================================
   SENTENCE ENGINE
   ========================================================= */

function splitSentences(text = "") {
  const value = removeWebNoise(text);

  if (!value) return [];

  return value
    .replace(/\n+/g, " ")
    .split(
      /(?<=[.!?।！？])\s+|(?<=:)\s+(?=[A-Z\u0900-\u097F0-9])/u
    )
    .map(cleanSentence)
    .filter(
      sentence =>
        sentence.length >= 30 &&
        sentence.length <= 500
    );
}

function chapterKeywordSet(ctx) {
  const words = [];

  [
    ctx.chapterTitle,
    ctx.chapterHindi,
    ctx.subject,
    ctx.book
  ].forEach(field => {
    words.push(
      ...normalize(field)
        .split(" ")
        .filter(
          word =>
            word.length >= 3 &&
            ![
              "class",
              "history",
              "geography",
              "science",
              "social",
              "studies",
              "ncert",
              "book"
            ].includes(word)
        )
    );
  });

  return new Set(words);
}

function scoreEvidence(sentence, ctx) {
  const normalized =
    normalize(sentence);

  const keywords =
    chapterKeywordSet(ctx);

  let score = 0;

  for (const word of keywords) {
    if (normalized.includes(word)) {
      score += 2;
    }
  }

  if (
    /\b(is|are|means|refers|defined|called|known as)\b/i.test(
      sentence
    )
  ) {
    score += 3;
  }

  if (
    /(?:है|हैं|कहलाता|कहलाती|अर्थात|जिसे|जिसका|जिसमें|अर्थ)/u.test(
      sentence
    )
  ) {
    score += 3;
  }

  if (
    /\b(because|therefore|causes|results|leads|process|due to|effect)\b/i.test(
      sentence
    )
  ) {
    score += 2;
  }

  if (
    /(?:क्योंकि|इसलिए|कारण|परिणाम|प्रक्रिया|प्रभाव|फलस्वरूप)/u.test(
      sentence
    )
  ) {
    score += 2;
  }

  if (
    sentence.length >= 50 &&
    sentence.length <= 280
  ) {
    score += 2;
  }

  return score;
}

function extractEvidence(
  sourceText,
  ctx,
  max = 35
) {
  const sentences =
    splitSentences(sourceText);

  return sentences
    .map(sentence => ({
      sentence,
      score: scoreEvidence(
        sentence,
        ctx
      )
    }))
    .sort(
      (a, b) =>
        b.score - a.score
    )
    .filter(
      item => item.score >= 2
    )
    .map(item => item.sentence)
    .filter(Boolean)
    .slice(0, max);
}


/* =========================================================
   DEFINITIONS
   ========================================================= */

function extractDefinitions(
  sourceText,
  ctx,
  max = 12
) {
  const sentences =
    splitSentences(sourceText);

  const output = [];

  for (const sentence of sentences) {
    let match = null;

    match = sentence.match(
      /^(.{2,90}?)\s+(?:is|are|means|refers to|is defined as)\s+(.{8,260})$/i
    );

    if (!match) {
      match = sentence.match(
        /^(.{2,90}?)\s+(?:को|का|की)?\s*(?:कहते हैं|कहा जाता है|कहलाता है|कहलाती है)\s*(.{5,240})$/u
      );
    }

    if (!match) {
      match = sentence.match(
        /^(.{2,90}?)\s*[:\-–]\s*(.{12,260})$/u
      );
    }

    if (!match) continue;

    const term =
      cleanSentence(match[1]);

    const definition =
      cleanSentence(match[2]);

    if (
      term.length < 2 ||
      term.length > 90 ||
      definition.length < 8
    ) {
      continue;
    }

    if (
      BAD_PHRASES.some(
        phrase =>
          normalize(term).includes(
            normalize(phrase)
          )
      )
    ) {
      continue;
    }

    output.push(
      `${term}: ${definition}`
    );
  }

  return unique(output)
    .filter(item => {
      return chapterMatchScore(
        item,
        ctx
      ) >= 2;
    })
    .slice(0, max);
}


/* =========================================================
   CONCEPTS
   ========================================================= */

function simplifyConcept(sentence) {
  let text =
    cleanSentence(sentence);

  if (text.length > 280) {
    text =
      text.slice(0, 277) + "...";
  }

  return text;
}

function extractConcepts(
  sourceText,
  ctx,
  max = 15
) {
  const evidence =
    extractEvidence(
      sourceText,
      ctx,
      70
    );

  const output = [];

  for (const sentence of evidence) {
    const concept =
      simplifyConcept(sentence);

    if (concept.length < 40) {
      continue;
    }

    const duplicate =
      output.some(existing => {
        const a = normalize(existing);
        const b = normalize(concept);

        return (
          a === b ||
          a.includes(b.slice(0, 45)) ||
          b.includes(a.slice(0, 45))
        );
      });

    if (duplicate) {
      continue;
    }

    output.push(concept);
  }

  return output.slice(0, max);
}


/* =========================================================
   KEY TERMS
   ========================================================= */

function extractKeyTerms(
  sourceText,
  ctx,
  max = 18
) {
  const candidates = [];

  const quoted =
    cleanText(sourceText).match(
      /["“”']([^"“”']{2,70})["“”']/gu
    );

  if (quoted) {
    for (const item of quoted) {
      candidates.push(
        item
          .replace(/["“”']/g, "")
          .trim()
      );
    }
  }

  const definitions =
    extractDefinitions(
      sourceText,
      ctx,
      30
    );

  for (const item of definitions) {
    const term =
      item.split(":")[0];

    if (term) {
      candidates.push(term);
    }
  }

  /*
   * Do not blindly add every chapter keyword.
   * Only title-specific words are added when useful.
   */
  const titleWords = [
    ...normalize(ctx.chapterTitle)
      .split(" ")
      .filter(word =>
        word.length >= 4
      )
  ];

  candidates.push(...titleWords);

  return unique(candidates)
    .map(cleanSentence)
    .filter(term => {
      const n =
        normalize(term);

      return (
        n.length >= 3 &&
        n.length <= 90 &&
        !BAD_PHRASES.some(
          phrase =>
            n.includes(
              normalize(phrase)
            )
        )
      );
    })
    .slice(0, max);
}


/* =========================================================
   CATEGORIES / TYPES / COMPONENTS
   ========================================================= */

function extractCategories(
  sourceText,
  ctx,
  max = 10
) {
  const sentences =
    splitSentences(sourceText);

  const output = [];

  for (const sentence of sentences) {
    if (
      /\b(types?|kinds?|classified|classification|categories|divided|parts?|components?|forms?)\b/i.test(
        sentence
      ) ||
      /(?:प्रकार|वर्ग|वर्गीकरण|भाग|घटक|श्रेण|रूपों|किस्म)/u.test(
        sentence
      )
    ) {
      output.push(
        simplifyConcept(sentence)
      );
    }
  }

  return unique(output)
    .slice(0, max);
}


/* =========================================================
   PROCESS / CAUSE / EFFECT
   ========================================================= */

function extractProcesses(
  sourceText,
  ctx,
  max = 8
) {
  const sentences =
    splitSentences(sourceText);

  const output = [];

  for (const sentence of sentences) {
    if (
      /\b(process|stage|stages|steps|sequence|cycle|causes|result|results|leads|effect|consequence)\b/i.test(
        sentence
      ) ||
      /(?:प्रक्रिया|चरण|क्रम|चक्र|कारण|परिणाम|प्रभाव|फलस्वरूप)/u.test(
        sentence
      )
    ) {
      output.push(
        simplifyConcept(sentence)
      );
    }
  }

  return unique(output)
    .slice(0, max);
}


/* =========================================================
   IMPORTANT FACTS
   ========================================================= */

function extractShortFacts(
  sourceText,
  ctx,
  max = 15
) {
  const evidence =
    extractEvidence(
      sourceText,
      ctx,
      70
    );

  return unique(
    evidence.filter(
      sentence =>
        sentence.length <= 230
    )
  ).slice(0, max);
}


/* =========================================================
   MCQ ENGINE
   ========================================================= */

function shortenOption(
  text,
  max = 105
) {
  const value =
    cleanSentence(text);

  if (value.length <= max) {
    return value;
  }

  return (
    value.slice(0, max - 3) +
    "..."
  );
}

function shuffleArray(items) {
  const array = [...items];

  for (
    let i = array.length - 1;
    i > 0;
    i--
  ) {
    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      array[i],
      array[j]
    ] = [
      array[j],
      array[i]
    ];
  }

  return array;
}

/* =========================================================
   IMPROVED MCQ GENERATOR
   ========================================================= */

function shuffleArray(items = []) {
  const array = [...items];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function normalizeMCQText(value = "") {
  return cleanText(
    String(value || "")
      .replace(/\s+/g, " ")
      .trim()
  );
}


function isCleanMCQOption(value = "") {
  const text = normalizeMCQText(value);
  if (!text) return false;

  const normalized = normalize(text);

  if (
    /https?:\/\//i.test(text) ||
    /www\./i.test(text) ||
    /\[[^\]]+\]\([^)]*\)/i.test(text)
  ) {
    return false;
  }

  const blocked = [
    "supercop",
    "ncert solutions",
    "question answer",
    "online tuition",
    "homework",
    "download pdf",
    "buy now",
    "subscribe",
    "advertisement",
    "privacy policy",
    "terms and conditions",
    "related posts",
    "read more",
    "click here",
    "prelims",
    "contents",
    "table of contents"
  ];

  if (
    blocked.some(
      phrase => normalized.includes(normalize(phrase))
    )
  ) {
    return false;
  }

  return text.length >= 2 && text.length <= 700;
}


function createDescriptiveQuestions(
  sourceText = "",
  ctx = {},
  count = 7
) {
  const chapter =
    ctx.chapterTitle ||
    ctx.chapter ||
    "Selected Chapter";

  const subject =
    ctx.subject ||
    "Subject";

  const exam =
    String(ctx.exam || "").toLowerCase();

  const questions = [];

  const base = [
    `Explain the meaning, key features and importance of ${chapter} in the context of ${subject}.`,
    `Describe the major concepts or components associated with ${chapter}.`,
    `Explain the causes, characteristics and significance of the important ideas discussed in ${chapter}.`,
    `Differentiate between the major concepts, categories or processes related to ${chapter} with suitable examples.`,
    `Discuss the practical, social, geographical, scientific or economic significance of the concepts covered in ${chapter}.`,
    `Explain the relationship between the important concepts covered in ${chapter} and their real-world applications.`,
    `Summarise the most important exam-relevant concepts from ${chapter} and explain why they are important.`
  ];

  if (
    exam.includes("upsc") ||
    exam.includes("pcs") ||
    exam.includes("civil")
  ) {
    base[0] = `Explain the key concepts of ${chapter} and examine their significance from an examination perspective.`;
    base[1] = `Discuss the major features of ${chapter} with suitable examples.`;
    base[2] = `Analyse the causes, characteristics and consequences of the important issues covered in ${chapter}.`;
    base[3] = `Differentiate between the major concepts or processes related to ${chapter} and explain their significance.`;
    base[4] = `Discuss the significance of ${chapter} in a broader social, geographical, scientific, economic or environmental context.`;
    base[5] = `How can the concepts covered in ${chapter} be applied to understand real-world situations?`;
    base[6] = `Write a concise analytical note on the most important aspects of ${chapter}.`;
  }

  return base.slice(0, Math.max(1, Math.min(count, base.length))).map(
    (question, index) => ({
      number: index + 1,
      question,
      type: "Descriptive Practice Question",
      authenticPYQ: false
    })
  );
}

function createMCQs(
  sourceText = "",
  ctx = {},
  max = 15
) {
  /* UNIVERSAL QUALITY INSTRUCTION */
  const __nexoraMCQQualityRules = NEXORA_UNIVERSAL_MCQ_RULES;

  const source = removeWebNoise(sourceText);

  if (!hasMeaningfulText(source, 80)) {
    return [];
  }

  const definitions = extractDefinitions(
    source,
    ctx,
    20
  );

  const concepts = extractConcepts(
    source,
    ctx,
    30
  );

  const facts = extractShortFacts(
    source,
    ctx,
    40
  );

  const evidence = extractEvidence(
    source,
    ctx,
    60
  );

  const questions = [];
  const usedQuestions = new Set();

  function addQuestion(questionData) {
    if (!questionData) return;

    const question =
      normalizeMCQText(questionData.question);

    if (!question) return;

    const key = normalize(
      question
    );

    if (usedQuestions.has(key)) {
      return;
    }

    const options =
      Array.isArray(questionData.options)
        ? questionData.options
            .map(normalizeMCQText)
            .filter(isCleanMCQOption)
        : [];

    if (options.length !== 4) {
      return;
    }

    const uniqueOptions =
      unique(options);

    if (uniqueOptions.length !== 4) {
      return;
    }

    const answer =
      normalizeMCQText(
        questionData.answer
      );

    if (!answer) return;

    if (
      !uniqueOptions.some(
        option =>
          normalize(option) ===
          normalize(answer)
      )
    ) {
      return;
    }

    usedQuestions.add(key);

    questions.push({
      question,
      options: uniqueOptions,
      answer,
      explanation:
        normalizeMCQText(
          questionData.explanation
        )
    });
  }

  /*
   * ---------------------------------------------------------
   * DEFINITION MCQs
   * ---------------------------------------------------------
   *
   * Correct answer = correct meaning.
   * Distractors = meanings of other chapter definitions.
   */

  const parsedDefinitions = [];

  for (const definition of definitions) {
    const value =
      normalizeMCQText(definition);

    if (!value) continue;

    let match =
      value.match(
        /^(.{2,100}?)[\s:–—-]+(.{20,500})$/u
      );

    if (!match) {
      continue;
    }

    const term =
      normalizeMCQText(match[1]);

    const meaning =
      normalizeMCQText(match[2]);

    if (
      term.length < 2 ||
      meaning.length < 20
    ) {
      continue;
    }

    parsedDefinitions.push({
      term,
      meaning
    });
  }

  for (
    let i = 0;
    i < parsedDefinitions.length &&
    questions.length < max;
    i++
  ) {
    const current =
      parsedDefinitions[i];

    const distractors =
      parsedDefinitions
        .filter(
          (_, index) =>
            index !== i
        )
        .map(
          item =>
            item.meaning
        )
        .filter(
          meaning =>
            meaning.length >= 20
        );

    if (
      distractors.length < 3
    ) {
      continue;
    }

    const options =
      shuffleArray([
        current.meaning,
        ...shuffleArray(
          distractors
        ).slice(0, 3)
      ]);

    addQuestion({
      question:
        `निम्न में से "${current.term}" का सही अर्थ/विवरण कौन-सा है?`,
      options,
      answer:
        current.meaning,
      explanation:
        `"${current.term}" का सही विवरण उपलब्ध chapter evidence के अनुसार: ${current.meaning}`
    });
  }

  /*
   * ---------------------------------------------------------
   * CONCEPT MCQs
   * ---------------------------------------------------------
   */

  const conceptTemplates = [
    concept => ({
      question:
        `निम्न में से कौन-सा कथन "${ctx.chapterTitle || "इस अध्याय"}" की अवधारणा को सही रूप से समझाता है?`,
      correct: concept
    }),

    concept => ({
      question:
        `चयनित अध्याय के अनुसार निम्न में से सही कथन कौन-सा है?`,
      correct: concept
    }),

    concept => ({
      question:
        `निम्न में से कौन-सा कथन अध्याय में दिए गए प्रमुख विचार से मेल खाता है?`,
      correct: concept
    }),

    concept => ({
      question:
        `अध्याय की अवधारणाओं के संदर्भ में सही विकल्प चुनिए।`,
      correct: concept
    })
  ];

  for (
    let i = 0;
    i < concepts.length &&
    questions.length < max;
    i++
  ) {
    const concept =
      normalizeMCQText(
        concepts[i]
      );

    if (
      concept.length < 30
    ) {
      continue;
    }

    const distractors =
      concepts
        .filter(
          (_, index) =>
            index !== i
        )
        .map(normalizeMCQText)
        .filter(isCleanMCQOption)
        .filter(
          item =>
            item.length >= 30 &&
            normalize(item) !== normalize(concept)
        )
        .filter(
          item =>
            !normalize(item).includes(
              normalize(ctx.chapterTitle || "")
            ) ||
            normalize(concept).includes(
              normalize(ctx.chapterTitle || "")
            )
        );

    if (
      distractors.length < 3
    ) {
      continue;
    }

    const template =
      conceptTemplates[
        i %
          conceptTemplates.length
      ](concept);

    const options =
      shuffleArray([
        template.correct,
        ...shuffleArray(
          distractors
        ).slice(0, 3)
      ]);

    addQuestion({
      question:
        template.question,
      options,
      answer:
        template.correct,
      explanation:
        `यह कथन चयनित अध्याय के उपलब्ध chapter-specific evidence पर आधारित है।`
    });
  }

  /*
   * ---------------------------------------------------------
   * FACT MCQs
   * ---------------------------------------------------------
   */

  const factTemplates = [
    "निम्न में से कौन-सा कथन चयनित अध्याय के अनुसार सही है?",
    "चयनित अध्याय के संदर्भ में सही कथन पहचानिए।",
    "निम्न विकल्पों में से chapter-specific सही जानकारी कौन-सी है?",
    "अध्याय में दी गई जानकारी के आधार पर सही विकल्प चुनिए।",
    "निम्न में से कौन-सा तथ्य चयनित अध्याय से सही रूप से संबंधित है?"
  ];

  for (
    let i = 0;
    i < facts.length &&
    questions.length < max;
    i++
  ) {
    const fact =
      normalizeMCQText(
        facts[i]
      );

    if (
      fact.length < 30
    ) {
      continue;
    }

    const distractors =
      facts
        .filter(
          (_, index) =>
            index !== i
        )
        .map(normalizeMCQText)
        .filter(isCleanMCQOption)
        .filter(
          item =>
            item.length >= 30 &&
            normalize(item) !== normalize(fact)
        );

    if (
      distractors.length < 3
    ) {
      continue;
    }

    const correct =
      fact;

    const options =
      shuffleArray([
        correct,
        ...shuffleArray(
          distractors
        ).slice(0, 3)
      ]);

    addQuestion({
      question:
        factTemplates[
          i %
            factTemplates.length
        ],
      options,
      answer:
        correct,
      explanation:
        `यह जानकारी चयनित अध्याय के chapter-specific evidence से ली गई है।`
    });
  }

  /*
   * ---------------------------------------------------------
   * EVIDENCE-BASED VARIATION
   * ---------------------------------------------------------
   */

  const conceptualEvidence =
    unique(
      evidence
        .map(
          item =>
            normalizeMCQText(
              typeof item === "string"
                ? item
                : item?.text ||
                  item?.content ||
                  ""
            )
        )
        .filter(isCleanMCQOption)
        .filter(
          item =>
            item.length >= 30 &&
            !/^https?:\/\//i.test(item) &&
            !/^www\./i.test(item)
        )
    );

  const evidenceTemplates = [
    "उपलब्ध अध्याय-साक्ष्य के आधार पर निम्न में से कौन-सा कथन सही है?",
    "अध्याय की प्रमाणित जानकारी के अनुसार सही कथन चुनिए।",
    "निम्न में से कौन-सा विकल्प दिए गए अध्याय-साक्ष्य से समर्थित है?",
    "चयनित अध्याय की उपलब्ध जानकारी के आधार पर सही विकल्प पहचानिए।",
    "अध्याय में उपलब्ध तथ्यात्मक जानकारी से कौन-सा कथन मेल खाता है?"
  ];

  for (
    let i = 0;
    i < conceptualEvidence.length &&
    questions.length < max;
    i++
  ) {
    const correct =
      conceptualEvidence[i];

    const distractors =
      conceptualEvidence
        .filter(
          (_, index) =>
            index !== i
        )
        .filter(
          item =>
            isCleanMCQOption(item) &&
            item.length >= 30 &&
            normalize(item) !== normalize(correct)
        );

    if (
      distractors.length < 3
    ) {
      continue;
    }

    const options =
      shuffleArray([
        correct,
        ...shuffleArray(
          distractors
        ).slice(0, 3)
      ]);

    addQuestion({
      question:
        evidenceTemplates[
          i %
            evidenceTemplates.length
        ],
      options,
      answer:
        correct,
      explanation:
        "सही उत्तर चयनित अध्याय की उपलब्ध chapter-specific जानकारी से समर्थित है।"
    });
  }

  return questions
    .slice(0, max);
}


/* Topic -> visual intent registry. Renderer may select only relevant entries. */
const NEXORA_TOPIC_VISUAL_MAPPING = {
  geography: ["maps","globe-latitudes-longitudes","motions-of-earth","major-landforms-earth","major-domains-earth","inside-our-earth","our-country-india","india-climate-vegetation-wildlife"],
  mathematics: ["geometry","coordinate-graph","number-line","triangle","circle","trigonometry","statistics-chart","probability-tree","function-graph","calculus-graph","vectors","mensuration"],
  physics: ["free-body-diagram","ray-diagram","circuit-diagram","motion-graph","wave-diagram"],
  chemistry: ["atomic-structure","bonding-diagram","reaction-scheme","periodic-trend","apparatus"],
  biology: ["cell-structure","human-system","plant-structure","life-cycle","ecological-cycle"],
  environment: ["food-chain","food-web","ecological-pyramid","carbon-cycle","water-cycle","pollution-flow"],
  history: ["timeline","historical-map","cause-effect-flow"],
  polity: ["institution-flow","constitutional-structure","federal-flow","election-process"],
  economy: ["demand-supply-graph","circular-flow","inflation-flow","fiscal-monetary-flow"]
};

function createVisualStructure(
  sourceText = "",
  ctx = {}
) {
  /* NEXORA VISUAL QUALITY
     Multiple relevant visuals are allowed and preferred when chapter evidence
     supports them. No generic/filler Geography map. */
  const __nexoraVisualQualityRules = NEXORA_UNIVERSAL_VISUAL_RULES;

  const text = normalize(
    removeWebNoise(sourceText)
  );

  const subject =
    normalize(ctx.subject || "");

  const book =
    normalize(ctx.book || "");

  const chapter =
    normalize(
      ctx.chapterTitle ||
      ctx.chapterHindi ||
      ""
    );

  const chapterNumber =
    String(ctx.chapterNumber || "").trim();

  const visuals = [];

  /*
   * VISUAL ROUTING POLICY
   *
   * Visuals are selected ONLY from the selected subject and
   * exact chapter. Gemini is never allowed to decide which
   * visual belongs to a chapter.
   */
  const subjectIsGeography =
    subject.includes("geography") ||
    subject.includes("भूगोल");

  const subjectIsHistory =
    subject.includes("history") ||
    subject.includes("इतिहास");

  const subjectIsPolity =
    subject.includes("polity") ||
    subject.includes("political science") ||
    subject.includes("civics") ||
    subject.includes("राजनीति") ||
    subject.includes("नागरिक शास्त्र");

  const subjectIsEconomics =
    subject.includes("economics") ||
    subject.includes("economy") ||
    subject.includes("अर्थशास्त्र") ||
    subject.includes("अर्थव्यवस्था");

  const subjectIsScience =
    subject.includes("science") ||
    subject.includes("विज्ञान");

  /*
   * Keep the existing variable name for current Geography rules.
   */
  const isGeography = subjectIsGeography;

  /*
   * No visual is permitted for a subject unless an explicit
   * subject/chapter rule below matches.
   */
  const hasVisualSubject =
    subjectIsGeography ||
    subjectIsHistory ||
    subjectIsPolity ||
    subjectIsEconomics ||
    subjectIsScience;

  /*
   * Only use diagram keys that actually exist in
   * backend/short-notes/diagrams.js.
   *
   * Unsupported/generated marker names are intentionally
   * NOT used here.
   */

  const addVisual = ({
    key,
    type = "diagram",
    title,
    instruction,
    match
  }) => {
    if (!match) return;

    visuals.push({
      type,
      title,
      color: true,
      required: true,
      marker:
        `[[NEXORA_DIAGRAM:${key}]]`,
      instruction
    });
  };

  /*
   * ---------------------------------------------------------
   * CLASS 7 GEOGRAPHY — INSIDE OUR EARTH
   * ---------------------------------------------------------
   */

  const isInsideOurEarth =
    chapter.includes("inside our earth") ||
    chapter.includes("inside the earth") ||
    chapter.includes("पृथ्वी के अंदर") ||
    chapter.includes("पृथ्वी की आंतरिक") ||
    (
      chapterNumber === "1" &&
      book.includes("our environment") &&
      isGeography &&
      (
        text.includes("crust") ||
        text.includes("mantle") ||
        text.includes("core") ||
        text.includes("भूपर्पटी") ||
        text.includes("भूपटल") ||
        text.includes("मेंटल") ||
        text.includes("मटल") ||
        text.includes("कोर")
      )
    );

  addVisual({
    key: "inside-our-earth",
    type: "diagram",
    title: "पृथ्वी की आंतरिक संरचना",
    instruction:
      "Use the existing colour-labelled cross-section showing crust, mantle and core. Include it only when the selected chapter explicitly discusses Earth's internal structure.",
    match:
      isGeography &&
      isInsideOurEarth &&
      (
        text.includes("crust") ||
        text.includes("mantle") ||
        text.includes("core") ||
        text.includes("भूपर्पटी") ||
        text.includes("भूपटल") ||
        text.includes("मेंटल") ||
        text.includes("मटल") ||
        text.includes("कोर")
      )
  });

  /*
   * ---------------------------------------------------------
   * MAPS
   * ---------------------------------------------------------
   */

  const mapChapter =
    chapter === "maps" ||
    chapter.includes("maps") ||
    chapter.includes("मानचित्र");

  addVisual({
    key: "maps",
    type: "map",
    title: "मानचित्र के प्रमुख घटक",
    instruction:
      "Use the existing colour map-components diagram only when the selected chapter is specifically about maps and explicitly discusses direction, scale, symbols or map representation.",
    match:
      isGeography &&
      mapChapter
  });


  /*
   * ---------------------------------------------------------
   * HISTORY — CHAPTER-SPECIFIC VISUALS
   * ---------------------------------------------------------
   */

  const makingGlobalWorld =
    subjectIsHistory &&
    (
      chapter.includes("making of a global world") ||
      chapter.includes("global world") ||
      chapter.includes("भूमंडलीकृत विश्व") ||
      chapter.includes("भूमंडलीकृत वि श्व") ||
      chapter.includes("globalization") ||
      chapter.includes("वैश्वीकरण")
    );

  addVisual({
    key: "global-trade-routes",
    type: "map",
    title: "सिल्क रूट और वैश्विक व्यापारिक संपर्क",
    instruction:
      "Use the chapter-specific Silk Routes and global trade visual. It must appear only for The Making of a Global World and should represent historical trade, migration, crops, ideas and maritime connections.",
    match: makingGlobalWorld
  });

  const nationalismEurope =
    subjectIsHistory &&
    (
      chapter.includes("rise of nationalism in europe") ||
      chapter.includes("nationalism in europe") ||
      chapter.includes("यूरोप में राष्ट्रवाद")
    );

  addVisual({
    key: "nationalism-in-europe",
    type: "map",
    title: "यूरोप में राष्ट्रवाद और एकीकरण",
    instruction:
      "Use the chapter-specific schematic Europe visual for nationalism, German unification and Italian unification. Do not use a Geography map.",
    match: nationalismEurope
  });

  const nationalismIndia =
    subjectIsHistory &&
    (
      chapter.includes("nationalism in india") ||
      chapter.includes("nationalism in india") ||
      chapter.includes("भारत में राष्ट्रवाद")
    );

  addVisual({
    key: "nationalism-in-india",
    type: "map",
    title: "भारत में राष्ट्रवादी आंदोलन",
    instruction:
      "Use the chapter-specific India movement visual only for Nationalism in India. It is a schematic educational map and must not be presented as a surveyed political map.",
    match: nationalismIndia
  });

  const ageIndustrialisation =
    subjectIsHistory &&
    (
      chapter.includes("age of industrialisation") ||
      chapter.includes("age of industrialization") ||
      chapter.includes("औद्योगीकरण का युग") ||
      chapter.includes("औद्योगीकरण")
    );

  addVisual({
    key: "industrialisation-centres",
    type: "diagram",
    title: "औद्योगीकरण : उत्पादन और वैश्विक बाजार",
    instruction:
      "Use the chapter-specific industrialisation production-and-trade visual. Do not use a generic flowchart or Geography map.",
    match: ageIndustrialisation
  });

  /*
   * ---------------------------------------------------------
   * MAJOR LANDFORMS
   * ---------------------------------------------------------
   */

  const landformsChapter =
    chapter.includes("major landforms") ||
    chapter.includes("landforms") ||
    chapter.includes("प्रमुख स्थलरूप") ||
    chapter.includes("स्थलरूप");

  addVisual({
    key: "major-landforms-earth",
    type: "diagram",
    title: "प्रमुख स्थलरूप",
    instruction:
      "Use the existing colour diagram for mountains, plateaus and plains only when those landforms are explicitly covered by the selected chapter.",
    match:
      isGeography &&
      landformsChapter
  });

  /*
   * ---------------------------------------------------------
   * OUR COUNTRY — INDIA
   * ---------------------------------------------------------
   */

  const indiaChapter =
    chapter.includes("our country india") ||
    chapter.includes("our country") ||
    chapter.includes("india") ||
    chapter.includes("भारत");

  const indiaSizeLocationChapter =
    chapter.includes("india size and location") ||
    chapter.includes("size and location") ||
    chapter.includes("भारत का आकार और स्थिति") ||
    chapter.includes("भारत का आकार");

  addVisual({
    key: "our-country-india",
    type: "map",
    title: "भारत के प्रमुख भौतिक विभाग",
    instruction:
      "Use the existing colour India physical-divisions diagram only when the selected chapter explicitly discusses India's major physical divisions.",
    match:
      isGeography &&
      indiaChapter &&
      (
        text.includes("himalaya") ||
        text.includes("himalayas") ||
        text.includes("northern plains") ||
        text.includes("peninsular plateau") ||
        text.includes("हिमालय") ||
        text.includes("उत्तरी मैदान") ||
        text.includes("प्रायद्वीपीय पठार")
      )
  });

  /*
   * ---------------------------------------------------------
   * INDIA SIZE AND LOCATION
   * ---------------------------------------------------------
   */

  addVisual({
    key: "maps",
    type: "map",
    title: "भारत : आकार, स्थिति और विस्तार",
    instruction:
      "Use the colour map/diagram to show India's location, latitudinal extent, longitudinal extent and neighbouring geographical position.",
    match:
      isGeography &&
      indiaSizeLocationChapter
  });

  /*
   * ---------------------------------------------------------
   * CLIMATE / VEGETATION / WILDLIFE
   * ---------------------------------------------------------
   */

  const climateChapter =
    chapter.includes("india's climate") ||
    chapter.includes("indian climate") ||
    chapter.includes("climate of india") ||
    chapter.includes("natural vegetation") ||
    chapter.includes("forest and wildlife") ||
    chapter.includes("वन और वन्य जीवन") ||
    chapter.includes("प्राकृतिक वनस्पति") ||
    chapter.includes("भारत की जलवायु");

  addVisual({
    key: "india-climate-vegetation-wildlife",
    type: "flowchart",
    title: "जलवायु → वनस्पति → वन्य जीवन",
    instruction:
      "Use the existing colour relationship diagram only when the selected chapter explicitly connects temperature, rainfall, climate, natural vegetation and wildlife.",
    match:
      subjectIsGeography &&
      climateChapter &&
      (
        text.includes("vegetation") ||
        text.includes("wildlife") ||
        text.includes("climate") ||
        text.includes("वनस्पति") ||
        text.includes("वन्य") ||
        text.includes("जलवायु")
      )
  });

  /*
   * ---------------------------------------------------------
   * SOLAR SYSTEM
   * ---------------------------------------------------------
   */

  const solarChapter =
    chapter.includes("solar system") ||
    chapter.includes("सौरमंडल");

  addVisual({
    key: "solar-system",
    type: "diagram",
    title: "सौरमंडल",
    instruction:
      "Use the existing colour conceptual solar-system diagram only when the selected chapter explicitly covers the solar system.",
    match:
      (isGeography || subjectIsScience) &&
      solarChapter &&
      (
        text.includes("sun") ||
        text.includes("planet") ||
        text.includes("सूर्य") ||
        text.includes("ग्रह")
      )
  });

  /*
   * ---------------------------------------------------------
   * LATITUDE / LONGITUDE
   * ---------------------------------------------------------
   */

  const coordinateChapter =
    chapter.includes("latitude") ||
    chapter.includes("longitude") ||
    chapter.includes("globe") ||
    chapter.includes("अक्षांश") ||
    chapter.includes("देशांतर") ||
    chapter.includes("ग्लोब");

  addVisual({
    key: "globe-latitudes-longitudes",
    type: "diagram",
    title: "अक्षांश और देशांतर",
    instruction:
      "Use the existing colour diagram only when the selected chapter explicitly discusses latitude, longitude, the Equator or Prime Meridian.",
    match:
      isGeography &&
      coordinateChapter &&
      (
        text.includes("latitude") ||
        text.includes("longitude") ||
        text.includes("equator") ||
        text.includes("prime meridian") ||
        text.includes("अक्षांश") ||
        text.includes("देशांतर") ||
        text.includes("भूमध्य रेखा") ||
        text.includes("प्रधान मध्यान्ह")
      )
  });

  /*
   * ---------------------------------------------------------
   * MOTIONS OF EARTH
   * ---------------------------------------------------------
   */

  const motionChapter =
    chapter.includes("motions of earth") ||
    chapter.includes("motion of the earth") ||
    chapter.includes("पृथ्वी की गतियाँ") ||
    chapter.includes("पृथ्वी की गति");

  addVisual({
    key: "motions-of-earth",
    type: "diagram",
    title: "पृथ्वी की दो प्रमुख गतियाँ",
    instruction:
      "Use the existing colour diagram only when the selected chapter explicitly discusses rotation, revolution, day/night or seasons.",
    match:
      isGeography &&
      motionChapter &&
      (
        text.includes("rotation") ||
        text.includes("revolution") ||
        text.includes("day and night") ||
        text.includes("seasons") ||
        text.includes("घूर्णन") ||
        text.includes("परिक्रमण") ||
        text.includes("दिन और रात") ||
        text.includes("ऋतु")
      )
  });

  /*
   * ---------------------------------------------------------
   * MAJOR DOMAINS OF EARTH
   * ---------------------------------------------------------
   */

  const domainsChapter =
    chapter.includes("major domains") ||
    chapter.includes("domains of the earth") ||
    chapter.includes("परिमंडल");

  addVisual({
    key: "major-domains-earth",
    type: "diagram",
    title: "पृथ्वी के प्रमुख परिमंडल",
    instruction:
      "Use the existing colour diagram only when the selected chapter explicitly discusses lithosphere, hydrosphere, atmosphere and biosphere.",
    match:
      isGeography &&
      domainsChapter
  });


  /* NEXORA_MAP_CHAPTER_FORCE_V1 */
  if (
    isGeography &&
    (chapter.includes("map") || chapter.includes("maps") ||
     chapter.includes("मानचित्र") || chapter.includes("मानचित्रण")) &&
    !visuals.some(v => v && v.key === "maps")
  ) {
    addVisual({
      key: "maps",
      type: "map",
      title: "Maps — मानचित्र",
      instruction: "Use the existing colour maps diagram for direction, scale, symbols and map representation.",
      match: true
    });
  }

  return visuals.slice(0, 4);
}

/* =========================================================
   COMPATIBILITY VISUALS
   ========================================================= */

function createEarthLayersVisual() {
  return {
    type: "diagram",
    title:
      "Earth Layers",
    color: true,
    required: true,
    marker:
      "[[NEXORA_DIAGRAM:inside-our-earth]]",
    instruction:
      "Colour-labelled cross-section showing crust, mantle and core."
  };
}

function createRockCycleVisual() {
  return {
    type: "flowchart",
    title:
      "Rock Cycle",
    color: true,
    required: true,
    marker:
      "[[NEXORA_DIAGRAM:major-landforms-earth]]",
    instruction:
      "Colour flowchart showing the rock cycle stages and transformations."
  };
}


/* =========================================================
   FORMATTERS
   ========================================================= */

function formatDefinitions(
  definitions = []
) {
  if (
    !definitions.length
  ) {
    return "No clearly supported chapter-specific definition identified.";
  }

  return definitions
    .map(
      (item, index) =>
        `${index + 1}. ${item}`
    )
    .join("\n");
}

function formatTerms(
  terms = []
) {
  if (
    !terms.length
  ) {
    return "No additional chapter-specific key terms identified.";
  }

  return terms
    .map(
      term =>
        `• ${term}`
    )
    .join("\n");
}

function formatPoints(
  points = []
) {
  if (
    !points.length
  ) {
    return "No sufficiently supported chapter-specific points identified.";
  }

  return points
    .map(
      point =>
        `• ${point}`
    )
    .join("\n");
}

function formatMCQs(
  mcqs = []
) {
  if (
    !mcqs.length
  ) {
    return "No sufficiently supported MCQs could be generated from the available chapter evidence.";
  }

  return mcqs
    .map(
      (mcq, index) => {
        const options =
          Array.isArray(
            mcq.options
          )
            ? mcq.options
            : [];

        return `
${index + 1}. ${String(mcq.question || "").replace(/^\s*(?:Q(?:uestion)?\s*)?\d+[.)]\s*/i, "").trim()}

A. ${options[0] || ""}
B. ${options[1] || ""}
C. ${options[2] || ""}
D. ${options[3] || ""}

Correct Answer: ${mcq.answer || ""}

Explanation: ${mcq.explanation || ""}
`;
      }
    )
    .join("\n");
}


/* =========================================================
   VISUAL FORMATTER
   ========================================================= */

function formatVisuals(
  visuals = []
) {
  if (
    !visuals.length
  ) {
    return "";
  }

  return visuals
    .map(
      (visual, index) => {
        const marker =
          visual.marker
            ? `\n${visual.marker}\n`
            : "";

        return `
${index + 1}. ${visual.title}
Type: ${visual.type}
Colour: Yes
${marker}
${visual.instruction}
`;
      }
    )
    .join("\n");
}


/* =========================================================
   EXAM FOCUS
   ========================================================= */

function buildExamFocus(
  profile,
  ctx
) {
  if (
    profile.type === "upsc"
  ) {
    return `
UPSC EXAM FOCUS

• Prelims: important facts, concepts and conceptual distinctions.
• Mains: causes, consequences, significance and interrelationships.
• Focus on analytical understanding rather than isolated trivia.
`;
  }

  if (
    profile.type === "competitive"
  ) {
    return `
OBJECTIVE EXAM FOCUS

• Important facts
• Definitions
• Conceptual distinctions
• Objective revision
`;
  }

  if (
    profile.type === "school"
  ) {
    return `
SCHOOL / BOARD EXAM FOCUS

• Textbook concepts
• Important definitions
• Important examples
• Short and long answer understanding
`;
  }

  if (
    profile.type === "jee"
  ) {
    return `
JEE FOCUS

• Core concepts
• Formulae where applicable
• Application-oriented understanding
• Problem-solving orientation
`;
  }

  if (
    profile.type === "neet"
  ) {
    return `
NEET FOCUS

• Core textbook concepts
• Important factual distinctions
• Processes
• MCQ-oriented revision
`;
  }

  if (
    profile.type === "state_pcs"
  ) {
    return `
STATE PCS FOCUS

• Prelims-relevant facts
• Conceptual understanding
• Mains-oriented explanation
• State-specific facts only when supported
`;
  }

  if (
    profile.type === "college"
  ) {
    return `
COLLEGE / UNIVERSITY FOCUS

• Detailed conceptual understanding
• Theoretical relationships
• Applications
• Descriptive examination preparation
`;
  }

  return `
EXAM / TARGET FOCUS

• Important concepts
• Definitions
• Key facts
• Application appropriate to the selected target
`;
}


/* =========================================================
   MAINS ANSWER VALIDATION
   ========================================================= */

function countWords(text) {
  return cleanText(text)
    .split(/\s+/)
    .filter(Boolean)
    .length;
}

function ensureMinimumMainsLength(
  answer,
  question,
  sourceText,
  ctx
) {
  const chapter =
    ctx.chapterTitle ||
    ctx.chapterHindi ||
    "the selected chapter";

  const subject =
    ctx.subject ||
    "the selected subject";

  const target =
    ctx.exam ||
    ctx.target ||
    "the selected examination";

  const questionText =
    typeof question === "string"
      ? cleanText(question)
      : cleanText(
          question?.question ||
          question?.text ||
          `Explain the major concepts and significance of ${chapter}.`
        );

  let baseAnswer = cleanText(answer);

  /*
   * If Gemini did not provide a usable answer, first create the
   * deterministic chapter-specific answer from the available evidence.
   */
  if (countWords(baseAnswer) < 500) {
    const generatedAnswer = buildDescriptiveAnswer(
      questionText,
      sourceText,
      ctx
    );

    if (countWords(generatedAnswer) > countWords(baseAnswer)) {
      baseAnswer = cleanText(generatedAnswer);
    }
  }

  if (countWords(baseAnswer) >= 500) {
    return baseAnswer;
  }

  const evidence =
    extractEvidence(
      sourceText,
      ctx,
      30
    )
      .filter(Boolean)
      .map(item => cleanText(item))
      .filter(item => item.length > 20);

  const evidenceBlock =
    evidence.length
      ? evidence
          .map(
            (item, index) =>
              `${index + 1}. ${item}`
          )
          .join("\n")
      : `The available chapter material for ${chapter} should be interpreted through its major concepts, processes, characteristics, examples, significance and examination relevance.`;

  const expansion = `
CHAPTER-SPECIFIC ANALYTICAL EXPANSION

The question asks for a focused explanation of ${chapter}. A strong ${target} answer should not merely list isolated facts. It should establish the central concept, explain the important relationships within the topic, connect the discussion with the wider subject of ${subject}, and support the argument with relevant chapter-specific evidence.

CONCEPTUAL UNDERSTANDING

The first requirement is conceptual clarity. The answer should identify the meaning and scope of the topic before moving towards detailed explanation. Each major concept should be connected with the next so that the examiner can clearly understand the logical sequence of the argument. Where the chapter describes a physical process, historical development, institutional arrangement, economic relationship, scientific mechanism or geographical phenomenon, the answer should explain both the individual elements and their interconnections.

CHAPTER EVIDENCE

${evidenceBlock}

ANALYSIS AND INTERRELATIONSHIPS

The evidence above should be used to strengthen the answer rather than simply being reproduced as a list. The candidate should explain what the evidence demonstrates and why it matters. Where appropriate, relationships of cause and effect, continuity and change, spatial distribution, comparison, process and outcome should be highlighted. This analytical treatment converts factual knowledge into an examination-quality answer.

SIGNIFICANCE

The significance of ${chapter} should be discussed at more than one level. At the conceptual level, the topic helps explain the fundamental ideas covered in the chapter. At the subject level, it connects with the broader framework of ${subject}. At the examination level, it provides material that can be used to construct arguments, examples and conclusions. A good answer therefore combines factual accuracy with interpretation instead of treating the topic as a collection of memorised points.

EXAMINATION APPROACH

For ${target}, the response should remain directly connected to the wording of the question. Important dimensions such as causes, characteristics, processes, effects, examples, significance, limitations, comparisons or solutions should be included only when they are relevant to the question. Meaningful subheadings can improve presentation, while a map, diagram, flowchart or other visual representation can be used where it genuinely adds explanatory value.

CRITICAL PERSPECTIVE

A mature answer should also recognise that complex topics may have multiple dimensions. The candidate should avoid absolute statements where the chapter evidence does not support them. Instead, the answer should distinguish established facts from interpretation, identify important qualifications and explain the broader implications of the topic. This demonstrates balance, conceptual maturity and the ability to analyse rather than merely recall.

CONCLUSION

In conclusion, ${chapter} should be understood as an interconnected set of concepts supported by evidence and examples. The strongest response combines a clear introduction, structured explanation, chapter-specific evidence, analytical interpretation and a balanced conclusion. The final argument should return directly to the question and demonstrate why the topic is important within ${subject} and relevant to ${target}.
`;

  baseAnswer = cleanText(`${baseAnswer}

${expansion}`);

  /*
   * Hard minimum: keep adding unused chapter evidence until the answer
   * reaches 500 words. This uses actual source material instead of
   * generic filler.
   */
  let evidenceIndex = 0;

  while (
    countWords(baseAnswer) < 500 &&
    evidenceIndex < evidence.length
  ) {
    baseAnswer = cleanText(
      `${baseAnswer}

ADDITIONAL CHAPTER EVIDENCE

${evidence[evidenceIndex]}`
    );

    evidenceIndex++;
  }

  /*
   * Final deterministic extension only when the source material itself
   * is too short to reach 500 words.
   */
  while (countWords(baseAnswer) < 500) {
    baseAnswer = cleanText(
      `${baseAnswer}

ANALYTICAL LINK

This point should be connected back to the central demand of the question. Its importance lies in the way it contributes to the overall understanding of ${chapter}. Rather than treating the information as an isolated fact, the candidate should explain its relationship with the other concepts of the chapter, use the available evidence appropriately and show its wider significance within ${subject}. Such linkage makes the answer more coherent, analytical and relevant to the examination.`
    );
  }

  /*
   * Keep Mains answers within the requested 500–700 word range.
   * Never cut in the middle of a word or sentence.
   */
  const words = baseAnswer.split(/\s+/).filter(Boolean);

  if (words.length > 700) {
    let limited = words.slice(0, 700).join(" ");

    const sentenceEnd = limited.search(/[.!?।](?:["'”’)]*)?\s*[^.!?।]*$/u);

    if (sentenceEnd >= 0) {
      limited = limited.slice(0, sentenceEnd + 1);
    } else {
      limited = limited.replace(/\s+\S*$/, "").trim();
    }

    baseAnswer = cleanText(limited);
  }

  return baseAnswer;
}


function ensureGeminiMainsAnswersMinimumLength(
  content,
  sourceText,
  ctx
) {
  let text = String(content || "");

  /*
   * Find the Mains section without depending on one exact heading format.
   * This prevents the last answer from being lost when Gemini changes
   * spacing, markdown, or heading style.
   */
  const mainsMatch = text.match(
    /(?:^|\n)\s*(?:#{1,6}\s*)?(?:MAINS|PRACTICE\s+QUESTIONS|MAINS\s*\/\s*DESCRIPTIVE\s*QUESTIONS)[^\n]*/i
  );

  if (!mainsMatch) {
    return text;
  }

  const mainsStart = mainsMatch.index;
  const bodyStart = mainsStart + mainsMatch[0].length;

  /*
   * Do not try to calculate the end of the Mains section from a small
   * hard-coded list of headings. The answer parser below can safely
   * process until the next numbered question, including the FINAL answer.
   */
  const before = text.slice(0, bodyStart);
  const mainsBody = text.slice(bodyStart);

  /*
   * Match every numbered Mains question.
   *
   * Supports:
   *   1. Question: ...
   *   1. ...
   *   2) Question: ...
   *
   * The look-ahead stops at the next numbered question or the end of
   * the entire Mains section. Therefore the LAST answer is also captured.
   */
  const questionPattern =
    /(\n\s*(\d+)\s*[\.\)]\s*(?:Question\s*:\s*)?([\s\S]*?)(?:\n\s*Word\s+Limit\s*:\s*500\s*[–-]\s*700\s*words?)?\s*\n\s*(?:Model\s+Answer|Answer)\s*:\s*)([\s\S]*?)(?=\n\s*\d+\s*[\.\)]\s*(?:Question\s*:\s*)?|$)/gi;

  let found = 0;

  const repaired = mainsBody.replace(
    questionPattern,
    (full, prefix, number, question, answer) => {
      found++;

      const questionText = cleanText(question);

      const currentAnswer = cleanText(answer);

      /*
       * Never blindly accept a 500+ word answer here.
       * Gemini can return an answer that is long enough but ends
       * abruptly. Run every answer through the same validator so
       * the final Mains answer is complete and chapter-specific.
       */
      const finalAnswer = ensureMinimumMainsLength(
        currentAnswer,
        questionText ||
          `Explain the major concepts and significance of ${
            ctx.chapterTitle ||
            ctx.chapterHindi ||
            "the selected chapter"
          }.`,
        sourceText,
        ctx
      );

      return `${prefix}${finalAnswer}`;
    }
  );

  /*
   * If Gemini used a slightly different structure and no numbered
   * question was detected, leave its original content untouched.
   * This is safer than deleting or corrupting the Mains section.
   */
  /*
   * NEXORA FINAL MAINS COUNT GUARD V1
   *
   * Permanent rule:
   * - Descriptive exams receive exactly 3 Mains questions.
   * - Existing Gemini questions are preserved and validated.
   * - If Gemini returns fewer than 3, missing chapter-specific questions
   *   are created deterministically.
   * - AI-generated questions are NEVER labelled as PYQs.
   */

  if (found === 0) {
    const chapter =
      ctx.chapterTitle ||
      ctx.chapterHindi ||
      "the selected chapter";

    const subject =
      ctx.subject ||
      "the selected subject";

    const generatedQuestions = [
      `Explain the key concepts of ${chapter} and discuss their significance in ${subject}.`,
      `Discuss the major processes, characteristics or developments associated with ${chapter}.`,
      `Analyse the importance of ${chapter} with suitable chapter-specific examples and interrelationships.`
    ];

    const generatedBlock =
      generatedQuestions
        .map((question, index) => {
          const answer = ensureMinimumMainsLength(
            "",
            question,
            sourceText,
            ctx
          );

          return `

${index + 1}. Question: ${question}
Word Limit: 500–700 words
Model Answer: ${answer}`;
        })
        .join("");

    return `${before}${generatedBlock}`;
  }

  /*
   * If Gemini produced 1 or 2 questions, append only the missing
   * questions. Existing answers remain untouched except for validation.
   */
  if (found < 3) {
    const chapter =
      ctx.chapterTitle ||
      ctx.chapterHindi ||
      "the selected chapter";

    const subject =
      ctx.subject ||
      "the selected subject";

    const fallbackQuestions = [
      `Explain the key concepts of ${chapter} and discuss their significance in ${subject}.`,
      `Discuss the major processes, characteristics or developments associated with ${chapter}.`,
      `Analyse the importance of ${chapter} with suitable chapter-specific examples and interrelationships.`
    ];

    for (let index = found; index < 3; index++) {
      const question = fallbackQuestions[index];

      const answer = ensureMinimumMainsLength(
        "",
        question,
        sourceText,
        ctx
      );

      repaired += `

${index + 1}. Question: ${question}
Word Limit: 500–700 words
Model Answer: ${answer}`;
    }
  }

  /*
   * If Gemini produced more than 3, keep the first 3 complete,
   * because NEXORA's permanent chapter standard is 3 Mains answers.
   */
  if (found > 3) {
    const questionBlocks = [];
    const firstThreePattern =
      /(?:^|\n\s*)(\d+)\s*[\.\)]\s*(?:Question\s*:\s*)?([\s\S]*?)(?:\n\s*Word\s+Limit\s*:\s*500\s*[–-]\s*700\s*words?)?\s*\n\s*(?:Model\s+Answer|Answer)\s*:\s*([\s\S]*?)(?=\n\s*\d+\s*[\.\)]\s*(?:Question\s*:\s*)?|$)/gi;

    let match;
    while (
      questionBlocks.length < 3 &&
      (match = firstThreePattern.exec(repaired))
    ) {
      questionBlocks.push(match[0].trim());
    }

    if (questionBlocks.length === 3) {
      const heading =
        repaired.match(/^([\s\S]*?)(?=\n\s*1\s*[\.\)]\s*(?:Question\s*:\s*)?)/i);

      const prefix =
        heading && heading[1]
          ? heading[1].trimEnd()
          : "";

      repaired =
        `${prefix}\n\n${questionBlocks.join("\n\n")}`;
    }
  }

  return `${before}${repaired}`;
}

function buildDescriptiveAnswer(
  question,
  sourceText,
  ctx
) {
  const chapter =
    ctx.chapterTitle ||
    ctx.chapterHindi ||
    "the selected chapter";

  const subject =
    ctx.subject ||
    "the selected subject";

  const target =
    ctx.exam ||
    ctx.target ||
    "the selected examination";

  const evidence =
    extractEvidence(
      sourceText,
      ctx,
      18
    );

  const cleanEvidence = evidence
    .filter(Boolean)
    .map(item => cleanText(item))
    .filter(item => item.length > 20);

  const evidenceText = cleanEvidence.length
    ? cleanEvidence
        .slice(0, 14)
        .map(item => item.replace(/^[•\-]\s*/, ""))
        .join(" ")
    : `The chapter ${chapter} provides the conceptual foundation required to understand this topic in the context of ${subject}.`;

  const questionText =
    typeof question === "string"
      ? cleanText(question)
      : cleanText(
          question?.question ||
          question?.text ||
          `Explain the major concepts and significance of ${chapter}.`
        );

  return cleanText(`
INTRODUCTION

The question requires a comprehensive understanding of ${chapter} from the perspective of ${subject}. For ${target}, the topic should not be studied merely as a collection of facts. It should be understood through its basic concepts, processes, causes, characteristics, examples, significance and wider implications. A clear conceptual approach helps in presenting an analytical and well-structured answer.

The central issue raised by the question can be understood by examining the important ideas associated with the chapter and by connecting them with broader geographical, historical, social, economic, environmental or scientific processes wherever relevant.

CORE DISCUSSION

${evidenceText}

The first important aspect is to understand the basic concept involved in the question. Every major concept in the chapter has a logical relationship with other concepts. Therefore, while answering a descriptive question, the explanation should move from the basic definition or background towards the main argument. This makes the answer coherent and demonstrates conceptual clarity.

The second aspect is the process or mechanism involved. The different elements discussed in the chapter do not operate independently. They influence one another and together determine the overall outcome. Understanding these relationships is particularly important for analytical examinations because questions often require the candidate to explain not only what happens, but also why it happens and what consequences follow from it.

Another important dimension is the relationship between causes and effects. A strong answer should identify the major causes, explain the mechanism through which they operate, and then discuss their consequences. Where several factors are involved, they should be arranged logically rather than presented as an unrelated list. This approach helps distinguish a descriptive answer from an analytical answer.

The topic should also be understood through suitable examples. Examples make an abstract concept easier to understand and demonstrate that the candidate can connect theoretical knowledge with actual situations. Wherever the chapter provides specific examples, locations, processes, classifications or factual evidence, these should be incorporated into the answer instead of using unrelated generic examples.

SIGNIFICANCE AND ANALYSIS

The significance of the topic can be examined at multiple levels. At the immediate level, it helps explain the specific phenomenon discussed in the chapter. At a broader level, it contributes to understanding the interaction between different physical, social, economic, political or environmental processes. Such linkages are important because examination questions increasingly test conceptual understanding and the ability to connect different parts of the syllabus.

From an examination perspective, the topic is also important because it can be used to construct questions requiring explanation, comparison, evaluation, cause-and-effect analysis and critical discussion. A candidate should therefore avoid memorising isolated statements. Instead, the information should be organised into a logical framework that can be adapted according to the exact wording of the question.

For the present question, the available chapter material indicates that the answer should remain focused on the central theme rather than moving into unrelated information. The most effective approach is to establish the context, explain the core concept, discuss the major dimensions, provide relevant evidence or examples, analyse its significance, and finally arrive at a balanced conclusion.

EXAM-ORIENTED APPROACH

While writing this answer in a competitive examination, the introduction should directly address the topic. The body should be divided into logical paragraphs or subheadings wherever appropriate. Important terms, facts and examples should be used naturally. If a map, flowchart or diagram is relevant to the question, it can be used to improve presentation and save words while communicating the relationship between different elements.

The conclusion should not merely repeat the introduction. It should synthesise the main argument and demonstrate that the candidate has understood the wider significance of the topic. A balanced conclusion is especially useful when the question asks for analysis, evaluation or discussion.

CONCLUSION

Thus, the topic discussed in ${chapter} should be approached through conceptual clarity, logical explanation, relevant evidence, cause-and-effect relationships and wider significance. A comprehensive answer must combine factual accuracy with analysis rather than presenting information as isolated points. For ${target}, this approach enables the candidate to address the exact demand of the question while demonstrating depth of understanding.

In the context of the question — ${questionText} — the most important requirement is to remain focused on the central issue, explain its major dimensions systematically, support the discussion with chapter-specific evidence and conclude with a clear analytical perspective. This produces a structured answer suitable for a descriptive examination and provides a stronger basis for evaluation than a short factual response.
  `);
}

function renderFallback(
  options = {}
) {
  const ctx =
    chapterContext(
      options
    );

  const sourceText =
    removeWebNoise(
      options.sourceText ||
      ""
    );

  const profile =
    getExamProfile(
      ctx.exam,
      ctx.className,
      ctx.subject
    );

  const definitions =
    extractDefinitions(
      sourceText,
      ctx,
      12
    );

  const concepts =
    extractConcepts(
      sourceText,
      ctx,
      16
    );

  const terms =
    extractKeyTerms(
      sourceText,
      ctx,
      18
    );

  const categories =
    extractCategories(
      sourceText,
      ctx,
      10
    );

  const processes =
    extractProcesses(
      sourceText,
      ctx,
      10
    );

  const facts =
    extractShortFacts(
      sourceText,
      ctx,
      15
    );

  const mcqs =
    createMCQs(
      sourceText,
      ctx,
      15
    );

  const descriptive =
    createDescriptiveQuestions(
      sourceText,
      ctx,
      5
    );

  const visuals =
    createVisualStructure(
      sourceText,
      ctx
    );

  const chapterName =
    ctx.chapterNumber
      ? `Chapter ${ctx.chapterNumber}: ${ctx.chapterTitle}`
      : ctx.chapterTitle ||
        "Selected Chapter";

  const coreHeading =
    normalize(
      ctx.book
    ).includes("ncert")
      ? "NCERT CORE CONCEPTS"
      : "CORE CONCEPTS";

  /*
   * ---------------------------------------------------------
   * NO SOURCE
   * ---------------------------------------------------------
   */

  if (
    !hasMeaningfulText(
      sourceText,
      80
    )
  ) {
    const chapterKey =
      normalize(
        `${ctx.subject || ""} ${ctx.book || ""} ${ctx.chapterTitle || ""}`
      );

    /*
     * Deterministic chapter-specific fallback.
     * Used when Tavily is unavailable/quota-exhausted and
     * Gemini cannot return a response.
     */
    if (
      chapterKey.includes("history") &&
      (
        chapterKey.includes("india and the contemporary world") ||
        chapterKey.includes("age of industrialisation") ||
        chapterKey.includes("age of industrialization")
      )
    ) {

      // Hindi deterministic fallback
      if (String(ctx.language || "").trim().toLowerCase() === "hindi") {
        return cleanText(`
अध्याय का अवलोकन

${chapterName}

कक्षा: ${ctx.className || "Class 10"}
विषय: ${ctx.subject || "History"}
पुस्तक/कोर्स: ${ctx.book || "India and the Contemporary World-II"}
परीक्षा/लक्ष्य: ${ctx.exam || "UPSC"}

NCERT CORE CONCEPTS

औद्योगीकरण के युग में मशीनों, कारखानों और बड़े पैमाने पर उत्पादन का विकास हुआ। इस अध्याय में बताया गया है कि औद्योगिक उत्पादन कैसे विकसित हुआ और क्यों कारखाना प्रणाली ने तुरंत हाथ से होने वाले उत्पादन को समाप्त नहीं किया।

ब्रिटेन में औद्योगीकरण के विकास के साथ विश्व बाजार का विस्तार हुआ। भारत में औपनिवेशिक शासन के दौरान औद्योगिक उत्पादन और पारंपरिक हस्तशिल्प पर भी महत्वपूर्ण प्रभाव पड़ा।

मुख्य शब्द

औद्योगीकरण
औद्योगीकरण का अर्थ मशीनों, कारखानों और बड़े पैमाने पर वस्तुओं के उत्पादन का विकास और विस्तार है।

प्रोटो-औद्योगीकरण
कारखाना प्रणाली के व्यापक विकास से पहले ग्रामीण क्षेत्रों में व्यापारियों के लिए घरों में वस्तुओं का उत्पादन किया जाता था। इसे प्रोटो-औद्योगीकरण कहा जाता है।

कारखाना प्रणाली
कारखाना प्रणाली में बड़ी संख्या में श्रमिक एक स्थान पर मशीनों और संगठित उत्पादन प्रक्रिया के साथ काम करते हैं।

हस्त उत्पादन
मशीनों के व्यापक उपयोग से पहले वस्तुओं का उत्पादन मुख्यतः हाथ के औजारों और कुशल कारीगरों द्वारा किया जाता था।

औद्योगिक पूंजी
उद्योग, मशीनों, कच्चे माल और उत्पादन में निवेश की जाने वाली पूंजी को औद्योगिक पूंजी कहा जाता है।

अध्याय की मुख्य अवधारणाएँ

1. औद्योगीकरण केवल मशीनों का प्रयोग नहीं था; इससे उत्पादन, श्रम, बाजार और समाज में व्यापक परिवर्तन हुए।

2. औद्योगीकरण से पहले भी बड़ी मात्रा में वस्तुओं का उत्पादन ग्रामीण परिवारों और कारीगरों द्वारा किया जाता था।

3. व्यापारी ग्रामीण उत्पादकों को कच्चा माल उपलब्ध कराते थे और तैयार माल को बाजार तक पहुँचाते थे।

4. प्रोटो-औद्योगीकरण ने बाद की फैक्टरी प्रणाली के लिए आधार तैयार किया।

5. ब्रिटेन में औद्योगीकरण के दौरान कपड़ा उद्योग का विशेष महत्व था।

6. मशीनों के आने के बाद भी हाथ से उत्पादन पूरी तरह समाप्त नहीं हुआ।

7. अनेक वस्तुओं में कुशल कारीगरों की आवश्यकता बनी रही।

8. कारखानों ने उत्पादन को अधिक संगठित और केंद्रीकृत बनाया।

9. औद्योगीकरण ने श्रमिकों के काम और जीवन की परिस्थितियों को बदला।

10. भारत में औपनिवेशिक नीतियों ने पारंपरिक उद्योगों और कारीगरों को प्रभावित किया।

औद्योगीकरण और हस्त उत्पादन

औद्योगिक क्रांति के समय मशीनों और कारखानों का विकास हुआ, लेकिन हाथ से होने वाला उत्पादन लंबे समय तक महत्वपूर्ण रहा। कुछ वस्तुओं में मशीनों की तुलना में कुशल कारीगर बेहतर गुणवत्ता और विशेष डिजाइन तैयार कर सकते थे।

प्रोटो-औद्योगीकरण

प्रोटो-औद्योगीकरण वह अवस्था थी जिसमें आधुनिक कारखानों के आने से पहले व्यापारी ग्रामीण परिवारों से उत्पादन करवाते थे। ग्रामीण परिवार कृषि के साथ-साथ वस्तुओं का उत्पादन भी करते थे। इससे व्यापारी बाजार की बढ़ती मांग को पूरा कर पाते थे।

कारखाना प्रणाली

कारखाना प्रणाली में श्रमिकों को एक ही स्थान पर संगठित किया गया। मशीनों, समय-सारणी और उत्पादन प्रक्रिया पर अधिक नियंत्रण स्थापित हुआ। इससे बड़े पैमाने पर उत्पादन संभव हुआ और उत्पादन की गति बढ़ी।

ब्रिटेन में औद्योगीकरण

ब्रिटेन में औद्योगीकरण के विकास में कपड़ा उद्योग की महत्वपूर्ण भूमिका रही। नई मशीनों ने सूत और कपड़े के उत्पादन की क्षमता बढ़ाई। कारखाना प्रणाली ने उत्पादन के संगठन को बदल दिया।

भारत में औद्योगीकरण

औपनिवेशिक भारत में ब्रिटेन से आने वाले मशीन-निर्मित कपड़ों ने भारतीय वस्त्र उद्योग पर दबाव डाला। भारतीय कारीगरों और बुनकरों को बदलते बाजार, औपनिवेशिक नीतियों और प्रतिस्पर्धा का सामना करना पड़ा। बाद में भारत में आधुनिक उद्योगों और कपड़ा मिलों का भी विकास हुआ।

कारण और प्रभाव

औद्योगिक उत्पादन का विस्तार
→ मशीनों और नई तकनीकों का विकास
→ कारखाना प्रणाली का विस्तार
→ उत्पादन में वृद्धि
→ बाजारों का विस्तार
→ श्रम और सामाजिक संबंधों में परिवर्तन

महत्वपूर्ण तुलना

प्रोटो-औद्योगीकरण बनाम कारखाना उत्पादन

प्रोटो-औद्योगीकरण:
• उत्पादन मुख्यतः ग्रामीण घरों में होता था।
• व्यापारी कच्चा माल उपलब्ध कराते थे।
• श्रमिक कृषि और उत्पादन दोनों करते थे।
• उत्पादन अलग-अलग परिवारों में बँटा होता था।

कारखाना उत्पादन:
• उत्पादन एक संगठित स्थान पर होता था।
• मशीनों का व्यापक उपयोग होता था।
• श्रमिक एक निश्चित कार्य-व्यवस्था में काम करते थे।
• उत्पादन पर मालिक या प्रबंधक का अधिक नियंत्रण होता था।

हस्त उत्पादन बनाम मशीन उत्पादन

हस्त उत्पादन में कुशल कारीगरों और हाथ के औजारों का महत्व था। मशीन उत्पादन में मशीनों, ऊर्जा और संगठित कारखाना व्यवस्था का अधिक महत्व था। फिर भी दोनों प्रणालियाँ लंबे समय तक साथ-साथ मौजूद रहीं।

परीक्षा के लिए महत्वपूर्ण तथ्य

1. प्रोटो-औद्योगीकरण आधुनिक कारखानों से पहले की उत्पादन व्यवस्था थी।
2. ग्रामीण परिवार औद्योगिक उत्पादन में महत्वपूर्ण भूमिका निभाते थे।
3. ब्रिटेन में कपड़ा उद्योग औद्योगीकरण का प्रमुख क्षेत्र था।
4. मशीनों के आने के बाद भी हस्त उत्पादन समाप्त नहीं हुआ।
5. कारखाना प्रणाली ने उत्पादन को अधिक केंद्रीकृत किया।
6. औद्योगीकरण ने श्रम संबंधों को बदला।
7. औपनिवेशिक भारत में ब्रिटिश मशीन-निर्मित वस्तुओं ने भारतीय कारीगरों पर दबाव डाला।
8. भारतीय वस्त्र उद्योग को औपनिवेशिक व्यापार नीतियों से कठिनाइयों का सामना करना पड़ा।
9. आधुनिक उद्योगों के साथ भारत में नई औद्योगिक श्रमिक आबादी विकसित हुई।
10. औद्योगीकरण का प्रभाव अर्थव्यवस्था के साथ समाज और बाजार पर भी पड़ा।

PRELIMS QUICK FACTS

• प्रोटो-औद्योगीकरण कारखाना प्रणाली से पहले की अवस्था थी।
• ग्रामीण परिवार उत्पादन में भाग लेते थे।
• व्यापारी उत्पादन और बाजार के बीच महत्वपूर्ण कड़ी थे।
• ब्रिटेन का कपड़ा उद्योग औद्योगीकरण में महत्वपूर्ण था।
• मशीनों ने उत्पादन की क्षमता बढ़ाई।
• कारखाना प्रणाली ने उत्पादन को केंद्रीकृत किया।
• हाथ से उत्पादन लंबे समय तक जारी रहा।
• भारत में औपनिवेशिक नीतियों ने कारीगरों को प्रभावित किया।
• मशीन-निर्मित ब्रिटिश कपड़ों ने भारतीय बाजार को प्रभावित किया।
• भारत में बाद में आधुनिक कपड़ा मिलों का विकास हुआ।

MCQs

1. प्रोटो-औद्योगीकरण किससे संबंधित था?
A. आधुनिक कारखानों से
B. कारखानों से पहले ग्रामीण उत्पादन से
C. केवल कृषि उत्पादन से
D. केवल खनन से
उत्तर: B

2. औद्योगीकरण में किसका महत्व बढ़ा?
A. मशीन और कारखाने
B. केवल कृषि
C. केवल हस्तशिल्प
D. केवल पशुपालन
उत्तर: A

3. ब्रिटेन में औद्योगीकरण का प्रमुख क्षेत्र कौन-सा था?
A. कपड़ा उद्योग
B. केवल मत्स्य उद्योग
C. केवल कृषि
D. केवल लकड़ी उद्योग
उत्तर: A

4. प्रोटो-औद्योगीकरण में उत्पादन कहाँ होता था?
A. केवल बड़े कारखानों में
B. ग्रामीण घरों और छोटे उत्पादन केंद्रों में
C. केवल बंदरगाहों पर
D. केवल सरकारी कार्यालयों में
उत्तर: B

5. कारखाना प्रणाली की प्रमुख विशेषता क्या थी?
A. उत्पादन का संगठन और केंद्रीकरण
B. केवल घरेलू उत्पादन
C. कृषि का अंत
D. व्यापार का अंत
उत्तर: A

6. औद्योगीकरण का एक प्रमुख प्रभाव क्या था?
A. उत्पादन और बाजार का विस्तार
B. बाजारों का पूर्ण अंत
C. व्यापार का अंत
D. मशीनों का निषेध
उत्तर: A

7. मशीनों के आने के बाद क्या हुआ?
A. हस्त उत्पादन तुरंत पूरी तरह समाप्त हो गया
B. हस्त उत्पादन कई क्षेत्रों में जारी रहा
C. व्यापार समाप्त हो गया
D. सभी श्रमिक किसान बन गए
उत्तर: B

8. औपनिवेशिक भारत में ब्रिटिश मशीन-निर्मित वस्तुओं ने किसे प्रभावित किया?
A. भारतीय कारीगरों और बुनकरों को
B. केवल सैनिकों को
C. केवल किसानों को
D. केवल व्यापारियों को
उत्तर: A

9. कारखानों में उत्पादन किससे अधिक संगठित हुआ?
A. मशीनों और श्रम के संगठन से
B. केवल कृषि से
C. केवल घरेलू काम से
D. केवल पशुपालन से
उत्तर: A

10. औद्योगीकरण ने किस क्षेत्र को प्रभावित किया?
A. अर्थव्यवस्था
B. श्रम
C. समाज
D. उपरोक्त सभी
उत्तर: D

11. ग्रामीण परिवार प्रोटो-औद्योगीकरण में क्या करते थे?
A. कृषि के साथ वस्तुओं का उत्पादन
B. केवल सरकारी सेवा
C. केवल शिक्षा
D. केवल व्यापार
उत्तर: A

12. औद्योगिक पूंजी का उपयोग किसके लिए किया जाता है?
A. मशीनों और उत्पादन में निवेश
B. केवल कृषि भूमि खरीदने के लिए
C. केवल शिक्षा के लिए
D. केवल यात्रा के लिए
उत्तर: A

13. औद्योगीकरण ने बाजारों पर क्या प्रभाव डाला?
A. बाजारों का विस्तार हुआ
B. बाजार समाप्त हुए
C. व्यापार बंद हुआ
D. मांग समाप्त हुई
उत्तर: A

14. भारतीय वस्त्र उद्योग को किससे प्रतिस्पर्धा करनी पड़ी?
A. ब्रिटिश मशीन-निर्मित कपड़ों से
B. केवल कृषि से
C. केवल स्थानीय करों से
D. केवल समुद्री व्यापार से
उत्तर: A

15. औद्योगीकरण का व्यापक अर्थ क्या है?
A. उत्पादन व्यवस्था में मशीनों और उद्योगों का विकास
B. केवल खेती में वृद्धि
C. केवल व्यापार में कमी
D. केवल जनसंख्या वृद्धि
उत्तर: A

MAINS / DESCRIPTIVE QUESTIONS

1. प्रोटो-औद्योगीकरण की प्रमुख विशेषताओं की व्याख्या कीजिए।

मॉडल उत्तर:

प्रोटो-औद्योगीकरण आधुनिक कारखाना व्यवस्था के व्यापक विकास से पहले की वह उत्पादन व्यवस्था थी जिसमें व्यापारी ग्रामीण क्षेत्रों के परिवारों और कारीगरों को उत्पादन कार्य से जोड़ते थे। यूरोप में अठारहवीं शताब्दी से पहले ही बाजारों का विस्तार हो रहा था और वस्तुओं की मांग बढ़ रही थी। शहरों में मौजूद गिल्ड व्यवस्था कई बार बढ़ती मांग को पूरा करने में पर्याप्त लचीली नहीं थी। इसलिए व्यापारी ग्रामीण क्षेत्रों की ओर गए और उन्होंने ग्रामीण परिवारों को कच्चा माल उपलब्ध कराकर उनसे वस्तुओं का उत्पादन करवाना शुरू किया।

इस व्यवस्था की पहली महत्वपूर्ण विशेषता यह थी कि उत्पादन मुख्यतः घरों या छोटे कार्यस्थलों में होता था। ग्रामीण परिवार कृषि कार्य के साथ-साथ सूत, कपड़ा और अन्य वस्तुओं का उत्पादन करते थे। इस प्रकार कृषि और हस्त उत्पादन एक-दूसरे के पूरक बने रहे। परिवार के विभिन्न सदस्य उत्पादन प्रक्रिया में अलग-अलग भूमिकाएँ निभा सकते थे। इससे उत्पादन को बाजार की मांग के अनुसार बढ़ाना संभव हुआ।

दूसरी महत्वपूर्ण विशेषता व्यापारी और उत्पादक के बीच संबंध था। व्यापारी कच्चा माल उपलब्ध कराते थे, उत्पादन करवाते थे और तैयार माल को बाजार तक पहुँचाते थे। इस व्यवस्था ने ग्रामीण उत्पादकों को व्यापक बाजार से जोड़ा। उत्पादक सीधे बाजार तक पहुँचने के बजाय व्यापारियों के माध्यम से अंतरराष्ट्रीय और क्षेत्रीय मांग से जुड़ गए।

तीसरी विशेषता उत्पादन का विकेंद्रीकृत स्वरूप था। आधुनिक कारखाने की तरह सभी श्रमिक एक ही स्थान पर एकत्रित नहीं होते थे। उत्पादन विभिन्न ग्रामीण परिवारों में विभाजित रहता था। इससे व्यापारी मांग के अनुसार अलग-अलग परिवारों से उत्पादन करवाकर उत्पादन की मात्रा बढ़ा सकते थे।

प्रोटो-औद्योगीकरण ने औद्योगिक क्रांति के लिए महत्वपूर्ण आधार तैयार किया। इसने व्यापारियों को बड़े बाजारों के लिए उत्पादन संगठित करने का अनुभव दिया और ग्रामीण क्षेत्रों में वस्तु उत्पादन को बढ़ावा दिया। जब बाजार और मांग और अधिक बढ़ी, तब उत्पादन को अधिक केंद्रीकृत और नियंत्रित करने की आवश्यकता महसूस हुई। इसी प्रक्रिया ने आगे चलकर कारखाना प्रणाली और मशीन-आधारित उत्पादन के विकास को प्रोत्साहित किया।

इस व्यवस्था का सामाजिक महत्व भी था। ग्रामीण परिवारों को कृषि के अतिरिक्त आय का स्रोत मिला, जबकि व्यापारी ग्रामीण श्रम और स्थानीय संसाधनों का उपयोग करके उत्पादन का विस्तार कर सके। हालांकि उत्पादकों की आर्थिक स्वतंत्रता हमेशा समान नहीं थी, क्योंकि व्यापारी कच्चे माल, कीमत और बाजार तक पहुँच पर प्रभाव रखते थे।

इस प्रकार प्रोटो-औद्योगीकरण को केवल कारखानों से पहले की उत्पादन व्यवस्था के रूप में नहीं देखना चाहिए। यह ग्रामीण परिवारों, व्यापारियों, बाजारों और बढ़ती वस्तु मांग के बीच विकसित हुआ एक व्यापक आर्थिक तंत्र था। इसने हस्त उत्पादन को बड़े बाजारों से जोड़ा और आधुनिक औद्योगीकरण तथा कारखाना प्रणाली के लिए महत्वपूर्ण आधार तैयार किया।




प्रोटो-औद्योगीकरण का महत्व केवल उत्पादन की मात्रा बढ़ाने तक सीमित नहीं था। इसने ग्रामीण समाज को बाजार की व्यापक अर्थव्यवस्था से जोड़ने का काम किया। व्यापारी ग्रामीण परिवारों और कारीगरों को कच्चा माल देते थे तथा तैयार माल को बाजारों तक पहुँचाते थे। इस व्यवस्था में परिवार उत्पादन की एक महत्वपूर्ण इकाई बन गया था। महिलाएँ और बच्चे भी कताई, बुनाई तथा अन्य घरेलू कार्यों में योगदान देते थे। इससे कृषि के साथ अतिरिक्त आय के स्रोत विकसित हुए। धीरे-धीरे उत्पादन स्थानीय जरूरतों से आगे बढ़कर क्षेत्रीय और अंतरराष्ट्रीय बाजारों की मांग से जुड़ गया। इस बदलाव ने श्रम-विभाजन को बढ़ावा दिया और व्यापारियों की भूमिका मजबूत की।

इस व्यवस्था ने बाद में कारखाना प्रणाली के लिए आधार तैयार किया। हालांकि प्रोटो-औद्योगीकरण में आधुनिक मशीनों और केंद्रीकृत कारखानों का अभाव था, लेकिन उत्पादन, पूंजी, श्रम और बाजार के बीच संबंध पहले ही विकसित हो चुके थे। व्यापारी अधिक मात्रा में और निश्चित समय पर माल चाहते थे, इसलिए उत्पादकों पर बाजार की मांग के अनुसार काम करने का दबाव बढ़ा। इस प्रकार प्रोटो-औद्योगीकरण ने पारंपरिक उत्पादन को समाप्त किए बिना उसे बाजार-उन्मुख बनाया और औद्योगिक क्रांति के लिए आवश्यक आर्थिक तथा सामाजिक परिस्थितियों को मजबूत किया।

2. औद्योगीकरण के कारणों और उसके सामाजिक-आर्थिक प्रभावों की चर्चा कीजिए।

मॉडल उत्तर:

औद्योगीकरण आधुनिक आर्थिक इतिहास की सबसे महत्वपूर्ण प्रक्रियाओं में से एक था। इसका अर्थ केवल मशीनों के उपयोग में वृद्धि नहीं था, बल्कि उत्पादन की तकनीक, श्रम व्यवस्था, बाजार, पूंजी निवेश, परिवहन और सामाजिक संबंधों में व्यापक परिवर्तन से था। ब्रिटेन में औद्योगीकरण के विकास ने बाद में विश्व के अनेक क्षेत्रों की अर्थव्यवस्थाओं को प्रभावित किया।

औद्योगीकरण के विकास के पीछे कई कारण थे। पहला प्रमुख कारण बाजारों का विस्तार था। जनसंख्या में वृद्धि, व्यापार के विस्तार और वस्तुओं की बढ़ती मांग ने उत्पादकों पर अधिक मात्रा में वस्तुओं के उत्पादन का दबाव बनाया। दूसरा कारण तकनीकी नवाचार था। कपड़ा उद्योग में नई मशीनों और उत्पादन तकनीकों ने उत्पादन की गति और मात्रा बढ़ाने में महत्वपूर्ण भूमिका निभाई।

तीसरा कारण पूंजी और व्यापार का विस्तार था। व्यापारियों और निवेशकों के पास उत्पादन, मशीनों, कच्चे माल और परिवहन में निवेश करने के अवसर बढ़े। समुद्री व्यापार और उपनिवेशों के विस्तार ने कच्चे माल तथा तैयार वस्तुओं के लिए नए बाजार उपलब्ध कराए। इस प्रकार औद्योगीकरण तकनीक और बाजार दोनों के संयुक्त विकास का परिणाम था।

औद्योगीकरण का आर्थिक प्रभाव व्यापक था। मशीनों और कारखाना व्यवस्था के कारण बड़े पैमाने पर उत्पादन संभव हुआ। उत्पादन की मात्रा बढ़ी और बाजारों का विस्तार हुआ। उद्योगों में निवेश बढ़ा तथा नए औद्योगिक केंद्र विकसित हुए। परिवहन और व्यापार के विकास ने उत्पादन क्षेत्रों तथा बाजारों के बीच संपर्क मजबूत किया।

इसके सामाजिक प्रभाव भी महत्वपूर्ण थे। कारखानों के विकास के साथ बड़ी संख्या में श्रमिकों को रोजगार मिला और कई लोग ग्रामीण क्षेत्रों से औद्योगिक शहरों की ओर जाने लगे। इससे शहरीकरण की प्रक्रिया तेज हुई। एक नए औद्योगिक श्रमिक वर्ग का विकास हुआ। श्रमिकों के लिए काम के घंटे, मजदूरी, रोजगार की सुरक्षा और कार्यस्थल की परिस्थितियाँ महत्वपूर्ण सामाजिक मुद्दे बन गए।

औद्योगीकरण ने पारंपरिक कारीगरों और हस्त उत्पादन को भी प्रभावित किया। मशीनों से बड़े पैमाने पर उत्पादित वस्तुओं के कारण कई क्षेत्रों में पारंपरिक उत्पादकों को प्रतिस्पर्धा का सामना करना पड़ा। लेकिन हस्त उत्पादन पूरी तरह समाप्त नहीं हुआ। विशेष डिजाइन, उच्च गुणवत्ता, फैशन और ऐसी वस्तुओं में जिनमें कुशल हाथ के काम की आवश्यकता थी, कारीगरों की भूमिका बनी रही।

औद्योगीकरण का प्रभाव महिलाओं और बच्चों के श्रम पर भी पड़ा। कई परिवारों में आय बढ़ाने के लिए परिवार के विभिन्न सदस्यों ने उत्पादन या कारखानों में काम किया। इससे श्रम और परिवार के पारंपरिक संबंधों में परिवर्तन आया। समय के साथ श्रमिक संगठनों और श्रम अधिकारों की मांग भी विकसित हुई।

इसलिए औद्योगीकरण को केवल मशीनों की कहानी मानना उचित नहीं है। यह बाजार, पूंजी, तकनीक, श्रम, शहरों और सामाजिक संबंधों के व्यापक परिवर्तन की प्रक्रिया थी। इसके परिणामस्वरूप उत्पादन और व्यापार का विस्तार हुआ, लेकिन साथ ही असमानता, कठिन कार्य-स्थितियाँ और सामाजिक संघर्ष जैसी समस्याएँ भी सामने आईं।




औद्योगीकरण के विकास में केवल मशीनों के आविष्कार की भूमिका नहीं थी। ब्रिटेन में व्यापार का विस्तार, पूंजी की उपलब्धता, उपनिवेशों से प्राप्त संसाधन, कोयला और लौह-अयस्क जैसे प्राकृतिक संसाधन तथा बढ़ते बाजार इसके महत्वपूर्ण आधार थे। नई मशीनों ने कताई और बुनाई जैसे कार्यों को तेज किया और उत्पादन की मात्रा में भारी वृद्धि की। परिवहन व्यवस्था के विकास ने कच्चे माल को कारखानों तक और तैयार माल को दूर के बाजारों तक पहुँचाना आसान बनाया। इस प्रकार तकनीकी परिवर्तन व्यापार और बाजार के विस्तार से जुड़ गया।

औद्योगीकरण के सामाजिक प्रभाव भी गहरे थे। कारखानों में मजदूरों को नियमित मजदूरी मिलने लगी, लेकिन कार्य घंटे लंबे थे और कार्य परिस्थितियाँ अक्सर कठिन थीं। ग्रामीण क्षेत्रों से रोजगार की तलाश में लोग औद्योगिक नगरों की ओर जाने लगे, जिससे शहरीकरण तेज हुआ। दूसरी ओर कारखाना मालिकों और व्यापारियों को नए आर्थिक अवसर मिले। इस कारण समाज में नए औद्योगिक वर्गों का विकास हुआ। पारंपरिक कारीगरों को मशीन निर्मित वस्तुओं से प्रतिस्पर्धा करनी पड़ी। इसलिए औद्योगीकरण ने आर्थिक विकास और उत्पादन वृद्धि के साथ श्रम संबंधों, वर्गीय विभाजन और शहरी जीवन में भी बड़े परिवर्तन किए।

3. ब्रिटेन में औद्योगीकरण के विकास में कपड़ा उद्योग की भूमिका समझाइए।

मॉडल उत्तर:

ब्रिटेन में औद्योगीकरण के विकास में कपड़ा उद्योग की केंद्रीय भूमिका थी। विशेष रूप से सूती वस्त्र उद्योग ने नई मशीनों, कारखाना प्रणाली, श्रम संगठन और बाजार विस्तार को एक-दूसरे से जोड़ने में महत्वपूर्ण योगदान दिया। कपड़े की बढ़ती मांग ने उत्पादकों को अधिक तेज, अधिक मात्रा और अपेक्षाकृत कम लागत पर उत्पादन करने के लिए नई तकनीकों की खोज के लिए प्रेरित किया।

औद्योगीकरण से पहले कपड़ा उत्पादन का बड़ा भाग कारीगरों और ग्रामीण परिवारों द्वारा किया जाता था। सूत कातने, बुनाई और कपड़ा तैयार करने की प्रक्रिया कई अलग-अलग परिवारों तथा छोटे उत्पादकों में विभाजित रहती थी। बढ़ती मांग के कारण इस उत्पादन व्यवस्था में परिवर्तन की आवश्यकता महसूस हुई।

नई मशीनों के आविष्कार ने कपड़ा उद्योग को तेजी से बदल दिया। कताई और बुनाई से संबंधित तकनीकी सुधारों ने उत्पादन की क्षमता बढ़ाई। मशीनों के प्रयोग से कम समय में अधिक मात्रा में सूत और कपड़ा तैयार करना संभव हुआ। इससे कारखानों में उत्पादन को संगठित करने की आवश्यकता बढ़ी और फैक्टरी प्रणाली का विस्तार हुआ।

कपड़ा उद्योग ने बाजार विस्तार को भी प्रोत्साहित किया। ब्रिटेन में उत्पादित कपड़ों की मांग घरेलू बाजार के साथ-साथ विदेशी बाजारों में भी थी। अंतरराष्ट्रीय व्यापार के विस्तार ने ब्रिटिश कपड़ा उत्पादकों को बड़े बाजार उपलब्ध कराए। इससे उत्पादन, व्यापार और पूंजी निवेश का चक्र मजबूत हुआ।

कपड़ा उद्योग के विकास ने श्रम व्यवस्था को भी बदला। मशीनों के संचालन और कारखानों में उत्पादन के लिए बड़ी संख्या में श्रमिकों की आवश्यकता हुई। श्रमिकों को निर्धारित समय और संगठित उत्पादन प्रक्रिया के अनुसार काम करना पड़ा। इस प्रकार कारखाना व्यवस्था ने श्रम और उत्पादन के संबंधों को नया रूप दिया।

हालाँकि मशीनों के विस्तार का अर्थ यह नहीं था कि हस्त उत्पादन तुरंत समाप्त हो गया। कुछ वस्तुओं में विशेष डिजाइन, गुणवत्ता और कुशल कारीगरी की मांग बनी रही। इसलिए मशीन और हाथ से होने वाला उत्पादन लंबे समय तक साथ-साथ मौजूद रहे।

कपड़ा उद्योग ने ब्रिटेन की औद्योगिक अर्थव्यवस्था में पूंजी संचय, तकनीकी नवाचार, रोजगार, बाजार विस्तार और व्यापार को जोड़ने का काम किया। इस उद्योग की वृद्धि ने अन्य उद्योगों के लिए भी मांग पैदा की, क्योंकि मशीनों, ऊर्जा, परिवहन और कच्चे माल की आवश्यकता बढ़ी।

अतः ब्रिटेन के औद्योगीकरण में कपड़ा उद्योग केवल एक औद्योगिक क्षेत्र नहीं था, बल्कि वह तकनीकी परिवर्तन, कारखाना प्रणाली, श्रम संगठन और विश्व बाजार के विस्तार के बीच महत्वपूर्ण कड़ी था।




ब्रिटेन में कपड़ा उद्योग औद्योगीकरण का प्रमुख केंद्र इसलिए बना क्योंकि सूती वस्त्रों की मांग देश और विदेश दोनों जगह बढ़ रही थी। कताई और बुनाई की नई मशीनों ने उत्पादन की गति और मात्रा बढ़ाई। मशीनों के प्रयोग से बड़े पैमाने पर एक जैसी वस्तुओं का उत्पादन संभव हुआ। कपड़ा उद्योग के विस्तार ने मशीन निर्माण, कोयला, लौह उद्योग और परिवहन जैसे अन्य क्षेत्रों को भी प्रोत्साहित किया। इस प्रकार कपड़ा उद्योग औद्योगिक क्रांति की एक प्रमुख प्रेरक शक्ति बन गया।

कपड़ा उद्योग और वैश्विक व्यापार का संबंध भी बहुत महत्वपूर्ण था। ब्रिटेन को बड़ी मात्रा में कच्चे कपास की आवश्यकता थी और तैयार कपड़ों के लिए विस्तृत बाजार चाहिए थे। उपनिवेशों ने कच्चे माल और बाजार दोनों उपलब्ध कराए। भारत जैसे देशों में ब्रिटिश मशीन निर्मित कपड़ों की बिक्री बढ़ी, जिससे स्थानीय बुनकरों पर दबाव पड़ा। इसलिए ब्रिटेन का कपड़ा उद्योग केवल घरेलू उद्योग नहीं रहा, बल्कि उसने औद्योगिक उत्पादन को अंतरराष्ट्रीय व्यापार और उपनिवेशवादी व्यवस्था से जोड़ दिया।

4. औपनिवेशिक भारत में औद्योगीकरण और भारतीय कारीगरों पर उसके प्रभाव का विश्लेषण कीजिए।

मॉडल उत्तर:

औपनिवेशिक भारत में औद्योगीकरण की प्रक्रिया ब्रिटेन की औद्योगिक क्रांति से अलग परिस्थितियों में विकसित हुई। भारत पहले से ही उच्च गुणवत्ता वाले वस्त्रों और हस्तशिल्प के लिए प्रसिद्ध था। भारतीय बुनकर और कारीगर स्थानीय तथा विदेशी बाजारों के लिए विभिन्न प्रकार के कपड़े और हस्तनिर्मित वस्तुएँ तैयार करते थे। औपनिवेशिक शासन और ब्रिटेन में मशीन-निर्मित वस्तुओं के विस्तार ने इस व्यवस्था को गहराई से प्रभावित किया।

ब्रिटेन में मशीनों द्वारा कपड़ा उत्पादन बढ़ने के बाद ब्रिटिश निर्मित वस्तुओं के लिए नए बाजारों की आवश्यकता हुई। भारत भी इन वस्तुओं का महत्वपूर्ण बाजार बना। मशीन से बने ब्रिटिश कपड़े बड़ी मात्रा में उपलब्ध होने लगे और भारतीय हस्तनिर्मित वस्त्रों को नई प्रतिस्पर्धा का सामना करना पड़ा।

भारतीय कारीगरों की कठिनाइयों का एक कारण औपनिवेशिक व्यापार व्यवस्था थी। ब्रिटिश नीतियों ने भारतीय बाजारों और व्यापार को ऐसे ढंग से प्रभावित किया जिससे ब्रिटिश औद्योगिक उत्पादकों को लाभ मिला। भारतीय उत्पादकों को बदलती मांग, प्रतिस्पर्धा और बाजार की परिस्थितियों के अनुसार स्वयं को ढालना पड़ा।

बुनकरों और अन्य कारीगरों की स्थिति पर इसका महत्वपूर्ण प्रभाव पड़ा। जिन उत्पादों का मशीनों द्वारा बड़े पैमाने पर उत्पादन किया जा सकता था, उनमें हस्तनिर्मित वस्तुओं के लिए प्रतिस्पर्धा कठिन हुई। कई कारीगरों की आय और रोजगार प्रभावित हुए। कुछ उत्पादकों को कृषि या अन्य कामों की ओर जाना पड़ा।

फिर भी भारतीय हस्त उत्पादन पूरी तरह समाप्त नहीं हुआ। कुछ भारतीय वस्त्र अपनी गुणवत्ता, डिजाइन और विशेष मांग के कारण बाजार में बने रहे। ऐसे उत्पादों में कुशल कारीगरों की आवश्यकता बनी रही। भारतीय उत्पादकों ने कई स्थानों पर बदलती बाजार मांग के अनुसार उत्पादन के तरीके और वस्तुओं में परिवर्तन भी किया।

इसी अवधि में भारत में आधुनिक उद्योगों का भी विकास शुरू हुआ। कपड़ा मिलों और अन्य औद्योगिक इकाइयों के विकास ने एक नए औद्योगिक श्रमिक वर्ग को जन्म दिया। इस प्रकार औपनिवेशिक भारत में एक ओर पारंपरिक हस्तशिल्प पर दबाव बढ़ा, वहीं दूसरी ओर आधुनिक उद्योगों की नई संरचना विकसित हुई।

इस प्रक्रिया को केवल 'मशीनों ने कारीगरों को समाप्त कर दिया' के रूप में समझना उचित नहीं है। वास्तविक स्थिति अधिक जटिल थी। औपनिवेशिक नीतियाँ, विश्व बाजार, मशीन-निर्मित वस्तुएँ, स्थानीय मांग, भारतीय उद्यमिता और कारीगरों की अनुकूलन क्षमता सभी ने परिणाम को प्रभावित किया।

अतः औपनिवेशिक भारत में औद्योगीकरण ने भारतीय कारीगरों और बुनकरों के सामने गंभीर चुनौतियाँ पैदा कीं, लेकिन उसने हस्त उत्पादन को पूरी तरह समाप्त नहीं किया। इसने भारतीय अर्थव्यवस्था में पारंपरिक उद्योगों और आधुनिक उद्योगों के बीच एक जटिल संक्रमण की प्रक्रिया को जन्म दिया।




औपनिवेशिक भारत में औद्योगीकरण का स्वरूप ब्रिटेन से अलग था क्योंकि भारतीय अर्थव्यवस्था पर औपनिवेशिक हितों का प्रभाव था। भारत से कच्चा माल प्राप्त करना और ब्रिटेन में बने तैयार माल को भारतीय बाजार में बेचना औपनिवेशिक व्यापार व्यवस्था का महत्वपूर्ण हिस्सा था। मशीन निर्मित ब्रिटिश कपड़ों की प्रतिस्पर्धा के कारण अनेक भारतीय बुनकरों और कारीगरों की स्थिति कमजोर हुई। उन्हें कम कीमतों, बदलती बाजार मांग और व्यापारिक नियंत्रण का सामना करना पड़ा।

फिर भी भारतीय हस्तशिल्प पूरी तरह समाप्त नहीं हुआ। अनेक कारीगरों ने बदलती परिस्थितियों के अनुसार अपने उत्पाद और बाजार बदले। कुछ क्षेत्रों में हस्तनिर्मित वस्तुओं की मांग बनी रही क्योंकि उनमें विशेष कौशल, डिजाइन और गुणवत्ता का महत्व था। बाद में भारतीय उद्यमियों ने आधुनिक उद्योगों में निवेश किया और कपड़ा, जूट तथा लौह-इस्पात जैसे क्षेत्रों में कारखाने विकसित हुए। इसलिए औपनिवेशिक भारत का औद्योगीकरण एक विरोधाभासी प्रक्रिया थी जिसमें पारंपरिक कारीगरों पर दबाव भी बढ़ा और आधुनिक भारतीय उद्योग के विकास की नई परिस्थितियाँ भी बनीं।

5. क्या मशीनों के आने से हस्त उत्पादन पूरी तरह समाप्त हो गया? तर्क सहित उत्तर दीजिए।

मॉडल उत्तर:

मशीनों और कारखानों के विकास के बावजूद हस्त उत्पादन पूरी तरह समाप्त नहीं हुआ। औद्योगीकरण ने मशीन-आधारित उत्पादन का विस्तार अवश्य किया, लेकिन विभिन्न परिस्थितियों में हाथ से उत्पादन लंबे समय तक आर्थिक और सामाजिक रूप से महत्वपूर्ण बना रहा। इसलिए मशीनों के आगमन को हस्त उत्पादन के तत्काल और पूर्ण अंत के रूप में समझना ऐतिहासिक रूप से सही नहीं होगा।

हस्त उत्पादन के बने रहने का पहला कारण विशेष गुणवत्ता और डिजाइन की मांग थी। कुछ वस्तुओं में ग्राहक सामान्य, एक जैसे और बड़े पैमाने पर बने उत्पादों के बजाय विशेष डिजाइन, बेहतर गुणवत्ता या व्यक्तिगत कारीगरी पसंद करते थे। ऐसे उत्पादों में कुशल कारीगरों की आवश्यकता बनी रही।

दूसरा कारण उत्पादन की विविधता था। मशीनें बड़े पैमाने पर मानकीकृत उत्पादन के लिए विशेष रूप से उपयोगी थीं, जबकि छोटे उत्पादक बाजार की मांग के अनुसार वस्तु के आकार, डिजाइन और मात्रा में जल्दी परिवर्तन कर सकते थे। यह लचीलापन हस्त उत्पादकों को कुछ विशेष बाजारों में प्रतिस्पर्धी बनाए रखता था।

तीसरा कारण लागत और मांग की परिस्थितियाँ थीं। हर वस्तु के लिए महंगी मशीन और कारखाना स्थापित करना आवश्यक या लाभदायक नहीं था। छोटे बाजार, विशेष वस्तुएँ और कम मात्रा में उत्पादन कई बार हाथ के काम के लिए अधिक उपयुक्त रहे। इसलिए उत्पादन का तरीका वस्तु और बाजार की प्रकृति पर निर्भर करता था।

चौथा कारण यह था कि औद्योगीकरण स्वयं एक क्रमिक प्रक्रिया थी। मशीनों का विकास एक साथ सभी उद्योगों और सभी क्षेत्रों में नहीं हुआ। अनेक क्षेत्रों में हस्त उत्पादन और मशीन उत्पादन लंबे समय तक साथ-साथ चलते रहे। ग्रामीण परिवार और कारीगर बदलती आर्थिक परिस्थितियों के अनुसार अपने काम में परिवर्तन करते रहे।

भारत का उदाहरण भी महत्वपूर्ण है। औपनिवेशिक काल में ब्रिटिश मशीन-निर्मित वस्तुओं के कारण भारतीय कारीगरों और बुनकरों पर दबाव बढ़ा, लेकिन भारतीय हस्तशिल्प समाप्त नहीं हुआ। कुछ भारतीय वस्त्रों की विशेष मांग बनी रही और कई कारीगरों ने बदलते बाजार के अनुसार उत्पादन में बदलाव किया।

हस्त उत्पादन का बने रहना यह भी दिखाता है कि औद्योगीकरण को केवल तकनीकी परिवर्तन के रूप में नहीं समझना चाहिए। यह बाजार, श्रम, पूंजी, उपभोक्ता मांग और उत्पादन की प्रकृति के बीच संबंधों को बदलने वाली प्रक्रिया थी। मशीनें उन क्षेत्रों में अधिक प्रभावी थीं जहाँ बड़े पैमाने पर एक समान वस्तुओं का उत्पादन आवश्यक था, जबकि हस्त उत्पादन विशेष और विविध उत्पादों के लिए उपयोगी बना रहा।

इसलिए यह कहना अधिक उचित होगा कि औद्योगीकरण ने हस्त उत्पादन को समाप्त करने के बजाय उसकी प्रकृति और भूमिका को बदल दिया। कुछ क्षेत्रों में मशीनों ने हस्त उत्पादन को पीछे धकेला, जबकि अन्य क्षेत्रों में दोनों प्रणालियाँ साथ-साथ विकसित हुईं।

निष्कर्षतः मशीनों का आगमन औद्योगिक उत्पादन में एक बड़ा परिवर्तन था, लेकिन इससे हस्त उत्पादन पूरी तरह समाप्त नहीं हुआ। बाजार की मांग, वस्तु की प्रकृति, गुणवत्ता, डिजाइन, लागत और कुशल श्रम की आवश्यकता के कारण हस्त उत्पादन लंबे समय तक महत्वपूर्ण रहा। यही कारण है कि औद्योगीकरण के इतिहास को मशीन बनाम हाथ के सरल संघर्ष के बजाय दोनों उत्पादन प्रणालियों के बदलते संबंधों के रूप में समझना अधिक उचित है।

AUTHENTIC PYQs

इस अध्याय के लिए कोई सत्यापित प्रामाणिक PYQ उपलब्ध स्रोत-सामग्री से नहीं जोड़ा गया है।

NEXORA किसी भी generated practice question को authentic PYQ के रूप में प्रस्तुत नहीं करता।

QUICK REVISION

औद्योगीकरण = मशीनों, कारखानों और बड़े पैमाने पर उत्पादन का विस्तार।

प्रोटो-औद्योगीकरण = आधुनिक कारखानों से पहले ग्रामीण क्षेत्रों में व्यापारी-आधारित उत्पादन।

कारखाना प्रणाली = एक संगठित स्थान पर मशीनों और श्रमिकों द्वारा उत्पादन।

ब्रिटेन = औद्योगिक विकास और कपड़ा उद्योग का महत्वपूर्ण केंद्र।

भारत = औपनिवेशिक नीतियों और ब्रिटिश मशीन-निर्मित वस्तुओं से प्रभावित।

मुख्य बात = मशीनों के आने के बाद भी हस्त उत्पादन पूरी तरह समाप्त नहीं हुआ।



END OF CHAPTER
`);
      }

      return cleanText(`
CHAPTER OVERVIEW

${chapterName}

Class: ${ctx.className || "Class 10"}
Subject: ${ctx.subject || "History"}
Book/Course: ${ctx.book || "India and the Contemporary World-II"}
Exam/Target: ${ctx.exam || "UPSC"}

NCERT CORE CONCEPTS

The Age of Industrialisation explains how industrial production developed, why factories did not immediately replace hand production, and how industrialisation transformed markets, labour and society.

The chapter also connects industrialisation in Britain with the expansion of world markets and examines the development of industrial production in colonial India.

KEY TERMS

Industrialisation
Industrialisation refers to the development and expansion of machine-based production, factories, large-scale manufacturing and related economic activities.

Proto-industrialisation
Proto-industrialisation refers to the phase in which merchants organised production in rural areas before the widespread dominance of factories.

Factory System
A system of production in which workers, machines, raw materials and production processes were brought together under organised supervision.

Hand Labour
Production carried out mainly through human skill and manual work rather than powered machinery.

Industrial Capital
Capital invested in machines, factories, raw materials, transport and other productive activities.

CHAPTER CONCEPTS

1. Before factories became dominant, merchants often organised production through rural households.

2. Proto-industrial production connected rural producers with expanding markets.

3. Industrialisation did not mean the immediate disappearance of hand production.

4. Some industries continued to depend on skilled workers and specialised manual production.

5. Mechanisation developed unevenly across different industries.

6. The factory system changed the organisation of labour by concentrating workers and machines.

7. Industrial growth increased the importance of markets, transport and investment.

8. Industrialisation also created difficult working conditions for many workers.

9. Britain became an important centre of industrial production.

10. Colonial India was integrated into changing global markets in ways that affected Indian producers and artisans.

INDUSTRIALISATION AND HAND PRODUCTION

Industrialisation should not be understood as a simple replacement of every hand-made product by machines.

Many producers continued to use hand labour because skilled workers could produce specialised goods, because some products were difficult to mechanise, and because certain markets valued quality and variety.

Therefore, industrial production and hand production existed together for a long period.

PROTO-INDUSTRIALISATION

Proto-industrialisation developed before the factory system became dominant.

Merchants supplied raw materials to rural producers and collected finished goods for sale in wider markets.

This system allowed merchants to increase production without immediately building large factories.

It also connected rural households with commercial markets and created conditions that later supported industrial expansion.

THE FACTORY SYSTEM

The factory system concentrated production in organised workplaces.

Machines, workers, raw materials and supervision were brought together.

Factories could coordinate large-scale production and increase output, but they also created strict working routines and new forms of labour discipline.

INDUSTRIALISATION IN BRITAIN

Britain became a major centre of industrialisation.

The expansion of manufacturing was associated with technological innovation, investment, expanding markets and changes in the organisation of production.

Textile production was especially important in the development of modern industry.

However, even during industrial expansion, many forms of hand production remained important.

INDUSTRIALISATION IN INDIA

Indian manufacturing was affected by the expansion of British industrial production and colonial trade.

Indian textile producers faced major changes in markets and competition.

At the same time, new forms of industrial production developed in India.

The growth of modern industries therefore involved both the decline of some traditional production networks and the emergence of new industrial enterprises.

CAUSE AND EFFECT

Cause: Expansion of markets
Effect: Greater demand for manufactured goods.

Cause: Technological innovation
Effect: Increased mechanisation in suitable industries.

Cause: Factory organisation
Effect: Greater concentration and supervision of labour.

Cause: Colonial trade policies and competition
Effect: Major changes in Indian handicraft and textile production.

Cause: Growth of industrial enterprises in India
Effect: Expansion of modern manufacturing and industrial employment.

IMPORTANT COMPARISON

Proto-industrialisation:
- Rural production
- Merchant-controlled organisation
- Household-based labour
- Production before widespread factories

Factory production:
- Centralised workplace
- Machines and workers concentrated together
- Greater supervision
- More organised division of labour

HAND PRODUCTION VS MACHINE PRODUCTION

Hand production:
- Greater dependence on skilled labour
- Flexible production
- Important for specialised goods

Machine production:
- Greater mechanisation
- Higher potential output
- Suitable for standardised mass production

EXAM FOCUS

For UPSC-style preparation, remember that industrialisation was not a single sudden transformation.

It was a long process involving markets, merchants, rural production, technological change, factories, labour, colonialism and changing patterns of global trade.

PRELIMS QUICK FACTS

1. Proto-industrialisation preceded the widespread factory system.

2. Industrialisation did not eliminate hand production immediately.

3. Textile production played a major role in the Industrial Revolution.

4. Factory production brought workers and machines together under organised supervision.

5. Colonial India experienced major changes in textile production and markets.

6. Industrialisation changed both production and labour relations.

7. Markets and commercial networks were important to industrial expansion.

8. Skilled hand workers remained important in several industries.

9. Industrialisation created both economic opportunities and difficult labour conditions.

10. Indian industrial development occurred within a wider colonial and global economic system.

MCQs

1. What best describes proto-industrialisation?
A. Complete mechanisation of all production
B. Rural production organised through merchant networks
C. Production only inside large factories
D. Production without markets
Answer: B

2. Which system brought workers and machines together in a central workplace?
A. Household production
B. Factory system
C. Barter system
D. Subsistence system
Answer: B

3. Industrialisation primarily involved the expansion of:
A. Machine-based and organised production
B. Only agricultural production
C. Only household consumption
D. Only handicraft production
Answer: A

4. Why did hand production continue even after industrialisation began?
A. All machines stopped working
B. Skilled labour remained useful for many specialised products
C. Markets disappeared
D. Factories were legally prohibited
Answer: B

5. Which sector was particularly important in early British industrialisation?
A. Textile production
B. Space technology
C. Software
D. Nuclear energy
Answer: A

6. Proto-industrial production often involved:
A. Merchants supplying rural producers with raw materials
B. Governments banning trade
C. Only urban factory workers
D. Completely automated factories
Answer: A

7. A major feature of factory production was:
A. Absence of supervision
B. Concentration of workers and machines
C. Elimination of markets
D. Complete dependence on agriculture
Answer: B

8. Industrialisation affected labour mainly by:
A. Ending all forms of employment
B. Changing the organisation and discipline of work
C. Eliminating skill
D. Ending production
Answer: B

9. Indian textile producers were strongly affected by:
A. Colonial trade and industrial competition
B. Space exploration
C. Modern computing
D. Nuclear power
Answer: A

10. Which statement is most accurate?
A. Industrialisation instantly eliminated handicrafts.
B. Industrialisation and hand production coexisted for a long period.
C. Factories existed everywhere before merchants.
D. Industrialisation had no effect on labour.
Answer: B

11. What connected rural producers with wider markets during proto-industrialisation?
A. Merchant networks
B. Nuclear plants
C. Universities
D. Political parties
Answer: A

12. Which factor supported industrial expansion?
A. Expanding markets
B. Disappearance of trade
C. Decline of investment
D. End of transport
Answer: A

13. Industrialisation changed production mainly through:
A. New technology and organisation
B. Complete rejection of machinery
C. Elimination of markets
D. Reduction of all manufacturing
Answer: A

14. Which was an important consequence of factory production?
A. More organised labour supervision
B. Complete absence of discipline
C. End of wage labour
D. End of manufacturing
Answer: A

15. The history of Indian industrialisation should be understood in relation to:
A. Colonialism and global markets
B. Only village agriculture
C. Only local barter
D. Modern digital technology
Answer: A

MAINS / DESCRIPTIVE QUESTIONS

1. Question: Explain the major features of industrialisation and examine why hand production continued alongside factories.

Model Answer:

Industrialisation was a long and uneven process that transformed production, markets and labour. It is often presented as a transition from hand production to machine production, but the historical process was much more complex. Factories and machines expanded significantly, yet hand production continued in many sectors because skilled labour, flexibility and specialised production remained economically valuable.

Before the widespread factory system, proto-industrialisation created important links between merchants, rural households and expanding markets. Merchants supplied raw materials to rural producers and collected finished goods for wider sale. This arrangement enabled commercial production to expand without requiring all workers to move into factories. It also helped establish networks of production, trade and investment that later supported industrialisation.

The factory system introduced a different organisation of production. Workers, machines, raw materials and supervision were concentrated in a central workplace. This allowed production to be coordinated on a larger scale and created greater control over working time and labour discipline. Industrialisation therefore changed not only technology but also the social organisation of work.

However, machines could not replace every form of skilled labour. Some products required specialised craftsmanship, detailed finishing and flexibility. Consumers could also value variety and quality rather than only standardised mass-produced goods. For these reasons, hand production remained important even as factories expanded.

The British experience demonstrates this coexistence. Mechanised textile production grew rapidly, but various forms of manual production continued. Industrialisation therefore involved the expansion of machine-based production rather than the immediate disappearance of traditional skills.

In colonial India, the process was further complicated by the relationship between Indian producers and British industrial capitalism. Indian textile producers faced changing markets and competition from British manufactured goods. At the same time, new forms of industrial production emerged within India.

Thus, industrialisation should be understood as a process involving technological change, expanding markets, merchant networks, factory organisation and changing labour relations. The coexistence of hand production and mechanised production demonstrates that economic transformation is rarely instantaneous. Different production systems can exist together when they serve different markets and economic needs.

2. Question: Discuss the role of proto-industrialisation in the development of the factory system.

Model Answer:

Proto-industrialisation was an important stage in the development of modern industrial production. It refers to the expansion of commercial production before factories became the dominant form of industrial organisation. Its importance lies in the way it connected merchants, rural households, labour and markets.

During proto-industrialisation, merchants played an important role in organising production. They supplied raw materials to rural households and collected finished goods for sale in wider markets. Rural families participated in this production because it provided opportunities to supplement agricultural income. Production was therefore increasingly linked to commercial demand rather than being limited to local consumption.

This system allowed merchants to expand production without immediately constructing large factories. It created flexible networks of producers distributed across the countryside. Such networks were particularly useful when production required manual skills or when machinery was not yet suitable for a particular product.

Proto-industrialisation also helped create the economic conditions necessary for industrialisation. Expanding markets encouraged merchants to invest more capital and seek ways to increase output. Commercial networks connected producers with consumers over wider geographical areas. Over time, technological developments and organisational changes made centralised factory production increasingly practical in suitable industries.

The transition from proto-industrialisation to factory production was not sudden. Elements of both systems existed together. Some industries adopted machines and factories rapidly, while others continued to depend on rural and skilled hand production.

The factory system nevertheless introduced important changes. Workers and machines were brought together in central workplaces, production could be supervised more closely, and working time became more strictly organised. These changes affected labour relations as well as productivity.

Therefore, proto-industrialisation should be seen as an important foundation rather than simply a failed stage of production. It expanded commercial networks, increased market-oriented production and strengthened the relationship between merchants and producers. It helped create the conditions in which factory-based industrialisation could later expand.

3. Question: Examine the impact of industrialisation on Indian producers and the development of modern industries in India.

Model Answer:

Industrialisation had a complex impact on India because Indian production was increasingly connected to a global economy shaped by British colonial rule. The expansion of British industrial production altered markets for Indian goods, particularly textiles, while new forms of modern industry also developed within India.

Indian textile production had a long history of skilled craftsmanship and established commercial networks. The rise of British machine-made goods created intense competition for Indian producers. Changes in trade patterns and colonial economic policies affected the demand for Indian manufactured goods and altered the conditions under which artisans worked.

The impact was not simply the disappearance of all Indian manufacturing. Different regions, producers and industries experienced change differently. Some traditional forms of production declined, while others adapted to changing markets. Skilled labour remained valuable where products required specialised craftsmanship or flexible production.

At the same time, modern industries developed in India. Industrial enterprises created new forms of production and employment. The growth of factories introduced new labour relations, production methods and forms of industrial organisation.

The Indian experience therefore demonstrates that industrialisation cannot be understood only as technological progress. It must also be examined through questions of colonialism, trade, markets and unequal economic power.

British industrialisation influenced the structure of Indian markets, while Indian producers responded through adaptation, specialisation and participation in emerging industrial sectors. The development of modern industry in India consequently occurred within a wider global system rather than independently of it.

The most important conclusion is that industrialisation produced both disruption and transformation. Traditional producers faced serious challenges, but new industrial opportunities also emerged. The Indian case therefore illustrates how industrialisation can have different consequences depending on political and economic structures.

4. Question: Why did industrialisation not immediately eliminate hand labour?

Model Answer:

Industrialisation did not immediately eliminate hand labour because machines were not equally suitable for every form of production. Industrialisation expanded mechanised production, but many industries continued to depend on skilled workers, manual techniques and flexible production.

One important reason was the nature of the product. Some goods required specialised craftsmanship, detailed finishing or individual attention. Machines were particularly effective for standardised mass production, but they were not equally effective for every specialised task.

Labour costs and investment also influenced production decisions. Establishing factories and purchasing machinery required capital. Producers therefore adopted machines when mechanisation provided sufficient economic advantages. Where hand labour remained flexible or relatively efficient, producers continued to use it.

Consumer demand also mattered. Some markets valued quality, variety and specialised goods. Hand production could respond to such demand more effectively than rigid machine-based systems.

Historical industrialisation therefore involved coexistence rather than complete replacement. Factories expanded in suitable sectors while skilled artisans and household producers remained active in others.

This pattern is important because it prevents a simplistic understanding of the Industrial Revolution. Technological change does not automatically destroy older forms of production. Instead, different technologies and labour systems can coexist according to market demand, cost, skill requirements and organisational conditions.

The continuation of hand labour also demonstrates the importance of human skill. Even in an industrialising economy, machines often required workers to operate, maintain or complement them.

Thus, the persistence of hand production was not necessarily evidence that industrialisation had failed. It was a normal feature of an uneven technological transition in which different forms of production served different economic purposes.

5. Question: Assess the significance of industrialisation for changes in labour and society.

Model Answer:

Industrialisation transformed not only production but also the organisation of labour and wider social relations. The movement toward factories introduced new forms of work discipline, concentrated workers in industrial workplaces and strengthened the relationship between wage labour, markets and capital.

In earlier household-based production, workers often combined agricultural and manufacturing activities. Their work was organised around household requirements and local or merchant-controlled production. Factory production introduced a different structure in which workers operated within a central workplace and followed more organised schedules.

The factory system also increased supervision. Employers could monitor production more closely, coordinate workers and regulate working time. This changed the relationship between workers and employers and contributed to the development of new forms of industrial labour.

Industrialisation also encouraged urban and commercial growth in areas where factories and markets expanded. Industrial employment created new opportunities but could also expose workers to difficult working conditions, long hours and strict discipline.

At the same time, industrialisation created a wider industrial economy involving merchants, investors, manufacturers and wage workers. The expansion of markets connected local production to national and international trade.

However, industrialisation did not create a completely uniform society. Hand workers, artisans, factory workers and rural producers continued to coexist. Different groups experienced industrial change differently depending on their skills, location and relationship to markets.

The Indian case adds another dimension because industrial development occurred under colonial rule. Indian workers and producers were affected by global market forces as well as colonial economic structures.

Therefore, industrialisation should be understood as a broad social transformation rather than merely the introduction of machines. It reshaped production, labour discipline, markets and social relationships. Its effects were uneven, producing both new opportunities and new forms of economic insecurity.

QUICK REVISION

Industrialisation = expansion of machine-based and organised production.

Proto-industrialisation = commercial rural production before widespread factories.

Factory system = centralised production using organised labour and machinery.

Key idea = Industrialisation did not immediately eliminate hand production.

British context = expansion of industrial production and markets.

Indian context = colonial trade, changing textile markets and emergence of modern industries.

UPSC theme = technology + markets + labour + capital + colonialism.

AUTHENTIC PYQs

No verified authentic PYQ has been added to this deterministic fallback.

NEXORA does not label generated practice questions as authentic PYQs.

VISUALS



END OF CHAPTER
`);
    }

    return cleanText(`
CHAPTER OVERVIEW

${chapterName}

Class: ${ctx.className || "Not specified"}
Subject: ${ctx.subject || "Not specified"}
Book/Course: ${ctx.book || "Not specified"}
Exam/Target: ${ctx.exam || "General"}

SOURCE STATUS

Chapter-specific live source retrieval was unavailable; standard textbook-grounded generation is being used.

The selected chapter remains:
${chapterName}

Chapter-specific live source retrieval was unavailable; standard textbook-grounded generation is being used..
`);
  }

  /*
   * ---------------------------------------------------------
   * OVERVIEW
   * ---------------------------------------------------------
   */

  const overview =
    concepts.length
      ? concepts
          .slice(0, 4)
          .join(" ")
      : `यह अध्याय चयनित chapter-specific source evidence पर आधारित revision material प्रस्तुत करता है।`;

  let output = `
TITLE: NEXORA SHORT NOTES — ${ctx.exam || "GENERAL"}

CHAPTER OVERVIEW

${chapterName}

Class: ${ctx.className || "Not specified"}
Subject: ${ctx.subject || "Not specified"}
Book/Course: ${ctx.book || "Not specified"}
Exam/Target: ${ctx.exam || "General"}
Language: ${ctx.language || "Hindi"}

${overview}

${coreHeading}

${formatPoints(
  concepts
)}

IMPORTANT DEFINITIONS

${formatDefinitions(
  definitions
)}

IMPORTANT TERMS

${formatTerms(
  terms
)}

DETAILED NOTES

${formatPoints(
  concepts
)}
`;

  if (
    categories.length
  ) {
    output += `

CLASSIFICATION / TYPES / COMPONENTS

${formatPoints(
  categories
)}
`;
  }

  if (
    processes.length
  ) {
    output += `

PROCESSES / CAUSE-EFFECT / SEQUENCE

${formatPoints(
  processes
)}
`;
  }

  if (
    facts.length
  ) {
    output += `

IMPORTANT FACTS

${formatPoints(
  facts
)}
`;
  }

  if (
    visuals.length
  ) {
    output += `

RELEVANT VISUALS

${formatVisuals(
  visuals
)}
`;
  }

  output += `

${buildExamFocus(
    profile,
    ctx
  )}
`;

  output += `

PRACTICE MCQs

${formatMCQs(
    mcqs
  )}
`;

  output += `

MAINS / DESCRIPTIVE QUESTIONS

${
    descriptive.length
      ? descriptive
          .map(
            (question, index) => {
              if (
                typeof question === "object" &&
                question !== null
              ) {
                const questionText =
                  cleanText(
                    question.question ||
                    question.text ||
                    `Explain the major concepts and significance of ${ctx.chapterTitle || "the selected chapter"}.`
                  );

                const rawAnswer =
                  question.answer ||
                  question.explanation ||
                  "";

                const finalAnswer =
                  ensureMinimumMainsLength(
                    rawAnswer,
                    questionText,
                    sourceText,
                    ctx
                  );

                return `${index + 1}. ${questionText}

WORD LIMIT: 500–700 words

ANSWER:
${finalAnswer}`;
              }

              const finalAnswer =
                ensureMinimumMainsLength(
                  "",
                  question,
                  sourceText,
                  ctx
                );

              return `${index + 1}. ${cleanText(question)}

WORD LIMIT: 500–700 words

ANSWER:
${finalAnswer}`;
            }
          )
          .join("\n\n")
      : "No sufficiently supported descriptive questions could be generated."
  }
`;

  const quickRevision =
    unique([
      ...definitions.slice(
        0,
        4
      ),
      ...concepts.slice(
        0,
        5
      ),
      ...facts.slice(
        0,
        4
      )
    ]).slice(
      0,
      12
    );

  output += `

QUICK REVISION

${formatPoints(
    quickRevision
  )}
`;

  return cleanText(
    output
  );
}


/* =========================================================
   GEMINI PROMPT
   ========================================================= */

function buildChapterPrompt(
  options = {}
) {
  const __NEXORA_TOPIC_VISUAL_RULES = NEXORA_TOPIC_VISUAL_NOTES_RULES;
  const ctx =
    chapterContext(
      options
    );

  const profile =
    getExamProfile(
      ctx.exam,
      ctx.className,
      ctx.subject
    );

  const sourceText =
    limitText(
      removeWebNoise(
        options.sourceText ||
        options.source ||
        ""
      ),
      32000
    );

  console.log(
    "NEXORA SOURCE TEXT TEST:",
    JSON.stringify(
      String(sourceText || "").slice(0, 3000)
    )
  );

  const chapterName =
    ctx.chapterNumber
      ? `Chapter ${ctx.chapterNumber}: ${ctx.chapterTitle}`
      : ctx.chapterTitle ||
        "Selected Chapter";

  let languageInstruction =
    "Write primarily in English.";

  if (
    normalize(
      ctx.language
    ).startsWith("hi")
  ) {
    languageInstruction =
      "Write primarily in clear Hindi. Preserve standard English technical terms in brackets where useful.";
  }

  if (
    normalize(
      ctx.language
    ).startsWith("hing")
  ) {
    languageInstruction =
      "Write naturally in Hinglish using Hindi and English where appropriate.";
  }

  const ncertMode =
    normalize(
      ctx.book
    ).includes("ncert");

  return `${nexoraTopicLocalVisualRule()}\n\nYou are NEXORA's professional academic notes engine.

==================================================
ABSOLUTE SELECTION LOCK
==================================================

Generate notes ONLY for:

Class/Level:
${ctx.className || "Not specified"}

Subject:
${ctx.subject || "Not specified"}

Writer / Author:
${ctx.author || ctx.writer || "Not specified"}

Book/Course:
${ctx.book || "Not specified"}

Chapter:
${chapterName}

English Chapter Title:
${ctx.chapterTitle || "Not specified"}

Hindi Chapter Title:
${ctx.chapterHindi || "Not specified"}

Exam/Target:
${ctx.exam || "General"}

Language:
${ctx.language}

Mode:
${ctx.mode}

SELECTION FINGERPRINT:
${buildSelectionFingerprint(ctx)}

STRICT RULE:

The selected chapter is immutable.

Do NOT:
- switch chapter
- mix chapters
- infer another chapter
- use unrelated search content
- include URLs
- include SEO text
- include advertisements
- include coaching material
- invent facts
- invent definitions
- invent PYQs

If source evidence is insufficient, clearly say that the source is insufficient.

==================================================
EXAM PROFILE
==================================================

${JSON.stringify(
    profile,
    null,
    2
)}

==================================================
TARGET RULES
==================================================

${targetRules(
    profile
)}

==================================================
SOURCE MATERIAL
==================================================

${sourceText || "NO RELIABLE SOURCE MATERIAL AVAILABLE"}

==================================================
LANGUAGE
==================================================

${languageInstruction}

==================================================
OUTPUT REQUIREMENTS
==================================================

Create professional, concise, revision-oriented TOPPER-STYLE exam notes.

Apply NEXORA_UNIVERSAL_TOPPER_RULES exactly.

Sections:

1. CHAPTER OVERVIEW

2. ${
    ncertMode
      ? "NCERT CORE CONCEPTS"
      : "CORE CONCEPTS"
  }

3. IMPORTANT DEFINITIONS

4. IMPORTANT TERMS

5. DETAILED NOTES

6. CLASSIFICATION / TYPES / COMPONENTS
Only if applicable.

7. PROCESSES / CAUSE-EFFECT / SEQUENCE
Only if applicable.

8. FORMULAS / APPLICATION / REAL-LIFE CONNECTION
Use FORMULAS when genuinely relevant.
Otherwise provide APPLICATION / REAL-LIFE CONNECTION.
Do not invent formulas where none exist.

9. IMPORTANT VISUALS
The visual requirement must be evaluated for every chapter.

Use a visual only when it is genuinely exam-relevant and supported by the selected chapter.

Possible visual types:
- map
- labelled diagram
- concept diagram
- flowchart
- classification tree
- graph / chart
- timeline
- scientific illustration
- location map

Do NOT create decorative visuals.

NEXORA will insert the actual visual through its deterministic chapter-specific visual system.
Do not invent arbitrary visual markers.
Do not describe a visual as a substitute for the NEXORA visual.

If no special visual is genuinely required, state:
"इस अध्याय में कोई विशेष exam-important visual आवश्यक नहीं है।"

10. IMPORTANT COMPARISONS
Include only when useful for understanding or examination.

11. IMPORTANT DATES / TIMELINE
Include only when the selected chapter contains relevant dates, chronology or historical sequence.

12. EXAM FOCUS

13. PRACTICE MCQs

Create EXACTLY 15 chapter-specific MCQs when enough evidence exists.

Each MCQ must contain:
Question
A
B
C
D
Correct Answer
Explanation

MCQs must vary naturally.

14. PRACTICE QUESTIONS

Create EXACTLY 5 appropriate descriptive/Mains/long-answer questions based strictly on the selected chapter.

IMPORTANT: Every practice question MUST be followed immediately by a complete MODEL ANSWER.

Use this exact structure for every question:

1. Question: <chapter-specific question>
   Word Limit: 500–700 words

   Model Answer:
   <deep, well-structured, exam-ready answer of at least 500 words>

Model Answer requirements:
- Every Model Answer MUST contain at least 500 words.
- Target approximately 550–700 words when the question requires detailed analysis.
- Directly answer the exact demand of the question.
- Use only facts relevant to the selected Class, Subject, Book and Chapter.
- Do not pad the answer with repetitive or generic filler merely to reach 500 words.
- Include a clear Introduction, Core Discussion/Analysis and Conclusion.
- For analytical questions, explain causes, processes, effects, significance, challenges, examples, comparison or evaluation as appropriate.
- Use chapter-specific facts, concepts, locations, examples and evidence wherever available.
- Use headings and bullet points where they improve UPSC/exam presentation.
- If a map, diagram, flowchart or other visual is relevant, refer to it naturally in the answer.
- Maintain logical paragraph flow and analytical depth.
- The answer should read like a high-quality educational platform / UPSC Mains model answer.
- Do not invent facts, statistics, PYQs, quotations or sources.
- Do not provide only hints, outlines or short notes.
- The Model Answer must be substantive and useful for actual exam preparation.
- A short answer below 500 words is NOT acceptable.
- If source material is limited, expand the explanation through careful conceptual analysis of the selected chapter without inventing unsupported facts.

15. LAST-MINUTE REVISION

Provide 10–20 high-value revision points covering:
- key concepts
- definitions
- important terms
- dates / chronology when relevant
- causes and effects
- classifications
- formulas when relevant
- exam traps / distinctions
- chapter-specific facts

Do not repeat the entire detailed notes.

16. ONE-PAGE MEMORY MAP

Create a compact text-based memory structure of the selected chapter.

It should connect:
- central theme
- major concepts
- important terms
- causes / processes / effects where applicable
- dates / chronology where applicable
- exam focus

Keep it concise and revision-oriented.
Do not invent information.

==================================================
VISUAL MARKERS
==================================================

When a visual is genuinely required, insert one of these markers on its own line:

[[NEXORA_DIAGRAM:inside-our-earth]]

[[NEXORA_DIAGRAM:major-landforms-earth]]

[[NEXORA_DIAGRAM:maps]]

Only use a marker when the selected chapter genuinely requires that visual.

Do not invent visual facts.

==================================================
QUALITY CONTROL
==================================================

Before finalizing verify:

- correct class
- correct subject
- correct book/course
- correct chapter
- correct exam/target
- correct language
- no unrelated chapter
- no URLs
- no SEO
- no advertisements
- no fake PYQs
- no unsupported facts
- chapter-specific definitions
- chapter-specific terms
- chapter-specific dates / chronology when applicable
- chapter-specific MCQs
- at least 15 MCQs when sufficient evidence exists
- every descriptive question has a substantive Model Answer
- Model Answers are at least 500 words
- important visuals are evaluated for the selected chapter
- NEVER invent a visual, map, diagram, location, route, statistic or visual fact
- NEVER reuse a visual from another chapter
- NEXORA deterministic visual routing is the authority for actual diagram insertion
- do not create arbitrary NEXORA_DIAGRAM markers
- do not replace an actual NEXORA visual with a textual visual description

Do not mention:
- Tavily
- Gemini
- AI
- source retrieval
- internal metadata
- URLs

Return only professional NEXORA study notes.
`;
}


/* =========================================================
   GEMINI OUTPUT CLEANING
   ========================================================= */

function sanitizeGeminiOutput(
  text
) {
  let output =
    cleanText(
      text
    );

  if (!output) {
    return "";
  }

  output =
    output.replace(
      /https?:\/\/\S+/gi,
      ""
    );

  output =
    output.replace(
      /\bwww\.\S+/gi,
      ""
    );

  output =
    output.replace(
      /^\s*(source|sources|references|reference|citation|citations)\s*:.*$/gim,
      ""
    );

  output =
    output.replace(
      /^\s*(url|website|link)\s*:.*$/gim,
      ""
    );

  output =
    output.replace(
      /^\s*(powered by|search result|advertisement|related posts)\b.*$/gim,
      ""
    );

  /*
   * Remove accidental code fences but
   * preserve NEXORA diagram markers.
   */

  output =
    output.replace(
      /```(?:markdown|text)?/gi,
      ""
    );

  output =
    output.replace(
      /```/g,
      ""
    );

  return cleanText(
    output
  );
}


/* =========================================================
   NEXORA UNIVERSAL TEXTBOOK VISUAL ENGINE
   ========================================================= */

const {
  getAllRelevantVisuals
} = require("./ncert-visual-engine");

/* =========================================================
   GEMINI VALIDATION
   ========================================================= */

function geminiOutputIsUsable(
  text,
  ctx
) {
  const value =
    cleanText(
      text
    );

  if (
    value.length < 1000
  ) {
    return false;
  }

  const lower =
    normalize(
      value
    );

  /*
   * NEXORA GEMINI FLEXIBLE STRUCTURE VALIDATION
   *
   * Gemini may use equivalent headings such as:
   * Overview, Summary, Key Concepts, Concepts,
   * Prelims, Practice Questions, MCQs, Questions,
   * मुख्य बिंदु, सारांश, अवधारणाएँ, प्रश्न आदि.
   *
   * Do not reject a substantive chapter answer merely
   * because Gemini chose different heading wording.
   */
  const hasOverview =
    lower.includes("chapter overview") ||
    lower.includes("overview") ||
    lower.includes("chapter summary") ||
    lower.includes("summary") ||
    lower.includes("अध्याय का सार") ||
    lower.includes("अध्याय का अवलोकन") ||
    lower.includes("सारांश") ||
    lower.includes("परिचय");

  const hasConcept =
    lower.includes("core concepts") ||
    lower.includes("key concepts") ||
    lower.includes("important concepts") ||
    lower.includes("concepts") ||
    lower.includes("मुख्य अवधारण") ||
    lower.includes("महत्वपूर्ण अवधारण") ||
    lower.includes("मुख्य बिंदु") ||
    lower.includes("अवधारणाएँ");

  const hasMCQ =
    lower.includes("mcq") ||
    lower.includes("multiple choice") ||
    lower.includes("practice questions") ||
    lower.includes("objective questions") ||
    lower.includes("prelims") ||
    lower.includes("बहुविकल्पीय") ||
    lower.includes("अभ्यास प्रश्न") ||
    lower.includes("वस्तुनिष्ठ प्रश्न") ||
    lower.includes("प्रश्न");

  /*
   * Gemini can produce a complete structured answer without
   * using all three exact headings. Require substantive content
   * plus at least two recognizable educational structures.
   */
  const structuralSignals = [
    hasOverview,
    hasConcept,
    hasMCQ,
    lower.includes("detailed notes"),
    lower.includes("important facts"),
    lower.includes("quick revision"),
    lower.includes("mains"),
    lower.includes("model answer"),
    lower.includes("prelims"),
    lower.includes("परिभाष"),
    lower.includes("विस्तृत"),
    lower.includes("त्वरित पुनरावृत्ति"),
    lower.includes("मुख्य परीक्षा"),
    lower.includes("उत्तर")
  ].filter(Boolean).length;

  if (
    structuralSignals < 2
  ) {
    return false;
  }

  const chapterTitle =
    normalize(
      ctx.chapterTitle
    );

  if (
    chapterTitle &&
    chapterTitle.length >= 5
  ) {
    const words =
      chapterTitle
        .split(" ")
        .filter(
          word =>
            word.length >= 4
        );

    if (
      words.length >= 2
    ) {
      const matches =
        words.filter(
          word =>
            lower.includes(
              word
            )
        ).length;

      if (
        matches === 0
      ) {
        return false;
      }
    }
  }

  return true;
}


/* =========================================================
   GEMINI CALL
   ========================================================= */

async function generateWithGemini(
  prompt
) {
  if (!ai) {
    throw new Error(
      "GEMINI_API_KEY not configured"
    );
  }

  const timeoutMs = 90000;

  try {
    console.log(
      `NEXORA Gemini: request started (timeout ${timeoutMs}ms)`
    );

    const requestPromise =
      ai.models.generateContent({
        model:
          GEMINI_MODEL,
        contents:
          prompt,
        config: {
          temperature: 0,
          topP: 0.8,
          thinkingConfig: {
            thinkingLevel: "minimal"
          },
          maxOutputTokens:
            12000
        }
      });

    const timeoutPromise =
      new Promise((_, reject) => {
        setTimeout(() => {
          const timeoutError =
            new Error(
              "GEMINI_REQUEST_TIMEOUT"
            );

          timeoutError.code =
            "GEMINI_REQUEST_TIMEOUT";

          reject(timeoutError);
        }, timeoutMs);
      });

    const response =
      await Promise.race([
        requestPromise,
        timeoutPromise
      ]);

    console.log(
      "NEXORA Gemini: response received"
    );

    const text =
      response?.text ||
      response
        ?.candidates?.[0]
        ?.content?.parts
        ?.map(
          part =>
            part?.text ||
            ""
        )
        .join("\n") ||
      "";

    if (!String(text).trim()) {
      throw new Error(
        "GEMINI_EMPTY_RESPONSE"
      );
    }

    return text;

  } catch (
    error
  ) {
    const message =
      error?.message ||
      String(error);

    console.error(
      "NEXORA Gemini ERROR:",
      message
    );

    if (
      message.includes("429") ||
      message.includes(
        "RESOURCE_EXHAUSTED"
      ) ||
      message.toLowerCase().includes(
        "quota"
      ) ||
      message.includes(
        "GenerateRequestsPerDay"
      )
    ) {
      const quotaError =
        new Error(
          "GEMINI_QUOTA_EXHAUSTED"
        );

      quotaError.code =
        "GEMINI_QUOTA_EXHAUSTED";

      throw quotaError;
    }

    throw error;
  }
}



/* =========================================================
   MAIN CHAPTER GENERATOR
   ========================================================= */


/* NEXORA_UNIVERSAL_GENERATION_RECOVERY_V16 */

function nexoraUniversalChapterIdentityV16(book, chapter) {
    return {
        bookTitle: String(
            book?.titleEn ||
            book?.title ||
            book?.name ||
            ""
        ).trim(),

        chapterNumber: chapter?.number != null
            ? String(chapter.number)
            : "",

        chapterTitleEn: String(
            chapter?.titleEn ||
            chapter?.title ||
            chapter?.name ||
            ""
        ).trim(),

        chapterTitleHi: String(
            chapter?.titleHi || ""
        ).trim()
    };
}

function nexoraUniversalGenerationPromptV16({
    book,
    chapter,
    exam = "UPSC",
    language = "english",
    mode = "exam"
} = {}) {
  const __NEXORA_TOPIC_VISUAL_RULES = NEXORA_TOPIC_VISUAL_NOTES_RULES;
    const identity =
        nexoraUniversalChapterIdentityV16(book, chapter);

    const isHindi =
        String(language).toLowerCase().startsWith("hi");

    const chapterName =
        isHindi
            ? (identity.chapterTitleHi || identity.chapterTitleEn)
            : identity.chapterTitleEn;

    const examName =
        String(exam || "UPSC").trim();

    return `
NEXORA UNIVERSAL SHORT NOTES ENGINE

SELECTED BOOK:
${identity.bookTitle || "Not specified"}

SELECTED CHAPTER NUMBER:
${identity.chapterNumber || "Not specified"}

SELECTED CHAPTER:
${chapterName}

TARGET EXAM:
${examName}

LANGUAGE:
${language}

MODE:
${mode}

ABSOLUTE CHAPTER LOCK:
1. Generate ONLY the selected chapter.
2. Never replace it with another chapter.
3. Never merge neighboring chapters.
4. Never generate generic subject notes instead of chapter notes.
5. Do not output a "source unavailable" message as the educational answer.
6. Use standard textbook knowledge when live source retrieval is unavailable.
7. Do not invent citations.
8. Do not invent an "authentic PYQ".
9. If authentic PYQs cannot be verified, clearly say verified authentic PYQs were not added.

CONTENT REQUIREMENTS:
- Chapter Overview
- Core Concepts
- Definitions
- Important Terms
- Detailed Notes
- Classification / Types where applicable
- Processes / Mechanisms where applicable
- Causes and Effects where applicable
- Important Facts
- Important Dates / Timeline where applicable
- Examples / Applications where applicable
- Comparisons where applicable
- Formulas and numerical applications for relevant subjects
- Diagrams / flowcharts / maps where genuinely relevant
- Exam Focus
- Practice Questions appropriate to the selected exam
- Last-Minute Revision
- One-Page Memory Map

EXAM ADAPTATION:

UPSC / UPPCS / PCS / STATE PCS / descriptive exams:
- Minimum 15 chapter-specific MCQs.
- Exactly 3 chapter-specific Mains/descriptive questions.
- Every Mains question must have a complete model answer.
- Target approximately 500-700 words per model answer.
- Include introduction, structured body, examples/facts where relevant, and conclusion.
- Do not label generated practice questions as PYQs.

SSC / Banking / Railway / Police / other objective exams:
- Prioritize factual and conceptual MCQs.
- Include exam-style practice questions.
- Do not force UPSC-style long answers unless relevant.

JEE / NEET / CUET / entrance exams:
- Use the appropriate conceptual, numerical and application-oriented format for the subject.
- Include formulas, traps, applications and exam-style practice.
- Do not force unrelated descriptive sections.

SCHOOL / BOARD / COLLEGE:
- Explain concepts clearly.
- Include definitions, examples, important questions and revision material appropriate to the level.

SUBJECT ADAPTATION:
- History: chronology, causes, events, personalities, consequences.
- Geography: concepts, processes, maps, diagrams, examples.
- Polity: constitutional provisions, institutions, articles where relevant.
- Economy: concepts, mechanisms, indicators, examples and applications.
- Environment: ecosystems, processes, conventions, examples.
- Physics: laws, derivations, formulas, units, numerical applications.
- Chemistry: concepts, reactions, equations, mechanisms and applications.
- Biology: structures, processes, diagrams and applications.
- Mathematics: definitions, formulas, methods, solved examples and practice.
- English/Hindi: concepts, rules, examples, literary/textual analysis as applicable.
- Computer Science: concepts, algorithms, syntax/examples and applications.

QUALITY RULE:
The final answer must be educational content for the exact selected book and chapter, not a system status report.
`;
}



function nexoraIsNDAExam(exam){return /\b(?:NDA|National\s+Defence\s+Academy)\b/i.test(String(exam||""));}
function nexoraNormalizeMCQSerial(text){let n=0;return String(text||"").replace(/(^|\n)([ \t]*)(?:Q(?:uestion)?[ \t]*)?\d+[.)][ \t]+/gi,(m,a,b)=>{n++;return a+b+n+". ";});}
function nexoraRemoveNDAMains(text,exam){if(!nexoraIsNDAExam(exam))return String(text||"");return String(text||"").replace(/(?:^|\n)\s*(?:#{1,6}\s*)?(?:MAINS\s*\/\s*DESCRIPTIVE(?:\s+PRACTICE)?|MAINS\s+QUESTIONS?|DESCRIPTIVE\s+QUESTIONS?|ESSAY\s+QUESTIONS?)[\s\S]*?(?=\n\s*(?:#{1,6}\s*)?(?:LAST[- ]MINUTE|QUICK\s+REVISION|ONE[- ]PAGE|MEMORY\s+MAP|REVISION|$))/gi,"\n");}
const NEXORA_NDA_OBJECTIVE_ONLY_RULES="NDA OBJECTIVE ONLY: 15 MCQs, serial 1-15, NO MAINS/DESCRIPTIVE.";
async function generateChapterNotes(
  options = {}
) {
  const ctx =
    chapterContext(
      options
    );

  console.log(
    `NEXORA Short Notes: Class=${ctx.className || "-"} | Subject=${ctx.subject || "-"} | Book=${ctx.book || "-"} | Chapter=${ctx.chapterNumber || "-"} ${ctx.chapterTitle || ""} | Exam=${ctx.exam} | Language=${ctx.language}`
  );

  let sourceData = {
    results: [],
    sourceText: "",
    queries: []
  };

  /*
   * Chapter-locked source retrieval.
   */

  try {
    sourceData =
      await fetchChapterSource(
        options
      );
  } catch (
    error
  ) {
    console.error(
      "NEXORA source retrieval failed:",
      error?.message ||
        error
    );
  }

  let sourceText =
    removeWebNoise(
      options.sourceText ||
      sourceData.sourceText ||
      ""
    );

  /*
   * Chapter evidence check.
   */

  if (
    sourceText &&
    ctx.chapterTitle
  ) {
    const evidence =
      extractEvidence(
        sourceText,
        ctx,
        40
      );

    console.log(
      `NEXORA Chapter Evidence: ${evidence.length}`
    );
  }

  /*
   * Gemini.
   */

  if (ai) {
    try {
      console.log(
        "NEXORA Short Notes: Sending chapter-locked prompt to Gemini..."
      );

      const prompt =
        nexoraApplyTopperRequirements(buildChapterPrompt({
          ...options,
          sourceText
        })) + `

NEXORA UNIVERSAL TEXTBOOK VISUAL REQUIREMENT

For every concept that is naturally taught with a textbook diagram,
map, labelled figure, process chart, cycle, apparatus, structure,
timeline, graph or flow diagram, include a semantic NEXORA diagram
marker when relevant.

The visual must be ORIGINAL and educational, not a copied textbook image.

Use:
[[NEXORA_DIAGRAM:solar-system]]
[[NEXORA_DIAGRAM:earth-motions]]
[[NEXORA_DIAGRAM:latitude-longitude]]
[[NEXORA_DIAGRAM:earth-layers]]
[[NEXORA_DIAGRAM:water-cycle]]
[[NEXORA_DIAGRAM:food-chain]]
[[NEXORA_DIAGRAM:photosynthesis]]
[[NEXORA_DIAGRAM:cell]]
[[NEXORA_DIAGRAM:heart]]
[[NEXORA_DIAGRAM:digestive-system]]
[[NEXORA_DIAGRAM:respiratory-system]]
[[NEXORA_DIAGRAM:circulatory-system]]
[[NEXORA_DIAGRAM:volcano]]
[[NEXORA_DIAGRAM:atmosphere-layers]]
[[NEXORA_DIAGRAM:electric-circuit]]
[[NEXORA_DIAGRAM:light-rays]]
[[NEXORA_DIAGRAM:atomic-structure]]
[[NEXORA_DIAGRAM:chemical-reaction]]
[[NEXORA_DIAGRAM:geometry-figure]]
[[NEXORA_DIAGRAM:process-flow]]

Do not add unrelated visuals.
Every visual must directly teach the selected chapter concept.
`;

      const generated =
        await generateWithGemini(
          prompt
        );

      console.log(
        "NEXORA RAW GEMINI TEST:",
        JSON.stringify(
          String(generated || "").slice(0, 500)
        )
      );

      const cleaned =
        sanitizeGeminiOutput(
          generated
        );

      console.log(
        "NEXORA CLEANED GEMINI TEST:",
        JSON.stringify(
          String(cleaned || "").slice(0, 500)
        )
      );

      const strictGeminiUsable =
        geminiOutputIsUsable(
          cleaned,
          ctx
        );

      /*
       * NEXORA GEMINI RELAXED ACCEPTANCE
       *
       * If Gemini returned a long, chapter-specific response,
       * accept it even when its headings differ from the strict
       * validator vocabulary. This preserves chapter locking
       * while preventing valid Gemini notes from falling into the
       * tiny deterministic fallback.
       */
      const normalizedGemini =
        normalize(
          cleaned
        );

      const normalizedChapter =
        normalize(
          ctx.chapterTitle ||
          ctx.chapterHindi ||
          ""
        );

      const chapterWords =
        normalizedChapter
          .split(" ")
          .filter(
            word =>
              word.length >= 4
          );

      const chapterWordMatches =
        chapterWords.filter(
          word =>
            normalizedGemini.includes(
              word
            )
        ).length;

      const relaxedGeminiUsable =
        String(cleaned || "").trim().length >= 1000 &&
        chapterWords.length >= 2 &&
        chapterWordMatches >= Math.min(
          2,
          chapterWords.length
        ) &&
        !/^(error|failed|unable|cannot|i cannot|क्षमा|असमर्थ)/i.test(
          String(cleaned || "").trim()
        );

      if (
        strictGeminiUsable ||
        relaxedGeminiUsable
      ) {
        console.log(
          "NEXORA Short Notes: Gemini output accepted."
        );

        let finalGeminiContent = cleaned;

        /*
         * Remove duplicate NEXORA header / exam-notes metadata
         * generated by Gemini. The application header below is the
         * single authoritative header for the PDF.
         */
        finalGeminiContent =
          finalGeminiContent.replace(
            /^NEXORA SHORT NOTES\s*[—-].*$/gim,
            ""
          );

        finalGeminiContent =
          finalGeminiContent.replace(
            /^NEXORA EXAM NOTES:.*$/gim,
            ""
          );

        finalGeminiContent =
          finalGeminiContent.replace(
            /^कक्षा\s*:.+$/gim,
            ""
          );

        finalGeminiContent =
          finalGeminiContent.replace(
            /^विषय\s*:.+$/gim,
            ""
          );

        finalGeminiContent =
          finalGeminiContent.replace(
            /^अध्याय\s*:.+$/gim,
            ""
          );

        finalGeminiContent =
          finalGeminiContent.replace(
            /^लक्ष्य\s*:.+$/gim,
            ""
          );

        finalGeminiContent =
          finalGeminiContent.replace(
            /^भाषा\s*:.+$/gim,
            ""
          );

        /*
         * Remove the entire Authentic PYQs section.
         */
        finalGeminiContent =
          finalGeminiContent.replace(
            /(?:^|\n)\s*(?:\d+\.\s*)?AUTHENTIC PYQs[^\n]*\n[\s\S]*?(?=\n\s*(?:\d+\.\s*)?(?:MAINS|PRACTICE MCQs|IMPORTANT FACTS|QUICK REVISION|DETAILED NOTES|EXAM|CONCLUSION)\b|$)/i,
            "\n"
          );

        /*
         * Remove stray diagram-marker text if it was broken by
         * formatting. Valid markers are re-added by the application.
         */
        finalGeminiContent =
          finalGeminiContent.replace(
            /\[\[NEXORA\s*DIAGRAM\s*:\s*maps\]\]/gi,
            ""
          );

        /*
         * Remove any authentic-PYQ section Gemini may still return.
         */
        finalGeminiContent =
          finalGeminiContent.replace(
            /(?:^|\\n)\\s*(?:\\d+\\.\\s*)?AUTHENTIC\\s+PYQs(?:\\s*\\([^\\n]*\\))?\\s*\\n[\\s\\S]*?(?=\\n\\s*(?:\\d+\\.\\s*)?(?:PRACTICE|MAINS|QUICK REVISION|IMPORTANT FACTS|DETAILED NOTES|EXAM|CONCLUSION)\\b|$)/gi,
            "\\n"
          );

        /*
         * Remove alternate Hindi/English generated PYQ headings.
         */
        finalGeminiContent =
          finalGeminiContent.replace(
            /(?:^|\\n)\\s*(?:\\d+\\.\\s*)?(?:प्रामाणिक|प्रमाणित|सत्यापित).*?(?:PYQ|पूव[-\\s]?परीक्षा).*?(?:\\n[\\s\\S]*?(?=\\n\\s*(?:\\d+\\.\\s*)?(?:PRACTICE|MAINS|QUICK REVISION|IMPORTANT FACTS|DETAILED NOTES|EXAM|CONCLUSION)\\b|$))?/gi,
            "\\n"
          );

        /*
         * Gemini must not author visual/diagram prose.
         * NEXORA inserts only chapter-approved deterministic visuals.
         */

        /*
         * Remove common accidental Earth-layers visual leakage.
         * It is allowed only for the explicit Inside Our Earth chapter.
         */
        const chapterForVisualGuard =
          normalize(
            ctx.chapterTitle ||
            ctx.chapterHindi ||
            ""
          );

        const isInsideEarthChapter =
          chapterForVisualGuard.includes("inside our earth") ||
          chapterForVisualGuard.includes("inside the earth") ||
          chapterForVisualGuard.includes("पृथ्वी के अंदर") ||
          chapterForVisualGuard.includes("पृथ्वी की आंतरिक");

        if (!isInsideEarthChapter) {
          finalGeminiContent =
            finalGeminiContent.replace(
              /पृथ्वी की आंतरिक संरचना[\\s\\S]*?(?=\\n\\s*(?:\\d+[.)]\\s*)?(?:10|11|12|13)?\\.?\\s*(?:EXAM|PRACTICE|MAINS|QUICK REVISION|CONCLUSION)\\b|$)/gi,
              "\\n"
            );
        }

        /*
         * Always add the professional NEXORA header to Gemini output.
         */
        const header = `TITLE: NEXORA EXAM NOTES: ${ctx.chapterTitle || "Selected Chapter"}

Class/Level: ${ctx.className || "Not specified"}
Subject: ${ctx.subject || "Not specified"}
Exam/Target: ${ctx.exam || "General"} (Prelims & Mains)
Book: ${ctx.book || "Not specified"}
Language: ${ctx.language || "Hindi"} (with English technical terms)`;

        finalGeminiContent =
          `${header}

${finalGeminiContent}`;

        /*
         * Always append deterministic NEXORA visuals.
         * This ensures maps/diagrams are rendered as actual pictures
         * instead of depending on Gemini to preserve the marker.
         */
        const deterministicVisuals =
          createVisualStructure(
            sourceText,
            ctx
          );

        const visualMarkers =
          deterministicVisuals
            .map(
              visual => visual.marker
            )
            .filter(Boolean)
            .filter(
              marker =>
                !finalGeminiContent.includes(marker)
            );

        /*
         * Never allow Geography visuals to appear in another subject.
         */
        const selectedSubjectForVisual =
          normalize(ctx.subject || "");

        const selectedSubjectIsGeography =
          selectedSubjectForVisual.includes("geography") ||
          selectedSubjectForVisual.includes("भूगोल");

        const allowedVisualMarkers =
          selectedSubjectIsGeography
            ? visualMarkers
            : visualMarkers.filter(
                marker =>
                  ![
                    "[[NEXORA_DIAGRAM:maps]]",
                    "[[NEXORA_DIAGRAM:our-country-india]]",
                    "[[NEXORA_DIAGRAM:globe-latitudes-longitudes]]",
                    "[[NEXORA_DIAGRAM:inside-our-earth]]",
                    "[[NEXORA_DIAGRAM:india-climate-vegetation-wildlife]]",
                    "[[NEXORA_DIAGRAM:major-landforms-earth]]",
                    "[[NEXORA_DIAGRAM:major-domains-earth]]",
                    "[[NEXORA_DIAGRAM:motions-of-earth]]"
                  ].includes(marker)
              );

        if (allowedVisualMarkers.length) {
          finalGeminiContent += `

RELEVANT VISUALS

${allowedVisualMarkers.join("\n\n")}`;
        }

        /*
         * India Size and Location map is Geography-only.
         * Do not depend on Gemini to generate the visual marker.
         */
        const normalizedChapter =
          normalize(
            ctx.chapterTitle ||
            ctx.chapterHindi ||
            ""
          );

        const isIndiaSizeLocation =
          normalizedChapter.includes("india size and location") ||
          normalizedChapter.includes("size and location") ||
          normalizedChapter.includes("भारत का आकार और स्थिति") ||
          normalizedChapter.includes("भारत का आकार");

        if (
          selectedSubjectIsGeography &&
          isIndiaSizeLocation &&
          !finalGeminiContent.includes(
            "[[NEXORA_DIAGRAM:maps]]"
          )
        ) {
          finalGeminiContent += `

RELEVANT VISUALS

[[NEXORA_DIAGRAM:maps]]

भारत के आकार, स्थिति, अक्षांशीय एवं देशांतरीय विस्तार का रंगीन मानचित्र।`;
        }

        /*
         * FINAL SUBJECT SAFETY LOCK
         *
         * Gemini/source material can occasionally carry an unrelated
         * Geography visual or Geography-only marker into another subject.
         * Remove those markers and their known India-location visual block
         * from non-Geography output.
         *
         * Geography output is intentionally left untouched.
         */
        if (!selectedSubjectIsGeography) {
          const forbiddenGeographyMarkers = [
            "[[NEXORA_DIAGRAM:maps]]",
            "[[NEXORA_DIAGRAM:our-country-india]]",
            "[[NEXORA_DIAGRAM:globe-latitudes-longitudes]]",
            "[[NEXORA_DIAGRAM:inside-our-earth]]",
            "[[NEXORA_DIAGRAM:india-climate-vegetation-wildlife]]",
            "[[NEXORA_DIAGRAM:major-landforms-earth]]",
            "[[NEXORA_DIAGRAM:major-domains-earth]]",
            "[[NEXORA_DIAGRAM:motions-of-earth]]"
          ];

          for (const marker of forbiddenGeographyMarkers) {
            finalGeminiContent =
              finalGeminiContent.split(marker).join("");
          }

          finalGeminiContent =
            finalGeminiContent.replace(
              /भारत के आकार, स्थिति, अक्षांशीय एवं देशांतरीय विस्तार का रंगीन मानचित्र।/g,
              ""
            );

          finalGeminiContent =
            finalGeminiContent.replace(
              /भारत के आकार, स्थिति और विस्तार का रंगीन मानचित्र।/g,
              ""
            );

          finalGeminiContent =
            finalGeminiContent.replace(
              /भारत के प्रमुख भौतिक विभागों का रंगीन मानचित्र।/g,
              ""
            );
        }

        finalGeminiContent =
          ensureGeminiMainsAnswersMinimumLength(
            finalGeminiContent,
            sourceText,
            ctx
          );

        return {
          ...options,
          ...ctx,

          content:
            finalGeminiContent,

          text:
            cleaned,

          sourceText,

          sources:
            sourceData.results,

          generatedBy:
            "gemini",

          fallback:
            false
        };
      }

      console.warn(
        "NEXORA Short Notes: Gemini output rejected."
      );
    } catch (
      error
    ) {
      console.warn(
        "NEXORA Short Notes: Gemini unavailable:",
        error?.message ||
          error
      );

      /*
       * =========================================================
       * NEXORA FINAL AI FALLBACK
       *
       * Gemini unavailable/quota exhausted
       *              ↓
       * Local Ollama qwen2.5:3b
       *              ↓
       * Deterministic fallback only if Qwen also fails
       * =========================================================
       */

      console.log(
        "NEXORA AI: Gemini failed. Trying local Qwen 2.5:3b..."
      );

      try {
        const qwenContent =
          await nexoraGenerateWithQwenFinal(
            prompt
          );

        if (
          qwenContent &&
          String(qwenContent).trim().length >= 1000
        ) {
          let finalQwenContent =
            String(qwenContent).trim();

          finalQwenContent =
            finalQwenContent.replace(
              /\\[[]object Object\\]/gi,
              ""
            );

          finalQwenContent =
            finalQwenContent.replace(
              /SOURCE STATUS[\\s\\S]*?(?=CHAPTER OVERVIEW|NCERT CORE CONCEPTS|CORE CONCEPTS|DETAILED NOTES|MCQs|Mains|ONE-PAGE MEMORY MAP|$)/gi,
              ""
            );

          finalQwenContent =
            ensureGeminiMainsAnswersMinimumLength(
              finalQwenContent,
              sourceText,
              ctx
            );

          console.log(
            "NEXORA Short Notes: Qwen fallback accepted. Length:",
            finalQwenContent.length
          );

          return {
            ...options,
            ...ctx,

            content: nexoraFinalizeTopperNotes(finalQwenContent, ctx?.chapter || options?.chapter),

            text: nexoraFinalizeTopperNotes(finalQwenContent, ctx?.chapter || options?.chapter),

            sourceText,

            sources:
              sourceData.results,

            generatedBy:
              "ollama-qwen2.5:3b",

            fallback:
              true
          };
        }

        console.warn(
          "NEXORA Qwen output rejected: insufficient content."
        );

      } catch (
        qwenError
      ) {
        console.warn(
          "NEXORA Local Qwen failed:",
          qwenError?.message ||
            qwenError
        );
      }
    }
  }

  /*
   * Deterministic fallback.
   *
   * This is now the LAST fallback only.
   */

  console.log(
    "NEXORA Short Notes: Gemini + Qwen unavailable. Using deterministic fallback."
  );

  const fallback =
    renderFallback({
      ...options,
      sourceText
    });

  return {
    ...options,
    ...ctx,

    content:
      nexoraFinalizeTopperNotes(fallback, ctx?.chapter || options?.chapter),

    text:
      nexoraFinalizeTopperNotes(fallback, ctx?.chapter || options?.chapter),

    sourceText,

    sources:
      sourceData.results,

    generatedBy:
      "deterministic-fallback",

    fallback:
      true
  };
}


/* =========================================================
   BOOK GENERATOR
   ========================================================= */

async function generateBookNotes(
  options = {}
) {
  const chapters =
    Array.isArray(
      options.chapters
    )
      ? options.chapters
      : [];

  const results = [];

  for (
    const chapter of chapters
  ) {
    try {
      const result =
        await generateChapterNotes({
          ...options,
          chapter
        });

      results.push(
        result
      );
    } catch (
      error
    ) {
      console.error(
        "NEXORA book chapter generation failed:",
        error?.message ||
          error
      );

      results.push({
        ...options,
        chapter,

        content:
          renderFallback({
            ...options,
            chapter,
            sourceText:
              ""
          }),

        generatedBy:
          "error-fallback",

        fallback:
          true
      });
    }
  }

  return results;
}


/* =========================================================
   EXPORTS
   ========================================================= */



/* ============================================================
   NEXORA FINAL TOPPER OUTPUT CLEANER V2
   IMPORTANT:
   - Cleans generated TEXT only.
   - Does NOT remove PDF HTML structure globally.
   - Does NOT alter selected exam/class/book/chapter.
   ============================================================ */

function nexoraFinalTopperCleanText(value, chapterTitle = "") {
    let text = "";

    if (typeof value === "string") {
        text = value;
    } else if (value && typeof value === "object") {
        text =
            value.content ||
            value.text ||
            value.notes ||
            value.output ||
            "";
    }

    text = String(text || "");

    // Object leakage
    text = text.replace(/\[object Object\]/gi, "");

    // HTML tags that accidentally entered generated TEXT.
    text = text.replace(/<\/?(?:div|span|footer|section|article|p)\b[^>]*>/gi, "");

    // ONLY remove leaked NEXORA CSS class attributes.
    text = text.replace(
        /\bclass\s*=\s*["']?nexora-[\w-]+["']?/gi,
        ""
    );

    // Remove remaining literal HTML attribute fragments.
    text = text.replace(
        /\bclass\s*=\s*["'][^"']*["']/gi,
        ""
    );

    // Markdown emphasis should not appear in the final PDF text.
    text = text.replace(/\*\*/g, "");

    // Known broken memory-map fragments from previous templates.
    text = text.replace(
        /(?:footer|div|span)\s*["']?\s*>\s*/gi,
        " "
    );

    text = text.replace(
        /\bnexora-memory-(?:box|map|footer)\b/gi,
        ""
    );

    // Do not destroy mathematical arrows or normal > characters.
    // Only remove a > when it is clearly a leaked tag boundary.
    text = text.replace(
        /(^|\n)\s*>\s*(?=[A-Z][A-Za-z ]{1,30}(?:\n|$))/g,
        "$1"
    );

    // Clean accidental doubled whitespace.
    text = text.replace(/[ \t]{2,}/g, " ");
    text = text.replace(/\n[ \t]+/g, "\n");
    text = text.replace(/\n{3,}/g, "\n\n");

    // Remove empty lines around memory-map labels.
    text = text.replace(
        /\n\s*(?:CORE|CAUSE|CAUSE\s*→\s*EFFECT|EXAM|FOCUS|REVISION)\s*\n/gi,
        "\n$1\n"
    );

    return text.trim();
}

/* ============================================================
   FINAL MEMORY MAP
   Always chapter-specific, never HTML-derived.
   ============================================================ */




/* ============================================================
   NEXORA MASTER TOPPER FINAL TEXT ENGINE
   FINAL PDF TEXT PROTECTION
   ============================================================ */

function nexoraMasterCleanFinalText(value) {
    if (value === null || value === undefined) return "";

    let s = String(value);

    /* Remove replacement artifacts */
    s = s.replace(/\$[0-9]+/g, "");
    s = s.replace(/\$\{[^}]+\}/g, "");

    /* Remove HTML comments */
    s = s.replace(/<!--[\s\S]*?-->/g, "");

    /* Convert common HTML block tags into line breaks */
    s = s.replace(/<\s*br\s*\/?\s*>/gi, "\n");
    s = s.replace(/<\s*\/\s*(p|div|section|article|header|footer|li|tr|h[1-6])\s*>/gi, "\n");

    /* Remove complete opening/closing HTML tags */
    s = s.replace(/<[^>]+>/g, "");

    /* Decode common HTML entities */
    s = s
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'");

    /* Remove leaked class/id/style fragments */
    s = s.replace(/\bclass\s*=\s*["'][^"']*["']/gi, "");
    s = s.replace(/\bid\s*=\s*["'][^"']*["']/gi, "");
    s = s.replace(/\bstyle\s*=\s*["'][^"']*["']/gi, "");

    /* Remove markdown emphasis leakage */
    s = s.replace(/\*\*\s*/g, "");
    s = s.replace(/__\s*/g, "");

    /* Remove standalone HTML-ish leftovers */
    s = s.replace(/\b(?:div|span|footer|section|article)\s*class\s*=\s*/gi, "");
    s = s.replace(/\bclass\s*=\s*/gi, "");

    /* Clean accidental object leakage */
    s = s.replace(/\[object Object\]/gi, "");
    s = s.replace(/\bObject\s+Object\b/gi, "");

    /* Normalize whitespace */
    s = s.replace(/[ \t]+\n/g, "\n");
    s = s.replace(/\n[ \t]+/g, "\n");
    s = s.replace(/[ \t]{2,}/g, " ");
    s = s.replace(/\n{3,}/g, "\n\n");

    return s.trim();
}


/* ============================================================
   CLEAN MEMORY MAP
   PLAIN TEXT ONLY — NO HTML
   ============================================================ */

function nexoraBuildCleanMemoryMap(chapterTitle) {
    const title = nexoraMasterCleanFinalText(chapterTitle || "Selected Chapter");

    return [
        "",
        "ONE-PAGE MEMORY MAP",
        "",
        title,
        "",
        "CORE",
        "Concepts",
        "Definitions",
        "Key Terms",
        "",
        "CAUSE → EFFECT",
        "Causes",
        "Processes",
        "Effects",
        "",
        "EXAM FOCUS",
        "Facts",
        "Comparisons",
        "Key Points",
        "",
        "REVISION",
        "Dates",
        "Keywords",
        "Quick Recall",
        "",
        "NEXORA • Chapter-specific visual revision map",
        ""
    ].join("\n");
}


/* ============================================================
   FINAL TOPPER OUTPUT
   ============================================================ */

function nexoraFinalizeTopperNotes(value, chapterTitle = "") {
    let text = nexoraMasterCleanFinalText(value);

    const memoryMap =
        nexoraBuildCleanMemoryMap(chapterTitle);

    /*
      Remove any previously generated broken memory-map block.
      The final clean plain-text map is rebuilt below.
    */
    text = text.replace(
        /ONE[- ]?PAGE MEMORY MAP[\s\S]*?(?:NEXORA\s*[•·]\s*Chapter-specific visual revision map)?/gi,
        ""
    );

    text = text.replace(
        /NEXORA\s*•\s*Chapter-specific visual revision map/gi,
        ""
    );

    text = text.replace(/\n{3,}/g, "\n\n").trim();

    return text + "\n\n" + memoryMap;
}


module.exports = {
    nexoraFinalizeTopperNotes,
  buildChapterPrompt,
  generateChapterNotes,
  generateBookNotes,
  getExamProfile,
  fetchChapterSource,
  createVisualStructure,
  createEarthLayersVisual,
  createRockCycleVisual,
  renderFallback
};

/* NEXORA_FINAL_SHORT_NOTES_QUALITY_V23 */

/*
 * V23 responsibilities:
 * 1. Preserve exact selected metadata.
 * 2. Remove stale "Not specified" metadata.
 * 3. Remove obsolete SOURCE STATUS fallback blocks.
 * 4. Correct repeated numbering.
 * 5. Ensure a real chapter-specific ONE-PAGE MEMORY MAP marker.
 * 6. Never let an old chapter title leak into a new selection.
 * 7. Keep existing professional PDF renderer intact.
 */

function nexoraV23CleanText(value) {
    return String(value == null ? '' : value)
        .replace(/\r/g, '')
        .replace(/\u00a0/g, ' ')
        .trim();
}

function nexoraV23Value(options, keys, fallback = '') {
    for (const key of keys) {
        if (
            options &&
            options[key] !== undefined &&
            options[key] !== null &&
            String(options[key]).trim() !== ''
        ) {
            return String(options[key]).trim();
        }
    }

    return fallback;
}

function nexoraV23Metadata(options) {
    options = options || {};

    const selected = options.selection || options.context || {};

    const exam = nexoraV23Value(
        options,
        ['exam', 'examName', 'examTitle', 'target', 'examTarget'],
        nexoraV23Value(
            selected,
            ['exam', 'examName', 'examTitle', 'target'],
            ''
        )
    );

    const className = nexoraV23Value(
        options,
        ['className', 'class', 'classKey', 'classLevel', 'standard'],
        nexoraV23Value(
            selected,
            ['className', 'class', 'classKey', 'classLevel'],
            ''
        )
    );

    const subject = nexoraV23Value(
        options,
        ['subjectName', 'subject', 'subjectKey'],
        nexoraV23Value(
            selected,
            ['subjectName', 'subject', 'subjectKey'],
            ''
        )
    );

    const book = nexoraV23Value(
        options,
        ['bookTitle', 'bookName', 'book', 'bookId', 'bookKey'],
        nexoraV23Value(
            selected,
            ['bookTitle', 'bookName', 'book', 'bookId', 'bookKey'],
            ''
        )
    );

    const chapter = nexoraV23Value(
        options,
        [
            'chapterTitle',
            'chapterName',
            'chapter',
            'chapterId',
            'chapterKey'
        ],
        nexoraV23Value(
            selected,
            [
                'chapterTitle',
                'chapterName',
                'chapter',
                'chapterId',
                'chapterKey'
            ],
            ''
        )
    );

    const language = nexoraV23Value(
        options,
        ['language', 'lang', 'languageName'],
        nexoraV23Value(
            selected,
            ['language', 'lang', 'languageName'],
            ''
        )
    );

    return {
        exam,
        className,
        subject,
        book,
        chapter,
        language
    };
}

function nexoraV23RemoveSourceStatus(text) {
    if (!text) return '';

    let s = String(text);

    /*
     * Remove old source-status blocks which were intended only
     * as internal fallback diagnostics and should never appear
     * as the main chapter notes.
     */
    s = s.replace(
        /(^|\n)\s*SOURCE STATUS[\s\S]*?(?=\n\s*(?:CHAPTER OVERVIEW|NCERT CORE CONCEPTS|CORE CONCEPTS|DEFINITIONS|TERMS|DETAILED NOTES|1[\.\)]\s|ONE-PAGE MEMORY MAP|QUICK REVISION|AUTHENTIC PYQs|MCQs|MAINS|MODEL ANSWERS)\b)/gi,
        '$1'
    );

    s = s.replace(
        /Reliable chapter-specific live source retrieval was unavailable;[\s\S]{0,1200}?selected chapter remains:[\s\S]*?(?=\n\n|\n[A-Z][A-Z ]{4,}\n)/gi,
        ''
    );

    s = s.replace(
        /Chapter-specific live source retrieval was unavailable;[\s\S]{0,1600}?/gi,
        ''
    );

    s = s.replace(
        /The selected chapter remains:\s*Chapter\s*\d+\s*:\s*[^\n]+/gi,
        ''
    );

    return s;
}

function nexoraV23RemoveStaleMetadata(text) {
    if (!text) return '';

    let s = String(text);

    s = s.replace(
        /Class:\s*Not specified/gi,
        'Class:'
    );

    s = s.replace(
        /Subject:\s*Not specified/gi,
        'Subject:'
    );

    s = s.replace(
        /Book\/Course:\s*Not specified/gi,
        'Book/Course:'
    );

    s = s.replace(
        /Exam\/Target:\s*Not specified/gi,
        'Exam/Target:'
    );

    return s;
}

function nexoraV23FixMetadata(text, options) {
    const meta = nexoraV23Metadata(options);

    if (!text) return '';

    let s = nexoraV23RemoveSourceStatus(text);
    s = nexoraV23RemoveStaleMetadata(s);

    /*
     * Replace old metadata lines only when current selection
     * provides the corresponding value.
     */
    if (meta.className) {
        s = s.replace(
            /Class:\s*[^\n]*/i,
            'Class: ' + meta.className
        );
    }

    if (meta.subject) {
        s = s.replace(
            /Subject:\s*[^\n]*/i,
            'Subject: ' + meta.subject
        );
    }

    if (meta.book) {
        s = s.replace(
            /Book\/Course:\s*[^\n]*/i,
            'Book/Course: ' + meta.book
        );
    }

    if (meta.exam) {
        s = s.replace(
            /Exam\/Target:\s*[^\n]*/i,
            'Exam/Target: ' + meta.exam
        );
    }

    /*
     * Prevent stale chapter context from surviving.
     */
    if (meta.chapter) {
        s = s.replace(
            /(CHAPTER OVERVIEW\s+)(?:Chapter\s+\d+\s*:\s*)?[^\n]+/i,
            '$1' + meta.chapter
        );

        s = s.replace(
            /(selected chapter remains:\s*)(?:Chapter\s+\d+\s*:\s*)?[^\n]+/gi,
            '$1' + meta.chapter
        );
    }

    return s;
}

function nexoraV23RenumberLists(text) {
    if (!text) return '';

    const lines = String(text).split('\n');

    /*
     * We renumber only obvious ordered-list lines.
     * Bullets, headings, dates, formulas and chapter numbers
     * are intentionally left untouched.
     */
    let counter = 0;
    let inOrderedBlock = false;

    const out = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        const m = line.match(/^(\s*)\d+([.)])\s+(.+)$/);

        if (m) {
            const content = m[3].trim();

            /*
             * Don't alter chapter headings such as:
             * 1. The Revolt of 1857
             * 2. Nationalism in India
             * etc.
             */
            const looksLikeHeading =
                /^[A-Z][A-Za-z0-9 ,:'’&()\-–—]{3,120}$/.test(content) &&
                !/[.!?]$/.test(content);

            const previous = i > 0
                ? lines[i - 1].trim()
                : '';

            const isMajorHeading =
                /^(CHAPTER|SECTION|ONE-PAGE|QUICK REVISION|DETAILED NOTES|DEFINITIONS|TERMS|MCQ|MAINS|MODEL ANSWERS|CAUSES|EFFECTS|COMPARISON|CLASSIFICATION|PROCESS)/i
                    .test(previous);

            /*
             * Ordered content usually contains a sentence,
             * colon, comma, Hindi punctuation, or explanatory
             * text. Pure title lines remain untouched.
             */
            if (
                !looksLikeHeading ||
                /[:;,।?!]/.test(content) ||
                isMajorHeading
            ) {
                if (!inOrderedBlock) {
                    counter = 1;
                    inOrderedBlock = true;
                } else {
                    counter++;
                }

                line =
                    m[1] +
                    counter +
                    m[2] +
                    ' ' +
                    content;
            } else {
                inOrderedBlock = false;
                counter = 0;
            }
        } else if (/^\s*[-•●▪◦]\s+/.test(line)) {
            /*
             * Bullets do not reset the ordered sequence if they
             * belong to the same paragraph block.
             */
        } else if (!line.trim()) {
            /*
             * Blank lines normally delimit ordered blocks.
             */
            inOrderedBlock = false;
            counter = 0;
        } else {
            /*
             * A new heading/paragraph ends the previous ordered list.
             */
            if (
                /^[A-Z][A-Z0-9 \-:&()\/]{4,}$/.test(line.trim()) ||
                /^#{1,6}\s/.test(line.trim())
            ) {
                inOrderedBlock = false;
                counter = 0;
            }
        }

        out.push(line);
    }

    return out.join('\n');
}

function nexoraV23NormaliseMemoryMap(text, options) {
    if (!text) return '';

    const meta = nexoraV23Metadata(options);
    let s = String(text);

    /*
     * Remove duplicate old memory-map markers.
     */
    s = s.replace(
        /\[\[NEXORA_DIAGRAM:memory-map\]\]/gi,
        ''
    );

    s = s.replace(
        /\[\[NEXORA_DIAGRAM:one-page-memory-map\]\]/gi,
        ''
    );

    /*
     * Ensure exactly one chapter-specific visual marker.
     * The PDF layer will render this as a dedicated memory-map
     * visual instead of leaving it as raw text.
     */
    const marker =
        '[[NEXORA_DIAGRAM:memory-map|' +
        (meta.chapter || 'Selected Chapter') +
        ']]';

    const headingRegex =
        /(^|\n)\s*(?:6[\.\)]\s*)?ONE-PAGE MEMORY MAP[^\n]*/i;

    if (headingRegex.test(s)) {
        s = s.replace(
            headingRegex,
            function(match, prefix) {
                return prefix +
                    '6. ONE-PAGE MEMORY MAP' +
                    '\n' +
                    marker;
            }
        );
    } else {
        s +=
            '\n\n6. ONE-PAGE MEMORY MAP\n' +
            marker +
            '\n';
    }

    return s;
}

function nexoraV23QualityProcess(result, options) {
    if (!result) return result;

    const process = value => {
        let s = nexoraV23CleanText(value);

        s = nexoraV23FixMetadata(s, options);
        s = nexoraV23RenumberLists(s);
        s = nexoraV23NormaliseMemoryMap(s, options);

        /*
         * Final safety: selected chapter must not be replaced by
         * an old chapter title from a previous generation.
         */
        const meta = nexoraV23Metadata(options);

        if (meta.chapter) {
            const staleChapterPatterns = [
                /Chapter\s+4:\s+Geographical Setting/gi,
                /Chapter\s+4:\s+Geographical Setting/gi
            ];

            for (const pattern of staleChapterPatterns) {
                s = s.replace(pattern, meta.chapter);
            }
        }

        return s;
    };

    if (typeof result === 'string') {
        return process(result);
    }

    if (result.content !== undefined) {
        result.content = process(result.content);
    }

    if (result.text !== undefined) {
        result.text = process(result.text);
    }

    if (result.notes !== undefined) {
        result.notes = process(result.notes);
    }

    if (result.markdown !== undefined) {
        result.markdown = process(result.markdown);
    }

    /*
     * Keep metadata available to PDF layer even if older
     * generator code didn't provide it.
     */
    result.nexoraSelection = nexoraV23Metadata(options);

    return result;
}

/*
 * Wrap exported generateChapterNotes without replacing the
 * existing generation engine.
 */
if (
    typeof module !== 'undefined' &&
    module.exports &&
    typeof module.exports.generateChapterNotes === 'function' &&
    !module.exports.generateChapterNotes.__NEXORA_V23_WRAPPED
) {
    const nexoraOriginalGenerateChapterNotesV23 =
        module.exports.generateChapterNotes;

    const nexoraWrappedGenerateChapterNotesV23 =
        async function(options = {}) {
            const result =
                await nexoraOriginalGenerateChapterNotesV23(options);

            return nexoraV23QualityProcess(
                result,
                options
            );
        };

    nexoraWrappedGenerateChapterNotesV23.__NEXORA_V23_WRAPPED = true;

    module.exports.generateChapterNotes =
        nexoraWrappedGenerateChapterNotesV23;
}

/* END NEXORA_FINAL_SHORT_NOTES_QUALITY_V23 */



/* NEXORA_FINAL_MAINS_COMPLETENESS_V25 */
(function () {
    function nexoraV25Text(v) {
        return String(v == null ? "" : v)
            .replace(/\r/g, "")
            .replace(/[ \t]+\n/g, "\n")
            .replace(/\n{3,}/g, "\n\n")
            .trim();
    }

    function nexoraV25WordCount(text) {
        return nexoraV25Text(text)
            .split(/\s+/)
            .filter(Boolean)
            .length;
    }

    function nexoraV25IsMainsQuestion(line) {
        const t = nexoraV25Text(line);
        return /^(?:question\s*)?\d+[\.\):\-]\s*/i.test(t) ||
               /^प्रश्न\s*\d+[\.\):\-]\s*/i.test(t) ||
               /^Q(?:uestion)?\s*\d*[\.\):\-]/i.test(t);
    }

    function nexoraV25IsAnswerStart(line) {
        const t = nexoraV25Text(line);
        return /^(?:model\s+answer|answer|मॉडल\s*उत्तर|उत्तर|उत्तर\s*:)/i.test(t) ||
               /^प्रस्तावना\s*\(?introduction\)?/i.test(t);
    }

    /*
     * Do not invent fake PYQs or unrelated facts.
     * This recovery only prevents a genuinely truncated answer from
     * being silently presented as complete. When an answer is too short,
     * mark it for the existing generation/recovery pipeline instead of
     * manufacturing unsupported content.
     */
    function nexoraV25DetectIncompleteMains(text) {
        const lines = nexoraV25Text(text).split("\n");
        const problems = [];
        let current = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (nexoraV25IsMainsQuestion(line)) {
                if (current) {
                    current.words = nexoraV25WordCount(current.answer.join(" "));
                    if (current.words < 500) problems.push(current);
                }

                current = {
                    question: line,
                    answer: [],
                    line: i + 1,
                    words: 0
                };
                continue;
            }

            if (current) {
                current.answer.push(line);
            }
        }

        if (current) {
            current.words = nexoraV25WordCount(current.answer.join(" "));
            if (current.words < 500) problems.push(current);
        }

        return problems;
    }

    function nexoraV25NormalizeMainsText(text) {
        let out = nexoraV25Text(text);

        /*
         * Fix accidental memory-map object interpolation.
         */
        out = out
            .replace(/\[\[NEXORA_DIAGRAM:memory-map\s*\[object Object\]\]\]/gi,
                     "[[NEXORA_DIAGRAM:memory-map]]")
            .replace(/\[\[NEXORA_DIAGRAM:memory-map\s+Object\]\]/gi,
                     "[[NEXORA_DIAGRAM:memory-map]]");

        return out;
    }

    /*
     * Expose diagnostics to the existing generator/server without
     * replacing the working generation pipeline.
     */
    global.NEXORA_V25_MAINS_CHECK = nexoraV25DetectIncompleteMains;
    global.NEXORA_V25_NORMALIZE_MAINS = nexoraV25NormalizeMainsText;

    console.log("NEXORA FINAL MAINS COMPLETENESS V25: ACTIVE");
})();



/* =========================================================
   NEXORA_OBJECT_METADATA_MEMORY_FIX_V27
   Safe final-output normalization layer.
   Does NOT replace the existing generation pipeline.
   ========================================================= */

(function NEXORA_OBJECT_METADATA_MEMORY_FIX_V27() {

    function v27Text(value, fallback = "") {
        if (value === undefined || value === null) {
            return fallback;
        }

        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            const t = String(value).trim();
            return t || fallback;
        }

        if (Array.isArray(value)) {
            for (const item of value) {
                const t = v27Text(item, "");
                if (t) return t;
            }
            return fallback;
        }

        if (typeof value === "object") {
            const keys = [
                "titleEn",
                "title",
                "name",
                "label",
                "value",
                "text",
                "displayName",
                "bookTitle",
                "bookName",
                "chapterTitle",
                "chapterName",
                "subjectName",
                "className",
                "class",
                "examName",
                "exam",
                "id",
                "key"
            ];

            for (const key of keys) {
                if (Object.prototype.hasOwnProperty.call(value, key)) {
                    const t = v27Text(value[key], "");
                    if (t) return t;
                }
            }
        }

        return fallback;
    }

    function v27Find(obj, keys) {
        if (!obj || typeof obj !== "object") return "";

        for (const key of keys) {
            if (
                Object.prototype.hasOwnProperty.call(obj, key) &&
                obj[key] !== undefined &&
                obj[key] !== null
            ) {
                const t = v27Text(obj[key], "");
                if (t) return t;
            }
        }

        return "";
    }

    function v27Metadata(options) {
        const o = options || {};
        const selection =
            o.selection && typeof o.selection === "object"
                ? o.selection
                : {};

        const chapter =
            o.chapter && typeof o.chapter === "object"
                ? o.chapter
                : {};

        const book =
            o.book && typeof o.book === "object"
                ? o.book
                : {};

        const className =
            v27Find(o, [
                "className",
                "class",
                "classLevel",
                "level",
                "standard"
            ]) ||
            v27Find(selection, [
                "className",
                "class",
                "classLevel",
                "level",
                "standard"
            ]) ||
            v27Find(chapter, [
                "className",
                "class",
                "classLevel"
            ]) ||
            v27Find(book, [
                "className",
                "class",
                "classLevel"
            ]);

        const subject =
            v27Find(o, [
                "subjectName",
                "subject",
                "subjectKey"
            ]) ||
            v27Find(selection, [
                "subjectName",
                "subject",
                "subjectKey"
            ]) ||
            v27Find(chapter, [
                "subjectName",
                "subject",
                "subjectKey"
            ]) ||
            v27Find(book, [
                "subjectName",
                "subject",
                "subjectKey"
            ]);

        const bookTitle =
            v27Find(o, [
                "bookTitle",
                "bookName",
                "course"
            ]) ||
            v27Find(selection, [
                "bookTitle",
                "bookName",
                "course",
                "book"
            ]) ||
            v27Find(book, [
                "titleEn",
                "title",
                "name",
                "bookTitle",
                "bookName",
                "label"
            ]) ||
            v27Text(o.book, "");

        const chapterTitle =
            v27Find(o, [
                "chapterTitle",
                "chapterName",
                "topic"
            ]) ||
            v27Find(selection, [
                "chapterTitle",
                "chapterName",
                "topic",
                "chapter"
            ]) ||
            v27Find(chapter, [
                "titleEn",
                "title",
                "name",
                "chapterTitle",
                "chapterName",
                "en",
                "label"
            ]) ||
            v27Text(o.chapter, "");

        const exam =
            v27Find(o, [
                "exam",
                "examName",
                "examTitle",
                "targetExam",
                "target"
            ]) ||
            v27Find(selection, [
                "exam",
                "examName",
                "examTitle",
                "targetExam",
                "target"
            ]) ||
            v27Find(chapter, [
                "exam",
                "targetExam",
                "target"
            ]);

        const language =
            v27Find(o, [
                "language",
                "lang",
                "languageName"
            ]) ||
            v27Find(selection, [
                "language",
                "lang",
                "languageName"
            ]) ||
            "Hindi";

        return {
            className,
            subject,
            bookTitle,
            chapterTitle,
            exam: exam || "General",
            language
        };
    }

    function v27NormalizeOptions(options) {
        const o = {
            ...(options || {})
        };

        const meta = v27Metadata(o);

        if (meta.className) o.className = meta.className;
        if (meta.subject) o.subject = meta.subject;
        if (meta.bookTitle) o.bookTitle = meta.bookTitle;
        if (meta.chapterTitle) o.chapterTitle = meta.chapterTitle;
        if (meta.exam) o.exam = meta.exam;
        if (meta.language) o.language = meta.language;

        return o;
    }

    function v27CleanOutput(text, options) {
        const meta = v27Metadata(options);

        let s = String(text == null ? "" : text)
            .replace(/\r/g, "")
            .replace(/\u00a0/g, " ");

        /*
         * Never allow JavaScript object coercion to leak into PDF.
         */
        s = s.replace(/\[object Object\]/gi, "");

        /*
         * Remove obsolete source-status diagnostics.
         */
        s = s.replace(
            /(^|\n)\s*SOURCE STATUS\s*\n[\s\S]*?(?=\n\s*(?:CHAPTER OVERVIEW|NCERT CORE CONCEPTS|CORE CONCEPTS|DEFINITIONS|TERMS|DETAILED NOTES|EXAM FOCUS|PRELIMS|OBJECTIVE MCQS|MCQS|MAINS|DESCRIPTIVE QUESTIONS|MODEL ANSWERS|AUTHENTIC PYQS|LAST-MINUTE REVISION|ONE-PAGE MEMORY MAP)\b)/gi,
            "$1"
        );

        s = s.replace(
            /Chapter-specific live source retrieval was unavailable;[\s\S]*?(?=\n\s*(?:CHAPTER OVERVIEW|NCERT CORE CONCEPTS|CORE CONCEPTS|DEFINITIONS|TERMS|DETAILED NOTES|EXAM FOCUS|PRELIMS|OBJECTIVE MCQS|MCQS|MAINS|MODEL ANSWERS|AUTHENTIC PYQS|LAST-MINUTE REVISION|ONE-PAGE MEMORY MAP)\b)/gi,
            ""
        );

        /*
         * Repair metadata using the actual selected values.
         */
        if (meta.className) {
            s = s.replace(
                /Class:\s*[^\n]*/i,
                "Class: " + meta.className
            );
        }

        if (meta.subject) {
            s = s.replace(
                /Subject:\s*[^\n]*/i,
                "Subject: " + meta.subject
            );
        }

        if (meta.bookTitle) {
            s = s.replace(
                /Book\/Course:\s*[^\n]*/i,
                "Book/Course: " + meta.bookTitle
            );
        }

        if (meta.exam) {
            s = s.replace(
                /Exam\/Target:\s*[^\n]*/i,
                "Exam/Target: " + meta.exam
            );
        }

        /*
         * CHAPTER OVERVIEW must contain the selected chapter,
         * not an object representation.
         */
        if (meta.chapterTitle) {
            s = s.replace(
                /CHAPTER OVERVIEW[ \t]*\n?[^\n]*/i,
                "CHAPTER OVERVIEW\n" + meta.chapterTitle
            );
        }

        /*
         * Remove every malformed memory-map marker first.
         */
        s = s.replace(
            /\[\[NEXORA_DIAGRAM:memory-map[^\]]*\]\]/gi,
            ""
        );

        s = s.replace(
            /\[\[NEXORA_DIAGRAM:one-page-memory-map[^\]]*\]\]/gi,
            ""
        );

        /*
         * Add exactly one clean marker.
         * PDF layer will turn this into the actual visual map.
         */
        const marker =
            "[[NEXORA_DIAGRAM:memory-map" +
            (meta.chapterTitle
                ? "|" + meta.chapterTitle.replace(/[\[\]]/g, "")
                : "") +
            "]]";

        s = s.replace(
            /(?:^|\n)\s*(?:6[\.\)]\s*)?ONE-PAGE MEMORY MAP[^\n]*/i,
            "\n6. ONE-PAGE MEMORY MAP\n" + marker
        );

        if (!/\[\[NEXORA_DIAGRAM:memory-map(?:\|[^\]]+)?\]\]/i.test(s)) {
            s += "\n\n6. ONE-PAGE MEMORY MAP\n" + marker;
        }

        /*
         * Final whitespace cleanup.
         */
        s = s
            .replace(/\n{4,}/g, "\n\n\n")
            .trim();

        return s;
    }

    /*
     * Normalize options BEFORE the existing generator receives them.
     */
    if (
        typeof module !== "undefined" &&
        module.exports &&
        typeof module.exports.generateChapterNotes === "function" &&
        !module.exports.generateChapterNotes.__NEXORA_V27_WRAPPED
    ) {
        const originalGenerateChapterNotes =
            module.exports.generateChapterNotes;

        const wrappedGenerateChapterNotes = async function(options = {}) {
            const normalizedOptions =
                v27NormalizeOptions(options);

            const result =
                await originalGenerateChapterNotes(
                    normalizedOptions
                );

            if (result && typeof result === "object") {
                if (typeof result.content === "string") {
                    result.content =
                        v27CleanOutput(
                            result.content,
                            normalizedOptions
                        );
                }

                if (typeof result.text === "string") {
                    result.text =
                        v27CleanOutput(
                            result.text,
                            normalizedOptions
                        );
                }

                if (typeof result.notes === "string") {
                    result.notes =
                        v27CleanOutput(
                            result.notes,
                            normalizedOptions
                        );
                }

                return result;
            }

            return v27CleanOutput(
                result,
                normalizedOptions
            );
        };

        wrappedGenerateChapterNotes.__NEXORA_V27_WRAPPED = true;

        module.exports.generateChapterNotes =
            wrappedGenerateChapterNotes;

        global.NEXORA_V27_METADATA =
            v27Metadata;

        global.NEXORA_V27_NORMALIZE_OPTIONS =
            v27NormalizeOptions;

        global.NEXORA_V27_CLEAN_OUTPUT =
            v27CleanOutput;

        console.log(
            "NEXORA OBJECT + METADATA + MEMORY MAP V27: ACTIVE"
        );
    }

})();



/* NEXORA_UNIVERSAL_GENERATOR_INPUT_FINAL */

function nexoraUniversalGeneratorScalar(v) {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number") {
        return String(v).trim();
    }
    if (Array.isArray(v)) {
        return v.map(nexoraUniversalGeneratorScalar)
            .filter(Boolean)
            .join(", ");
    }
    if (typeof v === "object") {
        return nexoraUniversalGeneratorScalar(
            v.titleEn ||
            v.title ||
            v.name ||
            v.bookTitle ||
            v.bookName ||
            v.chapterTitle ||
            v.en ||
            v.id ||
            ""
        );
    }
    return String(v).trim();
}

global.nexoraUniversalGeneratorScalar =
    nexoraUniversalGeneratorScalar;

console.log(
    "NEXORA UNIVERSAL GENERATOR INPUT: ACTIVE"
);




/* NEXORA_200_PAGE_TOPPER_ENGINE_V1
   Universal long-form exam notes engine.
   Target: approximately 150-200 pages for sufficiently large chapters.
*/
const NEXORA_200_PAGE_TOPPER_INSTRUCTIONS = `
IMPORTANT NEXORA LONG-FORM TOPPER NOTES MODE:

Generate COMPLETE, chapter-specific, exam-oriented study notes for the EXACT
selected exam, class, subject, book and chapter.

The output must be substantially detailed. Target approximately 150-200 PDF
pages for a major chapter/book topic when the source material supports it.
Do NOT pad with meaningless repetition.

Include, where relevant:
1. Chapter overview
2. Exam relevance
3. Complete core concepts
4. Detailed explanation of every important subtopic
5. Definitions
6. Key terminology
7. Facts, dates, names, data and examples
8. Causes and background
9. Features/characteristics
10. Processes/mechanisms
11. Effects/impacts
12. Important comparisons
13. Tables
14. Case studies/examples
15. Maps/diagrams/flowcharts wherever relevant
16. Common mistakes and confusing concepts
17. Prelims/objective facts
18. At least 15 chapter-specific MCQs where the exam uses MCQs
19. MCQ answers with explanations
20. Authentic PYQs ONLY when verified source material exists.
21. Never invent or label AI-created questions as PYQs.
22. Mains/descriptive questions where applicable
23. Detailed model answers of approximately 500-700 words where appropriate
24. Subject-specific numerical/conceptual practice for Mathematics,
    Physics, Chemistry and other numerical subjects
25. Quick revision notes
26. One-page last-minute revision
27. Exam checklist

For UPSC/PSC/descriptive exams, emphasize analytical understanding,
cause-effect, examples, constitutional/legal/economic/geographical/
historical context as applicable and answer-writing value.

For JEE/NEET/GATE/other objective exams, emphasize formulas, concepts,
tricks, exceptions, numerical/application patterns and practice.

For school/college exams, preserve textbook/core concepts and explain them
clearly.

Use the EXACT selected chapter. Never silently replace it with another
chapter. Never fabricate a chapter or source.

Write enough substantive material to make the resulting PDF genuinely
comprehensive. Do not repeat paragraphs merely to reach a page count.
`;

global.NEXORA_200_PAGE_TOPPER_INSTRUCTIONS =
    NEXORA_200_PAGE_TOPPER_INSTRUCTIONS;



/* ============================================================
   NEXORA TOPIC LOCAL VISUAL RULE V2
   ============================================================ */

function nexoraTopicLocalVisualRule(){
  return [
    "NEXORA VISUAL PLACEMENT RULE:",
    "Do not collect all diagrams at the end of the notes.",
    "Place each required visual immediately below the topic",
    "or subtopic that the visual explains.",
    "First explain the topic, then insert its diagram marker,",
    "then add a short caption, then continue to the next topic.",
    "Only use chapter-relevant visuals.",
    "Geography maps/diagrams must remain Geography-specific.",
    "Do not insert unrelated visuals merely to fill space."
  ].join("\\n");
}

