const express = require("express");
const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
const PDFDocument = require("pdfkit");
const puppeteer = require("puppeteer");
require("dotenv").config();

const { tavily } = require("@tavily/core");

const app = express();


// =================================
// NEXORA FRONTEND
// =================================

app.use(
    express.static(
        path.join(__dirname, "..")
    )
);


// =================================
// DATABASE
// =================================

const dbPath = path.join(
  __dirname,
  "..",
  "database",
  "nexora.db"
);

// Ensure database directory exists
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);


// =================================
// DATABASE TABLES INITIALIZATION
// =================================

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        bio TEXT DEFAULT '',
        avatar TEXT DEFAULT '',
        FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS search_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        query TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
`);

console.log("NEXORA Database tables initialized.");

// =================================
// USERS ANALYTICS MIGRATION
// =================================

try {
    const userColumns = db.prepare("PRAGMA table_info(users)").all();
    const hasCreatedAt = userColumns.some(column => column.name === "created_at");
    const hasIsAdmin = userColumns.some(column => column.name === "is_admin");

    if (!hasCreatedAt) {
        db.exec("ALTER TABLE users ADD COLUMN created_at DATETIME");
        console.log("NEXORA: users.created_at added.");
    }

    if (!hasIsAdmin) {
        db.exec("ALTER TABLE users ADD COLUMN is_admin INTEGER NOT NULL DEFAULT 0");
        console.log("NEXORA: users.is_admin added.");
    }
} catch (error) {
    console.error("NEXORA users migration error:", error);
}


console.log(
    "NEXORA Database connected:",
    dbPath
);


// =================================
// SERVER CONFIG
// =================================

const PORT = process.env.PORT || 5000;

const OLLAMA_URL =
    "http://localhost:11434/api/generate";

const OLLAMA_MODEL =
    "qwen2.5:3b";

console.log("GEMINI_API_KEY present:", !!process.env.GEMINI_API_KEY);

const gemini = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: { timeout: 60000 }
});

const GEMINI_MODEL =
    process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

// =================================
// SOURCE QUALITY ENGINE
// =================================

function classifySource(url) {

    try {

        const hostname =
            new URL(url).hostname.toLowerCase();

        const domain =
            hostname.replace(/^www\./, "");


        // Official
        if (
            domain.endsWith(".gov") ||
            domain.endsWith(".gov.in") ||
            domain.endsWith(".nic.in") ||
            domain.endsWith(".int")
        ) {

            return {
                type: "Official",
                quality: "High",
                qualityScore: 95
            };

        }


        // International Organizations
        if (
            domain.includes("who.int") ||
            domain.includes("un.org") ||
            domain.includes("worldbank.org") ||
            domain.includes("imf.org") ||
            domain.includes("unesco.org")
        ) {

            return {
                type: "International Organization",
                quality: "High",
                qualityScore: 96
            };

        }


        // Research
        if (
            domain.endsWith(".edu") ||
            domain.endsWith(".edu.in") ||
            domain.includes("nature.com") ||
            domain.includes("sciencedirect.com") ||
            domain.includes("springer.com") ||
            domain.includes("pubmed.ncbi.nlm.nih.gov") ||
            domain.includes("nih.gov") ||
            domain.includes("arxiv.org")
        ) {

            return {
                type: "Research",
                quality: "High",
                qualityScore: 92
            };

        }


        // Reference
        if (
            domain.includes("wikipedia.org") ||
            domain.includes("britannica.com")
        ) {

            return {
                type: "Reference",
                quality: "Good",
                qualityScore: 75
            };

        }


        // News
        if (
            domain.includes("reuters.com") ||
            domain.includes("bbc.com") ||
            domain.includes("apnews.com") ||
            domain.includes("theguardian.com") ||
            domain.includes("nytimes.com")
        ) {

            return {
                type: "News",
                quality: "High",
                qualityScore: 88
            };

        }


        // General Web
        return {
            type: "General Web",
            quality: "Medium",
            qualityScore: 55
        };


    } catch (error) {

        return {
            type: "Unknown",
            quality: "Low",
            qualityScore: 30
        };

    }

}


// =================================
// TAVILY
// =================================

const tvly = tavily({
    apiKey: process.env.TAVILY_API_KEY
});


// =================================
// MIDDLEWARE
// =================================

app.use(cors());

app.use(express.json());


// =================================
// HOME / BACKEND STATUS
// =================================

app.get("/", (req, res) => {

    res.json({

        success: true,

        message:
            "NEXORA Backend is running",

        services: {

            search:
                "Tavily Web Search",

            ai:
                "Ollama Local AI",

            database:
                "SQLite"

        }

    });

});


// =================================
// SOURCE INTELLIGENCE ENGINE v2
// =================================

function calculateAuthorityScore(url) {

    try {

        const hostname =
            new URL(url).hostname.toLowerCase();

        const domain =
            hostname.replace(/^www\./, "");

        if (
            domain.endsWith(".gov") ||
            domain.endsWith(".gov.in") ||
            domain.endsWith(".nic.in")
        ) {
            return 100;
        }

        if (
            domain.includes("who.int") ||
            domain.includes("un.org") ||
            domain.includes("worldbank.org") ||
            domain.includes("imf.org") ||
            domain.includes("unesco.org")
        ) {
            return 98;
        }

        if (
            domain.endsWith(".edu") ||
            domain.endsWith(".edu.in") ||
            domain.includes("nature.com") ||
            domain.includes("sciencedirect.com") ||
            domain.includes("springer.com") ||
            domain.includes("pubmed.ncbi.nlm.nih.gov") ||
            domain.includes("nih.gov") ||
            domain.includes("arxiv.org")
        ) {
            return 95;
        }

        if (
            domain.includes("reuters.com") ||
            domain.includes("bbc.com") ||
            domain.includes("apnews.com") ||
            domain.includes("theguardian.com") ||
            domain.includes("nytimes.com")
        ) {
            return 88;
        }

        if (
            domain.includes("wikipedia.org") ||
            domain.includes("britannica.com")
        ) {
            return 78;
        }

        if (
            domain.includes("instagram.com") ||
            domain.includes("facebook.com") ||
            domain.includes("x.com") ||
            domain.includes("twitter.com") ||
            domain.includes("tiktok.com")
        ) {
            return 25;
        }

        return 55;

    } catch (error) {

        return 30;

    }
}


// =================================
// FINAL EVIDENCE SCORE
// =================================

function calculateEvidenceScore(result, sourceInfo) {

    const relevance =
        typeof result.score === "number"
            ? result.score * 100
            : 50;

    const authority =
        calculateAuthorityScore(
            result.url || ""
        );

    const quality =
        sourceInfo.qualityScore;

    return Math.round(
        relevance * 0.40 +
        authority * 0.35 +
        quality * 0.25
    );
}


// =================================
// FORMAT + RANK SOURCES
// =================================

function formatSources(results) {

    const formattedSources =
        (results || [])

            .filter(
                result =>
                    result &&
                    result.url
            )

            .map((result) => {

                const sourceInfo =
                    classifySource(
                        result.url || ""
                    );

                const authorityScore =
                    calculateAuthorityScore(
                        result.url || ""
                    );

                const evidenceScore =
                    calculateEvidenceScore(
                        result,
                        sourceInfo
                    );

                return {

                    title:
                        result.title || "",

                    url:
                        result.url || "",

                    content:
                        (result.content || "")
                            .slice(0, 600),

                    relevanceScore:
                        result.score ?? null,

                    sourceType:
                        sourceInfo.type,

                    quality:
                        sourceInfo.quality,

                    qualityScore:
                        sourceInfo.qualityScore,

                    authorityScore:
                        authorityScore,

                    evidenceScore:
                        evidenceScore

                };

            });

    formattedSources.sort(
        (a, b) =>
            b.evidenceScore -
            a.evidenceScore
    );

    return formattedSources.slice(0, 3);

}


// =================================
// DATABASE STATUS
// =================================

app.get("/api/database", (req, res) => {

    try {

        const tables =
            db.prepare(`
                SELECT name
                FROM sqlite_master
                WHERE type='table'
                ORDER BY name
            `).all();


        res.json({

            success: true,

            database:
                "SQLite",

            status:
                "connected",

            tables:
                tables.map(
                    table => table.name
                )

        });


    } catch (error) {

        console.error(
            "Database Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Database connection failed.",

            error:
                error.message

        });

    }

});


// =================================
// SEARCH HISTORY
// =================================

function saveSearchHistory(
    userId,
    query
) {

    try {

        const statement =
            db.prepare(`
                INSERT INTO search_history
                (user_id, query)
                VALUES (?, ?)
            `);


        statement.run(
            userId || null,
            query
        );


    } catch (error) {

        console.error(
            "Search History Error:",
            error.message
        );

    }

}


// =================================
// SEARCH HISTORY API
// =================================

app.get(
    "/api/history",
    async (req, res) => {

        try {

            const userId =
                req.query.userId;

            let history;


            if (userId) {

                history =
                    db.prepare(`
                        SELECT
                            id,
                            user_id,
                            query,
                            created_at
                        FROM search_history
                        WHERE user_id = ?
                        ORDER BY id DESC
                        LIMIT 50
                    `).all(userId);

            } else {

                history =
                    db.prepare(`
                        SELECT
                            id,
                            user_id,
                            query,
                            created_at
                        FROM search_history
                        ORDER BY id DESC
                        LIMIT 50
                    `).all();

            }


            res.json({

                success: true,

                history:
                    history

            });


        } catch (error) {

            console.error(
                "History Error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Could not load search history.",

                error:
                    error.message

            });

        }

    }
);


// =================================
// SIGNUP API
// =================================

app.post(
    "/api/signup",
    async (req, res) => {

        try {

            const {
                name,
                email,
                password
            } = req.body;


            // Validation
            if (
                typeof name !== "string" ||
                typeof email !== "string" ||
                typeof password !== "string" ||
                !name.trim() ||
                !email.trim() ||
                !password
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Name, email and password are required."

                });

            }


            const cleanName =
                name.trim();

            const cleanEmail =
                email.trim().toLowerCase();


            // Existing user
            const existingUser =
                db.prepare(`
                    SELECT id
                    FROM users
                    WHERE email = ?
                `).get(cleanEmail);


            if (existingUser) {

                return res.status(409).json({

                    success: false,

                    message:
                        "Email already registered."

                });

            }


            // Hash password
            const passwordHash =
                await bcrypt.hash(
                    password,
                    10
                );


            // Create user
            const result =
                db.prepare(`
                    INSERT INTO users
                    (name, email, password, created_at)
                    VALUES (?, ?, ?, datetime('now'))
                `).run(
                    cleanName,
                    cleanEmail,
                    passwordHash
                );


            // Create profile
            db.prepare(`
                INSERT INTO profiles
                (user_id, bio, avatar)
                VALUES (?, ?, ?)
            `).run(
                result.lastInsertRowid,
                "",
                ""
            );


            return res.status(201).json({

                success: true,

                message:
                    "NEXORA account created successfully.",

                user: {

                    id:
                        result.lastInsertRowid,

                    name:
                        cleanName,

                    email:
                        cleanEmail

                }

            });


        } catch (error) {

            console.error(
                "Signup Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Signup failed.",

                error:
                    error.message

            });

        }

    }
);


// =================================
// LOGIN API
// =================================

app.post(
    "/api/login",
    async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;


            // Validation
            if (
                typeof email !== "string" ||
                typeof password !== "string" ||
                !email.trim() ||
                !password
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Email and password are required."

                });

            }


            const cleanEmail =
                email.trim().toLowerCase();


            // Find user
            const user =
                db.prepare(`
                    SELECT
                        id,
                        name,
                        email,
                        password
                    FROM users
                    WHERE email = ?
                `).get(cleanEmail);


            if (!user) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid email or password."

                });

            }


            // Compare password
            const passwordMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );


            if (!passwordMatch) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid email or password."

                });

            }


            return res.status(200).json({

                success: true,

                message:
                    "Login successful.",

                user: {

                    id:
                        user.id,

                    name:
                        user.name,

                    email:
                        user.email

                }

            });


        } catch (error) {

            console.error(
                "Login Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Login failed."

            });

        }

    }
);


// =================================
// SEARCH API
// =================================

app.get(
    "/api/search",
    async (req, res) => {

        try {

            const query =
                req.query.q;


            if (
                !query ||
                !query.trim()
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Search query is required"

                });

            }


            const cleanQuery =
                query.trim();


            console.log(
                "NEXORA Search:",
                cleanQuery
            );


            // Save search
            saveSearchHistory(
                req.query.userId || null,
                cleanQuery
            );


            // Tavily
            const searchStart = Date.now();
            const searchResponse =
                await tvly.search(
                    cleanQuery,
                    {
                        maxResults: 2,
                        searchDepth: "basic"
                    }
                );


            console.log("Tavily Search Time:", Date.now() - searchStart, "ms");
            const sources =
                formatSources(
                    searchResponse.results
                );


            return res.json({

                success: true,

                query:
                    cleanQuery,

                message:
                    "NEXORA Web Search completed.",

                sources:
                    sources,

                sourceCount:
                    sources.length,

                searchEngine:
                    "Tavily"

            });


        } catch (error) {

            console.error(
                "Search Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "NEXORA web search failed.",

                error:
                    error.message

            });

        }

    }
);


// =================================
// ASK NEXORA
// MULTILINGUAL AI
// TAVILY â†’ QWEN
// =================================

app.post(
    "/api/ask",
    async (req, res) => {

        try {

            const {
                question,
                userId

            } = req.body;

            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: "Please login to use NEXORA."
                });
            }


            // =================================
            // VALIDATION
            // =================================

            if (
                typeof question !== "string" ||
                !question.trim()
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please enter a valid question."

                });

            }


            const cleanQuestion =
                question.trim();


            console.log(
                "NEXORA Question:",
                cleanQuestion
            );


            // =================================
            // SAVE HISTORY
            // =================================

            saveSearchHistory(
                userId || null,
                cleanQuestion
            );


            // =================================
            // TAVILY WEB SEARCH
            // =================================

            console.log(
                "Searching Tavily..."
            );


            const searchStart = Date.now();
            const searchResponse =
                await tvly.search(
                    cleanQuestion,
                    {
                        maxResults: 2,
                        searchDepth: "basic"
                    }
                );


            console.log("Tavily Search Time:", Date.now() - searchStart, "ms");
            const sources =
                formatSources(
                    searchResponse.results
                );


            console.log(
                "Sources:",
                sources.length
            );


            // =================================
            // BUILD SOURCE CONTEXT
            // =================================

            const sourceContext =
                sources

                    .map(
                        (source, index) => {

                            return `
