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
}
/* =========================================================
   CLASS 9–10 NCERT CATALOG
   ========================================================= */

Object.assign(NCERT_BOOKS, {

    class9: {
        geography: {
            id: "class9-geography",
            className: "Class 9",
            subject: "Geography",
            titleEn: "Contemporary India-I",
            titleHi: "समकालीन भारत-I",
            examTags: ["UPSC Foundation", "Prelims", "Mains", "School Exam"],
            chapters: [
                { number: 1, titleEn: "India – Size and Location", titleHi: "भारत – आकार और स्थिति", key: "india-size-location" },
                { number: 2, titleEn: "Physical Features of India", titleHi: "भारत के भौतिक स्वरूप", key: "physical-features-india" },
                { number: 3, titleEn: "Drainage", titleHi: "अपवाह", key: "drainage" },
                { number: 4, titleEn: "Climate", titleHi: "जलवायु", key: "climate" },
                { number: 5, titleEn: "Natural Vegetation and Wildlife", titleHi: "प्राकृतिक वनस्पति तथा वन्य जीवन", key: "natural-vegetation-wildlife" },
                { number: 6, titleEn: "Population", titleHi: "जनसंख्या", key: "population" }
            ]
        },

        history: {
            id: "class9-history",
            className: "Class 9",
            subject: "History",
            titleEn: "India and the Contemporary World-I",
            titleHi: "भारत और समकालीन विश्व-I",
            examTags: ["UPSC Foundation", "Prelims", "Mains", "School Exam"],
            chapters: [
                { number: 1, titleEn: "The French Revolution", titleHi: "फ्रांसीसी क्रांति", key: "french-revolution" },
                { number: 2, titleEn: "Socialism in Europe and the Russian Revolution", titleHi: "यूरोप में समाजवाद और रूसी क्रांति", key: "socialism-russian-revolution" },
                { number: 3, titleEn: "Nazism and the Rise of Hitler", titleHi: "नाज़ीवाद और हिटलर का उदय", key: "nazism-rise-hitler" },
                { number: 4, titleEn: "Forest Society and Colonialism", titleHi: "वन समाज और उपनिवेशवाद", key: "forest-society-colonialism" },
                { number: 5, titleEn: "Pastoralists in the Modern World", titleHi: "आधुनिक विश्व में चरवाहे", key: "pastoralists-modern-world" }
            ]
        },

        economics: {
            id: "class9-economics",
            className: "Class 9",
            subject: "Economy",
            titleEn: "Economics",
            titleHi: "अर्थशास्त्र",
            examTags: ["UPSC Foundation", "Prelims", "Mains", "School Exam"],
            chapters: [
                { number: 1, titleEn: "The Story of Village Palampur", titleHi: "पालमपुर गाँव की कहानी", key: "story-village-palampur" },
                { number: 2, titleEn: "People as Resource", titleHi: "लोग संसाधन के रूप में", key: "people-as-resource" },
                { number: 3, titleEn: "Poverty as a Challenge", titleHi: "निर्धनता एक चुनौती", key: "poverty-as-challenge" },
                { number: 4, titleEn: "Food Security in India", titleHi: "भारत में खाद्य सुरक्षा", key: "food-security-india" }
            ]
        },

        polity: {
            id: "class9-polity",
            className: "Class 9",
            subject: "Polity",
            titleEn: "Democratic Politics-I",
            titleHi: "लोकतांत्रिक राजनीति-I",
            examTags: ["UPSC Foundation", "Prelims", "Mains", "School Exam"],
            chapters: [
                { number: 1, titleEn: "What is Democracy? Why Democracy?", titleHi: "लोकतंत्र क्या है? लोकतंत्र क्यों?", key: "what-is-democracy" },
                { number: 2, titleEn: "Constitutional Design", titleHi: "संवैधानिक निर्माण", key: "constitutional-design" },
                { number: 3, titleEn: "Electoral Politics", titleHi: "निर्वाचन राजनीति", key: "electoral-politics" },
                { number: 4, titleEn: "Working of Institutions", titleHi: "संस्थाओं का कामकाज", key: "working-of-institutions" },
                { number: 5, titleEn: "Democratic Rights", titleHi: "लोकतांत्रिक अधिकार", key: "democratic-rights" }
            ]
        }
    },

    class10: {
        geography: {
            id: "class10-geography",
            className: "Class 10",
            subject: "Geography",
            titleEn: "Contemporary India-II",
            titleHi: "समकालीन भारत-II",
            examTags: ["UPSC", "Prelims", "Mains", "School Exam"],
            chapters: [
                { number: 1, titleEn: "Resources and Development", titleHi: "संसाधन एवं विकास", key: "resources-development" },
                { number: 2, titleEn: "Forest and Wildlife Resources", titleHi: "वन एवं वन्यजीव संसाधन", key: "forest-wildlife-resources" },
                { number: 3, titleEn: "Water Resources", titleHi: "जल संसाधन", key: "water-resources" },
                { number: 4, titleEn: "Agriculture", titleHi: "कृषि", key: "agriculture" },
                { number: 5, titleEn: "Minerals and Energy Resources", titleHi: "खनिज तथा ऊर्जा संसाधन", key: "minerals-energy-resources" },
                { number: 6, titleEn: "Manufacturing Industries", titleHi: "विनिर्माण उद्योग", key: "manufacturing-industries" },
                { number: 7, titleEn: "Lifelines of National Economy", titleHi: "राष्ट्रीय अर्थव्यवस्था की जीवन रेखाएँ", key: "lifelines-national-economy" }
            ]
        },

        history: {
            id: "class10-history",
            className: "Class 10",
            subject: "History",
            titleEn: "India and the Contemporary World-II",
            titleHi: "भारत और समकालीन विश्व-II",
            examTags: ["UPSC", "Prelims", "Mains", "School Exam"],
            chapters: [
                { number: 1, titleEn: "The Rise of Nationalism in Europe", titleHi: "यूरोप में राष्ट्रवाद का उदय", key: "nationalism-europe" },
                { number: 2, titleEn: "Nationalism in India", titleHi: "भारत में राष्ट्रवाद", key: "nationalism-india" },
                { number: 3, titleEn: "The Making of a Global World", titleHi: "भूमंडलीकृत विश्व का निर्माण", key: "making-global-world" },
                { number: 4, titleEn: "The Age of Industrialisation", titleHi: "औद्योगीकरण का युग", key: "age-industrialisation" },
                { number: 5, titleEn: "Print Culture and the Modern World", titleHi: "मुद्रण संस्कृति और आधुनिक दुनिया", key: "print-culture-modern-world" }
            ]
        },

        economics: {
            id: "class10-economics",
            className: "Class 10",
            subject: "Economy",
            titleEn: "Understanding Economic Development",
            titleHi: "आर्थिक विकास की समझ",
            examTags: ["UPSC", "Prelims", "Mains", "School Exam"],
            chapters: [
                { number: 1, titleEn: "Development", titleHi: "विकास", key: "development" },
                { number: 2, titleEn: "Sectors of the Indian Economy", titleHi: "भारतीय अर्थव्यवस्था के क्षेत्रक", key: "sectors-indian-economy" },
                { number: 3, titleEn: "Money and Credit", titleHi: "मुद्रा और साख", key: "money-credit" },
                { number: 4, titleEn: "Globalisation and the Indian Economy", titleHi: "वैश्वीकरण और भारतीय अर्थव्यवस्था", key: "globalisation-indian-economy" },
                { number: 5, titleEn: "Consumer Rights", titleHi: "उपभोक्ता अधिकार", key: "consumer-rights" }
            ]
        },

        polity: {
            id: "class10-polity",
            className: "Class 10",
            subject: "Polity",
            titleEn: "Democratic Politics-II",
            titleHi: "लोकतांत्रिक राजनीति-II",
            examTags: ["UPSC", "Prelims", "Mains", "School Exam"],
            chapters: [
                { number: 1, titleEn: "Power Sharing", titleHi: "सत्ता की साझेदारी", key: "power-sharing" },
                { number: 2, titleEn: "Federalism", titleHi: "संघवाद", key: "federalism" },
                { number: 3, titleEn: "Gender, Religion and Caste", titleHi: "लिंग, धर्म और जाति", key: "gender-religion-caste" },
                { number: 4, titleEn: "Political Parties", titleHi: "राजनीतिक दल", key: "political-parties" },
                { number: 5, titleEn: "Outcomes of Democracy", titleHi: "लोकतंत्र के परिणाम", key: "outcomes-democracy" }
            ]
        }
    }

});
;


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

    let selectedChapter = chapterTitle
        ? {
            number:
                typeof chapter === "number"
                    ? chapter
                    : String(chapter || "").trim(),
            titleEn: chapterTitle,
            titleHi: chapterTitle,
            key: `custom-${normalizeText(
                chapterTitle
            )
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")
                .slice(0, 80)}`
        }
        : findChapter(
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



/* ============================================================
   NEXORA_CLASS6_12_STANDARD_BOOKS_V1
   Official/standard textbook catalogue extension.
   Existing manifest entries are preserved.
   ============================================================ */

const NEXORA_CLASS6_12_STANDARD_BOOKS_V1 = {

  class6: {
    mathematics: {
      id: "class6-mathematics",
      className: "Class 6",
      subject: "Mathematics",
      books: [
        {
          id: "class6-maths-ganita-prakash",
          author: "NCERT",
          titleEn: "Ganita Prakash",
          titleHi: "गणित प्रकाश",
          chapters: [
            "Patterns in Mathematics",
            "Lines and Angles",
            "Number Play",
            "Data Handling and Presentation",
            "Prime Time",
            "Perimeter and Area",
            "Fractions",
            "Playing with Constructions",
            "Symmetry",
            "The Other Side of Zero"
          ]
        }
      ]
    },

    science: {
      id: "class6-science",
      className: "Class 6",
      subject: "Science",
      books: [
        {
          id: "class6-science-curiosity",
          author: "NCERT",
          titleEn: "Curiosity",
          titleHi: "जिज्ञासा",
          chapters: []
        }
      ]
    }
  },

  class7: {
    mathematics: {
      id: "class7-mathematics",
      className: "Class 7",
      subject: "Mathematics",
      books: [
        {
          id: "class7-maths-ganita-prakash",
          author: "NCERT",
          titleEn: "Ganita Prakash",
          titleHi: "गणित प्रकाश",
          chapters: []
        }
      ]
    },

    science: {
      id: "class7-science",
      className: "Class 7",
      subject: "Science",
      books: [
        {
          id: "class7-science-curiosity",
          author: "NCERT",
          titleEn: "Curiosity",
          titleHi: "जिज्ञासा",
          chapters: []
        }
      ]
    }
  },

  class8: {
    mathematics: {
      id: "class8-mathematics",
      className: "Class 8",
      subject: "Mathematics",
      books: [
        {
          id: "class8-maths",
          author: "NCERT",
          titleEn: "Mathematics",
          titleHi: "गणित",
          chapters: []
        }
      ]
    },

    science: {
      id: "class8-science",
      className: "Class 8",
      subject: "Science",
      books: [
        {
          id: "class8-science-curiosity",
          author: "NCERT",
          titleEn: "Curiosity",
          titleHi: "जिज्ञासा",
          chapters: []
        }
      ]
    }
  },

  class9: {
    science: {
      id: "class9-science-standard",
      className: "Class 9",
      subject: "Science",
      books: [
        {
          id: "class9-science-ncert",
          author: "NCERT",
          titleEn: "Science",
          titleHi: "विज्ञान",
          chapters: [
            "Matter in Our Surroundings",
            "Is Matter Around Us Pure?",
            "Atoms and Molecules",
            "Structure of the Atom",
            "The Fundamental Unit of Life",
            "Tissues",
            "Motion",
            "Force and Laws of Motion",
            "Gravitation",
            "Work and Energy",
            "Sound",
            "Improvement in Food Resources"
          ]
        }
      ]
    }
  },

  class10: {
    science: {
      id: "class10-science-standard",
      className: "Class 10",
      subject: "Science",
      books: [
        {
          id: "class10-science-ncert",
          author: "NCERT",
          titleEn: "Science",
          titleHi: "विज्ञान",
          chapters: [
            "Chemical Reactions and Equations",
            "Acids, Bases and Salts",
            "Metals and Non-metals",
            "Carbon and Its Compounds",
            "Life Processes",
            "Control and Coordination",
            "How do Organisms Reproduce?",
            "Heredity",
            "Light – Reflection and Refraction",
            "The Human Eye and the Colourful World",
            "Electricity",
            "Magnetic Effects of Electric Current",
            "Our Environment"
          ]
        }
      ]
    }
  },

  class11: {
    physics: {
      id: "class11-physics",
      className: "Class 11",
      subject: "Physics",
      books: [
        {
          id: "class11-physics-ncert",
          author: "NCERT",
          titleEn: "Physics Part-I & Part-II",
          titleHi: "भौतिकी भाग-I एवं भाग-II",
          chapters: []
        }
      ]
    },

    chemistry: {
      id: "class11-chemistry",
      className: "Class 11",
      subject: "Chemistry",
      books: [
        {
          id: "class11-chemistry-ncert",
          author: "NCERT",
          titleEn: "Chemistry Part-I & Part-II",
          titleHi: "रसायन विज्ञान भाग-I एवं भाग-II",
          chapters: []
        }
      ]
    },

    mathematics: {
      id: "class11-mathematics",
      className: "Class 11",
      subject: "Mathematics",
      books: [
        {
          id: "class11-mathematics-ncert",
          author: "NCERT",
          titleEn: "Mathematics",
          titleHi: "गणित",
          chapters: []
        }
      ]
    }
  },

  class12: {
    physics: {
      id: "class12-physics",
      className: "Class 12",
      subject: "Physics",
      books: [
        {
          id: "class12-physics-ncert",
          author: "NCERT",
          titleEn: "Physics Part-I & Part-II",
          titleHi: "भौतिकी भाग-I एवं भाग-II",
          chapters: []
        }
      ]
    },

    chemistry: {
      id: "class12-chemistry",
      className: "Class 12",
      subject: "Chemistry",
      books: [
        {
          id: "class12-chemistry-ncert",
          author: "NCERT",
          titleEn: "Chemistry Part-I & Part-II",
          titleHi: "रसायन विज्ञान भाग-I एवं भाग-II",
          chapters: []
        }
      ]
    },

    mathematics: {
      id: "class12-mathematics",
      className: "Class 12",
      subject: "Mathematics",
      books: [
        {
          id: "class12-mathematics-ncert",
          author: "NCERT",
          titleEn: "Mathematics",
          titleHi: "गणित",
          chapters: []
        }
      ]
    }
  }
};

/*
 * Merge without replacing the existing manifest.
 * Subject entries already present in NCERT_BOOKS remain authoritative.
 */
for (const [classKey, subjects] of Object.entries(NEXORA_CLASS6_12_STANDARD_BOOKS_V1)) {
  if (!NCERT_BOOKS[classKey]) {
    NCERT_BOOKS[classKey] = {};
  }

  for (const [subjectKey, subjectData] of Object.entries(subjects)) {
    if (!NCERT_BOOKS[classKey][subjectKey]) {
      NCERT_BOOKS[classKey][subjectKey] = subjectData;
    }
  }
}



/* ============================================================
   NEXORA_STANDARD_REFERENCE_BOOKS_V1
   Standard / Competitive Reference Books
   These are NOT NCERT school textbooks.
   ============================================================ */

const NEXORA_STANDARD_REFERENCE_BOOKS_V1 = {

  polity: [
    {
      id: "standard-laxmikanth-indian-polity-8e",
      author: "M. Laxmikanth",
      titleEn: "Indian Polity",
      titleHi: "भारतीय राजव्यवस्था",
      edition: "8th Edition",
      examTags: [
        "UPSC",
        "UPPCS",
        "State PSC",
        "SSC",
        "Competitive Exams"
      ],
      chapters: [
        "Historical Background",
        "Making of the Constitution",
        "Concept of Constitution",
        "Salient Features of the Constitution",
        "Preamble of the Constitution",
        "Union and its Territory",
        "Citizenship",
        "Fundamental Rights",
        "Directive Principles of State Policy",
        "Fundamental Duties",
        "Amendment of the Constitution",
        "Basic Structure of the Constitution",
        "Parliamentary System",
        "Federal System",
        "Centre–State Relations",
        "Inter-State Relations",
        "Emergency Provisions",
        "President",
        "Vice-President",
        "Prime Minister",
        "Central Council of Ministers",
        "Cabinet Committees",
        "Parliament",
        "Parliamentary Committees",
        "Parliamentary Group",
        "Supreme Court",
        "Judicial Review",
        "Judicial Activism",
        "Public Interest Litigation",
        "Governor",
        "Chief Minister",
        "State Council of Ministers",
        "State Legislature",
        "High Court",
        "Subordinate Courts",
        "Tribunals",
        "National Consumer Disputes Redressal Commission",
        "Lok Adalats",
        "Other Dispute Resolution Mechanisms",
        "Panchayati Raj",
        "Municipalities",
        "Union Territories",
        "Scheduled and Tribal Areas",
        "Election Commission",
        "Union Public Service Commission",
        "State Public Service Commission",
        "Finance Commission",
        "Comptroller and Auditor General",
        "Attorney General of India",
        "Advocate General of the State",
        "Constitutional Bodies",
        "Non-Constitutional Bodies",
        "National Human Rights Commission",
        "National Commission for Women",
        "National Commission for Scheduled Castes",
        "National Commission for Scheduled Tribes",
        "National Commission for Backward Classes",
        "Central Information Commission",
        "Central Vigilance Commission",
        "Lokpal and Lokayuktas",
        "Co-operative Societies",
        "Official Language",
        "Public Services",
        "Tribunals",
        "Administrative Relations",
        "Special Provisions for Certain States",
        "Scheduled and Tribal Areas",
        "Political Parties",
        "Elections",
        "Anti-Defection Law",
        "Pressure Groups",
        "National Integration",
        "Secularism",
        "Communalism",
        "Regionalism",
        "Caste and Politics",
        "Foreign Policy",
        "Constitutional Review",
        "Important Constitutional Amendments",
        "Important Acts and Constitutional Developments",
        "World Constitutions"
      ]
    }
  ],

  geography: [
    {
      id: "standard-gc-leong-certificate-physical-human-geography",
      author: "G.C. Leong",
      titleEn: "Certificate Physical and Human Geography",
      titleHi: "सर्टिफिकेट फिजिकल एंड ह्यूमन जियोग्राफी",
      edition: "Standard Reference Edition",
      examTags: [
        "UPSC",
        "UPPCS",
        "State PSC",
        "SSC",
        "Competitive Exams"
      ],
      chapters: [
        "The Earth and the Universe",
        "The Earth's Crust",
        "Volcanism and Earthquakes",
        "Weathering, Mass Movement and Groundwater",
        "Landforms Made by Running Water",
        "Landforms of Glaciation",
        "Arid or Desert Landforms",
        "Limestone and Chalk Landform",
        "Lakes",
        "Coastal Landforms",
        "Islands and Coral Reefs",
        "The Oceans",
        "Weather",
        "Climate",
        "The Hot, Wet Equatorial Climate",
        "The Tropical Monsoon and Tropical Marine Climates",
        "The Savanna or Sudan Climate",
        "The Hot Desert and Mid-Latitude Desert Climates",
        "The Warm Temperate Western Margin (Mediterranean) Climate",
        "The Temperate Continental (Steppe) Climate",
        "The Warm Temperate Eastern Margin (China Type) Climate",
        "The Cool Temperate Western Margin (British Type) Climate",
        "The Cool Temperate Continental (Siberian) Climate",
        "The Cool Temperate Eastern Margin (Laurentian)",
        "The Arctic or Polar Climate"
      ]
    }
  ],

  history: [
    {
      id: "standard-bipan-chandra-modern-india",
      author: "Bipan Chandra",
      titleEn: "India's Struggle for Independence",
      titleHi: "भारत का स्वतंत्रता संघर्ष",
      edition: "Standard Reference Book",
      examTags: [
        "UPSC",
        "UPPCS",
        "State PSC",
        "Competitive Exams"
      ],
      chapters: []
    },
    {
      id: "standard-rs-sharma-ancient-india",
      author: "R.S. Sharma",
      titleEn: "India's Ancient Past",
      titleHi: "प्राचीन भारत",
      edition: "Standard Reference Book",
      examTags: [
        "UPSC",
        "UPPCS",
        "State PSC",
        "Competitive Exams"
      ],
      chapters: []
    },
    {
      id: "standard-satish-chandra-medieval-india",
      author: "Satish Chandra",
      titleEn: "Medieval India",
      titleHi: "मध्यकालीन भारत",
      edition: "Standard Reference Book",
      examTags: [
        "UPSC",
        "UPPCS",
        "State PSC",
        "Competitive Exams"
      ],
      chapters: []
    },
    {
      id: "standard-rajiv-ahir-spectrum-modern-india",
      author: "Rajiv Ahir",
      titleEn: "A Brief History of Modern India",
      titleHi: "आधुनिक भारत का संक्षिप्त इतिहास",
      edition: "Spectrum",
      examTags: [
        "UPSC",
        "UPPCS",
        "State PSC",
        "Competitive Exams"
      ],
      chapters: []
    }
  ],

  economy: [
    {
      id: "standard-ramesh-singh-indian-economy",
      author: "Ramesh Singh",
      titleEn: "Indian Economy",
      titleHi: "भारतीय अर्थव्यवस्था",
      edition: "Standard Reference Book",
      examTags: [
        "UPSC",
        "UPPCS",
        "State PSC",
        "Competitive Exams"
      ],
      chapters: []
    }
  ],

  environment: [
    {
      id: "standard-shankar-ias-environment",
      author: "Shankar IAS",
      titleEn: "Environment",
      titleHi: "पर्यावरण",
      edition: "Standard Reference Book",
      examTags: [
        "UPSC",
        "UPPCS",
        "State PSC",
        "Competitive Exams"
      ],
      chapters: []
    }
  ],

  culture: [
    {
      id: "standard-nitin-singhania-art-culture",
      author: "Nitin Singhania",
      titleEn: "Indian Art and Culture",
      titleHi: "भारतीय कला एवं संस्कृति",
      edition: "Standard Reference Book",
      examTags: [
        "UPSC",
        "UPPCS",
        "State PSC",
        "Competitive Exams"
      ],
      chapters: []
    }
  ],

  geography_india: [
    {
      id: "standard-dr-khullar-india-geography",
      author: "D.R. Khullar",
      titleEn: "India: A Comprehensive Geography",
      titleHi: "भारत: एक व्यापक भूगोल",
      edition: "Standard Reference Book",
      examTags: [
        "UPSC",
        "UPPCS",
        "State PSC",
        "Competitive Exams"
      ],
      chapters: []
    }
  ]
};

/*
 * Make standard books available to every Class 6–12 selection.
 * Existing NCERT/class-specific entries are NOT replaced.
 */
const NEXORA_STANDARD_SUBJECT_MAP = {
  polity: "polity",
  history: "history",
  geography: "geography",
  economy: "economy",
  environment: "environment",
  culture: "culture"
};

for (let classNo = 6; classNo <= 12; classNo++) {
  const classKey = `class${classNo}`;

  if (!NCERT_BOOKS[classKey]) {
    NCERT_BOOKS[classKey] = {};
  }

  for (const [subjectKey, standardKey] of Object.entries(NEXORA_STANDARD_SUBJECT_MAP)) {
    const standardBooks = NEXORA_STANDARD_REFERENCE_BOOKS_V1[standardKey] || [];

    if (!standardBooks.length) continue;

    if (!NCERT_BOOKS[classKey][subjectKey]) {
      NCERT_BOOKS[classKey][subjectKey] = {
        id: `${classKey}-${subjectKey}`,
        className: `Class ${classNo}`,
        subject: subjectKey,
        books: []
      };
    }

    const target = NCERT_BOOKS[classKey][subjectKey];

    if (!Array.isArray(target.books)) {
      target.books = [];
    }

    for (const book of standardBooks) {
      if (!target.books.some(existing => existing.id === book.id)) {
        target.books.push({
          ...book,
          standardReference: true
        });
      }
    }
  }
}



/* ============================================================
   NEXORA_VERIFIED_STANDARD_CHAPTERS_V2
   Verified chapter mappings for standard/reference books.
   ============================================================ */

const NEXORA_VERIFIED_STANDARD_CHAPTERS_V2 = {
  "standard-satish-chandra-medieval-india": [
    "India and the World",
    "Northern India: Age of the Three Empires (800–1000)",
    "South India: The Chola Empire (900–1200)",
    "Economic and Social Life, Education and Religious Beliefs (800–1200)",
    "The Age of Conflict (Circa 1000–1200)",
    "The Delhi Sultanat I (Circa 1200–1300)",
    "The Delhi Sultanat II (Circa 1300–1400)",
    "Government, and Economic and Social Life under the Delhi Sultanat",
    "The Age of Vijayanagara and the Bahmanids, and the Coming of the Portuguese (Circa 1350–1565)",
    "Struggle for Empire in North India I (Circa 1400–1525)",
    "Cultural Development in India (1200–1500)",
    "Struggle for Empire in North India II: Mughals and Afghans (1525–1555)",
    "Consolidation of the Mughal Empire: Age of Akbar",
    "The Deccan and South India (Up to 1656)",
    "India in the First Half of the Seventeenth Century",
    "Economic and Social Life under the Mughals",
    "Cultural and Religious Developments",
    "Climax and Disintegration of the Mughal Empire I",
    "Climax and Disintegration of the Mughal Empire II",
    "Assessment and Review"
  ],

  "standard-ramesh-singh-indian-economy": [
    "An Introduction to Economics",
    "National Income",
    "Growth, Development and Happiness",
    "Evolution of the Indian Economy",
    "Economic Planning",
    "Planning in India",
    "Economic Reforms",
    "Inflation and Business Cycle",
    "Agriculture and Food Management",
    "Industry and Infrastructure",
    "Services Sector",
    "Indian Financial Market",
    "Banking in India",
    "Insurance in India",
    "Security Market in India",
    "External Sector in India",
    "International Economic Organisations and India",
    "Tax Structure in India",
    "Public Finance in India",
    "Sustainability and Climate Change: India and the World",
    "Human Development in India",
    "Burning Socioeconomic Issues"
  ]
};

/*
 * Apply only to the exact standard-book IDs.
 * Existing NCERT and other manifest entries remain untouched.
 */
for (const [bookId, chapters] of Object.entries(
  NEXORA_VERIFIED_STANDARD_CHAPTERS_V2
)) {
  for (const classData of Object.values(NCERT_BOOKS)) {
    for (const subjectData of Object.values(classData || {})) {

      if (!subjectData) continue;

      const books = Array.isArray(subjectData.books)
        ? subjectData.books
        : [];

      for (const book of books) {
        if (book && book.id === bookId) {
          book.chapters = chapters.map((title, index) => ({
            id: `${bookId}-chapter-${index + 1}`,
            number: index + 1,
            titleEn: title,
            title: title
          }));
        }
      }
    }
  }
}



/* ============================================================
   NEXORA_HISTORY_STANDARD_CHAPTERS_V3
   Verified standard history-book chapter catalogue.
   ============================================================ */

const NEXORA_HISTORY_STANDARD_CHAPTERS_V3 = {

  "standard-rs-sharma-ancient-india": [
    "The Significance of Ancient Indian History",
    "Modern Historians of Ancient India",
    "Nature of Sources and Historical Construction",
    "Geographical Setting",
    "Ecology and Environment",
    "The Linguistic Background",
    "Human Evolution: The Old Stone Age",
    "The Neolithic Age: First Food Producers and Animal Keepers",
    "Chalcolithic Cultures",
    "Harappan Culture: Bronze Age Urbanization in the Indus Valley",
    "Identity of Aryan Culture",
    "The Age of the Rig Veda",
    "The Later Vedic Phase: Transition to State and Social Orders",
    "Jainism and Buddhism",
    "Territorial States and the Rise of Magadha",
    "Iranian and Macedonian Invasions",
    "State Structure and the Varna System in the Age of the Buddha",
    "The Maurya Age",
    "The Significance of Maurya Rule",
    "Central Asian Contact and Mutual Impact",
    "The Satavahana Phase",
    "The Dawn of History in the Deep South",
    "Crafts, Commerce, and Urban Growth (200 BC–AD 250)",
    "Rise and Growth of the Gupta Empire",
    "Life in the Gupta Age",
    "Spread of Civilization in Eastern India",
    "Harsha and His Times",
    "Brahmanization, Rural Expansion, and Peasant Protest in the Peninsula",
    "Developments in Philosophy",
    "Cultural Interaction with Asian Countries",
    "From Ancient to Medieval",
    "Sequence of Social Changes",
    "Legacy in Science and Civilization"
  ],

  "standard-bipan-chandra-modern-india": [
    "The First Major Challenge: The Revolt of 1857",
    "Civil Rebellions and Tribal Uprisings",
    "Peasant Movements and Uprisings after 1857",
    "Foundation of the Congress: The Myth",
    "Foundation of the Indian National Congress: The Reality",
    "Socio-Religious Reforms and the National Awakening",
    "An Economic Critique of Colonialism",
    "The Fight to Secure Press Freedom",
    "Propaganda in the Legislatures",
    "The Swadeshi Movement—1903–1908",
    "The Split in the Congress and the Rise of Revolutionary Terrorism",
    "World War I and Indian Nationalism: The Ghadar",
    "The Home Rule Movement and Its Fallout",
    "Gandhiji's Early Career and Activism",
    "The Non-Cooperation Movement—1920–1922",
    "Peasant Movements and Nationalism in the 1920s",
    "The Indian Working Class and the National Movement",
    "The Struggles for Gurdwara Reform and Temple Entry",
    "The Years of Stagnation: Swarajists, No-Changers and Gandhiji",
    "The Simon Commission and the Nehru Report",
    "Civil Disobedience—1930–1932",
    "From Karachi to Wardha: The Years from 1932–1934",
    "The Rise of the Left-Wing",
    "The Strategic Debate—1934–1937",
    "Twenty-Eight Months of Congress Rule",
    "Peasant Movements in the 1930s and 1940s",
    "The Freedom Struggle in Princely India",
    "Indian Capitalists and the National Movement",
    "The Development of a Nationalist Foreign Policy",
    "The Rise and Growth of Communalism",
    "Communalism—The Liberal Phase",
    "Jinnah, Golwalkar and Extreme Communalism",
    "The Crisis at Tripuri to the Cripps Mission",
    "The Quit India Movement and the INA",
    "Post-War National Upsurge",
    "The Long-Term Strategy of the National Movement",
    "The Indian National Movement: The Ideological Dimension",
    "The Myth and Reality of Partition",
    "Freedom and Partition"
  ],

  "standard-rajiv-ahir-spectrum-modern-india": [
    "Sources for the History of Modern India",
    "Major Approaches to the History of Modern India",
    "Advent of the Europeans in India",
    "India on the Eve of British Conquest",
    "Expansion and Consolidation of British Power in India",
    "People's Resistance Against British Before 1857",
    "The Revolt of 1857",
    "Socio-Religious Reform Movements: General Features",
    "A General Survey of Socio-Cultural Reform Movements and Their Leaders",
    "Beginning of Modern Nationalism in India",
    "Indian National Congress: Foundation and the Moderate Phase",
    "Era of Militant Nationalism (1905–1909)",
    "First Phase of Revolutionary Activities (1907–1917)",
    "First World War and Nationalist Response",
    "Emergence of Gandhi",
    "Non-Cooperation Movement and Khilafat Aandolan",
    "Emergence of Swarajists, Socialist Ideas, Revolutionary Activities and Other New Forces",
    "Second Phase of Revolutionary Activities",
    "Simon Commission and Nehru Report",
    "Civil Disobedience Movement and Round Table Conferences",
    "Debates on the Future Strategy after Civil Disobedience",
    "The Rise of the Left-Wing",
    "Constitutional Developments during the British Rule",
    "Quit India Movement, Demand for Pakistan and the INA",
    "Post-War Nationalism",
    "Independence with Partition",
    "First Phase of Independent India",
    "Consolidation as a Nation",
    "Integration of States",
    "The First General Election",
    "Developments under Nehru's Leadership (1947–1964)",
    "Economic Development and Planning",
    "Foreign Policy and Relations",
    "India after Nehru",
    "The 1967 Elections and the Rise of Regional Politics",
    "Indira Gandhi: The First Phase",
    "The Emergency and the Janata Government",
    "Indira Gandhi: The Second Phase",
    "The Rajiv Years and Developments after 1989"
  ]
};

/* Apply chapter arrays to the exact standard-book records. */
for (const [bookId, chapterTitles] of Object.entries(
  NEXORA_HISTORY_STANDARD_CHAPTERS_V3
)) {
  for (const classData of Object.values(NCERT_BOOKS || {})) {
    for (const subjectData of Object.values(classData || {})) {

      if (!subjectData) continue;

      const books = Array.isArray(subjectData.books)
        ? subjectData.books
        : [];

      for (const book of books) {
        if (book && book.id === bookId) {
          book.chapters = chapterTitles.map((title, index) => ({
            id: `${bookId}-chapter-${index + 1}`,
            number: index + 1,
            titleEn: title,
            title: title
          }));
        }
      }
    }
  }
}



/* ============================================================
   NEXORA_NITIN_SINGHANIA_CHAPTERS_V4
   Indian Art & Culture — current 6th Edition
   ============================================================ */

const NEXORA_NITIN_SINGHANIA_CHAPTERS_V4 = [
  "Pre-Historic Cultures in India",
  "Indian Architecture",
  "Sculpture and Pottery",
  "Edicts and Inscriptions",
  "Coins in India",
  "Legendary Cities of India",
  "Indian Paintings",
  "Indian Handicrafts",
  "Geographical Indications",
  "Indian Music",
  "Indian Dance",
  "Indian Theatre, Puppetry, Circus, Martial Arts and Sports Forms",
  "Indian Cinema",
  "Languages and Scripts",
  "Indian Literature",
  "UNESCO World Heritage Sites",
  "UNESCO's List of Intangible Cultural Heritage",
  "Religion in India",
  "Buddhism and Jainism",
  "Bhakti and Sufi Traditions",
  "Schools of Philosophy",
  "Fairs in India",
  "Festivals in India",
  "Education in India",
  "Science & Technology through the Ages",
  "Calendar Forms",
  "Cultural Institutions in India",
  "Awards & Honours",
  "Law & Culture",
  "Trade, Traders, and Cultural Exchange",
  "India through the eyes of foreign Travellers"
];

for (const classData of Object.values(NCERT_BOOKS || {})) {
  for (const subjectData of Object.values(classData || {})) {

    if (!subjectData) continue;

    const books = Array.isArray(subjectData.books)
      ? subjectData.books
      : [];

    for (const book of books) {
      if (
        book &&
        book.id === "standard-nitin-singhania-art-culture"
      ) {
        book.chapters =
          NEXORA_NITIN_SINGHANIA_CHAPTERS_V4.map(
            (title, index) => ({
              id: `${book.id}-chapter-${index + 1}`,
              number: index + 1,
              titleEn: title,
              title: title
            })
          );

        book.edition = "6th Edition";
        book.sourceVerified = true;
      }
    }
  }
}



/* ============================================================
   NEXORA_COMPLETE_CATALOGUE_V5
   CLASS 6-12
   NCERT + STANDARD / COMPETITIVE BOOK ARCHITECTURE

   Rules:
   1. Existing manifest entries are preserved.
   2. Existing verified chapters are preserved.
   3. Unverified chapter lists are NOT invented.
   4. Standard books are reusable across Classes 6-12
      because they are competitive/reference books.
   5. NCERT books remain class-specific.
   ============================================================ */

const NEXORA_COMPLETE_CATALOGUE_V5 = {

  /* ----------------------------------------------------------
     STANDARD / COMPETITIVE BOOKS
     ---------------------------------------------------------- */

  standardBooks: [

    {
      id: "std-laxmikanth-indian-polity-8e",
      author: "M. Laxmikanth",
      subject: "Polity",
      titleEn: "Indian Polity",
      titleHi: "भारतीय राजव्यवस्था",
      edition: "8th Edition",
      sourceType: "standard_reference",
      chapters: [
        "Historical Background",
        "Making of the Constitution",
        "Concept of Constitution",
        "Salient Features of the Constitution",
        "Preamble of the Constitution",
        "Union and its Territory",
        "Citizenship",
        "Fundamental Rights",
        "Directive Principles of State Policy",
        "Fundamental Duties",
        "Amendment of the Constitution",
        "Basic Structure of the Constitution",
        "Parliamentary System",
        "Federal System",
        "Centre–State Relations",
        "Inter-State Relations",
        "Emergency Provisions",
        "President",
        "Vice-President",
        "Prime Minister",
        "Central Council of Ministers",
        "Cabinet Committees",
        "Parliament",
        "Parliamentary Committees",
        "Parliamentary Group",
        "Supreme Court",
        "Judicial Review",
        "Judicial Activism",
        "Public Interest Litigation",
        "Governor",
        "Chief Minister",
        "State Council of Ministers",
        "State Legislature",
        "High Court",
        "Subordinate Courts",
        "Tribunals",
        "Panchayati Raj",
        "Municipalities",
        "Union Territories",
        "Scheduled and Tribal Areas",
        "Election Commission",
        "Union Public Service Commission",
        "State Public Service Commission",
        "Finance Commission",
        "Comptroller and Auditor General",
        "Attorney General of India",
        "Advocate General of the State",
        "Constitutional Bodies",
        "Non-Constitutional Bodies",
        "National Human Rights Commission",
        "National Commission for Women",
        "National Commission for Scheduled Castes",
        "National Commission for Scheduled Tribes",
        "National Commission for Backward Classes",
        "Central Information Commission",
        "Central Vigilance Commission",
        "Lokpal and Lokayuktas",
        "Co-operative Societies",
        "Official Language",
        "Public Services",
        "Political Parties",
        "Elections",
        "Anti-Defection Law",
        "Pressure Groups",
        "National Integration",
        "Secularism",
        "Communalism",
        "Regionalism",
        "Caste and Politics",
        "Foreign Policy",
        "Constitutional Review",
        "Important Constitutional Amendments",
        "World Constitutions"
      ]
    },

    {
      id: "std-gc-leong-physical-human-geography",
      author: "G.C. Leong",
      subject: "Geography",
      titleEn: "Certificate Physical and Human Geography",
      titleHi: "सर्टिफिकेट फिजिकल एंड ह्यूमन जियोग्राफी",
      sourceType: "standard_reference",
      chapters: [
        "The Earth and the Universe",
        "The Earth's Crust",
        "Volcanism and Earthquakes",
        "Weathering, Mass Movement and Groundwater",
        "Landforms Made by Running Water",
        "Landforms of Glaciation",
        "Arid or Desert Landforms",
        "Limestone and Chalk Landforms",
        "Lakes",
        "Coastal Landforms",
        "Islands and Coral Reefs",
        "The Oceans",
        "Weather",
        "Climate",
        "The Hot, Wet Equatorial Climate",
        "The Tropical Monsoon and Tropical Marine Climates",
        "The Savanna or Sudan Climate",
        "The Hot Desert and Mid-Latitude Desert Climates",
        "The Warm Temperate Western Margin Climate",
        "The Temperate Continental Climate",
        "The Warm Temperate Eastern Margin Climate",
        "The Cool Temperate Western Margin Climate",
        "The Cool Temperate Continental Climate",
        "The Cool Temperate Eastern Margin Climate",
        "The Arctic or Polar Climate"
      ]
    },

    {
      id: "std-nitin-singhania-indian-art-culture",
      author: "Nitin Singhania",
      subject: "Art and Culture",
      titleEn: "Indian Art and Culture",
      titleHi: "भारतीय कला एवं संस्कृति",
      edition: "6th Edition",
      sourceType: "standard_reference",
      chapters: [
        "Pre-Historic Cultures in India",
        "Indian Architecture",
        "Sculpture and Pottery",
        "Edicts and Inscriptions",
        "Coins in India",
        "Legendary Cities of India",
        "Indian Paintings",
        "Indian Handicrafts",
        "Geographical Indications",
        "Indian Music",
        "Indian Dance",
        "Indian Theatre, Puppetry, Circus, Martial Arts and Sports Forms",
        "Indian Cinema",
        "Languages and Scripts",
        "Indian Literature",
        "UNESCO World Heritage Sites",
        "UNESCO's List of Intangible Cultural Heritage",
        "Religion in India",
        "Buddhism and Jainism",
        "Bhakti and Sufi Traditions",
        "Schools of Philosophy",
        "Fairs in India",
        "Festivals in India",
        "Education in India",
        "Science and Technology through the Ages",
        "Calendar Forms",
        "Cultural Institutions in India",
        "Awards and Honours",
        "Law and Culture",
        "Trade, Traders and Cultural Exchange",
        "India through the Eyes of Foreign Travellers"
      ]
    },

    {
      id: "std-bipan-chandra-indias-struggle",
      author: "Bipan Chandra",
      subject: "History",
      titleEn: "India's Struggle for Independence",
      titleHi: "भारत का स्वतंत्रता संघर्ष",
      sourceType: "standard_reference",
      chapters: []
    },

    {
      id: "std-rs-sharma-indias-ancient-past",
      author: "R.S. Sharma",
      subject: "History",
      titleEn: "India's Ancient Past",
      titleHi: "प्राचीन भारत",
      sourceType: "standard_reference",
      chapters: []
    },

    {
      id: "std-satish-chandra-medieval-india",
      author: "Satish Chandra",
      subject: "History",
      titleEn: "Medieval India",
      titleHi: "मध्यकालीन भारत",
      sourceType: "standard_reference",
      chapters: []
    },

    {
      id: "std-rajiv-ahir-modern-india",
      author: "Rajiv Ahir",
      subject: "History",
      titleEn: "A Brief History of Modern India",
      titleHi: "आधुनिक भारत का संक्षिप्त इतिहास",
      edition: "Spectrum",
      sourceType: "standard_reference",
      chapters: []
    },

    {
      id: "std-ramesh-singh-indian-economy",
      author: "Ramesh Singh",
      subject: "Economy",
      titleEn: "Indian Economy",
      titleHi: "भारतीय अर्थव्यवस्था",
      sourceType: "standard_reference",
      chapters: []
    },

    {
      id: "std-shankar-ias-environment",
      author: "Shankar IAS",
      subject: "Environment",
      titleEn: "Environment",
      titleHi: "पर्यावरण",
      sourceType: "standard_reference",
      chapters: []
    },

    {
      id: "std-dr-khullar-india-geography",
      author: "D.R. Khullar",
      subject: "Geography",
      titleEn: "India: A Comprehensive Geography",
      titleHi: "भारत: एक व्यापक भूगोल",
      sourceType: "standard_reference",
      chapters: []
    }

  ],

  /* ----------------------------------------------------------
     CURRENT NCERT BOOK ALIASES
     ---------------------------------------------------------- */

  ncertBooks: {

    class6: {
      mathematics: {
        author: "NCERT",
        titleEn: "Ganita Prakash",
        titleHi: "गणित प्रकाश"
      },
      science: {
        author: "NCERT",
        titleEn: "Curiosity",
        titleHi: "जिज्ञासा"
      },
      english: {
        author: "NCERT",
        titleEn: "Poorvi",
        titleHi: "पूर्वी"
      },
      social_science: {
        author: "NCERT",
        titleEn: "Exploring Society: India and Beyond",
        titleHi: "एक्सप्लोरिंग सोसाइटी: इंडिया एंड बियॉन्ड"
      },
      hindi: {
        author: "NCERT",
        titleEn: "Malhar",
        titleHi: "मल्हार"
      },
      sanskrit: {
        author: "NCERT",
        titleEn: "Deepakam",
        titleHi: "दीपकम"
      }
    },

    class7: {
      mathematics: {
        author: "NCERT",
        titleEn: "Mathematics",
        titleHi: "गणित"
      },
      science: {
        author: "NCERT",
        titleEn: "Curiosity",
        titleHi: "जिज्ञासा"
      },
      english: {
        author: "NCERT",
        titleEn: "Poorvi",
        titleHi: "पूर्वी"
      },
      hindi: {
        author: "NCERT",
        titleEn: "Vasant",
        titleHi: "वसंत"
      }
    },

    class8: {
      mathematics: {
        author: "NCERT",
        titleEn: "Mathematics",
        titleHi: "गणित"
      },
      science: {
        author: "NCERT",
        titleEn: "Curiosity",
        titleHi: "जिज्ञासा"
      },
      english: {
        author: "NCERT",
        titleEn: "Poorvi",
        titleHi: "पूर्वी"
      },
      hindi: {
        author: "NCERT",
        titleEn: "Vasant",
        titleHi: "वसंत"
      }
    },

    class9: {
      mathematics: {
        author: "NCERT",
        titleEn: "Mathematics",
        titleHi: "गणित"
      },
      science: {
        author: "NCERT",
        titleEn: "Science",
        titleHi: "विज्ञान"
      },
      english: {
        author: "NCERT",
        titleEn: "English",
        titleHi: "English"
      },
      hindi: {
        author: "NCERT",
        titleEn: "Hindi",
        titleHi: "हिंदी"
      }
    },

    class10: {
      mathematics: {
        author: "NCERT",
        titleEn: "Mathematics",
        titleHi: "गणित"
      },
      science: {
        author: "NCERT",
        titleEn: "Science",
        titleHi: "विज्ञान"
      },
      english: {
        author: "NCERT",
        titleEn: "First Flight",
        titleHi: "First Flight"
      },
      hindi: {
        author: "NCERT",
        titleEn: "Kshitij / Sparsh",
        titleHi: "क्षितिज / स्पर्श"
      }
    },

    class11: {
      physics: {
        author: "NCERT",
        titleEn: "Physics Part I & II",
        titleHi: "भौतिकी भाग I एवं II"
      },
      chemistry: {
        author: "NCERT",
        titleEn: "Chemistry Part I & II",
        titleHi: "रसायन विज्ञान भाग I एवं II"
      },
      biology: {
        author: "NCERT",
        titleEn: "Biology",
        titleHi: "जीव विज्ञान"
      },
      mathematics: {
        author: "NCERT",
        titleEn: "Mathematics",
        titleHi: "गणित"
      },
      english: {
        author: "NCERT",
        titleEn: "Hornbill / Snapshots",
        titleHi: "Hornbill / Snapshots"
      },
      history: {
        author: "NCERT",
        titleEn: "Themes in World History",
        titleHi: "Themes in World History"
      },
      economics: {
        author: "NCERT",
        titleEn: "Indian Economic Development",
        titleHi: "भारतीय आर्थिक विकास"
      },
      political_science: {
        author: "NCERT",
        titleEn: "Indian Constitution at Work / Political Theory",
        titleHi: "भारत का संविधान कार्य में / राजनीतिक सिद्धांत"
      }
    },

    class12: {
      physics: {
        author: "NCERT",
        titleEn: "Physics Part I & II",
        titleHi: "भौतिकी भाग I एवं II"
      },
      chemistry: {
        author: "NCERT",
        titleEn: "Chemistry Part I & II",
        titleHi: "रसायन विज्ञान भाग I एवं II"
      },
      biology: {
        author: "NCERT",
        titleEn: "Biology",
        titleHi: "जीव विज्ञान"
      },
      mathematics: {
        author: "NCERT",
        titleEn: "Mathematics",
        titleHi: "गणित"
      },
      history: {
        author: "NCERT",
        titleEn: "Themes in Indian History",
        titleHi: "Themes in Indian History"
      },
      geography: {
        author: "NCERT",
        titleEn: "Fundamentals of Human Geography / India: People and Economy",
        titleHi: "मानव भूगोल के मूल सिद्धांत / भारत: लोग और अर्थव्यवस्था"
      },
      economics: {
        author: "NCERT",
        titleEn: "Introductory Macroeconomics / Indian Economic Development",
        titleHi: "समष्टि अर्थशास्त्र का परिचय / भारतीय आर्थिक विकास"
      },
      political_science: {
        author: "NCERT",
        titleEn: "Contemporary World Politics / Politics in India Since Independence",
        titleHi: "समकालीन विश्व राजनीति / स्वतंत्रता के बाद भारत में राजनीति"
      },
      english: {
        author: "NCERT",
        titleEn: "Flamingo / Vistas",
        titleHi: "Flamingo / Vistas"
      }
    }
  }
};


/* ------------------------------------------------------------
   NORMALISE CHAPTER OBJECTS
   ------------------------------------------------------------ */

function nexoraNormaliseBook(book) {

  if (!book || typeof book !== "object") {
    return book;
  }

  if (!Array.isArray(book.chapters)) {
    book.chapters = [];
  }

  book.chapters = book.chapters.map((chapter, index) => {

    if (typeof chapter === "string") {
      return {
        id: `${book.id || "book"}-chapter-${index + 1}`,
        number: index + 1,
        titleEn: chapter,
        title: chapter
      };
    }

    return {
      id:
        chapter.id ||
        `${book.id || "book"}-chapter-${index + 1}`,

      number:
        chapter.number ||
        index + 1,

      titleEn:
        chapter.titleEn ||
        chapter.title ||
        chapter.name ||
        `Chapter ${index + 1}`,

      title:
        chapter.title ||
        chapter.titleEn ||
        chapter.name ||
        `Chapter ${index + 1}`
    };

  });

  return book;
}


/* ------------------------------------------------------------
   STANDARD BOOK INDEX
   ------------------------------------------------------------ */

const NEXORA_STANDARD_BOOK_INDEX = {};

for (const book of NEXORA_COMPLETE_CATALOGUE_V5.standardBooks) {

  nexoraNormaliseBook(book);

  NEXORA_STANDARD_BOOK_INDEX[book.id] = book;

  if (Array.isArray(book.chapters) && book.chapters.length) {
    book.chapterMappingVerified = true;
  } else {
    book.chapterMappingVerified = false;
  }
}


/* ------------------------------------------------------------
   DO NOT DUPLICATE STANDARD BOOKS
   ------------------------------------------------------------ */

for (const classNo of [6,7,8,9,10,11,12]) {

  const classKey = `class${classNo}`;

  if (!NCERT_BOOKS[classKey]) {
    NCERT_BOOKS[classKey] = {};
  }

  for (const book of NEXORA_COMPLETE_CATALOGUE_V5.standardBooks) {

    const subjectKey =
      String(book.subject || "Other")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_|_$/g, "");

    if (!NCERT_BOOKS[classKey][subjectKey]) {

      NCERT_BOOKS[classKey][subjectKey] = {
        id: `${classKey}-${subjectKey}`,
        className: `Class ${classNo}`,
        subject: book.subject,
        books: []
      };

    }

    const subjectData = NCERT_BOOKS[classKey][subjectKey];

    if (!Array.isArray(subjectData.books)) {
      subjectData.books = [];
    }

    if (!subjectData.books.some(
      existing =>
        existing.id === book.id ||
        (
          existing.author === book.author &&
          existing.titleEn === book.titleEn
        )
    )) {

      subjectData.books.push({
        ...book
      });

    }

  }
}


