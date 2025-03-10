const fs = require('node:fs/promises');
const nlp = require('compromise');

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

async function reconstructSubstitution(wordFile, sentenceFile) {

    const wordFilePath = `./data/analyzed/words/${wordFile}`
    const sentenceFilePath = `./data/analyzed/sentences/${sentenceFile}`
    // number of sentences -> between 1 and number of sentences in the file
    const sentenceNum = randomNum(3,2)

    try {

        const wordPool = JSON.parse(await fs.readFile(wordFilePath, { encoding: 'utf8' }));
        const sentencePool = JSON.parse(await fs.readFile(sentenceFilePath, { encoding: 'utf8' }));

        let sentenceStructureList = []

        // pull random sentence structures
        for (let i = 0; i < sentenceNum; i++) {
            let randomIndex = randomNum(0, sentencePool.length)
            let randomSentence = sentencePool[randomIndex]
            sentenceStructureList.push(randomSentence)
        }
        
        // console.log(sentenceStructureList)

        let reconstructedSentence = ""
        console.log(typeof wordPool)

        // looping over each sentence, each word within each sentence
        for (let i = 0; i < sentenceStructureList.length; i++) {
            console.log('sentence')
            for (let j = 0; j < sentenceStructureList[i].length; j++) {
                let wordTag = sentenceStructureList[i][j]
                console.log(wordTag)
                // search wordPool for any word whose tags match the selected tags
                let position = wordPool.indexOf(wordTag)
                console.log(position)
            }
        }
        // for each wordtag in the sentence, search the word list for a word that matches
            // if a word does not exist, skip it
            // in the future, search for a more basic part of text, then conjugate it to fit the tag

        // write file

            // await fs.writeFile(wordJSON, JSON.stringify(wordList));

    } 
    catch (error){
        console.error(error)
    }
}

function randomNum(max, min) {
    return Math.floor(Math.random() * (max-min) + min)
}

module.exports = { analyzing, reconstructSubstitution }