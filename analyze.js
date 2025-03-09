
const fs = require('node:fs/promises');
const nlp = require('compromise');

const inputFile = "AsKar.txt" // strip the last four chars for the name
const inputFilePath = `./data/rawText/${inputFile}`
const wordJSON = `./data/analyzed/words/${inputFile.slice(0,inputFile.length-4)}-words.json`
const sentenceJSON = `./data/analyzed/sentences/${inputFile.slice(0,inputFile.length-4)}-sentences.json`

async function analyzing(filePath) {
 
    try {
        const data = await fs.readFile(filePath, { encoding: 'utf8' });

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

analyzing(inputFilePath)