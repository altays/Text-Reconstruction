const process = require('process');
const utility = require('./scripts/utility')

const processRoute = process.argv[2]
const reconstructSubRoute = process.argv[3]
const inputName = process.argv[4]
const firstArg = process.argv[5]
const secondArg = process.argv[6]
// read conditions, save as variable

console.log('route', processRoute)
console.log('input', inputName)
console.log('subroute', reconstructSubRoute)
console.log('first arg', firstArg)
console.log('second arg', secondArg)

if (processRoute=="a"){
    // analyzing
    console.log('analyzing')
    // utility.analyzing(inputName)
    utility.analyzing(inputName)
} else if (processRoute=="r") {
    console.log('reconstructing')
    switch (reconstructSubRoute) {
        case "sub": {
            utility.reconstructSubstitution(inputName, firstArg)
            break;
        }
        case "blackout": {
            utility.reconstructBlackout(inputName,firstArg)
            break
        }
        case "markov": {
            utility.markovReconstruct(inputName,firstArg,secondArg)
            break
        }
        case "whitespace": {
            utility.reconstructWhitespace(inputName)
            break
        }
        default: {
            console.log("Empty action received.");
        }
    }

} else {
    console.log('please indicate a route')
}
