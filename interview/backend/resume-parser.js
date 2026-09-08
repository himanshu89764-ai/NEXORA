const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

/**
 * NEXORA Interview Resume Parser
 *
 * Supported:
 * - PDF
 * - DOCX
 *
 * Output:
 * {
 *   text,
 *   fileName,
 *   fileType,
 *   characterCount
 * }
 */

async function extractResumeText(filePath) {
    if (!filePath) {
        throw new Error("Resume file path is required.");
    }

    if (!fs.existsSync(filePath)) {
        throw new Error("Resume file not found.");
    }

    const extension = path.extname(filePath).toLowerCase();

    let text = "";

    if (extension === ".pdf") {
        const buffer = fs.readFileSync(filePath);
        const result = await pdfParse(buffer);

        text = result.text || "";
    }

    else if (extension === ".docx") {
        const result = await mammoth.extractRawText({
            path: filePath
        });

        text = result.value || "";
    }

    else {
        throw new Error(
            "Unsupported resume format. Please upload PDF or DOCX."
        );
    }

    // Clean unnecessary whitespace
    text = text
        .replace(/\r\n/g, "\n")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

    if (!text) {
        throw new Error(
            "Could not extract readable text from the resume."
        );
    }

    return {
        text,
        fileName: path.basename(filePath),
        fileType: extension.replace(".", ""),
        characterCount: text.length
    };
}

module.exports = {
    extractResumeText
};
