const fs = require('node:fs/promises');
const nlp = require('compromise');
const helper = require('./helper');
nlp.plugin(require('compromise-speech')) 

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
        let textList = [];
              
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
                        tags: [],
                        syllables: 0,
                        pronounciation: ""
                    }
                  
                    let compText = words[x].text;
                    let compTags = words[x].tags;
                    let compSyllables=nlp(compText).terms().syllables()[0].length
                    let soundsLike = nlp(compText).terms().soundsLike()[0][0]

                    // console.log(compText, compTags, compSyllables, soundsLike[0][0])
                    wordObj.text = compText;
                    wordObj.tags.push(compTags);
                    wordObj.syllables = compSyllables
                    wordObj.pronounciation = soundsLike;
                    // console.log(compSyllables)
                    
                    // console.log()

                    // check if word already exists
                    if (textList.includes(compText) == false) {
                        textList.push(compText);
                        wordList.push(wordObj);
                    } 

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

async function reconstructSubstitution(wordFile, sentenceFile) {

    const wordFilePath = `./data/analyzed/words/${wordFile}`
    const sentenceFilePath = `./data/analyzed/sentences/${sentenceFile}`
    // number of sentences -> between 1 and number of sentences in the file

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

module.exports = { analyzing, reconstructSubstitution }