const helper = require('./helper');
const nlp = require('compromise');

function substitutionCreator (words, sentences) {

    let sentenceStructureList = []

    let randomSentenceAmount = helper.randomNum(1,8)

    let constructedSentence = ""

    // pull random sentence structures
    for (let i = 0; i < randomSentenceAmount; i++) {
        let randomIndex = helper.randomNum(0, sentences.length)
        let randomSentence = sentences[randomIndex] //would need to access sentence param, could also pull syllable arr
        sentenceStructureList.push(randomSentence)
    }

    // loop over collection of sentences
    for (let i = 0; i < sentenceStructureList.length; i++) {

        let sentenceWordTagList = sentenceStructureList[i].sentenceArr
        let sentenceSyllableList = sentenceStructureList[i].syllableArr
        let lastSentenceCheck = false;

        // looping over individual words in sentence
        // could use same index for sentence syllable list
        for (let j = 0; j < sentenceWordTagList.length; j++ ) {

            let sentenceWordTags = sentenceWordTagList[j]

            // initial wordpool shuffle
            let wordPool = helper.shuffleArr(words)

            // looping over all words in pool
            for (k = 0; k < wordPool.length; k++ ) {

                // shuffle wordpool after each search
                wordPool = helper.shuffleArr(words)
            
                let wordPoolText = wordPool[k].text
                let wordPoolTags = wordPool[k].tags[0]
                let wordPoolSyllables = wordPool[k].syllables
                let wordPoolProuncunciation = wordPool[k].pronounciation
                // should set up separate states for tags, syllables, pronounciation
                let existCheckTags = []
                let existStateTags = true

                // console.log(wordPoolText, wordPoolTags, wordPoolSyllables, wordPoolProuncunciation)

                // looping over words in wordpool and checking tags
                for (let l = 0; l < wordPoolTags.length; l++) {
                    let wordTag = wordPoolTags[l]
                    let arrayIncludes = sentenceWordTags.includes(wordTag)

                    if (arrayIncludes) {
                        existCheckTags.push(true);
                    } else {
                        existCheckTags.push(false)
                    }
                }

                // looping over array of matches, if all true, then overall value is true
                for (let e = 0; e < existCheckTags.length; e++) {
                    if (existCheckTags[e] === false) {
                        existStateTags = false
                    }
                }

                // if all tags match, push text
                if (existStateTags==true) {

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

        constructedSentence=helper.normalCase(constructedSentence) + helper.createPunctuation(lastSentenceCheck)  
    }

    return constructedSentence

    // end function here, return constructed sentence

}        

function textAnalyzer(sentences) {
    // start of function
    let wordList = [];
    let posObjArray = []
    let textList = [];

    for (let i = 0; i < sentences.length; i++) {

        let words = sentences[i].terms
        let posObj = {
            sentenceArr: [],
            syllableArr: []
        }
        let subPOSArray = []
        let subSyllableArray = []     

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

                wordObj.text = compText;
                wordObj.tags.push(compTags);
                wordObj.syllables = compSyllables
                wordObj.pronounciation = soundsLike;
                
                // check if word already exists
                if (textList.includes(compText) == false) {
                    textList.push(compText);
                    wordList.push(wordObj);
                } 

                subPOSArray.push(words[x].tags)
                subSyllableArray.push(compSyllables)
            }
        }

        // 2
        // push sentence arrays to larger text block arrays

        posObj.sentenceArr = subPOSArray;
        posObj.syllableArr = subSyllableArray
        posObjArray.push(posObj)
    }
    return {words:wordList, pos:posObjArray}

}

function whiteSpaceCreator(inputTextArr) {
    let spaceArray = helper.spaceArrayCreator(10)

    let spaceArrayPoint = 0;

    let textArr=inputTextArr;

    for (u = 0; u < textArr.length; u++){

        if (Math.random()>0.5){
            let spaceArrayChoice = spaceArray[spaceArrayPoint]
            if (spaceArrayPoint < spaceArray.length-1){
                spaceArrayPoint = spaceArrayPoint + 1;
            }

        else {
            spaceArrayPoint = 0;
            }
        textArr[u] = spaceArrayChoice;
        }
    }

    return textArr.join(" ").trim()
}


// markov




// blackout

module.exports = {substitutionCreator, textAnalyzer, whiteSpaceCreator }