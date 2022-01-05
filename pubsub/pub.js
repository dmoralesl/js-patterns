import { connect } from 'amqplib';

export class Publisher {
  constructor(queueName) {
    this.queueName = queueName;
  }

  sendToQueue(message) {
    connect('amqp://localhost').then((conn) => {
        return conn.createChannel().then((ch) => {
          var ok = ch.assertExchange(this.queueName, 'fanout', {durable: false})
      
      
          return ok.then(() =>  {
            ch.publish(this.queueName, '', Buffer.from(message));
            console.log(" [x] Sent '%s'", message);
            return ch.close();
          });
        }).finally(() => { conn.close(); });
      }).catch(console.warn);
    
  }
  
}

