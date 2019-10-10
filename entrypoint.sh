#!/bin/bash

if [[ "$1" == "check" ]]; then
        echo $@
        echo "$INPUT_FILES"
        echo "$INPUT_NAME"
elif [[ "$1" == "zip" ]]; then
	zip -r $INPUT_NAME $INPUT_FILES

elif [[ "$1" == "7z" ]]; then
	7z a $2 ${@:3}
elif [[ "$1" == "tar" ]]; then
	tar -czf $2 ${@:3}
elif [[ "$1" == "bzip2" ]]; then
	tar -cjf $2 ${@:3}
fi
