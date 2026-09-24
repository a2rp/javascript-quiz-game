const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const quizInterface = readline.createInterface({ input, output });
const questions = [];
const options = [];
const answers = [];

questions.push("What does CPU stand for?");
options.push(["A. Computer Processing Unit", "B. Central Processing Unit", "C. Computer Processing User", "D. Central Processing User"]);
answers.push("B");

questions.push("What is the full form of RAM?");
    options.push(["A. Random Access Memory", "B. Read Access Memory", "C. Random Authorization Memory", "D. Read Authorization Memory"]);
answers.push("A");

questions.push("Which device is used to input data into a computer?");
    options.push(["A. Monitor", "B. Printer", "C. Keyboard", "D. Speaker"]);
answers.push("C");

questions.push("Which component of a computer is responsible for storing data permanently?");
    options.push(["A. RAM", "B. CPU", "C. Hard Disk", "D. CD-ROM"]);
answers.push("C");

const runQuiz = async () => {
    let countCorrect = 0;

    for (let i = 0; i < questions.length; ++i) {
        console.log("\n", questions[i], "\n", options[i]);
        const result = (await quizInterface.question("Write the option letter [A, B, C or D]: ")).trim().toUpperCase();
        console.log("Your answer: ", result);
        console.log("Correct answer: ", answers[i]);
        if (result === answers[i]) {
            ++countCorrect;
        }
    }

    const percentage = Math.round((countCorrect / questions.length) * 100);
    console.log("\n\nYour score: ", percentage + "%");
    quizInterface.close();
};

runQuiz();

