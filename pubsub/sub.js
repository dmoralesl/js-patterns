import { connect } from 'amqplib';

export class Subscriber {
    constructor(queueName) {
        this.queueName = queueName;
    }

    async listen() {
        return connect('amqp://localhost').then((conn) => {
            process.once('SIGINT', () => { conn.close(); });
            return conn.createChannel().then((ch) => {
              var ok = ch.assertExchange(this.queueName, 'fanout', {durable: false});
              ok = ok.then(() => {
                return ch.assertQueue('', {exclusive: true});
              });
              ok = ok.then((qok) => {
                return ch.bindQueue(qok.queue, this.queueName, '').then(() => {
                  return qok.queue;
                });
              });
              ok = ok.then((queue) => {
                return ch.consume(queue, logMessage, {noAck: true});
              });
              return ok.then(() => {
                console.log(` [*] Waiting for ${this.queueName}. To exit press CTRL+C`);
              });
          
              function logMessage(msg) {
                console.log(" [x] '%s'", msg.content.toString());
              }
            });
          }).catch(console.warn);
    }
}
