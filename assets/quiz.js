//code for quiz
const rate = document.querySelector("#rate");
const highScoreLink = document.querySelector("#highScoreLink");
const timer = document.querySelector("#timer");
const introSect = document.querySelector("#intro");
const startBtn = document.querySelector("#start");
const questionSelect = document.querySelector("#questionSelect");
const gameOver = document.querySelector("#gameOver");
const submitBtn = document.querySelector("#submitBtn");
const highScorePage = document.querySelector("#highScorePage");
const highScores = document.querySelector("#highScores");
const mainBtn = document.querySelector("#main");
const clearBtn = document.querySelector("#clear");

const questions = [
    {
        prompt: "Do you go to church?",
        optionA: "Yes",
        optionB: "No",
        answer: "A",
    },
{
    prompt: "Do you behave kindly with others?",
    optionA: "Yes",
    optionB: "No",
    answer: "A",
},
{
    prompt: "Do you do charity?",
    optionA: "Yes",
    optionB: "No",
    answer: "A",
},
{
    prompt: " Do you repent for your sins?",
    optionA: "Yes",
    optionB: "No",
    answer: "A",
},
{
    prompt: "Do you manipulate people?",
    optionA: "No, I am a straight forward person",
    optionB: "Yes, people exist to serve me",
    answer: "A",
},
];

const lastQuestion = questions.length - 1;
let currentQuestion = 0;
let secondsLeft = 60;
let score = 0;
let interval;

function hide(y) {
    y.style.display = "none";
  }

  function show(z) {
    z.style.display = "block";
  }

  startBtn.addEventListener("click", function () {
    hide(introSect);
    show(questionSelect);
    getQuestions();
    countdown();
    timer.textContent = "Timer: " + secondsLeft + " second(s)";
  });

  function countdown() {
    show(timer);
    interval = setInterval(function () {
      secondsLeft--;
      timer.textContent = "Timer: " + secondsLeft + " second(s)";
      if (secondsLeft <= 0) {
        stopTimer();
        finalizeQuiz();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(interval);
    hide(timer);
  }

  function getQuestions() {
    const questionPrompt = document.querySelector("#question");
    const optionA = document.querySelector("#A");
    const optionB = document.querySelector("#B");
  
    questionPrompt.textContent = questions[currentQuestion].prompt;
    optionA.textContent = questions[currentQuestion].optionA;
    optionB.textContent = questions[currentQuestion].optionB;
  }

  function validateAnswer(x) {
    show(rate);
    if (x == questions[currentQuestion].answer) {
      score++;
      rate.textContent = "Nice!";
    } else {
      secondsLeft = secondsLeft - 0;
      rate.textContent = "Shame!";
    }
    if (currentQuestion < lastQuestion) {
      currentQuestion++;
      getQuestions();
    } else {
      stopTimer();
      finishQuiz();
    }
  }

  function finishQuiz() {
    hide(timer);
    hide(questionSelect);
    show(gameOver);
    const showScore = document.querySelector("#score");
    showScore.textContent = "Your final score is " + score + ".";
  }

  function renderHighScores() {
    //Gets scores array from local storage
    const allScores = JSON.parse(localStorage.getItem("scores")) || [];
    allScores.sort((a, b) => b.score - a.score);
    for (let i = 0; i < allScores.length; i++) {
      const savedScores = document.createElement("p");
      savedScores.textContent =
        i +
        1 +
        ". " +
        allScores[i].user +
        " - " +
        allScores[i].score +
        " point(s)";
      highScores.appendChild(savedScores);
    }
  }

  submitBtn.addEventListener("click",  function () {
    let initials = document.querySelector("#initials").value;
    if (initials === "") {
        alert("Enter your initials");
  } else {
    hide(highScoreLink);
    hide(rate);
    hide(gameOver);
    show(highScorePage);
    const newPlayer = {
        user: initials,
        score,
      };

      const allScores = JSON.parse(localStorage.getItem("scores")) || [];

      allScores.push(newPlayer);

      localStorage.setItem("scores", JSON.stringify(allScores));
    renderHighScores();
  }
});

highScoreLink.addEventListener("click", function () {
    show(highScorePage);
    hide(introSect);
    hide(highScoreLink);
    hide(questionSelect);
    hide(gameOver);
    hide(rate);
    hide(timer);
    stopTimer();
    renderHighScores();
  });

  mainBtn.addEventListener("click", function () {
    reset();
    show(introSect);
    show(highScoreLink);
    hide(highScorePage);
    initials.value = "";
  });

  clearBtn.addEventListener("click", function () {
    removeChild();
    localStorage.removeItem("scores");
  });

  function reset() {
    score = 0;
    currentQuestion = 0;
    secondsLeft = 60;
    removeChild();
  }

  function removeChild() {
    const parent = document.querySelector("#highScores");
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }