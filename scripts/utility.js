const fs = require('node:fs/promises');
const nlp = require('compromise');
const helper = require('./helper');
const wordProcessing = require('./word-processing');
nlp.plugin(require('compromise-speech')) 
nlp.plugin(require('compromise-paragraphs')) 

async function analyzing(inputFile) {

    const inputFilePath = `./data/rawText/${inputFile}`
    const wordJSONFile = `./data/analyzed/words/${inputFile.slice(0,inputFile.length-4)}-words.json`
    const sentenceJSONFile = `./data/analyzed/sentences/${inputFile.slice(0,inputFile.length-4)}-sentences.json`
 
    try {
        const data = await fs.readFile(inputFilePath, { encoding: 'utf8' });

        const nlpData = nlp(data)
        let sentenceJSON = nlpData.sentences().json();

        let analyzedText = wordProcessing.textAnalyzer(sentenceJSON)
            
        await fs.writeFile(wordJSONFile, JSON.stringify(analyzedText.words));
        await fs.writeFile(sentenceJSONFile, JSON.stringify(analyzedText.pos));

    } 
    catch (error){
        console.error(error)
    }
}

// add conditions parameters - syllables check, pronounciation check 
async function reconstructSubstitution(wordFile, sentenceFile) {
    // needs a list of words and list of sentences -> works with analyze function

    const wordFilePath = `./data/analyzed/words/${wordFile}`
    const sentenceFilePath = `./data/analyzed/sentences/${sentenceFile}`
    // read conditions -> pull from an object

    try {
        const initwordPool = helper.shuffleArr(JSON.parse(await fs.readFile(wordFilePath, { encoding: 'utf8' })));
        const sentencePool = JSON.parse(await fs.readFile(sentenceFilePath, { encoding: 'utf8' }));

        let sentence = wordProcessing.substitutionCreator(initwordPool, sentencePool)

        await fs.writeFile(`./data/processed/${sentence.slice(0,5)+helper.randomNum(0,10000)}-reconstructed.txt`, sentence);
    } 
    catch (error){
        console.error(error)
    }
}

async function reconstructBlackout(textFile, percent, config) {
    // only relies on an input file, not analyzed file

    let configDelimit = helper.configPrepChar(config)

    const originalText = `./data/rawText/${textFile}`

    try {
        
        const wordList = await fs.readFile(originalText, { encoding: 'utf8' });

        let nlpDoc=nlp(wordList)
        let shuffArr = helper.shuffleArr(nlpDoc)
        let constructedSentence = ""
        let constructedArray =[]

        for (let i = 0; i < shuffArr.document.length; i++ ) {
            
            let nlpSentence = shuffArr.document[i]

            for (let j = 0; j < nlpSentence.length; j++) {
                let nlpText=nlpSentence[j].text
                let coinFlip = helper.randomNum(0,100)
                if (coinFlip > percent) {
                    constructedArray.push(nlpText)
                } else {
                    constructedArray.push(configDelimit)
                }
            }
        }

        constructedSentence = constructedArray.join(" ")
        
        await fs.writeFile(`./data/processed/${constructedSentence.slice(0,5)+helper.randomNum(0,10000)}-blackout.txt`, constructedSentence.trim());
    } 
    catch (error){
        console.error(error)
    }
}

async function markovReconstruct(textFile, charNum, loopNum) {
    // only relies on an input file, not analyzed file

    const originalText = `./data/rawText/${textFile}`

    try {
        
        const wordList = await fs.readFile(originalText, { encoding: 'utf8' });
        
        let constructedSentence = ""

        for (let i = 0; i < loopNum; i++ ){
            constructedSentence += helper.markovChain(wordList,charNum)
        }
                
        await fs.writeFile(`./data/processed/${helper.randomNum(0,100000)}-${helper.randomNum(0,100000)}-markov.txt`, constructedSentence);
    } 
    catch (error){
        console.error(error)
    }
}

async function reconstructWhitespace(textFile, shuffle) {
    // only relies on an input file, not analyzed file
    // first arg enables or disables shuffle
    const originalText = `./data/rawText/${textFile}`

    try {
        
        const wordList = await fs.readFile(originalText, { encoding: 'utf8' });

        let wordArr = wordList.split(" ")

        console.log(shuffle)

        let shuffleArr;

        if (shuffle=="true"){
            shuffleArr = helper.shuffleArr(wordArr)
        } else {
            shuffleArr=wordArr
        }
 
        let constructedSentence = wordProcessing.whiteSpaceCreator(shuffleArr)

        await fs.writeFile(`./data/processed/${helper.randomNum(0,10000)+helper.randomNum(0,10000)}-whitespace.txt`, constructedSentence);
    } 
    catch (error){
        console.error(error)
    }
}

module.exports = { analyzing, reconstructSubstitution, reconstructBlackout, markovReconstruct, reconstructWhitespace }