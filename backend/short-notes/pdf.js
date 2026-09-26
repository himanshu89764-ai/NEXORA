
/* NEXORA PDF FINAL MCQ SERIAL V4 */

/* NEXORA ABSOLUTE MCQ SERIAL CONTROLLER V5 */
function nexoraAbsoluteMcqSerial(value){
  if(typeof value!=="string") return value;
  const lines=value.split(/\r?\n/);
  let inMcq=false;
  let serial=0;

  return lines.map(function(line){
    const t=line.trim();

    // Start/reset when MCQ/Prelims section appears.
    if(/^(PRELIMS|MCQS?|MULTIPLE\s+CHOICE|OBJECTIVE\s+QUESTIONS?)/i.test(t)){
      inMcq=true;
      serial=0;
      return line;
    }

    if(inMcq){
      // Question formats: 1. / 1) / Q1. / Q1)
      if(/^(?:Q(?:UESTION)?\s*)?\d+\s*[\.\)]\s+/i.test(t)){
        serial++;
        return line.replace(
          /^(\\s*)(?:Q(?:UESTION)?\\s*)?\d+\s*[\.\)](\s+)/i,
          "$1"+serial+"."+ "$2"
        );
      }

      // Also catch bold/markdown question prefixes.
      if(/^\*\*(?:Q(?:UESTION)?\s*)?\d+\s*[\.\)]/.test(t)){
        serial++;
        return line.replace(
          /^(\s*)\*\*(?:Q(?:UESTION)?\s*)?\d+\s*[\.\)]/,
          "$1"+serial+"."
        );
      }

      // Leave the MCQ block after Mains/Quick Revision/next major section.
      if(/^(MAINS|QUICK\s+REVISION|DETAILED\s+NOTES|DEFINITIONS|OVERVIEW|NCERT\s+CORE)/i.test(t)){
        inMcq=false;
        serial=0;
      }
    }

    return line;
  }).join("\n");
}

function nexoraPdfNormalizeMcqSerials(value) {
  if (typeof value !== "string" || !value.trim()) return value;

  const lines = value.split("\n");
  let serial = 0;
  let inMcq = false;

  return lines.map(function(line) {
    const t = line.trim();

    if (/^(#{1,6}\s*)?(PRELIMS|MCQS?|MULTIPLE[- ]CHOICE QUESTIONS?|OBJECTIVE QUESTIONS?)/i.test(t)) {
      inMcq = true;
      serial = 0;
      return line;
    }

    if (inMcq && /^(#{1,6}\s*)?(MAINS|DESCRIPTIVE|ANSWER WRITING|QUICK REVISION|CONCLUSION|REFERENCES?)/i.test(t)) {
      inMcq = false;
      return line;
    }

    if (!inMcq) return line;

    if (/^\s*(?:Q(?:UESTION)?\s*)?\d+[\.\):\-]\s+/i.test(line)) {
      serial += 1;
      return line.replace(
        /^(\s*)(?:Q(?:UESTION)?\s*)?\d+([\.\):\-])\s+/i,
        "$1" + serial + "$2 "
      );
    }

    return line;
  }).join("\n");
}

const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const { getDiagramForChapter } = require("./diagrams");

/* =========================================================
   NEXORA SHORT NOTES PDF RENDERER
   ========================================================= */

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* =========================================================
   TEXT CLEANING
   ========================================================= */

