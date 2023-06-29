var timerEl = document.querySelector("#timer");
var viewHighscoresEl = document.querySelector("#viewhighscores");
var introEl = document.querySelector("#intro");
var highscoresEl = document.querySelector("#highscores");
var completeEl = document.querySelector("#complete");
var submitEl = document.querySelector("#submit-highscore");
var inputEl = document.querySelector("#input-initials");
var scoreEl = document.querySelector("#score");
var startEl = document.querySelector("#start-button");
var restartEl = document.querySelector("#restart-button");
var clearEl = document.querySelector("#clear-button")
var questionsEl = document.querySelector("#questions");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelectorAll(".answer-button");
var answerEl = [document.querySelector("#answer1"), document.querySelector("#answer2"), document.querySelector("#answer3"), document.querySelector("#answer4")];
var answerResultEl = document.querySelector("#answer-result");
var highscoreListEl = document.querySelector("#highscore-list");
var currentQuestion = 0;
var score = 0;
var timerInterval;
var textTimerInterval;
var questionData = [
	{questionText:""},
	{answerText: ""},
	{correctAnswer: ""},
	{placeholder1: ""},
	{placeholder2: ""},
	{placeholder3: ""},
	{placeholder4: ""},
	{placeholder5: ""},
	{placeholder6: ""},
	{placeholder7: ""}]

//storing question information
questionData[0].questionText = "Which of the following can be stored within arrays";
questionData[0].answerText = ["Boolean", "String", "Number", 'All of the above'];
questionData[0].correctAnswer = 4;
questionData[1].questionText = "Which symbols can be placed around text to turn it into a string";
questionData[1].answerText = ["'", '"', "All of the above", "None of the above"];
questionData[1].correctAnswer = 3;
questionData[2].questionText = "what is the largest number that can be stored in javaScript";
questionData[2].answerText = ["1.7976931348623158e+308", "15", "4294967296", "99999999999999999999"];
questionData[2].correctAnswer = 1;
questionData[3].questionText = "Which of these is not a semantic element in html";
questionData[3].answerText = ["<div>", "<footer>", "<aside>", "<nav>"];
questionData[3].correctAnswer = 1;
questionData[4].questionText = "What does HTML stand for";
questionData[4].answerText = ["Hyper Technology Message Latency", "Hash Token Memory Language", "Hyper Text Markup Language", "Hash Text Message Language"];
questionData[4].correctAnswer = 3;
questionData[5].questionText = "What does CSS stand for";
questionData[5].answerText = ["Cascading Style Sheets", "Compiled Style Sets", "Cell Sorted Strings", "Client Side Stacks"];
questionData[5].correctAnswer = 1;
questionData[6].questionText = "Javascript coments start with //";
questionData[6].answerText = ["True", "False"];
questionData[6].correctAnswer = 1;
questionData[7].questionText = "Which tag is used to create a numbered list";
questionData[7].answerText = ["<ul>", "<nl>", "<list>", "<ol>"];
questionData[7].correctAnswer = 4;
questionData[8].questionText = "Which event triggers  9 when the user clicks an HTML element";
questionData[8].answerText = ["onmouseclick", "click", "onclick", "mouseselect"];
questionData[8].correctAnswer = 3;
questionData[9].questionText = "How many questions have you answered so far";
questionData[9].answerText = ["11", "9", "8", "7"];
questionData[9].correctAnswer = 2;  

//activates the timer with a specified time
function setTimer(time) {
	var time;
	timerEl.style.visibility = "visible";
	timerEl.textContent = time;
	timerInterval = setInterval(function() {
		time--;
		timerEl.textContent = time;
		if(time === 0) {
			clearInterval(timerInterval);
			timerEl.style.visibility = "hidden";
			answerResultEl.style.visibility = "Visible";
			answerResultEl.textContent = "Times Up";
			answerResultEl.style.color = "red";
			clearInterval(textTimerInterval);
			textTimerInterval = setInterval(function() {
				answerResultEl.style.visibility = "Hidden";
				clearInterval(textTimerInterval);
			}, 1500);
			endQuiz();
		}	
}, 1000);
}

//Shuffles the order in which the answers are listed for all the questions, avoids shuffling "All of the above" and "None of the above"
function shuffleAnswerOrder(){
for (i1=0; i1<questionData.length; i1++){
	var shuffleCount = 0
	for (i2=0; i2<questionData[i1].answerText.length; i2++){
		if(questionData[i1].answerText[i2] !== "None of the above" && questionData[i1].answerText[i2] !== "All of the above")
		shuffleCount++
	}
	for (i2=0; i2<shuffleCount; i2++){
		var random = Math.floor(Math.random()*shuffleCount)
		var temp = questionData[i1].answerText[i2]
		questionData[i1].answerText[i2] = questionData[i1].answerText[random]
		questionData[i1].answerText[random] = temp
		if(questionData[i1].correctAnswer-1 === i2){
			questionData[i1].correctAnswer = random+1;
		}
		else if(questionData[i1].correctAnswer-1 === random){
			questionData[i1].correctAnswer = i2+1;
		}
	}
}
}

