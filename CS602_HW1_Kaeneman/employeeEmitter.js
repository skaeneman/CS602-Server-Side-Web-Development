const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

// subscribe 
emitter.on('event1', function(args){
    console.log('event1 raised args:', args);
});

// emit
emitter.emit('event1', {a: 'foo', b: 'bar'});