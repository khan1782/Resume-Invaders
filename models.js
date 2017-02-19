//game constructor
function Game() {

	this.ship;
	this.invaders = [];
	this.config = {
		fps: 50,
		dt: (1/50)
	};
};


//will set up the canvas size and the position for ships and invaders
//will run the listeners for key strokes
Game.prototype.initialize = function(gameBoardTag){

	gameBoardTag.height = 800;
	gameBoardTag.width = 700;

	this.gameBoard =gameBoardTag;
	this.ctx = gameBoardTag.getContext("2d")

	//set width and height
	this.width = gameBoardTag.width;

	this.height = gameBoardTag.height;

	//set default position for the ship
	this.defaultShipPosition = {x: this.width/2.2, y: this.height/1.4};

	//create new ship with coordinates
	this.ship = new Ship(this.defaultShipPosition.x, this.defaultShipPosition.y);


	//set default position for invader
	this.defaultInvaderPosition = {x:this.width/3, y: this.height/6};

	//create new invader with coordinates
	this.invaders.push(new Invader(this.defaultInvaderPosition.x, this.defaultInvaderPosition.y, 60, "Hello"));
	this.invaders.push(new Invader(this.defaultInvaderPosition.x + 65, this.defaultInvaderPosition.y, 65, "World"));
	//add listeners to key presses
	var game = this;
	game.addListeners();
	
};

//run inside of initialize function
Game.prototype.addListeners = function() {

	//save scope for reference
	var self = this;

	//set up listener for keydowns
  document.addEventListener('keydown', function(event) {

    //check for right
    if(event.keyCode === 39) {

    	//if the ship is too far right, do nothing, otherwise fly!
    	if (self.ship.x > self.width -25) {
    		console.log("EErrrr!")
    	} else {
    	self.ship.x += 10;
    	console.log("swoosh")
	    };

	  };

    //check for left
    if(event.keyCode === 37) {
    	if (self.ship.x < 25) {
    		console.log("Weeee")
    	} else {
    	self.ship.x -=10;
    	console.log("schweee")
    	};
  	};

    //check for up
    if(event.keyCode === 38) {
    	if (self.ship.y < 30) {
    		console.log("woohh")
    	} else {
    	self.ship.y -= 10;
    	console.log("vroom")
			};
		};

		//check for down
		if(event.keyCode === 40) {
			if (self.ship.y > self.height - 25) {
				console.log("wreeeee")
			} else {
			self.ship.y += 10;
			console.log("sqqueaaa")
			};
		};

  	}, false);

  document.addEventListener('keyup', function(event) {

  		//check for space bar
  		if(event.keyCode === 32) {
  			console.log("pew");
  			self.ship.fire()
  		};
  });

};

//function to wait and listen for any collisions
Game.prototype.invaderCollisions = function() {
	var self = this;

	//iterate through invaders and compare each invader to each missle for collision
	for(var i=0; i < this.invaders.length; i++) {
		var invader = self.invaders[i];
		
	//iterate through missiles and compare each missle to given invader
		for(var j=0; j < self.ship.missileBay.length; j++) {
			var missile = self.ship.missileBay[j];
			if(missile.y < invader.y && (missile.x > invader.x && missile.x < invader.x + invader.width )) {
				console.log("Hit!")
				self.ship.missileBay.splice(j--, 1);
				self.invaders.splice(i--,1);
			};
		};
	};       
};

Game.prototype.invaderSlide = function () {
	var self = this;

	//to through each invader and have them shift in a given direction based on their direction attribute
	this.invaders.forEach(function(invader){
		if (invader.x >= self.width - invader.width) {
			self.invaders.forEach(function(invader) {
				invader.direction = "left"
			});
		};
		if (invader.x <= 0) { 
			self.invaders.forEach(function(invader) {
				invader.direction = "right"
			});
		};
		if(invader.direction === "right") { 
			invader.x += 1
		};
		if(invader.direction == "left") {
			invader.x -= 1
		};
	});
};


//populate convas with default ship and invader locations
Game.prototype.populate = function(){

	//Populate board with ship
	this.ctx.fillStyle = "#ffffff";
	this.ctx.fillRect(this.ship.x, this.ship.y, this.ship.size, this.ship.size);	

	//populate board with invaders
	for(var i=0; i < this.invaders.length; i++) {
		var currentInvader = this.invaders[i];
		this.ctx.font = "bold 24px arial, sans-serif";
		this.ctx.fillStyle = "#ffffff";
		this.ctx.fillText(currentInvader.bodyText, currentInvader.x, currentInvader.y)
	};

};


//start the game current FPS
Game.prototype.start = function() {

	// start the game loop
	var game = this;
	this.intervalId = setInterval(function() { 
		// console.log("Frames")
		game.draw()
		game.invaderCollisions();
		game.invaderSlide();
	}, 1000/ this.config.fps);

};


//clears at the start and draws updated location ship or invaders
Game.prototype.draw = function() {
	
	//clear board
	this.ctx.clearRect(0, 0, this.width, this.height);

	//draw ship in it's location
	this.ctx.fillStyle = "#fffffff";
	// console.log(this.ship)
	this.ctx.fillRect(this.ship.x, this.ship.y, this.ship.size, this.ship.size);

	//save scope for reference
	var self = this;

	//draw any existing invaders
	for(var i=0; i < this.invaders.length; i ++) {
		var currentInvader = this.invaders[i];
		this.ctx.fillText(currentInvader.bodyText, currentInvader.x, currentInvader.y)
	};
	//draw any missiles that have been shot out of the missile bay
	for(var i=0; i < this.ship.missileBay.length; i++) {
 
		var currentMissile = self.ship.missileBay[i]
		
		//all missiles will always move foward
		currentMissile.y -= 5
		if (currentMissile.y < 0) {
			console.log("lost to depths of space");
      self.ship.missileBay.splice(i--, 1);
		};
		this.ctx.fillStyle="#ffffff";
		this.ctx.fillRect(currentMissile.x, currentMissile.y, 2, 15);
		};
};


function Ship(x,y) {

	this.y = y;
	this.x = x;
	this.size = 16 ;
	this.missileBay = [];

	var self = this;

	this.fire = function() {
		self.missileBay.push(new Missile(self.x + 8, self.y));
	};

};


function Missile(x,y) {
	this.x = x;
	this.y = y;
	this.velocity;
	this.size;
};




function Invader(x, y, width, bodyText) {
	this.x = x;
	this.y = y;
	this.width = width
	this.bodyText = bodyText;
	this.direction = "right"
};







//in the initialize
//set default locatio for an invader
//create instance of invader
//update game.populate to


//hyperdrive
//will need to change the starfields max velocity
// will need to change star rectangle's size
// //
//     interval = setInterval(function() {
//         countdownElement.firstChild.data = 'You can start your download in ' + (seconds - second) + ' seconds';
//         if (second >= seconds) {
//             downloadButton.style.display = 'block';
//             clearInterval(interval);
//         }

//         second++;
//     }, 1000);