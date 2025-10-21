#! /bin/bash

# variable examples
analyzeText="sample-txt.txt"
reconstructWords="sample-txt-words.json"
reconstructSentences="sample-txt-sentences.json"

# const processRoute = process.argv[2]
# const reconstructSubRoute = process.argv[3]
# const inputName = process.argv[4]
# const firstArg = process.argv[5]
# const secondArg = process.argv[6]

if [ "$1" = "a" ] 
then
    echo "route analyze"
    node main.js a x $analyzeText
elif [ "$1" = "r" ]
then
    # echo "route reconstruct" $
    # node main.js r sub $reconstructWords $reconstructSentences 
    node main.js r sub $reconstructWords $reconstructSentences
elif [ "$1" = "b" ]
then
    # echo "route reconstruct" 
    node main.js r blackout $analyzeText 50 _
elif [ "$1" = "m" ]
then
    # echo "route reconstruct" 
    node main.js r markov $analyzeText 50 5
elif [ "$1" = "w" ]
then
    # echo "route reconstruct" 
    node main.js r whitespace $analyzeText false x
elif [ "$1" = "i" ]
then
    # echo "route reconstruct" 
    mkdir data data/analyzed data/analyzed/words data/analyzed/sentences data/processed data/rawText
    touch test.js
else
    echo "Please indicate a valid route."
fi
