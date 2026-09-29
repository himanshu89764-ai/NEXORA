const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";

/**
 * NEXORA Interview Engine
 *
 * Generic interview brain:
 * - Placement
 * - UPSC
 * - SSC
 * - Banking
 * - Teaching
 * - IT
 * - Custom interviews
 *
 * Handles:
 * - Candidate profile
 * - Resume-based questions
 * - Dynamic follow-ups
 * - Conversation history
 * - Interview evaluation
 */

function cleanJson(text) {
    if (!text) {
        throw new Error("Empty AI response.");
    }

    const cleaned = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned);
}

async function askGemini(prompt) {
    const response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt
    });

    return response.text;
}

/**
 * Analyze uploaded resume and create candidate profile.
 */
async function createCandidateProfile({
    resumeText = "",
    mode = "placement",
    language = "English",
    targetRole = ""
}) {
    if (!resumeText.trim()) {
        throw new Error("Resume text is required.");
    }

    const prompt = `
You are the candidate-profile analysis engine of NEXORA.

Your job is to understand the candidate's resume and create a structured interview profile.

Interview mode:
${mode}

Preferred interview language:
${language}

Target role:
${targetRole || "Not specified"}

Resume:
----------------
${resumeText}
----------------

Extract only information supported by the resume.

Return ONLY valid JSON in this exact structure:

{
  "name": "",
  "summary": "",
  "education": [],
  "experience": [],
  "skills": [],
  "projects": [],
  "certifications": [],
  "achievements": [],
  "roles": [],
  "potentialQuestionAreas": [],
  "technicalAreas": [],
  "behavioralAreas": [],
  "resumeClaimsToVerify": []
}

Rules:
- Do not invent facts.
- Keep arrays empty when information is unavailable.
- Identify important claims that an interviewer should verify.
- Identify realistic areas for follow-up questions.
`;

    const result = await askGemini(prompt);

    return cleanJson(result);
}

/**
 * Start a new interview.
 */
async function startInterview({
    candidateProfile = {},
    mode = "placement",
    language = "English",
    targetRole = "",
    interviewerStyle = "professional"
}) {
    const prompt = `
You are the AI interviewer inside NEXORA.

You are NOT a chatbot assistant.
You are conducting a realistic professional interview.

Interview mode:
${mode}

Language:
${language}

Target role:
${targetRole || "Not specified"}

Interviewer style:
${interviewerStyle}

Candidate profile:
${JSON.stringify(candidateProfile, null, 2)}

Start the interview naturally.

Important:
- Speak like a real interviewer.
- Do not say "As an AI".
- Do not give the candidate the answer.
- Ask ONE question only.
- The first question should be appropriate for the selected interview mode.
- If the candidate profile contains a name, use it naturally.
- Keep the question conversational.

Return ONLY valid JSON:

{
  "interviewerMessage": "",
  "questionType": "",
  "difficulty": "easy",
  "language": "${language}",
  "followUpReason": "",
  "shouldContinue": true
}
`;

    const result = await askGemini(prompt);

    return cleanJson(result);
}

/**
 * Generate the next interviewer turn dynamically.
 */
async function generateNextTurn({
    candidateProfile = {},
    mode = "placement",
    language = "English",
    targetRole = "",
    history = [],
    userAnswer = ""
}) {
    if (!userAnswer.trim()) {
        throw new Error("Candidate answer is required.");
    }

    const prompt = `
You are NEXORA's realistic interview engine.

Conduct a natural interview based on the candidate's previous answers.

Interview mode:
${mode}

Language:
${language}

Target role:
${targetRole || "Not specified"}

Candidate profile:
${JSON.stringify(candidateProfile, null, 2)}

Conversation history:
${JSON.stringify(history, null, 2)}

Candidate's latest answer:
"${userAnswer}"

Your task:

1. Understand the candidate's answer.
2. Decide whether a follow-up question is appropriate.
3. If the answer contains a claim, weakness, contradiction, interesting detail,
   technical point, project detail, experience, or opinion, use it to create
   a relevant follow-up.
4. If the answer is complete, move naturally to another interview area.
5. Never ask a random unrelated question.
6. Ask only ONE question.
7. Sound like a professional human interviewer.
8. Do not say that you are an AI.
9. Do not praise every answer.
10. Do not explain your reasoning to the candidate.

The interview should feel dynamic rather than like a fixed questionnaire.

Return ONLY valid JSON:

{
  "interviewerMessage": "",
  "questionType": "",
  "difficulty": "easy|medium|hard",
  "language": "${language}",
  "followUpReason": "",
  "shouldContinue": true
}
`;

    const result = await askGemini(prompt);

    return cleanJson(result);
}

/**
 * Evaluate completed interview.
 */
async function evaluateInterview({
    candidateProfile = {},
    mode = "placement",
    language = "English",
    transcript = []
}) {
    const prompt = `
You are NEXORA's interview evaluation engine.

Evaluate the candidate based ONLY on the interview transcript and candidate profile.

Interview mode:
${mode}

Language:
${language}

Candidate profile:
${JSON.stringify(candidateProfile, null, 2)}

Interview transcript:
${JSON.stringify(transcript, null, 2)}

Evaluate:

- communication
- clarity
- confidence based on verbal responses only
- subject knowledge
- technical knowledge where relevant
- problem solving
- answer relevance
- consistency
- resume credibility
- strengths
- improvement areas
- overall performance

Do not make unsupported claims about personality or mental state.

Return ONLY valid JSON:

{
  "overallScore": 0,
  "communicationScore": 0,
  "clarityScore": 0,
  "knowledgeScore": 0,
  "technicalScore": 0,
  "problemSolvingScore": 0,
  "relevanceScore": 0,
  "consistencyScore": 0,
  "strengths": [],
  "improvementAreas": [],
  "importantObservations": [],
  "recommendedPracticeAreas": [],
  "finalAssessment": ""
}

All scores must be between 0 and 100.
`;

    const result = await askGemini(prompt);

    return cleanJson(result);
}

module.exports = {
    createCandidateProfile,
    startInterview,
    generateNextTurn,
    evaluateInterview
};