//Ends the quiz
function endQuiz() {
	currentQuestion = 0;
	timerEl.style.visibility = "Hidden";
	questionsEl.style.visibility = "Hidden";
	answerEl[0].style.visibility = "Hidden";
	answerEl[1].style.visibility = "Hidden";
	answerEl[2].style.visibility = "Hidden";
	answerEl[3].style.visibility = "Hidden";
	inputEl.value = "";
	completeEl.style.visibility = "Visible";
	scoreEl.textContent = "You scored " + score + " points";
	clearInterval(timerInterval);
}

//sets the question answers to those of the current question
function setQuestionText(questionNumber) {
	var questionNumber
	questionEl.textContent = questionData[questionNumber].questionText;
	for(i=0; i<4; i++) {
		if(questionData[questionNumber].answerText[i] !== undefined){
			answerEl[i].style.visibility = "Visible";
			answerEl[i].textContent = questionData[questionNumber].answerText[i];
		}
		else{
			answerEl[i].style.visibility = "Hidden";
		}
	}
}

//displays if the answer was correct or incorrect
function showResult(isCorrect) {
	answerResultEl.style.visibility = "Visible";
	var isCorrect
	if (isCorrect === true) {
		answerResultEl.textContent = "Correct";
		answerResultEl.style.color = "green";
	}
	else{
		answerResultEl.textContent = "Incorrect";
		answerResultEl.style.color = "red";
	}
	clearInterval(textTimerInterval);
	textTimerInterval = setInterval(function() {
		answerResultEl.style.visibility = "Hidden";
		clearInterval(textTimerInterval);
	}, 1500);
}

//starts the quiz
startEl.addEventListener("click", function() {
	highscoresEl.style.visibility = "hidden";
	introEl.style.visibility = "hidden";
	highscoresEl.style.visibility = "hidden";
	viewHighscoresEl.style.visibility = "hidden";
	score = 0;
	setTimer(60);
	shuffleAnswerOrder();
	setQuestionText(currentQuestion);
	questionsEl.style.visibility = "visible";

})

//submits score
submitEl.addEventListener("click", function() {
	if (inputEl.value != ""){
		var highscore = {
		initials:inputEl.value ,
		score:score ,
	}
	localStorage.setItem("score" + String(localStorage.length), JSON.stringify(highscore));
	completeEl.style.visibility = "hidden";
	generateHighscores();
	highscoresEl.style.visibility = "Visible";
	}
	else{
		clearInterval(textTimerInterval);
		answerResultEl.style.visibility = "Visible";
		answerResultEl.textContent = "Enter a name";
		answerResultEl.style.color = "red";
		textTimerInterval = setInterval(function() {
			answerResultEl.style.visibility = "Hidden";
			clearInterval(textTimerInterval);
		}, 1500);
	}
})

//populates the list of highscores with the top 10 scores
function generateHighscores(){
	highscoreListEl.replaceChildren();
	var highscores = [];
	for (i=0; i<localStorage.length; i++) {
		highscores.push(JSON.parse(localStorage.getItem("score" + String(i))))
	}
	highscores.sort((a, b) => (a.score < b.score) ? 1 : -1);
	for (i=0; i<highscores.length; i++) {
		if (i<10) {
		var listItem = document.createElement("li");
		listItem.textContent = highscores[i].initials + ":	" + highscores[i].score;
		highscoreListEl.appendChild(listItem);
		}
	}
}

//takes the user to the highscore page
viewHighscoresEl.addEventListener("click", function() {
	introEl.style.visibility = "hidden";
	generateHighscores();
	highscoresEl.style.visibility = "Visible";
	viewHighscoresEl.style.visibility = "hidden";
})

//returns to the first page
restartEl.addEventListener("click", function() {
	highscoresEl.style.visibility = "Hidden";
	viewHighscoresEl.style.visibility = "Visible";
	introEl.style.visibility = "Visible";
	score = 0
})

//check if the picked answer is correct, move to next question
answersEl.forEach(answerEl => {
	answerEl.addEventListener("click", function() {
		if(answerEl === document.getElementById("answer"+questionData[currentQuestion].correctAnswer)) {
			showResult(true);
			score++;
			currentQuestion++;
		}
		else {
			showResult(false);
			currentQuestion++;
			}	

		if (currentQuestion<questionData.length) {
			setQuestionText(currentQuestion);
		}	
		else {
			endQuiz();
		}
		})
})

//erases all highscores from local storage
clearEl.addEventListener("click", function() {
	localStorage.clear();
	highscoreListEl.replaceChildren();
})