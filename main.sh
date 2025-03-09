#! /bin/bash

# variable examples
analyzeText="AsKar.txt"
reconstructWords="AsKar-words.json"
reconstructSentences="AsKar-sentences.json"

if [ "$1" = "a" ] 
then
    # echo "route analyze"
    node main.js a $analyzeText
elif [ "$1" = "r" ]
then
    # echo "route reconstruct" 
    node main.js r $reconstructWords $reconstructSentences
else
    echo "Please indicate a valid route."
fi
