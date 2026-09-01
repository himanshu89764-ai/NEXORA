const express = require("express");
const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
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
    apiKey: process.env.GEMINI_API_KEY
});

const GEMINI_MODEL =
    process.env.GEMINI_MODEL || "gemini-3.6-flash";

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
    (req, res) => {

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
            maxOutputTokens: 120
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
                    `${cleanQuery} YouTube video`,
                    {
                        maxResults: 5,
                        searchDepth: "basic"
                    }
                );

            const videoResults =
                (videoSearchResponse.results || [])
                    .filter(result =>
                        result.url &&
                        (
                            result.url.includes("youtube.com") ||
                            result.url.includes("youtu.be")
                        )
                    );

            const bestVideo =
                videoResults.length > 0
                    ? videoResults[0]
                    : null;

            return res.json({

                success: true,

                query: cleanQuery,

                video: bestVideo
                    ? {
                        title: bestVideo.title,
                        url: bestVideo.url,
                        content: bestVideo.content || ""
                    }
                    : null,

                message:
                    bestVideo
                        ? "Best video found."
                        : "No YouTube video found.",

                searchEngine: "Tavily"

            });

        } catch (error) {

            console.error(
                "Video Search Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "NEXORA video search failed.",

                error:
                    error.message

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


            // Qwen
            const ollamaResponse =
                await fetch(
                    OLLAMA_URL,
                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                model:
                                    OLLAMA_MODEL,

                                prompt:
                                    verificationPrompt,

                                stream:
                                    false,

                                options: {

                                    temperature:
                                        0.1,

                                    num_predict:
                                        250

                                }

                            })

                    }
                );


            if (!ollamaResponse.ok) {

                throw new Error(
                    "Ollama HTTP " +
                    ollamaResponse.status
                );

            }


            const aiData =
                await ollamaResponse.json();


            const verification =
                aiData.response || "";


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
                    OLLAMA_MODEL

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
