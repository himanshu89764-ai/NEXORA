const fs = require("fs");

const file = "backend/server.js";
let s = fs.readFileSync(file, "utf8");

if (s.includes("PERSONAL AI TUTOR V1")) {
    console.log("PERSONAL AI TUTOR V1 already exists. No duplicate patch.");
    process.exit(0);
}

const marker = 'console.log("NEXORA Database connected:", dbPath);';

if (!s.includes(marker)) {
    console.error("ERROR: Database marker not found.");
    process.exit(1);
}

const insert = `
/* ============================================================
   PERSONAL AI TUTOR V1
   Adaptive teaching based on student performance
   ============================================================ */

db.exec(
    "CREATE TABLE IF NOT EXISTS tutor_performance (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "user_id INTEGER NOT NULL," +
    "topic TEXT NOT NULL," +
    "mode TEXT NOT NULL DEFAULT 'beginner'," +
    "attempts INTEGER NOT NULL DEFAULT 0," +
    "correct_attempts INTEGER NOT NULL DEFAULT 0," +
    "wrong_attempts INTEGER NOT NULL DEFAULT 0," +
    "mastery REAL NOT NULL DEFAULT 0," +
    "last_difficulty TEXT DEFAULT 'beginner'," +
    "last_result TEXT DEFAULT ''," +
    "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP," +
    "UNIQUE(user_id, topic, mode)" +
    ");" +
    "CREATE TABLE IF NOT EXISTS tutor_sessions (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "user_id INTEGER NOT NULL," +
    "topic TEXT NOT NULL," +
    "mode TEXT NOT NULL," +
    "student_message TEXT NOT NULL," +
    "tutor_response TEXT," +
    "result TEXT DEFAULT ''," +
    "difficulty TEXT DEFAULT ''," +
    "created_at DATETIME DEFAULT CURRENT_TIMESTAMP" +
    ");"
);

const TUTOR_MODES = [
    "beginner",
    "school",
    "college",
    "competitive exam",
    "upsc",
    "interview"
];

function normalizeTutorMode(mode) {
    const value = String(mode || "beginner").trim().toLowerCase();

    if (TUTOR_MODES.includes(value)) {
        return value;
    }

    return "beginner";
}

function getTutorPerformance(userId, topic, mode) {
    return db.prepare(
        "SELECT attempts, correct_attempts, wrong_attempts, mastery, " +
        "last_difficulty, last_result " +
        "FROM tutor_performance " +
        "WHERE user_id = ? AND topic = ? AND mode = ? LIMIT 1"
    ).get(userId, topic, mode) || {
        attempts: 0,
        correct_attempts: 0,
        wrong_attempts: 0,
        mastery: 0,
        last_difficulty: "beginner",
        last_result: ""
    };
}

function getTutorDifficulty(performance) {
    const mastery = Number(performance && performance.mastery || 0);

    if (mastery < 35) {
        return "beginner";
    }

    if (mastery < 70) {
        return "intermediate";
    }

    return "advanced";
}

function updateTutorPerformance(userId, topic, mode, result) {
    const normalizedResult = String(result || "").trim().toLowerCase();

    const correctResults = [
        "correct",
        "understood",
        "yes",
        "right",
        "pass"
    ];

    const isCorrect = correctResults.includes(normalizedResult);

    const current = getTutorPerformance(userId, topic, mode);

    const attempts = Number(current.attempts || 0) + 1;
    const correctAttempts =
        Number(current.correct_attempts || 0) + (isCorrect ? 1 : 0);

    const wrongAttempts =
        Number(current.wrong_attempts || 0) + (isCorrect ? 0 : 1);

    const mastery = Math.round(
        Math.max(
            0,
            Math.min(
                100,
                (correctAttempts / Math.max(attempts, 1)) * 100
            )
        )
    );

    const difficulty = getTutorDifficulty({ mastery });

    db.prepare(
        "INSERT INTO tutor_performance " +
        "(user_id, topic, mode, attempts, correct_attempts, " +
        "wrong_attempts, mastery, last_difficulty, last_result, updated_at) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP) " +
        "ON CONFLICT(user_id, topic, mode) DO UPDATE SET " +
        "attempts = excluded.attempts, " +
        "correct_attempts = excluded.correct_attempts, " +
        "wrong_attempts = excluded.wrong_attempts, " +
        "mastery = excluded.mastery, " +
        "last_difficulty = excluded.last_difficulty, " +
        "last_result = excluded.last_result, " +
        "updated_at = CURRENT_TIMESTAMP"
    ).run(
        userId,
        topic,
        mode,
        attempts,
        correctAttempts,
        wrongAttempts,
        mastery,
        difficulty,
        normalizedResult
    );

    return getTutorPerformance(userId, topic, mode);
}

app.post("/api/tutor", async (req, res) => {
    try {
        const {
            userId,
            topic,
            question,
            mode,
            result
        } = req.body || {};

        if (!userId) {
            return res.status(400).json({
                error: "userId is required"
            });
        }

        if (!topic || !String(topic).trim()) {
            return res.status(400).json({
                error: "topic is required"
            });
        }

        if (!question || !String(question).trim()) {
            return res.status(400).json({
                error: "question is required"
            });
        }

        const tutorMode = normalizeTutorMode(mode);
        const cleanTopic = String(topic).trim();
        const cleanQuestion = String(question).trim();

        if (result) {
            updateTutorPerformance(
                userId,
                cleanTopic,
                tutorMode,
                result
            );
        }

        const performance = getTutorPerformance(
            userId,
            cleanTopic,
            tutorMode
        );

        const difficulty = getTutorDifficulty(performance);

        const modeRules = {
            beginner:
                "Use very simple language, daily-life analogies and short explanations.",
            school:
                "Teach at school level with clear concepts and examples.",
            college:
                "Give conceptual depth, terminology and practical examples.",
            "competitive exam":
                "Focus on exam concepts, traps, comparisons, facts and practice.",
            upsc:
                "Use UPSC-oriented conceptual depth, analytical connections and answer-writing perspective.",
            interview:
                "Use practical examples, likely questions and concise speaking points."
        };

        const prompt =
            "You are NEXORA Personal AI Tutor.\\n\\n" +
            "STUDENT TOPIC:\\n" + cleanTopic + "\\n\\n" +
            "STUDENT QUESTION:\\n" + cleanQuestion + "\\n\\n" +
            "LEARNING MODE:\\n" + tutorMode + "\\n\\n" +
            "CURRENT PERFORMANCE:\\n" +
            "Attempts: " + (performance.attempts || 0) + "\\n" +
            "Correct: " + (performance.correct_attempts || 0) + "\\n" +
            "Wrong: " + (performance.wrong_attempts || 0) + "\\n" +
            "Mastery: " + (performance.mastery || 0) + "%\\n" +
            "Recommended difficulty: " + difficulty + "\\n\\n" +
            "MODE INSTRUCTION:\\n" +
            modeRules[tutorMode] + "\\n\\n" +
            "ADAPTIVE RULES:\\n" +
            "1. Below 35% mastery: simplify substantially.\\n" +
            "2. 35-69% mastery: use another example and moderate practice.\\n" +
            "3. 70%+ mastery: increase depth and challenge.\\n" +
            "4. If confused, use a different analogy.\\n" +
            "5. Never shame the student.\\n" +
            "6. Teach first, then check understanding.\\n" +
            "7. Stay focused on the topic.\\n" +
            "8. Use the student's language/style when practical.\\n" +
            "9. Do not invent citations.\\n\\n" +
            "RETURN THESE SECTIONS:\\n\\n" +
            "### Explanation\\n" +
            "Teach the concept clearly.\\n\\n" +
            "### Simple Example\\n" +
            "Give an easy practical example.\\n\\n" +
            "### Remember\\n" +
            "Give important points to retain.\\n\\n" +
            "### Check Your Understanding\\n" +
            "Ask one short question.\\n\\n" +
            "### Practice\\n" +
            "Give one practice question.\\n\\n" +
            "### Next Step\\n" +
            "Tell the student what to do next.";

        if (!gemini) {
            throw new Error("Gemini client is not available.");
        }

        const geminiResponse =
            await gemini.models.generateContent({
                model: GEMINI_MODEL,
                contents: prompt,
                config: {
                    temperature: 0.3,
                    maxOutputTokens: 1200
                }
            });

        const tutorAnswer =
            String(geminiResponse.text || "").trim();

        if (!tutorAnswer) {
            throw new Error(
                "Personal AI Tutor returned an empty response."
            );
        }

        db.prepare(
            "INSERT INTO tutor_sessions " +
            "(user_id, topic, mode, student_message, tutor_response, result, difficulty) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?)"
        ).run(
            userId,
            cleanTopic,
            tutorMode,
            cleanQuestion,
            tutorAnswer,
            String(result || ""),
            difficulty
        );

        return res.json({
            success: true,
            engine: "NEXORA Personal AI Tutor V1",
            topic: cleanTopic,
            mode: tutorMode,
            difficulty: difficulty,
            performance: getTutorPerformance(
                userId,
                cleanTopic,
                tutorMode
            ),
            answer: tutorAnswer
        });

    } catch (error) {
        console.error(
            "Personal AI Tutor error:",
            error.message
        );

        return res.status(500).json({
            error: "Personal AI Tutor failed.",
            details: error.message
        });
    }
});

app.get("/api/tutor/performance", (req, res) => {
    try {
        const {
            userId,
            topic,
            mode
        } = req.query || {};

        if (!userId || !topic) {
            return res.status(400).json({
                error: "userId and topic are required"
            });
        }

        const tutorMode = normalizeTutorMode(mode);

        const performance = getTutorPerformance(
            userId,
            String(topic).trim(),
            tutorMode
        );

        return res.json({
            success: true,
            topic: String(topic).trim(),
            mode: tutorMode,
            performance: performance,
            difficulty: getTutorDifficulty(performance)
        });

    } catch (error) {
        console.error(
            "Tutor performance error:",
            error.message
        );

        return res.status(500).json({
            error: "Could not load tutor performance.",
            details: error.message
        });
    }
});

console.log("PERSONAL AI TUTOR V1: APPLIED");
`;

s = s.replace(marker, marker + insert);

fs.writeFileSync(file, s, "utf8");

console.log("PERSONAL AI TUTOR V1 PATCH APPLIED SUCCESSFULLY");
