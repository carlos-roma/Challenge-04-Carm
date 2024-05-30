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

    function startTimer() {
        timer.textContent = `Time: ${timeLeft}`; // Initialize the timer display
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
        // Log the question text
        console.log("Question:", question.question);
        
        // Display the question text
        questionElement.textContent = question.question;
        
        // Iterate over each answer button
        answerButtons.forEach(button => {
            // Get the choice (data-choice attribute) for this button
            const choice = button.getAttribute("data-choice");
            
            // Get the answer text for this choice
            const answerText = question.answers[choice];
            
            // Display the answer text on the button
            button.textContent = answerText;
            
            // Attach a click event listener to the button
            button.onclick = () => {
                // Check if the clicked choice is the correct answer
                if (choice === question.correctAnswer) {
                    // If correct, show an alert with "Correct!"
                    alert("Correct!");
                    score++;  // Increment the score
                    timeLeft += 10;  // Add 10 seconds to the timer
                } else {
                    // If incorrect, show an alert with "Wrong!"
                    alert("Wrong!");
                    timeLeft -= 10;  // Subtract 10 seconds from the timer
                }
                
                // Move to the next question
                currentQuestionIndex++;
                
                // If there are more questions, show the next question
                if (currentQuestionIndex < quiz.questions.length) {
                    showQuestion(quiz.questions[currentQuestionIndex]);
                } else {
                    // If no more questions, end the quiz
                    endQuiz();
                }
            };
        });
    }
    
    function startQuiz() {
        console.log("Starting quiz...");
        startBtn.style.display = "none";
        quizContainer.style.display = "block"; // Show the quiz container
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
        // Additional end quiz logic like displaying score can be added here
    }

// Function to save the score
function saveScore(username, score, timeLeft) {
    // Get existing high scores from local storage or create an empty array if none exist
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Create a new score object
    var newScore = {
        username: username,
        score: score,
        time: timeLeft
    };

    // Add the new score to the high scores array
    highScores.push(newScore);

    // Save the updated high scores array back to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Function to display high scores
function displayHighScores() {
    // Get existing high scores from local storage or create an empty array if none exist
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Clear the scores list
    scoresList.innerHTML = "";

    // Loop through each high score and create a list item for it
    highScores.forEach(function(scoreEntry) {
        var listItem = document.createElement("li");
        listItem.textContent = scoreEntry.username + ": " + scoreEntry.score + " (Time: " + scoreEntry.time + "s)";
        scoresList.appendChild(listItem);
    });

    // Show the high scores section
    highScoresSection.style.display = "block";

    // Hide the quiz card
    document.querySelector(".card").style.display = "none";
}

// Function to hide high scores
function hideHighScores() {
    // Hide the high scores section
    highScoresSection.style.display = "none";

    // Show the quiz card
    document.querySelector(".card").style.display = "block";
}

// Event listener to start the quiz when the start button is clicked
startBtn.addEventListener("click", startQuiz);

// Event listener to display high scores when the "View High Scores" button is clicked
viewScoresBtn.addEventListener("click", displayHighScores);

// Event listener to hide high scores and go back to the quiz when the back button is clicked
backButton.addEventListener("click", hideHighScores);


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