/* ------------------------------------------------------------
   ADD NCERT BOOK ALIASES ONLY WHEN MISSING
   Existing detailed NCERT records always win.
   ------------------------------------------------------------ */

for (const [classKey, subjects] of Object.entries(
  NEXORA_COMPLETE_CATALOGUE_V5.ncertBooks
)) {

  if (!NCERT_BOOKS[classKey]) {
    NCERT_BOOKS[classKey] = {};
  }

  for (const [subjectKey, info] of Object.entries(subjects)) {

    if (!info) continue;

    if (!NCERT_BOOKS[classKey][subjectKey]) {

      NCERT_BOOKS[classKey][subjectKey] = {
        id: `${classKey}-${subjectKey}-ncert`,
        className:
          `Class ${classKey.replace("class", "")}`,
        subject: subjectKey,
        books: [
          {
            id:
              `${classKey}-${subjectKey}-ncert-book`,
            author: info.author || "NCERT",
            titleEn: info.titleEn,
            titleHi: info.titleHi,
            sourceType: "ncert",
            chapters: []
          }
        ]
      };

    }

  }
}


/* ------------------------------------------------------------
   CATALOGUE METADATA
   ------------------------------------------------------------ */

NCERT_BOOKS.__nexoraCatalogue = {
  version: "5.0",
  classes: [6,7,8,9,10,11,12],
  supportsNCERT: true,
  supportsStandardBooks: true,
  supportsAuthorSelection: true,
  supportsBookSelection: true,
  supportsChapterSelection: true,
  customChapterTyping: false
};



