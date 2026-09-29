const fs = require("fs");

const file = "backend/data/pyq/geography.json";
const data = JSON.parse(fs.readFileSync(file, "utf8"));

const answers = {
    "geo-prelims-2024-001": {
        answer: "Statement 1 only.",
        explanation:
            "Water vapour is a gas whose amount generally decreases with altitude because most atmospheric water vapour is concentrated in the lower atmosphere. Its percentage is not maximum at the poles; water vapour is generally much higher in warm tropical regions and much lower in cold polar regions."
    },

    "geo-prelims-2024-002": {
        answer:
            "Statement-I is incorrect, but Statement-II is correct.",
        explanation:
            "The atmosphere is heated mainly by terrestrial radiation emitted by the Earth's surface after it absorbs incoming solar radiation. Incoming solar radiation passes through the atmosphere relatively easily, whereas the atmosphere absorbs a significant part of the outgoing long-wave terrestrial radiation. Carbon dioxide and other greenhouse gases are good absorbers of long-wave radiation. Therefore, Statement-I is incorrect and Statement-II is correct."
    }
};

data.questions.forEach(q => {
    if (answers[q.id]) {
        q.answer = answers[q.id].answer;
        q.explanation = answers[q.id].explanation;
    }
});

fs.writeFileSync(
    file,
    JSON.stringify(data, null, 2) + "\n"
);

console.log("NEXORA: Geography PYQ answers updated successfully.");
