/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let player0Name = `Player 1`;
let Player1Name = `Player 2`;
let winScore = 100;
let score = [0, 0];
let roundScore = 0;
let activePlayer = 0;
let lastRoll = 0;
let dice = 0;


initialise = () => {
	score = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	lastRoll = 0;
	dice = 0;
	document.querySelector(`#name-0`).innerHTML = `Player 1`; 
	document.querySelector(`#name-1`).innerHTML = `Player 2`;
	document.getElementById(`score-0`).textContent = `0`;
	document.getElementById(`score-1`).textContent = `0`;
	document.getElementById(`current-0`).textContent = `0`;
	document.getElementById(`current-1`).textContent = `0`;
	document.querySelector(`.dice`).style.display = `none`;
	document.querySelector(`.player-0-panel`).classList.add(`active`);
	document.querySelector(`.player-0-panel`).classList.remove(`winner`);
	document.querySelector(`.player-1-panel`).classList.remove(`winner`);

	// MY POIST-GAME FIX PT 1
	document.querySelector(`.btn-hold`).style.display = `block`;
	document.querySelector(`.btn-roll`).style.display = `block`;


	
	
	player1Name = prompt(`Enter First Player's Name`, ``);
	
	if (player1Name === null || player1Name === ``) {
		document.querySelector(`#name-0`).textContent = `Player 1`;
	}else{
		document.querySelector(`#name-0`).textContent = player1Name;

	};


	player2Name = prompt(`Enter Second Player's Name`, ``);
	
	if (player2Name === null || player2Name === ``) {
		document.querySelector(`#name-1`).textContent = `Player 2`;
	}else{
		document.querySelector(`#name-1`).textContent = player2Name;

	};


	winScore = prompt(`Enter Win Score`, 100);
	
	if (winScore === null || winScore === ``) {
		winScore = 100;};
	};



initialise();

const switchPlayer = () => {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	document.querySelector(`.player-0-panel`).classList.toggle(`active`);
	document.querySelector(`.player-1-panel`).classList.toggle(`active`);
	document.querySelector(`.dice`).style.display = `none`;
	dice = 0;
	lastRoll = 0;
};


/*The document object is a js object that references the DOM. we can use it to select elements from the DOM.
We can use .querySelector method to pick out a class from the DOM/CSS/HTML/sopmething. The first instance of that clas sis used.
We can use .getElementById to pick out an ID from the HTML. IDs are unique, unlike classes, so we can pinpoint variables in this way.

The veriables can be modified using .textcontent =, kinda like usual JS variables;
they can also be used as values in the JS script; you can 'pull' values from the HTML/CSS.

When using this method the class or ID must be entered as a string. 
You can also use a variable in the JS docuemnt so that the reference auto-updates, 
and type coercian will convert it to a string.
*/



/* We can also add HTML elements using the innerHTML method:
The HTML needs to be entered as a string.
*/


//Event Methods and Callback Functions

function btn () {
	//this function can be set to do something
};

document.querySelector(`.btn-roll`).addEventListener(`click`, btn);
//The line above uses querySelector to pick the btn-roll class in the HTML document.
// the addEventListener method adds an event listener. 
// We choose the event listener 'click' which acts when the chosen class is clicked on (whether it be text, an image, whatever),
// and we choose the action/response to be the function 'btn'. ANy function could be chosen, or any other response. 
// Note that the function has no parentheses. This is because adding the parentheses automatically calls the function right away.
// We don't want to do that! We just want to tell the code which function to call when the event occurs.
// This is called a CALLBACK FUNCTION. Woooo!

//An alternative would be to stick the function straight in the line without a name.
// That's called an Anonymous Function. In this case it's an Anonymous Callback Function!
// as the function has no name it can't be called from anywhere else; it only exists in this context.
// If you don't want to use the function elsewhere this is a decent solution :3
// We'll set it so that when the dice image is clicked on a random integer between 1 and 6 is generated.
// We'll then se tit to update the image accordingly.

document.querySelector(`.btn-roll`).addEventListener(`click`, function() {
			
			//1. Generate random number
			lastRoll = dice;
			dice = Math.floor(6*Math.random())+1;
			console.log(dice+ lastRoll);
			

			//2. Display the number.
			const diceDOM = document.querySelector(`.dice`);
			diceDOM.style.display = `block`;
			diceDOM.src = `dice-` + dice + `.png`;

			//3. Update the round score if the number is NOT a 1.


			if (dice !== 1 && dice + lastRoll !== 12){

				roundScore += dice;
				console.log(roundScore);
					document.getElementById(`current-` + activePlayer).textContent = roundScore;

					
				} else {
					

					roundScore = 0;
					document.getElementById(`current-` + activePlayer).textContent = `0`;
					switchPlayer(); 

				};

			});


// Next up: Storing the 'hold' values! I made a start on my own below. Let's see how it compares to the course solution :3


document.querySelector(`.btn-hold`).addEventListener(`click`, function(){

	score[activePlayer] += roundScore;
	document.getElementById(`score-` + activePlayer).textContent = score[activePlayer];
	roundScore = 0;

	switch(score[activePlayer] >= winScore){
		case true:
			document.querySelector(`.player-` + activePlayer +`-panel`).classList.add(`winner`);
			document.querySelector(`.player-` + activePlayer +`-panel`).classList.remove(`active`);
			document.querySelector(`#name-` + activePlayer).innerHTML = '<em> Winner! </em>';
			document.querySelector(`.dice`).style.display = 'none';

			//MY POST-GAME FIX PT 2
			document.querySelector(`.btn-hold`).style.display = `none`;
			document.querySelector(`.btn-roll`).style.display = `none`;

			break;
			//document.querySelector(`.`).style.display = 'none';

		default:
			switchPlayer();

		};
});



document.querySelector(`.btn-new`).addEventListener(`click`, initialise);


		/* To dompost-code:
		1. We'cve used LET for some variables because CONS threw upmerrors. Take a look at this. If value type isn;t changing we shouldm be able to ue LET

		*/



		/*

		POST-GAME CHALLENGES:

		1. Add a rule where two consecutive sixes also causes the player to loose.
				Hint: You'll need to store the previous roll value.
				** Implemented and works!


		2. Add a rule where the players can enter a win score manually
				Hint: None.But I'd say why not add a text input; and why not add ones for player names too! :D


		3. Change the game to include a second dice, and a 1 on either dice ends your turn
				Hint: Ypu'll need to modify the HTML/CSS for this. Use the resources that already exist there as a basis for your code!
		
				4. Find out why CONST threw up those errors! Perhaps work with Ian. But look for yourself furst. Use a pad tot rack the values and what happens :3
		
				*/

