const process = require('process');
const utility = require('./scripts/utility')

const processRoute = process.argv[2]
const inputName = process.argv[3]
const arg = process.argv[4]
const reconstructSubRoute = process.argv[5]
// read conditions, save as variable

// console.log('route', processRoute)
// console.log('input', inputName)
// console.log('sentences', inputSentences)
// console.log('subroute', reconstructSubRoute)

if (processRoute=="a"){
    // analyzing
    console.log('analyzing')
    utility.analyzing(inputName)
} else if (processRoute=="r") {
    // will want to create multiple reconstruct routes based on how text is being reconstructed -> blackout poetry, substition, etc.
        console.log('reconstructing')
        switch (reconstructSubRoute) {
            case "sub": {
                utility.reconstructSubstitution(inputName, arg)
                break;
            }
            case "blackout": {
                utility.reconstructBlackout(inputName,arg)
                break
            }
            default: {
                console.log("Empty action received.");
            }
        }


    
} else {
    console.log('please indicate a route')
}