/* ============================================================
   NEXORA_LAXMIKANTH_8E_V6

   McGraw Hill 8th Edition
   Indian Polity
   92 chapters
   ============================================================ */

const NEXORA_LAXMIKANTH_8E_V6 = [
  "Historical Background",
  "Making of the Constitution",
  "Concept of Constitution",
  "Salient Features of the Constitution",
  "Preamble of the Constitution",
  "Union and its Territory",
  "Citizenship",
  "Fundamental Rights",
  "Directive Principles of State Policy",
  "Fundamental Duties",
  "Amendment of the Constitution",
  "Basic Structure of the Constitution",
  "Parliamentary System",
  "Federal System",
  "Centre–State Relations",
  "Inter-State Relations",
  "Emergency Provisions",
  "President",
  "Vice-President",
  "Prime Minister",
  "Central Council of Ministers",
  "Cabinet Committees",
  "Parliament",
  "Parliamentary Committees",
  "Parliamentary Group",
  "Supreme Court",
  "Judicial Review",
  "Judicial Activism",
  "Public Interest Litigation",
  "Governor",
  "Chief Minister",
  "State Council of Ministers",
  "State Legislature",
  "High Court",
  "Subordinate Courts",
  "Tribunals",
  "Panchayati Raj",
  "Municipalities",
  "Union Territories",
  "Scheduled and Tribal Areas",
  "Election Commission",
  "Union Public Service Commission",
  "State Public Service Commission",
  "Finance Commission",
  "Comptroller and Auditor General",
  "Attorney General of India",
  "Advocate General of the State",
  "Constitutional Bodies",
  "Non-Constitutional Bodies",
  "National Human Rights Commission",
  "National Commission for Women",
  "National Commission for Scheduled Castes",
  "National Commission for Scheduled Tribes",
  "National Commission for Backward Classes",
  "Central Information Commission",
  "Central Vigilance Commission",
  "Lokpal and Lokayuktas",
  "Co-operative Societies",
  "Official Language",
  "Public Services",
  "Rights and Liabilities of the Government",
  "Special Provisions Relating to Certain Classes",
  "Special Provisions for Some States",
  "Political Parties",
  "Role of Regional Parties",
  "Elections",
  "Election Laws",
  "Electoral Reforms",
  "Voting Behaviour",
  "Coalition Government",
  "Anti-Defection Law",
  "Pressure Groups",
  "National Integration",
  "Foreign Policy",
  "National Commission to Review the Working of the Constitution",
  "Landmark Judgements and their Impact",
  "Important Doctrines of Constitutional Interpretation",
  "World Constitutions"
];


