const questions = [
    {
        question: "Which is the largest desert in the world?", 
        answers: [
            { text: "Kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: true},
            { text: "Antarctica", correct: false},
        ]
    },
    {
        question: "Which is the most successful football club in the world?", 
        answers: [
            { text: "Bayern Munich", correct: false},
            { text: "Inter Milan", correct: false},
            { text: "Manchester United", correct: false},
            { text: "Real Madrid", correct: true},
        ]
    },
    {
        question: "Which of these footballers haven't won ballond'or?", 
        answers: [
            { text: "Kaka", correct: false},
            { text: "Robert Lewandowski", correct: true},
            { text: "Luis Suarez", correct: false},
            { text: "Ronaldinho", correct: false},
        ]
    },
    {
        question: "Netaji Subhash Chandra Bose was born in which city?", 
        answers: [
            { text: "Cuttack", correct: true},
            { text: "Bhubaneswar", correct: false},
            { text: "Kolkata", correct: false},
            { text: "Varansi", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?", 
        answers: [
            { text: "New Zealand", correct: false},
            { text: "Luxembourg", correct: false},
            { text: "Moldova", correct: false},
            { text: "Vatican City", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions [currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
}}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){ button.classList.add("correct"); }
    button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.
    length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();




