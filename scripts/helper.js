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

// pulled from Everest Pipkin's datagarden course - computer-poetry

function choice(somelist) {
    let i = Math.floor(Math.random()*somelist.length);
    return somelist[i];
}

function nGramsChars(sentence, n) {
    // break string into array of characters
    let words = sentence.split("");
    // set limit at end - prevent error
    let total = words.length - n;
    // output array
    let grams = [];

    // loop over words
    // add letters in sequence of n
    for(let i = 0; i <= total; i++) {
        let seq = '';
        for (let j = i; j < i + n; j++) {
        seq += words[j];
        }
        grams.push(seq);
    }
    return grams;
}

// array of spaces
function spaceArrSwitch(route) {
    switch (route) {
        case 0:
            return repeat('\n',randomNum(0,2))
        case 1:
            return repeat(' ',randomNum(0,10))

        // ... more cases
        default:
            return ' '
    }
}

function spaceArrayCreator(size) {
    let initSpaceArray = []

    for (let i = 0; i < size; i++) {
        let choice = randomNum(0,2)
        initSpaceArray.push(spaceArrSwitch(choice))
    }
    return initSpaceArray
}

function repeat(text, num) {

    let outputStr = ""

    for (let i = 0; i < num; i++) {
        outputStr += text
    }

    return outputStr
}

function configPrepChar(config){
    if (config === undefined) {
        return ""
    } else if (!isNaN(config)) {
        return repeat(" ",config)
    } 
    else {
        return config
    }
}

// move this over into word-processing


// reading conditions -> return an object and pull values from object

module.exports = { repeat, randomNum, normalCase, createPunctuation, shuffleArr, configPrepChar, spaceArrayCreator, choice, nGramsChars }
