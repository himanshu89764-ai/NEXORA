const express = require("express");

const router = express.Router();

function cleanText(text) {
    return String(text || "")
        .replace(/^```(?:text|json)?\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
}

async function askGemini(prompt) {
    if (!global.gemini) {
        throw new Error("Gemini AI is not configured.");
    }

    const response = await global.gemini.models.generateContent({
        model: global.GEMINI_MODEL,
        contents: prompt,
        config: {
            temperature: 0.3,
            maxOutputTokens: 500
        }
    });

    const text = cleanText(response.text);

    if (!text) {
        throw new Error("Gemini returned an empty response.");
    }

    return text;
}

router.post("/start", async (req, res) => {
    try {
        const {
            candidateProfile = {},
            mode = "placement",
            targetRole = "Web Developer",
            language = "English",
            experienceLevel = "Fresher",
            interviewerStyle = "professional"
        } = req.body || {};

        const prompt = `
You are NEXORA AI Interviewer conducting a realistic live mock interview.

Interview details:
Mode: ${mode}
Target Role: ${targetRole}
Language: ${language}
Experience Level: ${experienceLevel}
Interviewer Style: ${interviewerStyle}

Candidate profile:
${JSON.stringify(candidateProfile, null, 2)}

Start the interview now.

Rules:
- Ask exactly ONE interview question.
- Make it appropriate for the target role.
- Start naturally and professionally.
- Do not answer the question yourself.
- Do not give explanations or feedback yet.
- Do not use markdown.
- Return ONLY the spoken interviewer message.
`;

        const interviewerMessage = await askGemini(prompt);

        res.json({
            success: true,
            interview: {
                interviewerMessage
            }
        });
    } catch (error) {
        console.error("Interview start error:", error);

        res.status(500).json({
            success: false,
            error: error.message || "Could not start interview."
        });
    }
});

router.post("/answer", async (req, res) => {
    try {
        const {
            candidateProfile = {},
            mode = "placement",
            targetRole = "Web Developer",
            language = "English",
            experienceLevel = "Fresher",
            interviewerStyle = "professional",
            history = [],
            userAnswer = ""
        } = req.body || {};

        const prompt = `
You are NEXORA AI Interviewer conducting a realistic live mock interview.

Interview details:
Mode: ${mode}
Target Role: ${targetRole}
Language: ${language}
Experience Level: ${experienceLevel}
Interviewer Style: ${interviewerStyle}

Candidate profile:
${JSON.stringify(candidateProfile, null, 2)}

Previous interview conversation:
${JSON.stringify(history, null, 2)}

Candidate's latest answer:
${userAnswer}

Continue the interview.

Rules:
- Ask exactly ONE next interview question.
- Base the next question on the candidate's answer when useful.
- Gradually cover relevant technical, behavioral, project, and role-specific topics.
- Do not ask multiple questions at once.
- Do not give a long explanation.
- Do not provide the answer.
- Do not use markdown.
- Return ONLY the spoken interviewer message.
`;

        const interviewerMessage = await askGemini(prompt);

        res.json({
            success: true,
            interview: {
                interviewerMessage
            }
        });
    } catch (error) {
        console.error("Interview answer error:", error);

        res.status(500).json({
            success: false,
            error: error.message || "Could not process interview answer."
        });
    }
});

module.exports = router;
