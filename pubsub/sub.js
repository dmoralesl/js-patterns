import { connect } from 'amqplib';

connect('amqp://localhost')
  .then((conn) => {
    process.once('SIGINT', () => { conn.close(); });
    return conn.createChannel().then((ch) => {
      let ok = ch.assertExchange('TestQueue', 'fanout', {durable: false});
      ok = ok.then(() => {
        return ch.assertQueue('', {exclusive: true});
      });
      ok = ok.then((qok) => {
        return ch.bindQueue(qok.queue, 'TestQueue', '').then(() => {
          return qok.queue;
        });
      });
      ok = ok.then((queue) => {
        return ch.consume(queue, logMessage, {noAck: true});
      });
      return ok.then(() => {
        console.log(` [*] Waiting for TestQueue. To exit press CTRL+C`);
      });
  
      function logMessage(msg) {
        console.log(" [x] '%s'", msg.content.toString());
      }
    });
  })
  .catch(console.warn);
