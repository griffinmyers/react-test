const EventEmitter = require('events');
const util = require('util');

function Store() {
  EventEmitter.call(this);
}

util.inherits(Store, EventEmitter);

const store = new Store();
store.setMaxListeners(0);
export default store;
