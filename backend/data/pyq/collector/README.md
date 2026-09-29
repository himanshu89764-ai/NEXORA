# NEXORA Authentic PYQ Collector

## HARD RULES

1. Official/source-backed PYQ only.
2. AI-generated PYQ is NEVER accepted.
3. `verified: true` is mandatory before import.
4. Original question text must be preserved.
5. Year must be present.
6. Exam and subject must be present.
7. Source URL must be present.
8. Duplicate questions are rejected.
9. Missing years are reported, never fabricated.
10. Answers/explanations may be stored separately from the original PYQ.

## 30-Year Example

UPSC CSE + Geography + 1995-2024

The collector must report:
- available years
- missing years
- total authentic questions
- duplicate count
- verification status

It must NEVER create questions to make the count reach 30 years.

## Source priority

1. Official examination authority
2. Official examination archive
3. Other source only when explicitly verified and retained with source metadata