/* ------------------------------------------------------------
   Convert string chapters into NEXORA chapter objects
   ------------------------------------------------------------ */

function nexoraMakeChapterObjects(bookId, chapters) {

  return chapters.map((title, index) => ({
    id: `${bookId}-chapter-${index + 1}`,
    number: index + 1,
    titleEn: title,
    title: title
  }));

}


/* ------------------------------------------------------------
   Find every Laxmikanth book and replace its chapters
   ------------------------------------------------------------ */

for (const classData of Object.values(NCERT_BOOKS)) {

  if (!classData || typeof classData !== "object") {
    continue;
  }

  for (const subjectData of Object.values(classData)) {

    if (!subjectData || typeof subjectData !== "object") {
      continue;
    }

    if (!Array.isArray(subjectData.books)) {
      continue;
    }

    for (const book of subjectData.books) {

      if (
        book &&
        book.author === "M. Laxmikanth" &&
        (
          book.titleEn === "Indian Polity" ||
          book.title === "Indian Polity"
        )
      ) {

        book.edition = "8th Edition";
        book.sourceType = "standard_reference";
        book.standardReference = true;
        book.chapterMappingVerified = true;
        book.chapters =
          nexoraMakeChapterObjects(
            book.id || "std-laxmikanth-indian-polity-8e",
            NEXORA_LAXMIKANTH_8E_V6
          );

      }

    }

  }

}


