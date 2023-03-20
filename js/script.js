const question       = document.querySelector('#question');
const answersBox      = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters        = ['a', 'b', 'c', 'd'];
let points           = 0;
let actualQuestion   = 0;

// Questions
const questions = [
    {
        "question": "What is the biggest country in the world?",
        "answers": [
            {
                "answer": "United States",
                "correct": false
            },
            {
                "answer": "China",
                "correct": false
            },
            {
                "answer": "Russia",
                "correct": true
            },
            {
                "answer": "Canada",
                "correct": false
            },
        ]
    },
    {
        "question": "Who was the only person in history to receive a Nobel Prize in different scientific fields?",
        "answers": [
            {
                "answer": "Albert Einstein",
                "correct": false
            },
            {
                "answer": "Linus Pauling",
                "correct": false
            },
            {
                "answer": "Stephen Hawking",
                "correct": false
            },
            {
                "answer": "Marie Curie",
                "correct": true
            },
        ]
    },
    {
        "question": "Who was the first woman to travel into space?",
        "answers": [
            {
                "answer": "Valentina Tereshkova",
                "correct": true
            },
            {
                "answer": "Svetlana Savitskaya",
                "correct": false
            },
            {
                "answer": "Kathryn D. Sullivan",
                "correct": false
            },
            {
                "answer": "Sally Ride",
                "correct": false
            },
        ]
    },
    {
        "question": "How many pairs of ribs does a human normally have?",
        "answers": [
            {
                "answer": "10",
                "correct": false
            },
            {
                "answer": "12",
                "correct": true
            },
            {
                "answer": "8",
                "correct": false
            },
            {
                "answer": "15",
                "correct": false
            },
        ]
    },
]

// Quiz substitution for the first question
function init() {
    createQuestion(0);
}

function createQuestion(i) {
 const oldButtons = answersBox.querySelectorAll('button');

 oldButtons.forEach(function(btn) {
    btn.remove();
 });

 // Change question text
 const questionText = question.querySelector('#question-text');
 const questionNumber = question.querySelector('#question-number');

 questionText.textContent = questions[i].question;
 questionNumber.textContent = i + 1;

// insert the answers
 questions[i].answers.forEach(function(answer, i) {
    // create the button template
   const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
   const letterBtn = answerTemplate.querySelector(".btn-letter");
   const answerText = answerTemplate.querySelector(".question-answer");

   letterBtn.textContent = letters[i];
   answerText.textContent = answer['answer']

   answerTemplate.setAttribute('correct-answer', answer['correct']);

   // remove hide and template class
   answerTemplate.classList.remove('hide');
   answerTemplate.classList.remove('answer-template');

   // insert the question on screen
   answersBox.appendChild(answerTemplate);
   
   // insert button click event
   answerTemplate.addEventListener("click", function() {
    checkAnswer(this);
   });

 });

 // add question number
 actualQuestion++;
}

// user answer verif
function checkAnswer(btn) {
 const buttons = answersBox.querySelectorAll("button");

 buttons.forEach(function(button) {
    if(button.getAttribute("correct-answer") === "true") {
     button.classList.add("correct-answer");
     if(btn === button) {
        points++
     }
    } else {
     button.classList.add("wrong-answer");
    }
 });

 // show next question
 nextQuestion();

}

function nextQuestion() {
  setTimeout(function() {
   if(actualQuestion >= questions.length) {
    showFinalResult();
    return;
   }

   createQuestion(actualQuestion);
  }, 1000)  
}

// show final screen
function showFinalResult() {
hideQuiz();

// change success screen datas

// calculate score
const score = ((points / questions.length) * 100).toFixed(2);
const displayScore = document.querySelector("#display-score span");

displayScore.textContent = score.toString();

//change correct answers number
const correctAnswers = document.querySelector("#correct-answer");

correctAnswers.textContent = points;

// change total of questions

const totalQuestions = document.querySelector("#questions-qty");
totalQuestions.textContent = questions.length;

const scoreMessage = document.querySelector("#score-message");
if(score == 100) {
    scoreMessage.textContent = "PERFECT!";
} else if(score < 100 && score >= 75) {
    scoreMessage.textContent = "Well done!";
} else if(score < 75 && score >= 50) {
    scoreMessage.textContent = "Good!"
} else {
    scoreMessage.textContent = "You could do better!"
}


}

function hideQuiz() {
    scoreContainer.classList.toggle('hide');
    quizzContainer.classList.toggle('hide');
};

// restart
const restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", function(){
    actualQuestion = 0;
    points = 0;
    hideQuiz();
    init();
})

init();