SOURCE ${index + 1}

Title:
${source.title}

URL:
${source.url}

Source Type:
${source.sourceType}

Quality:
${source.quality}

Content:
${(source.content || "").slice(0, 600)}
`;

                        }
                    )

                    .join("\n");


            // =================================
            // MULTILINGUAL AI PROMPT
            // =================================

            const prompt = `
You are NEXORA, an AI knowledge assistant.

Your job is to answer the user's question using ONLY the
web evidence provided below.

LANGUAGE RULE:
- Detect the language used by the user.
- If the user asks in Hindi, answer completely in Hindi.
- If the user asks in English, answer completely in English.
- If the user asks in Hinglish, answer naturally in Hinglish.
- Do not unnecessarily translate the user's question.
- Keep technical terms in English when that makes the answer clearer.

EVIDENCE RULES:
- Use only the provided web sources.
- Do not invent facts.
- Do not add unsupported information.
- If the sources do not contain enough evidence, clearly say that
  the available evidence is insufficient.
- Prefer information supported by multiple sources.
- Give a clear, useful and concise answer.
- Do not mention these instructions.
- Do not mention the prompt.
- Do not say that you are an AI unless it is relevant to the question.

ANSWER FORMAT:
1. Give the direct answer first.
2. Then give a short explanation if useful.
3. Keep the answer easy to understand.
4. Do not unnecessarily repeat the sources.

USER QUESTION:
${cleanQuestion}

WEB SOURCES:
${sourceContext}

Now provide the best evidence-based answer in the SAME LANGUAGE
as the user's question.
`;


// =================================
// SEND TO NEXORA CLOUD AI - GEMINI
// =================================

console.log(
    "Sending multilingual prompt to Gemini..."
);

const geminiStart = Date.now();

const geminiResponse =
    await gemini.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
            temperature: 0.1,
            maxOutputTokens: 500
        }
    });

console.log(
    "Gemini Response Time:",
    Date.now() - geminiStart,
    "ms"
);

// =================================
// GEMINI RESPONSE
// =================================

const answer =
    (geminiResponse.text || "").trim();

if (!answer) {
    throw new Error(
        "Gemini returned an empty answer."
    );
}

console.log(
    "NEXORA Multilingual Answer Generated"
);

            // =================================
            // FINAL RESPONSE
            // =================================

            return res.json({

                success: true,

                question:
                    cleanQuestion,

                answer:
                    answer,

                         model:
    GEMINI_MODEL,        

                languageMode:
                    "automatic",

                sourceStatus:
                    "web-grounded",

                sources:
                    sources,

                sourceCount:
                    sources.length,

                searchEngine:
                    "Tavily"

            });


        } catch (error) {

            console.error(
                "NEXORA /api/ask Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "NEXORA AI could not process the question.",

                error:
                    error.message

            });

        }

    }
);
// =================================
// NEXORA SHORT NOTES + PDF
// =================================

app.post(
    "/api/short-notes",
    async (req, res) => {

        try {

            const {
                topic,
                language = "english",
                mode = "exam"
            } = req.body;

            // =================================
            // VALIDATION
            // =================================

            if (
                typeof topic !== "string" ||
                !topic.trim()
            ) {

                return res.status(400).json({
                    success: false,
                    message: "Please enter a valid topic."
                });

            }

            const cleanTopic = topic.trim();
            // =================================
            // NOTES SCOPE DETECTION
            // =================================

            const topicLower = cleanTopic.toLowerCase();

                       const isCompleteBook =
                (
                    topicLower.includes("complete book") ||
                    topicLower.includes("complete ncert") ||
                    topicLower.includes("complete geography") ||
                    topicLower.includes("complete class") ||
                    topicLower.includes("complete syllabus") ||
                    topicLower.includes("complete course") ||
                    topicLower.includes("पूरी किताब") ||
                    topicLower.includes("पूरी पुस्तक") ||
                    topicLower.includes("सम्पूर्ण पुस्तक") ||
                    topicLower.includes("संपूर्ण पुस्तक") ||
                    topicLower.includes("पूरा भूगोल") ||
                    topicLower.includes("पूरी भूगोल") ||
                    topicLower.includes("पूरा पाठ्यक्रम") ||
                    topicLower.includes("संपूर्ण पाठ्यक्रम") ||
                    topicLower.includes("सम्पूर्ण पाठ्यक्रम") ||
                    topicLower.includes("all chapters") ||
                    topicLower.includes("all chapter")
                ) &&
                (
                    topicLower.includes("class 11") ||
                    topicLower.includes("class 11th") ||
                    topicLower.includes("11th") ||
                    topicLower.includes("geography") ||
                    topicLower.includes("भूगोल")
                );
            // =================================
            // LANGUAGE
            // =================================

            const selectedLanguage =
                language.toLowerCase() === "hindi"
                    ? "Hindi"
                    : "English";

            // =================================
            // NOTES MODE
            // =================================

            const notesMode =
                mode.toLowerCase() === "quick"
                    ? "Quick Revision"
                    : "Exam Notes";

            // =================================
            // GEMINI PROMPT
            // =================================
const notesScope = isCompleteBook
    ? "COMPLETE BOOK / FULL COURSE REQUEST"
    : "SINGLE TOPIC";

            const notesPrompt = `
You are NEXORA, an intelligent multi-domain learning and exam preparation platform.

USER REQUEST:
"${cleanTopic}"

SCOPE:
${notesScope}

LANGUAGE:
Write the complete notes in ${selectedLanguage}.

MODE:
${notesMode}

=========================================
TOPIC RELEVANCE RULE
=========================================

The user's requested topic is the PRIMARY subject of these notes.

Generate content specifically about:
"${cleanTopic}"

Do NOT introduce unrelated subjects, exams, books, chapters or domains.

Do NOT assume the topic is Geography, UPSC, NCERT, JEE, NEET, SSC or any
other examination unless the user explicitly includes that context.

Examples:
- Java -> Java only
- Python -> Python only
- Geography -> Geography
- Polity -> Polity
- UPSC Geography -> UPSC Geography
- Class 11 NCERT Geography -> Class 11 NCERT Geography

