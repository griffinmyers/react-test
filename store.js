const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);
}

util.inherits(MyEmitter, EventEmitter);

const store = new MyEmitter();
store.setMaxListeners(0);
export default store;
