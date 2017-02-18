$(document).ready(function() {

//identify starfield div container
var container = document.getElementById('stars-background');
//initialize new starfield beep beep boop
var starfield = new Starfield();
//run initialize on initialized starfield
starfield.initialize(container);
starfield.start();



});
