var num = 10
var num2 = 10

// we can make the main program call the other directly
console.log(require("./soma.js")(num, num2)) // <-- like this

// or we can define a variable to the call another program
var subFunction = require('./sub.js') // <-- like this

/* and to the function "soma" have parameters, we
call it passing the variables we want to use */
console.log(subFunction(num, num2))

// The results it's the same

console.log('end of program');