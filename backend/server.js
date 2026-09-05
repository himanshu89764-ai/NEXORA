require("dotenv").config();
﻿const express = require("express");
const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
const PDFDocument = require("pdfkit");
const { getBook, NCERT_BOOKS, resolveNotesSelection } = require("./short-notes/manifest");
const { generateChapterNotes, generateBookNotes } = require("./short-notes/generator");
const { renderShortNotesPdf } = require("./short-notes/pdf");
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

let geminiResponse;

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
        }).join("\n\n")
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
}

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

app.get(
    "/api/short-notes/manifest",
    (req, res) => {

        try {

            const manifest = {};

            Object.keys(NCERT_BOOKS || {})
                .forEach(classKey => {

                    const classBooks =
                        NCERT_BOOKS[classKey] || {};

                    const firstBook =
                        Object.values(classBooks)[0];

                    manifest[classKey] = {
                        className:
                            firstBook
                                ? firstBook.className
                                : classKey,

                        subjects: {}
                    };

                    Object.keys(classBooks)
                        .forEach(subjectKey => {

                            const book =
                                classBooks[subjectKey];

                            if (
                                !manifest[classKey]
                                    .subjects[subjectKey]
                            ) {
                                manifest[classKey]
                                    .subjects[subjectKey] = {
                                        subject:
                                            book.subject ||
                                            subjectKey,
                                        books: {}
                                    };
                            }

                            manifest[classKey]
                                .subjects[subjectKey]
                                .books[book.id || subjectKey] =
                                    book;

                        });

                });

            return res.json({
                success: true,
                manifest
            });

        } catch (error) {

            console.error(
                "NEXORA Short Notes Manifest Error:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Unable to load Short Notes manifest.",
                error:
                    error.message
            });

        }

    }
);

app.post(
    "/api/short-notes",
    async (req, res) => {

        try {

            const {
                className = "",
                subject = "",
                bookId = "",
                bookTitle = "",
                chapter = "",
                chapterTitle = "",
                language = "english",
                mode = "exam",
                exam = "UPSC"
            } = req.body || {};

            const cleanClass =
                String(className || "").trim();

            const cleanSubject =
                String(subject || "").trim();

            const cleanBookId =
                String(bookId || "").trim();

            const cleanBookTitle =
                String(bookTitle || "").trim();

            const cleanChapter =
                String(chapter || "").trim();

            const cleanChapterTitle =
                String(chapterTitle || "").trim();

            if (
                !cleanClass ||
                !cleanSubject
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Please select Class and Subject."
                });
            }

            if (
                !cleanBookId &&
                !cleanBookTitle
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Please select or enter a Book."
                });
            }

            if (
                !cleanChapter &&
                !cleanChapterTitle
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Please select or enter a Chapter."
                });
            }

            const selectedLanguage =
                String(language).toLowerCase() === "hindi"
                    ? "Hindi"
                    : "English";

            const selectedMode =
                String(mode).toLowerCase() === "quick"
                    ? "Quick Revision"
                    : "Exam Notes";

            const selectedExam =
                String(exam || "UPSC").trim() ||
                "UPSC";

            console.log(
                "NEXORA Short Notes:",
                cleanClass,
                "| Subject:",
                cleanSubject,
                "| Book:",
                cleanBookId || cleanBookTitle,
                "| Chapter:",
                cleanChapter || cleanChapterTitle,
                "| Exam:",
                selectedExam,
                "| Language:",
                selectedLanguage,
                "| Mode:",
                selectedMode
            );

            // =================================
            // GENERIC BOOK + CHAPTER RESOLUTION
            // =================================

            const selection =
                resolveNotesSelection({
                    className: cleanClass,
                    subject: cleanSubject,
                    bookId: cleanBookId,
                    bookTitle: cleanBookTitle,
                    chapter: cleanChapter,
                    chapterTitle: cleanChapterTitle
                });

            const book = selection && selection.book
                ? selection.book
                : null;

            const selectedChapter =
                selection && selection.chapter
                    ? selection.chapter
                    : null;

            if (!book) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Selected book was not found. Please select a valid book or use Custom / Other Book."
                });
            }

            if (!selectedChapter) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Selected chapter was not found. Please select a valid chapter or use Custom / Other Chapter."
                });
            }

            // =================================
            // GENERATE CHAPTER NOTES
            // =================================

            console.log(
                "NEXORA Short Notes: Generating chapter:",
                selectedChapter.titleEn ||
                    selectedChapter.titleHi ||
                    cleanChapterTitle
            );

            const notes =
                await generateChapterNotes({
                    book,
                    chapter: selectedChapter,
                    language: selectedLanguage,
                    mode: selectedMode,
                    exam: selectedExam
                });

            if (
                !notes ||
                !String(notes).trim()
            ) {
                throw new Error(
                    "NEXORA Short Notes generator returned empty notes."
                );
            }

            const chapterTitleForPdf =
                selectedLanguage === "Hindi"
                    ? (
                        selectedChapter.titleHi ||
                        selectedChapter.titleEn ||
                        cleanChapterTitle
                    )
                    : (
                        selectedChapter.titleEn ||
                        selectedChapter.titleHi ||
                        cleanChapterTitle
                    );

            const bookTitleForPdf =
                selectedLanguage === "Hindi"
                    ? (
                        book.titleHi ||
                        book.titleEn ||
                        cleanBookTitle
                    )
                    : (
                        book.titleEn ||
                        book.titleHi ||
                        cleanBookTitle
                    );

            const pdfTitle =
                `${cleanClass} ${cleanSubject} — ${bookTitleForPdf} — ${chapterTitleForPdf}`;

            // =================================
            // PDF GENERATION
            // =================================

            console.log(
                "NEXORA Short Notes: Rendering PDF..."
            );

            const pdfBuffer =
                await renderShortNotesPdf({
                    notes,
                    title: pdfTitle,
                    language: selectedLanguage
                });

            if (
                !pdfBuffer ||
                !pdfBuffer.length
            ) {
                throw new Error(
                    "NEXORA PDF renderer returned an empty PDF."
                );
            }

            console.log(
                "NEXORA Short Notes: PDF created:",
                pdfBuffer.length,
                "bytes"
            );

            const safeFilename =
                [
                    cleanClass,
                    cleanSubject,
                    bookTitleForPdf,
                    chapterTitleForPdf
                ]
                    .join("-")
                    .replace(/[^a-z0-9]+/gi, "-")
                    .replace(/^-+|-+$/g, "")
                    .slice(0, 120) ||
                "short-notes";

            res.setHeader(
                "Content-Type",
                "application/pdf"
            );

            res.setHeader(
                "Content-Disposition",
                `attachment; filename="NEXORA-${safeFilename}-${selectedLanguage}.pdf"`
            );

            return res.send(
                Buffer.from(pdfBuffer)
            );

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
                                : "General";

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
