var numOfSquares = 6,
	colors = [],
	colorDisplay = document.querySelector("#color_display"),
	message = document.querySelector("#message"),
	pickedColor,
	squares = document.querySelectorAll(".square"),
	h1 = document.querySelector("h1"),
	resetBtn = document.querySelector("#reset_btn"),
	modeBtns = document.querySelectorAll(".mode");

function changeColors(color) {
	//loop through all squares
	for(var i = 0; i < squares.length; i++) {
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
};

function selectColor() {
	var randomNumber = Math.floor(Math.random() * colors.length);
	return colors[randomNumber];
};

function generateRandomColors(num) {
	//make an array
	var arr = [];
	//add num random colors to array
	for(var i = 0; i < num; i++) {
		//get random color and push into array
		arr.push(randomColor());
	}
	//return array
	return arr;
};

function randomColor() {
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 - 255
	var g = Math.floor(Math.random() * 256);
	//pick a blue from 0 - 255
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function reset() {
	//Change button text back to "New Colors"
	resetBtn.textContent = "New Colors"
	//change h1 background color
	h1.style.backgroundColor = "steelblue";
	//Empty message text content
	message.textContent = "";
	//generate all new colors
	colors = generateRandomColors(numOfSquares);
	//pick a new random color from array
	pickedColor = selectColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	//change colors for squares
	for(var i = 0 ; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
		
	}
}

function init() {
	//**** Mode Buttons Event Listeners ****//
	for(var i = 0; i < modeBtns.length; i++) {
		modeBtns[i].addEventListener("click", function() {
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			this.classList.add("selected");

			this.textContent === "Easy" ? numOfSquares = 3: numOfSquares = 6;

			reset();
		});
	};
	//**** Colored Squares Event Listeners ****//
	for(var i = 0; i < squares.length; i++) {
	//add click listeners to squares
	squares[i].addEventListener("click", function() {
		//grab color of clicked square
		var clickedColor = this.style.backgroundColor;
		//compare color to pickedColor
		if(clickedColor === pickedColor) {
			resetBtn.textContent = "Play Again?"
			h1.style.backgroundColor = clickedColor;
			message.textContent = "Correct";
			changeColors(clickedColor);
			}
		else {
			this.style.backgroundColor = "#232323";
			message.textContent = "Try Again";
			}
		});
	};

	reset();
}

init();

resetBtn.addEventListener("click", function() {
	reset();
});