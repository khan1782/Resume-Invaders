//game constructor
function Game() {

	this.ship;
	this.config = {
		//put some cool shit here
	};

};


//takes in div#gameboard and sets game attributes to reflect 
Game.prototype.initialize = function(gameBoardTag){

	this.gameBoard =gameBoardTag;

	//set width and height
	this.width = gameBoardTag.width;

	this.height = gameBoardTag.height;
	//create new ship with coordinates
	this.ship = new Ship(this.width/2.2,this.height/1.4);

	//now paste that shit onto the board
	var ctx = this.gameBoard.getContext("2d");
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(this.ship.x, this.ship.y, this.ship.size, this.ship.size);	


};




function Ship(x,y) {

	this.y = y;
	this.x = x;
	this.size = 16;

};






