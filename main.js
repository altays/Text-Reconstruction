const process = require('process');
const utility = require('./scripts/utility')

const processRoute = process.argv[2]
const inputName = process.argv[3]
const inputSentences = process.argv[4]
// read conditions, save as variable

if (processRoute=="a"){
    // analyzing
    console.log('analyzing')
    utility.analyzing(inputName)
} else if (processRoute=="r") {
    // will want to create multiple reconstruct routes based on how text is being reconstructed -> blackout poetry, substition, etc.
    console.log('reconstructing')
    // pass conditions as variable
    utility.reconstructSubstitution(inputName, inputSentences)
    
} else {
    console.log('please indicate a route')
}
