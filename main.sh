#! /bin/bash

# variable examples
analyzeText="sample-txt.txt"
reconstructWords="sample-txt-words.json"
reconstructSentences="sample-txt-sentences.json"

if [ "$1" = "a" ] 
then
    # echo "route analyze"
    node main.js a $analyzeText
elif [ "$1" = "r" ]
then
    # echo "route reconstruct" 
    node main.js r $reconstructWords $reconstructSentences sub
elif [ "$1" = "b" ]
then
    # echo "route reconstruct" 
    node main.js r $analyzeText 70 blackout
elif [ "$1" = "i" ]
then
    # echo "route reconstruct" 
    mkdir data data/analyzed data/analyzed/words data/analyzed/sentences data/processed data/rawText
    touch test.js
else
    echo "Please indicate a valid route."
fi
