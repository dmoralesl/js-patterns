
import {Subscriber} from './sub.js';
import {Publisher} from './pub.js';

const subscriber = new Subscriber('queue1');
await subscriber.listen();    

const publisher = new Publisher('queue1');
publisher.sendToQueue('hello');


