$(document).ready(function() {

//identify starfield div container
var background = document.getElementById('background');
//initialize new starfield beep beep boop
var starfield = new Starfield();
//run initialize on initialized starfield
starfield.initialize(background);
starfield.start();

var gameBoard = document.getElementById("gameBoard");
var game = new Game;
game.initialize(gameBoard)



});
