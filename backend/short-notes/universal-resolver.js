"use strict";

/*
 * NEXORA UNIVERSAL RESOLVER V2
 *
 * Single source of truth:
 *   manifest.js
 *
 * Important:
 *   A subject entry itself can be an official book AND can contain
 *   nested reference books in .books.
 *
 * Previous resolver incorrectly selected only .books and therefore
 * skipped the parent official book.
 */

const manifest = require("./manifest.js");

const NCERT_BOOKS = manifest.NCERT_BOOKS || {};
const COMPLETE =
  manifest.NEXORA_COMPLETE_CATALOGUE_V5 || {};

const slug = value =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const norm = value =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[–—−]/g, "-")
    .replace(/\s+/g, " ");

const classLabel = cls => {
  const s = String(cls || "").trim();
  if (/^class\d+$/i.test(s)) return s.replace(/^class/i, "Class ");
  return s;
};

function chapterTitle(ch) {
  if (typeof ch === "string") return ch.trim();

  if (!ch || typeof ch !== "object") return "";

  return String(
    ch.titleEn ||
    ch.title ||
    ch.name ||
    ch.label ||
    ch.chapter ||
    ch.heading ||
    ""
  ).trim();
}

function getChapterArray(book) {
  if (!book || typeof book !== "object") return [];

  const candidates = [
    book.chapters,
    book.chapterList,
    book.chapter_list,
    book.chapterTitles,
    book.chapter_titles,
    book.contents,
    book.tableOfContents,
    book.table_of_contents
  ];

  for (const value of candidates) {
    if (Array.isArray(value)) {
      const out = value
        .map(chapterTitle)
        .filter(Boolean);

      if (out.length) return out;
    }
  }

  return [];
}

function bookTitle(book, subject) {
  return String(
    book?.titleEn ||
    book?.title ||
    book?.name ||
    book?.bookTitle ||
    book?.book ||
    subject ||
    ""
  ).trim();
}

function bookHindiTitle(book, subject) {
  return String(
    book?.titleHi ||
    book?.hi ||
    book?.hindiTitle ||
    bookTitle(book, subject)
  ).trim();
}

function bookId(book, subject, cls) {
  return String(
    book?.id ||
    book?.key ||
    book?.slug ||
    `${slug(cls)}-${slug(subject)}-${slug(bookTitle(book, subject))}`
  ).trim();
}

function makeBook(book, cls, subject, kind) {
  if (!book || typeof book !== "object") return null;

  const title = bookTitle(book, subject);
  if (!title) return null;

  const chapters = getChapterArray(book);

  return {
    id: bookId(book, subject, cls),
    title,
    titleEn: title,
    titleHi: bookHindiTitle(book, subject),
    author: String(
      book.author ||
      book.authors ||
      book.writer ||
      ""
    ).trim(),
    class: cls,
    classLabel: classLabel(cls),
    subject,
    chapters,
    chapterCount: chapters.length,
    source: "manifest.js",
    kind: kind || "book",
    official:
      kind === "official" ||
      kind === "ncert" ||
      Boolean(book.official)
  };
}

/*
 * Collect BOTH:
 *   1. parent object itself
 *   2. nested .books
 *
 * This is the critical fix.
 */
function collectBooksFromSubject(cls, subject, data, out) {
  if (!data || typeof data !== "object") return;

  const parentTitle = bookTitle(data, subject);

  /*
   * If the parent has a real title and/or chapters, retain it.
   * This captures official NCERT books that also contain .books
   * reference-book arrays.
   */
  if (
    parentTitle &&
    (
      getChapterArray(data).length ||
      data.official === true ||
      data.isOfficial === true ||
      data.source === "NCERT" ||
      data.publisher === "NCERT" ||
      String(data.author || "").toLowerCase() === "ncert"
    )
  ) {
    const b = makeBook(
      data,
      cls,
      subject,
      data.official || data.isOfficial ? "official" : "ncert"
    );

    if (b) out.push(b);
  }

  /*
   * Nested books are retained as separate reference books.
   */
  if (Array.isArray(data.books)) {
    for (const child of data.books) {
      const b = makeBook(child, cls, subject, "reference");
      if (b) out.push(b);
    }
  }
}

function dedupeBooks(books) {
  const map = new Map();

  for (const b of books) {
    if (!b) continue;

    const key = [
      norm(b.class),
      norm(b.subject),
      norm(b.title)
    ].join("|");

    const existing = map.get(key);

    if (!existing) {
      map.set(key, b);
      continue;
    }

    /*
     * Prefer the version containing chapters.
     */
    if (
      b.chapterCount > existing.chapterCount ||
      (
        b.official &&
        !existing.official
      )
    ) {
      map.set(key, b);
    }
  }

  return [...map.values()];
}

