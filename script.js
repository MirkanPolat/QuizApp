let currentQuestion = 0; // wir starten bei 0
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio("sound/success.mp3");
let AUDIO_FAIL = new Audio("sound/badChoice.mp3");

function init() {
  document.getElementById("all-questions").innerHTML = questions.length; // ladet die fragenlänge rein
  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressBar();
    showNextQuestion();
  }
}

function gameIsOver(){
  return currentQuestion >= questions.length;
}

function answer(selection) {
  // answer ist auf onclick und die selection werden alle answers übergeben mit parameter
  let question = questions[currentQuestion]; // hier tun wir die questions auf 0
  let selectedQuestionNumber = selection.slice(-1); // nehmen uns den letzten buchstaben in die variable
  let idOfRIghtAnswer = `answer_${question["right_answer"]}`; // wir nehmen uns den i von der richtigen antwort

  if (rightAnswerSelected(selectedQuestionNumber,question)) {
    // wenn die letzte zahl true ist mit der right answer dann true
    document
      .getElementById(selection)
      .parentElement.classList.add("bg-success");
    AUDIO_SUCCESS.play();
    rightQuestions++;
  } else {
    document.getElementById(selection).parentElement.classList.add("bg-danger");
    document
      .getElementById(idOfRIghtAnswer)
      .parentElement.classList.add("bg-success"); // hier übergeben wir dem right container die class
    AUDIO_FAIL.play();
  }

  document.getElementById("next-button").disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber,question){
  return selectedQuestionNumber == question["right_answer"];
}

function nextQuestion() {
  currentQuestion++; // ändert den i von 0 auf 1

  document.getElementById("next-button").disabled = true; // ändert den button wieder aus di

  resetAnswerButton(); // resetet alle css farben
  showQuestion(); // spielt neue fragen ab
}

function resetAnswerButton() {
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
}

function restartGame() {
  document.getElementById("header-image").src = "./img/pencil.jpg";
  document.getElementById("questionBody").style = ""; // wieder anzeigen lassen
  document.getElementById("endScreen").style = "display: none"; // endscreen ausblenden

  rightQuestions = 0;
  currentQuestion = 0;

  init();
}

function showEndScreen() {
  document.getElementById("endScreen").style = "";
  document.getElementById("questionBody").style = "display: none";
  document.getElementById("amount-Of-Questions").innerHTML = questions.length;
  document.getElementById("amount-Of-right-Questions").innerHTML = rightQuestions;
  document.getElementById("header-image").src = "./img/win.jpg";
}

function updateProgressBar(){
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById("progress-bar").innerHTML = `${percent}%`;
    document.getElementById("progress-bar").style = `width:${percent}%`;
}

function showNextQuestion(){
    updateProgressBar();
    let question = questions[currentQuestion]; // ruft den index von unserem json auf
    document.getElementById("first-question").innerHTML = currentQuestion + 1; // zeigt i von der frage an
    document.getElementById("questiontext").innerHTML = question["question"]; // wir tun in den frage Teil die "question" von unserem json rein
    document.getElementById("answer_1").innerHTML = question["answer_1"]; // alle anderen genauso nur mit dem anwers
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];
}