function cleanPdfLine(value) {
    let line = String(value ?? "");

    line = line
        .replace(/\u200B/g, "")
        .replace(/\u200C/g, "")
        .replace(/\u200D/g, "")
        .replace(/\uFEFF/g, "");

    /* Remove accidental markdown heading prefixes */
    line = line.replace(
        /^\s*-{1,3}\s*(#{1,6})\s*/u,
        "$1 "
    );

    /* Remove markdown separators */
    if (/^\s*[-_=]{4,}\s*$/u.test(line)) {
        return "";
    }

    /* Remove full-line bold */
    line = line.replace(
        /^\s*\*\*(.+?)\*\*\s*$/u,
        "$1"
    );

    /* Normalize spaces */
    line = line.replace(/[ \t]{2,}/g, " ");

    return line.trim();
}

function cleanHeadingText(value) {
    let text = cleanPdfLine(value);

    text = text
        .replace(/^#{1,6}\s*/u, "")
        .replace(/^\s*[-–—:]+\s*/u, "")
        .replace(/\s*[-–—:]+\s*$/u, "")
        .trim();

    return text;
}

/* =========================================================
   INLINE MARKDOWN
   ========================================================= */

function formatInline(text) {
    let value = escapeHtml(text);

    /* Bold */
    value = value.replace(
        /\*\*(.+?)\*\*/g,
        "<strong>$1</strong>"
    );

    /* Italic */
    value = value.replace(
        /(?<!\*)\*([^*]+)\*(?!\*)/g,
        "<em>$1</em>"
    );

    /* Inline code */
    value = value.replace(
        /`([^`]+)`/g,
        "<code>$1</code>"
    );

    return value;
}

/* =========================================================
   DIAGRAM RENDERING
   ========================================================= */


function nexoraFinalTextCleanup(value) {
    return String(value || "")
        .replace(/<div[^>]*>/gi, "")
        .replace(/<\/div>/gi, "\n")
        .replace(/<span[^>]*>/gi, "")
        .replace(/<\/span>/gi, "")
        .replace(/<p[^>]*>/gi, "")
        .replace(/<\/p>/gi, "\n")
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<[^>]+>/g, "")
        .replace(/\*\*\*/g, "")
        .replace(/\*\*/g, "")
        .replace(/__([^_]+)__/g, "$1")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\r/g, "")
        .replace(/[ \t]+\n/g, "\n")
        .replace(/\n{4,}/g, "\n\n")
        .trim();
}

function markMainsKeyPointsRed(text) {
    const lines = String(text || "").split("\n");
    return lines.map(line => {
        const clean = nexoraFinalTextCleanup(line);
        if (/^\s*(key points?|मुख्य बिंदु|मुख्य बिन्दु|exam points?|परीक्षा बिंदु|mains key points?)\s*:/i.test(clean)) {
            return `<span class="mains-key-point">${clean}</span>`;
        }
        if (/^\s*(\d+[\.\)]|[-•])\s*(therefore|hence|thus|important|key|मुख्य|अतः|इसलिए)/i.test(clean)) {
            return `<span class="mains-key-point">${clean}</span>`;
        }
        return clean;
    }).join("\n");
}

function renderDiagramMarker(line) {
    const match = line.match(
        /^\s*\[\[NEXORA_DIAGRAM:([a-z0-9_-]+)\]\]\s*$/i
    );

    if (!match) {
        return null;
    }

    const chapterKey = match[1]
        .toLowerCase()
        .replace(/_/g, "-");

    const svg = getDiagramForChapter(chapterKey);

    if (!svg) {
        return "";
    }

    return `
        <div class="diagram-card">
            <div class="diagram-label">
                VISUAL / DIAGRAM
            </div>

            <div class="diagram-content">
                ${svg}
            </div>
        </div>
    `;
}

/* =========================================================
   MARKDOWN → HTML
   ========================================================= */


/* ============================================================
   NEXORA FINAL UNIVERSAL MEMORY MAP NORMALIZER
   ============================================================ */

function nexoraFinalNormalizeMemoryMapMarkers(value) {
    let text = String(value || "");

    text = text.replace(
        /\[\[NEXORA_DIAGRAM:memory-map\s+([^\]\n]+)\]\]?/gi,
        function (_, title) {
            const cleanTitle = String(title || "")
                .replace(/\[object Object\]/gi, "")
                .trim();

            return cleanTitle
                ? "[[NEXORA_DIAGRAM:memory-map|" + cleanTitle + "]]"
                : "[[NEXORA_DIAGRAM:memory-map]]";
        }
    );

    text = text.replace(
        /\[\[NEXORA_DIAGRAM:memory-map\|([^\]\n]+)\]\]?/gi,
        function (_, title) {
            const cleanTitle = String(title || "")
                .replace(/\[object Object\]/gi, "")
                .trim();

            return cleanTitle
                ? "[[NEXORA_DIAGRAM:memory-map|" + cleanTitle + "]]"
                : "[[NEXORA_DIAGRAM:memory-map]]";
        }
    );

    text = text.replace(
        /\[\[NEXORA_DIAGRAM:memory-map\s*\]\]?/gi,
        "[[NEXORA_DIAGRAM:memory-map]]"
    );

    return text;
}

function markdownToHtmlLegacy(text) {
    text = nexoraFinalNormalizeMemoryMapMarkers(text);


    /*
     * NEXORA MEMORY MAP HEADING CLEANUP
     *
     * The source notes contain:
     * 6. ONE-PAGE MEMORY MAP
     * [[NEXORA_DIAGRAM:memory-map...]]
     *
     * The diagram itself already renders its own title.
     * Remove the textual section heading so it is not duplicated.
     */

    text = String(text || "").replace(
        /(?:^|\n)\s*(?:#{1,6}\s*)?(?:\d+\.\s*)?ONE[- ]PAGE\s+MEMORY\s+MAP\s*(?=\n)/gi,
        "\n"
    );

    /*
     * NEXORA FINAL MEMORY MAP MARKER FIX
     *
     * Accept:
     * [[NEXORA_DIAGRAM:memory-map|Title]]
     * [[NEXORA_DIAGRAM:memory-map Title]]
     * [[NEXORA_DIAGRAM:memory-map Title]
     */

    text = String(text || "").replace(
        /\[\[NEXORA_DIAGRAM:memory-map(?:\|([^\]\r\n]+)|\s+([^\]\r\n]+))?\]\]?/gi,
        function (_, pipeTitle, spaceTitle) {
            const cleanTitle = String(
                pipeTitle || spaceTitle || "Selected Chapter"
            )
                .replace(/\[object Object\]/gi, "")
                .replace(/[\[\]]/g, "")
                .trim() || "Selected Chapter";

            if (
                typeof nexoraV23MemoryMapSvg === "function"
            ) {
                return nexoraV23MemoryMapSvg(cleanTitle);
            }

            const escaped = cleanTitle
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");

            return (
                '<div class="nexora-memory-map">' +
                '<div class="nexora-memory-map-title">' +
                'ONE-PAGE MEMORY MAP' +
                '</div>' +
                '<div class="nexora-memory-map-center">' +
                escaped +
                '</div>' +
                '<div class="nexora-memory-map-branches">' +
                '<div>CORE CONCEPTS</div>' +
                '<div>KEY TERMS</div>' +
                '<div>EXAM FOCUS</div>' +
                '<div>QUICK REVISION</div>' +
                '</div>' +
                '</div>'
            );
        }
    );

    const rawLines = String(text || "")
        .split(/\r?\n/);

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

    function openList(type) {
        if (inList && listType === type) {
            return;
        }

        closeList();

        html += type === "ol"
            ? "<ol>"
            : "<ul>";

        inList = true;
        listType = type;
    }

    for (const rawLine of rawLines) {
        const line = cleanPdfLine(rawLine);

        /* -------------------------------------------------
           EMPTY LINE
        ------------------------------------------------- */

        if (!line) {
            closeList();

            html += `
                <div class="small-spacer"></div>
            `;

            continue;
        }

        /* -------------------------------------------------
           HORIZONTAL RULE
        ------------------------------------------------- */

        if (/^[-_=]{4,}$/u.test(line)) {
            closeList();

            html += `
                <div class="section-rule"></div>
            `;

            continue;
        }

        /* -------------------------------------------------
           TITLE
        ------------------------------------------------- */

        if (/^TITLE\s*:/i.test(line)) {
            closeList();

            const value = cleanHeadingText(
                line.replace(/^TITLE\s*:/i, "")
            );

            if (value) {
                html += `
                    <h1 class="document-title">
                        ${formatInline(value)}
                    </h1>
                `;
            }

            continue;
        }

        /* -------------------------------------------------
           CHAPTER TITLE
        ------------------------------------------------- */

        if (/^CHAPTER\s+\d+\s*:/i.test(line)) {
            closeList();

            html += `
                <h1 class="chapter-title">
                    ${formatInline(line)}
                </h1>
            `;

            continue;
        }

        /* -------------------------------------------------
           MARKDOWN HEADINGS
        ------------------------------------------------- */

        if (/^#{1,6}\s+/u.test(line)) {
            closeList();

            const level = Math.min(
                3,
                (line.match(/^#+/u) || ["#"])[0].length
            );

            const heading = cleanHeadingText(line);

            if (heading) {
                html += `
                    <h${level + 1}
                        class="markdown-heading level-${level}">
                        ${formatInline(heading)}
                    </h${level + 1}>
                `;
            }

            continue;
        }

        /* -------------------------------------------------
           DIAGRAM MARKER
        ------------------------------------------------- */

        const diagramHtml = renderDiagramMarker(line);

        if (diagramHtml !== null) {
            closeList();

            if (diagramHtml) {
                html += diagramHtml;
            }

            continue;
        }

        /* -------------------------------------------------
           OLD DIAGRAM FORMAT
        ------------------------------------------------- */

        if (/^\[DIAGRAM\s*:/i.test(line)) {
            closeList();

            const value = line
                .replace(/^\[DIAGRAM\s*:/i, "")
                .replace(/\]\s*$/u, "")
                .trim();

            html += `
                <div class="diagram-placeholder">
                    <div class="diagram-label">
                        VISUAL / DIAGRAM
                    </div>

                    <div>
                        ${formatInline(value)}
                    </div>
                </div>
            `;

            continue;
        }

        /* -------------------------------------------------
           FLOW FORMAT
        ------------------------------------------------- */

        if (/^\[FLOW\s*:/i.test(line)) {
            closeList();

            const value = line
                .replace(/^\[FLOW\s*:/i, "")
                .replace(/\]\s*$/u, "")
                .trim();

            html += `
                <div class="flow-box">
                    <div class="visual-label">
                        PROCESS / FLOW
                    </div>

                    <div>
                        ${formatInline(value)}
                    </div>
                </div>
            `;

            continue;
        }

        /* -------------------------------------------------
           STRUCTURE FORMAT
        ------------------------------------------------- */

        if (/^\[STRUCTURE\s*:/i.test(line)) {
            closeList();

            const value = line
                .replace(/^\[STRUCTURE\s*:/i, "")
                .replace(/\]\s*$/u, "")
                .trim();

            html += `
                <div class="structure-box">
                    <div class="visual-label">
                        STRUCTURE / CLASSIFICATION
                    </div>

                    <div>
                        ${formatInline(value)}
                    </div>
                </div>
            `;

            continue;
        }

        /* -------------------------------------------------
           SECTION HEADINGS
        ------------------------------------------------- */

        const headingPatterns = [
            /^NCERT CORE CONCEPTS:?$/i,
            /^CORE CONCEPTS:?$/i,
            /^IMPORTANT DEFINITIONS:?$/i,
            /^KEY TERMS:?$/i,
            /^IMPORTANT TERMS:?$/i,
            /^DETAILED NOTES:?$/i,
            /^PROCESSES AND MECHANISMS:?$/i,
            /^CAUSES AND EFFECTS:?$/i,
            /^CLASSIFICATIONS:?$/i,
            /^CLASSIFICATION:?$/i,
            /^IMPORTANT EXAMPLES:?$/i,
            /^DIAGRAMS AND STRUCTURES:?$/i,
            /^IMPORTANT FACTS:?$/i,
            /^COMPARISONS:?$/i,
            /^PRELIMS FOCUS:?$/i,
            /^PRELIMS MCQS:?$/i,
            /^MAINS FOCUS:?$/i,
            /^MAINS QUESTIONS:?$/i,
            /^PYQ-ORIENTED ANALYSIS:?$/i,
            /^CONCEPTUAL TRAPS:?$/i,
            /^CHAPTER LINKAGES:?$/i,
            /^EXAM FOCUS:?$/i,
            /^PYQ CONNECTION:?$/i,
            /^AUTHENTIC PYQS:?$/i,
            /^PYQ BASED PRACTICE:?$/i,
            /^EXAM-BASED PRACTICE MCQS:?$/i,
            /^PRACTICE MCQS:?$/i,
            /^DESCRIPTIVE PRACTICE:?$/i,
            /^MAINS-BASED PRACTICE:?$/i,
            /^PRACTICE QUESTIONS:?$/i,
            /^QUICK REVISION:?$/i,
            /^BOOK INFORMATION:?$/i,
            /^TABLE OF CONTENTS:?$/i,
            /^VISUALS:?$/i,
            /^RELEVANT VISUALS:?$/i
        ];

        if (
            headingPatterns.some(
                pattern => pattern.test(line)
            )
        ) {
            closeList();

            const heading = cleanHeadingText(line);

            if (heading) {
                html += `
                    <h2 class="section-heading">
                        ${formatInline(heading)}
                    </h2>
                `;
            }

            continue;
        }

        /* -------------------------------------------------
           GENERIC ALL-CAPS HEADING
        ------------------------------------------------- */

        const plainHeading = cleanHeadingText(line);

        if (
            plainHeading.length >= 3 &&
            plainHeading.length <= 90 &&
            /^[A-Z0-9][A-Z0-9 /&()\-–—:,.]+$/u.test(
                plainHeading
            ) &&
            !/[.!?]$/u.test(plainHeading)
        ) {
            closeList();

            html += `
                <h2 class="section-heading">
                    ${formatInline(plainHeading)}
                </h2>
            `;

            continue;
        }

        /* -------------------------------------------------
           BULLET LIST
        ------------------------------------------------- */

        if (/^[-*•]\s+/u.test(line)) {
            openList("ul");

            const item = line
                .replace(/^[-*•]\s+/u, "")
                .trim();

            html += `
                <li>
                    ${formatInline(item)}
                </li>
            `;

            continue;
        }

        /* -------------------------------------------------
           MAINS / DESCRIPTIVE QUESTION
        ------------------------------------------------- */

        if (
            /^(?:Q(?:uestion)?\s*\d*[.):]?\s*|Question\s*:)/i.test(line) ||
            /^\d+[.)]\s+(?:Question\s*:|Q(?:uestion)?\b)/i.test(line)
        ) {
            closeList();

            html += `
                <div class="question-line">
                    ${formatInline(line)}
                </div>
            `;

            continue;
        }

        /* -------------------------------------------------
           MODEL ANSWER LABEL
        ------------------------------------------------- */

        if (
            /^(Model Answer|मॉडल उत्तर)\s*:/i.test(line)
        ) {
            closeList();

            html += `
                <div class="model-answer-label">
                    ${formatInline(line)}
                </div>
            `;

            continue;
        }

        /* -------------------------------------------------
           ANSWER TOPIC / SUBHEADING
        ------------------------------------------------- */

        if (
            /^(Introduction|Core Discussion|Main Body|Analysis|Causes|Effects|Significance|Challenges|Importance|Examples|Conclusion|परिचय|भूमिका|मुख्य चर्चा|मुख्य भाग|विश्लेषण|कारण|प्रभाव|महत्त्व|महत्व|चुनौतियाँ|उदाहरण|निष्कर्ष)\s*:?\s*$/i.test(line)
        ) {
            closeList();

            html += `
                <div class="answer-topic">
                    ${formatInline(line)}
                </div>
            `;

            continue;
        }

        /* -------------------------------------------------
           NUMBERED QUESTION
           Convert question numbering to Q.1, Q.2, Q.3...
        ------------------------------------------------- */

        /*
         * IMPORTANT:
         * Only real MCQ / descriptive questions get Q. numbering.
         * Normal numbered notes such as:
         * 1. CHAPTER OVERVIEW
         * 2. CORE CONCEPTS
         * 1. Historical Process...
         * must remain normal numbered content.
         */

        const numberedQuestionMatch = line.match(
            /^(\d+)[.)]\s+(?:(?:Question|Q(?:uestion)?)\s*:?\s+)?(.+)$/i
        );

        if (
            numberedQuestionMatch &&
            (
                /^(?:Question|Q(?:uestion)?)\s*:/i.test(numberedQuestionMatch[2]) ||
                /[?؟]\s*$/u.test(numberedQuestionMatch[2])
            )
        ) {
            closeList();

            const questionNumber = numberedQuestionMatch[1];
            const questionText = numberedQuestionMatch[2]
                .replace(/^(?:Question|Q(?:uestion)?)\s*:\s*/i, "")
                .trim();

            html += `
                <div class="question-line">
                    <span class="question-number">Q.${questionNumber}</span>
                    <span class="question-text">${formatInline(questionText)}</span>
                </div>
            `;

            continue;
        }

        /* -------------------------------------------------
           NUMBERED LIST
        ------------------------------------------------- */

        if (/^\d+[.)]\s+/u.test(line)) {
            openList("ol");

            const item = line
                .replace(/^\d+[.)]\s+/u, "")
                .trim();

            html += `
                <li>
                    ${formatInline(item)}
                </li>
            `;

            continue;
        }

        /* -------------------------------------------------
           QUESTION
        ------------------------------------------------- */

        if (
            /^(Q(?:uestion)?\s*\d+)[.):]?\s*/i.test(line) ||
            /^Q\.\d+\s+/i.test(line)
        ) {
            closeList();

            html += `
                <div class="question-line">
                    ${formatInline(line)}
                </div>
            `;

            continue;
        }

        /* -------------------------------------------------
           ANSWER
        ------------------------------------------------- */

        if (
            /^(Correct Answer|सही उत्तर)\s*:/i.test(line)
        ) {
            closeList();

            const answerMatch = line.match(
                /^(Correct Answer|सही उत्तर)\s*:\s*(.*)$/i
            );

            const answerLabel = answerMatch ? answerMatch[1] : "Correct Answer";
            const answerText = answerMatch ? answerMatch[2] : "";

            html += `
                <div class="answer-box">
                    <span class="answer-label">${formatInline(answerLabel)}:</span>
                    <span class="answer-text">${formatInline(answerText)}</span>
                </div>
            `;

            continue;
        }

        /* -------------------------------------------------
           EXPLANATION
        ------------------------------------------------- */

        if (
            /^(Explanation|व्याख्या)\s*:/i.test(line)
        ) {
            closeList();

            html += `
                <div class="explanation-box">
                    ${formatInline(line)}
                </div>
            `;

            continue;
        }

        /* -------------------------------------------------
           MCQ OPTIONS
        ------------------------------------------------- */

        if (/^[A-D][.)]\s+/i.test(line)) {
            closeList();

            html += `
                <div class="option-line">
                    ${formatInline(line)}
                </div>
            `;

            continue;
        }

        /* -------------------------------------------------
           META INFORMATION
        ------------------------------------------------- */

        if (
            /^(Class|Subject|Book|Course|Chapter|Exam|Exam\/Target|Language|Mode)\s*:/i.test(
                line
            )
        ) {
            closeList();

            html += `
                <div class="meta-line">
                    ${formatInline(line)}
                </div>
            `;

            continue;
        }

        /* -------------------------------------------------
           TABLE-LIKE PIPE CONTENT
        ------------------------------------------------- */

        if (line.includes("|")) {
            const cells = line
                .split("|")
                .map(cell => cell.trim())
                .filter(Boolean);

            if (cells.length >= 2) {
                closeList();

                html += `
                    <div class="table-row">
                        ${cells
                            .map(
                                cell => `
                                    <div class="table-cell">
                                        ${formatInline(cell)}
                                    </div>
                                `
                            )
                            .join("")}
                    </div>
                `;

                continue;
            }
        }

        /* -------------------------------------------------
           NORMAL PARAGRAPH
        ------------------------------------------------- */

        closeList();

        html += `
            <p class="content-paragraph">
                ${formatInline(line)}
            </p>
        `;
    }

    closeList();

    return html;
}

/* =========================================================
   PDF RENDERING
   ========================================================= */


/* ============================================================
   NEXORA FINAL TRUSTED VISUAL HTML BRIDGE
   Fixes:
   - diagrams disappearing during markdown -> HTML conversion
   - raw nexora-memory-box HTML leaking into PDF
   - memory-map HTML being escaped as plain text
   ============================================================ */

function markdownToHtml(text) {
    let source = String(text || "");

    const trusted = [];

    function keepHtml(html) {
        const token = "NEXORA_TRUSTED_HTML_" + trusted.length + "_END";
        trusted.push(String(html || ""));
        return "\n" + token + "\n";
    }

    /*
     * Remove leaked memory-box source HTML before the normal
     * markdown parser sees it.
     */
    source = source
        .replace(
            /<div\s+[^>]*class\s*=\s*["'][^"']*nexora-memory-box[^"']*["'][^>]*>/gi,
            "\n"
        )
        .replace(
            /<div\s+class\s*=\s*["']nexora-memory-box["']\s*>/gi,
            "\n"
        )
        .replace(
            /<\/div>/gi,
            "\n"
        );

    /*
     * Capture every diagram marker BEFORE markdownToHtmlLegacy()
     * can turn SVG/HTML into plain text.
     */
    source = source.replace(
        /^\s*\[\[NEXORA_DIAGRAM:([a-z0-9_-]+)\]\]?\s*$/gim,
        function (_, key) {
            const marker =
                "[[NEXORA_DIAGRAM:" +
                String(key || "").trim() +
                "]]";

            if (
                String(key || "").toLowerCase() === "memory-map"
            ) {
                let memoryHtml = "";

                if (
                    typeof nexoraV23MemoryMapSvg === "function"
                ) {
                    memoryHtml =
                        nexoraV23MemoryMapSvg(
                            "Selected Chapter"
                        );
                } else {
                    memoryHtml = `
<div class="nexora-memory-map">
    <div class="nexora-memory-map-title">
        ONE-PAGE MEMORY MAP
    </div>
    <div class="nexora-memory-map-center">
        Selected Chapter
    </div>
    <div class="nexora-memory-map-branches">
        <div>CORE CONCEPTS</div>
        <div>KEY TERMS</div>
        <div>EXAM FOCUS</div>
        <div>QUICK REVISION</div>
    </div>
</div>`;
                }

                return keepHtml(memoryHtml);
            }

            const rendered =
                renderDiagramMarker(marker);

            return keepHtml(
                rendered || ""
            );
        }
    );

    /*
     * Also catch memory-map markers carrying a title.
     */
    source = source.replace(
        /^\s*\[\[NEXORA_DIAGRAM:memory-map(?:\|([^\]\r\n]+)|\s+([^\]\r\n]+))?\]\]?\s*$/gim,
        function (_, pipeTitle, spaceTitle) {
            const title = String(
                pipeTitle ||
                spaceTitle ||
                "Selected Chapter"
            )
                .replace(/[\[\]]/g, "")
                .trim() || "Selected Chapter";

            let memoryHtml = "";

            if (
                typeof nexoraV23MemoryMapSvg === "function"
            ) {
                memoryHtml =
                    nexoraV23MemoryMapSvg(title);
            } else {
                const escaped =
                    title
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;");

                memoryHtml = `
<div class="nexora-memory-map">
    <div class="nexora-memory-map-title">
        ONE-PAGE MEMORY MAP
    </div>
    <div class="nexora-memory-map-center">
        ${escaped}
    </div>
    <div class="nexora-memory-map-branches">
        <div>CORE CONCEPTS</div>
        <div>KEY TERMS</div>
        <div>EXAM FOCUS</div>
        <div>QUICK REVISION</div>
    </div>
</div>`;
            }

            return keepHtml(memoryHtml);
        }
    );

    /*
     * Run the existing markdown conversion for ordinary notes.
     */
    let html =
        markdownToHtmlLegacy(source);

    /*
     * Restore trusted SVG/HTML after markdown conversion.
     */
    trusted.forEach(function (trustedHtml, index) {
        const token =
            "NEXORA_TRUSTED_HTML_" +
            index +
            "_END";

        html = html.split(token).join(
            trustedHtml
        );
    });

    /*
     * Final cleanup of any accidental literal diagram markers.
     */
    html = String(html || "")
        .replace(
            /\[\[NEXORA_DIAGRAM:[a-z0-9_-]+\]\]?/gi,
            ""
        )
        .replace(
            /\bclass\s*=\s*["']nexora-memory-box["']\s*>/gi,
            ""
        );

    return html;
}

/* ============================================================
   END TRUSTED VISUAL HTML BRIDGE
   ============================================================ */


async function renderShortNotesPdf({
    notes,
    title = "NEXORA Short Notes",
    language = "Hindi"
}) {
    if (!notes || !String(notes).trim()) {
        throw new Error(
            "Cannot create PDF from empty notes."
        );
    }

    /* -------------------------------------------------------
       FONT DIRECTORY
    ------------------------------------------------------- */

    const fontDir = path.join(
        __dirname,
        "..",
        "fonts"
    );

    const regularFontPath = path.join(
        fontDir,
        "NotoSansDevanagari-Regular.ttf"
    );

    if (!fs.existsSync(regularFontPath)) {
        throw new Error(
            `Hindi font not found: ${regularFontPath}`
        );
    }

    const regularFontBase64 = fs
        .readFileSync(regularFontPath)
        .toString("base64");

    /* -------------------------------------------------------
       OPTIONAL BOLD FONT
    ------------------------------------------------------- */

    const possibleBoldFonts = [
        "NotoSansDevanagari-Bold.ttf",
        "NotoSansDevanagari-SemiBold.ttf"
    ];

    let boldFontBase64 =
        regularFontBase64;

    for (const fileName of possibleBoldFonts) {
        const candidate = path.join(
            fontDir,
            fileName
        );

        if (fs.existsSync(candidate)) {
            boldFontBase64 = fs
                .readFileSync(candidate)
                .toString("base64");

            break;
        }
    }

    /* -------------------------------------------------------
       CONTENT
    ------------------------------------------------------- */

    const contentHtml = markdownToHtml(notes);

    const safeLanguage = String(
        language || "Hindi"
    ).toLowerCase();

    let htmlLang = "en";

    if (safeLanguage === "hindi") {
        htmlLang = "hi";
    } else if (safeLanguage === "hinglish") {
        htmlLang = "hi-Latn";
    }

    /* -------------------------------------------------------
       HTML DOCUMENT
    ------------------------------------------------------- */

    const html = `
<!DOCTYPE html>
<html lang="${htmlLang}">
<head>

<meta charset="UTF-8">

<meta
    http-equiv="Content-Type"
    content="text/html; charset=UTF-8"
/>

<style>
.nexora-correct-answer,
.correct-answer,
.answer-correct,
.mcq-correct-answer {
  color: #b00000 !important;
  font-weight: 700 !important;
}


/* =======================================================
   FONTS
   ======================================================= */

@font-face {
    font-family: "NEXORA-Devanagari";

    src:
        url(data:font/ttf;base64,${regularFontBase64})
        format("truetype");

    font-weight: 400;
    font-style: normal;
    font-display: block;
}

@font-face {
    font-family: "NEXORA-Devanagari";

    src:
        url(data:font/ttf;base64,${boldFontBase64})
        format("truetype");

    font-weight: 700;
    font-style: normal;
    font-display: block;
}

/* =======================================================
   GLOBAL
   ======================================================= */

* {
    box-sizing: border-box;
}

html {
    font-family:
        "NEXORA-Devanagari",
        sans-serif;
}

body {
    margin: 0;
    padding: 0;

/* =======================================================
   NEXORA FINAL DIAGRAM + MEMORY MAP CSS
   ======================================================= */

.nexora-final-diagram-fix {
    display: block;
}

.diagram-card {
    display: block !important;
    width: 100% !important;
    margin: 14px 0 20px 0 !important;
    padding: 10px !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    overflow: visible !important;
    background: #ffffff !important;
}

.diagram-label {
    display: block !important;
    font-weight: 700 !important;
    font-size: 10pt !important;
    margin-bottom: 7px !important;
    color: #b00020 !important;
    text-transform: uppercase;
}

.diagram-content {
    display: block !important;
    width: 100% !important;
    min-height: 120px !important;
    overflow: visible !important;
}

.nexora-svg {
    display: block !important;
    width: 100% !important;
    height: auto !important;
    max-width: 100% !important;
    overflow: visible !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
}

.nexora-memory-map,
.nexora-memory-map * {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
}

.nexora-memory-map {
    display: block !important;
    width: 100% !important;
    margin: 12px 0 !important;
    padding: 14px !important;
    overflow: visible !important;
    background: #ffffff !important;
}

.nexora-memory-map-title {
    display: block !important;
    font-weight: 700 !important;
    font-size: 17pt !important;
    margin-bottom: 12px !important;
    text-align: center !important;
    color: #b00020 !important;
}

.nexora-memory-map-center,
.nexora-memory-map-branches {
    display: block !important;
    visibility: visible !important;
}


    background: #ffffff;

    color: #202124;

    font-family:
        "NEXORA-Devanagari",
        "Noto Sans Devanagari",
        sans-serif;

    font-size: 13.5pt;

    line-height: 1.78;

    -webkit-font-smoothing: antialiased;

    text-rendering: optimizeLegibility;

    font-feature-settings:
        "kern" 1,
        "liga" 1;
}

/* =======================================================
   TITLE
   ======================================================= */

.document-title {
    margin:
        0
        0
        20px;

    padding:
        0
        0
        12px;

    text-align: center;

    font-size: 23pt;

    line-height: 1.35;

    font-weight: 700;

    color: #c00000;

    page-break-after: avoid;
}

/* =======================================================
   CHAPTER TITLE
   ======================================================= */

.chapter-title {
    margin:
        10px
        0
        18px;

    padding:
        10px
        12px;

    border-bottom:
        2px
        solid
        #333333;

    color: #c00000;

    font-size: 18pt;

    line-height: 1.45;

    font-weight: 700;

    page-break-after: avoid;
}

/* =======================================================
   MARKDOWN HEADINGS
   ======================================================= */

.markdown-heading {
    color: #c00000;

    font-weight: 700;

    page-break-after: avoid;
}

.markdown-heading.level-1 {
    font-size: 17pt;

    margin:
        18px
        0
        10px;
}

.markdown-heading.level-2 {
    font-size: 15pt;

    margin:
        16px
        0
        8px;
}

.markdown-heading.level-3 {
    font-size: 13.5pt;

    margin:
        13px
        0
        7px;
}

/* =======================================================
   SECTION HEADING
   ======================================================= */

.section-heading {
    margin:
        20px
        0
        9px;

    padding:
        0
        0
        5px;

    color: #c00000;

    font-size: 15pt;

    line-height: 1.5;

    font-weight: 700;

    border-bottom:
        1px
        solid
        #b7b7b7;

    page-break-after: avoid;
}

/* =======================================================
   META
   ======================================================= */

.meta-line {
    margin:
        2px
        0;

    padding:
        3px
        7px;

    font-size: 12pt;

    line-height: 1.55;

    color: #3f3f46;

    page-break-inside: avoid;
}

/* =======================================================
   PARAGRAPHS
   ======================================================= */

.content-paragraph {
    margin:
        0
        0
        8px;

    padding: 0;

    text-align: justify;

    line-height: 1.72;

    page-break-inside: auto;
}

/* =======================================================
   LISTS
   ======================================================= */

ul,
ol {
    margin:
        5px
        0
        10px;

    padding-left: 29px;

    line-height: 1.65;
}

li {
    margin:
        0
        0
        4px;

    padding-left: 2px;
}

/* =======================================================
   QUESTION
   ======================================================= */

.question-line {
    margin:
        12px
        0
        6px;

    padding:
        7px
        9px;

    border-left:
        4px
        solid
        #c00000;

    background:
        #fafafa;

    font-weight:
        700;

    line-height:
        1.65;

    page-break-inside:
        avoid;

    color:
        #b00000;
}

.question-number {
    color:
        #c00000;

    font-weight:
        700;

    margin-right:
        5px;
}

.question-text {
    color:
        #c00000;

    font-weight:
        700;
}

/* =======================================================
   OPTIONS
   ======================================================= */

.option-line {
    margin:
        2px
        0
        3px
        14px;

    padding:
        2px
        6px;

    line-height: 1.6;

    page-break-inside: avoid;
}

/* =======================================================
   ANSWER
   ======================================================= */

.answer-box {
    margin:
        7px
        0
        6px;

    padding:
        7px
        10px;

    border-left:
        4px
        solid
        #c00000;

    background:
        #f6f6f6;

    font-weight: 400;

    color:
        #000000;

    line-height: 1.65;

    page-break-inside: avoid;
}

.answer-label {
    color:
        #c00000;

    font-weight:
        700;
}

.answer-text {
    color:
        #c00000;

    font-weight:
        400;
}

/* =======================================================
   MODEL ANSWER
   ======================================================= */

.model-answer-label {
    margin:
        9px
        0
        5px;

    padding:
        5px
        8px;

    border-left:
        4px
        solid
        #c00000;

    color:
        #c00000;

    font-weight:
        700;

    line-height:
        1.5;

    page-break-inside:
        avoid;
}

/* =======================================================
   ANSWER TOPIC / SUBHEADING
   ======================================================= */

.answer-topic {
    margin:
        10px
        0
        4px;

    color:
        #c00000;

    font-weight:
        700;

    line-height:
        1.5;

    page-break-after:
        avoid;
}

/* =======================================================
   EXPLANATION
   ======================================================= */

.explanation-box {
    margin:
        4px
        0
        10px
        12px;

    padding:
        6px
        10px;

    border-left:
        3px
        solid
        #777777;

    background:
        #fafafa;

    line-height: 1.65;

    page-break-inside: avoid;
}

/* =======================================================
   DIAGRAM
   ======================================================= */

.mains-key-point { color: #c62828; font-weight: 700; }

.diagram-card {
    width: 100%;

    margin:
        14px
        0
        18px;

    padding:
        10px
        12px;

    border:
        1px
        solid
        #c9c9c9;

    border-radius:
        7px;

    background:
        #ffffff;

    page-break-inside: avoid;
}

.diagram-label,
.visual-label {
    margin:
        0
        0
        8px;

    font-size: 9pt;

    font-weight: 700;

    letter-spacing:
        0.4px;

    color:
        #555555;

    text-transform:
        uppercase;
}

.diagram-content {
    width: 100%;

    overflow: visible;
}

.diagram-content svg {
    display: block;

    width: 100%;

    height: auto;

    max-width: 100%;

    overflow: visible;
}

.diagram-content svg text,
.diagram-content svg tspan {
    font-family:
        "NEXORA-Devanagari",
        "Noto Sans Devanagari",
        sans-serif;
}

/* =======================================================
   FALLBACK VISUALS
   ======================================================= */

.diagram-placeholder,
.flow-box,
.structure-box {
    margin:
        12px
        0
        16px;

    padding:
        11px
        13px;

    border:
        1px
        solid
        #bdbdbd;

    border-radius:
        6px;

    background:
        #fafafa;

    page-break-inside: avoid;
}

.diagram-placeholder {
    border-left:
        4px
        solid
        #c00000;
}

.flow-box {
    border-left:
        4px
        solid
        #555555;
}

.structure-box {
    border-left:
        4px
        solid
        #777777;
}

/* =======================================================
   TABLE
   ======================================================= */

.table-row {
    display: grid;

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(120px, 1fr)
        );

    border:
        1px
        solid
        #cfcfcf;

    margin:
        4px
        0;

    page-break-inside: avoid;
}

.table-cell {
    padding:
        6px
        8px;

    border-right:
        1px
        solid
        #d5d5d5;

    border-bottom:
        1px
        solid
        #d5d5d5;

    line-height: 1.5;
}

/* =======================================================
   INLINE CODE
   ======================================================= */

code {
    font-family:
        "NEXORA-Devanagari",
        monospace;

    font-size: 0.95em;

    padding:
        1px
        4px;

    border-radius:
        3px;

    background:
        #eeeeee;
}

/* =======================================================
   SPACING
   ======================================================= */

.small-spacer {
    height: 4px;
}

.section-rule {
    height: 1px;

    margin:
        16px
        0;

    border-top:
        1px
        solid
        #bdbdbd;
}

/* =======================================================
   PRINT
   ======================================================= */

@page {
    size: A4;

    margin:
        17mm
        16mm
        18mm
        16mm;
}

@media print {

    body {
        background:
            #ffffff;
    }

    h1,
    h2,
    h3,
    .question-line,
    .answer-box,
    .explanation-box,
    .diagram-card,
    .diagram-placeholder,
    .flow-box,
    .structure-box {
        break-inside: avoid;
    }

    h1,
    h2,
    h3 {
        break-after: avoid;
    }

    p,
    li {
        orphans: 3;
        widows: 3;
    }
}


/* NEXORA FINAL MCQ DISPLAY */
.mcq-card .question-line,
.mcq-card .mcq-question,
.mcq-card .question-text,
.mcq .question-line,
.mcq .mcq-question,
.prelims .question-line,
.prelims .mcq-question {
  color: #b00000 !important;
  font-size: 15.5pt !important;
  font-weight: 700 !important;
  line-height: 1.45 !important;
  display: block !important;
}
.mcq-card .correct-answer,
.mcq-card .nexora-correct-answer,
.mcq .correct-answer,
.mcq .nexora-correct-answer {
  color: #b00000 !important;
  font-weight: 700 !important;
}

</style>

</head>

<body>

${contentHtml}

</body>
</html>
`;

    /* =====================================================
       PUPPETEER
       ===================================================== */

    const browser = await puppeteer.launch({
        headless: true,

        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--font-render-hinting=none"
        ]
    });

    try {
        const page = await browser.newPage();

        await page.setViewport({
            width: 1240,
            height: 1754,
            deviceScaleFactor: 1
        });

        await page.setContent(html, {
            waitUntil: "networkidle0"
        });

        /* -------------------------------------------------
           FONT READY
        ------------------------------------------------- */

        await page.evaluate(async () => {
            if (document.fonts) {
                await document.fonts.ready;

                await Promise.all([
                    document.fonts.load(
                        '400 16px "NEXORA-Devanagari"'
                    ),
                    document.fonts.load(
                        '700 16px "NEXORA-Devanagari"'
                    )
                ]);
            }
        });

        /* -------------------------------------------------
           PDF
        ------------------------------------------------- */

        const pdfBuffer = await page.pdf({
            format: "A4",

            printBackground: true,

            preferCSSPageSize: true,

            displayHeaderFooter: false,

            margin: {
                top: "17mm",
                right: "16mm",
                bottom: "18mm",
                left: "16mm"
            }
        });

        return pdfBuffer;

    } finally {
        await browser.close();
    }
}

/* =========================================================
   EXPORT
   ========================================================= */



/* ============================================================
   NEXORA PDF FINAL TEXT SAFETY
   ============================================================ */

function nexoraPdfCleanText(value) {
    if (value === null || value === undefined) return "";

    let s = String(value);

    s = s.replace(/<!--[\s\S]*?-->/g, "");
    s = s.replace(/\$[0-9]+/g, "");
    s = s.replace(/<\s*br\s*\/?\s*>/gi, "\n");
    s = s.replace(/<[^>]+>/g, "");

    s = s
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'");

    s = s.replace(/\*\*/g, "");
    s = s.replace(/__+/g, "");
    s = s.replace(/\[object Object\]/gi, "");
    s = s.replace(/\bObject\s+Object\b/gi, "");

    s = s.replace(/[ \t]+\n/g, "\n");
    s = s.replace(/\n{3,}/g, "\n\n");

    return s.trim();
}


module.exports = {
    renderShortNotesPdf
};

/* NEXORA_RED_HEADING_POLICY_V13 */
function nexoraV13RedHeading(line) {
  const text = String(line || "").trim();

  if (!text) return false;

  return (
    /^#{1,6}\s+/.test(text) ||
    /^(CHAPTER OVERVIEW|NCERT CORE CONCEPTS|KEY DEFINITIONS|IMPORTANT TERMS|DETAILED NOTES|CLASSIFICATION|PROCESSES|CAUSES AND EFFECTS|FORMULAS|IMPORTANT FACTS|DATES|TIMELINE|COMPARISONS|DIAGRAMS|MAPS|FLOWCHARTS|EXAM FOCUS|PRELIMS|OBJECTIVE MCQS|MAINS|DESCRIPTIVE QUESTIONS|MODEL ANSWERS|AUTHENTIC PYQS|LAST-MINUTE REVISION|ONE-PAGE MEMORY MAP)/i.test(text) ||
    /^(अध्याय|मुख्य अवधारणाएं|परिभाषाएं|महत्वपूर्ण शब्द|विस्तृत नोट्स|वर्गीकरण|प्रक्रिया|कारण|प्रभाव|महत्वपूर्ण तथ्य|तिथियां|तुलना|आरेख|मानचित्र|परीक्षा|प्रश्न|मॉडल उत्तर|प्रामाणिक PYQ|त्वरित पुनरावृत्ति)/i.test(text)
  );
}


/* NEXORA_FINAL_MEMORY_MAP_RENDERER_V23 */

/*
 * Render the memory-map marker as a visual chapter map.
 * This intentionally stays inside the existing PDF pipeline
 * and does not replace the professional PDF renderer.
 */

function nexoraV23MemoryMapSvg(title) {
    const safe = String(title || 'Selected Chapter')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    return [
        '<div class="nexora-memory-map">',
        '<div class="nexora-memory-map-title">ONE-PAGE MEMORY MAP</div>',
        '<div class="nexora-memory-map-center">',
        safe,
        '</div>',
        '<div class="nexora-memory-map-grid">',
        '<div class="nexora-memory-box"><b>CORE</b><br/>Concepts<br/>Definitions<br/>Terms</div>',
        '<div class="nexora-memory-box"><b>CAUSE → EFFECT</b><br/>Causes<br/>Processes<br/>Effects</div>',
        '<div class="nexora-memory-box"><b>EXAM FOCUS</b><br/>Facts<br/>Comparisons<br/>Key Points</div>',
        '<div class="nexora-memory-box"><b>REVISION</b><br/>Dates<br/>Keywords<br/>Quick Recall</div>',
        '</div>',
        '<div class="nexora-memory-map-footer">',
        'NEXORA • Chapter-specific visual revision map',
        '</div>',
        '</div>'
    ].join('');
}

function nexoraV23RenderMemoryMapMarkers(html) {
    if (!html) return html;

    return String(html).replace(
        /\[\[NEXORA_DIAGRAM:memory-map(?:\|([^\]]+))?\]\]/gi,
        function(_, title) {
            return nexoraV23MemoryMapSvg(
                title || 'Selected Chapter'
            );
        }
    );
}

/*
 * If the current PDF file already has a markdown/html conversion
 * function, wrap the final HTML before PDF creation.
 */
if (
    typeof markdownToHtml === 'function' &&
    !markdownToHtml.__NEXORA_V23_WRAPPED
) {
    const nexoraOriginalMarkdownToHtmlV23 =
        markdownToHtml;

    markdownToHtml = function(text) {
        const html =
            nexoraOriginalMarkdownToHtmlV23(text);

        return nexoraV23RenderMemoryMapMarkers(html);
    };

    markdownToHtml.__NEXORA_V23_WRAPPED = true;
}

/* END NEXORA_FINAL_MEMORY_MAP_RENDERER_V23 */



/* NEXORA_FINAL_PDF_MAINS_MEMORY_V25 */
(function () {
    function nexoraV25PdfNormalize(text) {
        let out = String(text == null ? "" : text);

        /*
         * Fix the exact broken marker seen in generated PDFs.
         */
        out = out.replace(
            /\[\[NEXORA_DIAGRAM:memory-map\s*\[object Object\]\]\]/gi,
            "[[NEXORA_DIAGRAM:memory-map]]"
        );

        out = out.replace(
            /\[\[NEXORA_DIAGRAM:memory-map\s+Object\]\]/gi,
            "[[NEXORA_DIAGRAM:memory-map]]"
        );

        return out;
    }

    /*
     * This helper is intentionally exposed so the existing renderer can
     * normalize notes before converting them to HTML/PDF.
     */
    global.NEXORA_V25_PDF_NORMALIZE = nexoraV25PdfNormalize;

    console.log("NEXORA FINAL PDF MAINS + MEMORY MAP V25: ACTIVE");
})();



/* NEXORA_PDF_OBJECT_MEMORY_FINAL_V26 */
(function () {

    function nexoraPdfV26Normalize(text) {

        let out = String(text == null ? "" : text);

        out = out.replace(
            /\[object Object\]/gi,
            ""
        );

        out = out.replace(
            /\[\[NEXORA_DIAGRAM:memory-map\s*\[object Object\]\]\]/gi,
            "[[NEXORA_DIAGRAM:memory-map]]"
        );

        out = out.replace(
            /\[\[NEXORA_DIAGRAM:memory-map\s+Object\]\]/gi,
            "[[NEXORA_DIAGRAM:memory-map]]"
        );

        out = out.replace(
            /\n{3,}/g,
            "\n\n"
        );

        return out.trim();
    }

    global.NEXORA_PDF_V26_NORMALIZE =
        nexoraPdfV26Normalize;

    console.log(
        "NEXORA PDF OBJECT + MEMORY MAP V26: ACTIVE"
    );

})();



/* =========================================================
   NEXORA_PDF_MEMORY_MAP_OBJECT_GUARD_V27
   Final PDF-side protection against malformed markers.
   ========================================================= */

(function NEXORA_PDF_MEMORY_MAP_OBJECT_GUARD_V27() {

    function nexoraV27PdfNormalizeMemoryMap(value) {
        let s = String(value == null ? "" : value);

        s = s.replace(/\[object Object\]/gi, "");

        s = s.replace(
            /\[\[NEXORA_DIAGRAM:memory-map[^\]]*\]\]/gi,
            function(match) {
                const titleMatch =
                    match.match(
                        /\[\[NEXORA_DIAGRAM:memory-map\|([^\]]+)\]\]/i
                    );

                const title =
                    titleMatch &&
                    titleMatch[1] &&
                    titleMatch[1].trim()
                        ? titleMatch[1].trim()
                        : "Selected Chapter";

                return (
                    "[[NEXORA_DIAGRAM:memory-map|" +
                    title.replace(/[\[\]]/g, "") +
                    "]]"
                );
            }
        );

        return s;
    }

    global.NEXORA_V27_PDF_NORMALIZE_MEMORY_MAP =
        nexoraV27PdfNormalizeMemoryMap;

    console.log(
        "NEXORA PDF MEMORY MAP OBJECT GUARD V27: ACTIVE"
    );

})();


/* ============================================================
   NEXORA_UNIVERSAL_RED_NOTES_RULE_V1
   Renderer marker / metadata.
   Existing PDF renderer remains untouched.
   ============================================================ */

const NEXORA_UNIVERSAL_RED_HEADINGS = [
  "CHAPTER OVERVIEW",
  "NCERT CORE CONCEPTS",
  "CORE CONCEPTS",
  "IMPORTANT DEFINITIONS",
  "IMPORTANT TERMS",
  "DETAILED NOTES",
  "CLASSIFICATION",
  "PROCESSES",
  "CAUSE-EFFECT",
  "FORMULAS",
  "MAP",
  "DIAGRAM",
  "VISUALS",
  "EXAM FOCUS",
  "PRACTICE MCQS",
  "AUTHENTIC PYQS",
  "PRACTICE QUESTIONS",
  "MAINS",
  "DESCRIPTIVE QUESTIONS",
  "QUICK REVISION"
];


/* NEXORA ABSOLUTE MCQ APPLY V5 */
(function(){
  if(typeof globalThis.nexoraAbsoluteMcqSerial!=="function") return;
})();
