#!/bin/bash

if [[ "$INPUT_ARCHIVER" == "debug" ]]; then
        echo "$INPUT_ARCHIVER"
        echo "$INPUT_FILES"
        echo "$INPUT_NAME"
elif [[ "$INPUT_ARCHIVER" == "zip" ]]; then
	zip -r $INPUT_NAME $INPUT_FILES
elif [[ "$INPUT_ARCHIVER" == "7z" ]]; then
	7z a $INPUT_NAME $INPUT_FILES
elif [[ "$INPUT_ARCHIVER" == "tar" ]]; then
	tar -czf $INPUT_NAME $INPUT_FILES
elif [[ "$INPUT_ARCHIVER" == "bzip2" ]]; then
	tar -cjf $INPUT_NAME $INPUT_FILES
else
        echo "unkown archiver: $INPUT_ARCHIVER"
        exit 1
fi