/* ------------------------------------------------------------
   Make standard-reference metadata explicit
   ------------------------------------------------------------ */

if (!NCERT_BOOKS.__nexoraCatalogue) {
  NCERT_BOOKS.__nexoraCatalogue = {};
}

NCERT_BOOKS.__nexoraCatalogue.standardBookRule =
  "Standard/reference books may be available across Classes 6-12; NCERT books remain class-specific.";

NCERT_BOOKS.__nexoraCatalogue.requireVerifiedChapters =
  true;

NCERT_BOOKS.__nexoraCatalogue.version =
  "6.0";




/* NEXORA_PHYSICS_CHAPTERS_FINAL_V11 */

const NEXORA_PHYSICS_11_CHAPTERS = [
    "Units and Measurements",
    "Motion in a Straight Line",
    "Motion in a Plane",
    "Laws of Motion",
    "Work, Energy and Power",
    "System of Particles and Rotational Motion",
    "Gravitation",
    "Mechanical Properties of Solids",
    "Mechanical Properties of Fluids",
    "Thermal Properties of Matter",
    "Thermodynamics",
    "Kinetic Theory",
    "Oscillations",
    "Waves"
];

const NEXORA_PHYSICS_12_CHAPTERS = [
    "Electric Charges and Fields",
    "Electrostatic Potential and Capacitance",
    "Current Electricity",
    "Moving Charges and Magnetism",
    "Magnetism and Matter",
    "Electromagnetic Induction",
    "Alternating Current",
    "Electromagnetic Waves",
    "Ray Optics and Optical Instruments",
    "Wave Optics",
    "Dual Nature of Radiation and Matter",
    "Atoms",
    "Nuclei",
    "Semiconductor Electronics: Materials, Devices and Simple Circuits"
];