function buildCatalogue() {
  const books = [];

  /*
   * Primary manifest structure.
   */
  for (const [cls, subjects] of Object.entries(NCERT_BOOKS)) {
    if (!/^class\d+$/i.test(cls)) continue;
    if (!subjects || typeof subjects !== "object") continue;

    for (const [subject, data] of Object.entries(subjects)) {
      if (!data || typeof data !== "object") continue;

      /*
       * Normal subject object.
       */
      collectBooksFromSubject(
        cls,
        subject,
        data,
        books
      );
    }
  }

  /*
   * Some manifest versions keep additional catalogue objects
   * under NEXORA_COMPLETE_CATALOGUE_V5.
   *
   * Add only genuine book objects with chapters, without
   * allowing them to overwrite better manifest entries.
   */
  function walk(value, contextClass, contextSubject, depth) {
    if (depth > 8 || !value || typeof value !== "object") return;

    if (Array.isArray(value)) {
      for (const item of value) {
        walk(item, contextClass, contextSubject, depth + 1);
      }
      return;
    }

    const cls =
      value.class ||
      value.className ||
      contextClass ||
      "";

    const subject =
      value.subject ||
      value.subjectName ||
      contextSubject ||
      "";

    const chapters = getChapterArray(value);
    const title = bookTitle(value, subject);

    if (
      title &&
      chapters.length &&
      (
        value.id ||
        value.key ||
        value.titleEn ||
        value.title ||
        value.name
      )
    ) {
      const b = makeBook(
        value,
        cls || "Other",
        subject || "Other",
        value.official ? "official" : "book"
      );

      if (b) books.push(b);
    }

    for (const [key, child] of Object.entries(value)) {
      if (
        key === "books" ||
        key === "chapters" ||
        key === "chapterList" ||
        key === "chapter_list" ||
        key === "contents" ||
        key === "tableOfContents" ||
        key === "table_of_contents"
      ) {
        continue;
      }

      let nextClass = cls;
      let nextSubject = subject;

      if (/^class\d+$/i.test(key)) nextClass = key;
      if (
        !/^class\d+$/i.test(key) &&
        key !== "standardBooks" &&
        key !== "ncertBooks" &&
        key !== "__nexoraCatalogue"
      ) {
        nextSubject = nextSubject || key;
      }

      walk(child, nextClass, nextSubject, depth + 1);
    }
  }

  walk(COMPLETE, "", "", 0);

  return dedupeBooks(books);
}

const BOOKS = buildCatalogue();

function findBook(query = {}) {
  const cls = norm(query.class);
  const subject = norm(query.subject);
  const id = norm(query.book || query.bookId);
  const title = norm(
    query.bookTitle ||
    query.title
  );

  let candidates = BOOKS;

  if (cls) {
    candidates = candidates.filter(
      b =>
        norm(b.class) === cls ||
        norm(b.classLabel) === cls
    );
  }

  if (subject) {
    candidates = candidates.filter(
      b => norm(b.subject) === subject
    );
  }

  if (id) {
    const exact = candidates.find(
      b => norm(b.id) === id
    );
    if (exact) return exact;
  }

  if (title) {
    const exact = candidates.find(
      b => norm(b.title) === title ||
      norm(b.titleEn) === title
    );
    if (exact) return exact;

    const partial = candidates.find(
      b =>
        norm(b.title).includes(title) ||
        title.includes(norm(b.title))
    );
    if (partial) return partial;
  }

  return candidates[0] || null;
}

function getBooks(query = {}) {
  const cls = norm(query.class);
  const subject = norm(query.subject);

  return BOOKS.filter(b => {
    if (
      cls &&
      norm(b.class) !== cls &&
      norm(b.classLabel) !== cls
    ) {
      return false;
    }

    if (
      subject &&
      norm(b.subject) !== subject
    ) {
      return false;
    }

    return true;
  });
}

function getChapters(query = {}) {
  const book = findBook(query);

  if (!book) {
    return {
      success: false,
      chapters: [],
      reason: "BOOK_NOT_FOUND"
    };
  }

  return {
    success: true,
    book,
    chapters: book.chapters.map((title, i) => ({
      value: slug(title),
      label: title,
      title,
      number: i + 1
    }))
  };
}

function getClasses() {
  return [
    ...new Set(
      BOOKS
        .map(b => b.class)
        .filter(Boolean)
    )
  ].sort((a, b) => {
    const na = Number(String(a).replace(/\D/g, ""));
    const nb = Number(String(b).replace(/\D/g, ""));
    return na - nb;
  });
}

function getSubjects(cls) {
  return [
    ...new Set(
      getBooks({ class: cls })
        .map(b => b.subject)
        .filter(Boolean)
    )
  ].sort();
}

function getExams() {
  return [
    "UPSC",
    "SSC",
    "JEE",
    "NEET",
    "College",
    "School",
    "Other"
  ];
}

function getLanguages() {
  return [
    "English",
    "Hindi",
    "Hinglish",
    "Bengali",
    "Tamil",
    "Telugu",
    "Marathi",
    "Gujarati",
    "Kannada",
    "Malayalam",
    "Punjabi",
    "Urdu",
    "Other"
  ];
}

module.exports = {
  BOOKS,
  getBooks,
  getChapters,
  findBook,
  getClasses,
  getSubjects,
  getExams,
  getLanguages,
  slug
};
