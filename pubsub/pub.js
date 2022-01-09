import { connect } from 'amqplib';


connect('amqp://localhost')
  .then((conn) => {
    return conn.createChannel().then((ch) => {
      const ok = ch.assertExchange('TestQueue', 'fanout', {durable: false});
      const message = 'This message is from the publisher';
  
      return ok.then(() =>  {
        ch.publish('TestQueue', '', Buffer.from(message));
        console.log(" [x] Sent '%s'", message);
        return ch.close();
      });
    }).finally(() => { conn.close(); });
  })
  .catch(console.warn);
