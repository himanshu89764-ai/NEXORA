
/* NEXORA UNIVERSAL CURATED FRONTEND */
window.NEXORA_UNIVERSAL_CURATED_FRONTEND = {
  exams: [
    "UPSC","SSC","Banking","Railway","Defence","Teaching",
    "JEE","NEET","CUET","UGC-NET","State PSC","State Exams",
    "Police","Law","Management","Agriculture","School Exam",
    "College / University","Other"
  ],
  languages: ["English","Hindi"]
};


// =================================
// DOM ELEMENTS

// =================================

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const answerTitle =
    document.getElementById("answerTitle");

const answerText =
    document.getElementById("answerText");

const answerDetails =
    document.getElementById("answerDetails");

const officialSource =
    document.getElementById("officialSource");

const officialDescription =
    document.getElementById("officialDescription");

const researchSource =
    document.getElementById("researchSource");

const researchDescription =
    document.getElementById("researchDescription");

const actionTitle =
    document.getElementById("actionTitle");

const actionDescription =
    document.getElementById("actionDescription");

const roadmapButton =
    document.getElementById("roadmapButton");

const verifySourcesButton =
    document.getElementById("verifySourcesButton");



// =================================
// NEXORA USER

// =================================

function getNexoraUserId() {

    const userId =
        localStorage.getItem("nexoraUserId");

    return userId || null;
}



// =================================
// SEARCH BUTTON

// =================================

searchButton.addEventListener(
    "click",
    performSearch
);



// =================================
// ENTER KEY SEARCH

// =================================

searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            performSearch();

        }

    }
);



// =================================
// MAIN SEARCH

// =================================

async function performSearch() {

    const query =
        searchInput.value.trim();


    if (query === "") {

        alert("Please enter a question.");

        return;

    }


    // Save local history

    saveSearchHistory(query);

    // Always show the exact question searched by the user
    answerTitle.textContent = query;


    // Loading

    answerTitle.textContent =
        "NEXORA is searching...";

    answerText.textContent =
        "Searching the web and processing your question...";

    answerDetails.textContent =
        "Connecting to NEXORA AI and Tavily Web Search.";


    // Run AI + Search

    


await Promise.all([

    askNexoraBackend(query),

    searchWeb(query),

    searchBestVideo(query)

]);

}



// =================================
// ASK NEXORA

// =================================


// =================================
// SMART NEXORA ANSWER FORMATTER
// =================================

