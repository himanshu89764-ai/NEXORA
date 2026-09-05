const NCERT_BOOKS = {
    class6: {
        geography: {
            id: "class6-geography",
            className: "Class 6",
            subject: "Geography",
            titleEn: "The Earth Our Habitat",
            titleHi: "हमारी पृथ्वी",
            examTags: ["UPSC Foundation", "Prelims", "Mains"],
            chapters: [
                { number: 1, titleEn: "The Earth in the Solar System", titleHi: "सौरमंडल में पृथ्वी", key: "solar-system" },
                { number: 2, titleEn: "Globe: Latitudes and Longitudes", titleHi: "ग्लोब: अक्षांश और देशांतर", key: "globe-latitudes-longitudes" },
                { number: 3, titleEn: "Motions of the Earth", titleHi: "पृथ्वी की गतियाँ", key: "motions-of-earth" },
                { number: 4, titleEn: "Maps", titleHi: "मानचित्र", key: "maps" },
                { number: 5, titleEn: "Major Domains of the Earth", titleHi: "पृथ्वी के प्रमुख परिमंडल", key: "major-domains-earth" },
                { number: 6, titleEn: "Major Landforms of the Earth", titleHi: "पृथ्वी के प्रमुख स्थलरूप", key: "major-landforms-earth" },
                { number: 7, titleEn: "Our Country — India", titleHi: "हमारा देश — भारत", key: "our-country-india" },
                { number: 8, titleEn: "India: Climate, Vegetation and Wildlife", titleHi: "भारत: जलवायु, वनस्पति तथा वन्य जीवन", key: "india-climate-vegetation-wildlife" }
            ]
        }
    },

    class7: {
        geography: {
            id: "class7-geography",
            className: "Class 7",
            subject: "Geography",
            titleEn: "Our Environment",
            titleHi: "हमारा पर्यावरण",
            examTags: ["UPSC Foundation", "Prelims", "Mains"],
            chapters: [
                { number: 1, titleEn: "Environment", titleHi: "पर्यावरण", key: "environment" },
                { number: 2, titleEn: "Inside Our Earth", titleHi: "हमारी पृथ्वी के अंदर", key: "inside-our-earth" },
                { number: 3, titleEn: "Our Changing Earth", titleHi: "हमारी बदलती पृथ्वी", key: "our-changing-earth" },
                { number: 4, titleEn: "Air", titleHi: "वायु", key: "air" },
                { number: 5, titleEn: "Water", titleHi: "जल", key: "water" },
                { number: 6, titleEn: "Natural Vegetation and Wild Life", titleHi: "प्राकृतिक वनस्पति तथा वन्य जीवन", key: "natural-vegetation-wild-life" },
                { number: 7, titleEn: "Human Environment — Settlement, Transport and Communication", titleHi: "मानव पर्यावरण — बस्तियाँ, परिवहन तथा संचार", key: "human-environment-settlement-transport-communication" },
                { number: 8, titleEn: "Human Environment Interactions: The Tropical and the Subtropical Region", titleHi: "मानव-पर्यावरण अन्योन्यक्रिया: उष्णकटिबंधीय तथा उपोष्णकटिबंधीय प्रदेश", key: "human-environment-tropical-subtropical" },
                { number: 9, titleEn: "Life in the Temperate Grasslands", titleHi: "समशीतोष्ण घासस्थलों में जीवन", key: "life-temperate-grasslands" },
                { number: 10, titleEn: "Life in the Deserts", titleHi: "रेगिस्तान में जीवन", key: "life-in-deserts" }
            ]
        }
    },

    class11: {
        geography: {
            id: "class11-geography",
            className: "Class 11",
            subject: "Geography",
            titleEn: "Fundamentals of Physical Geography + India: Physical Environment",
            titleHi: "भौतिक भूगोल के मूल सिद्धांत एवं भारत: भौतिक पर्यावरण",
            examTags: ["UPSC", "Prelims", "Mains"],
            chapters: [
                "Geography as a Discipline",
                "The Origin and Evolution of the Earth",
                "Interior of the Earth",
                "Distribution of Oceans and Continents",
                "Minerals and Rocks",
                "Geomorphic Processes",
                "Landforms and their Evolution",
                "Composition and Structure of Atmosphere",
                "Solar Radiation, Heat Balance and Temperature",
                "Atmospheric Circulation and Weather Systems",
                "Water in the Atmosphere",
                "Water (Oceans)",
                "Movements of Ocean Water",
                "Biodiversity and Conservation",
                "India: Location",
                "Structure and Physiography",
                "Drainage System",
                "Climate",
                "Natural Vegetation",
                "Soils",
                "Natural Hazards and Disasters"
            ].map((title, index) => ({
                number: index + 1,
                titleEn: title,
                titleHi: title,
                key: `class11-geography-${index + 1}`
            }))
        }
    }
};


/*
===========================================================
NEXORA GENERIC SHORT NOTES MANIFEST
===========================================================

Architecture:

Class
  ↓
Subject
  ↓
Book
  ↓
Chapter
  ↓
Generic AI Notes Generator

IMPORTANT:
- Route me Class 6/7/11/Geography hard-code nahi hoga.
- Existing books remain backward compatible.
- Future subjects/books can simply be added to NCERT_BOOKS.
- Unknown combinations can use createCustomBook().
*/


function normalizeText(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
}


