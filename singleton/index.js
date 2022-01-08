const Game = require('./Game');
const Player = require('./Player');

const game = new Game();

game.addPlayer(new Player('Player 1'));
game.setScore('Player 1', 20)
console.log(game.getScoreboard());

game.addPlayer(new Player('Player 2'));
game.setScore('Player 2', 35)
console.log(game.getScoreboard());


game.addPlayer(new Player('Player 3'));
game.setScore('Player 3', 30)
console.log(game.getScoreboard());


// Updating score of player 1 to demonstrate how scoreboard changes
game.setScore('Player 1', 50);
console.log(game.getScoreboard());