// Import events module
var events = require('events');

// Create event emmitter object
var eventEmitter = new events.EventEmitter();

count = 0;

// Event handler function
var divisibleBy5 = function (number) {
    console.log('Number: ' + number + ' is divisible by 5');
    count++;
}

// Bind envent and event handler function
eventEmitter.on('divisible_by_5', divisibleBy5);

for (i = 0; i < 100; i++) {
    var number = Math.random();
    number = number * 100;
    number = Math.round(number);
    console.log(number);
    if (number % 5 == 0) {
        console.log(number);
        // Generate event
        eventEmitter.emit('divisible_by_5', number);
    }
}

console.log('Out of 100 trials, divisible by 5 number generated ' + count + ' times');

