const EventEmitter = require('events').EventEmitter;

class Topic extends EventEmitter {
    constructor(topicName) {
        super();
        this.topicName = topicName;
    }

    notify(message) {
        console.log(`Topic "${this.topicName}" saying: ${message}`);
        this.emit(this.topicName, message);
    }
}

module.exports = Topic;