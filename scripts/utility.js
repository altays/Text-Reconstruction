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
    const sentenceNum = helper.randomNum(3,2)

    try {
        const wordPool = helper.shuffleArr(JSON.parse(await fs.readFile(wordFilePath, { encoding: 'utf8' })));
        const sentencePool = JSON.parse(await fs.readFile(sentenceFilePath, { encoding: 'utf8' }));

        let sentenceStructureList = []

   
        

    } 
    catch (error){
        console.error(error)
    }
}

module.exports = { analyzing, reconstructSubstitution }