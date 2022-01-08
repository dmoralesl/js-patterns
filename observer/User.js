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

module.exports = User;