const fs = require('fs');

const p = 'backend/server.js';
let s = fs.readFileSync(p, 'utf8');

const old = `const geminiResponse =
    await gemini.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
            temperature: 0.1,
            maxOutputTokens: 500
        }
    });`;

const neu = `let geminiResponse;

try {
    geminiResponse = await gemini.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
            temperature: 0.1,
            maxOutputTokens: 500
        }
    });
} catch (geminiError) {
    console.error(
        "Gemini failed, using Tavily fallback:",
        geminiError.message
    );

    const fallbackAnswer = sources.length
        ? sources.map((source, index) => {
            return (index + 1) + ". " + source.title + ": " + (source.content || "").trim();
        }).join("\\n\\n")
        : "NEXORA AI is temporarily unavailable. Please try again later.";

    return res.json({
        success: true,
        question: cleanQuestion,
        answer: fallbackAnswer,
        model: "tavily-fallback",
        languageMode: "automatic",
        sourceStatus: "web-grounded-fallback",
        sources: sources,
        sourceCount: sources.length,
        searchEngine: "Tavily"
    });
}`;

if (!s.includes(old)) {
    throw new Error("Target Gemini block not found");
}

s = s.replace(old, neu);
fs.writeFileSync(p, s);

console.log("Gemini fallback inserted successfully.");