function NEXORA_makeChapterObjects(bookId, chapters) {
    return chapters.map((title, index) => ({
        id: `${bookId}-chapter-${index + 1}`,
        title,
        titleEn: title,
        chapterNumber: index + 1
    }));
}

function NEXORA_setPhysicsChapters(classKey, chapters) {
    const classData = NCERT_BOOKS[classKey];
    if (!classData) return;

    const subjectData = classData.physics;
    if (!subjectData) return;

    if (Array.isArray(subjectData.books)) {
        for (const book of subjectData.books) {
            if (!book || typeof book !== "object") continue;

            const title = String(
                book.titleEn ||
                book.title ||
                book.name ||
                ""
            ).toLowerCase();

            if (
                title.includes("physics") ||
                book.id === `${classKey}-physics-ncert`
            ) {
                book.chapters =
                    NEXORA_makeChapterObjects(
                        book.id || `${classKey}-physics`,
                        chapters
                    );
            }
        }
    }

    // Direct subject entry itself can also be the NCERT book.
    const directTitle = String(
        subjectData.titleEn ||
        subjectData.title ||
        ""
    ).toLowerCase();

    if (
        directTitle.includes("physics") &&
        !Array.isArray(subjectData.chapters)
    ) {
        subjectData.chapters =
            NEXORA_makeChapterObjects(
                subjectData.id || `${classKey}-physics`,
                chapters
            );
    }
}

NEXORA_setPhysicsChapters(
    "class11",
    NEXORA_PHYSICS_11_CHAPTERS
);

NEXORA_setPhysicsChapters(
    "class12",
    NEXORA_PHYSICS_12_CHAPTERS
);




/* NEXORA_UNIVERSAL_STANDARD_CHAPTER_NORMALIZER_V17 */

function nexoraNormalizeChapterEntryV17(entry, index = 0) {
    if (entry == null) return null;

    if (typeof entry === "string" || typeof entry === "number") {
        const title = String(entry).trim();
        if (!title) return null;

        const match = title.match(/^(?:chapter|ch\\.?)[\\s._-]*(\\d+)\\s*[:.)-]?\\s*(.+)$/i);

        if (match) {
            return {
                number: Number(match[1]),
                titleEn: match[2].trim(),
                titleHi: "",
                key: match[2].trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "")
            };
        }

        return {
            number: index + 1,
            titleEn: title,
            titleHi: "",
            key: title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")
        };
    }

    if (typeof entry !== "object") return null;

    const titleEn =
        entry.titleEn ||
        entry.title ||
        entry.name ||
        entry.chapterTitle ||
        entry.chapterName ||
        entry.heading ||
        entry.label ||
        entry.text ||
        "";

    const titleHi =
        entry.titleHi ||
        entry.hindiTitle ||
        entry.nameHi ||
        entry.chapterTitleHi ||
        "";

    const number =
        entry.number ??
        entry.chapterNumber ??
        entry.no ??
        entry.chapterNo ??
        (index + 1);

    const key =
        entry.key ||
        entry.id ||
        entry.slug ||
        String(titleEn || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

    if (!String(titleEn).trim() && !String(titleHi).trim()) {
        return null;
    }

    return {
        ...entry,
        number,
        titleEn: String(titleEn || titleHi).trim(),
        titleHi: String(titleHi || "").trim(),
        key: String(key || titleEn || titleHi).trim()
    };
}

function nexoraExtractChapterArrayV17(book) {
    if (!book || typeof book !== "object") return [];

    const preferredFields = [
        "chapters",
        "chapterList",
        "chapterTitles",
        "contents",
        "toc",
        "tableOfContents",
        "units",
        "topics"
    ];

    for (const field of preferredFields) {
        const value = book[field];

        if (Array.isArray(value) && value.length) {
            const normalized = value
                .map((entry, index) => nexoraNormalizeChapterEntryV17(entry, index))
                .filter(Boolean);

            if (normalized.length) return normalized;
        }

        if (value && typeof value === "object" && !Array.isArray(value)) {
            const arr = Object.values(value);

            if (arr.length) {
                const normalized = arr
                    .map((entry, index) => nexoraNormalizeChapterEntryV17(entry, index))
                    .filter(Boolean);

                if (normalized.length) return normalized;
            }
        }
    }

    return [];
}

function nexoraChapterTextV17(chapter) {
    if (!chapter) return "";

    return [
        chapter.titleEn,
        chapter.title,
        chapter.name,
        chapter.chapterTitle,
        chapter.titleHi,
        chapter.key,
        chapter.id,
        chapter.slug,
        chapter.number
    ]
        .filter(v => v !== undefined && v !== null)
        .map(v => String(v).trim().toLowerCase())
        .join(" | ");
}

function nexoraFindChapterUniversalV17(book, identifier) {
    if (!book || identifier == null) return null;

    const chapters = nexoraExtractChapterArrayV17(book);

    if (!chapters.length) return null;

    const requested = String(identifier).trim().toLowerCase();

    const normalizedRequested = requested
        .replace(/^chapter[\\s._-]*/i, "")
        .replace(/\\s+/g, " ")
        .trim();

    return chapters.find(chapter => {
        const values = [
            chapter.number,
            chapter.titleEn,
            chapter.title,
            chapter.name,
            chapter.chapterTitle,
            chapter.titleHi,
            chapter.key,
            chapter.id,
            chapter.slug
        ]
            .filter(v => v !== undefined && v !== null)
            .map(v => String(v).trim().toLowerCase());

        return values.includes(requested) ||
               values.includes(normalizedRequested);
    }) || null;
}

function nexoraPopulateStandardBookChaptersV17() {
    try {
        if (
            typeof NEXORA_COMPLETE_CATALOGUE_V5 === "object" &&
            Array.isArray(NEXORA_COMPLETE_CATALOGUE_V5.standardBooks)
        ) {
            for (const book of NEXORA_COMPLETE_CATALOGUE_V5.standardBooks) {
                if (!book || typeof book !== "object") continue;

                const extracted = nexoraExtractChapterArrayV17(book);

                if (
                    Array.isArray(book.chapters) &&
                    book.chapters.length === 0 &&
                    extracted.length
                ) {
                    book.chapters = extracted;
                }
            }
        }
    } catch (error) {
        console.warn(
            "NEXORA standard chapter population warning:",
            error.message
        );
    }
}

nexoraPopulateStandardBookChaptersV17();

/* END NEXORA_UNIVERSAL_STANDARD_CHAPTER_NORMALIZER_V17 */


