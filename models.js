//game constructor
function Game() {

	this.ship;
	this.config = {
		fps: 50,
		dt: (1/50)
	};
};


//takes in div#gameboard and sets game attributes to reflect 
Game.prototype.initialize = function(gameBoardTag){

	gameBoardTag.height = 600;
	gameBoardTag.width = 550;

	this.gameBoard =gameBoardTag;
	this.ctx = gameBoardTag.getContext("2d")

	//set width and height
	this.width = gameBoardTag.width;

	this.height = gameBoardTag.height;
	

	//set default position for the ship
	this.defaultShipPosition = {x: this.width/2.2, y: this.height/1.4}

	//create new ship with coordinates
	this.ship = new Ship(this.defaultShipPosition.x, this.defaultShipPosition.y);


	//set default position for invader
	this.defaultInvaderPosition = {x:this.width/3, y: this.height/9}
	
	//add listeners to key presses
	var game = this;
	game.addListeners();

};

Game.prototype.addListeners = function() {

	var self = this;
    document.addEventListener('keydown', function(event) {
        if(event.keyCode = 39) {
        self.ship.x += 1;
        console.log("yo")
        };
        
    }, false);
};


//populate convas with default ship and invader locations
Game.prototype.populate = function(){

	//Populate board with ship
	this.ctx.fillStyle = "#ffffff";
	this.ctx.fillRect(this.ship.x, this.ship.y, this.ship.size, this.ship.size);	

	//populate board with invaders
	this.ctx.font = "bold 24px arial, sans-serif";
	var text = "Hello Galaxy";
	this.ctx.fillStyle = "#ffffff";
	this.ctx.fillText(text, this.defaultInvaderPosition.x, this.defaultInvaderPosition.y )
};


//start the game current FPS
Game.prototype.start = function() {

	// start the game loop
	var game = this;
	this.intervalId = setInterval(function() { 
		console.log("hey")
		game.draw()
	}, 1000/ this.config.fps)
};


//clears at the start and draws updated location ship or invaders
Game.prototype.draw = function() {
	
	//clear board
	this.ctx.clearRect(0, 0, this.width, this.height);

	//draw ship in it's location
	this.ctx.fillStyle = "#fffffff";
	this.ctx.fillRect(this.ship.x, this.ship.y, this.ship.size, this.ship.size);
};

Game.prototype.moveShip = function() {
	this.ship.x += 1;
};



function Ship(x,y) {

	this.y = y;
	this.x = x;
	this.size = 16 ;

};


function Missle(x,y) {
	this.velocity;
	this.size;
};




function Invader(x,y) {
	this.x = x;
	this.y = y;
	this.bodyText = "";

};