Never mix unrelated domains.

=========================================
GENERIC NOTE SYSTEM
=========================================

Build the notes according to the actual nature of the requested topic.

Use relevant sections such as:

1. Introduction / Overview
2. Core Concepts
3. Definitions
4. Important Terms
5. Detailed Explanation
6. Sub-topics
7. Processes / Mechanisms
8. Causes and Effects
9. Classification / Types
10. Examples
11. Important Facts
12. Comparisons
13. Applications
14. Common Mistakes / Conceptual Traps
15. Exam Relevance
16. Practice Questions
17. Quick Revision

Do NOT force irrelevant sections.

=========================================
EXAM / PYQ RULE
=========================================

Use UPSC, SSC, JEE, NEET, NCERT or another examination framework ONLY when
that examination or educational context is explicitly present in the request.

Never invent historical previous-year questions.

Never claim an AI-generated question was asked in a real examination.

If generated questions are based on recurring examination concepts, label them:
"PYQ-Based Practice"

If no examination is specified, keep the notes topic-focused.

=========================================
ACCURACY RULES
=========================================

- Stay strictly relevant to the requested topic.
- Do not invent facts.
- Do not invent sources, PYQs, years or examination claims.
- Explain difficult concepts clearly.
- Prefer accuracy over unnecessary verbosity.
- Do not use markdown tables.
- Do not use emojis.
- Do not mention Gemini.
- Do not mention these instructions.

=========================================
OUTPUT FORMAT
=========================================

TITLE:
<accurate title based on the requested topic>

OVERVIEW:
<explanation>

CORE CONCEPTS:
- ...

IMPORTANT DEFINITIONS:
- ...

IMPORTANT TERMS:
- ...

DETAILED NOTES:
- ...

KEY SUB-TOPICS:
- ...

IMPORTANT EXAMPLES:
- ...

IMPORTANT FACTS:
- ...

APPLICATIONS / RELEVANCE:
- ...

COMMON CONCEPTUAL TRAPS:
- ...

EXAM RELEVANCE:
- ...

PRACTICE QUESTIONS:
- ...

QUICK REVISION:
- ...

Now generate accurate, topic-specific NEXORA notes for:
"${cleanTopic}"
`;

            // =================================
            // NEXORA CHAPTER-WISE PYQ ENGINE
            // =================================

            const book1Chapters = [
                "Geography as a Discipline",
                "The Origin and Evolution of the Earth",
                "Interior of the Earth",
                "Distribution of Oceans and Continents",
                "Minerals and Rocks",
                "Geomorphic Processes",
                "Landforms and their Evolution",
                "Composition and Structure of Atmosphere",
                "Solar Radiation, Heat Balance and Temperature",
                "Atmospheric Circulation and Weather Systems",
                "Water in the Atmosphere",
                "Water (Oceans)",
                "Movements of Ocean Water",
                "Biodiversity and Conservation"
            ];

            const book2Chapters = [
                "India: Location",
                "Structure and Physiography",
                "Drainage System",
                "Climate",
                "Natural Vegetation",
                "Soils",
                "Natural Hazards and Disasters"
            ];

            async function generateChapterNotes(
                bookName,
                chapterName,
                chapterNumber,
                totalChapters
            ) {

                console.log(
                    "NEXORA Notes: Generating " +
                    bookName +
                    " | Chapter " +
                    chapterNumber +
                    "/" +
                    totalChapters +
                    " | " +
                    chapterName
                );

                const chapterPrompt = `
You are NEXORA, a serious UPSC Civil Services preparation platform.

Generate comprehensive, accurate, NCERT-grounded UPSC study notes
for ONE Class 11 NCERT Geography chapter.

USER REQUEST:
"${cleanTopic}"

BOOK:
${bookName}

CHAPTER:
${chapterName}

LANGUAGE:
${selectedLanguage}

MODE:
${notesMode}

==================================================
CORE RULE
==================================================

Base the chapter primarily on the official Class 11 NCERT Geography
content and its core concepts.

NCERT accuracy is more important than verbosity.

Do NOT write a generic internet article.

Do NOT invent NCERT facts.

Do NOT invent chapter names.

Do NOT invent historical UPSC PYQs.

Do NOT invent PYQ years.

Do NOT claim an original question was asked by UPSC.

If an exact authentic PYQ cannot be verified from available evidence,
write "PYQ Trend / Theme" instead.

Any newly created question MUST be labelled:

PYQ-Based Practice

==================================================
30-YEAR UPSC PYQ ORIENTATION
==================================================

Use approximately the last 30 years of UPSC question trends as a
QUALITATIVE prioritisation framework.

Do NOT invent numerical frequencies.

Use labels such as:

HIGH PRIORITY
MEDIUM PRIORITY
LOW PRIORITY
RECURRING THEME
FREQUENTLY RELEVANT
OCCASIONALLY TESTED

PYQ trends should determine:

- which concepts need deeper explanation
- which facts deserve special attention
- which concepts are common Prelims traps
- which concepts are useful for Mains
- which comparisons matter
- which processes repeatedly matter
- which cause-effect relationships matter
- which concepts are suitable for statement-based questions

==================================================
CHAPTER STRUCTURE
==================================================

CHAPTER ${chapterNumber}: ${chapterName}

CHAPTER OVERVIEW:
Explain what the chapter covers and why it matters for UPSC.

NCERT CORE CONCEPTS:
Cover the important concepts from the chapter.

IMPORTANT DEFINITIONS:
Give accurate and clear definitions.

IMPORTANT TERMS:
Explain important terminology.

DETAILED NOTES:
Explain the chapter thoroughly.
Follow the logical order of the NCERT chapter.
Do not reduce the chapter to a few bullets.

PROCESSES AND MECHANISMS:
Explain important geographical processes step-by-step.

CAUSES AND EFFECTS:
Explain important cause-effect relationships.

CLASSIFICATIONS:
Give important classifications and distinctions.

IMPORTANT EXAMPLES:
Use accurate NCERT-relevant examples.

IMPORTANT FACTS:
Include factual information useful for UPSC Prelims.

IMPORTANT COMPARISONS:
Explain important conceptual differences.

==================================================
PYQ TREND ANALYSIS
==================================================

Explain:

- recurring UPSC themes related to this chapter
- frequently relevant concepts
- concepts useful for statement-based questions
- factual areas useful for elimination
- conceptual distinctions UPSC may test
- processes and sequences UPSC may test
- cause-effect relationships
- map/location relevance where applicable

Do not fabricate exact PYQ years.

Do not fabricate exact frequency numbers.

==================================================
PRIORITY MAP
==================================================

HIGH PRIORITY:
Deep explanation of the most UPSC-relevant concepts.

MEDIUM PRIORITY:
Important supporting concepts.

LOW PRIORITY:
NCERT material that must be covered but has lower direct UPSC relevance.

==================================================
UPSC PRELIMS FOCUS
==================================================