/* NEXORA_UNIVERSAL_CHAPTER_ENGINE_V21 */
(function(){
  function nxNorm(v){
    return String(v || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function nxChapter(v, i){
    if (typeof v === "string") {
      return {
        number: i + 1,
        titleEn: v,
        titleHi: v,
        id: "chapter-" + (i + 1),
        key: "chapter-" + (i + 1)
      };
    }
    if (v && typeof v === "object") {
      var title = v.titleEn || v.title || v.name || v.chapter || v.text || "";
      return Object.assign({}, v, {
        number: v.number || v.no || i + 1,
        titleEn: v.titleEn || title,
        titleHi: v.titleHi || v.titleHindi || title,
        id: v.id || v.key || "chapter-" + (i + 1),
        key: v.key || v.id || "chapter-" + (i + 1)
      });
    }
    return null;
  }

  function nxMakeChapters(source){
    if (!Array.isArray(source)) return [];
    return source.map(nxChapter).filter(Boolean);
  }

  function nxSource(key){
    if (typeof NEXORA_HISTORY_STANDARD_CHAPTERS_V3 !== "undefined" && NEXORA_HISTORY_STANDARD_CHAPTERS_V3[key]) {
      return NEXORA_HISTORY_STANDARD_CHAPTERS_V3[key];
    }
    if (typeof NEXORA_VERIFIED_STANDARD_CHAPTERS_V2 !== "undefined" && NEXORA_VERIFIED_STANDARD_CHAPTERS_V2[key]) {
      return NEXORA_VERIFIED_STANDARD_CHAPTERS_V2[key];
    }
    return null;
  }

  function nxBook(id, title){
    var list = (typeof NEXORA_COMPLETE_CATALOGUE_V5 !== "undefined" && Array.isArray(NEXORA_COMPLETE_CATALOGUE_V5.standardBooks))
      ? NEXORA_COMPLETE_CATALOGUE_V5.standardBooks
      : [];
    var a = nxNorm(id);
    var b = nxNorm(title);
    return list.find(function(x){
      return nxNorm(x.id) === a || (b && nxNorm(x.titleEn) === b);
    });
  }

  function nxAttach(book, source){
    if (!book || !Array.isArray(source) || !source.length) return false;
    if (!Array.isArray(book.chapters) || book.chapters.length === 0) {
      book.chapters = nxMakeChapters(source);
    }
    if (book.chapters.length) {
      book.chapterMappingVerified = true;
      return true;
    }
    return false;
  }

  var mappings = [
    ["std-rajiv-ahir-modern-india", "standard-rajiv-ahir-spectrum-modern-india"],
    ["std-bipan-chandra-modern-india", "standard-bipan-chandra-modern-india"],
    ["std-rs-sharma-ancient-india", "standard-rs-sharma-ancient-india"],
    ["std-satish-chandra-medieval-india", "standard-satish-chandra-medieval-india"],
    ["std-nitin-singhania-art-culture", "standard-nitin-singhania-art-culture"],
    ["std-laxmikanth-indian-polity", "standard-laxmikanth-indian-polity"],
    ["std-ramesh-singh-indian-economy", "standard-ramesh-singh-indian-economy"],
    ["std-shankar-ias-environment", "standard-shankar-ias-environment"],
    ["std-gc-leong-geography", "standard-gc-leong-geography"],
    ["std-dr-khullar-india-geography", "standard-dr-khullar-india-geography"]
  ];

  mappings.forEach(function(pair){
    var book = nxBook(pair[0], "");
    var source = nxSource(pair[1]);
    nxAttach(book, source);
  });

  var books = (typeof NEXORA_COMPLETE_CATALOGUE_V5 !== "undefined" && Array.isArray(NEXORA_COMPLETE_CATALOGUE_V5.standardBooks))
    ? NEXORA_COMPLETE_CATALOGUE_V5.standardBooks
    : [];

  books.forEach(function(book){
    if (!book || !book.id || (Array.isArray(book.chapters) && book.chapters.length)) return;

    var id = String(book.id);
    var candidates = [
      id,
      id.replace(/^std-/, "standard-"),
      id.replace(/^standard-/, "std-")
    ];

    for (var i = 0; i < candidates.length; i++) {
      var source = nxSource(candidates[i]);
      if (nxAttach(book, source)) return;
    }
  });

  console.log("NEXORA UNIVERSAL CHAPTER ENGINE V21: ACTIVE");
})();

module.exports = {
    NCERT_BOOKS,
    NEXORA_COMPLETE_CATALOGUE_V5,
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


/* NEXORA_UNIVERSAL_CATALOGUE_GUARD_V13 */
function nexoraUniversalCatalogueGuardV13(catalogue) {
  const out = {};

  if (!catalogue || typeof catalogue !== "object") return out;

  for (const [classKey, subjects] of Object.entries(catalogue)) {
    if (!subjects || typeof subjects !== "object") continue;

    out[classKey] = {};

    for (const [subjectKey, subjectData] of Object.entries(subjects)) {
      if (!subjectData || typeof subjectData !== "object") continue;

      const books = Array.isArray(subjectData.books)
        ? subjectData.books
        : [];

      const seenBooks = new Set();

      const cleanBooks = books.filter(book => {
        if (!book) return false;

        const title = String(
          book.title ||
          book.name ||
          book.book ||
          ""
        ).trim();

        if (!title) return false;

        const author = String(
          book.author ||
          book.writer ||
          ""
        ).trim();

        const key = (title + "|" + author)
          .toLowerCase()
          .replace(/\s+/g, " ");

        if (seenBooks.has(key)) return false;
        seenBooks.add(key);

        return true;
      });

      if (cleanBooks.length) {
        out[classKey][subjectKey] = {
          books: cleanBooks
        };
      }
    }
  }

  return out;
}



/* NEXORA_FINAL_UNIVERSAL_RESOLVER_V22 */

/*
 * NEXORA FINAL UNIVERSAL BOOK + CHAPTER RESOLVER
 *
 * Purpose:
 * - Resolve NCERT books
 * - Resolve standard/reference books
 * - Resolve generated catalogue books
 * - Resolve chapters by id/key/number/title
 * - Resolve Hindi/English chapter names
 * - Never depend on only one catalogue shape
 * - Preserve existing catalogue data
 */

function nexoraFinalTextV22(value) {
    return String(value == null ? '' : value)
        .replace(/<[^>]*>/g, ' ')
        .replace(/[“”"']/g, '')
        .replace(/[‐-‒–—−]/g, '-')
        .replace(/&amp;/gi, '&')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

function nexoraFinalSlugV22(value) {
    return nexoraFinalTextV22(value)
        .replace(/[^a-z0-9\u0900-\u097f]+/gi, '-')
        .replace(/^-+|-+$/g, '');
}

function nexoraFinalNumberV22(value) {
    if (value == null || value === '') return '';

    const m = String(value).match(/\d+/);
    return m ? String(Number(m[0])) : '';
}

function nexoraFinalChapterValuesV22(chapter) {
    if (chapter == null) return [];

    if (typeof chapter === 'string' || typeof chapter === 'number') {
        return [String(chapter)];
    }

    if (typeof chapter !== 'object') return [];

    const values = [
        chapter.id,
        chapter.key,
        chapter.chapterId,
        chapter.chapter_id,
        chapter.value,
        chapter.slug,
        chapter.number,
        chapter.no,
        chapter.chapterNo,
        chapter.chapterNumber,
        chapter.index,
        chapter.title,
        chapter.titleEn,
        chapter.titleHi,
        chapter.name,
        chapter.nameEn,
        chapter.nameHi,
        chapter.chapter,
        chapter.chapterTitle,
        chapter.chapterTitleEn,
        chapter.chapterTitleHi
    ];

    return values
        .filter(v => v !== undefined && v !== null && String(v).trim() !== '')
        .map(v => String(v));
}

function nexoraFinalChapterTitleV22(chapter) {
    if (chapter == null) return '';

    if (typeof chapter === 'string' || typeof chapter === 'number') {
        return String(chapter).trim();
    }

    if (typeof chapter !== 'object') return '';

    return String(
        chapter.titleEn ||
        chapter.title ||
        chapter.nameEn ||
        chapter.chapterTitleEn ||
        chapter.name ||
        chapter.chapterTitle ||
        chapter.titleHi ||
        chapter.nameHi ||
        chapter.chapterTitleHi ||
        chapter.chapter ||
        ''
    ).trim();
}

function nexoraFinalNormaliseChapterV22(chapter, index) {
    if (chapter == null) return null;

    if (typeof chapter === 'string' || typeof chapter === 'number') {
        const title = String(chapter).trim();

        if (!title) return null;

        return {
            id: nexoraFinalSlugV22(title) || String(index + 1),
            key: nexoraFinalSlugV22(title) || String(index + 1),
            number: index + 1,
            titleEn: title,
            title: title,
            name: title,
            original: chapter
        };
    }

    if (typeof chapter !== 'object') return null;

    const titleEn = String(
        chapter.titleEn ||
        chapter.title ||
        chapter.nameEn ||
        chapter.chapterTitleEn ||
        chapter.name ||
        chapter.chapterTitle ||
        chapter.titleHi ||
        chapter.nameHi ||
        chapter.chapterTitleHi ||
        chapter.chapter ||
        ''
    ).trim();

    const number =
        chapter.number ??
        chapter.no ??
        chapter.chapterNo ??
        chapter.chapterNumber ??
        chapter.index ??
        (index + 1);

    const id =
        chapter.id ||
        chapter.key ||
        chapter.chapterId ||
        chapter.chapter_id ||
        chapter.slug ||
        nexoraFinalSlugV22(titleEn) ||
        String(index + 1);

    return {
        ...chapter,
        id: String(id),
        key: String(chapter.key || id),
        number: number,
        titleEn: String(chapter.titleEn || titleEn),
        title: String(chapter.title || titleEn),
        name: String(chapter.name || titleEn)
    };
}

function nexoraFinalChapterArrayV22(book) {
    if (!book || typeof book !== 'object') return [];

    const candidates = [
        book.chapters,
        book.chapterList,
        book.chapterMapping,
        book.chapter_map,
        book.chapterData,
        book.chapter_data,
        book.contents,
        book.toc,
        book.tableOfContents,
        book.table_of_contents
    ];

    for (const candidate of candidates) {
        if (Array.isArray(candidate) && candidate.length) {
            return candidate
                .map((c, i) => nexoraFinalNormaliseChapterV22(c, i))
                .filter(Boolean);
        }

        if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
            const values = Object.values(candidate);

            if (values.length) {
                const result = values
                    .map((c, i) => nexoraFinalNormaliseChapterV22(c, i))
                    .filter(Boolean);

                if (result.length) return result;
            }
        }
    }

    return [];
}

function nexoraFinalFindBookInAnyCatalogueV22(bookId, classKey, subjectKey) {
    const wanted = nexoraFinalTextV22(bookId);
    if (!wanted) return null;

    const roots = [];

    if (typeof NEXORA_COMPLETE_CATALOGUE_V5 !== 'undefined') {
        roots.push(NEXORA_COMPLETE_CATALOGUE_V5);
    }

    if (typeof NEXORA_CATALOGUE_MANIFEST !== 'undefined') {
        roots.push(NEXORA_CATALOGUE_MANIFEST);
    }

    if (typeof NCERT_BOOKS !== 'undefined') {
        roots.push(NCERT_BOOKS);
    }

    function scan(value, depth) {
        if (!value || depth > 8) return null;

        if (Array.isArray(value)) {
            for (const item of value) {
                const found = scan(item, depth + 1);
                if (found) return found;
            }
            return null;
        }

        if (typeof value !== 'object') return null;

        const identifiers = [
            value.id,
            value.key,
            value.bookId,
            value.book_id,
            value.value,
            value.titleEn,
            value.title,
            value.name,
            value.titleHi
        ]
        .filter(Boolean)
        .map(nexoraFinalTextV22);

        if (identifiers.includes(wanted)) {
            return value;
        }

        const requestedTitle = nexoraFinalTextV22(
            String(bookId || '')
                .replace(/^std-/, '')
                .replace(/^standard-/, '')
                .replace(/-/g, ' ')
        );

        if (
            requestedTitle &&
            identifiers.some(x => x && (
                x === requestedTitle ||
                x.includes(requestedTitle) ||
                requestedTitle.includes(x)
            ))
        ) {
            return value;
        }

        for (const key of Object.keys(value)) {
            const child = value[key];

            if (
                classKey &&
                subjectKey &&
                (
                    nexoraFinalTextV22(key) === nexoraFinalTextV22(classKey) ||
                    nexoraFinalTextV22(key) === nexoraFinalTextV22(subjectKey)
                )
            ) {
                const found = scan(child, depth + 1);
                if (found) return found;
            }

            const found = scan(child, depth + 1);
            if (found) return found;
        }

        return null;
    }

    for (const root of roots) {
        const found = scan(root, 0);
        if (found) return found;
    }

    return null;
}

function nexoraFinalExternalChapterSourcesV22(book) {
    const result = [];

    if (!book) return result;

    const bookId = String(
        book.id ||
        book.key ||
        book.bookId ||
        ''
    );

    const title = nexoraFinalTextV22(
        book.titleEn ||
        book.title ||
        book.name ||
        ''
    );

    const id = nexoraFinalTextV22(bookId);

    /*
     * Existing verified standard chapter maps.
     */
    if (typeof NEXORA_HISTORY_STANDARD_CHAPTERS_V3 !== 'undefined') {
        const map = NEXORA_HISTORY_STANDARD_CHAPTERS_V3;

        for (const key of Object.keys(map || {})) {
            const nk = nexoraFinalTextV22(key);

            if (
                nk === id ||
                nk === nexoraFinalTextV22(book.key) ||
                nk === nexoraFinalTextV22(book.bookId)
            ) {
                if (Array.isArray(map[key])) {
                    result.push(...map[key]);
                }
            }
        }
    }

    if (typeof NEXORA_VERIFIED_STANDARD_CHAPTERS_V2 !== 'undefined') {
        const map = NEXORA_VERIFIED_STANDARD_CHAPTERS_V2;

        for (const key of Object.keys(map || {})) {
            const nk = nexoraFinalTextV22(key);

            if (
                nk === id ||
                nk === nexoraFinalTextV22(book.key) ||
                nk === nexoraFinalTextV22(book.bookId)
            ) {
                const value = map[key];

                if (Array.isArray(value)) {
                    result.push(...value);
                } else if (value && typeof value === 'object') {
                    if (Array.isArray(value.chapters)) {
                        result.push(...value.chapters);
                    }
                }
            }
        }
    }

    if (typeof NEXORA_NITIN_SINGHANIA_CHAPTERS_V4 !== 'undefined') {
        const map = NEXORA_NITIN_SINGHANIA_CHAPTERS_V4;

        for (const key of Object.keys(map || {})) {
            const nk = nexoraFinalTextV22(key);

            if (
                nk === id ||
                nk === nexoraFinalTextV22(book.key) ||
                nk === nexoraFinalTextV22(book.bookId)
            ) {
                if (Array.isArray(map[key])) {
                    result.push(...map[key]);
                }
            }
        }
    }

    /*
     * Also inspect any catalogue-level chapter map/index.
     */
    const possibleMaps = [
        typeof NEXORA_STANDARD_BOOK_INDEX !== 'undefined'
            ? NEXORA_STANDARD_BOOK_INDEX
            : null
    ];

    for (const map of possibleMaps) {
        if (!map || typeof map !== 'object') continue;

        for (const key of Object.keys(map)) {
            const nk = nexoraFinalTextV22(key);

            if (nk === id) {
                const indexedBook = map[key];

                const chapters = nexoraFinalChapterArrayV22(indexedBook);

                if (chapters.length) {
                    result.push(...chapters);
                }
            }
        }
    }

    return result;
}

function nexoraFinalPopulateBookV22(book) {
    if (!book || typeof book !== 'object') return book;

    let chapters = nexoraFinalChapterArrayV22(book);

    if (!chapters.length) {
        chapters = nexoraFinalExternalChapterSourcesV22(book)
            .map((c, i) => nexoraFinalNormaliseChapterV22(c, i))
            .filter(Boolean);
    }

    if (chapters.length) {
        book.chapters = chapters;

        if (!book.chapterMappingVerified) {
            book.chapterMappingVerified = true;
        }
    }

    return book;
}

function nexoraFinalFindChapterV22(book, requested) {
    if (!book) return null;

    nexoraFinalPopulateBookV22(book);

    const chapters = Array.isArray(book.chapters)
        ? book.chapters
        : [];

    if (!chapters.length) return null;

    const wanted = nexoraFinalTextV22(requested);
    const wantedSlug = nexoraFinalSlugV22(requested);
    const wantedNumber = nexoraFinalNumberV22(requested);

    for (const chapter of chapters) {
        const values = nexoraFinalChapterValuesV22(chapter);

        for (const value of values) {
            const normalized = nexoraFinalTextV22(value);
            const slug = nexoraFinalSlugV22(value);
            const number = nexoraFinalNumberV22(value);

            if (
                normalized === wanted ||
                slug === wantedSlug ||
                (wantedNumber && number === wantedNumber && (
                    nexoraFinalNumberV22(chapter.number) === wantedNumber
                ))
            ) {
                return chapter;
            }
        }
    }

    /*
     * Final title comparison.
     */
    for (const chapter of chapters) {
        const title = nexoraFinalTextV22(
            nexoraFinalChapterTitleV22(chapter)
        );

        if (
            title === wanted ||
            nexoraFinalSlugV22(title) === wantedSlug
        ) {
            return chapter;
        }
    }

    return null;
}

function nexoraFinalFindBookV22(options) {
    options = options || {};

    const bookId =
        options.bookId ||
        options.book ||
        options.bookKey ||
        options.book_id ||
        '';

    const classKey =
        options.classKey ||
        options.class ||
        options.className ||
        '';

    const subjectKey =
        options.subjectKey ||
        options.subject ||
        options.subjectName ||
        '';

    let found = null;

    if (
        typeof NEXORA_STANDARD_BOOK_INDEX !== 'undefined' &&
        NEXORA_STANDARD_BOOK_INDEX &&
        typeof NEXORA_STANDARD_BOOK_INDEX === 'object'
    ) {
        const directKeys = [
            bookId,
            String(bookId).replace(/^std-/, ''),
            String(bookId).replace(/^standard-/, '')
        ];

        for (const key of directKeys) {
            if (
                key &&
                NEXORA_STANDARD_BOOK_INDEX[key]
            ) {
                found = NEXORA_STANDARD_BOOK_INDEX[key];
                break;
            }
        }
    }

    if (!found) {
        found = nexoraFinalFindBookInAnyCatalogueV22(
            bookId,
            classKey,
            subjectKey
        );
    }

    if (found) {
        nexoraFinalPopulateBookV22(found);
    }

    return found;
}

function nexoraFinalResolveSelectionV22(options) {
    options = options || {};

    const requestedBook =
        options.bookId ||
        options.book ||
        options.bookKey ||
        options.book_id ||
        options.bookTitle ||
        '';

    const requestedChapter =
        options.chapterId ||
        options.chapter ||
        options.chapterKey ||
        options.chapter_id ||
        options.chapterTitle ||
        options.chapterName ||
        '';

    const book = nexoraFinalFindBookV22({
        ...options,
        bookId: requestedBook
    });

    if (!book) {
        return {
            ok: false,
            error: 'BOOK_NOT_FOUND',
            message: 'Selected book was not found.',
            book: null,
            chapter: null
        };
    }

    const chapter = nexoraFinalFindChapterV22(
        book,
        requestedChapter
    );

    if (!chapter) {
        return {
            ok: false,
            error: 'CHAPTER_NOT_FOUND',
            message: 'Selected chapter was not found.',
            book,
            chapter: null,
            availableChapters: Array.isArray(book.chapters)
                ? book.chapters
                : []
        };
    }

    return {
        ok: true,
        book,
        chapter,
        bookId: book.id || book.key || '',
        chapterId: chapter.id || chapter.key || '',
        chapterTitle:
            chapter.titleEn ||
            chapter.title ||
            chapter.name ||
            ''
    };
}

/*
 * Populate every standard book that is currently available.
 */
(function nexoraFinalPopulateAllBooksV22() {
    try {
        if (
            typeof NEXORA_COMPLETE_CATALOGUE_V5 !== 'undefined' &&
            Array.isArray(NEXORA_COMPLETE_CATALOGUE_V5.standardBooks)
        ) {
            for (const book of NEXORA_COMPLETE_CATALOGUE_V5.standardBooks) {
                nexoraFinalPopulateBookV22(book);
            }
        }

        if (
            typeof NEXORA_STANDARD_BOOK_INDEX !== 'undefined' &&
            NEXORA_STANDARD_BOOK_INDEX &&
            typeof NEXORA_STANDARD_BOOK_INDEX === 'object'
        ) {
            for (const key of Object.keys(NEXORA_STANDARD_BOOK_INDEX)) {
                nexoraFinalPopulateBookV22(
                    NEXORA_STANDARD_BOOK_INDEX[key]
                );
            }
        }
    } catch (err) {
        console.warn(
            'NEXORA V22 population warning:',
            err && err.message ? err.message : err
        );
    }
})();

/*
 * Public aliases used by future generator/server code.
 */
if (typeof globalThis !== 'undefined') {
    globalThis.nexoraFinalFindBookV22 = nexoraFinalFindBookV22;
    globalThis.nexoraFinalFindChapterV22 = nexoraFinalFindChapterV22;
    globalThis.nexoraFinalResolveSelectionV22 = nexoraFinalResolveSelectionV22;
    globalThis.nexoraFinalPopulateBookV22 = nexoraFinalPopulateBookV22;
}

/* END NEXORA_FINAL_UNIVERSAL_RESOLVER_V22 */




/* NEXORA_UNIVERSAL_ALL_EXAM_BOOK_CHAPTER_FINAL
   ------------------------------------------------------------
   Final universal resolver:
   - Existing official mappings always get priority.
   - Existing standard books always get priority.
   - Unknown exam/book/chapter combinations are resolved
     without blocking generation.
   - No fabricated official chapter list is claimed.
   ------------------------------------------------------------ */

function nexoraUniversalScalarFinal(v) {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number") {
        return String(v).trim();
    }
    if (Array.isArray(v)) {
        return v.map(nexoraUniversalScalarFinal).filter(Boolean).join(", ");
    }
    if (typeof v === "object") {
        return nexoraUniversalScalarFinal(
            v.titleEn ||
            v.title ||
            v.name ||
            v.bookTitle ||
            v.bookName ||
            v.chapterTitle ||
            v.en ||
            v.id ||
            ""
        );
    }
    return String(v).trim();
}

function nexoraUniversalSlugFinal(v) {
    return nexoraUniversalScalarFinal(v)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function nexoraUniversalBookFinal(input) {
    const value = nexoraUniversalScalarFinal(input);
    if (!value) return {
        id: "nexora-universal-book",
        titleEn: "General / Other Book",
        titleHi: "सामान्य / अन्य पुस्तक",
        name: "General / Other Book",
        chapters: []
    };

    const id = "nexora-universal-" + nexoraUniversalSlugFinal(value);

    return {
        id,
        titleEn: value,
        titleHi: value,
        name: value,
        bookTitle: value,
        bookName: value,
        chapters: []
    };
}

function nexoraUniversalChapterFinal(input, book) {
    let value = "";

    if (input && typeof input === "object") {
        value =
            input.titleEn ||
            input.title ||
            input.name ||
            input.chapterTitle ||
            input.en ||
            input.topic ||
            "";
    } else {
        value = input;
    }

    value = nexoraUniversalScalarFinal(value);

    if (!value) {
        value = "Selected Chapter / Topic";
    }

    const number =
        input && typeof input === "object"
            ? nexoraUniversalScalarFinal(
                input.number ||
                input.chapterNumber ||
                ""
              )
            : "";

    return {
        id:
            (book && book.id
                ? book.id
                : "nexora-universal-book") +
            "-chapter-" +
            nexoraUniversalSlugFinal(value),

        key:
            (book && book.id
                ? book.id
                : "nexora-universal-book") +
            "-chapter-" +
            nexoraUniversalSlugFinal(value),

        number,
        titleEn: value,
        titleHi: value,
        title: value,
        name: value,
        en: value,
        hi: value
    };
}

function nexoraUniversalResolveFinal(options = {}) {
    const className = nexoraUniversalScalarFinal(
        options.className ||
        options.class ||
        options.classLevel ||
        options.level ||
        ""
    );

    const subject = nexoraUniversalScalarFinal(
        options.subject || ""
    );

    const bookInput =
        options.book ||
        options.bookTitle ||
        options.bookName ||
        options.course ||
        options.bookId ||
        "";

    const chapterInput =
        options.chapter ||
        options.chapterTitle ||
        options.chapterName ||
        options.topic ||
        options.chapterId ||
        "";

    let book = null;
    let chapter = null;

    /* Existing universal V24 resolver gets first priority. */
    try {
        if (
            typeof nexoraV24ResolveSelection === "function"
        ) {
            const existing =
                nexoraV24ResolveSelection(options);

            if (
                existing &&
                existing.book &&
                existing.chapter
            ) {
                return existing;
            }
        }
    } catch (_) {}

    /* Existing normal resolver gets second priority. */
    try {
        if (
            typeof resolveNotesSelection === "function"
        ) {
            const existing =
                resolveNotesSelection(options);

            if (
                existing &&
                existing.book &&
                existing.chapter
            ) {
                return existing;
            }
        }
    } catch (_) {}

    /* Existing book lookup. */
    try {
        if (typeof getBook === "function") {
            book = getBook(
                className,
                subject,
                nexoraUniversalScalarFinal(bookInput)
            );
        }
    } catch (_) {}

    if (!book) {
        book = nexoraUniversalBookFinal(bookInput);
    }

    /* Existing chapter lookup. */
    try {
        if (
            typeof findChapter === "function" &&
            book
        ) {
            chapter = findChapter(
                book,
                nexoraUniversalScalarFinal(chapterInput)
            );
        }
    } catch (_) {}

    if (!chapter) {
        chapter =
            nexoraUniversalChapterFinal(
                chapterInput,
                book
            );
    }

    return {
        ok: true,
        className,
        subject,
        book,
        chapter,
        universalFallback: true
    };
}

global.nexoraUniversalResolveFinal =
    nexoraUniversalResolveFinal;

console.log(
    "NEXORA UNIVERSAL ALL-EXAM BOOK CHAPTER FINAL: ACTIVE"
);

