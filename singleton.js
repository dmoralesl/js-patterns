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

    getPlayers() {
        return this.__players;
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


const player1 = new Player('Player 1');
player1.setScore(20);
const player2 = new Player('Player 2');
player2.setScore(15);
const player3 = new Player('Player 3');
player3.setScore(35);


const game = new Game();
console.log(game.getScoreboard());



