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

class User {

    suscriptions = [];

    constructor(userName) {
        this.__userName = userName;
    }
    
    getUserName() {
        return this.__userName;
    }

    suscribeToTopic(topic) {
        topic.on(topic.topicName, (message) => this.getNotificationFromTopic(message))
        this.suscriptions.push(topic);
        
    }

    addMessageToTopic(topic, message) {
        topic.emit('newMessage', message);
    }

    getNotificationFromTopic(message) {
        console.log(`User ${this.getUserName()} has a message from topic: ${message}`)
    }
}

// Creating topics and listening events to send message to users
const topic1 = new Topic('Topic1');
const topic2 = new Topic('Topic2');
topic1.on('newMessage', topic1.notify);
topic2.on('newMessage', topic2.notify);



const user1 = new User('User1');
const user2 = new User('User2');

user1.suscribeToTopic(topic1);
user1.suscribeToTopic(topic2);
user2.suscribeToTopic(topic1);

user2.addMessageToTopic(topic1, "Hi, I'm a message providing from user1")
console.log('-----------------------')
user2.addMessageToTopic(topic1, "Hi again, this time I'm comming from user2");
console.log('-----------------------')
user1.addMessageToTopic(topic2, "Since topic2 has only 1 listener (me) just 2 messages will be displayed")