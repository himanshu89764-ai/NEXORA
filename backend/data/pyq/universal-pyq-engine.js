
/*
 * NEXORA UNIVERSAL AUTHENTIC PYQ ENGINE V2
 * =========================================
 * UNIVERSAL SCHEMA CONNECTOR
 *
 * Supports existing NEXORA PYQ JSON:
 * subject, exam, description, questions[]
 *
 * HARD RULES:
 * - verified === true ONLY
 * - source is mandatory
 * - question/year/exam/subject are mandatory
 * - AI NEVER creates PYQs
 * - missing years are NEVER fabricated
 * - existing data is NEVER modified
 */

const fs = require("fs");
const path = require("path");

const PYQ_ROOT = path.join(__dirname);

function safe(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

/*
 * Load one NEXORA dataset.
 */
function loadDataset(exam, subject) {
  const directCandidates = [
    path.join(PYQ_ROOT, safe(exam), `${safe(subject)}.json`),
    path.join(PYQ_ROOT, safe(subject), `${safe(exam)}.json`),
    path.join(PYQ_ROOT, `${safe(subject)}.json`)
  ];

  for (const file of directCandidates) {
    if (!fs.existsSync(file)) continue;

    const data = readJSON(file);

    if (!data) {
      return {
        success: false,
        exam,
        subject,
        questions: [],
        error: `Invalid JSON: ${file}`
      };
    }

    const questions = Array.isArray(data)
      ? data
      : Array.isArray(data.questions)
        ? data.questions
        : [];

    return normalizeDataset(data, questions, exam, subject, file);
  }

  return {
    success: true,
    exam,
    subject,
    questions: [],
    years: [],
    verifiedQuestions: 0,
    fakeQuestions: 0,
    missingDataset: true,
    message: "No verified dataset found. No PYQs fabricated."
  };
}

function normalizeDataset(data, questions, requestedExam, requestedSubject, file) {
  const normalized = [];

  for (const q of questions) {
    if (!validateQuestion(q)) continue;

    normalized.push({
      ...q,
      exam: q.exam || data.exam || requestedExam,
      subject: q.subject || data.subject || requestedSubject,
      year: Number(q.year),
      verified: true,
      source: q.source
    });
  }

  const years = [...new Set(normalized.map(q => q.year))]
    .filter(Number.isFinite)
    .sort((a, b) => a - b);

  return {
    success: true,
    exam: data.exam || requestedExam,
    subject: data.subject || requestedSubject,
    description: data.description || "",
    file,
    questions: normalized,
    years,
    verifiedQuestions: normalized.length,
    fakeQuestions: 0,
    missingDataset: false
  };
}

/*
 * Strict authenticity gate.
 */
function validateQuestion(q) {
  return Boolean(
    q &&
    q.verified === true &&
    q.year &&
    Number.isFinite(Number(q.year)) &&
    q.exam &&
    q.subject &&
    q.question &&
    String(q.question).trim() &&
    q.source &&
    String(q.source).trim()
  );
}

/*
 * Returns exactly 30 requested calendar years.
 * It does NOT invent missing questions.
 */
function get30YearRange(endYear) {
  const end = Number(endYear);

  if (!Number.isInteger(end)) {
    throw new Error("Invalid endYear");
  }

  return {
    startYear: end - 29,
    endYear: end
  };
}

/*
 * Main 30-year authentic PYQ query.
 */
function get30YearPYQ(exam, subject, endYear) {
  const data = loadDataset(exam, subject);
  const range = get30YearRange(endYear);

  const questions = data.questions
    .filter(validateQuestion)
    .filter(q => q.year >= range.startYear && q.year <= range.endYear)
    .sort((a, b) =>
      a.year - b.year ||
      String(a.type || "").localeCompare(String(b.type || "")) ||
      Number(a.questionNumber || 0) - Number(b.questionNumber || 0)
    );

  const availableYears = [...new Set(questions.map(q => q.year))]
    .sort((a, b) => a - b);

  const missingYears = [];

  for (let year = range.startYear; year <= range.endYear; year++) {
    if (!availableYears.includes(year)) {
      missingYears.push(year);
    }
  }

  return {
    success: true,
    exam,
    subject,
    startYear: range.startYear,
    endYear: range.endYear,
    requestedYears: 30,
    availableYears,
    missingYears,
    authenticQuestions: questions.length,
    fakeQuestions: 0,
    verifiedOnly: true,
    questions
  };
}

/*
 * Organize questions year-wise for PDF generation.
 */
function buildAnswerSheet(exam, subject, endYear, language = "en") {
  const result = get30YearPYQ(exam, subject, endYear);

  const byYear = {};

  for (const q of result.questions) {
    if (!byYear[q.year]) byYear[q.year] = [];

    byYear[q.year].push({
      id: q.id,
      year: q.year,
      exam: q.exam,
      type: q.type,
      question:
        language === "hi" && q.question_hi
          ? q.question_hi
          : q.question,
      options:
        language === "hi" && q.options_hi
          ? q.options_hi
          : q.options,
      answer:
        language === "hi" && q.answer_hi
          ? q.answer_hi
          : q.answer,
      explanation:
        language === "hi" && q.explanation_hi
          ? q.explanation_hi
          : q.explanation,
      source: q.source,
      verified: true,
      topic: q.topic,
      subtopic: q.subtopic,
      difficulty: q.difficulty
    });
  }

  return {
    ...result,
    language,
    pdfReady: true,
    pdfTitle:
      `${result.exam} ${result.subject} — ` +
      `${result.startYear}-${result.endYear} Authentic PYQ Answer Sheet`,
    byYear,
    verification: {
      rule: "verified === true",
      fakeQuestions: 0,
      fabricatedQuestions: 0,
      missingYearsNotFilled: true
    }
  };
}

/*
 * Quick dataset statistics.
 */
function getStats(exam, subject, endYear) {
  const result = get30YearPYQ(exam, subject, endYear);

  return {
    exam: result.exam,
    subject: result.subject,
    range: `${result.startYear}-${result.endYear}`,
    requestedYears: result.requestedYears,
    availableYears: result.availableYears.length,
    missingYears: result.missingYears.length,
    authenticQuestions: result.authenticQuestions,
    fakeQuestions: 0,
    verifiedOnly: true
  };
}

module.exports = {
  loadDataset,
  validateQuestion,
  get30YearRange,
  get30YearPYQ,
  buildAnswerSheet,
  getStats
};
