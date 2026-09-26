# NEXORA Universal Authentic PYQ Engine

Rules:
- Only verified PYQs are accepted.
- Every PYQ requires a source URL with `verified: true`.
- AI must never invent a PYQ.
- Missing years are reported instead of being filled with generated questions.
- One engine supports every exam and subject.
- Verified datasets can later be reused to generate PDFs quickly.

Question schema:

{
  "exam": "UPSC",
  "subject": "Geography",
  "year": 2024,
  "questionNumber": 1,
  "question": "...",
  "options": [],
  "answer": "...",
  "explanation": "...",
  "source": {
    "url": "...",
    "title": "...",
    "verified": true
  }
}
