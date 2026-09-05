const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const { getDiagramForChapter } = require("./diagrams");

function escapeHtml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function markdownToHtml(text) {
    const lines = String(text || "").split(/\r?\n/);

    let html = "";
    let inList = false;
    let listType = null;

    function closeList() {
        if (inList) {
            html += `</${listType}>`;
            inList = false;
            listType = null;
        }
    }

    for (const rawLine of lines) {
        const line = rawLine.trim();

        if (!line) {
            closeList();
            html += `<div class="spacer"></div>`;
            continue;
        }

        if (/^={5,}$/.test(line)) {
            closeList();
            html += `<div class="chapter-divider"></div>`;
            continue;
        }

        if (/^TITLE:\s*/i.test(line)) {
            closeList();
            const value = line.replace(/^TITLE:\s*/i, "");
            html += `<h1 class="document-title">${escapeHtml(value)}</h1>`;
            continue;
        }

        if (/^CHAPTER\s+\d+:/i.test(line)) {
            closeList();
            html += `<h1 class="chapter-title">${escapeHtml(line)}</h1>`;
            continue;
        }

        if (
            /^[A-Z][A-Z0-9 /&—:()\-]{3,}:$/.test(line) ||
            /^(NCERT CORE CONCEPTS|IMPORTANT DEFINITIONS|KEY TERMS|DETAILED NOTES|DIAGRAMS AND STRUCTURES|IMPORTANT FACTS|COMPARISONS|PRELIMS FOCUS|PRELIMS MCQS|MAINS FOCUS|MAINS QUESTIONS|PYQ-ORIENTED ANALYSIS|CONCEPTUAL TRAPS|CHAPTER LINKAGES|QUICK REVISION|BOOK INFORMATION|TABLE OF CONTENTS):?$/i.test(line)
        ) {
            closeList();
            html += `<h2>${escapeHtml(line.replace(/:$/, ""))}</h2>`;
            continue;
        }

        const diagramMatch = line.match(new RegExp("^\\[\\[NEXORA_DIAGRAM:([a-z0-9-]+)\\]\\]$","i"));

        if (diagramMatch) {
            closeList();

            const chapterKey = diagramMatch[1].toLowerCase();
            const svg = getDiagramForChapter(chapterKey);

            if (svg) {
                html += `
                    <div class="diagram-box actual-diagram">
                        <div class="diagram-label">DIAGRAM / STRUCTURE</div>
                        ${svg}
                    </div>
                `;
            }

            continue;
        }

        if (/^\[DIAGRAM:\s*/i.test(line)) {
            closeList();
            html += `
                <div class="diagram-box">
                    <div class="diagram-label">DIAGRAM / STRUCTURE</div>
                    <div>${escapeHtml(line)}</div>
                </div>
            `;
            continue;
        }

        if (/^\[FLOW:\s*/i.test(line)) {
            closeList();
            html += `
                <div class="flow-box">
                    ${escapeHtml(line)}
                </div>
            `;
            continue;
        }

        if (/^\[STRUCTURE:\s*/i.test(line)) {
            closeList();
            html += `
                <div class="structure-box">
                    ${escapeHtml(line)}
                </div>
            `;
            continue;
        }

        if (/^[-*•]\s+/.test(line)) {
            if (!inList || listType !== "ul") {
                closeList();
                html += `<ul>`;
                inList = true;
                listType = "ul";
            }

            html += `<li>${formatInline(line.replace(/^[-*•]\s+/, ""))}</li>`;
            continue;
        }

        if (/^\d+[.)]\s+/.test(line)) {
            if (!inList || listType !== "ol") {
                closeList();
                html += `<ol>`;
                inList = true;
                listType = "ol";
            }

            html += `<li>${formatInline(line.replace(/^\d+[.)]\s+/, ""))}</li>`;
            continue;
        }

        closeList();

        if (
            line.includes("A.") ||
            line.includes("B.") ||
            line.includes("C.") ||
            line.includes("D.")
        ) {
            html += `<div class="option-line">${formatInline(line)}</div>`;
            continue;
        }

        html += `<p>${formatInline(line)}</p>`;
    }

    closeList();

    return html;
}

function formatInline(text) {
    let value = escapeHtml(text);

    value = value.replace(
        /\*\*(.+?)\*\*/g,
        "<strong>$1</strong>"
    );

    value = value.replace(
        /\*(.+?)\*/g,
        "<em>$1</em>"
    );

    return value;
}

async function renderShortNotesPdf({
    notes,
    title = "NEXORA Short Notes",
    language = "Hindi"
}) {
    if (!notes || !String(notes).trim()) {
        throw new Error("Cannot create PDF from empty notes.");
    }

    const fontPath = path.join(
        __dirname,
        "..",
        "fonts",
        "NotoSansDevanagari-Regular.ttf"
    );

    if (!fs.existsSync(fontPath)) {
        throw new Error(
            `Hindi font not found: ${fontPath}`
        );
    }

    const fontBase64 =
        fs.readFileSync(fontPath).toString("base64");

    const contentHtml = markdownToHtml(notes);

    const html = `
<!DOCTYPE html>
<html lang="${String(language).toLowerCase() === "hindi" ? "hi" : "en"}">
<head>
<meta charset="UTF-8">

<style>

@font-face {
    font-family: "NEXORA-Devanagari";
    src: url(data:font/ttf;base64,${fontBase64}) format("truetype");
    font-weight: 400;
    font-style: normal;
    font-display: block;
}

* {
    box-sizing: border-box;
}

html {
    font-family: "NEXORA-Devanagari", sans-serif;
}

body {
    margin: 0;
    padding: 0;
    color: #1f2937;
    background: #ffffff;

    font-family:
        "NEXORA-Devanagari",
        "Noto Sans Devanagari",
        sans-serif;

    font-size: 11.5pt;
    line-height: 1.75;

    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
}

.document-title {
    font-size: 24pt;
    line-height: 1.35;
    text-align: center;
    margin: 0 0 22px;
    font-weight: 700;
    color: #c00000;
}

.chapter-title {
    font-size: 19pt;
    line-height: 1.45;
    margin-top: 18px;
    margin-bottom: 18px;
    padding: 12px 14px;
    border-bottom: 2px solid #222;
    page-break-after: avoid;
    color: #c00000;
}

h2 {
    font-size: 15pt;
    line-height: 1.5;
    margin-top: 20px;
    margin-bottom: 9px;
    padding-bottom: 4px;
    border-bottom: 1px solid #aaa;
    page-break-after: avoid;
    color: #c00000;
}

p {
    margin: 0 0 8px;
    text-align: justify;
}

ul,
ol {
    margin-top: 5px;
    margin-bottom: 10px;
    padding-left: 28px;
}

li {
    margin-bottom: 4px;
}

strong {
    font-weight: 700;
}

.spacer {
    height: 4px;
}

.chapter-divider {
    height: 2px;
    margin: 20px 0;
    border-top: 2px solid #333;
}

.diagram-box,
.flow-box,
.structure-box {
    margin: 12px 0 16px;
    padding: 12px 14px;
    border: 1px solid #888;
    border-radius: 6px;
    background: #f7f7f7;
    page-break-inside: avoid;
}

.diagram-label {
    font-weight: 700;
    margin-bottom: 8px;
}

.actual-diagram {
    background: #ffffff;
}

.nexora-svg {
    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
    font-family: "NEXORA-Devanagari", "Noto Sans Devanagari", sans-serif;
    overflow: visible;
}

.nexora-svg .diagram-title,
.nexora-svg .diagram-text {
    font-family: "NEXORA-Devanagari", "Noto Sans Devanagari", sans-serif;
    fill: #1f2937;
}

.nexora-svg .diagram-title {
    font-size: 22px;
    font-weight: 700;
}

.nexora-svg .diagram-text {
    font-size: 18px;
}

.option-line {
    margin-left: 14px;
    margin-bottom: 4px;
}

.page-break {
    page-break-before: always;
}

@page {
    size: A4;
    margin: 18mm 17mm 18mm 17mm;
}

@media print {
    body {
        background: white;
    }

    h1,
    h2 {
        break-after: avoid;
    }

    p,
    li,
    .diagram-box,
    .flow-box,
    .structure-box {
        orphans: 3;
        widows: 3;
    }
}

</style>
</head>

<body>

${contentHtml}

</body>
</html>
`;

    const browser = await puppeteer.launch({
        headless: true
    });

    try {
        const page = await browser.newPage();

        await page.setViewport({
            width: 1240,
            height: 1754,
            deviceScaleFactor: 1
        });

        await page.setContent(html, {
            waitUntil: "load"
        });

        await page.evaluate(async () => {
            await document.fonts.ready;
        });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            displayHeaderFooter: false
        });

        return pdfBuffer;

    } finally {
        await browser.close();
    }
}

module.exports = {
    renderShortNotesPdf
};
