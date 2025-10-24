#! /bin/bash

# variable examples
analyzeText="AsKar.txt"
reconstructWords="AsKar-words.json"
reconstructSentences="AsKar-sentences.json"

randomChar=$[ ( $RANDOM % 50 )  + 1 ]
randomLoop=$[ ( $RANDOM % 9 )  + 2 ]

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
    node main.js r blackout $analyzeText  10 _
elif [ "$1" = "m" ]
then
    # echo "route reconstruct" 
    node main.js r markov $analyzeText $randomChar $randomLoop
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
