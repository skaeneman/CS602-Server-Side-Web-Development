const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

// creates the class
class EmployeeEmitter extends EventEmitter {
    // create a constructor 
    constructor(args) {
        super();
        this.data = args;
    }
}

// subscribe 
emitter.on('event1', function(args){
    console.log('event1 raised args:', args);
});

// emit
emitter.emit('event1', {a: 'foo', b: 'bar'});