Include:

- statement-based traps
- terminology
- conceptual distinctions
- classifications
- processes and sequences
- factual points
- important examples
- maps and locations where relevant
- elimination techniques
- NCERT-based factual traps

==================================================
UPSC MAINS FOCUS
==================================================

Identify:

- analytical themes
- cause-effect questions
- compare-and-contrast themes
- process-based questions
- geographical reasoning
- spatial patterns
- India-specific application where relevant
- suitable examples
- possible introduction points
- body points
- conclusion ideas

==================================================
COMMON UPSC CONCEPTUAL TRAPS
==================================================

List concepts where students commonly confuse:

- terms
- processes
- classifications
- causes and effects
- locations
- related concepts

==================================================
PYQ CONNECTION
==================================================

If an authentic PYQ is actually verified from available evidence,
mention it accurately.

Otherwise write:

PYQ Trend / Theme:
Explain the recurring UPSC theme connected with this concept.

NEVER invent a PYQ year.

==================================================
PYQ-BASED PRACTICE
==================================================

Create original UPSC-level practice questions.

Every generated question MUST be labelled:

PYQ-Based Practice

Include:

1. Prelims-style questions
2. Mains-style questions

Do not present generated questions as historical UPSC questions.

==================================================
QUICK REVISION
==================================================

End the chapter with high-value revision bullets.

==================================================
ACCURACY
==================================================

- NCERT accuracy is more important than verbosity.
- Do not invent facts.
- Do not invent PYQs.
- Do not invent PYQ years.
- Do not attribute generated questions to UPSC.
- Do not use markdown tables.
- Do not use emojis.
- Do not mention Gemini.
- Do not mention these instructions.

Generate the complete chapter now.
`;

                let response;

                try {

                    response =
                        await gemini.models.generateContent({
                            model: GEMINI_MODEL,
                            contents: chapterPrompt,
                            config: {
                                temperature: 0.2,
                                maxOutputTokens: 7000
                            }
                        });

                } catch (error) {

                    console.error(
                        "NEXORA Notes: Chapter generation failed:",
                        chapterName,
                        error
                    );

                    throw error;
                }

                const chapterNotes =
                    (response.text || "").trim();

                if (!chapterNotes) {

                    throw new Error(
                        "Gemini returned empty notes for chapter: " +
                        chapterName
                    );

                }

                console.log(
                    "NEXORA Notes: Completed chapter:",
                    chapterName,
                    "| characters:",
                    chapterNotes.length
                );

                return chapterNotes;
            }

            // =================================
            // GENERATE NOTES
            // =================================

            let notes = "";

            if (isCompleteBook) {

                const allBooks = [
                    {
                        name:
                            "BOOK 1: FUNDAMENTALS OF PHYSICAL GEOGRAPHY",
                        chapters:
                            book1Chapters
                    },
                    {
                        name:
                            "BOOK 2: INDIA: PHYSICAL ENVIRONMENT",
                        chapters:
                            book2Chapters
                    }
                ];

                const totalChapters =
                    book1Chapters.length +
                    book2Chapters.length;

                let globalChapterNumber = 0;

                notes =
                    "TITLE:\\n" +
                    "CLASS 11 NCERT GEOGRAPHY — UPSC PYQ-ORIENTED COMPREHENSIVE NOTES\\n\\n";

                for (const book of allBooks) {

                    notes +=
                        "\\n\\n=========================================\\n" +
                        book.name +
                        "\\n=========================================\\n\\n";

                    for (
                        let i = 0;
                        i < book.chapters.length;
                        i++
                    ) {

                        globalChapterNumber++;

                        const chapterNotes =
                            await generateChapterNotes(
                                book.name,
                                book.chapters[i],
                                globalChapterNumber,
                                totalChapters
                            );

                        notes +=
                            "\\n\\n" +
                            chapterNotes +
                            "\\n";

                    }
                }

                notes += `
                
=========================================
FINAL UPSC REVISION
=========================================

MOST IMPORTANT CONCEPTS:
Revise the highest-priority NCERT concepts from all chapters.

HIGH PRIORITY TOPICS:
Revise recurring UPSC themes and core concepts.

IMPORTANT FACTS:
Revise high-value NCERT facts and factual distinctions.

IMPORTANT COMPARISONS:
Revise major conceptual differences.

IMPORTANT KEYWORDS:
Revise important geographical terminology.

PRELIMS TRAPS:
Revise statement-based traps, classifications, processes and factual traps.

MAINS ANALYTICAL THEMES:
Revise major analytical, process-based and cause-effect themes.

RECURRING PYQ THEMES:
Revise the chapter-wise recurring UPSC themes.