function formatNexoraAnswer(text) {
    let value = String(text || "").trim();
    if (!value) return "";

    // CLEAN MARKDOWN SYMBOLS - NEVER SHOW RAW MARKDOWN TO USER
    value = value
        .replace(/\\\*\\\*/g, "**")
        .replace(/\\\*/g, "*")
        .replace(/\\#/g, "#");

    // Force every markdown heading onto its own line.
    value = value.replace(
        /([^\\n])\\s+(#{1,3})\\s+/g,
        "$1\\n$2 "
    );

    // Clean heading text before rendering.
    value = value.replace(
        /(^|\\n)\\s*#{1,3}\\s+([^\\n]+?)(?=\\n|$)/gm,
        "$1### $2"
    );

    // Remove markdown bullet/star symbols from list lines.
    value = value.replace(
        /(^|\\n)\\s*[•*+-]\\s+/gm,
        "$1- "
    );

    // Remove NEXORA internal visual instructions.
    value = value.replace(
        /VISUAL\\?_?HINT\s*:\s*\{[\s\S]*?\}/gi,
        ""
    );

    // Normalize escaped markdown returned by AI.
    value = value
        .replace(/\\\*\\\*/g, "**")
        .replace(/\\`/g, "`")
        .replace(/\\#/g, "#");

    // Protect fenced code before formatting.
    const codeBlocks = [];
    value = value.replace(
        /```([a-zA-Z0-9_-]*)\s*([\s\S]*?)```/g,
        function(_, language, code) {
            const i = codeBlocks.length;
            codeBlocks.push(
                '<div class="nexora-code-box">' +
                (language
                    ? '<div class="nexora-code-lang">' +
                      language.toUpperCase() +
                      '</div>'
                    : '') +
                '<pre><code>' +
                code.trim()
                    .replace(/&/g,"&amp;")
                    .replace(/</g,"&lt;")
                    .replace(/>/g,"&gt;") +
                '</code></pre></div>'
            );
            return "\n@@NEXORA_CODE_" + i + "@@\n";
        }
    );

    // FINAL MARKDOWN SYMBOL CLEANUP
    // Remove escaped Markdown artifacts before rendering.
    value = value
        .replace(/\\\*\\\*/g, "")
        .replace(/\\\*/g, "")
        .replace(/\*\*/g, "")
        .replace(/\\#/g, "")
        .replace(/\\\$/g, "$")
        .replace(/\$\s*([A-Za-z])/g, "$1");

    // Remove LaTeX-style math wrappers when they are only used
    // for ordinary text such as JDK \supset JRE \supset JVM.
    value = value
        .replace(/\\supset/g, "→")
        .replace(/\\rightarrow/g, "→")
        .replace(/\\to/g, "→");

    // Escape normal HTML.
    value = value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // IMPORTANT:
    // Force every markdown heading to start on a new line,
    // even when Gemini places it immediately after a sentence.
    value = value.replace(
        /([^\n])\s+(#{1,3})\s+/g,
        "$1\n$2 "
    );

    // Also handle markdown headings after separators.
    value = value.replace(
        /---+\s*(#{1,3})\s+/g,
        "\n$1 "
    );

    // UNIVERSAL H1/H2/H3 HEADINGS.
    value = value.replace(
        /(^|\n)[ \t]*###\s+([^\n]+?)[ \t]*(?=\n|$)/g,
        '$1<div class="nexora-section-heading nexora-heading-small">$2</div>'
    );

    value = value.replace(
        /(^|\n)[ \t]*##\s+([^\n]+?)[ \t]*(?=\n|$)/g,
        '$1<div class="nexora-section-heading">$2</div>'
    );

    value = value.replace(
        /(^|\n)[ \t]*#\s+([^\n]+?)[ \t]*(?=\n|$)/g,
        '$1<div class="nexora-section-heading">$2</div>'
    );

    // Universal standalone bold headings.
    value = value.replace(
        /(^|\n)[ \t]*\*\*([^*\n]{2,150})\*\*[ \t]*(?=\n|$)/g,
        '$1<div class="nexora-section-heading">$2</div>'
    );

    // Common "Heading:" format.
    value = value.replace(
        /(^|\n)[ \t]*([A-Z][A-Za-z0-9\u0900-\u097F ,&()'’\-]{2,100}):[ \t]*(?=\n|$)/g,
        '$1<div class="nexora-section-heading">$2</div>'
    );

    // Bold inside normal paragraphs.
    value = value.replace(
        /\*\*(.+?)\*\*/g,
        "<strong>$1</strong>"
    );

    // Numbered lists.
    value = value.replace(
        /(^|\n)[ \t]*(\d+)\.\s+(.+)$/gm,
        '$1<div class="nexora-number-item">' +
        '<span class="nexora-number">$2</span>' +
        '<span class="nexora-list-content">$3</span>' +
        '</div>'
    );

    // Bullet lists.
    value = value.replace(
        /(^|\n)[ \t]*[-*]\s+(.+)$/gm,
        '$1<div class="nexora-bullet-item">' +
        '<span class="nexora-bullet">•</span>' +
        '<span class="nexora-list-content">$2</span>' +
        '</div>'
    );

    // Horizontal separators.
    value = value.replace(
        /(^|\n)[ \t]*---+[ \t]*(?=\n|$)/g,
        '$1<div class="nexora-divider"></div>'
    );

    // Paragraph spacing.
    value = value.replace(/\n{2,}/g,
        '<div class="nexora-paragraph-gap"></div>'
    );

    value = value.replace(/\n/g, "<br>");

    // FINAL DISPLAY SANITIZER
    value = value
        .replace(/#{1,3}(?=\s)/g, "")
        .replace(/(^|<br>)\s*[*+-]\s+/g, "$1")
        .replace(/\\\*/g, "")
        .replace(/\*\*/g, "")
        .replace(/\\#/g, "")
        .replace(/\\\$/g, "$")
        .replace(/\\supset/g, "→")
        .replace(/\\rightarrow/g, "→");


    // Restore code.
    codeBlocks.forEach(function(block, i) {
        value = value.replace(
            "@@NEXORA_CODE_" + i + "@@",
            block
        );
    });

    return value;
}

function displayBestVideo(video) {

    const videoSection =
        document.getElementById("bestVideoSection");

    const videoTitle =
        document.getElementById("bestVideoTitle");

    const videoDescription =
        document.getElementById("bestVideoDescription");

    const videoLink =
        document.getElementById("bestVideoLink");


    if (
        !videoSection ||
        !videoTitle ||
        !videoDescription ||
        !videoLink
    ) {

        console.error(
            "Best Video elements not found."
        );

        return;

    }


    videoTitle.textContent =
        video.title ||
        "Best Video";


    videoDescription.textContent =
        video.content
            ? video.content.slice(0, 180)
            : "A relevant video for this topic.";


    videoLink.href =
        video.url || "#";


    videoSection.style.display =
        "block";

}

// =================================
// NEXORA UNIVERSAL VISUALS
// =================================

function removeNexoraVisuals() {

    const old =
        document.getElementById(
            "nexoraUniversalVisuals"
        );

    if (old) {
        old.remove();
    }
}


async function loadNexoraVisuals(
    query,
    caption
) {

    try {

        removeNexoraVisuals();

        const base =
            (
                window.location.hostname === "localhost" ||
                window.location.hostname === "127.0.0.1"
            )
                ? "http://localhost:5001"
                : "https://nexora-o8wi.onrender.com";

        const response =
            await fetch(
                base +
                "/api/visuals?q=" +
                encodeURIComponent(query)
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success ||
            !Array.isArray(data.visuals) ||
            data.visuals.length === 0
        ) {
            return;
        }

        const section =
            document.createElement("section");

        section.id =
            "nexoraUniversalVisuals";

        section.style.marginTop = "18px";
        section.style.padding = "16px";
        section.style.borderRadius = "14px";
        section.style.border = "1px solid #e5e7eb";
        section.style.background = "#ffffff";

        const heading =
            document.createElement("h3");

        heading.textContent =
            "Relevant Visual";

        heading.style.margin =
            "0 0 6px 0";

        section.appendChild(heading);

        if (caption) {

            const captionEl =
                document.createElement("div");

            captionEl.textContent =
                caption;

            captionEl.style.marginBottom =
                "12px";

            captionEl.style.fontSize =
                "14px";

            captionEl.style.opacity =
                "0.8";

            section.appendChild(captionEl);
        }

        const grid =
            document.createElement("div");

        grid.style.display =
            "grid";

        grid.style.gridTemplateColumns =
            "repeat(auto-fit, minmax(180px, 1fr))";

        grid.style.gap =
            "12px";

        data.visuals.forEach(
            visual => {

                const card =
                    document.createElement("div");

                card.style.border =
                    "1px solid #e5e7eb";

                card.style.borderRadius =
                    "10px";

                card.style.overflow =
                    "hidden";

                card.style.background =
                    "#f9fafb";

                const img =
                    document.createElement("img");

                img.src =
                    visual.url;

                img.alt =
                    visual.title ||
                    query;

                img.loading =
                    "lazy";

                img.style.width =
                    "100%";

                img.style.height =
                    "180px";

                img.style.objectFit =
                    "contain";

                img.style.display =
                    "block";

                card.appendChild(img);

                const label =
                    document.createElement("div");

                label.textContent =
                    visual.title ||
                    "Educational visual";

                label.style.padding =
                    "8px";

                label.style.fontSize =
                    "12px";

                card.appendChild(label);

                if (visual.sourceUrl) {

                    const link =
                        document.createElement("a");

                    link.href =
                        visual.sourceUrl;

                    link.target =
                        "_blank";

                    link.rel =
                        "noopener noreferrer";

                    link.textContent =
                        "Source";

                    link.style.display =
                        "block";

                    link.style.padding =
                        "0 8px 8px";

                    link.style.fontSize =
                        "12px";

                    card.appendChild(link);
                }

                grid.appendChild(card);
            }
        );

        section.appendChild(grid);

        const answerContainer =
            document.getElementById(
                "answerText"
            )?.parentElement;

        if (answerContainer) {
            answerContainer.after(section);
        }

    } catch (error) {

        console.warn(
            "NEXORA visual loading failed:",
            error
        );
    }
}


// =================================
// TAVILY WEB SEARCH

// =================================

async function searchWeb(query) {

    try {

        const userId =
            getNexoraUserId();


        const response =
            await fetch(

                (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5001"
    : "https://nexora-o8wi.onrender.com") + "/api/search?q=" +

                encodeURIComponent(query) +

                "&userId=" +

                encodeURIComponent(userId || "")

            );


        const data =
            await response.json();


        if (!response.ok || !data.success) {

            throw new Error(

                data.message ||

                "Web search failed"

            );

        }


        console.log(
            "Tavily Results:",
            data.sources
        );


        // Display sources

        displaySources(
            data.sources || []
        );


    } catch (error) {

        console.error(
            "NEXORA Web Search Error:",
            error
        );


        showSourceError();

    }

}



// =================================
// DISPLAY SOURCES

// =================================

function displaySources(sources) {

    if (
        !sources ||
        sources.length === 0
    ) {

        officialSource.textContent =
            "No sources found";

        officialDescription.textContent =
            "NEXORA could not find web sources for this search.";

        researchSource.textContent =
            "No research sources";

        researchDescription.textContent =
            "Try a different search query.";

        return;

    }



    // =================================
    // FIRST SOURCE

    // =================================

    const first =
        sources[0];


    officialSource.textContent =
        first.title ||

        "Web Source";


    officialDescription.textContent =
        first.content ||

        first.url ||

        "No description available.";


    makeSourceClickable(
        officialSource,
        first.url
    );



    // =================================
    // SECOND SOURCE

    // =================================

    if (sources.length > 1) {

        const second =
            sources[1];


        researchSource.textContent =
            second.title ||

            "Research Source";


        researchDescription.textContent =
            second.content ||

            second.url ||

            "No description available.";


        makeSourceClickable(
            researchSource,
            second.url
        );

    }


    // Remaining sources

    addAdditionalSources(
        sources.slice(2)
    );

}



// =================================
// CLICKABLE SOURCE

// =================================

function makeSourceClickable(
    element,
    url
) {

    if (!url) {

        return;

    }


    element.style.cursor =
        "pointer";


    element.title =
        "Open source";


    element.onclick =
        function () {

            window.open(

                url,

                "_blank",

                "noopener,noreferrer"

            );

        };

}



// =================================
// ADDITIONAL SOURCES

// =================================

function addAdditionalSources(sources) {

    const sourcesSection =
        document.querySelector(
            ".sources-section"
        );


    if (!sourcesSection) {

        return;

    }


    // Remove old cards

    document
        .querySelectorAll(
            ".nexora-extra-source"
        )
        .forEach(
            card => card.remove()
        );


    sources.forEach(
        function (source) {

            const card =
                document.createElement("div");


            card.className =
                "source-card nexora-extra-source";


            const container =
                document.createElement("div");


            const type =
                document.createElement("span");


            type.className =
                "source-type";


            type.textContent =
                source.sourceType ||

                "Web Source";


            const title =
                document.createElement("h3");


            title.textContent =
                source.title ||

                "Untitled Source";


            const description =
                document.createElement("p");


            description.textContent =
                source.content ||

                source.url ||

                "No description available.";


            if (source.url) {

                title.style.cursor =
                    "pointer";


                title.title =
                    "Open source";


                title.onclick =
                    function () {

                        window.open(

                            source.url,

                            "_blank",

                            "noopener,noreferrer"

                        );

                    };

            }


            container.appendChild(type);

            container.appendChild(title);

            container.appendChild(description);

            card.appendChild(container);


            sourcesSection.appendChild(card);

        }
    );

}



// =================================
// SOURCE ERROR

// =================================

function showSourceError() {

    officialSource.textContent =
        "Web Search Unavailable";


    officialDescription.textContent =
        "NEXORA could not retrieve live web sources for this search.";


    researchSource.textContent =
        "No Research Sources";


    researchDescription.textContent =
        "The answer can still use NEXORA AI general knowledge.";

}



// =================================
// LEARNING ROADMAP

// =================================

if (roadmapButton) {

    roadmapButton.addEventListener(

        "click",

        function () {

            const topic =
                searchInput.value.trim();


            if (topic === "") {

                alert(
                    "Please search for a topic first."
                );

                return;

            }


            window.location.href =
                "roadmap.html?topic=" +

                encodeURIComponent(topic);

        }

    );

}



// =================================
// VERIFY SOURCES

// =================================

if (verifySourcesButton) {

    verifySourcesButton.addEventListener(

        "click",

        function () {

            const topic =
                searchInput.value.trim();


            if (topic === "") {

                alert(
                    "Please search for a topic first."
                );

                return;

            }


            window.location.href =
                "verify.html?topic=" +

                encodeURIComponent(topic);

        }

    );

}



// =================================
// LOCAL SEARCH HISTORY

// =================================

function saveSearchHistory(query) {

    let history =
        JSON.parse(

            localStorage.getItem(
                "nexoraSearchHistory"
            )

        ) || [];


    history.unshift(query);


    history =
        history.slice(0, 10);


    localStorage.setItem(

        "nexoraSearchHistory",

        JSON.stringify(history)

    );


    localStorage.setItem(

        "nexoraSearchCount",

        history.length

    );

}



// =================================
// DEBUG USER

// =================================

console.log(
    "NEXORA User ID:",
    getNexoraUserId()
);


// =================================
// =================================
// NEXORA SHORT NOTES
// =================================

const shortNotesClass =
    document.getElementById("shortNotesClass");

const shortNotesSubject =
    document.getElementById("shortNotesSubject");

const shortNotesBook =
    document.getElementById("shortNotesBook");

const shortNotesChapter =
    document.getElementById("shortNotesChapter");

const shortNotesExam =
    document.getElementById("shortNotesExam");

const shortNotesLanguage =
    document.getElementById("shortNotesLanguage");

const shortNotesMode =
    document.getElementById("shortNotesMode");

const shortNotesButton =
    document.getElementById("shortNotesButton");

const shortNotesStatus =
    document.getElementById("shortNotesStatus");

const shortNotesCustomFields =
    document.getElementById("shortNotesCustomFields");

const shortNotesCustomBook =
    document.getElementById("shortNotesCustomBook");

const shortNotesCustomChapter =
    document.getElementById("shortNotesCustomChapter");

let shortNotesManifest = {};

function normalizeShortNotesValue(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
}

function examMatchesBook(book, exam) {
  // UNIVERSAL ENGINE:
  // Never hide a valid book just because the selected exam
  // is new, custom, government, entrance, school or unknown.
  // Exam-specific adaptation happens in the generator.
  return true;
}

function getShortNotesClassData() {
    const classKey =
        shortNotesClass?.value || "";

    const manifestKey =
        classKey
            .toLowerCase()
            .replace(/\s+/g, "");

    return (
        shortNotesManifest[classKey] ||
        shortNotesManifest[manifestKey] ||
        null
    );
}


/* ============================================================
   NEXORA_STANDARD_BOOK_FILTER_V5

   Standard books are exam/reference books and therefore
   can be available for Classes 6-12.

   NCERT remains class-specific.
   ============================================================ */

function nexoraIsStandardBook(book) {
    return !!(
        book &&
        (
            book.standardReference === true ||
            book.sourceType === "standard_reference"
        )
    );
}

function nexoraBookHasUsableChapters(book) {
    return !!(
        book &&
        Array.isArray(book.chapters) &&
        book.chapters.length > 0
    );
}


function getShortNotesSubjectData() {
    const classData =
        getShortNotesClassData();

    const subjectKey =
        shortNotesSubject?.value || "";

    if (
        !classData ||
        !classData.subjects
    ) {
        return null;
    }

    return (
        classData.subjects[subjectKey] ||
        classData.subjects[
            subjectKey.toLowerCase()
        ] ||
        null
    );
}

function getExamFilteredBooks() {
  // UNIVERSAL:
  // All manifest books remain available for every exam.
  // The selected exam controls note style, difficulty,
  // MCQ/Mains adaptation, not book visibility.
  try {
    const books = Array.isArray(window.shortNotesBooks)
      ? window.shortNotesBooks
      : (Array.isArray(window.shortNotesManifestBooks)
          ? window.shortNotesManifestBooks
          : []);

    return books.slice();
  } catch (e) {
    console.warn("Universal book list fallback:", e);
    return [];
  }
}

async function loadShortNotesManifest() {
    try {
        const response =
            await fetch(
                "/api/short-notes/manifest"
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {
            throw new Error(
                data.message ||
                "Manifest error"
            );
        }

        shortNotesManifest =
            data.manifest || {};

        populateShortNotesBooks();

    } catch (error) {
        console.error(
            "NEXORA Short Notes Manifest Error:",
            error
        );

        if (shortNotesStatus) {
            shortNotesStatus.textContent =
                "Unable to load books.";
        }
    }
}





async function populateShortNotesBooks() {
    if (!shortNotesBook) return;

    shortNotesBook.innerHTML =
        '<option value="">Select Book</option>';

    shortNotesChapter.innerHTML =
        '<option value="">Select Chapter</option>';

    shortNotesChapter.disabled = true;

    const subjectData = getShortNotesSubjectData();

    if (!subjectData) {
        console.warn("NEXORA: No subject catalogue found");
        return;
    }

    const books = [];

    // Direct NCERT book
    if (
        subjectData.titleEn ||
        subjectData.title ||
        subjectData.name
    ) {
        books.push({
            id: subjectData.id || "",
            titleEn:
                subjectData.titleEn ||
                subjectData.title ||
                subjectData.name,
            titleHi:
                subjectData.titleHi ||
                subjectData.titleEn ||
                subjectData.title ||
                subjectData.name,
            author: "NCERT",
            chapters:
                subjectData.chapters ||
                subjectData.chapterList ||
                []
        });
    }

    // Standard/reference books
    if (Array.isArray(subjectData.books)) {
        books.push(...subjectData.books);
    } else if (
        subjectData.books &&
        typeof subjectData.books === "object"
    ) {
        books.push(...Object.values(subjectData.books));
    }

    // Deduplicate books
    const seen = new Set();

    books.forEach(book => {
        const id =
            book.id ||
            book.titleEn ||
            book.title ||
            book.name;

        if (!id || seen.has(String(id))) return;

        seen.add(String(id));

        const option = document.createElement("option");
        option.value = String(id);
        option.textContent =
            book.titleEn ||
            book.title ||
            book.name ||
            "Book";

        option.dataset.book = JSON.stringify(book);

        shortNotesBook.appendChild(option);
    });

    shortNotesBook.disabled =
        shortNotesBook.options.length <= 1;

    console.log(
        "NEXORA DIRECT BOOKS:",
        [...shortNotesBook.options]
            .slice(1)
            .map(o => o.textContent)
    );
}


function getUniversalBookAuthor(book) {
    if (!book || typeof book !== "object") {
        return "";
    }

    return String(
        book.author ||
        book.writer ||
        book.authorName ||
        book.writerName ||
        book.by ||
        ""
    ).trim();
}

function getUniversalBookTitle(book) {
    if (!book || typeof book !== "object") {
        return "";
    }

    return String(
        book.title ||
        book.bookTitle ||
        book.name ||
        book.book ||
        book.titleEn ||
        book.titleHi ||
        ""
    ).trim();
}

function renderUniversalBookList() {
    const select =
        document.getElementById("shortNotesBook");

    if (!select) return;

    const authorInput =
        document.getElementById("shortNotesAuthor");

    const selectedAuthor =
        String(authorInput?.value || "")
            .trim()
            .toLowerCase();

    const books =
        Array.isArray(window.shortNotesBooks)
            ? window.shortNotesBooks
            : [];

    select.innerHTML = "";

    const first =
        document.createElement("option");

    first.value = "";
    first.textContent =
        selectedAuthor
            ? "Select Book"
            : "Search/select Writer first";

    select.appendChild(first);

    const seen = new Set();

    books.forEach((book, index) => {
        if (!book || typeof book !== "object") {
            return;
        }

        const title =
            getUniversalBookTitle(book);

        if (!title) return;

        const author =
            getUniversalBookAuthor(book);

        if (
            selectedAuthor &&
            author &&
            !author.toLowerCase().includes(selectedAuthor)
        ) {
            return;
        }

        const key =
            title.toLowerCase() +
            "::" +
            author.toLowerCase();

        if (seen.has(key)) return;

        seen.add(key);

        const option =
            document.createElement("option");

        option.value =
            String(
                book.id ??
                book.bookId ??
                book.value ??
                `book-${index}`
            );

        option.textContent =
            author
                ? `${title} — ${author}`
                : title;

        option.dataset.author = author;

        // Store complete book object for chapter routing.
        try {
            option.dataset.bookObject =
                JSON.stringify(book);
        } catch (_) {}

        select.appendChild(option);
    });

    const custom =
        document.createElement("option");

    custom.value = "custom";
    custom.textContent =
        "Custom / Other Book";

    select.appendChild(custom);

    updateShortNotesCustomFields();
}



function populateShortNotesChapters() {
    if (!shortNotesChapter) return;

    shortNotesChapter.innerHTML =
        '<option value="">Select Chapter</option>';

    shortNotesChapter.disabled = true;

    const selectedOption =
        shortNotesBook?.options[
            shortNotesBook.selectedIndex
        ];

    if (!selectedOption || !selectedOption.value) {
        console.log("NEXORA: No book selected");
        return;
    }

    let book = null;

    // --------------------------------------------------------
    // PRIMARY SOURCE:
    // The exact book object stored on the selected option.
    // This prevents NCERT books from being lost when standard
    // books are also attached to the same subject.
    // --------------------------------------------------------
    try {
        if (selectedOption.dataset.book) {
            book = JSON.parse(selectedOption.dataset.book);
        }
    } catch (error) {
        console.warn(
            "NEXORA: Could not parse selected book metadata",
            error
        );
    }

    // --------------------------------------------------------
    // SECONDARY SOURCE:
    // Find exact book from current subject catalogue.
    // --------------------------------------------------------
    if (!book) {
        const subjectData =
            getShortNotesSubjectData();

        if (subjectData) {
            const books = [];

            // Direct NCERT book
            if (
                subjectData.titleEn ||
                subjectData.title ||
                subjectData.name
            ) {
                books.push(subjectData);
            }

            // Standard/reference books
            if (Array.isArray(subjectData.books)) {
                books.push(...subjectData.books);
            } else if (
                subjectData.books &&
                typeof subjectData.books === "object"
            ) {
                books.push(
                    ...Object.values(subjectData.books)
                );
            }

            book = books.find(item =>
                String(
                    item.id ||
                    item.titleEn ||
                    item.title ||
                    item.name ||
                    ""
                ) === String(selectedOption.value)
            );
        }
    }

    if (!book) {
        console.warn(
            "NEXORA: Selected book object not found:",
            selectedOption.value
        );
        return;
    }

    // --------------------------------------------------------
    // ONLY VERIFIED CHAPTER ARRAYS
    // --------------------------------------------------------
    let chapters =
        book.chapters ||
        book.chapterList ||
        book.topics ||
        [];

    if (!Array.isArray(chapters)) {
        if (
            chapters &&
            typeof chapters === "object"
        ) {
            chapters = Object.values(chapters);
        } else {
            chapters = [];
        }
    }

    chapters.forEach((chapter, index) => {
        let value = "";
        let label = "";

        if (typeof chapter === "string") {
            value = chapter;
            label = chapter;
        } else if (
            chapter &&
            typeof chapter === "object"
        ) {
            value =
                chapter.id ||
                chapter.slug ||
                chapter.titleEn ||
                chapter.title ||
                chapter.name ||
                "";

            label =
                chapter.titleEn ||
                chapter.title ||
                chapter.name ||
                chapter.titleHi ||
                value;
        }

        if (!value || !label) return;

        const option =
            document.createElement("option");

        option.value = value;
        option.textContent =
            `${index + 1}. ${label}`;

        option.dataset.chapter =
            typeof chapter === "string"
                ? JSON.stringify({
                    title: chapter
                })
                : JSON.stringify(chapter);

        shortNotesChapter.appendChild(option);
    });

    shortNotesChapter.disabled =
        shortNotesChapter.options.length <= 1;

    console.log(
        "NEXORA SELECTED BOOK:",
        selectedOption.textContent
    );

    console.log(
        "NEXORA CHAPTERS LOADED:",
        chapters.length
    );

    console.log(
        "NEXORA CHAPTER LIST:",
        chapters.map(chapter =>
            typeof chapter === "string"
                ? chapter
                : (
                    chapter.titleEn ||
                    chapter.title ||
                    chapter.name ||
                    ""
                )
        )
    );
}


function updateShortNotesCustomFields() {
    if (!shortNotesCustomFields) {
        return;
    }

    const show =
        shortNotesBook?.value === "custom" ||
        shortNotesChapter?.value === "custom";

    shortNotesCustomFields.style.display =
        show ? "block" : "none";
}

function resetAfterExamChange() {
    if (shortNotesClass) {
        shortNotesClass.value = "";
    }

    if (shortNotesSubject) {
        shortNotesSubject.value = "";
    }

    populateShortNotesBooks();
}

if (shortNotesExam) {
    shortNotesExam.addEventListener(
        "change",
        resetAfterExamChange
    );
}

if (shortNotesClass) {
    shortNotesClass.addEventListener(
        "change",
        () => {
            if (shortNotesSubject) {
                shortNotesSubject.value = "";
            }

            populateShortNotesBooks();
        }
    );
}

if (shortNotesSubject) {
    shortNotesSubject.addEventListener(
        "change",
        populateShortNotesBooks
    );
}

if (shortNotesBook) {
    shortNotesBook.addEventListener(
        "change",
        populateShortNotesChapters
    );
}

if (shortNotesChapter) {
    shortNotesChapter.addEventListener(
        "change",
        updateShortNotesCustomFields
    );
}

if (shortNotesButton) {
    shortNotesButton.addEventListener(
        "click",
        async () => {
            const className =
                shortNotesClass?.value.trim() ||
                "";

            const subject =
                shortNotesSubject?.value.trim() ||
                "";

            const bookValue =
                shortNotesBook?.value ||
                "";

            const chapterValue =
                shortNotesChapter?.value ||
                "";

            const selectedBookOption =
                shortNotesBook?.selectedOptions?.[0] || null;

            const selectedChapterOption =
                shortNotesChapter?.selectedOptions?.[0] || null;

            const selectedBookTitle =
                selectedBookOption?.dataset?.book
                    ? (() => {
                        try {
                            const b = JSON.parse(
                                selectedBookOption.dataset.book
                            );
                            return String(
                                b.titleEn ||
                                b.title ||
                                b.name ||
                                b.bookTitle ||
                                selectedBookOption.textContent ||
                                ""
                            ).trim();
                        } catch (_) {
                            return String(
                                selectedBookOption.textContent || ""
                            ).trim();
                        }
                    })()
                    : String(
                        selectedBookOption?.textContent || ""
                    ).trim();

            const selectedChapterTitle =
                selectedChapterOption?.dataset?.chapter
                    ? (() => {
                        try {
                            const c = JSON.parse(
                                selectedChapterOption.dataset.chapter
                            );
                            return String(
                                c.titleEn ||
                                c.title ||
                                c.name ||
                                c.titleHi ||
                                selectedChapterOption.textContent ||
                                ""
                            )
                            .replace(/^\s*\d+\.\s*/, "")
                            .trim();
                        } catch (_) {
                            return String(
                                selectedChapterOption.textContent || ""
                            )
                            .replace(/^\s*\d+\.\s*/, "")
                            .trim();
                        }
                    })()
                    : String(
                        selectedChapterOption?.textContent || ""
                    )
                    .replace(/^\s*\d+\.\s*/, "")
                    .trim();

            const exam =
                shortNotesExam?.value ||
                "UPSC";

            const language =
                shortNotesLanguage?.value ||
                "english";

            const mode =
                shortNotesMode?.value ||
                "exam";

            const customBook =
                shortNotesCustomBook?.value.trim() ||
                "";

            const customChapter =
                shortNotesCustomChapter?.value.trim() ||
                "";

            const author =
                document.getElementById(
                    "shortNotesAuthor"
                )?.value.trim() || "";

            if (!exam) {
                shortNotesStatus.textContent =
                    "Please select Exam.";
                return;
            }

            if (!className) {
                shortNotesStatus.textContent =
                    "Please select Class.";
                return;
            }

            if (!subject) {
                shortNotesStatus.textContent =
                    "Please select Subject.";
                return;
            }

            if (!bookValue) {
                shortNotesStatus.textContent =
                    "Please select Book.";
                return;
            }

            if (
                bookValue === "custom" &&
                !customBook
            ) {
                shortNotesStatus.textContent =
                    "Please enter Book name.";
                return;
            }

            if (!chapterValue) {
                shortNotesStatus.textContent =
                    "Please select Chapter.";
                return;
            }

            if (
                chapterValue === "custom" &&
                !customChapter
            ) {
                shortNotesStatus.textContent =
                    "Please enter Chapter name.";
                return;
            }

            const requestBody = {
                className,
                subject,

                bookId:
                    bookValue === "custom"
                        ? ""
                        : bookValue,

                bookTitle:
                    bookValue === "custom"
                        ? customBook
                        : selectedBookTitle,

                selectedBookTitle:
                    bookValue === "custom"
                        ? customBook
                        : selectedBookTitle,

                chapter:
                    chapterValue === "custom"
                        ? ""
                        : selectedChapterTitle || chapterValue,

                chapterTitle:
                    chapterValue === "custom"
                        ? customChapter
                        : selectedChapterTitle || chapterValue,

                selectedChapterTitle:
                    chapterValue === "custom"
                        ? customChapter
                        : selectedChapterTitle || chapterValue,

                exam,
                language,
                mode
            };

            shortNotesButton.disabled =
                true;

            shortNotesStatus.textContent =
                "Generating Short Notes PDF...";

            try {
                const response =
                    await fetch(
                        "/api/short-notes",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body:
                                JSON.stringify(
                                    requestBody
                                )
                        }
                    );

                if (!response.ok) {
                    let message =
                        "Failed to generate PDF.";

                    try {
                        const data =
                            await response.json();

                        message =
                            data.message ||
                            data.error ||
                            message;
                    } catch (_) {}

                    throw new Error(
                        message
                    );
                }

                const blob =
                    await response.blob();

                const url =
                    window.URL.createObjectURL(
                        blob
                    );

                const link =
                    document.createElement(
                        "a"
                    );

                link.href = url;

                link.download =
                    "NEXORA-Short-Notes-" +
                    className.replace(
                        /\s+/g,
                        "-"
                    ) +
                    "-" +
                    language +
                    ".pdf";

                document.body.appendChild(
                    link
                );

                link.click();
                link.remove();

                window.URL.revokeObjectURL(
                    url
                );

                shortNotesStatus.textContent =
                    "PDF generated successfully.";

            } catch (error) {
                console.error(
                    "NEXORA Short Notes Error:",
                    error
                );

                shortNotesStatus.textContent =
                    error.message ||
                    "Unable to generate PDF.";

            } finally {
                shortNotesButton.disabled =
                    false;
            }
        }
    );
}

loadShortNotesManifest();

// =================================
// NEXORA PYQ & TEST SERIES

// =================================

const pyqSubject =
    document.getElementById("pyqSubject");

const pyqExam =
    document.getElementById("pyqExam");

const pyqType =
    document.getElementById("pyqType");

const pyqLanguage =
    document.getElementById("pyqLanguage");

const pyqYear =
    document.getElementById("pyqYear");

const pyqTopic =
    document.getElementById("pyqTopic");

const pyqButton =
    document.getElementById("pyqButton");

const testSeriesButton =
    document.getElementById("testSeriesButton");

const pyqTestStatus =
    document.getElementById("pyqTestStatus");


// =================================
// NEXORA GENERIC PYQ SUBJECTS
// =================================

const pyqSubjectsByExam = {
    upsc: [
        ["geography", "Geography"],
        ["polity", "Polity"],
        ["history", "History"],
        ["economy", "Economy"],
        ["environment", "Environment"],
        ["science", "Science & Technology"],
        ["current-affairs", "Current Affairs"]
    ],

    ssc: [
        ["general-awareness", "General Awareness"],
        ["reasoning", "Reasoning"],
        ["quantitative-aptitude", "Quantitative Aptitude"],
        ["english", "English"]
    ],

    jee: [
        ["physics", "Physics"],
        ["chemistry", "Chemistry"],
        ["mathematics", "Mathematics"]
    ],

    neet: [
        ["physics", "Physics"],
        ["chemistry", "Chemistry"],
        ["biology", "Biology"]
    ],

    college: [
        ["computer-science", "Computer Science"],
        ["mathematics", "Mathematics"],
        ["physics", "Physics"],
        ["chemistry", "Chemistry"],
        ["other", "Other"]
    ]
};


function updatePYQSubjects() {

    if (!pyqSubject || !pyqExam) {
        return;
    }

    const exam =
        pyqExam.value || "upsc";

    const subjects =
        pyqSubjectsByExam[exam] ||
        pyqSubjectsByExam.upsc;

    pyqSubject.innerHTML = "";

    subjects.forEach(([value, label]) => {

        const option =
            document.createElement("option");

        option.value = value;
        option.textContent = label;

        pyqSubject.appendChild(option);

    });

}


// Update subjects when exam changes

if (pyqExam) {

    pyqExam.addEventListener(
        "change",
        updatePYQSubjects
    );

}


// =================================
// NEXORA GENERIC PYQ TOPICS
// =================================

const pyqTopicsBySubject = {

    geography: [
        ["", "All Chapters"],
        ["physical-geography", "Physical Geography"],
        ["geomorphology", "Geomorphology"],
        ["earth-interior", "Interior of the Earth"],
        ["plate-tectonics", "Plate Tectonics"],
        ["rocks-minerals", "Rocks & Minerals"],
        ["landforms", "Landforms"],
        ["climatology", "Climatology"],
        ["atmosphere", "Atmosphere"],
        ["solar-radiation", "Solar Radiation & Heat Balance"],
        ["atmospheric-circulation", "Atmospheric Circulation"],
        ["weather-systems", "Weather Systems"],
        ["oceanography", "Oceanography"],
        ["ocean-movements", "Movements of Ocean Water"],
        ["biodiversity", "Biodiversity"],
        ["indian-physiography", "India: Structure & Physiography"],
        ["drainage", "Drainage System"],
        ["indian-climate", "Indian Climate"],
        ["natural-vegetation", "Natural Vegetation"],
        ["soils", "Soils"],
        ["agriculture", "Agriculture"],
        ["minerals", "Mineral Resources"],
        ["industries", "Industries"],
        ["transport", "Transport & Communication"],
        ["population", "Population"],
        ["urbanization", "Urbanization"],
        ["regional-planning", "Regional Planning"],
        ["disasters", "Natural Hazards & Disasters"],
        ["mapping-gis", "Mapping, GIS & Remote Sensing"]
    ],

    polity: [
        ["", "All Chapters"],
        ["constitution", "Constitution"],
        ["making-of-constitution", "Making of the Constitution"],
        ["constitutional-features", "Constitutional Features"],
        ["citizenship", "Citizenship"],
        ["fundamental-rights", "Fundamental Rights"],
        ["dpsp", "Directive Principles"],
        ["fundamental-duties", "Fundamental Duties"],
        ["amendment", "Constitutional Amendments"],
        ["basic-structure", "Basic Structure"],
        ["president", "President"],
        ["vice-president", "Vice-President"],
        ["prime-minister", "Prime Minister & Council of Ministers"],
        ["parliament", "Parliament"],
        ["supreme-court", "Supreme Court"],
        ["high-courts", "High Courts"],
        ["judiciary", "Judiciary"],
        ["federalism", "Federalism"],
        ["centre-state", "Centre-State Relations"],
        ["local-government", "Local Government"],
        ["elections", "Elections"],
        ["constitutional-bodies", "Constitutional Bodies"],
        ["statutory-bodies", "Statutory & Regulatory Bodies"],
        ["emergency", "Emergency Provisions"],
        ["governance", "Governance"]
    ],

    history: [
        ["", "All Chapters"],
        ["prehistory", "Prehistory"],
        ["indus-valley", "Indus Valley Civilization"],
        ["vedic-age", "Vedic Age"],
        ["mahajanapadas", "Mahajanapadas"],
        ["buddhism-jainism", "Buddhism & Jainism"],
        ["maurya", "Mauryan Empire"],
        ["post-maurya", "Post-Mauryan Period"],
        ["gupta", "Gupta Period"],
        ["sangam", "Sangam Age"],
        ["ancient-art-culture", "Ancient Art & Culture"],
        ["delhi-sultanate", "Delhi Sultanate"],
        ["mughal", "Mughal Empire"],
        ["bhakti-sufi", "Bhakti & Sufi Movements"],
        ["regional-kingdoms", "Regional Kingdoms"],
        ["medieval-culture", "Medieval Art & Culture"],
        ["europeans", "Arrival of Europeans"],
        ["british-expansion", "British Expansion"],
        ["constitutional-acts", "Constitutional Acts"],
        ["social-religious-reform", "Social & Religious Reform"],
        ["revolt-1857", "Revolt of 1857"],
        ["nationalism", "Indian Nationalism"],
        ["gandhian-era", "Gandhian Era"],
        ["revolutionary-movement", "Revolutionary Movement"],
        ["independence-partition", "Independence & Partition"],
        ["industrial-revolution", "Industrial Revolution"],
        ["french-revolution", "French Revolution"],
        ["russian-revolution", "Russian Revolution"],
        ["world-wars", "World Wars"],
        ["imperialism", "Imperialism & Colonialism"],
        ["decolonization", "Decolonization"],
        ["cold-war", "Cold War"]
    ],

    economy: [
        ["", "All Chapters"],
        ["basic-concepts", "Basic Economic Concepts"],
        ["national-income", "National Income"],
        ["economic-growth", "Economic Growth"],
        ["economic-development", "Economic Development"],
        ["inflation", "Inflation"],
        ["unemployment", "Unemployment"],
        ["poverty", "Poverty"],
        ["inclusive-growth", "Inclusive Growth"],
        ["fiscal-policy", "Fiscal Policy"],
        ["monetary-policy", "Monetary Policy"],
        ["banking", "Banking"],
        ["financial-markets", "Financial Markets"],
        ["taxation", "Taxation"],
        ["budget", "Union Budget"],
        ["public-finance", "Public Finance"],
        ["external-sector", "External Sector"],
        ["balance-payments", "Balance of Payments"],
        ["exchange-rate", "Exchange Rate"],
        ["agriculture-economy", "Agriculture Economy"],
        ["industry", "Industry"],
        ["infrastructure", "Infrastructure"],
        ["planning", "Planning"],
        ["financial-inclusion", "Financial Inclusion"]
    ],

    environment: [
        ["", "All Chapters"],
        ["ecology", "Ecology"],
        ["ecosystem", "Ecosystem"],
        ["food-chain", "Food Chain & Food Web"],
        ["ecological-cycles", "Biogeochemical Cycles"],
        ["biodiversity", "Biodiversity"],
        ["species", "Species & Endemism"],
        ["conservation", "Biodiversity Conservation"],
        ["protected-areas", "Protected Areas"],
        ["forests", "Forests"],
        ["wetlands", "Wetlands"],
        ["marine-ecosystems", "Marine Ecosystems"],
        ["climate-change", "Climate Change"],
        ["pollution", "Pollution"],
        ["environmental-laws", "Environmental Laws"],
        ["eia", "Environmental Impact Assessment"],
        ["international-conventions", "International Environmental Conventions"],
        ["sustainable-development", "Sustainable Development"]
    ],

    science: [
        ["", "All Chapters"],
        ["physics-basics", "Physics Basics"],
        ["chemistry-basics", "Chemistry Basics"],
        ["biology-basics", "Biology Basics"],
        ["space", "Space Technology"],
        ["astronomy", "Astronomy"],
        ["biotechnology", "Biotechnology"],
        ["genetics", "Genetics"],
        ["health-disease", "Health & Diseases"],
        ["nuclear", "Nuclear Technology"],
        ["energy", "Energy Technology"],
        ["nanotechnology", "Nanotechnology"],
        ["computers", "Computers & Digital Technology"],
        ["artificial-intelligence", "Artificial Intelligence"],
        ["telecommunication", "Telecommunication"],
        ["defence-technology", "Defence Technology"]
    ],

    "current-affairs": [
        ["", "All Chapters"],
        ["national", "National Affairs"],
        ["international", "International Affairs"],
        ["polity-governance", "Polity & Governance"],
        ["economy", "Economy"],
        ["environment", "Environment"],
        ["science-technology", "Science & Technology"],
        ["security", "Internal Security"],
        ["reports-indices", "Reports & Indices"],
        ["international-organizations", "International Organizations"],
        ["places-in-news", "Places in News"],
        ["government-schemes", "Government Schemes"],
        ["awards", "Awards & Honours"]
    ],

    "general-awareness": [
        ["", "All Chapters"],
        ["history", "History"],
        ["geography", "Geography"],
        ["polity", "Indian Polity"],
        ["economy", "Economy"],
        ["general-science", "General Science"],
        ["static-gk", "Static GK"],
        ["current-affairs", "Current Affairs"],
        ["art-culture", "Art & Culture"],
        ["sports", "Sports"]
    ],

    reasoning: [
        ["", "All Chapters"],
        ["analogy", "Analogy"],
        ["classification", "Classification"],
        ["series", "Number & Alphabet Series"],
        ["coding-decoding", "Coding-Decoding"],
        ["blood-relations", "Blood Relations"],
        ["direction-sense", "Direction Sense"],
        ["ranking", "Ranking & Order"],
        ["syllogism", "Syllogism"],
        ["venn-diagram", "Venn Diagram"],
        ["statement-conclusion", "Statement & Conclusion"],
        ["puzzles", "Puzzles"],
        ["seating-arrangement", "Seating Arrangement"],
        ["clock-calendar", "Clock & Calendar"],
        ["non-verbal", "Non-Verbal Reasoning"]
    ],

    "quantitative-aptitude": [
        ["", "All Chapters"],
        ["number-system", "Number System"],
        ["hcf-lcm", "HCF & LCM"],
        ["simplification", "Simplification"],
        ["percentage", "Percentage"],
        ["ratio", "Ratio & Proportion"],
        ["average", "Average"],
        ["profit-loss", "Profit & Loss"],
        ["simple-interest", "Simple Interest"],
        ["compound-interest", "Compound Interest"],
        ["time-work", "Time & Work"],
        ["pipes-cisterns", "Pipes & Cisterns"],
        ["speed-distance", "Speed, Time & Distance"],
        ["boats-streams", "Boats & Streams"],
        ["algebra", "Algebra"],
        ["geometry", "Geometry"],
        ["mensuration", "Mensuration"],
        ["trigonometry", "Trigonometry"],
        ["statistics", "Statistics"],
        ["data-interpretation", "Data Interpretation"]
    ],

    english: [
        ["", "All Chapters"],
        ["parts-of-speech", "Parts of Speech"],
        ["tenses", "Tenses"],
        ["subject-verb", "Subject-Verb Agreement"],
        ["articles", "Articles"],
        ["prepositions", "Prepositions"],
        ["voice", "Active & Passive Voice"],
        ["narration", "Direct & Indirect Speech"],
        ["error-spotting", "Error Spotting"],
        ["sentence-improvement", "Sentence Improvement"],
        ["vocabulary", "Vocabulary"],
        ["synonyms-antonyms", "Synonyms & Antonyms"],
        ["idioms", "Idioms & Phrases"],
        ["one-word", "One Word Substitution"],
        ["cloze-test", "Cloze Test"],
        ["reading-comprehension", "Reading Comprehension"],
        ["para-jumbles", "Para Jumbles"]
    ],

    physics: [
        ["", "All Chapters"],
        ["units-measurements", "Units & Measurements"],
        ["vectors", "Vectors"],
        ["kinematics", "Kinematics"],
        ["laws-of-motion", "Laws of Motion"],
        ["work-energy-power", "Work, Energy & Power"],
        ["rotational-motion", "Rotational Motion"],
        ["gravitation", "Gravitation"],
        ["properties-of-matter", "Properties of Matter"],
        ["thermodynamics", "Thermodynamics"],
        ["kinetic-theory", "Kinetic Theory"],
        ["oscillations", "Oscillations"],
        ["waves", "Waves"],
        ["electrostatics", "Electrostatics"],
        ["capacitance", "Capacitance"],
        ["current-electricity", "Current Electricity"],
        ["magnetism", "Magnetic Effects of Current"],
        ["emi-ac", "Electromagnetic Induction & AC"],
        ["em-waves", "Electromagnetic Waves"],
        ["ray-optics", "Ray Optics"],
        ["wave-optics", "Wave Optics"],
        ["dual-nature", "Dual Nature of Matter"],
        ["atoms-nuclei", "Atoms & Nuclei"],
        ["semiconductors", "Semiconductors"],
        ["experimental-skills", "Experimental Physics"]
    ],

    chemistry: [
        ["", "All Chapters"],
        ["mole-concept", "Some Basic Concepts / Mole Concept"],
        ["atomic-structure", "Atomic Structure"],
        ["periodicity", "Periodic Classification"],
        ["chemical-bonding", "Chemical Bonding"],
        ["states-of-matter", "States of Matter"],
        ["thermodynamics", "Thermodynamics"],
        ["equilibrium", "Equilibrium"],
        ["redox", "Redox Reactions"],
        ["solutions", "Solutions"],
        ["electrochemistry", "Electrochemistry"],
        ["chemical-kinetics", "Chemical Kinetics"],
        ["surface-chemistry", "Surface Chemistry"],
        ["s-block", "s-Block Elements"],
        ["p-block", "p-Block Elements"],
        ["d-f-block", "d- and f-Block Elements"],
        ["coordination", "Coordination Compounds"],
        ["metallurgy", "Metallurgy"],
        ["organic-basics", "Organic Chemistry Basics"],
        ["hydrocarbons", "Hydrocarbons"],
        ["haloalkanes", "Haloalkanes & Haloarenes"],
        ["alcohols-phenols-ethers", "Alcohols, Phenols & Ethers"],
        ["aldehydes-ketones-acids", "Aldehydes, Ketones & Carboxylic Acids"],
        ["amines", "Amines"],
        ["biomolecules", "Biomolecules"],
        ["polymers", "Polymers"],
        ["practical-chemistry", "Practical Chemistry"]
    ],

    mathematics: [
        ["", "All Chapters"],
        ["sets-relations", "Sets, Relations & Functions"],
        ["complex-numbers", "Complex Numbers"],
        ["quadratic-equations", "Quadratic Equations"],
        ["sequence-series", "Sequences & Series"],
        ["permutations-combinations", "Permutations & Combinations"],
        ["binomial", "Binomial Theorem"],
        ["probability", "Probability & Statistics"],
        ["matrices-determinants", "Matrices & Determinants"],
        ["straight-lines", "Straight Lines"],
        ["circles", "Circles"],
        ["conics", "Conic Sections"],
        ["vectors", "Vector Algebra"],
        ["three-dimensional", "Three Dimensional Geometry"],
        ["limits", "Limits & Continuity"],
        ["differentiation", "Differentiation"],
        ["applications-derivatives", "Applications of Derivatives"],
        ["integration", "Integral Calculus"],
        ["differential-equations", "Differential Equations"],
        ["trigonometry", "Trigonometry"]
    ],

    biology: [
        ["", "All Chapters"],
        ["diversity", "Diversity in Living World"],
        ["plant-anatomy", "Structural Organisation in Plants"],
        ["animal-anatomy", "Structural Organisation in Animals"],
        ["cell-biology", "Cell Structure & Function"],
        ["biomolecules", "Biomolecules"],
        ["plant-physiology", "Plant Physiology"],
        ["human-physiology", "Human Physiology"],
        ["reproduction", "Reproduction"],
        ["genetics", "Genetics & Heredity"],
        ["evolution", "Evolution"],
        ["human-health", "Human Health & Disease"],
        ["biology-welfare", "Biology & Human Welfare"],
        ["biotechnology", "Biotechnology"],
        ["ecology", "Ecology"],
        ["biodiversity", "Biodiversity & Conservation"]
    ],

    "computer-science": [
        ["", "All Chapters"],
        ["programming", "Programming Fundamentals"],
        ["oop", "Object-Oriented Programming"],
        ["data-structures", "Data Structures"],
        ["algorithms", "Algorithms"],
        ["dbms", "Database Management Systems"],
        ["operating-systems", "Operating Systems"],
        ["computer-networks", "Computer Networks"],
        ["computer-architecture", "Computer Architecture"],
        ["software-engineering", "Software Engineering"],
        ["theory-computation", "Theory of Computation"],
        ["compiler-design", "Compiler Design"],
        ["artificial-intelligence", "Artificial Intelligence"],
        ["machine-learning", "Machine Learning"],
        ["web-development", "Web Development"],
        ["cybersecurity", "Cybersecurity"],
        ["cloud-computing", "Cloud Computing"],
        ["distributed-systems", "Distributed Systems"]
    ],

    other: [
        ["", "All Chapters"]
    ]
};

function updatePYQTopics() {

    if (!pyqTopic || !pyqSubject) {
        return;
    }

    const subject =
        pyqSubject.value || "geography";

    const topics =
        pyqTopicsBySubject[subject] ||
        [["", "All Topics"]];

    pyqTopic.innerHTML = "";

    topics.forEach(([value, label]) => {

        const option =
            document.createElement("option");

        option.value = value;
        option.textContent = label;

        pyqTopic.appendChild(option);

    });

}


if (pyqSubject) {

    pyqSubject.addEventListener(
        "change",
        updatePYQTopics
    );

}


// Initial subject + topic list

updatePYQSubjects();
updatePYQTopics();



// =================================
// LOAD PYQs

// =================================

async function loadPYQs() {

    if (!pyqSubject || !pyqButton) {
        return;
    }

    const subject =
        pyqSubject.value;

    const exam =
        pyqExam
            ? pyqExam.value
            : "upsc";

    const type =
        pyqType
            ? pyqType.value
            : "prelims";

    const language =
        pyqLanguage
            ? pyqLanguage.value
            : "bilingual";

    const year =
        pyqYear
            ? pyqYear.value
            : "";

    const topic =
        pyqTopic
            ? pyqTopic.value
            : "";


    pyqTestStatus.textContent =
        "Loading UPSC PYQs...";


    try {

        console.log("NEXORA PYQ REQUEST:", subject, exam, type, language, year, topic);
        const response =
            await fetch(
                "/api/pyq?subject=" +
                encodeURIComponent(subject) +
                "&exam=" +
                encodeURIComponent(exam) +
                "&type=" +
                encodeURIComponent(type) +
                "&language=" +
                encodeURIComponent(language) +
                "&year=" +
                encodeURIComponent(year) +
                "&topic=" +
                encodeURIComponent(topic)
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load PYQs."
            );

        }


        const data =
            await response.json();


        if (!data.success) {

            throw new Error(
                data.message ||
                "PYQ loading failed."
            );

        }


        console.log("NEXORA PYQ CHECK:", data.success, data.total, data.questions, data.language);
        displayPYQs(data);


    } catch (error) {

        console.error(
            "NEXORA PYQ Error:",
            error
        );

        pyqTestStatus.textContent =
            error.message ||
            "Unable to load PYQs.";

    }

}



// =================================
// DISPLAY PYQs

// =================================

function displayPYQs(data) {

    let container =
        document.getElementById(
            "nexoraPyqResults"
        );

    if (!container) {

        container =
            document.createElement("section");

        container.id =
            "nexoraPyqResults";

        container.className =
            "answer-card";

        const pyqCard =
            document.querySelector(
                ".pyq-test-card"
            );

        if (pyqCard) {
            pyqCard.appendChild(
                container
            );
        } else {
            document.body.appendChild(
                container
            );
        }
    }

    container.innerHTML = "";

    const selectedLanguage =
        String(data.language || "bilingual")
            .toLowerCase();

    const heading =
        document.createElement("h2");

    heading.textContent =
        "📚 UPSC Previous Year Questions";

    container.appendChild(
        heading
    );

    if (
        !data.questions ||
        data.questions.length === 0
    ) {

        const empty =
            document.createElement("p");

        empty.textContent =
            data.message ||
            "No PYQs available for this selection.";

        container.appendChild(
            empty
        );

        if (pyqTestStatus) {
            pyqTestStatus.textContent =
                "No PYQs available.";
        }

        return;
    }

    data.questions.forEach(
        (q, index) => {

            const card =
                document.createElement("div");

            card.style.marginTop =
                "20px";

            card.style.padding =
                "18px";

            card.style.border =
                "1px solid #ddd";

            card.style.borderRadius =
                "12px";

            // =========================
            // META
            // =========================

            const meta =
                document.createElement("p");

            meta.textContent =
                q.year +
                " • " +
                String(q.type || "")
                    .toUpperCase() +
                " • " +
                q.source;

            card.appendChild(
                meta
            );

            // =========================
            // QUESTION
            // =========================

            const question =
                document.createElement("h3");

            question.textContent =
                (index + 1) +
                ". " +
                (
                    selectedLanguage === "hindi"
                        ? (
                            q.question_hi ||
                            "Hindi translation not available for this PYQ yet."
                        )
                        : q.question
                );

            card.appendChild(
                question
            );

            // =========================
            // BILINGUAL QUESTION
            // =========================

            if (
                selectedLanguage === "bilingual" &&
                q.question_hi
            ) {

                const hindiQuestion =
                    document.createElement("p");

                hindiQuestion.style.marginTop =
                    "8px";

                hindiQuestion.style.fontWeight =
                    "600";

                hindiQuestion.textContent =
                    "हिंदी: " +
                    q.question_hi;

                card.appendChild(
                    hindiQuestion
                );
            }

            if (
                selectedLanguage === "bilingual" &&
                !q.question_hi
            ) {

                const notice =
                    document.createElement("p");

                notice.style.marginTop =
                    "8px";

                notice.textContent =
                    "🇮🇳 Hindi translation not available for this PYQ yet.";

                card.appendChild(
                    notice
                );
            }

            // =========================
            // OPTIONS
            // =========================

            if (
                Array.isArray(q.options) &&
                q.options.length > 0
            ) {

                const options =
                    document.createElement("div");

                options.style.marginTop =
                    "12px";

                q.options.forEach(
                    option => {

                        const p =
                            document.createElement("p");

                        p.textContent =
                            option;

                        options.appendChild(
                            p
                        );
                    }
                );

                card.appendChild(
                    options
                );
            }

            // =========================
            // HINDI OPTIONS
            // =========================

            if (
                selectedLanguage === "bilingual" &&
                Array.isArray(q.options_hi) &&
                q.options_hi.length > 0
            ) {

                const hindiOptionsTitle =
                    document.createElement("p");

                hindiOptionsTitle.style.fontWeight =
                    "600";

                hindiOptionsTitle.textContent =
                    "हिंदी विकल्प:";

                card.appendChild(
                    hindiOptionsTitle
                );

                const hindiOptions =
                    document.createElement("div");

                q.options_hi.forEach(
                    option => {

                        const p =
                            document.createElement("p");

                        p.textContent =
                            option;

                        hindiOptions.appendChild(
                            p
                        );
                    }
                );

                card.appendChild(
                    hindiOptions
                );

            } else if (
                selectedLanguage === "bilingual" &&
                Array.isArray(q.options) &&
                q.options.length > 0 &&
                !q.options_hi
            ) {

                const notice =
                    document.createElement("p");

                notice.textContent =
                    "🇮🇳 Hindi options not available for this PYQ yet.";

                card.appendChild(
                    notice
                );
            }

            // =========================
            // HINDI-ONLY OPTIONS
            // =========================

            if (
                selectedLanguage === "hindi" &&
                Array.isArray(q.options_hi) &&
                q.options_hi.length > 0
            ) {

                const hindiOptions =
                    document.createElement("div");

                hindiOptions.style.marginTop =
                    "12px";

                q.options_hi.forEach(
                    option => {

                        const p =
                            document.createElement("p");

                        p.textContent =
                            option;

                        hindiOptions.appendChild(
                            p
                        );
                    }
                );

                card.appendChild(
                    hindiOptions
                );
            }

            // =========================
            // ANSWER
            // =========================

            const answerBox =
                document.createElement("div");

            answerBox.style.marginTop = "16px";
            answerBox.style.padding = "12px";
            answerBox.style.borderRadius = "10px";
            answerBox.style.background = "#f5f7fa";
            answerBox.style.color = "#111827";

            const answerTitle =
                document.createElement("strong");

            answerTitle.textContent =
                "Correct Answer";

            answerBox.appendChild(
                answerTitle
            );

            const answerText =
                document.createElement("p");

            answerText.style.marginBottom = "0";

            answerText.textContent =
                (selectedLanguage === "hindi" || selectedLanguage === "bilingual") && q.answer_hi ? q.answer_hi : (q.answer || "Answer not available yet.");

            answerBox.appendChild(
                answerText
            );

            card.appendChild(
                answerBox
            );

            // =========================
            // EXPLANATION
            // =========================

            if (q.explanation) {

                const explanationBox =
                    document.createElement("div");

                explanationBox.style.marginTop =
                    "12px";

                const explanationTitle =
                    document.createElement("strong");

                explanationTitle.textContent =
                    "Explanation";

                explanationBox.appendChild(
                    explanationTitle
                );

                const explanationText =
                    document.createElement("p");

                explanationText.textContent = (selectedLanguage === "hindi" || selectedLanguage === "bilingual") && q.explanation_hi ? q.explanation_hi :
                    q.explanation;

                explanationBox.appendChild(
                    explanationText
                );

                card.appendChild(
                    explanationBox
                );
            }

            // =========================
            // NCERT CONNECTION
            //             =========================

            const details =
                document.createElement("p");

            details.style.marginTop =
                "12px";

            details.textContent =
                "NCERT: " +
                (q.ncert_book || "-") +
                " → " +
                (q.ncert_chapter || "-");

            card.appendChild(
                details
            );

            container.appendChild(
                card
            );
        }
    );

    if (pyqTestStatus) {
        pyqTestStatus.textContent =
            data.total +
            " PYQ(s) loaded successfully.";
    }
}


/* =================================
   NEXORA TEST SERIES ENGINE
================================= */

let activeTestQuestions = [];
let activeTestIndex = 0;
let activeTestScore = 0;

async function startTestSeries() {

    const subject = pyqSubject ? pyqSubject.value : "geography";
    const exam = pyqExam ? pyqExam.value : "upsc";
    const type = pyqType ? pyqType.value : "prelims";
    const language = pyqLanguage ? pyqLanguage.value : "bilingual";
    const year = pyqYear ? pyqYear.value : "";
    const topic = pyqTopic ? pyqTopic.value : "";

    if (pyqTestStatus) {
        pyqTestStatus.textContent = "🧠 Test Series loading...";
    }

    try {
        const response = await fetch(
            "/api/test-series?subject=" + encodeURIComponent(subject) +
            "&exam=" + encodeURIComponent(exam) +
            "&type=" + encodeURIComponent(type) +
            "&language=" + encodeURIComponent(language) +
            "&year=" + encodeURIComponent(year) +
            "&topic=" + encodeURIComponent(topic) +
            "&count=10"
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Test Series could not start.");
        }

        if (!data.questions || data.questions.length === 0) {
            if (pyqTestStatus) {
                pyqTestStatus.textContent =
                    "⚠️ Is selection ke liye Test Series dataset available nahi hai.";
            }
            return;
        }

        activeTestQuestions = data.questions;
        activeTestIndex = 0;
        activeTestScore = 0;

        renderTestQuestion();

    } catch (error) {
        console.error("NEXORA Test Series Error:", error);

        if (pyqTestStatus) {
            pyqTestStatus.textContent =
                "❌ Test Series start nahi ho saki: " + error.message;
        }
    }
}

function renderTestQuestion() {

    const container = document.getElementById("pyqResults");
    if (!container) return;

    const q = activeTestQuestions[activeTestIndex];

    if (!q) {
        finishTestSeries();
        return;
    }

    container.innerHTML = "";

    const card = document.createElement("div");
    card.className = "pyq-question-card";

    const number = document.createElement("div");
    number.className = "answer-label";
    number.textContent =
        "QUESTION " + (activeTestIndex + 1) +
        " / " + activeTestQuestions.length;

    const question = document.createElement("h3");
    question.textContent = q.question || "Question unavailable.";

    card.appendChild(number);
    card.appendChild(question);

    if (Array.isArray(q.options) && q.options.length > 0) {

        q.options.forEach(function(option, optionIndex) {

            const button = document.createElement("button");
            button.type = "button";
            button.className = "main-cta";
            button.style.display = "block";
            button.style.width = "100%";
            button.style.marginTop = "10px";
            button.textContent =
                String.fromCharCode(65 + optionIndex) + ". " + option;

            button.addEventListener("click", function() {

                const correct =
                    String(q.answer || "").trim().toLowerCase();

                const selected =
                    String(option || "").trim().toLowerCase();

                if (selected === correct) {
                    activeTestScore++;
                }

                activeTestIndex++;
                renderTestQuestion();
            });

            card.appendChild(button);
        });

    } else {

        const message = document.createElement("p");
        message.textContent =
            "⚠️ Is question ka MCQ options dataset mein available nahi hai.";
        card.appendChild(message);

        const nextButton = document.createElement("button");
        nextButton.type = "button";
        nextButton.className = "main-cta";
        nextButton.textContent = "Next Question →";

        nextButton.addEventListener("click", function() {
            activeTestIndex++;
            renderTestQuestion();
        });

        card.appendChild(nextButton);
    }

    container.appendChild(card);

    if (pyqTestStatus) {
        pyqTestStatus.textContent =
            "🧠 Test Series running — Question " +
            (activeTestIndex + 1) +
            " of " + activeTestQuestions.length;
    }
}

function finishTestSeries() {

    const container = document.getElementById("pyqResults");
    if (!container) return;

    const total = activeTestQuestions.length;
    const percentage = total > 0
        ? Math.round((activeTestScore / total) * 100)
        : 0;

    container.innerHTML =
        "<div class=\"pyq-question-card\">" +
        "<h2>🏆 Test Completed</h2>" +
        "<p><strong>Score:</strong> " + activeTestScore +
        " / " + total + "</p>" +
        "<p><strong>Percentage:</strong> " + percentage + "%</p>" +
        "<button type=\"button\" id=\"restartTestSeries\">" +
        "🔄 Start Test Again</button>" +
        "</div>";

    const restart =
        document.getElementById("restartTestSeries");

    if (restart) {
        restart.addEventListener("click", startTestSeries);
    }

    if (pyqTestStatus) {
        pyqTestStatus.textContent =
            "✅ Test completed successfully.";
    }
}

if (testSeriesButton) {
    testSeriesButton.addEventListener("click", startTestSeries);
}

if (pyqButton) {
    pyqButton.addEventListener("click", loadPYQs);
}





/* ============================================================
   NEXORA WRITER / AUTHOR SELECT ENGINE
   ============================================================ */

function getNexoraBookAuthor(book) {
    if (!book || typeof book !== "object") {
        return "";
    }

    return String(
        book.author ||
        book.writer ||
        book.authorName ||
        book.writerName ||
        book.by ||
        ""
    ).trim();
}

function getNexoraBookTitle(book) {
    if (!book || typeof book !== "object") {
        return "";
    }

    return String(
        book.title ||
        book.bookTitle ||
        book.name ||
        book.book ||
        book.titleEn ||
        book.titleHi ||
        ""
    ).trim();
}


function renderNexoraBooksForAuthor() {
    const authorSelect =
        document.getElementById("shortNotesAuthor");

    const bookSelect =
        document.getElementById("shortNotesBook");

    if (!bookSelect) return;

    const selectedAuthor =
        authorSelect?.value || "";

    const books =
        Array.isArray(window.shortNotesBooks)
            ? window.shortNotesBooks
            : [];

    bookSelect.innerHTML =
        '<option value="">Select Book</option>';

    const seen = new Set();

    books.forEach((book, index) => {
        const title =
            getNexoraBookTitle(book);

        if (!title) return;

        const author =
            getNexoraBookAuthor(book);

        if (
            selectedAuthor &&
            selectedAuthor !== "__custom_author__" &&
            author.toLowerCase() !==
                selectedAuthor.toLowerCase()
        ) {
            return;
        }

        const key =
            title.toLowerCase() +
            "::" +
            author.toLowerCase();

        if (seen.has(key)) return;

        seen.add(key);

        const option =
            document.createElement("option");

        option.value =
            String(
                book.id ??
                book.bookId ??
                book.value ??
                `book-${index}`
            );

        option.textContent =
            title;

        option.dataset.author =
            author;

        try {
            option.dataset.bookObject =
                JSON.stringify(book);
        } catch (_) {}

        bookSelect.appendChild(option);
    });

    const custom =
        document.createElement("option");

    custom.value = "custom";
    custom.textContent =
        "Custom / Other Book";

    bookSelect.appendChild(custom);

    if (
        typeof populateShortNotesChapters ===
        "function"
    ) {
        populateShortNotesChapters();
    }

    if (
        typeof updateShortNotesCustomFields ===
        "function"
    ) {
        updateShortNotesCustomFields();
    }
}

/* ============================================================
   NEXORA_UNIVERSAL_AUTHOR_BOOK_CHAPTER_FINAL
   Writer -> Book -> Chapter cascading system
   ============================================================ */
(function NEXORA_UNIVERSAL_AUTHOR_BOOK_CHAPTER_FINAL() {
    function byId(id) {
        return document.getElementById(id);
    }

    function filterBooksForAuthor() {
        renderUniversalBookList();

        const author =
            byId("shortNotesAuthor");

        if (author && author.value.trim()) {
            author.style.borderColor = "";
        }

        const chapter =
            byId("shortNotesChapter");

        if (chapter) {
            chapter.innerHTML =
                '<option value="">Select Chapter</option>';
        }
    }

    

    document.addEventListener(
        "DOMContentLoaded",
        async function() {
            const author =
                byId("shortNotesAuthor");

            const book =
                byId("shortNotesBook");

            const chapter =
                byId("shortNotesChapter");

            if (book) {
                book.addEventListener(
                    "change",
                    function() {
                        populateShortNotesChapters();
                    }
                );
            }

            if (chapter) {
                chapter.addEventListener(
                    "change",
                    updateShortNotesCustomFields
                );
            }

            if (
                typeof populateShortNotesBooks ===
                "function"
            ) {
                await populateShortNotesBooks();
            }
        }
    );

    // Public helper for generation/payload code.
    window.getNexoraAuthorBookChapter =
        function() {
            const author =
                byId("shortNotesAuthor");

            const book =
                byId("shortNotesBook");

            const chapter =
                byId("shortNotesChapter");

            const customBook =
                byId("shortNotesCustomBook");

            const customChapter =
                byId("shortNotesCustomChapter");

            const selectedBook =
                book?.selectedOptions?.[0];

            const selectedChapter =
                chapter?.selectedOptions?.[0];

            const authorValue =
                author?.value?.trim() || "";

            const bookValue =
                book?.value || "";

            const chapterValue =
                chapter?.value || "";

            const finalBook =
                bookValue === "custom"
                    ? (
                        customBook?.value?.trim() ||
                        ""
                    )
                    : (
                        selectedBook?.textContent
                            ?.replace(
                                /\s+—\s+[^—]+$/,
                                ""
                            )
                            .trim() ||
                        bookValue
                    );

            const finalChapter =
                chapterValue === "custom"
                    ? (
                        customChapter?.value?.trim() ||
                        ""
                    )
                    : (
                        selectedChapter
                            ?.textContent
                            ?.replace(
                                /^\d+\.\s*/,
                                ""
                            )
                            .trim() ||
                        chapterValue
                    );

            return {
                author: authorValue,
                writer: authorValue,
                book: finalBook,
                bookTitle: finalBook,
                chapter: finalChapter,
                chapterTitle: finalChapter
            };
        };
})();


/* ============================================================
   NEXORA_WRITER_SELECT_EVENTS
   ============================================================ */
(function NEXORA_WRITER_SELECT_EVENTS() {
    document.addEventListener(
        "DOMContentLoaded",
        async function() {

            const author =
                document.getElementById(
                    "shortNotesAuthor"
                );

            const book =
                document.getElementById(
                    "shortNotesBook"
                );

            if (
                typeof populateShortNotesBooks ===
                "function"
            ) {
                await populateShortNotesBooks();
            }

            if (
                typeof populateNexoraAuthorSelect ===
                "function"
            ) {

            }

            if (author) {
                author.addEventListener(
                    "change",
                    function() {

                        if (
                            this.value ===
                            "__custom_author__"
                        ) {
                            const custom =
                                prompt(
                                    "Enter Writer / Author name:"
                                );

                            if (
                                custom &&
                                custom.trim()
                            ) {
                                const value =
                                    custom.trim();

                                const option =
                                    document.createElement(
                                        "option"
                                    );

                                option.value = value;
                                option.textContent =
                                    value;

                                author.insertBefore(
                                    option,
                                    author.lastElementChild
                                );

                                author.value = value;
                            } else {
                                author.value = "";
                            }
                        }

                        renderNexoraBooksForAuthor();
                    }
                );
            }

            if (book) {
                book.addEventListener(
                    "change",
                    function() {
                        populateShortNotesChapters();
                    }
                );
            }
        }
    );
})();


/* ============================================================
   NEXORA STRICT CASCADING SELECTION
   Author -> Book -> Chapter
   No chapter typing.
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (window.NEXORA_STRICT_CHAPTER_EVENTS) return;
  window.NEXORA_STRICT_CHAPTER_EVENTS = true;

  const bookSelect = document.getElementById("shortNotesBook");
  const chapterSelect = document.getElementById("shortNotesChapter");
  const authorSelect = document.getElementById("shortNotesAuthor");

  if (chapterSelect) {
    chapterSelect.innerHTML =
      '<option value="">Select Chapter</option>';
    chapterSelect.disabled = true;
  }

  if (bookSelect) {
    bookSelect.addEventListener("change", () => {
      if (typeof populateShortNotesChapters === "function") {
        populateShortNotesChapters();
      }
    });
  }

  if (authorSelect) {
    authorSelect.addEventListener("change", () => {
      setTimeout(() => {
        if (typeof populateShortNotesChapters === "function") {
          populateShortNotesChapters();
        }
      }, 0);
    });
  }
});


/* ============================================================
   NEXORA — NO TYPED BOOK / CHAPTER FLOW
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (window.NEXORA_NO_TYPED_BOOKS_FINAL) return;
  window.NEXORA_NO_TYPED_BOOKS_FINAL = true;

  const book = document.getElementById("shortNotesBook");
  const chapter = document.getElementById("shortNotesChapter");

  if (book) {
    book.setAttribute("required", "required");

    book.addEventListener("change", () => {
      if (typeof populateShortNotesChapters === "function") {
        populateShortNotesChapters();
      }
    });
  }

  if (chapter) {
    chapter.setAttribute("required", "required");
  }

  console.log(
    "NEXORA: BOOK SELECT + CHAPTER SELECT ONLY"
  );
});


/* ============================================================
   NEXORA STABLE BOOK -> CHAPTER FLOW
   ============================================================ */
document.addEventListener("DOMContentLoaded", async () => {
  if (window.NEXORA_STABLE_BOOK_CHAPTER_FLOW) return;
  window.NEXORA_STABLE_BOOK_CHAPTER_FLOW = true;

  const bookSelect = document.getElementById("shortNotesBook");
  const chapterSelect = document.getElementById("shortNotesChapter");

  if (!bookSelect) return;

  try {
    await populateShortNotesBooks();
  } catch (error) {
    console.error("NEXORA book initialization error:", error);
  }

  if (chapterSelect) {
    chapterSelect.innerHTML =
      '<option value="">Select Chapter</option>';
    chapterSelect.disabled = true;
  }

  bookSelect.addEventListener("change", async () => {
    const selectedBook =
      bookSelect.options[bookSelect.selectedIndex];

    console.log(
      "NEXORA SELECTED BOOK:",
      bookSelect.value,
      selectedBook?.dataset?.bookTitle || selectedBook?.textContent
    );

    if (!bookSelect.value) {
      if (chapterSelect) {
        chapterSelect.innerHTML =
          '<option value="">Select Chapter</option>';
        chapterSelect.disabled = true;
      }
      return;
    }

    if (typeof populateShortNotesChapters === "function") {
      populateShortNotesChapters();
    }
  });
});


/* NEXORA_STRICT_SELECTION_VALIDATION_V7 */

/* NEXORA_STRICT_SELECTION_VALIDATION_V7 */

function nexoraValidateShortNotesSelection() {

    const author =
        shortNotesAuthor?.value?.trim() || "";

    const book =
        shortNotesBook?.value?.trim() || "";

    const chapter =
        shortNotesChapter?.value?.trim() || "";

    if (!book) {
        return {
            ok: false,
            reason: "BOOK_NOT_SELECTED"
        };
    }

    if (!chapter) {
        return {
            ok: false,
            reason: "CHAPTER_NOT_SELECTED"
        };
    }

    const bookOption =
        shortNotesBook?.selectedOptions?.[0];

    if (
        author &&
        bookOption &&
        String(bookOption.dataset.author || "")
            .trim()
            .toLowerCase() !==
        author.toLowerCase()
    ) {

        return {
            ok: false,
            reason: "AUTHOR_BOOK_MISMATCH"
        };

    }

    return {
        ok: true,
        reason: "VALID"
    };

}


// ============================================================
// NEXORA BOOK -> CHAPTER CASCADE
// ============================================================
if (shortNotesBook) {
    shortNotesBook.addEventListener("change", () => {
        if (shortNotesChapter) {
            shortNotesChapter.innerHTML =
                '<option value="">Select Chapter</option>';
            shortNotesChapter.disabled = true;
        }

        if (typeof populateShortNotesChapters === "function") {
            populateShortNotesChapters();
        }
    });
}







/* NEXORA_BOOK_CHAPTER_CASCADE_V11 */
(function () {
    "use strict";

    let catalogue = null;
    let loading = null;

    const get = id => document.getElementById(id);

    const classEl = () => get("shortNotesClass");
    const subjectEl = () => get("shortNotesSubject");
    const bookEl = () => get("shortNotesBook");
    const chapterEl = () => get("shortNotesChapter");

    function classKey(value) {
        const v = String(value || "")
            .trim()
            .toLowerCase();

        const match = v.match(/(?:class\s*)?(\d{1,2})/);

        if (!match) return v;

        return "class" + match[1];
    }

    function clean(value) {
        return String(value || "").trim();
    }

    function reset(select, text) {
        if (!select) return;

        select.innerHTML = "";

        const option = document.createElement("option");
        option.value = "";
        option.textContent = text;
        option.selected = true;

        select.appendChild(option);
        select.disabled = true;
    }

    function add(select, value, text, extra = {}) {
        const option = document.createElement("option");

        option.value = value;
        option.textContent = text;

        Object.entries(extra).forEach(([key, val]) => {
            option.dataset[key] = val;
        });

        select.appendChild(option);
    }

    async function load() {
        if (catalogue) return catalogue;
        if (loading) return loading;

        const base =
            window.location.protocol === "file:"
                ? "http://localhost:5001"
                : window.location.origin;

        loading = fetch(
            base + "/api/short-notes/catalogue?version=11",
            {
                cache: "no-store"
            }
        )
        .then(async response => {
            if (!response.ok) {
                throw new Error(
                    "Catalogue HTTP " + response.status
                );
            }

            const data = await response.json();

            if (!data || !data.ok) {
                throw new Error(
                    "Invalid catalogue response"
                );
            }

            catalogue = data.classes || {};

            console.log(
                "NEXORA CATALOGUE V11:",
                catalogue
            );

            return catalogue;
        })
        .catch(error => {
            console.error(
                "NEXORA CATALOGUE ERROR:",
                error
            );

            catalogue = {};
            return catalogue;
        })
        .finally(() => {
            loading = null;
        });

        return loading;
    }

    function subjectName(key) {
        const names = {
            geography: "Geography",
            history: "History",
            polity: "Political Science / Polity",
            economics: "Economics",
            economy: "Economics",
            environment: "Environment",
            science: "Science",
            biology: "Biology",
            physics: "Physics",
            chemistry: "Chemistry",
            mathematics: "Mathematics",
            maths: "Mathematics",
            english: "English",
            hindi: "Hindi",
            sanskrit: "Sanskrit",
            sociology: "Sociology",
            psychology: "Psychology",
            computer: "Computer Science",
            "computer-science": "Computer Science"
        };

        return names[key] ||
            key
                .replace(/[-_]+/g, " ")
                .replace(/\b\w/g, x => x.toUpperCase());
    }

    function canonicalSubject(key) {
        const k = clean(key).toLowerCase();

        if (k === "economy") return "economics";
        if (k === "maths") return "mathematics";
        if (k === "computer-science") return "computer";

        return k;
    }

    async function subjects() {
        const subject = subjectEl();
        const book = bookEl();
        const chapter = chapterEl();
        const cls = classEl();

        if (!subject || !cls) return;

        reset(subject, "Select Subject");
        reset(book, "Select Book");
        reset(chapter, "Select Chapter");

        await load();

        const key = classKey(cls.value);
        const data = catalogue[key] || {};

        // IMPORTANT:
        // Deduplicate subjects by their visible/canonical name.
        const unique = new Map();

        Object.keys(data).forEach(rawKey => {
            const canonical = canonicalSubject(rawKey);

            if (!unique.has(canonical)) {
                unique.set(canonical, rawKey);
            }
        });

        [...unique.entries()]
            .sort((a, b) =>
                subjectName(a[0]).localeCompare(
                    subjectName(b[0])
                )
            )
            .forEach(([canonical, rawKey]) => {
                add(
                    subject,
                    rawKey,
                    subjectName(canonical)
                );
            });

        subject.disabled =
            subject.options.length <= 1;

        console.log(
            "NEXORA UNIQUE SUBJECTS:",
            [...unique.keys()]
        );
    }

    async function books() {
        const cls = classEl();
        const subject = subjectEl();
        const book = bookEl();
        const chapter = chapterEl();

        if (!cls || !subject || !book) return;

        reset(book, "Select Book");
        reset(chapter, "Select Chapter");

        await load();

        const key = classKey(cls.value);
        const data = catalogue[key] || {};

        let subjectData =
            data[subject.value];

        if (!subjectData) {
            const wanted =
                canonicalSubject(subject.value);

            const found =
                Object.keys(data).find(
                    x =>
                        canonicalSubject(x) === wanted
                );

            if (found) {
                subjectData = data[found];
            }
        }

        if (
            !subjectData ||
            !Array.isArray(subjectData.books)
        ) {
            console.warn(
                "No books for:",
                key,
                subject.value
            );
            return;
        }

        // Deduplicate by title + author.
        const unique = new Map();

        for (const item of subjectData.books) {
            if (!item || !item.title) continue;

            const title =
                clean(item.title);

            const author =
                clean(item.author);

            const id =
                clean(item.id);

            const dedupeKey =
                (
                    title.toLowerCase() +
                    "|" +
                    author.toLowerCase()
                );

            if (!unique.has(dedupeKey)) {
                unique.set(
                    dedupeKey,
                    {
                        ...item,
                        id:
                            id ||
                            "book-" +
                            title
                                .toLowerCase()
                                .replace(
                                    /[^a-z0-9]+/g,
                                    "-"
                                )
                    }
                );
            }
        }

        [...unique.values()]
            .sort((a, b) =>
                a.title.localeCompare(b.title)
            )
            .forEach(item => {
                add(
                    book,
                    item.id,
                    item.title,
                    {
                        author: clean(item.author)
                    }
                );
            });

        book.disabled =
            book.options.length <= 1;

        console.log(
            "NEXORA UNIQUE BOOKS:",
            [...unique.values()]
        );
    }

    async function chapters() {
        const cls = classEl();
        const subject = subjectEl();
        const book = bookEl();
        const chapter = chapterEl();

        if (
            !cls ||
            !subject ||
            !book ||
            !chapter
        ) return;

        reset(chapter, "Select Chapter");

        await load();

        const key = classKey(cls.value);
        const data = catalogue[key] || {};

        let subjectData =
            data[subject.value];

        if (!subjectData) {
            const wanted =
                canonicalSubject(subject.value);

            const found =
                Object.keys(data).find(
                    x =>
                        canonicalSubject(x) === wanted
                );

            if (found) {
                subjectData = data[found];
            }
        }

        if (
            !subjectData ||
            !Array.isArray(subjectData.books)
        ) {
            return;
        }

        const selectedId =
            clean(book.value);

        const selected =
            subjectData.books.find(
                item =>
                    clean(item.id) === selectedId
            );

        if (!selected) {
            console.warn(
                "Selected book not found:",
                selectedId
            );
            return;
        }

        const raw =
            Array.isArray(selected.chapters)
                ? selected.chapters
                : [];

        const unique = new Map();

        raw.forEach((item, index) => {
            const title =
                typeof item === "string"
                    ? clean(item)
                    : clean(
                        item?.titleEn ||
                        item?.title ||
                        item?.name ||
                        item?.titleHi
                    );

            if (!title) return;

            const id =
                typeof item === "object"
                    ? clean(item.id)
                    : "";

            const key =
                title.toLowerCase();

            if (!unique.has(key)) {
                unique.set(key, {
                    id:
                        id ||
                        selectedId +
                        "-chapter-" +
                        (index + 1),
                    title
                });
            }
        });

        [...unique.values()]
            .forEach(item => {
                add(
                    chapter,
                    item.id,
                    item.title
                );
            });

        chapter.disabled =
            chapter.options.length <= 1;

        console.log(
            "NEXORA CHAPTERS:",
            selected.title,
            [...unique.values()]
        );
    }

    // Remove old author/writer UI if present.
    function hideAuthor() {
        [
            "shortNotesAuthor",
            "shortNotesWriter",
            "shortNotesAuthorSelect",
            "shortNotesWriterSelect"
        ].forEach(id => {
            const el = get(id);

            if (!el) return;

            el.style.display = "none";

            const label =
                document.querySelector(
                    'label[for="' + id + '"]'
                );

            if (label) {
                label.style.display = "none";
            }
        });
    }

    const cls = classEl();
    const subject = subjectEl();
    const book = bookEl();

    // Capture listeners prevent the old duplicate
    // cascade listeners from rebuilding the selects.
    if (cls) {
        cls.addEventListener(
            "change",
            async event => {
                event.stopImmediatePropagation();
                await subjects();
            },
            true
        );
    }

    if (subject) {
        subject.addEventListener(
            "change",
            async event => {
                event.stopImmediatePropagation();
                await books();
            },
            true
        );
    }

    if (book) {
        book.addEventListener(
            "change",
            async event => {
                event.stopImmediatePropagation();
                await chapters();
            },
            true
        );
    }

    async function init() {
        hideAuthor();

        await load();

        if (
            cls &&
            clean(cls.value)
        ) {
            await subjects();
        }

        console.log(
            "NEXORA CASCADE V11 READY"
        );
    }

    window.NEXORARefreshSubjectsV11 = subjects;
    window.NEXORARefreshBooksV11 = books;
    window.NEXORARefreshChaptersV11 = chapters;

    if (
        document.readyState === "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            init,
            { once: true }
        );
    } else {
        init();
    }
})();


/* NEXORA_CHAPTER_PAYLOAD_NORMALIZER_V14 */

(function () {
    function nexoraV14Text(value) {
        return String(value ?? "").trim();
    }

    function nexoraV14SelectedText(select) {
        if (!select || !select.selectedOptions || !select.selectedOptions[0]) {
            return "";
        }

        return nexoraV14Text(
            select.selectedOptions[0].textContent
        );
    }

    /*
     * Keep the selected chapter's actual text available to backend.
     * This prevents a generated UI chapter ID from being mistaken
     * for a missing chapter.
     */
    window.nexoraNormaliseShortNotesSelectionV14 = function (payload) {
        const data = {
            ...(payload || {})
        };

        const bookEl =
            document.getElementById("shortNotesBook");

        const chapterEl =
            document.getElementById("shortNotesChapter");

        if (!data.bookId && bookEl) {
            data.bookId = nexoraV14Text(bookEl.value);
        }

        if (!data.bookTitle) {
            data.bookTitle =
                nexoraV14SelectedText(bookEl);
        }

        if (!data.chapter && chapterEl) {
            data.chapter = nexoraV14Text(chapterEl.value);
        }

        if (!data.chapterTitle) {
            data.chapterTitle =
                nexoraV14SelectedText(chapterEl);
        }

        return data;
    };
})();


/* NEXORA_UNIVERSAL_PAYLOAD_FINAL_V16 */

window.nexoraBuildUniversalShortNotesPayloadV16 = function () {
    const get = id => document.getElementById(id);

    const exam =
        get("shortNotesExam")?.value ||
        get("exam")?.value ||
        "UPSC";

    const className =
        get("shortNotesClass")?.value ||
        get("classSelect")?.value ||
        get("class")?.value ||
        "";

    const subject =
        get("shortNotesSubject")?.value ||
        get("subjectSelect")?.value ||
        get("subject")?.value ||
        "";

    const book =
        get("shortNotesBook");

    const chapter =
        get("shortNotesChapter");

    const bookId =
        book?.value || "";

    const bookTitle =
        book?.selectedOptions?.[0]?.textContent?.trim() || "";

    const chapterId =
        chapter?.value || "";

    const chapterTitle =
        chapter?.selectedOptions?.[0]?.textContent?.trim() || "";

    return {
        exam,
        className,
        subject,
        bookId,
        bookTitle,
        chapter: chapterId,
        chapterTitle,
        language:
            get("shortNotesLanguage")?.value ||
            get("language")?.value ||
            "english",
        mode:
            get("shortNotesMode")?.value ||
            get("mode")?.value ||
            "exam"
    };
};




/* NEXORA UNIVERSAL CHAPTER SELECT FALLBACK FINAL */

(function () {
    function scalar(v) {
        if (v == null) return "";
        if (typeof v === "string" || typeof v === "number") {
            return String(v).trim();
        }
        if (typeof v === "object") {
            return scalar(
                v.titleEn ||
                v.title ||
                v.name ||
                v.chapterTitle ||
                v.en ||
                v.id ||
                ""
            );
        }
        return String(v).trim();
    }

    function findChapterSelect() {
        return (
            document.querySelector(
                "#chapterSelect"
            ) ||
            document.querySelector(
                "select[name='chapter']"
            ) ||
            document.querySelector(
                "[id*='chapter'][id*='Select']"
            )
        );
    }

    function ensureUniversalChapterOption() {
        const select = findChapterSelect();
        if (!select) return;

        const usable =
            Array.from(select.options || [])
                .filter(function (o) {
                    return scalar(o.value) &&
                        scalar(o.textContent) &&
                        !/select chapter|choose chapter/i.test(
                            scalar(o.textContent)
                        );
                });

        if (usable.length) return;

        const option =
            document.createElement("option");

        option.value =
            "Selected Chapter / Topic";

        option.textContent =
            "Selected Chapter / Topic";

        select.appendChild(option);
        select.disabled = false;
    }

    window.NEXORAEnsureUniversalChapter =
        ensureUniversalChapterOption;

    document.addEventListener(
        "DOMContentLoaded",
        function () {
            setTimeout(
                ensureUniversalChapterOption,
                300
            );
            setTimeout(
                ensureUniversalChapterOption,
                1000
            );
            setTimeout(
                ensureUniversalChapterOption,
                2500
            );
        }
    );

    const observer =
        new MutationObserver(function () {
            ensureUniversalChapterOption();
        });

    observer.observe(
        document.documentElement,
        {
            childList: true,
            subtree: true
        }
    );

    console.log(
        "NEXORA UNIVERSAL CHAPTER SELECT FALLBACK FINAL: ACTIVE"
    );
})();



/* ============================================================
   NEXORA FINAL UNIVERSAL BOOK -> CHAPTER RESOLVER
   NCERT/Class books + Standard books
   Class is NOT required for standard books.
   ============================================================ */
(function () {
  if (window.NEXORA_FINAL_UNIVERSAL_CHAPTER_RESOLVER) return;
  window.NEXORA_FINAL_UNIVERSAL_CHAPTER_RESOLVER = true;

  function getBookSelect() {
    return document.getElementById("shortNotesBook");
  }

  function getChapterSelect() {
    return document.getElementById("shortNotesChapter");
  }

  function cleanArray(value) {
    if (!value) return [];

    if (Array.isArray(value)) return value;

    if (typeof value === "object") {
      return Object.values(value);
    }

    return [];
  }

  function chapterValue(ch, index) {
    if (typeof ch === "string") {
      return ch.trim();
    }

    if (!ch || typeof ch !== "object") return "";

    return String(
      ch.id ||
      ch.slug ||
      ch.key ||
      ch.chapterId ||
      ch.titleEn ||
      ch.title ||
      ch.name ||
      ch.chapterTitle ||
      ch.chapterTitleEn ||
      ch.topic ||
      ch.label ||
      ""
    ).trim();
  }

  function chapterLabel(ch, index) {
    if (typeof ch === "string") {
      return ch.trim();
    }

    if (!ch || typeof ch !== "object") return "";

    return String(
      ch.titleEn ||
      ch.title ||
      ch.name ||
      ch.chapterTitle ||
      ch.chapterTitleEn ||
      ch.topic ||
      ch.label ||
      ch.en ||
      ch.id ||
      ch.slug ||
      ""
    ).trim();
  }

  function extractChapters(book) {
    if (!book || typeof book !== "object") return [];

    const possible = [
      book.chapters,
      book.chapterList,
      book.chapterLists,
      book.standardChapters,
      book.verifiedChapters,
      book.officialChapters,
      book.topics,
      book.chapterData
    ];

    for (const value of possible) {
      const arr = cleanArray(value);
      if (arr.length) return arr;
    }

    return [];
  }

  function sameBook(a, b) {
    if (!a || !b) return false;

    const keys = [
      "id",
      "bookId",
      "value",
      "key",
      "slug",
      "bookKey"
    ];

    for (const key of keys) {
      if (
        a[key] != null &&
        b[key] != null &&
        String(a[key]).trim() === String(b[key]).trim()
      ) {
        return true;
      }
    }

    const at = String(
      a.title || a.titleEn || a.bookTitle || a.name || ""
    ).trim().toLowerCase();

    const bt = String(
      b.title || b.titleEn || b.bookTitle || b.name || ""
    ).trim().toLowerCase();

    return !!at && !!bt && at === bt;
  }

  function findBookInObject(root, selected) {
    if (!root || !selected) return null;

    const selectedValue = String(
      selected.value || ""
    ).trim();

    const selectedTitle = String(
      selected.dataset?.bookTitle ||
      selected.textContent ||
      ""
    )
      .replace(/\s+—\s+.*$/, "")
      .trim()
      .toLowerCase();

    const candidates = [];

    function walk(node, depth) {
      if (!node || depth > 7) return;

      if (Array.isArray(node)) {
        for (const item of node) {
          if (item && typeof item === "object") {
            const id = String(
              item.id ||
              item.bookId ||
              item.value ||
              item.key ||
              item.slug ||
              ""
            ).trim();

            const title = String(
              item.title ||
              item.titleEn ||
              item.bookTitle ||
              item.name ||
              ""
            ).trim().toLowerCase();

            if (
              (selectedValue && id === selectedValue) ||
              (selectedTitle && title === selectedTitle)
            ) {
              candidates.push(item);
            }
          }

          walk(item, depth + 1);
        }
        return;
      }

      if (typeof node !== "object") return;

      const id = String(
        node.id ||
        node.bookId ||
        node.value ||
        node.key ||
        node.slug ||
        ""
      ).trim();

      const title = String(
        node.title ||
        node.titleEn ||
        node.bookTitle ||
        node.name ||
        ""
      ).trim().toLowerCase();

      if (
        (selectedValue && id === selectedValue) ||
        (selectedTitle && title === selectedTitle)
      ) {
        candidates.push(node);
      }

      for (const key of Object.keys(node)) {
        if (
          key === "chapters" ||
          key === "chapterList" ||
          key === "standardChapters" ||
          key === "officialChapters" ||
          key === "topics"
        ) {
          continue;
        }

        walk(node[key], depth + 1);
      }
    }

    walk(root, 0);

    return candidates.length ? candidates[0] : null;
  }

  async function getCatalogueBook(selected) {
    const roots = [];

    if (Array.isArray(window.shortNotesBooks)) {
      roots.push(window.shortNotesBooks);
    }

    if (window.NEXORA_SHORT_NOTES_CATALOGUE) {
      roots.push(window.NEXORA_SHORT_NOTES_CATALOGUE);
    }

    if (window.NEXORA_COMPLETE_CATALOGUE_V5) {
      roots.push(window.NEXORA_COMPLETE_CATALOGUE_V5);
    }

    for (const root of roots) {
      const found = findBookInObject(root, selected);
      if (found) return found;
    }

    const urls = [
      "/api/short-notes/catalogue",
      "/api/short-notes/books",
      "/api/short-notes/manifest"
    ];

    for (const url of urls) {
      try {
        const response = await fetch(url, {
          method: "GET",
          cache: "no-store"
        });

        if (!response.ok) continue;

        const data = await response.json();

        const found = findBookInObject(data, selected);

        if (found) {
          console.log(
            "NEXORA FINAL CHAPTER: found book from",
            url
          );
          return found;
        }
      } catch (error) {
        console.warn(
          "NEXORA FINAL CHAPTER catalogue lookup failed:",
          url,
          error
        );
      }
    }

    return null;
  }

  async function finalPopulateShortNotesChapters() {
    const bookSelect = getBookSelect();
    const chapterSelect = getChapterSelect();

    if (!chapterSelect) return;

    chapterSelect.innerHTML =
      '<option value="">Select Chapter</option>';
    chapterSelect.disabled = true;

    if (!bookSelect || !bookSelect.value) {
      return;
    }

    const selectedOption =
      bookSelect.options[bookSelect.selectedIndex];

    if (!selectedOption) return;

    let book = null;

    try {
      if (selectedOption.dataset?.bookObject) {
        book = JSON.parse(
          selectedOption.dataset.bookObject
        );
      }
    } catch (_) {}

    if (!book) {
      const selectedValue = String(
        selectedOption.value || ""
      ).trim();

      const selectedTitle = String(
        selectedOption.dataset?.bookTitle ||
        selectedOption.textContent ||
        ""
      )
        .replace(/\s+—\s+.*$/, "")
        .trim()
        .toLowerCase();

      const localBooks = Array.isArray(window.shortNotesBooks)
        ? window.shortNotesBooks
        : [];

      book = localBooks.find(function (b) {
        if (!b) return false;

        const id = String(
          b.id ||
          b.bookId ||
          b.value ||
          b.key ||
          b.slug ||
          ""
        ).trim();

        const title = String(
          b.title ||
          b.titleEn ||
          b.bookTitle ||
          b.name ||
          ""
        ).trim().toLowerCase();

        return (
          (selectedValue && id === selectedValue) ||
          (selectedTitle && title === selectedTitle)
        );
      }) || null;
    }

    let chapters = extractChapters(book);

    if (!chapters.length) {
      const catalogueBook =
        await getCatalogueBook(selectedOption);

      if (catalogueBook) {
        book = catalogueBook;
        chapters = extractChapters(book);
      }
    }

    /*
       Standard books can be stored in a separate catalogue
       under standardBooks / books / catalogue arrays.
    */
    if (!chapters.length) {
      const roots = [
        window.NEXORA_COMPLETE_CATALOGUE_V5,
        window.NEXORA_SHORT_NOTES_CATALOGUE,
        window.shortNotesBooks
      ];

      for (const root of roots) {
        const found = findBookInObject(
          root,
          selectedOption
        );

        if (found) {
          const arr = extractChapters(found);

          if (arr.length) {
            book = found;
            chapters = arr;
            break;
          }
        }
      }
    }

    const usable = [];

    chapters.forEach(function (chapter, index) {
      const value = chapterValue(chapter, index);
      const label = chapterLabel(chapter, index);

      if (!value || !label) return;

      usable.push({
        value: value,
        label: label
      });
    });

    /*
       Remove duplicate chapters.
    */
    const seen = new Set();

    usable.forEach(function (chapter) {
      const key = (
        chapter.value +
        "|" +
        chapter.label
      ).toLowerCase();

      if (seen.has(key)) return;

      seen.add(key);

      const option =
        document.createElement("option");

      option.value = chapter.value;
      option.textContent = chapter.label;

      chapterSelect.appendChild(option);
    });

    if (seen.size > 0) {
      chapterSelect.disabled = false;

      console.log(
        "NEXORA FINAL CHAPTER READY:",
        selectedOption.textContent,
        "=>",
        seen.size,
        "chapters"
      );
    } else {
      /*
         Do NOT invent fake chapters.
         Keep selection disabled if the manifest/catalogue
         has no official chapter mapping.
      */
      console.warn(
        "NEXORA FINAL CHAPTER: no official chapters found for:",
        selectedOption.textContent
      );
    }
  }

  /*
     Replace the old function with the universal resolver.
  */
  window.populateShortNotesChapters =
    finalPopulateShortNotesChapters;

  /*
     Direct Book -> Chapter event.
  */
  function bindFinalBookChapterEvent() {
    const bookSelect = getBookSelect();

    if (!bookSelect) return;

    if (bookSelect.dataset.nexoraFinalChapterBound === "1") {
      return;
    }

    bookSelect.dataset.nexoraFinalChapterBound = "1";

    bookSelect.addEventListener(
      "change",
      async function () {
        await finalPopulateShortNotesChapters();
      },
      true
    );

    console.log(
      "NEXORA FINAL: Book -> Chapter event bound"
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      bindFinalBookChapterEvent
    );
  } else {
    bindFinalBookChapterEvent();
  }

  /*
     Some older code rebuilds the Book select after DOMContentLoaded.
     Rebind safely whenever the select appears/reappears.
  */
  const observer = new MutationObserver(function () {
    bindFinalBookChapterEvent();
  });

  if (document.documentElement) {
    observer.observe(
      document.documentElement,
      {
        childList: true,
        subtree: true
      }
    );
  }

  console.log(
    "NEXORA FINAL UNIVERSAL BOOK -> CHAPTER RESOLVER: ACTIVE"
  );
})();


/* ============================================================
   NEXORA DIRECT CHAPTER API FRONTEND FINAL
   ============================================================ */
(function () {
  if (window.NEXORA_DIRECT_CHAPTER_FRONTEND_FINAL) return;
  window.NEXORA_DIRECT_CHAPTER_FRONTEND_FINAL = true;

  async function loadDirectChapters() {
    const bookSelect =
      document.getElementById("shortNotesBook");

    const chapterSelect =
      document.getElementById("shortNotesChapter");

    if (!bookSelect || !chapterSelect) return;

    if (!bookSelect.value) {
      chapterSelect.innerHTML =
        '<option value="">Select Chapter</option>';
      chapterSelect.disabled = true;
      return;
    }

    const classSelect =
      document.getElementById("shortNotesClass");

    const subjectSelect =
      document.getElementById("shortNotesSubject");

    const selectedBook =
      bookSelect.options[bookSelect.selectedIndex];

    const classValue =
      classSelect?.value || "";

    const subjectValue =
      subjectSelect?.value || "";

    const bookValue =
      bookSelect.value || "";

    const bookTitle =
      selectedBook?.dataset?.bookTitle ||
      selectedBook?.textContent ||
      bookValue;

    chapterSelect.innerHTML =
      '<option value="">Loading Chapters...</option>';

    chapterSelect.disabled = true;

    const params = new URLSearchParams();

    params.set("class", classValue);
    params.set("subject", subjectValue);
    params.set("book", bookValue);

    params.set(
      "bookTitle",
      String(bookTitle).replace(/\s+—\s+.*$/, "").trim()
    );

    try {
      const response = await fetch(
        "/api/short-notes/chapters?" +
        params.toString(),
        {
          method: "GET",
          cache: "no-store"
        }
      );

      if (!response.ok) {
        throw new Error(
          "Chapter API HTTP " + response.status
        );
      }

      const data = await response.json();

      const chapters =
        Array.isArray(data.chapters)
          ? data.chapters
          : [];

      chapterSelect.innerHTML =
        '<option value="">Select Chapter</option>';

      if (chapters.length) {
        chapters.forEach(function (chapter) {
          const option =
            document.createElement("option");

          option.value =
            chapter.value ||
            chapter.id ||
            chapter.title ||
            chapter.label;

          option.textContent =
            chapter.label ||
            chapter.title ||
            chapter.name ||
            option.value;

          chapterSelect.appendChild(option);
        });

        chapterSelect.disabled = false;

        console.log(
          "NEXORA DIRECT CHAPTER SUCCESS:",
          bookTitle,
          "=>",
          chapters.length,
          "chapters"
        );
      } else {
        console.warn(
          "NEXORA DIRECT CHAPTER API returned 0 chapters:",
          {
            classValue,
            subjectValue,
            bookValue,
            bookTitle
          }
        );
      }
    } catch (error) {
      console.error(
        "NEXORA DIRECT CHAPTER ERROR:",
        error
      );

      chapterSelect.innerHTML =
        '<option value="">Select Chapter</option>';

      chapterSelect.disabled = true;
    }
  }

  window.nexoraLoadDirectChapters =
    loadDirectChapters;

  function bind() {
    const book =
      document.getElementById("shortNotesBook");

    if (!book) return;

    if (
      book.dataset.directChapterApiBound === "1"
    ) {
      return;
    }

    book.dataset.directChapterApiBound = "1";

    book.addEventListener(
      "change",
      function () {
        setTimeout(
          loadDirectChapters,
          50
        );
      },
      true
    );

    console.log(
      "NEXORA DIRECT CHAPTER EVENT: ACTIVE"
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      bind
    );
  } else {
    bind();
  }

  new MutationObserver(bind).observe(
    document.documentElement,
    {
      childList: true,
      subtree: true
    }
  );
})();

/* ============================================================
   NEXORA FINAL BOOK -> CHAPTER UNIVERSAL FIX V30
   Fixes:
   - No subject catalogue found
   - Standard books without class
   - NCERT books with class
   - Math / Chemistry / all subjects
   - Direct backend chapter resolver
   ============================================================ */

(function () {
  if (window.NEXORA_FINAL_BOOK_CHAPTER_V30) return;
  window.NEXORA_FINAL_BOOK_CHAPTER_V30 = true;

  console.log("NEXORA FINAL BOOK -> CHAPTER UNIVERSAL FIX V30: ACTIVE");

  const examEl = document.getElementById("shortNotesExam");
  const classEl = document.getElementById("shortNotesClass");
  const subjectEl = document.getElementById("shortNotesSubject");
  const bookEl = document.getElementById("shortNotesBook");
  const chapterEl = document.getElementById("shortNotesChapter");

  if (!bookEl || !chapterEl) {
    console.warn("NEXORA V30: Book/Chapter element missing");
    return;
  }

  function norm(v) {
    return String(v || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getBookTitle(book) {
    return (
      book?.title ||
      book?.bookTitle ||
      book?.name ||
      book?.titleEn ||
      book?.bookName ||
      ""
    );
  }

  function getBookId(book) {
    return (
      book?.id ||
      book?.bookId ||
      book?.value ||
      book?.slug ||
      ""
    );
  }

  function flattenBooks(data) {
    const result = [];
    const seen = new Set();

    function walk(x) {
      if (!x) return;

      if (Array.isArray(x)) {
        x.forEach(walk);
        return;
      }

      if (typeof x !== "object") return;

      const title = getBookTitle(x);
      const id = getBookId(x);

      if (title || id) {
        const key = norm(id || title);

        if (
          key &&
          !seen.has(key) &&
          (
            Array.isArray(x.chapters) ||
            Array.isArray(x.chapterList) ||
            Array.isArray(x.topics) ||
            x.bookId ||
            x.id ||
            x.title ||
            x.name
          )
        ) {
          seen.add(key);
          result.push(x);
        }
      }

      Object.keys(x).forEach(k => {
        const v = x[k];

        if (
          k !== "chapters" &&
          k !== "chapterList" &&
          k !== "topics"
        ) {
          walk(v);
        }
      });
    }

    walk(data);
    return result;
  }

  async function getUniversalBooks() {
    let books = [];

    if (Array.isArray(window.shortNotesBooks)) {
      books = flattenBooks(window.shortNotesBooks);
    }

    if (books.length) return books;

    const urls = [
      "/api/short-notes/catalogue",
      "/api/short-notes/books",
      "/api/short-notes/manifest"
    ];

    for (const url of urls) {
      try {
        const response = await fetch(url, {
          cache: "no-store"
        });

        if (!response.ok) continue;

        const data = await response.json();
        const found = flattenBooks(data);

        if (found.length) {
          books = found;
          break;
        }
      } catch (e) {
        console.warn("NEXORA V30 catalogue fetch failed:", url, e);
      }
    }

    return books;
  }

  async function rebuildBooks() {
    const subject = norm(subjectEl?.value);
    const classValue = norm(classEl?.value);
    const exam = norm(examEl?.value);

    console.log(
      "NEXORA V30 BOOK BUILD:",
      { exam, classValue, subject }
    );

    const books = await getUniversalBooks();

    console.log(
      "NEXORA V30 UNIVERSAL BOOK COUNT:",
      books.length
    );

    bookEl.innerHTML =
      '<option value="">Select Book</option>';

    chapterEl.innerHTML =
      '<option value="">Select Chapter</option>';

    chapterEl.disabled = true;

    let selectedBooks = books;

    if (subject) {
      const subjectBooks = books.filter(book => {
        const text = norm([
          book.subject,
          book.subjectName,
          book.subjectTitle,
          book.category,
          getBookTitle(book)
        ].join(" "));

        return text.includes(subject) || subject.includes(text);
      });

      if (subjectBooks.length) {
        selectedBooks = subjectBooks;
      }
    }

    console.log(
      "NEXORA V30 SUBJECT BOOK COUNT:",
      selectedBooks.length
    );

    selectedBooks.forEach((book, index) => {
      const title = getBookTitle(book);

      if (!title) return;

      const option = document.createElement("option");

      option.value =
        getBookId(book) ||
        title;

      option.textContent = title;

      option.dataset.bookId =
        getBookId(book);

      option.dataset.bookTitle =
        title;

      option.dataset.bookObject =
        JSON.stringify(book);

      bookEl.appendChild(option);
    });

    const custom = document.createElement("option");
    custom.value = "custom";
    custom.textContent = "Custom / Other Book";
    bookEl.appendChild(custom);

    console.log(
      "NEXORA V30 BOOK DROPDOWN READY:",
      bookEl.options.length - 1
    );
  }

  async function loadUniversalChapters() {
    const selected =
      bookEl.options[bookEl.selectedIndex];

    if (!selected || !selected.value) {
      chapterEl.innerHTML =
        '<option value="">Select Chapter</option>';
      chapterEl.disabled = true;
      return;
    }

    if (selected.value === "custom") {
      chapterEl.innerHTML =
        '<option value="">Enter / Select Custom Chapter</option>';
      chapterEl.disabled = false;
      return;
    }

    const bookId =
      selected.dataset.bookId ||
      selected.value;

    const bookTitle =
      selected.dataset.bookTitle ||
      selected.textContent;

    console.log(
      "NEXORA V30 LOADING CHAPTERS:",
      bookId,
      bookTitle
    );

    chapterEl.innerHTML =
      '<option value="">Loading Chapters...</option>';
    chapterEl.disabled = true;

    let chapters = [];

    try {
      const params = new URLSearchParams({
        class: classEl?.value || "",
        subject: subjectEl?.value || "",
        book: bookId,
        bookTitle: bookTitle,
        exam: examEl?.value || ""
      });

      const response = await fetch(
        "/api/short-notes/chapters?" +
        params.toString(),
        { cache: "no-store" }
      );

      if (response.ok) {
        const data = await response.json();

        chapters =
          data?.chapters ||
          data?.chapterList ||
          data?.topics ||
          [];
      }
    } catch (error) {
      console.warn(
        "NEXORA V30 direct chapter API failed:",
        error
      );
    }

    if (!chapters.length) {
      try {
        const book =
          JSON.parse(selected.dataset.bookObject || "{}");

        chapters =
          book.chapters ||
          book.chapterList ||
          book.standardChapters ||
          book.verifiedChapters ||
          book.officialChapters ||
          book.topics ||
          [];
      } catch (_) {}
    }

    if (!Array.isArray(chapters)) {
      chapters = Object.values(chapters || {});
    }

    chapterEl.innerHTML =
      '<option value="">Select Chapter</option>';

    const seen = new Set();

    chapters.forEach((chapter, index) => {
      let value = "";
      let label = "";

      if (typeof chapter === "string") {
        value = chapter;
        label = chapter;
      } else if (chapter && typeof chapter === "object") {
        value =
          chapter.id ||
          chapter.chapterId ||
          chapter.slug ||
          chapter.titleEn ||
          chapter.title ||
          chapter.name ||
          "";

        label =
          chapter.titleEn ||
          chapter.title ||
          chapter.name ||
          chapter.chapterTitle ||
          value;
      }

      value = String(value || "").trim();
      label = String(label || "").trim();

      if (!value || !label) return;

      const key = norm(value + "|" + label);

      if (seen.has(key)) return;
      seen.add(key);

      const option =
        document.createElement("option");

      option.value = value;
      option.textContent = label;

      chapterEl.appendChild(option);
    });

    chapterEl.disabled =
      chapterEl.options.length <= 1;

    console.log(
      "NEXORA V30 CHAPTER COUNT:",
      Math.max(0, chapterEl.options.length - 1)
    );
  }

  async function refreshBooks() {
    try {
      await rebuildBooks();
    } catch (error) {
      console.error(
        "NEXORA V30 BOOK BUILD ERROR:",
        error
      );
    }
  }

  if (!bookEl.dataset.nexoraV30Bound) {
    bookEl.dataset.nexoraV30Bound = "1";

    bookEl.addEventListener(
      "change",
      loadUniversalChapters
    );
  }

  if (subjectEl) {
    subjectEl.addEventListener(
      "change",
      refreshBooks
    );
  }

  if (classEl) {
    classEl.addEventListener(
      "change",
      refreshBooks
    );
  }

  if (examEl) {
    examEl.addEventListener(
      "change",
      refreshBooks
    );
  }

  document.addEventListener(
    "DOMContentLoaded",
    () => {
      setTimeout(refreshBooks, 300);
    },
    { once: true }
  );

  setTimeout(refreshBooks, 500);

})();



/* ============================================================
   NEXORA_FINAL_ONE_CLICK_UNIVERSAL_ENGINE_V1
   Final Book -> Chapter -> Notes controller
   ============================================================ */
(function NEXORA_FINAL_ONE_CLICK_UNIVERSAL_ENGINE_V1(){

  if (window.__NEXORA_FINAL_ONE_CLICK_ENGINE__) return;
  window.__NEXORA_FINAL_ONE_CLICK_ENGINE__ = true;

  console.log("[NEXORA FINAL] ONE-CLICK UNIVERSAL ENGINE ACTIVE");

  const $ = id => document.getElementById(id);

  function textOf(el){
    if(!el) return "";
    const o = el.options && el.options[el.selectedIndex];
    return ((o && o.text) || el.value || "").trim();
  }

  function find(ids){
    for(const id of ids){
      const el=$(id);
      if(el) return el;
    }
    return null;
  }

  const exam   = find(["shortNotesExam","exam"]);
  const cls    = find(["shortNotesClass","class"]);
  const subj   = find(["shortNotesSubject","subject"]);
  const book   = find(["shortNotesBook","book"]);
  const chap   = find(["shortNotesChapter","chapter"]);
  const lang   = find(["shortNotesLanguage","language"]);
  const mode   = find(["shortNotesMode","mode"]);

  function rebuildChapter(){

    if(!book || !chap) return;

    const opt = book.options[book.selectedIndex];
    if(!opt) return;

    let data = null;

    try{
      data = opt.dataset && opt.dataset.book
        ? JSON.parse(opt.dataset.book)
        : null;
    }catch(e){}

    let chapters =
      data?.chapters ||
      data?.chapterList ||
      opt.dataset?.chapters;

    if(typeof chapters === "string"){
      try{ chapters=JSON.parse(chapters); }catch(e){}
    }

    if(!Array.isArray(chapters) || !chapters.length){
      chapters = [];
    }

    const old = chap.value;

    chap.innerHTML =
      '<option value="">Select Chapter</option>';

    const seen = new Set();

    chapters.forEach((c,i)=>{
      let title="";

      if(typeof c==="string"){
        title=c.trim();
      }else if(c && typeof c==="object"){
        title=(
          c.titleEn ||
          c.title ||
          c.name ||
          c.chapter ||
          c.label ||
          c.titleHi ||
          ""
        ).toString().trim();
      }

      if(!title || seen.has(title.toLowerCase())) return;

      seen.add(title.toLowerCase());

      const o=document.createElement("option");
      o.value=title;
      o.textContent=title;

      try{
        o.dataset.chapter=JSON.stringify(
          typeof c==="string" ? {title:title} : c
        );
      }catch(e){}

      chap.appendChild(o);
    });

    if(old){
      const found=[...chap.options].find(o=>o.value===old);
      if(found) chap.value=old;
    }

    chap.disabled=chap.options.length<=1;

    console.log(
      "[NEXORA FINAL] CHAPTERS:",
      book.value,
      chap.options.length-1
    );
  }

  if(book){
    book.addEventListener("change",()=>{
      setTimeout(rebuildChapter,20);
    },true);
  }

  if(subj){
    subj.addEventListener("change",()=>{
      setTimeout(rebuildChapter,100);
    },true);
  }

  setTimeout(rebuildChapter,500);
  setTimeout(rebuildChapter,1500);
  setTimeout(rebuildChapter,3000);

  /*
     Capture the final selected chapter text so older handlers
     cannot replace a real chapter with an internal ID.
  */
  document.addEventListener("change",e=>{
    if(e.target===chap && chap){
      const selected=textOf(chap);
      if(selected){
        chap.dataset.finalChapter=selected;
        console.log("[NEXORA FINAL] SELECTED CHAPTER:",selected);
      }
    }
  },true);

  /*
     Before any form submission, force the real human-readable
     chapter title into the normal fields used by NEXORA.
  */
  document.addEventListener("submit",e=>{
    if(!chap || !textOf(chap)) return;

    const chapterText=textOf(chap);

    chap.value=chapterText;
    chap.dataset.finalChapter=chapterText;

    let hidden=document.getElementById(
      "nexoraFinalChapter"
    );

    if(!hidden){
      hidden=document.createElement("input");
      hidden.type="hidden";
      hidden.id="nexoraFinalChapter";
      hidden.name="chapter";
      document.body.appendChild(hidden);
    }

    hidden.value=chapterText;

    console.log(
      "[NEXORA FINAL] SUBMIT CHAPTER:",
      chapterText
    );
  },true);

  /*
     Expose final values for the existing generator code.
  */
  window.NEXORA_FINAL_SELECTION=function(){

    return {
      exam:textOf(exam),
      className:textOf(cls),
      subject:textOf(subj),
      book:textOf(book),
      chapter:textOf(chap),
      chapterTitle:textOf(chap),
      language:textOf(lang),
      mode:textOf(mode)
    };

  };

})();


/* ============================================================
   NEXORA FINAL CHAPTER SYNCHRONIZER
   ============================================================ */
(function(){
  if(window.__NEXORA_CHAPTER_SYNC_FINAL__) return;
  window.__NEXORA_CHAPTER_SYNC_FINAL__=true;

  const get=id=>document.getElementById(id);
  const book=get("shortNotesBook");
  const chapter=get("shortNotesChapter");

  function rebuild(){
    if(!book || !chapter) return;

    const o=book.options[book.selectedIndex];
    if(!o) return;

    let data=null;
    try{
      if(o.dataset.book) data=JSON.parse(o.dataset.book);
    }catch(e){}

    let list=data && (data.chapters || data.chapterList);

    if(typeof list==="string"){
      try{list=JSON.parse(list)}catch(e){list=[]}
    }

    if(!Array.isArray(list)) list=[];

    const old=chapter.value;
    chapter.innerHTML='<option value="">Select Chapter</option>';

    const seen=new Set();

    list.forEach(x=>{
      let t="";
      if(typeof x==="string") t=x.trim();
      else if(x && typeof x==="object")
        t=String(x.titleEn||x.title||x.name||x.chapter||x.label||x.titleHi||"").trim();

      if(!t || seen.has(t.toLowerCase())) return;
      seen.add(t.toLowerCase());

      const op=document.createElement("option");
      op.value=t;
      op.textContent=t;
      op.dataset.chapter=t;
      chapter.appendChild(op);
    });

    if(old && [...chapter.options].some(x=>x.value===old))
      chapter.value=old;

    chapter.disabled=chapter.options.length<=1;

    console.log(
      "[NEXORA FINAL FIX] BOOK:",
      o.textContent,
      "CHAPTERS:",
      chapter.options.length-1
    );
  }

  if(book){
    book.addEventListener("change",()=>setTimeout(rebuild,50),true);
  }

  if(chapter){
    chapter.addEventListener("change",()=>{
      const x=chapter.options[chapter.selectedIndex];
      if(x){
        chapter.value=x.textContent.trim();
        chapter.dataset.finalValue=x.textContent.trim();
        console.log("[NEXORA FINAL FIX] SELECTED:",chapter.value);
      }
    },true);
  }

  setTimeout(rebuild,300);
  setTimeout(rebuild,1000);
  setTimeout(rebuild,2000);
})();



// ============================================================
// NEXORA_FINAL_BOOK_CHAPTER_PAYLOAD_V1
// Always preserve the real selected Book + Chapter text.
// This is especially important for standard/reference books.
// ============================================================
console.log("NEXORA FINAL BOOK/CHAPTER PAYLOAD V1: ACTIVE");

/* ============================================================
   NEXORA UNIVERSAL SHORT NOTES UI — FINAL CASCADE CONTROLLER
   Class -> Subject -> Author -> Book -> Chapter
   Uses /api/short-notes/universal-catalogue
   ============================================================ */
(function NEXORA_UNIVERSAL_UI_FINAL() {
  "use strict";

  if (window.NEXORA_UNIVERSAL_UI_FINAL_ACTIVE) return;
  window.NEXORA_UNIVERSAL_UI_FINAL_ACTIVE = true;

  const state = {
    catalogue: null,
    loading: false
  };

  const $ = id => document.getElementById(id);

  const classEl   = () => $("shortNotesClass") || $("classSelect");
  const subjectEl = () => $("shortNotesSubject") || $("subjectSelect");
  const authorEl  = () => $("shortNotesAuthor");
  const bookEl    = () => $("shortNotesBook") || $("bookSelect");
  const chapterEl = () => $("shortNotesChapter") || $("chapterSelect");

  function text(v) {
    return String(v == null ? "" : v).trim();
  }

  function norm(v) {
    return text(v)
      .toLowerCase()
      .replace(/[–—]/g, "-")
      .replace(/\s+/g, " ")
      .trim();
  }

  function option(select, value, label, extra) {
    const o = document.createElement("option");
    o.value = text(value);
    o.textContent = text(label) || text(value);

    if (extra && typeof extra === "object") {
      Object.keys(extra).forEach(k => {
        try {
          o.dataset[k] = text(extra[k]);
        } catch (_) {}
      });
    }

    return o;
  }

  function clearSelect(el, placeholder, disabled) {
    if (!el) return;
    el.innerHTML = "";
    el.appendChild(option(el, "", placeholder));
    el.disabled = !!disabled;
  }

  function getBooks() {
    const books =
      state.catalogue &&
      Array.isArray(state.catalogue.books)
        ? state.catalogue.books
        : [];

    return books;
  }

  function bookClass(b) {
    return text(
      b.class ||
      b.classId ||
      b.className ||
      b.standard ||
      b.grade ||
      ""
    );
  }

  function bookSubject(b) {
    return text(
      b.subject ||
      b.subjectName ||
      b.subjectId ||
      ""
    );
  }

  function bookAuthor(b) {
    return text(
      b.author ||
      b.writer ||
      b.authorName ||
      b.writerName ||
      ""
    );
  }

  function bookTitle(b) {
    return text(
      b.titleEn ||
      b.title ||
      b.bookTitle ||
      b.name ||
      b.titleHi ||
      ""
    );
  }

  function bookId(b, index) {
    return text(
      b.id ||
      b.bookId ||
      b.key ||
      b.slug ||
      b.value ||
      "book-" + index
    );
  }

  function chaptersOf(b) {
    if (!b) return [];

    const arr =
      b.chapters ||
      b.chapterList ||
      b.standardChapters ||
      b.officialChapters ||
      [];

    return Array.isArray(arr) ? arr : [];
  }

  function chapterTitle(c, i) {
    if (typeof c === "string") return text(c);

    return text(
      c &&
      (
        c.title ||
        c.titleEn ||
        c.name ||
        c.label ||
        c.chapterTitle ||
        c.chapter
      )
    ) || ("Chapter " + (i + 1));
  }

  function chapterValue(c, i) {
    if (typeof c === "string") return text(c);

    return text(
      c &&
      (
        c.id ||
        c.value ||
        c.chapterId ||
        c.key ||
        c.slug ||
        c.title ||
        c.name
      )
    ) || ("chapter-" + (i + 1));
  }

  async function loadCatalogue() {
    if (state.catalogue) return state.catalogue;
    if (state.loading) return null;

    state.loading = true;

    try {
      const response = await fetch(
        "/api/short-notes/universal-catalogue",
        {
          method: "GET",
          cache: "no-store"
        }
      );

      if (!response.ok) {
        throw new Error(
          "Universal catalogue HTTP " + response.status
        );
      }

      const data = await response.json();

      if (!data || data.success === false) {
        throw new Error("Universal catalogue unavailable");
      }

      state.catalogue = data;

      window.NEXORA_SHORT_NOTES_CATALOGUE = data;

      if (Array.isArray(data.books)) {
        window.shortNotesBooks = data.books;
      }

      console.log(
        "NEXORA UNIVERSAL UI: catalogue loaded",
        data.books?.length || 0,
        "books"
      );

      return data;
    } catch (error) {
      console.error(
        "NEXORA UNIVERSAL UI: catalogue load failed",
        error
      );

      return null;
    } finally {
      state.loading = false;
    }
  }

  function populateClasses() {
    const el = classEl();
    if (!el || !state.catalogue) return;

    const old = text(el.value);

    const classes = Array.isArray(state.catalogue.classes)
      ? state.catalogue.classes
      : [];

    clearSelect(el, "Select Class", false);

    const seen = new Set();

    classes.forEach(c => {
      const value =
        typeof c === "string"
          ? text(c)
          : text(c.id || c.value || c.class || c.name || c.label);

      const label =
        typeof c === "string"
          ? text(c)
          : text(c.label || c.name || c.className || c.title || value);

      if (!value || seen.has(norm(value))) return;

      seen.add(norm(value));
      el.appendChild(option(el, value, label));
    });

    if (
      old &&
      Array.from(el.options).some(o => o.value === old)
    ) {
      el.value = old;
    }

    console.log(
      "NEXORA UNIVERSAL UI: classes",
      el.options.length - 1
    );
  }

  function populateSubjects() {
    const el = subjectEl();
    if (!el || !state.catalogue) return;

    const old = text(el.value);

    const subjects = Array.isArray(state.catalogue.subjects)
      ? state.catalogue.subjects
      : [];

    clearSelect(el, "Select Subject", false);

    const seen = new Set();

    subjects.forEach(s => {
      const value =
        typeof s === "string"
          ? text(s)
          : text(s.id || s.value || s.subject || s.name || s.label);

      const label =
        typeof s === "string"
          ? text(s)
          : text(s.label || s.name || s.subjectName || s.title || value);

      if (!value || seen.has(norm(value))) return;

      seen.add(norm(value));
      el.appendChild(option(el, value, label));
    });

    if (
      old &&
      Array.from(el.options).some(o => o.value === old)
    ) {
      el.value = old;
    }
  }

  function matchingBooks() {
    const cls = norm(classEl()?.value);
    const sub = norm(subjectEl()?.value);
    const author = norm(authorEl()?.value);

    return getBooks().filter(b => {
      const bc = norm(bookClass(b));
      const bs = norm(bookSubject(b));
      const ba = norm(bookAuthor(b));

      const classOK =
        !cls ||
        bc === cls ||
        norm(b.className) === cls ||
        norm(b.classId) === cls;

      const subjectOK =
        !sub ||
        bs === sub ||
        norm(b.subjectName) === sub ||
        norm(b.subjectId) === sub;

      const authorOK =
        !author ||
        author === "__custom_author__" ||
        ba === author;

      return classOK && subjectOK && authorOK;
    });
  }

  function populateAuthors() {
    const el = authorEl();
    if (!el) return;

    const books = matchingBooks();
    const old = text(el.value);

    clearSelect(el, "Select Writer / Author", false);

    const seen = new Set();

    books.forEach(b => {
      const a = bookAuthor(b);
      if (!a || seen.has(norm(a))) return;

      seen.add(norm(a));
      el.appendChild(option(el, a, a));
    });

    const custom = option(
      el,
      "__custom_author__",
      "Custom / Other Author"
    );

    el.appendChild(custom);

    if (
      old &&
      Array.from(el.options).some(o => o.value === old)
    ) {
      el.value = old;
    }
  }

  function populateBooks() {
    const el = bookEl();
    if (!el) return;

    const books = matchingBooks();
    const old = text(el.value);

    clearSelect(el, "Select Book", false);

    const seen = new Set();

    books.forEach((b, index) => {
      const title = bookTitle(b);
      if (!title) return;

      const id = bookId(b, index);
      const key = norm(id) + "|" + norm(title);

      if (seen.has(key)) return;
      seen.add(key);

      const o = option(el, id, title);

      o.dataset.bookTitle = title;
      o.dataset.author = bookAuthor(b);

      try {
        o.dataset.bookObject = JSON.stringify(b);
      } catch (_) {}

      el.appendChild(o);
    });

    el.appendChild(
      option(el, "custom", "Custom / Other Book")
    );

    if (
      old &&
      Array.from(el.options).some(o => o.value === old)
    ) {
      el.value = old;
    }

    clearSelect(
      chapterEl(),
      "Select Chapter",
      true
    );

    console.log(
      "NEXORA UNIVERSAL UI: books",
      books.length,
      "for",
      classEl()?.value,
      subjectEl()?.value
    );
  }

  async function populateChapters() {
    const book = bookEl();
    const chapter = chapterEl();

    if (!chapter) return;

    clearSelect(chapter, "Select Chapter", true);

    if (!book || !book.value) return;

    const selected =
      book.options[book.selectedIndex];

    if (!selected) return;

    let b = null;

    try {
      if (selected.dataset.bookObject) {
        b = JSON.parse(selected.dataset.bookObject);
      }
    } catch (_) {}

    let chapters = chaptersOf(b);

    /*
      If the book option does not contain chapters,
      use the authoritative chapter API.
    */
    if (!chapters.length && book.value !== "custom") {
      const params = new URLSearchParams();

      params.set(
        "class",
        text(classEl()?.value)
      );

      params.set(
        "subject",
        text(subjectEl()?.value)
      );

      params.set(
        "book",
        text(book.value)
      );

      params.set(
        "bookTitle",
        text(
          selected.dataset.bookTitle ||
          selected.textContent
        ).replace(/\s+—\s+.*$/, "")
      );

      try {
        const response = await fetch(
          "/api/short-notes/chapters?" +
          params.toString(),
          {
            method: "GET",
            cache: "no-store"
          }
        );

        if (response.ok) {
          const data = await response.json();

          chapters =
            Array.isArray(data.chapters)
              ? data.chapters
              : [];
        }
      } catch (error) {
        console.warn(
          "NEXORA UNIVERSAL UI: chapter API failed",
          error
        );
      }
    }

    const seen = new Set();

    chapters.forEach((c, i) => {
      const value = chapterValue(c, i);
      const label = chapterTitle(c, i);

      if (!value || !label) return;

      const key =
        norm(value) + "|" + norm(label);

      if (seen.has(key)) return;

      seen.add(key);

      chapter.appendChild(
        option(chapter, value, label)
      );
    });

    if (seen.size) {
      chapter.disabled = false;

      console.log(
        "NEXORA UNIVERSAL UI: chapters",
        seen.size,
        "for",
        selected.textContent
      );
    } else {
      console.warn(
        "NEXORA UNIVERSAL UI: no official chapters for",
        selected.textContent
      );
    }
  }

  async function refreshBooks() {
    await loadCatalogue();

    if (!state.catalogue) return;

    populateAuthors();
    populateBooks();
  }

  async function refreshAll() {
    await loadCatalogue();

    if (!state.catalogue) {
      console.error(
        "NEXORA: Universal catalogue could not be loaded."
      );
      return;
    }

    populateClasses();
    populateSubjects();
    populateAuthors();
    populateBooks();
  }

  function bind() {
    const cls = classEl();
    const sub = subjectEl();
    const author = authorEl();
    const book = bookEl();

    if (!cls || !sub || !book) {
      setTimeout(bind, 300);
      return;
    }

    if (cls.dataset.universalFinalBound !== "1") {
      cls.dataset.universalFinalBound = "1";

      cls.addEventListener("change", () => {
        setTimeout(async () => {
          populateSubjects();
          await refreshBooks();
        }, 80);
      }, true);
    }

    if (sub.dataset.universalFinalBound !== "1") {
      sub.dataset.universalFinalBound = "1";

      sub.addEventListener("change", () => {
        setTimeout(async () => {
          await refreshBooks();
        }, 80);
      }, true);
    }

    if (
      author &&
      author.dataset.universalFinalBound !== "1"
    ) {
      author.dataset.universalFinalBound = "1";

      author.addEventListener("change", () => {
        setTimeout(() => {
          populateBooks();
        }, 80);
      }, true);
    }

    if (
      book &&
      book.dataset.universalFinalBound !== "1"
    ) {
      book.dataset.universalFinalBound = "1";

      book.addEventListener("change", () => {
        setTimeout(async () => {
          await populateChapters();
        }, 120);
      }, true);
    }

    refreshAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      bind
    );
  } else {
    bind();
  }

  setTimeout(bind, 500);
  setTimeout(bind, 1500);

  console.log(
    "NEXORA UNIVERSAL SHORT NOTES UI: FINAL CONTROLLER ACTIVE"
  );
})();

/* ============================================================
   NEXORA FINAL CASCADE CONTROLLER V31
   One clean flow: Class -> Subject -> Book -> Chapter
   ============================================================ */
(function NEXORA_FINAL_CASCADE_V31() {
  "use strict";

  const find = (...ids) => {
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) return el;
    }
    return null;
  };

  function cloneSelect(el) {
    if (!el || !el.parentNode) return el;
    const clone = el.cloneNode(true);
    el.parentNode.replaceChild(clone, el);
    return clone;
  }

  async function start() {
    const classEl = cloneSelect(find(
      "shortNotesClass", "classSelect", "class"
    ));

    const subjectEl = cloneSelect(find(
      "shortNotesSubject", "subjectSelect", "subject"
    ));

    const bookEl = cloneSelect(find(
      "shortNotesBook", "bookSelect", "book"
    ));

    const chapterEl = cloneSelect(find(
      "shortNotesChapter", "chapterSelect", "chapter"
    ));

    if (!classEl || !subjectEl || !bookEl || !chapterEl) {
      console.error("[NEXORA V31] Required dropdown not found");
      return;
    }

    const norm = v => String(v || "")
      .trim()
      .toLowerCase()
      .replace(/[–—−]/g, "-")
      .replace(/\s+/g, " ");

    const classNorm = v => {
      const s = norm(v);
      return s.replace(/^class\s*/, "class");
    };

    const reset = (el, text) => {
      el.innerHTML = "";
      const o = document.createElement("option");
      o.value = "";
      o.textContent = text;
      el.appendChild(o);
      el.value = "";
    };

    reset(classEl, "Select Class");
    reset(subjectEl, "Select Subject");
    reset(bookEl, "Select Book");
    reset(chapterEl, "Select Chapter");

    subjectEl.disabled = true;
    bookEl.disabled = true;
    chapterEl.disabled = true;

    try {
      const response = await fetch("/api/short-notes/universal-catalogue", {
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error("Universal catalogue HTTP " + response.status);
      }

      const data = await response.json();
      const books = Array.isArray(data.books) ? data.books : [];

      console.log(
        "[NEXORA V31] UNIVERSAL BOOKS:",
        books.length
      );

      /* CLASS */
      const classes = Array.isArray(data.classes)
        ? data.classes
        : [...new Set(
            books.map(b => b.class).filter(Boolean)
          )];

      classes
        .sort((a, b) => {
          const na = parseInt(String(a).replace(/\D/g, ""), 10) || 999;
          const nb = parseInt(String(b).replace(/\D/g, ""), 10) || 999;
          return na - nb || String(a).localeCompare(String(b));
        })
        .forEach(cls => {
          const o = document.createElement("option");
          o.value = cls;
          o.textContent = /^class\d+$/i.test(String(cls))
            ? String(cls).replace(/^class/i, "Class ")
            : cls;
          classEl.appendChild(o);
        });

      /* SUBJECT */
      function fillSubjects(cls) {
        reset(subjectEl, "Select Subject");
        reset(bookEl, "Select Book");
        reset(chapterEl, "Select Chapter");

        bookEl.disabled = true;
        chapterEl.disabled = true;

        const selectedClass = classNorm(cls);

        const subjects = [
          ...new Set(
            books
              .filter(b => classNorm(b.class) === selectedClass)
              .map(b => b.subject)
              .filter(Boolean)
          )
        ].sort();

        subjects.forEach(subject => {
          const o = document.createElement("option");
          o.value = subject;
          o.textContent = subject;
          subjectEl.appendChild(o);
        });

        subjectEl.disabled = subjects.length === 0;

        console.log(
          "[NEXORA V31] SUBJECTS:",
          selectedClass,
          subjects.length
        );
      }

      /* BOOK */
      function fillBooks(cls, subject) {
        reset(bookEl, "Select Book");
        reset(chapterEl, "Select Chapter");
        chapterEl.disabled = true;

        const selectedClass = classNorm(cls);
        const selectedSubject = norm(subject);

        const matching = books.filter(b =>
          classNorm(b.class) === selectedClass &&
          norm(b.subject) === selectedSubject
        );

        const seen = new Set();

        matching.forEach(book => {
          const title = String(
            book.titleEn ||
            book.title ||
            book.name ||
            ""
          ).trim();

          if (!title) return;

          const key = norm(title);
          if (seen.has(key)) return;
          seen.add(key);

          const o = document.createElement("option");
          o.value = book.id || title;
          o.textContent = book.author
            ? `${title} — ${book.author}`
            : title;

          o.dataset.bookId = book.id || "";
          o.dataset.bookTitle = title;

          bookEl.appendChild(o);
        });

        bookEl.disabled = seen.size === 0;

        console.log(
          "[NEXORA V31] BOOKS:",
          selectedSubject,
          seen.size
        );
      }

      /* CHAPTER */
      async function fillChapters() {
        reset(chapterEl, "Select Chapter");
        chapterEl.disabled = true;

        const selected = bookEl.options[bookEl.selectedIndex];
        if (!selected || !selected.value) return;

        const bookId = selected.dataset.bookId || selected.value;
        const bookTitle = selected.dataset.bookTitle || selected.textContent;

        let book = books.find(b =>
          String(b.id || "") === String(bookId)
        );

        let chapters = Array.isArray(book?.chapters)
          ? book.chapters
          : [];

        /* If catalogue book has no chapters, ask official chapter API */
        if (!chapters.length) {
          try {
            const url =
              "/api/short-notes/chapters?book=" +
              encodeURIComponent(bookId);

            const r = await fetch(url, { cache: "no-store" });

            if (r.ok) {
              const payload = await r.json();

              chapters =
                Array.isArray(payload.chapters)
                  ? payload.chapters
                  : Array.isArray(payload.data?.chapters)
                    ? payload.data.chapters
                    : [];
            }
          } catch (e) {
            console.warn(
              "[NEXORA V31] Chapter API failed:",
              e.message
            );
          }
        }

        chapters = chapters
          .map(ch => {
            if (typeof ch === "string") return ch.trim();
            return String(
              ch?.titleEn ||
              ch?.title ||
              ch?.name ||
              ch?.label ||
              ch?.chapter ||
              ""
            ).trim();
          })
          .filter(Boolean);

        const unique = [...new Set(chapters)];

        unique.forEach((chapter, index) => {
          const o = document.createElement("option");
          o.value = chapter;
          o.textContent = `${index + 1}. ${chapter}`;
          chapterEl.appendChild(o);
        });

        chapterEl.disabled = unique.length === 0;

        console.log(
          "[NEXORA V31] CHAPTERS:",
          bookTitle,
          unique.length
        );

        if (!unique.length) {
          console.warn(
            "[NEXORA V31] No official chapter metadata for:",
            bookTitle
          );
        }
      }

      classEl.addEventListener("change", () => {
        fillSubjects(classEl.value);
      });

      subjectEl.addEventListener("change", () => {
        fillBooks(classEl.value, subjectEl.value);
      });

      bookEl.addEventListener("change", fillChapters);

      /* Initial state */
      classEl.disabled = false;

      console.log(
        "[NEXORA V31] FINAL CASCADE READY:",
        "Class -> Subject -> Book -> Chapter"
      );

    } catch (error) {
      console.error(
        "[NEXORA V31] Catalogue load failed:",
        error
      );
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();

/* ============================================================
   NEXORA FINAL AUTHOR CASCADE V32
   Class -> Subject -> Author -> Book -> Chapter
   ============================================================ */
(function NEXORA_AUTHOR_CASCADE_V32() {
  "use strict";

  const find = (...ids) => {
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) return el;
    }
    return null;
  };

  function replaceSelect(el) {
    if (!el || !el.parentNode) return el;
    const fresh = el.cloneNode(true);
    el.parentNode.replaceChild(fresh, el);
    return fresh;
  }

  function start() {
    const classEl = replaceSelect(find(
      "shortNotesClass", "classSelect", "class"
    ));

    const subjectEl = replaceSelect(find(
      "shortNotesSubject", "subjectSelect", "subject"
    ));

    const authorEl = replaceSelect(find(
      "shortNotesAuthor", "authorSelect", "author", "writerSelect"
    ));

    const bookEl = replaceSelect(find(
      "shortNotesBook", "bookSelect", "book"
    ));

    const chapterEl = replaceSelect(find(
      "shortNotesChapter", "chapterSelect", "chapter"
    ));

    if (!classEl || !subjectEl || !bookEl || !chapterEl) {
      console.error("[NEXORA V32] Required dropdown missing");
      return;
    }

    const norm = v => String(v || "")
      .trim()
      .toLowerCase()
      .replace(/[–—−]/g, "-")
      .replace(/\s+/g, " ");

    const classNorm = v =>
      norm(v).replace(/^class\s*/, "class");

    const reset = (el, text) => {
      if (!el) return;
      el.innerHTML = "";
      const o = document.createElement("option");
      o.value = "";
      o.textContent = text;
      el.appendChild(o);
      el.value = "";
    };

    reset(classEl, "Select Class");
    reset(subjectEl, "Select Subject");
    if (authorEl) reset(authorEl, "Select Author");
    reset(bookEl, "Select Book");
    reset(chapterEl, "Select Chapter");

    subjectEl.disabled = true;
    if (authorEl) authorEl.disabled = true;
    bookEl.disabled = true;
    chapterEl.disabled = true;

    fetch("/api/short-notes/universal-catalogue", {
      cache: "no-store"
    })
      .then(r => {
        if (!r.ok) throw new Error("Catalogue HTTP " + r.status);
        return r.json();
      })
      .then(data => {
        const books = Array.isArray(data.books) ? data.books : [];

        console.log(
          "[NEXORA V32] UNIVERSAL BOOK COUNT:",
          books.length
        );

        /* CLASS */
        const classes = [
          ...new Set(
            books.map(b => b.class).filter(Boolean)
          )
        ];

        classes.sort((a, b) => {
          const na = parseInt(String(a).replace(/\D/g, "")) || 999;
          const nb = parseInt(String(b).replace(/\D/g, "")) || 999;
          return na - nb;
        });

        classes.forEach(cls => {
          const o = document.createElement("option");
          o.value = cls;
          o.textContent = /^class\d+$/i.test(String(cls))
            ? String(cls).replace(/^class/i, "Class ")
            : cls;
          classEl.appendChild(o);
        });

        /* SUBJECT */
        function fillSubjects() {
          reset(subjectEl, "Select Subject");
          if (authorEl) reset(authorEl, "Select Author");
          reset(bookEl, "Select Book");
          reset(chapterEl, "Select Chapter");

          if (authorEl) authorEl.disabled = true;
          bookEl.disabled = true;
          chapterEl.disabled = true;

          const cls = classNorm(classEl.value);

          const subjects = [
            ...new Set(
              books
                .filter(b => classNorm(b.class) === cls)
                .map(b => b.subject)
                .filter(Boolean)
            )
          ].sort();

          subjects.forEach(subject => {
            const o = document.createElement("option");
            o.value = subject;
            o.textContent = subject;
            subjectEl.appendChild(o);
          });

          subjectEl.disabled = subjects.length === 0;

          console.log(
            "[NEXORA V32] SUBJECTS:",
            subjects.length
          );
        }

        /* AUTHOR */
        function fillAuthors() {
          if (!authorEl) {
            fillBooks();
            return;
          }

          reset(authorEl, "Select Author");
          reset(bookEl, "Select Book");
          reset(chapterEl, "Select Chapter");

          bookEl.disabled = true;
          chapterEl.disabled = true;

          const cls = classNorm(classEl.value);
          const subject = norm(subjectEl.value);

          const matching = books.filter(b =>
            classNorm(b.class) === cls &&
            norm(b.subject) === subject
          );

          const authors = [
            ...new Set(
              matching.map(b =>
                String(
                  b.author ||
                  b.authors ||
                  b.writer ||
                  "Other / Unspecified"
                ).trim()
              )
            )
          ].sort();

          authors.forEach(author => {
            const o = document.createElement("option");
            o.value = author;
            o.textContent = author;
            authorEl.appendChild(o);
          });

          authorEl.disabled = authors.length === 0;

          /* If no author field is available, books can still work */
          if (!authors.length) {
            fillBooks();
          }

          console.log(
            "[NEXORA V32] AUTHORS:",
            authors.length
          );
        }

        /* BOOK */
        function fillBooks() {
          reset(bookEl, "Select Book");
          reset(chapterEl, "Select Chapter");

          chapterEl.disabled = true;

          const cls = classNorm(classEl.value);
          const subject = norm(subjectEl.value);

          let matching = books.filter(b =>
            classNorm(b.class) === cls &&
            norm(b.subject) === subject
          );

          if (authorEl && authorEl.value) {
            const selectedAuthor = norm(authorEl.value);

            matching = matching.filter(b =>
              norm(
                b.author ||
                b.authors ||
                b.writer ||
                "Other / Unspecified"
              ) === selectedAuthor
            );
          }

          const seen = new Set();

          matching.forEach(book => {
            const title = String(
              book.titleEn ||
              book.title ||
              book.name ||
              ""
            ).trim();

            if (!title) return;

            const key = norm(title);
            if (seen.has(key)) return;

            seen.add(key);

            const o = document.createElement("option");
            o.value = book.id || title;
            o.textContent = title;
            o.dataset.bookId = book.id || "";
            o.dataset.bookTitle = title;

            bookEl.appendChild(o);
          });

          bookEl.disabled = seen.size === 0;

          console.log(
            "[NEXORA V32] BOOKS AFTER AUTHOR FILTER:",
            seen.size
          );
        }

        /* CHAPTER */
        async function fillChapters() {
          reset(chapterEl, "Select Chapter");
          chapterEl.disabled = true;

          const selected =
            bookEl.options[bookEl.selectedIndex];

          if (!selected || !selected.value) return;

          const bookId =
            selected.dataset.bookId || selected.value;

          const book = books.find(
            b => String(b.id || "") === String(bookId)
          );

          let chapters = Array.isArray(book?.chapters)
            ? book.chapters
            : [];

          if (!chapters.length) {
            try {
              const r = await fetch(
                "/api/short-notes/chapters?book=" +
                encodeURIComponent(bookId),
                { cache: "no-store" }
              );

              if (r.ok) {
                const payload = await r.json();

                chapters =
                  Array.isArray(payload.chapters)
                    ? payload.chapters
                    : Array.isArray(payload.data?.chapters)
                      ? payload.data.chapters
                      : [];
              }
            } catch (e) {
              console.warn(
                "[NEXORA V32] Chapter API:",
                e.message
              );
            }
          }

          const unique = [
            ...new Set(
              chapters
                .map(ch =>
                  typeof ch === "string"
                    ? ch.trim()
                    : String(
                        ch?.titleEn ||
                        ch?.title ||
                        ch?.name ||
                        ch?.label ||
                        ch?.chapter ||
                        ""
                      ).trim()
                )
                .filter(Boolean)
            )
          ];

          unique.forEach((chapter, i) => {
            const o = document.createElement("option");
            o.value = chapter;
            o.textContent = `${i + 1}. ${chapter}`;
            chapterEl.appendChild(o);
          });

          chapterEl.disabled = unique.length === 0;

          console.log(
            "[NEXORA V32] CHAPTERS:",
            unique.length
          );
        }

        classEl.addEventListener("change", fillSubjects);
        subjectEl.addEventListener("change", fillAuthors);

        if (authorEl) {
          authorEl.addEventListener("change", fillBooks);
        }

        bookEl.addEventListener("change", fillChapters);

        classEl.disabled = false;

        console.log(
          "[NEXORA V32] FINAL FLOW READY:",
          "Class -> Subject -> Author -> Book -> Chapter"
        );
      })
      .catch(error => {
        console.error(
          "[NEXORA V32] Catalogue failed:",
          error
        );
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      start,
      { once: true }
    );
  } else {
    start();
  }
})();

/* ============================================================
   NEXORA V33 — SIMPLE NCERT / STANDARD BOOK FLOW
   FINAL FLOW:
   CLASS -> SUBJECT -> BOOK -> CHAPTER
   Author is NOT required.
   ============================================================ */
(function () {
  "use strict";

  console.log("[NEXORA V33] SIMPLE NCERT BOOK FLOW ACTIVE");

  function get(id) {
    return document.getElementById(id);
  }

  function cloneSelect(el) {
    if (!el) return null;
    const copy = el.cloneNode(true);
    el.parentNode.replaceChild(copy, el);
    return copy;
  }

  function norm(v) {
    return String(v || "")
      .trim()
      .toLowerCase()
      .replace(/[\s_-]+/g, "");
  }

  function resetSelect(el, text) {
    if (!el) return;
    el.innerHTML = "";
    const o = document.createElement("option");
    o.value = "";
    o.textContent = text;
    el.appendChild(o);
    el.value = "";
  }

  async function start() {
    const classEl = cloneSelect(
      get("shortNotesClass") ||
      get("classSelect") ||
      get("class")
    );

    const subjectEl = cloneSelect(
      get("shortNotesSubject") ||
      get("subjectSelect") ||
      get("subject")
    );

    const bookEl = cloneSelect(
      get("shortNotesBook") ||
      get("bookSelect") ||
      get("book")
    );

    const chapterEl = cloneSelect(
      get("shortNotesChapter") ||
      get("chapterSelect") ||
      get("chapter")
    );

    if (!classEl || !subjectEl || !bookEl || !chapterEl) {
      console.error("[NEXORA V33] Required dropdown missing");
      return;
    }

    /* Author is no longer part of selection flow */
    [
      "shortNotesAuthor",
      "authorSelect",
      "writerSelect",
      "author"
    ].forEach(function (id) {
      const el = get(id);
      if (el) {
        el.style.display = "none";
        el.disabled = true;
      }
    });

    let catalogue = [];

    try {
      const response = await fetch(
        "/api/short-notes/universal-catalogue",
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Catalogue HTTP " + response.status);
      }

      const data = await response.json();
      catalogue = Array.isArray(data.books) ? data.books : [];

      console.log(
        "[NEXORA V33] Catalogue books:",
        catalogue.length
      );
    } catch (err) {
      console.error(
        "[NEXORA V33] Catalogue load failed:",
        err
      );
      return;
    }

    function classBooks() {
      const cls = norm(classEl.value);

      return catalogue.filter(function (b) {
        return norm(b.class) === cls;
      });
    }

    function subjectBooks() {
      const cls = norm(classEl.value);
      const sub = norm(subjectEl.value);

      if (!cls || !sub) return [];

      return catalogue.filter(function (b) {
        return (
          norm(b.class) === cls &&
          norm(b.subject) === sub
        );
      });
    }

    function isStandardBook(book) {
      const text = [
        book.title,
        book.titleEn,
        book.titleHi,
        book.kind,
        book.source
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        book.official === true ||
        text.includes("ncert") ||
        text.includes("standard") ||
        text.includes("official") ||
        text.includes("textbook")
      );
    }

    function fillSubjects() {
      resetSelect(subjectEl, "Select Subject");
      resetSelect(bookEl, "Select Book");
      resetSelect(chapterEl, "Select Chapter");

      const subjects = [
        ...new Set(
          classBooks()
            .map(function (b) {
              return String(b.subject || "").trim();
            })
            .filter(Boolean)
        )
      ].sort(function (a, b) {
        return a.localeCompare(b);
      });

      subjects.forEach(function (subject) {
        const o = document.createElement("option");
        o.value = subject;
        o.textContent = subject;
        subjectEl.appendChild(o);
      });

      console.log(
        "[NEXORA V33] Subjects:",
        subjects.length
      );
    }

    function fillBooks() {
      resetSelect(bookEl, "Select Book");
      resetSelect(chapterEl, "Select Chapter");

      const books = subjectBooks();

      /* Standard/NCERT books first */
      books.sort(function (a, b) {
        const sa = isStandardBook(a) ? 0 : 1;
        const sb = isStandardBook(b) ? 0 : 1;

        if (sa !== sb) return sa - sb;

        return String(a.title || "")
          .localeCompare(String(b.title || ""));
      });

      let standardCount = 0;
      let otherCount = 0;

      books.forEach(function (book) {
        const title =
          book.title ||
          book.titleEn ||
          book.titleHi;

        if (!title) return;

        const o = document.createElement("option");

        o.value = String(book.id || title);
        o.textContent = title;

        o.dataset.bookId = String(book.id || "");
        o.dataset.bookTitle = title;
        o.dataset.class = String(book.class || "");
        o.dataset.subject = String(book.subject || "");
        o.dataset.author = String(book.author || "");
        o.dataset.chapters =
          JSON.stringify(
            Array.isArray(book.chapters)
              ? book.chapters
              : []
          );

        if (isStandardBook(book)) {
          o.dataset.standard = "true";
          standardCount++;
        } else {
          otherCount++;
        }

        bookEl.appendChild(o);
      });

      console.log(
        "[NEXORA V33] BOOKS READY:",
        {
          class: classEl.value,
          subject: subjectEl.value,
          total: books.length,
          standard: standardCount,
          other: otherCount
        }
      );
    }

    function fillChapters() {
      resetSelect(chapterEl, "Select Chapter");

      const selected =
        bookEl.options[bookEl.selectedIndex];

      if (!selected || !selected.value) return;

      let chapters = [];

      try {
        chapters = JSON.parse(
          selected.dataset.chapters || "[]"
        );
      } catch (e) {
        chapters = [];
      }

      if (!Array.isArray(chapters)) {
        chapters = [];
      }

      chapters.forEach(function (chapter, index) {
        let title = "";

        if (typeof chapter === "string") {
          title = chapter;
        } else if (chapter && typeof chapter === "object") {
          title =
            chapter.title ||
            chapter.name ||
            chapter.chapter ||
            "";
        }

        if (!title) return;

        const o = document.createElement("option");
        o.value = title;
        o.textContent = title;
        o.dataset.chapterIndex = String(index);
        chapterEl.appendChild(o);
      });

      console.log(
        "[NEXORA V33] CHAPTERS READY:",
        chapters.length
      );
    }

    classEl.addEventListener("change", function () {
      fillSubjects();
    }, true);

    subjectEl.addEventListener("change", function () {
      fillBooks();
    }, true);

    bookEl.addEventListener("change", function () {
      fillChapters();
    }, true);

    /* Initial clean state */
    resetSelect(subjectEl, "Select Subject");
    resetSelect(bookEl, "Select Book");
    resetSelect(chapterEl, "Select Chapter");

    console.log(
      "[NEXORA V33] FINAL FLOW READY: CLASS -> SUBJECT -> BOOK -> CHAPTER"
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();

/* ============================================================
   NEXORA V34 — FINAL CASCADE LOCK
   CLASS -> SUBJECT -> BOOK -> CHAPTER
   NCERT / STANDARD BOOKS DIRECTLY IN BOOK DROPDOWN
   AUTHOR COMPLETELY BYPASSED
   ============================================================ */
(function () {
  "use strict";

  console.log("[NEXORA V34] FINAL CASCADE LOCK ACTIVE");

  const $ = id => document.getElementById(id);

  const classEl =
    $("shortNotesClass") ||
    $("classSelect") ||
    $("class");

  const subjectEl =
    $("shortNotesSubject") ||
    $("subjectSelect") ||
    $("subject");

  const bookEl =
    $("shortNotesBook") ||
    $("bookSelect") ||
    $("book");

  const chapterEl =
    $("shortNotesChapter") ||
    $("chapterSelect") ||
    $("chapter");

  if (!classEl || !subjectEl || !bookEl || !chapterEl) {
    console.error("[NEXORA V34] Dropdowns not found");
    return;
  }

  let books = [];

  const norm = v =>
    String(v || "")
      .trim()
      .toLowerCase()
      .replace(/[\s_-]+/g, "");

  function reset(el, text) {
    el.innerHTML = "";
    const o = document.createElement("option");
    o.value = "";
    o.textContent = text;
    el.appendChild(o);
  }

  function classMatch(book) {
    return norm(book.class) === norm(classEl.value);
  }

  function subjectMatch(book) {
    return (
      classMatch(book) &&
      norm(book.subject) === norm(subjectEl.value)
    );
  }

  function chaptersOf(book) {
    return Array.isArray(book.chapters)
      ? book.chapters
      : [];
  }

  function standard(book) {
    const x = [
      book.title,
      book.titleEn,
      book.titleHi,
      book.kind,
      book.source
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return (
      book.official === true ||
      x.includes("ncert") ||
      x.includes("standard") ||
      x.includes("textbook") ||
      x.includes("official")
    );
  }

  function buildSubjects() {
    reset(subjectEl, "Select Subject");
    reset(bookEl, "Select Book");
    reset(chapterEl, "Select Chapter");

    const subjects = [
      ...new Set(
        books
          .filter(classMatch)
          .map(b => String(b.subject || "").trim())
          .filter(Boolean)
      )
    ].sort();

    subjects.forEach(s => {
      const o = document.createElement("option");
      o.value = s;
      o.textContent = s;
      subjectEl.appendChild(o);
    });

    console.log(
      "[NEXORA V34] SUBJECTS:",
      subjects
    );
  }

  function buildBooks() {
    reset(bookEl, "Select Book");
    reset(chapterEl, "Select Chapter");

    let list = books.filter(subjectMatch);

    list.sort((a, b) => {
      const sa = standard(a) ? 0 : 1;
      const sb = standard(b) ? 0 : 1;

      if (sa !== sb) return sa - sb;

      return String(a.title || "")
        .localeCompare(String(b.title || ""));
    });

    list.forEach(book => {
      const title =
        book.title ||
        book.titleEn ||
        book.titleHi;

      if (!title) return;

      const o = document.createElement("option");

      o.value = String(book.id || title);
      o.textContent = title;

      o.dataset.bookId =
        String(book.id || "");

      o.dataset.chapters =
        JSON.stringify(chaptersOf(book));

      o.dataset.standard =
        standard(book) ? "true" : "false";

      o.dataset.author =
        String(book.author || "");

      bookEl.appendChild(o);
    });

    console.log(
      "[NEXORA V34] BOOKS:",
      list.length,
      "CLASS:",
      classEl.value,
      "SUBJECT:",
      subjectEl.value
    );
  }

  function buildChapters() {
    reset(chapterEl, "Select Chapter");

    const selected =
      bookEl.options[bookEl.selectedIndex];

    if (!selected || !selected.value) return;

    let chapters = [];

    try {
      chapters =
        JSON.parse(
          selected.dataset.chapters || "[]"
        );
    } catch (_) {
      chapters = [];
    }

    chapters.forEach((ch, i) => {
      let title = "";

      if (typeof ch === "string") {
        title = ch;
      } else if (ch && typeof ch === "object") {
        title =
          ch.title ||
          ch.name ||
          ch.chapter ||
          "";
      }

      if (!title) return;

      const o =
        document.createElement("option");

      o.value = title;
      o.textContent = title;
      o.dataset.index = String(i);

      chapterEl.appendChild(o);
    });

    console.log(
      "[NEXORA V34] CHAPTERS:",
      chapters.length,
      "BOOK:",
      selected.textContent
    );
  }

  async function load() {
    try {
      const r = await fetch(
        "/api/short-notes/universal-catalogue",
        { cache: "no-store" }
      );

      const data = await r.json();

      books =
        Array.isArray(data.books)
          ? data.books
          : [];

      console.log(
        "[NEXORA V34] CATALOGUE:",
        books.length
      );

      reset(subjectEl, "Select Subject");
      reset(bookEl, "Select Book");
      reset(chapterEl, "Select Chapter");

    } catch (e) {
      console.error(
        "[NEXORA V34] Catalogue error:",
        e
      );
    }
  }

  /*
   * IMPORTANT:
   * Run AFTER all existing old handlers.
   * This prevents old NEXORA handlers from leaving
   * Book/Chapter at "Select Book".
   */
  document.addEventListener("change", function (e) {

    if (e.target === classEl) {
      setTimeout(() => {
        buildSubjects();
      }, 0);
      return;
    }

    if (e.target === subjectEl) {
      setTimeout(() => {
        buildBooks();
      }, 0);
      return;
    }

    if (e.target === bookEl) {
      setTimeout(() => {
        buildChapters();
      }, 0);
      return;
    }

  }, false);

  load();

})();

/* ============================================================
   NEXORA AI SEARCH ENGINE — COMPLETE FEATURE PATCH V1
   Features:
   AI Answer + Web + Citations + Source Ranking
   Follow-up + Regenerate + Simple/Expert + Hindi/English
   ============================================================ */

(function NEXORA_AI_SEARCH_ENGINE_V1 () {

    if (window.__NEXORA_AI_SEARCH_ENGINE_V1__) return;
    window.__NEXORA_AI_SEARCH_ENGINE_V1__ = true;

    const $ = id => document.getElementById(id);

    const input = $("searchInput");
    const answer = $("answerText");
    const answerTitleEl = $("answerTitle");
    const details = $("answerDetails");

    if (!input || !answer) {
        console.warn("[NEXORA AI SEARCH] Required search elements not found.");
        return;
    }

    const baseUrl =
        (location.hostname === "localhost" ||
         location.hostname === "127.0.0.1")
            ? "http://localhost:5001"
            : "https://nexora-o8wi.onrender.com";

    let lastQuery = "";
    let lastSources = [];
    let lastLanguage = "auto";
    let lastExplanation = "simple";

    /* ---------------------------------------------------------
       UI
       --------------------------------------------------------- */

    function createControls() {

        if ($("nexoraAISearchControls")) return;

        const box = document.createElement("div");
        box.id = "nexoraAISearchControls";

        box.style.cssText = `
            display:flex;
            flex-wrap:wrap;
            gap:10px;
            align-items:center;
            margin:14px 0;
            padding:12px;
            border:1px solid #e5e7eb;
            border-radius:12px;
            background:#fafafa;
        `;

        box.innerHTML = `
            <label style="font-size:14px;font-weight:600;">
                Language
                <select id="nexoraSearchLanguage"
                    style="margin-left:5px;padding:7px 10px;border-radius:8px;border:1px solid #d1d5db;">
                    <option value="auto">Auto</option>
                    <option value="english">English</option>
                    <option value="hindi">हिंदी</option>
                    <option value="hinglish">Hinglish</option>
                </select>
            </label>

            <label style="font-size:14px;font-weight:600;">
                Explanation
                <select id="nexoraSearchExplanation"
                    style="margin-left:5px;padding:7px 10px;border-radius:8px;border:1px solid #d1d5db;">
                    <option value="simple">Simple</option>
                    <option value="expert">Expert</option>
                </select>
            </label>

            <button id="nexoraRegenerateBtn"
                type="button"
                style="padding:8px 13px;border:0;border-radius:8px;cursor:pointer;">
                Regenerate
            </button>
        `;

        input.parentElement?.insertAdjacentElement("afterend", box);

        $("nexoraSearchLanguage")?.addEventListener("change", e => {
            lastLanguage = e.target.value;
        });

        $("nexoraSearchExplanation")?.addEventListener("change", e => {
            lastExplanation = e.target.value;
        });

        $("nexoraRegenerateBtn")?.addEventListener("click", () => {
            if (!lastQuery) {
                alert("Please search for a topic first.");
                return;
            }

            enhancedSearch(lastQuery, true);
        });
    }

    /* ---------------------------------------------------------
       SOURCE RANKING
       --------------------------------------------------------- */

    function rankSources(sources) {

        if (!Array.isArray(sources)) return [];

        return sources
            .map((source, index) => {

                const url = String(source?.url || "");
                const title = String(source?.title || "");
                const content = String(
                    source?.content ||
                    source?.snippet ||
                    ""
                );

                let score =
                    Number(source?.score || 0);

                const lowerUrl = url.toLowerCase();

                /* Official / high-value domains */
                if (
                    lowerUrl.includes(".gov.in") ||
                    lowerUrl.includes(".gov") ||
                    lowerUrl.includes("upsc.gov.in") ||
                    lowerUrl.includes("ncert.nic.in") ||
                    lowerUrl.includes("epathshala.nic.in")
                ) {
                    score += 10;
                }

                if (
                    lowerUrl.includes("edu") ||
                    lowerUrl.includes("ac.in")
                ) {
                    score += 4;
                }

                if (title.length > 20) score += 1;
                if (content.length > 200) score += 1;

                return {
                    ...source,
                    _nexoraRankScore: score,
                    _nexoraOriginalIndex: index
                };

            })
            .sort((a, b) => {

                if (
                    b._nexoraRankScore !==
                    a._nexoraRankScore
                ) {
                    return (
                        b._nexoraRankScore -
                        a._nexoraRankScore
                    );
                }

                return (
                    a._nexoraOriginalIndex -
                    b._nexoraOriginalIndex
                );
            });
    }

    /* ---------------------------------------------------------
       SOURCE DISPLAY
       --------------------------------------------------------- */


    function displaySmartSources(sources) {

        const sourcesSection =
            document.querySelector(".sources-section");

        if (!sourcesSection) {
            return;
        }

        /*
         * IMPORTANT:
         * Never clear the whole sources-section.
         * The answer/search UI may share this section.
         */

        const oldCards =
            sourcesSection.querySelectorAll(
                ".source-card, .nexora-ai-ranked-source, .nexora-extra-source, .nexora-smart-source-container"
            );

        oldCards.forEach(function(card) {
            card.remove();
        });

        const oldActions =
            sourcesSection.querySelectorAll(
                ".source-actions"
            );

        oldActions.forEach(function(el) {
            el.remove();
        });

        let heading =
            sourcesSection.querySelector(
                ".section-title h2"
            );

        if (!heading) {

            const title =
                document.createElement("div");

            title.className =
                "section-title";

            heading =
                document.createElement("h2");

            heading.textContent =
                "Sources & Evidence";

            title.appendChild(heading);

            sourcesSection.prepend(title);

        } else {

            heading.textContent =
                "Sources & Evidence";
        }

        const container =
            document.createElement("div");

        container.className =
            "nexora-smart-source-container";

        if (!Array.isArray(sources) || sources.length === 0) {

            const empty =
                document.createElement("p");

            empty.textContent =
                "No live web sources were available for this search.";

            container.appendChild(empty);

            sourcesSection.appendChild(container);

            return;
        }

        const sourceGrid =
            document.createElement("div");

        sourceGrid.className =
            "nexora-smart-source-grid";

        sources.slice(0, 2).forEach(function(source, index) {

            const card =
                document.createElement("article");

            card.className =
                "nexora-smart-source";

            const label =
                document.createElement("div");

            label.className =
                "nexora-smart-source-label";

            label.textContent =
                "SOURCE " + (index + 1);

            const title =
                document.createElement("h3");

            title.textContent =
                source.title ||
                "Relevant Web Source";

            const description =
                document.createElement("p");

            const content =
                String(
                    source.content ||
                    source.snippet ||
                    ""
                ).trim();

            description.textContent =
                content.length > 240
                    ? content.slice(0, 240) + "…"
                    : content ||
                      "Relevant evidence used by NEXORA.";

            card.appendChild(label);
            card.appendChild(title);
            card.appendChild(description);

            if (source.url) {

                const link =
                    document.createElement("a");

                link.href =
                    source.url;

                link.target =
                    "_blank";

                link.rel =
                    "noopener noreferrer";

                link.textContent =
                    "View source →";

                card.appendChild(link);
            }

            sourceGrid.appendChild(card);
        });

        container.appendChild(sourceGrid);
        sourcesSection.appendChild(container);
    }


    function displayRankedSources(sources) {

        const ranked = rankSources(sources);

        lastSources = ranked;

        const section =
            document.querySelector(".sources-section");

        if (!section) return;

        document
            .querySelectorAll(".nexora-ai-ranked-source")
            .forEach(el => el.remove());

        const heading =
            document.createElement("div");

        heading.className =
            "nexora-ai-ranked-source";

        heading.style.cssText = `
            margin-top:16px;
            padding:12px;
            border-radius:10px;
            background:#f8fafc;
            border:1px solid #e5e7eb;
        `;

        heading.innerHTML = `
            <strong>Sources & Citations</strong>
            <div style="font-size:13px;color:#6b7280;margin-top:4px;">
                Sources are arranged by relevance and available source-quality signals.
            </div>
        `;

        section.appendChild(heading);

        ranked.slice(0, 8).forEach((source, index) => {

            const card =
                document.createElement("div");

            card.className =
                "nexora-ai-ranked-source";

            card.style.cssText = `
                margin-top:8px;
                padding:10px 12px;
                border:1px solid #e5e7eb;
                border-radius:9px;
                background:white;
            `;

            const title =
                source.title ||
                "Web Source";

            const url =
                source.url || "";

            const content =
                source.content ||
                source.snippet ||
                "";

            card.innerHTML = `
                <div style="font-weight:700;">
                    [${index + 1}]
                    ${escapeHtml(title)}
                </div>

                <div style="font-size:13px;color:#6b7280;margin-top:4px;">
                    ${escapeHtml(content.slice(0, 240))}
                </div>

                ${
                    url
                    ? `
                    <button
                        type="button"
                        class="nexora-source-open"
                        data-url="${escapeAttr(url)}"
                        style="margin-top:7px;border:0;background:none;padding:0;cursor:pointer;text-decoration:underline;">
                        Open source
                    </button>
                    `
                    : ""
                }
            `;

            section.appendChild(card);
        });

        section
            .querySelectorAll(".nexora-source-open")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const url =
                            button.dataset.url;

                        if (url) {
                            window.open(
                                url,
                                "_blank",
                                "noopener,noreferrer"
                            );
                        }
                    }
                );
            });
    }

    function escapeHtml(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function escapeAttr(value) {
        return escapeHtml(value);
    }

    /* ---------------------------------------------------------
       FOLLOW-UP QUESTIONS
       --------------------------------------------------------- */

    function displayFollowUps(query) {

        document
            .querySelectorAll(".nexora-followups")
            .forEach(el => el.remove());

        const container =
            document.createElement("div");

        container.className =
            "nexora-followups";

        container.style.cssText = `
            margin-top:18px;
            padding:14px;
            border-radius:12px;
            border:1px solid #e5e7eb;
            background:#fafafa;
        `;



        container
            .querySelectorAll(".nexora-followup-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const q =
                            button.dataset.question;

                        if (!q) return;

                        input.value = q;

                        enhancedSearch(q, false);
                    }
                );
            });
    }

    /* ---------------------------------------------------------
       AI ANSWER
       --------------------------------------------------------- */

    async function getAIAnswer(
        question,
        sources,
        regenerate
    ) {

        const ranked =
            rankSources(sources);

        const sourceContext =
            ranked
                .slice(0, 6)
                .map((source, index) => {

                    return (
                        `[${index + 1}] ` +
                        `Title: ${source.title || ""}\n` +
                        `URL: ${source.url || ""}\n` +
                        `Content: ${(source.content || source.snippet || "").slice(0, 1200)}`
                    );

                })
                .join("\n\n");

        let languageInstruction =
            "Answer naturally in the same language as the user.";

        if (lastLanguage === "english") {
            languageInstruction =
                "Answer completely in clear English.";
        }

        if (lastLanguage === "hindi") {
            languageInstruction =
                "Answer completely in natural Hindi using Devanagari.";
        }

        if (lastLanguage === "hinglish") {
            languageInstruction =
                "Answer in natural Hindi-English Hinglish.";
        }

        const explanationInstruction =
            lastExplanation === "expert"
                ? "Give an expert-level explanation with technical depth, precise terminology and important nuances."
                : "Give a simple, clear explanation that a normal student can understand.";

        const regenerationInstruction =
            regenerate
                ? "This is a regenerated answer. Produce a fresh, independently worded answer and avoid repeating the previous phrasing."
                : "";

        const groundedQuestion = `
User question:
${question}

${languageInstruction}

${explanationInstruction}

${regenerationInstruction}

Use the following web sources as evidence where relevant:

${sourceContext || "No web sources were returned."}

Citation rules:
- Use [1], [2], [3] etc. only when the statement is supported by that numbered source.
- Do not invent citations.
- Do not invent URLs.
- If sources do not support a claim, clearly say that verification is unavailable.
- Do not include a separate raw URL list inside the answer.

Write a useful direct answer.
        `.trim();

        const response =
            await fetch(
                baseUrl + "/api/ask",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        question:
                            groundedQuestion,
                        userId:
                            typeof getNexoraUserId === "function"
                                ? getNexoraUserId()
                                : null
                    })
                }
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {
            throw new Error(
                data.message ||
                "AI answer failed"
            );
        }

        return data;
    }

    /* ---------------------------------------------------------
       COMPLETE SEARCH
       --------------------------------------------------------- */

    async function enhancedSearch(
        query,
        regenerate = false
    ) {

        query =
            String(query || "").trim();

        if (!query) return;

        lastQuery = query;

        /* NEXORA UNIVERSAL SEARCH:
           every valid user query enters answer/result mode */
        document.body.classList.remove("nexora-search-first");
        document.body.classList.add("nexora-search-results");

        const resultCard =
            document.querySelector(".answer-card");

        if (resultCard) {
            resultCard.style.setProperty(
                "display",
                "block",
                "important"
            );
            resultCard.style.setProperty(
                "visibility",
                "visible",
                "important"
            );
        }

        createControls();

        if (answerTitleEl) {
            answerTitleEl.textContent =
                query;
        }

        answer.textContent =
            "Searching...";

        if (details) {
            details.textContent =
                "Finding relevant information and preparing the answer.";
        }

        const languageSelect =
            $("nexoraSearchLanguage");

        const explanationSelect =
            $("nexoraSearchExplanation");

        if (languageSelect) {
            lastLanguage =
                languageSelect.value;
        }

        if (explanationSelect) {
            lastExplanation =
                explanationSelect.value;
        }

        try {

            /* NEXORA MULTI-SOURCE AI SEARCH */
            const searchResponse =
                await fetch(
                    baseUrl +
                    "/api/search?q=" +
                    encodeURIComponent(query) +
                    "&userId=" +
                    encodeURIComponent(
                        typeof getNexoraUserId === "function"
                            ? getNexoraUserId() || ""
                            : ""
                    )
                );

            const searchData =
                await searchResponse.json();

            if (!searchResponse.ok || !searchData?.success) {
                throw new Error(
                    searchData?.message ||
                    "NEXORA search failed."
                );
            }

            const sources =
                Array.isArray(searchData.sources)
                    ? searchData.sources
                    : [];

            /*
             * IMPORTANT:
             * /api/search already performs:
             * Tavily multi-source research -> Gemini synthesis.
             *
             * Do NOT call getAIAnswer() again here.
             */
            let finalAnswer =
                String(
                    searchData.answer || ""
                ).trim();

            if (!finalAnswer) {
                finalAnswer =
                    "NEXORA could not generate an answer for this search.";
            }

            answer.textContent =
                finalAnswer;

            if (details) {
                details.textContent =
                    sources.length
                        ? "Answer synthesized from multiple relevant web sources by NEXORA AI."
                        : "Answer prepared using NEXORA AI.";
            }

            displaySmartSources(
                sources.slice(0, 2)
            );

            displayFollowUps(query);

        } catch (error) {

            console.error(
                "[NEXORA AI SEARCH]",
                error
            );

            answer.textContent =
                "NEXORA could not complete this search. Please try again.";

            if (details) {
                details.textContent =
                    error.message || "Search error";
            }
        }
    }

    /* ---------------------------------------------------------
       TAKE CONTROL OF EXISTING SEARCH
       --------------------------------------------------------- */

    createControls();

    if (window.__NEXORA_AI_SEARCH_EVENTS__) return;

    window.__NEXORA_AI_SEARCH_EVENTS__ = true;

    /*
     * Capture phase stops the older basic search handler.
     * Existing code is not deleted.
     */

    if (window.searchButton || $("searchButton")) {

        const button =
            window.searchButton ||
            $("searchButton");

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopImmediatePropagation();

                enhancedSearch(
                    input.value.trim(),
                    false
                );

            },
            true
        );
    }

    input.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Enter") return;

            event.preventDefault();
            event.stopImmediatePropagation();

            enhancedSearch(
                input.value.trim(),
                false
            );

        },
        true
    );

    console.log(
        "[NEXORA AI SEARCH] V1 ACTIVE"
    );

})();

