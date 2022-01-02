class Player {

    __score = new Scoreboard();

    constructor(name) {
        this.name = name;
    }

    setScore(score) {
        this.__score.setScore(this.name, score);
    }

}

class Game {

    __players = [];
    __scoreboard = new Scoreboard();

    getPlayer(playerName) {
        return this.__players.find(p => p.name = playerName);
    }

    addPlayer(player) {
        this.__players.push(player);
    }

    getScoreboard() {
        const [winner, result] = this.__scoreboard.getResult();
        let stringResult = `Winner is: ${winner}\n\n`;
        result.forEach(p => {
            stringResult += `${p[0]} --> ${p[1]}\n`;
        });
        return stringResult;
    }
}

class Scoreboard {

    __scores = {};


    constructor() {
        if (typeof Scoreboard.instance === 'object') {
            return Scoreboard.instance;
        }
        Scoreboard.instance = this;
        return this;
    }

    setScore(player, score) {
        this.__scores[player] = score;
    }


    getResult() {
        const scoreboardArray = Object.keys(this.__scores).map(key => [key, this.__scores[key]]);
        const sortedScoreboard = scoreboardArray.sort((a,b) => b[1] - a[1]);
        const winner = scoreboardArray[0][0];
        return [winner, sortedScoreboard];
    }

}


const game = new Game();

game.addPlayer(new Player('Player 1'));
game.getPlayer('Player 1').setScore(20)
console.log(game.getScoreboard());

game.addPlayer(new Player('Player 2'));
game.getPlayer('Player 2').setScore(35)
console.log(game.getScoreboard());


game.addPlayer(new Player('Player 3'));
game.getPlayer('Player 3').setScore(30)
console.log(game.getScoreboard());


// Updating score of player 1 to demonstrate how scoreboard changes
game.getPlayer('Player 1').setScore(50);
console.log(game.getScoreboard());





