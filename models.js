//game constructor
function Game() {

	this.ship;
	this.config = {
		//put some cool shit here
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
	this.defaultInvaderPosition = {x:this.width/2, y: this.height/2}
	
};

Game.prototype.populate = function(){

	//Populate board with ship
	var ctx = this.gameBoard.getContext("2d");
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(this.ship.x, this.ship.y, this.ship.size, this.ship.size);	

	//populate board with invaders
	ctx.font = "bold 24px arial, sans-serif";
	var text = "Hello Galaxy";
	ctx.fillStyle = "#ffffff";

	ctx.fillText(text, this.defaultInvaderPosition.x, this.defaultInvaderPosition.y )
};


Game.prototype.draw = function() {
	this.ctx.clearRect(0, 0, this.width, this.height);

};



function Ship(x,y) {

	this.y = y;
	this.x = x;
	this.size = 16 ;

};


function Missle(x,y) {
	this.velocity;
};




function Invader(x,y) {
	this.x = x;
	this.y = y;
	this.bodyText = "";

};