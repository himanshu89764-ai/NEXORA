
/*
 * NEXORA UNIVERSAL AUTHENTIC PYQ ENGINE V1
 * -----------------------------------------
 * RULES:
 * 1. PYQ MUST COME FROM A VERIFIED SOURCE.
 * 2. AI MUST NEVER INVENT A PYQ.
 * 3. Every question keeps exam/subject/year/source metadata.
 * 4. Missing years remain missing; NEVER fabricate questions.
 * 5. Same engine works for every exam and subject.
 */

const fs = require("fs");
const path = require("path");

const PYQ_ROOT = path.join(__dirname);

function safeFileName(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function datasetPath(exam, subject) {
  return path.join(
    PYQ_ROOT,
    safeFileName(exam),
    `${safeFileName(subject)}.json`
  );
}

function loadDataset(exam, subject) {
  const file = datasetPath(exam, subject);

  if (!fs.existsSync(file)) {
    return {
      success: true,
      exam,
      subject,
      years: [],
      questions: [],
      verified: true,
      message: "No verified PYQ dataset loaded yet. No fake questions created."
    };
  }

  try {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));

    return {
      success: true,
      exam,
      subject,
      years: [...new Set((data.questions || []).map(q => q.year))]
        .filter(Boolean)
        .sort((a, b) => a - b),
      questions: data.questions || [],
      verified: data.verified === true
    };
  } catch (error) {
    return {
      success: false,
      exam,
      subject,
      years: [],
      questions: [],
      error: error.message
    };
  }
}

function validateQuestion(q) {
  return Boolean(
    q &&
    q.exam &&
    q.subject &&
    q.year &&
    q.question &&
    q.source &&
    q.source.url &&
    q.source.verified === true
  );
}

function get30YearRange(endYear) {
  endYear = Number(endYear);
  return {
    startYear: endYear - 29,
    endYear
  };
}

function get30YearPYQ(exam, subject, endYear) {
  const data = loadDataset(exam, subject);
  const range = get30YearRange(endYear);

  const questions = data.questions
    .filter(validateQuestion)
    .filter(q => Number(q.year) >= range.startYear)
    .filter(q => Number(q.year) <= range.endYear)
    .sort((a, b) =>
      Number(a.year) - Number(b.year) ||
      Number(a.questionNumber || 0) - Number(b.questionNumber || 0)
    );

  const availableYears = [...new Set(questions.map(q => Number(q.year)))];

  const missingYears = [];
  for (let year = range.startYear; year <= range.endYear; year++) {
    if (!availableYears.includes(year)) missingYears.push(year);
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
    questions,
    fakeQuestions: 0,
    verifiedOnly: true
  };
}

function buildAnswerSheet(exam, subject, endYear) {
  const result = get30YearPYQ(exam, subject, endYear);

  return {
    ...result,
    pdfReady: true,
    pdfTitle: `${exam} ${subject} — 30 Year Authentic PYQ Answer Sheet`,
    sections: [
      "Year-wise Authentic PYQs",
      "Answer",
      "Explanation",
      "Official Source",
      "Verification Status"
    ]
  };
}

module.exports = {
  loadDataset,
  validateQuestion,
  get30YearRange,
  get30YearPYQ,
  buildAnswerSheet
};
