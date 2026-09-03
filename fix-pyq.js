const fs = require("fs");

const p = "search.js";
let s = fs.readFileSync(p, "utf8");

const old = `            // =========================
            // NCERT CONNECTION
            // =========================`;

const add = `            // =========================
            // ANSWER
            // =========================

            const answerBox =
                document.createElement("div");

            answerBox.style.marginTop = "16px";
            answerBox.style.padding = "12px";
            answerBox.style.borderRadius = "10px";
            answerBox.style.background = "#f5f7fa";

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
                q.answer || "Answer not available yet.";

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

                explanationText.textContent =
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
            =========================`;

if (s.indexOf(old) === -1) {
    throw new Error("Insertion point not found");
}

s = s.replace(old, add);

fs.writeFileSync(p, s);

console.log(
    "NEXORA: PYQ answer + explanation display added successfully."
);
