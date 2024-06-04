document.addEventListener("DOMContentLoaded", function() {
    var timer = document.querySelector(".timer");
    var startBtn = document.querySelector(".button");
    var quizContainer = document.getElementById("quiz");
    var questionElement = document.getElementById("question");
    var answerButtons = document.querySelectorAll(".answer");
    var currentQuestionIndex = 0;
    var timeLeft = 60;
    var timerInterval;
    var score = 0;
    var usernameInput = document.getElementById("username");
    var viewScoresBtn = document.getElementById("view-scores");
    var highScoresSection = document.getElementById("high-scores");
    var scoresList = document.getElementById("scores-list");
    var backButton = document.getElementById("back-button");
    var clearScoresButton = document.getElementById("clear-scores-button");

    function startTimer() {
        timer.textContent = `Time: ${timeLeft}`;
        timerInterval = setInterval(function() {
            timeLeft--;
            timer.textContent = `Time: ${timeLeft}`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timer.textContent = "Time's up!";
                endQuiz();
            }
        }, 1000);
    }

    function showQuestion(question) {
        console.log("Question:", question.question);
        questionElement.textContent = question.question;
        answerButtons.forEach(button => {
            const choice = button.getAttribute("data-choice");
            const answerText = question.answers[choice];
            button.textContent = answerText;
            button.onclick = () => {
                if (choice === question.correctAnswer) {
                    alert("Correct!");
                    score++;
                    timeLeft += 10;
                } else {
                    alert("Wrong!");
                    timeLeft -= 10;
                }
                currentQuestionIndex++;
                if (currentQuestionIndex < quiz.questions.length) {
                    showQuestion(quiz.questions[currentQuestionIndex]);
                } else {
                    endQuiz();
                }
            };
        });
    }
    
    function startQuiz() {
        console.log("Starting quiz...");
        startBtn.style.display = "none";
        quizContainer.style.display = "block";
        currentQuestionIndex = 0;
        timeLeft = 60;
        score = 0;
        startTimer();
        showQuestion(quiz.questions[currentQuestionIndex]);
    }

    function endQuiz() {
        console.log("Ending quiz...");
        clearInterval(timerInterval);
        var username = usernameInput.value.trim();
        if (username) {
            saveScore(username, score, timeLeft);
        }
        quizContainer.innerHTML = `<p>Quiz over! Thanks for playing.</p><p>Your score is ${score}</p>`;
    }

    function saveScore(username, score, timeLeft) {
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        var newScore = { username: username, score: score, time: timeLeft };
        highScores.push(newScore);
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }

    function displayHighScores() {
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        scoresList.innerHTML = "";
        highScores.forEach(function(scoreEntry) {
            var listItem = document.createElement("li");
            listItem.textContent = scoreEntry.username + ": " + scoreEntry.score + " (Time: " + scoreEntry.time + "s)";
            scoresList.appendChild(listItem);
        });
        highScoresSection.style.display = "block";
        document.querySelector(".card").style.display = "none";
    }

    function hideHighScores() {
        highScoresSection.style.display = "none";
        document.querySelector(".card").style.display = "block";
    }

    function clearScores() {
        localStorage.removeItem("highScores");
        scoresList.innerHTML = "";
    }

    startBtn.addEventListener("click", startQuiz);
    viewScoresBtn.addEventListener("click", displayHighScores);
    backButton.addEventListener("click", hideHighScores);
    clearScoresButton.addEventListener("click", clearScores);

    const quiz = {
        questions: [
            {
                question: "What does CPU stand for?",
                answers: {
                    a: "Central Processing Unit",
                    b: "Central Programming Unit",
                    c: "Computer Personal Unit",
                    d: "Central Print Unit"
                },
                correctAnswer: "a"
            },
            {
                question: "Which of the following is a programming language?",
                answers: {
                    a: "HTML",
                    b: "HTTP",
                    c: "FTP",
                    d: "JSON"
                },
                correctAnswer: "a"
            },
            {
                question: "What does HTML stand for?",
                answers: {
                    a: "HyperText Markup Language",
                    b: "HyperText Markdown Language",
                    c: "HighText Markup Language",
                    d: "HyperTool Markup Language"
                },
                correctAnswer: "a"
            },
            {
                question: "Which CSS property is used to change the text color of an element?",
                answers: {
                    a: "font-color",
                    b: "text-color",
                    c: "color",
                    d: "background-color"
                },
                correctAnswer: "c"
            },
            {
                question: "What does 'HTTP' stand for?",
                answers: {
                    a: "HyperText Transfer Protocol",
                    b: "HyperText Transmission Process",
                    c: "Hyperlink Transfer Protocol",
                    d: "Hyperlink Text Protocol"
                },
                correctAnswer: "a"
            },
            {
                question: "Which HTML tag is used to create a hyperlink?",
                answers: {
                    a: "<link>",
                    b: "<a>",
                    c: "<href>",
                    d: "<hyperlink>"
                },
                correctAnswer: "b"
            },
            {
                question: "What does CSS stand for?",
                answers: {
                    a: "Computer Style Sheets",
                    b: "Cascading Style Sheets",
                    c: "Creative Style Sheets",
                    d: "Compact Style Sheets"
                },
                correctAnswer: "b"
            },
            {
                question: "Which of the following is a JavaScript framework?",
                answers: {
                    a: "Laravel",
                    b: "React",
                    c: "Django",
                    d: "Flask"
                },
                correctAnswer: "b"
            }
        ]
    };
});