FINAL QUICK REVISION:
Revise the complete syllabus through the chapter-wise priority map.
`;

            } else {

                
     const singleResponse =
    await gemini.models.generateContent({
        model: GEMINI_MODEL,
        contents: notesPrompt,
        config: {
            temperature: 0.2,
            maxOutputTokens:
                notesMode === "Quick Revision"
                    ? 2500
                    : 5000
        }
    });             
                notes =
                    (singleResponse.text || "").trim();

                if (!notes) {

                    throw new Error(
                        "Gemini returned empty short notes."
                    );

                }
            }


            // =================================
            // =================================
            // PDF - PUPPETEER
            // =================================

            const fontPath = path.join(
                __dirname,
                "fonts",
                "NotoSansDevanagari-Regular.ttf"
            );

            const fontBase64 =
                fs.readFileSync(fontPath).toString("base64");

            const escapeHtml = (value) =>
                String(value)
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#39;");

            const safeTopic =
                escapeHtml(cleanTopic);

                       const safeNotes = escapeHtml(notes)
                .replace(/^TITLE:\s*(.+)$/gm,
                    "<h1 class=\"note-title\">$1</h1>"
                )
                .replace(/^OVERVIEW:\s*$/gm,
                    "<h2>Overview</h2>"
                )
                .replace(/^KEY POINTS:\s*$/gm,
                    "<h2>Key Points</h2>"
                )
                .replace(/^IMPORTANT FACTS:\s*$/gm,
                    "<h2>Important Facts</h2>"
                )
                .replace(/^EXAM FOCUS:\s*$/gm,
                    "<h2>Exam Focus</h2>"
                )
                .replace(/^QUICK REVISION:\s*$/gm,
                    "<h2>Quick Revision</h2>"
                )
                .replace(/^###\s+(.+)$/gm,
                    "<h3>$1</h3>"
                )
                .replace(/^##\s+(.+)$/gm,
                    "<h2>$1</h2>"
                )
                .replace(/^#\s+(.+)$/gm,
                    "<h1>$1</h1>"
                )
                .replace(/\*\*(.+?)\*\*/g,
                    "<strong>$1</strong>"
                )
                .replace(/^- (.+)$/gm,
                    "<div class=\"bullet\">• $1</div>"
                )
                .replace(/^\* (.+)$/gm,
                    "<div class=\"bullet\">• $1</div>"
                )
                .replace(/^\d+\.\s+(.+)$/gm,
                    "<div class=\"numbered\">$1</div>"
                )
                .replace(/\r?\n\r?\n/g,
                    "<div class=\"paragraph-space\"></div>"
                )
                .replace(/\r?\n/g, "<br>");

            const browser =
                await puppeteer.launch({
                    headless: true
                });

            try {

                const page =
                    await browser.newPage();

                const html =
                    "<!DOCTYPE html>" +
                    "<html>" +
                    "<head>" +
                    "<meta charset=\"UTF-8\">" +
                    "<style>" +

                    "@font-face {" +
                    "font-family:'NEXORA-Devanagari';" +
                    "src:url(data:font/ttf;base64," +
                    fontBase64 +
                    ") format('truetype');" +
                    "}" +

                    "@page {" +
                    "size:A4;" +
                    "margin:18mm;" +
                    "}" +

                    "body {" +
                    "font-family:'NEXORA-Devanagari',Arial,sans-serif;" +
                    "font-size:12px;" +
                    "line-height:1.75;" +
                    "margin:0;" +
                    "color:#111;" +
                    "}" +

                    ".header {" +
                    "text-align:center;" +
                    "margin-bottom:28px;" +
                    "}" +

                    ".header h1 {" +
                    "font-size:22px;" +
                    "margin:0 0 12px 0;" +
                    "}" +

                    ".topic {" +
                    "font-size:15px;" +
                    "margin-bottom:8px;" +
                    "}" +

                    ".meta {" +
                    "font-size:10px;" +
                    "}" +

                                    ".notes {" +
                    "font-size:12px;" +
                    "line-height:1.75;" +
                    "}" +

                    ".note-title {" +
                    "font-size:20px;" +
                    "text-align:center;" +
                    "margin:0 0 24px 0;" +
                    "}" +

                    ".notes h1 {" +
                    "font-size:20px;" +
                    "margin:18px 0 10px 0;" +
                    "page-break-after:avoid;" +
                    "}" +

                    ".notes h2 {" +
                    "font-size:16px;" +
                    "margin:18px 0 8px 0;" +
                    "page-break-after:avoid;" +
                    "}" +

                    ".notes h3 {" +
                    "font-size:14px;" +
                    "margin:14px 0 6px 0;" +
                    "page-break-after:avoid;" +
                    "}" +

                    ".bullet {" +
                    "margin:4px 0 4px 10px;" +
                    "padding-left:8px;" +
                    "page-break-inside:avoid;" +
                    "}" +

                    ".numbered {" +
                    "margin:4px 0 4px 20px;" +
                    "page-break-inside:avoid;" +
                    "}" +

                    ".paragraph-space {" +
                    "height:8px;" +
                    "}" +   

                    ".footer {" +
                    "margin-top:28px;" +
                    "text-align:center;" +
                    "font-size:9px;" +
                    "}" +

                    "</style>" +
                    "</head>" +

                    "<body>" +

                    "<div class=\"header\">" +
                    "<h1>NEXORA Short Notes</h1>" +
                    "<div class=\"topic\">" +
                    safeTopic +
                    "</div>" +
                    "<div class=\"meta\">" +
                    "Language: " +
                    escapeHtml(selectedLanguage) +
                    " &nbsp; | &nbsp; Mode: " +
                    escapeHtml(notesMode) +
                    "</div>" +
                    "</div>" +

                    "<div class=\"notes\">" +
                    safeNotes +
                    "</div>" +

                    "<div class=\"footer\">" +
                    "Generated by NEXORA" +
                    "</div>" +

                    "</body>" +
                    "</html>";

                     await page.setContent(
    html,
    { waitUntil: "load" }
);

                await page.evaluate(async () => {
                    await document.fonts.ready;
                });

await page.evaluate(async () => {
    await document.fonts.ready;
}); 

                console.log("NEXORA PDF: Starting PDF generation");
                const pdfBuffer =
                    await page.pdf({
                        format: "A4",
                        printBackground: true,
                        margin: {
                            top: "18mm",
                            right: "18mm",
                            bottom: "18mm",
                            left: "18mm"
                        }
                    });
                console.log("NEXORA PDF: PDF buffer created:", pdfBuffer.length, "bytes");

                res.setHeader(
                    "Content-Type",
                    "application/pdf"
                );

                res.setHeader(
                    "Content-Disposition",
                    "attachment; filename=\"NEXORA-" +
                    cleanTopic
                        .replace(/[^a-z0-9]+/gi, "-")
                        .replace(/^-+|-+$/g, "")
                        .slice(0, 80) +
                    "-" +
                    selectedLanguage +
                    ".pdf\""
                );

                return res.send(Buffer.from(pdfBuffer));

            } finally {

                await browser.close();

            }


        } catch (error) {

            console.error(
                "NEXORA /api/short-notes Error:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "NEXORA could not generate the short notes PDF.",
                error:
                    error.message
            });

        }

    }
);
// =================================
async function translatePYQToHindi(question) {
    const prompt = `
Translate this PYQ into natural, accurate Hindi.
Keep the meaning, facts, numbering, and answer choices unchanged.
Return ONLY valid JSON in this exact format:
{"question":"","options":[],"answer":"","explanation":""}

QUESTION:
${question.question || ""}

OPTIONS:
${JSON.stringify(question.options || [])}

ANSWER:
${question.answer || ""}

