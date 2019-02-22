//if we click on the start/reset button
//if we are playing
	//reload page
//if we are not playing
	//set score to zero
	//show countdown box
	//reduce time by 1 sec in loops
		//is there any time left?
			//yes -> continue
			//no -> game over
	//change button to reset
	//generate new question and answers

//if we click on answer box
	//if we are playing
		//is answer correct?
			//yes
				//increase sccore by 1
				//show correct box for 1 sec
				//generate new question and answers
			//no
				//show try again box for 1 sec


var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;

//if we click on the start/reset button
document.getElementById("startReset").onclick = function() {
	//if we are playing
	if (playing == true) {
		//reload our page
		location.reload();
		//if we are not playing
	} else {
		//change mode to playing
		playing = true;

		//set score to zero
		score = 0;

		document.getElementById("scoreValue").innerHTML = score;

		//show countdown box
		show("timeRemaining");
		timeRemaining = 60;
		document.getElementById("timeRemainingValue").innerHTML = timeRemaining;

		//hide game over box
		hide("gameOver");

		//change button to reset
		document.getElementById("startReset").innerHTML = "Reset Game";

		//start countdown
		startCountdown();

		//generate new question and answers
		generateQA();
	}
};

//clicking on an answer box
for(i = 1; i < 5; i++) {
	document.getElementById("box" + i).onclick = function() {
		//check if we are playing
		//if yes
		if(playing == true) {
			if(this.innerHTML == correctAnswer) {
				//correct answer
				
				//increase score by 1
				score++;
				document.getElementById("scoreValue").innerHTML = score;
				//hide wrong box and show correct
				hide("wrong");
				show("correct");
				setTimeout(function() {
					hide("correct");
				}, 1000);
	
				//generate new question and answers
				generateQA();
			}else{
				//wrong answer
				hide("correct");
				show("wrong");
				setTimeout(function() {
					hide("wrong");
				}, 1000);
	
	
			}
		}
	}
}
//if we click on answer box
//if we are playing
//is answer correct?
//yes
//increase sccore by 1
//show correct box for 1 sec
//generate new question and answers
//no
//show try again box for 1 sec

//functions

//start counter
function startCountdown() {
	action = setInterval(function() {
		timeRemaining -= 1;

		document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
		if (timeRemaining == 0) {
			//game over
			stopCountdown();

			show("gameOver");

			document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>Your score is " + score + ".</p>";

			hide("timeRemaining");
			hide("correct");
			hide("wrong");
			playing = false;
			document.getElementById("startReset").innerHTML = "Start Game";
		}
	}, 1000);
}

//stop counter
function stopCountdown() {
	clearInterval(action);
}

//hide an element
function hide(Id) {
	document.getElementById(Id).style.display = "none";
}

//show element
function show(Id) {
	document.getElementById(Id).style.display = "block";
}

//generate new question and answers
function generateQA() {
	var x = 1 + Math.round(9 * Math.random());
	var y = 1 + Math.round(9 * Math.random());
	correctAnswer = x * y;
	document.getElementById("question").innerHTML = x + "x" + y;
	var correctPosition = 1 + Math.round(3 * Math.random());
	// fill one box with the correct answer
	document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
	//fill other boxes with wrong answers

	var answers = [ correctAnswer ];

	for (i = 1; i < 5; i++) {
		if (i != correctPosition) {
			var wrongAnswer;
			do {
				wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random())); //a wrong answer
			} while (answers.indexOf(wrongAnswer) > -1);
			document.getElementById("box" + i).innerHTML = wrongAnswer;
			answers.push(wrongAnswer);
		}
	}
}