function normalizeClass(className) {
    const value = normalizeText(className);

    const match = value.match(/\d+/);

    return match ? match[0] : value;
}


function normalizeSubject(subject) {
    const value = normalizeText(subject);

    const aliases = {
        "geo": "geography",
        "भूगोल": "geography",
        "polity": "polity",
        "राजव्यवस्था": "polity",
        "history": "history",
        "इतिहास": "history",
        "economics": "economy",
        "अर्थशास्त्र": "economy",
        "environment": "environment",
        "पर्यावरण": "environment",
        "science": "science",
        "विज्ञान": "science",
        "biology": "biology",
        "जीवविज्ञान": "biology",
        "physics": "physics",
        "भौतिकी": "physics",
        "chemistry": "chemistry",
        "रसायन विज्ञान": "chemistry",
        "mathematics": "mathematics",
        "maths": "mathematics",
        "गणित": "mathematics",
        "english": "english",
        "हिंदी": "hindi"
    };

    return aliases[value] || value;
}


function getBook(className, subject, bookId = null) {
    const cls = normalizeClass(className);
    const sub = normalizeSubject(subject);

    /*
     * First try exact book ID.
     * This allows multiple books for the same class + subject later.
     */
    if (bookId) {
        const requestedId = normalizeText(bookId);

        for (const classKey of Object.keys(NCERT_BOOKS)) {
            const classBooks = NCERT_BOOKS[classKey];

            for (const subjectKey of Object.keys(classBooks)) {
                const book = classBooks[subjectKey];

                if (
                    normalizeText(book.id) === requestedId
                ) {
                    return book;
                }
            }
        }
    }

    /*
     * Generic class + subject lookup.
     */
    const classKey = `class${cls}`;

    if (
        NCERT_BOOKS[classKey] &&
        NCERT_BOOKS[classKey][sub]
    ) {
        return NCERT_BOOKS[classKey][sub];
    }

    return null;
}


function getBooks(className, subject = null) {
    const cls = normalizeClass(className);
    const classKey = `class${cls}`;

    if (!NCERT_BOOKS[classKey]) {
        return [];
    }

    if (subject) {
        const sub = normalizeSubject(subject);

        return NCERT_BOOKS[classKey][sub]
            ? [NCERT_BOOKS[classKey][sub]]
            : [];
    }

    return Object.values(NCERT_BOOKS[classKey]);
}


function getAllClasses() {
    return Object.keys(NCERT_BOOKS).map(
        key => key.replace("class", "")
    );
}


function getAllSubjects(className) {
    return getBooks(className).map(
        book => book.subject
    );
}


function getChapters(className, subject, bookId = null) {
    const book = getBook(
        className,
        subject,
        bookId
    );

    return book && Array.isArray(book.chapters)
        ? book.chapters
        : [];
}


function findChapter(book, chapterIdentifier) {
    if (
        !book ||
        !Array.isArray(book.chapters) ||
        chapterIdentifier === undefined ||
        chapterIdentifier === null
    ) {
        return null;
    }

    const requested = normalizeText(
        chapterIdentifier
    );

    return (
        book.chapters.find(chapter => {

            if (
                String(chapter.number) === requested
            ) {
                return true;
            }

            return (
                normalizeText(chapter.titleEn) ===
                requested
            );
        }) || null
    );
}


/*
 * Create a completely generic custom book.
 *
 * This is important because NEXORA should not break when
 * a class/subject/book is not yet present in the manifest.
 */
function createCustomBook({
    className = "General",
    subject = "Study Notes",
    bookTitle = "Custom Book",
    bookId = "custom-book",
    chapters = []
} = {}) {

    return {
        id: bookId,
        className: className,
        subject: subject,
        titleEn: bookTitle,
        titleHi: bookTitle,
        examTags: ["Custom", "Prelims", "Mains"],
        chapters: Array.isArray(chapters)
            ? chapters
            : []
    };
}


/*
 * Resolve the complete user selection.
 *
 * Returns:
 * {
 *   book,
 *   chapter
 * }
 *
 * If no registered book exists, a custom book/chapter
 * can still be generated by the AI layer.
 */
function resolveNotesSelection({
    className,
    subject,
    bookId,
    bookTitle,
    chapter,
    chapterTitle
} = {}) {

    let book = getBook(
        className,
        subject,
        bookId
    );

    if (!book) {
        book = createCustomBook({
            className:
                className || "General",
            subject:
                subject || "Study Notes",
            bookTitle:
                bookTitle || "Custom Book",
            bookId:
                bookId || "custom-book"
        });
    }

    let selectedChapter = findChapter(
        book,
        chapter
    );

    /*
     * If chapter is supplied as free text and does not exist
     * in the registered manifest, create a custom chapter.
     */
    if (!selectedChapter && chapterTitle) {
        selectedChapter = {
            number:
                typeof chapter === "number"
                    ? chapter
                    : 1,
            titleEn: chapterTitle,
            titleHi: chapterTitle,
            key: `custom-${normalizeText(
                chapterTitle
            )
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")
                .slice(0, 80)}`
        };
    }

    return {
        book,
        chapter: selectedChapter
    };
}


module.exports = {
    NCERT_BOOKS,
    normalizeText,
    normalizeClass,
    normalizeSubject,
    getBook,
    getBooks,
    getAllClasses,
    getAllSubjects,
    getChapters,
    findChapter,
    createCustomBook,
    resolveNotesSelection
};