EXPLANATION:
${question.explanation || ""}
`;

    const response = await gemini.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
            temperature: 0.1,
            maxOutputTokens: 1500
        }
    });

    let text = (response.text || "").trim();
    text = text.replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();

    return JSON.parse(text);
}

// NEXORA PYQ API
// =================================

app.get(
    "/api/pyq",
    async (req, res) => {

        try {

            const subject =
                String(req.query.subject || "geography")
                    .trim()
                    .toLowerCase();

            const exam =
                String(req.query.exam || "upsc")
                    .trim()
                    .toLowerCase();

            const type =
                String(req.query.type || "")
                    .trim()
                    .toLowerCase();

            const language =
                String(req.query.language || "bilingual")
                    .trim()
                    .toLowerCase();

            const year =
                String(req.query.year || "")
                    .trim();

            const topic =
                String(req.query.topic || "")
                    .trim()
                    .toLowerCase();

            const limit =
                Math.min(
                    Math.max(
                        parseInt(req.query.limit || "50", 10),
                        1
                    ),
                    100
                );

            if (!/^[a-z0-9-]+$/.test(subject)) {

                return res.status(400).json({
                    success: false,
                    message: "Invalid PYQ subject."
                });

            }

            const safeExam =
                exam.replace(/[^a-z0-9-]/g, "");

            const safeSubject =
                subject.replace(/[^a-z0-9-]/g, "");

            const genericFilePath =
                path.join(
                    __dirname,
                    "data",
                    "pyq",
                    safeExam,
                    safeSubject + ".json"
                );

            const legacyFilePath =
                path.join(
                    __dirname,
                    "data",
                    "pyq",
                    safeSubject + ".json"
                );

            const filePath =
                fs.existsSync(genericFilePath)
                    ? genericFilePath
                    : (exam === "upsc" && fs.existsSync(legacyFilePath)
                        ? legacyFilePath
                        : genericFilePath);

            if (!fs.existsSync(filePath)) {

                return res.json({
                    success: true,
                    subject: subject,
                    exam: exam,
                    type: type || null,
                    total: 0,
                    questions: [],
                    message:
                        "PYQ dataset for this subject is not added yet."
                });

            }

            const dataset =
                JSON.parse(
                    fs.readFileSync(
                        filePath,
                        "utf8"
                    )
                );

            let questions =
                Array.isArray(dataset.questions)
                    ? dataset.questions
                    : [];

            if (type) {

                questions =
                    questions.filter(
                        q =>
                            String(q.type || "")
                                .toLowerCase() === type
                    );

            }

            if (year) {

                questions =
                    questions.filter(
                        q =>
                            String(q.year || "") === year
                    );

            }

            if (topic) {

                questions =
                    questions.filter(q => {

                        const qTopic =
                            String(q.topic || "")
                                .toLowerCase();

                        const qTags =
                            Array.isArray(q.tags)
                                ? q.tags.join(" ").toLowerCase()
                                : "";

                        return (
                            qTopic.includes(topic) ||
                            qTags.includes(topic)
                        );

                    });

            }

            questions =
                questions.slice(0, limit);

            if (language === "hindi" || language === "bilingual") {
                questions = await Promise.all(questions.map(async (q) => {
                    try {
                        const translated = await translatePYQToHindi(q);
                        return { ...q, question_hi: translated.question || "", options_hi: translated.options || [], answer_hi: translated.answer || "", explanation_hi: translated.explanation || "" };
                    } catch (e) {
                        console.error("PYQ Hindi Translation Error:", e.message);
                        return { ...q, question_hi: "", options_hi: [], answer_hi: "", explanation_hi: "" };
                    }
                }));
            }

            return res.json({

                success: true,

                subject:
                    dataset.subject || subject,

                exam:
                    dataset.exam || exam,

                type:
                    type || null,

                language:
                    language,

                year:
                    year || null,

                topic:
                    topic || null,

                total:
                    questions.length,

                questions

            });

        } catch (error) {

            console.error(
                "NEXORA /api/pyq Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "NEXORA could not load PYQ data.",

                error:
                    error.message

            });

        }

    }
);

// =================================
// BEST VIDEO SEARCH
// =================================

// =================================
// BEST VIDEO SEARCH
// =================================

app.get(
    "/api/video",
    async (req, res) => {
        try {
            const query = req.query.q;

            if (!query || !query.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Video search query is required."
                });
            }

            const cleanQuery = query.trim();

            console.log(
                "NEXORA Video Search:",
                cleanQuery
            );

            const videoSearchResponse =
                await tvly.search(
                    `site:youtube.com/watch ${cleanQuery} tutorial`,
                    {
                        maxResults: 10,
                        searchDepth: "advanced"
                    }
                );

            const videoResults =
                (videoSearchResponse.results || [])
                    .filter(result => {
                        if (!result.url) return false;

                        const url =
                            result.url.toLowerCase();

                        return (
                            url.includes("youtube.com/watch?v=") ||
                            url.includes("youtube.com/shorts/") ||
                            url.includes("youtu.be/")
                        );
                    });

            const bestVideo =
                videoResults.length > 0
                    ? videoResults[0]
                    : null;

            if (bestVideo) {
                return res.json({
                    success: true,
                    query: cleanQuery,
                    video: {
                        title: bestVideo.title,
                        url: bestVideo.url,
                        content: bestVideo.content || ""
                    },
                    message: "Best relevant YouTube video found.",
                    searchEngine: "Tavily"
                });
            }

            const youtubeSearchUrl =
                "https://www.youtube.com/results?search_query=" +
                encodeURIComponent(cleanQuery + " tutorial");

            return res.json({
                success: true,
                query: cleanQuery,
                video: {
                    title: cleanQuery + " — YouTube Videos",
                    url: youtubeSearchUrl,
                    content: "Relevant YouTube videos for this topic."
                },
                message: "YouTube search results available.",
                searchEngine: "YouTube fallback"
            });

        } catch (error) {
            console.error(
                "Video Search Error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "NEXORA video search failed.",
                error: error.message
            });
        }
    }
);


// =================================
// VERIFY API
// =================================
app.post(
    "/api/verify",
    async (req, res) => {

        try {

            const {
                claim
            } = req.body;


            if (
                typeof claim !== "string" ||
                !claim.trim()
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please enter a claim to verify."

                });

            }


            const cleanClaim =
                claim.trim();


            console.log(
                "NEXORA Verification:",
                cleanClaim
            );


            // Search
            const searchStart = Date.now();
            const searchResponse =
                await tvly.search(
                    cleanClaim,
                    {
                        maxResults: 2,
                        searchDepth: "basic"
                    }
                );


            console.log("Tavily Search Time:", Date.now() - searchStart, "ms");
            const sources =
                formatSources(
                    searchResponse.results
                );


            if (
                sources.length === 0
            ) {

                return res.json({

                    success: true,

                    claim:
                        cleanClaim,

                    status:
                        "Needs Review",

                    confidence:
                        "Low",

                    averageSourceQuality:
                        0,

                    verification:
                        "NEXORA could not find enough sources.",

                    sources:
                        [],

                    sourceCount:
                        0,

                    searchEngine:
                        "Tavily",

                    model:
                        OLLAMA_MODEL

                });

            }


            // Evidence
            const evidence =
                sources

                    .map(
                        (source, index) => {

                            return `
SOURCE ${index + 1}

Title:
${source.title}

URL:
${source.url}

Quality:
${source.quality}

Content:
${(source.content || "").slice(0, 600)}
`;

                        }
                    )

                    .join("\n");


            // Verification prompt
            const verificationPrompt = `
You are NEXORA's verification assistant.

Evaluate the claim using only the evidence below.

CLAIM:
${cleanClaim}

EVIDENCE:
${evidence}

Determine whether the evidence is:

Supported
Contradicted
Insufficient

Return exactly:

STATUS: Supported
SUMMARY: short explanation
EVIDENCE: short evidence summary
`;


           // =================================
// SEND VERIFICATION TO GEMINI
// =================================

console.log(
    "Sending verification prompt to Gemini..."
);

const geminiStart = Date.now();

const geminiResponse =
    await gemini.models.generateContent({
        model: GEMINI_MODEL,
        contents: verificationPrompt,
        config: {
            temperature: 0.1,
            maxOutputTokens: 250
        }
    });

console.log(
    "Gemini Verification Response Time:",
    Date.now() - geminiStart,
    "ms"
);

// =================================
// GEMINI RESPONSE
// =================================

const verification =
    (geminiResponse.text || "").trim();

if (!verification) {
    throw new Error(
        "Gemini returned an empty verification."
    );
}


            // Status
            let status =
                "Needs Review";


            const lower =
                verification.toLowerCase();


            if (
                lower.includes(
                    "status: supported"
                )
            ) {

                status =
                    "Supported";

            }

            else if (
                lower.includes(
                    "status: contradicted"
                )
            ) {

                status =
                    "Contradicted";

            }

            else if (
                lower.includes(
                    "status: insufficient"
                )
            ) {

                status =
                    "Needs Review";

            }


            // Quality
            const averageQuality =
                sources.reduce(
                    (total, source) =>
                        total +
                        source.qualityScore,
                    0
                ) / sources.length;


            let confidence =
                "Medium";


            if (
                averageQuality >= 85 &&
                sources.length >= 3
            ) {

                confidence =
                    "High";

            }

            else if (
                averageQuality < 60
            ) {

                confidence =
                    "Low";

            }


            return res.json({

                success: true,

                claim:
                    cleanClaim,

                status:
                    status,

                confidence:
                    confidence,

                averageSourceQuality:
                    Math.round(
                        averageQuality
                    ),

                verification:
                    verification,

                sources:
                    sources,

                sourceCount:
                    sources.length,

                searchEngine:
                    "Tavily",

                   model:
    GEMINI_MODEL  

            });           
    


        } catch (error) {

            console.error(
                "Verification Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "NEXORA verification failed.",

                error:
                    error.message

            });

        }

    }
);


// =================================
// GRACEFUL SHUTDOWN
// =================================

process.on(
    "SIGINT",
    () => {

        console.log(
            "Closing NEXORA database..."
        );

        db.close();

        process.exit(0);

    }
);


process.on(
    "SIGTERM",
    () => {

        console.log(
            "Closing NEXORA database..."
        );

        db.close();

        process.exit(0);

    }
);
// =================================
// NEXORA ADMIN ANALYTICS
// =================================

app.get("/api/admin/analytics", (req, res) => {
    try {

        const totalUsers = db
            .prepare(`
                SELECT COUNT(*) AS count
                FROM users
            `)
            .get().count;

        const todayUsers = db
            .prepare(`
                SELECT COUNT(*) AS count
                FROM users
                WHERE date(created_at) = date('now')
            `)
            .get().count;

        const yesterdayUsers = db
            .prepare(`
                SELECT COUNT(*) AS count
                FROM users
                WHERE date(created_at) = date('now', '-1 day')
            `)
            .get().count;

        const last7Days = db
            .prepare(`
                SELECT COUNT(*) AS count
                FROM users
                WHERE datetime(created_at) >= datetime('now', '-7 days')
            `)
            .get().count;

        const last30Days = db
            .prepare(`
                SELECT COUNT(*) AS count
                FROM users
                WHERE datetime(created_at) >= datetime('now', '-30 days')
            `)
            .get().count;

        const dailyUsers = db
            .prepare(`
                SELECT
                    date(created_at) AS date,
                    COUNT(*) AS users
                FROM users
                WHERE created_at IS NOT NULL
                GROUP BY date(created_at)
                ORDER BY date DESC
                LIMIT 30
            `)
            .all();

        res.json({
            success: true,
            analytics: {
                total_users: totalUsers,
                today_users: todayUsers,
                yesterday_users: yesterdayUsers,
                last_7_days: last7Days,
                last_30_days: last30Days,
                daily_users: dailyUsers
            }
        });

    } catch (error) {

        console.error(
            "NEXORA Analytics Error:",
            error
        );

        res.status(500).json({
            success: false,
            error: "Analytics unavailable"
        });

    }
});

// =================================
// START SERVER
// =================================
/* =================================
   NEXORA TEST SERIES API
================================= */

app.get("/api/test-series", (req, res) => {
    try {
        const subject = String(req.query.subject || "geography").trim().toLowerCase();
        const exam = String(req.query.exam || "upsc").trim().toLowerCase();
        const type = String(req.query.type || "prelims").trim().toLowerCase();
        const language = String(req.query.language || "bilingual").trim().toLowerCase();
        const topic = String(req.query.topic || "").trim().toLowerCase();
        const year = String(req.query.year || "").trim();
        const count = Math.min(Math.max(parseInt(req.query.count || "10", 10), 1), 50);

        if (!/^[a-z0-9-]+$/.test(subject)) {
            return res.status(400).json({
                success: false,
                message: "Invalid test subject."
            });
        }

        const safeExam = exam.replace(/[^a-z0-9-]/g, "");
        const safeSubject = subject.replace(/[^a-z0-9-]/g, "");

        const genericFilePath = path.join(
            __dirname, "data", "pyq", safeExam, safeSubject + ".json"
        );

        const legacyFilePath = path.join(
            __dirname, "data", "pyq", safeSubject + ".json"
        );

        const filePath = fs.existsSync(genericFilePath)
            ? genericFilePath
            : (exam === "upsc" && fs.existsSync(legacyFilePath)
                ? legacyFilePath
                : genericFilePath);

        if (!fs.existsSync(filePath)) {
            return res.json({
                success: true,
                subject,
                exam,
                type,
                language,
                total: 0,
                questions: [],
                message: "Test Series dataset for this subject is not added yet."
            });
        }

        const dataset = JSON.parse(fs.readFileSync(filePath, "utf8"));
        let questions = Array.isArray(dataset.questions)
            ? dataset.questions
            : [];

        questions = questions.filter(q =>
            String(q.type || "").toLowerCase() === type
        );

        if (year) {
            questions = questions.filter(q => String(q.year || "") === year);
        }

        if (topic) {
            questions = questions.filter(q => {
                const qTopic = String(q.topic || "").toLowerCase();
                const qTags = Array.isArray(q.tags)
                    ? q.tags.join(" ").toLowerCase()
                    : "";
                return qTopic.includes(topic) || qTags.includes(topic);
            });
        }

        questions = questions.sort(() => Math.random() - 0.5).slice(0, count);

        return res.json({
            success: true,
            subject: dataset.subject || subject,
            exam: dataset.exam || exam,
            type,
            language,
            total: questions.length,
            questions
        });

    } catch (error) {
        console.error("NEXORA /api/test-series Error:", error);
        return res.status(500).json({
            success: false,
            message: "NEXORA Test Series failed.",
            error: error.message
        });
    }
});


app.listen(
    PORT,
    () => {

        console.log(
            "================================="
        );

        console.log(
            "NEXORA Backend running on port " +
            PORT
        );

        console.log(
            "NEXORA Local AI: " +
            OLLAMA_MODEL
        );

        console.log(
            "NEXORA Web Search: Tavily"
        );

        console.log(
            "NEXORA AI Mode: Web-Grounded"
        );

        console.log(
            "NEXORA Database: SQLite"
        );

        console.log(
            "Database Path: " +
            dbPath
        );

        console.log(
            "NEXORA Frontend: Enabled"
        );

        console.log(
            "================================="
        );

    }
);
