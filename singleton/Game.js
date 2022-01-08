const Scoreboard = require('./Scoreboard');

class Game {

    __players = [];
    __scoreboard = new Scoreboard();

    getPlayer(playerName) {
        return this.__players.find(p => p.name = playerName);
    }

    addPlayer(player) {
        this.__players.push(player);
    }

    setScore(playerName, score) {
        this.__scoreboard.setScore(playerName, score);
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


module.exports = Game;