#!/bin/bash

if [[ "$1" == "check" ]]; then
        echo $@
elif [[ "$1" == "zip" ]]; then
	zip -r $2 ${@:3}
elif [[ "$1" == "7z" ]]; then
	7z a $2 ${@:3}
elif [[ "$1" == "tar" ]]; then
	tar -czf $2 ${@:3}
elif [[ "$1" == "bzip2" ]]; then
	tar -cjf $2 ${@:3}
fi
