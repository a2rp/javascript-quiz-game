const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const quizInterface = readline.createInterface({ input, output });
const questions = [
    {
        prompt: "Which keyword declares a binding that cannot be reassigned?",
        choices: ["A. let", "B. var", "C. const", "D. static"],
        answer: "C",
    },
    {
        prompt: "What does Array.prototype.map() return?",
        choices: [
            "A. The first matching element",
            "B. A new array of transformed values",
            "C. The original array, sorted",
            "D. A single combined value",
        ],
        answer: "B",
    },
    {
        prompt: "What does the strict equality operator (===) compare?",
        choices: [
            "A. Value only, after type conversion",
            "B. Type only",
            "C. Value and type without coercion",
            "D. Whether both values are objects",
        ],
        answer: "C",
    },
    {
        prompt: "What happens to the promise returned by Promise.all() if an input rejects?",
        choices: [
            "A. It fulfills with the remaining values",
            "B. It rejects with that rejection reason",
            "C. It waits forever",
            "D. It retries the failed promise",
        ],
        answer: "B",
    },
];

const askForAnswer = async () => {
    let answer = "";
    do {
        answer = (await quizInterface.question("Choose A, B, C, or D: "))
            .trim()
            .toUpperCase();
        if (!["A", "B", "C", "D"].includes(answer)) {
            console.log("Please enter one letter: A, B, C, or D.");
        }
    } while (!["A", "B", "C", "D"].includes(answer));
    return answer;
};

const runQuiz = async () => {
    let correctCount = 0;

    try {
        for (const [index, question] of questions.entries()) {
            console.log(`\n${index + 1}. ${question.prompt}`);
            question.choices.forEach((choice) => console.log(choice));

            const answer = await askForAnswer();
            if (answer === question.answer) {
                correctCount += 1;
                console.log("Correct!");
            } else {
                const correctChoice = question.choices.find((choice) => choice.startsWith(`${question.answer}.`));
                console.log(`Not quite. The correct answer is ${correctChoice}`);
            }
        }

        const percentage = Math.round((correctCount / questions.length) * 100);
        console.log(`\nFinal score: ${correctCount}/${questions.length} (${percentage}%)`);
    } finally {
        quizInterface.close();
    }
};

runQuiz().catch((error) => {
    console.error("The quiz could not finish:", error.message);
    process.exitCode = 1;
});
