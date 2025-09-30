const fs = require('node:fs/promises');
const nlp = require('compromise');
const helper = require('./helper');

async function analyzing(inputFile) {

    const inputFilePath = `./data/rawText/${inputFile}`
    const wordJSON = `./data/analyzed/words/${inputFile.slice(0,inputFile.length-4)}-words.json`
    const sentenceJSON = `./data/analyzed/sentences/${inputFile.slice(0,inputFile.length-4)}-sentences.json`
 
    try {
        const data = await fs.readFile(inputFilePath, { encoding: 'utf8' });

        const nlpData = nlp(data)
        let sentences = nlpData.sentences().json();

        let wordList = [];
        let posArray = [];
              
        for (let i = 0; i < sentences.length; i++) {

            let words = sentences[i].terms
            let subPOSArray = []

            for (let x = 0; x < words.length; x++){
                
                // 1
                // for each word -> pull out text and tags
                wordObj = {}
                if (words[x].text != "") {

                    let wordObj = {
                        text: "",
                        tags: []
                        // add logic for syllable extraction here
                        // also, add syllables too? could use in the future
                    }
                  
                    let compText = words[x].text;
                    let compTags = words[x].tags;

                    wordObj.text = compText;
                    wordObj.tags.push(compTags);
                    wordList.push(wordObj)
                    subPOSArray.push(words[x].tags)

                }
            }

            // 2
            // push sentence arrays to larger text block arrays
            posArray.push(subPOSArray)
        }
            
        await fs.writeFile(wordJSON, JSON.stringify(wordList));
        await fs.writeFile(sentenceJSON, JSON.stringify(posArray));

    } 
    catch (error){
        console.error(error)
    }
}

// add conditions parameter
async function reconstructSubstitution(wordFile, sentenceFile) {

    const wordFilePath = `./data/analyzed/words/${wordFile}`
    const sentenceFilePath = `./data/analyzed/sentences/${sentenceFile}`
    // read conditions -> pull from an object

    try {
        const initwordPool = helper.shuffleArr(JSON.parse(await fs.readFile(wordFilePath, { encoding: 'utf8' })));
        const sentencePool = JSON.parse(await fs.readFile(sentenceFilePath, { encoding: 'utf8' }));

        let sentenceStructureList = []

        let randomSentenceAmount = helper.randomNum(1,8)

        let constructedSentence = ""

        // pull random sentence structures
        for (let i = 0; i < randomSentenceAmount; i++) {
            let randomIndex = helper.randomNum(0, sentencePool.length)
            let randomSentence = sentencePool[randomIndex]
            sentenceStructureList.push(randomSentence)
        }

        // loop over collection of sentences
        for (let i = 0; i < sentenceStructureList.length; i++) {

            let sentenceWordTagList = sentenceStructureList[i]
            let lastSentenceCheck = false;

            // looping over individual words in sentence
            for (let j = 0; j < sentenceWordTagList.length; j++ ) {

                let sentenceWordTags = sentenceWordTagList[j]

                // initial wordpool shuffle
                let wordPool = helper.shuffleArr(initwordPool)

                // looping over all words in pool
                for (k = 0; k < wordPool.length; k++ ) {

                    // shuffle wordpool after each search
                    wordPool = helper.shuffleArr(initwordPool)
                    let wordPoolText = wordPool[k].text
                    let wordPoolTags = wordPool[k].tags[0]
                    let existCheck = []
                    let existState = true
                    
                    // looping over words in wordpool and checking tags
                    for (let l = 0; l < wordPoolTags.length; l++) {

                        let wordTag = wordPoolTags[l]
                        let arrayIncludes = sentenceWordTags.includes(wordTag)

                        if (arrayIncludes) {
                            existCheck.push(true);
                        } else {
                            existCheck.push(false)
                        }
                    }

                    // looping over array of matches, if all true, then overall value is true
                    for (let e = 0; e < existCheck.length; e++) {
                        if (existCheck[e] === false) {
                            existState = false
                        }
                    }

                    // condition for check to add a random linebreak

                    // if all tags match, push text
                    if (existState==true) {

                        // if word is a proper noun, don't make it lowercase
                        if (wordPoolTags.includes('ProperNoun' || 'Pronoun') === true) {
                            constructedSentence+=`${wordPoolText} `
                            break
                        }
                        else {
                            constructedSentence+=`${wordPoolText} `.toLowerCase()
                            break
                        }
                    }
                }
            }

            // condition for check to repeat line
            if (i === sentenceStructureList.length-1) {
                lastSentenceCheck = true;
            }

            constructedSentence= helper.normalCase(constructedSentence) + helper.createPunctuation(lastSentenceCheck)

        }        
        await fs.writeFile(`./data/processed/${constructedSentence.slice(0,5)+helper.randomNum(0,10000)}-reconstructed.txt`, constructedSentence);
    } 
    catch (error){
        console.error(error)
    }
}

// reconstruction blackout method here

module.exports = { analyzing, reconstructSubstitution }