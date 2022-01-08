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

module.exports = Scoreboard;