// Questions

const questions = [

    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Mark Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },

    {
        question: "Which language is used for styling a webpage?",
        options: [
            "HTML",
            "CSS",
            "Python",
            "C++"
        ],
        answer: 1
    },

    {
        question: "Which language is used to add functionality to a webpage?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        answer: 2
    },

    {
        question: "Which data structure follows LIFO?",
        options: [
            "Queue",
            "Stack",
            "Array",
            "Tree"
        ],
        answer: 1
    },

    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: [
            "var",
            "int",
            "string",
            "define"
        ],
        answer: 0
    },

    {
        question: "Which language is mainly used for data analysis?",
        options: [
            "Python",
            "HTML",
            "CSS",
            "XML"
        ],
        answer: 0
    },

    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Computer Processing User"
        ],
        answer: 0
    },

    {
        question: "Which one is a programming language?",
        options: [
            "Google",
            "Python",
            "Windows",
            "Chrome"
        ],
        answer: 1
    },

    {
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            "//",
            "##",
            "<!-- -->",
            "**"
        ],
        answer: 0
    },

    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheet",
            "Cascading Style Sheets",
            "Creative Style System",
            "Colorful Style Sheet"
        ],
        answer: 1
    }

];


// Current question

let currentQuestion = 0;


// User answers

let userAnswers = [];


// Score

let score = 0;


// Login function

function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "" || password === "") {

        alert("Please enter username and password");

        return;
    }

    document.getElementById("loginPage").classList.add("hidden");

    document.getElementById("quizPage").classList.remove("hidden");

    document.getElementById("welcome").innerText =
        "Welcome, " + username;

    showQuestion(0);
}


// Show question

function showQuestion(index) {

    currentQuestion = index;

    let q = questions[index];

    document.getElementById("questionNumber").innerText =
        "Question " + (index + 1) + " of " + questions.length;

    document.getElementById("question").innerText =
        q.question;


    let optionsHTML = "";

    for (let i = 0; i < q.options.length; i++) {

        let className = "option";

        // If user has already answered

        if (userAnswers[index] !== undefined) {

            if (i === q.answer) {

                className += " correct";

            }

            if (i === userAnswers[index] && i !== q.answer) {

                className += " wrong";

            }

        }

        optionsHTML += `
            <div 
                class="${className}"
                onclick="selectAnswer(${i})">

                <input 
                    type="radio"
                    name="answer"
                    ${userAnswers[index] === i ? "checked" : ""}>

                ${q.options[i]}

            </div>
        `;
    }

    document.getElementById("options").innerHTML = optionsHTML;
}


// Select answer

function selectAnswer(optionIndex) {

    // Prevent changing answer

    if (userAnswers[currentQuestion] !== undefined) {

        return;
    }

    userAnswers[currentQuestion] = optionIndex;

    showQuestion(currentQuestion);
}


// Previous question

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion(currentQuestion);

    }

}


// Next question

function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion(currentQuestion);

    }

}


// Submit quiz

function submitQuiz() {

    let unanswered = 0;

    for (let i = 0; i < questions.length; i++) {

        if (userAnswers[i] === undefined) {

            unanswered++;

        }

    }

    if (unanswered > 0) {

        let confirmSubmit = confirm(
            "You have " + unanswered +
            " unanswered question(s). Submit anyway?"
        );

        if (!confirmSubmit) {

            return;

        }

    }

    calculateResult();

}


// Calculate result

function calculateResult() {

    score = 0;

    for (let i = 0; i < questions.length; i++) {

        if (userAnswers[i] === questions[i].answer) {

            score++;

        }

    }

    let percentage =
        (score / questions.length) * 100;


    document.getElementById("quizPage")
        .classList.add("hidden");

    document.getElementById("resultPage")
        .classList.remove("hidden");


    document.getElementById("result").innerText =
        "Your Score: " + score + " / " + questions.length;


    document.getElementById("percentage").innerText =
        "Percentage: " + percentage + "%";
}


// View answers

function viewAnswers() {

    let review = "";

    for (let i = 0; i < questions.length; i++) {

        let q = questions[i];

        let userAnswer = userAnswers[i];

        review += `
            <div class="review">

                <h3>
                    ${i + 1}. ${q.question}
                </h3>

                <p>
                    Correct Answer:
                    <span class="review-correct">
                        ${q.options[q.answer]}
                    </span>
                </p>
        `;


        if (userAnswer !== undefined) {

            if (userAnswer === q.answer) {

                review += `
                    <p class="review-correct">
                        Your Answer: ${q.options[userAnswer]} ✓
                    </p>
                `;

            } else {

                review += `
                    <p class="review-wrong">
                        Your Answer: ${q.options[userAnswer]} ✗
                    </p>
                `;

            }

        } else {

            review += `
                <p class="review-wrong">
                    Not Attempted
                </p>
            `;

        }


        review += `</div>`;
    }


    document.getElementById("answerReview").innerHTML =
        review;
}


// Restart quiz

function restartQuiz() {

    currentQuestion = 0;

    userAnswers = [];

    score = 0;

    document.getElementById("answerReview").innerHTML = "";

    document.getElementById("resultPage")
        .classList.add("hidden");

    document.getElementById("quizPage")
        .classList.remove("hidden");

    showQuestion(0);
}