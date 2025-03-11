const fs = require('node:fs/promises');

async function readwrite (filePath, outputFileName) {
 
    try {
        const data = await fs.readFile(filePath, { encoding: 'utf8' });
        await fs.writeFile(outputFileName,data);
    } 
    catch (error){
        console.error(error)
    }
}

function randomNum(max, min) {
    return Math.floor(Math.random() * (max-min) + min)
}

function shuffleArr(array){
    for (let i = array.length - 1; i > 0; i--) { 
        // Generate random index 
        const j = Math.floor(Math.random() * (i + 1));
                        
        // Swap elements at indices i and j
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function normalCase(string) {
    let tempString = string.trim().slice(1, string.length)
    let firstChar = string[0].toUpperCase()
    // let newString = tempString[0].toUpperCase() + tempString.slice(1,tempString.length) + "."
    return firstChar + tempString
}

function createPunctuation() {
    const puncArray = ['. ', ', ','! ', '? ',]
    let randomIndex = randomNum(0,puncArray.length)
    // enhancements
        // if last sentence, should be a period, exclamation, or question mark
        // if sentence has a 'why', make it a question mark
    return puncArray[randomIndex]
}

module.exports = { readwrite, randomNum, normalCase, createPunctuation, shuffleArr }
