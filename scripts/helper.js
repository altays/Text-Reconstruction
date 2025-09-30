const fs = require('node:fs/promises');

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
    return firstChar + tempString
}

function createPunctuation(sentenceCheck = false) {
    let lastSentence = sentenceCheck
    let randomIndex;
    let puncArray;
    if (lastSentence === false) {
        puncArray = ['. ', ', ','! ', '? ',]
        randomIndex = randomNum(0,puncArray.length)
    } else {
        puncArray = ['. ', '! ', '? ',]
        randomIndex = randomNum(0,puncArray.length)
    }

    return puncArray[randomIndex]
}

// add linebreak


// repeat line


// reading conditions -> return an object and pull values from object

module.exports = { randomNum, normalCase, createPunctuation, shuffleArr }
