#!/bin/sh -l

if [ "$1" == "zip" ]
	zip -r $2 ${@:3}
elif [ "$1" == "7z" ]
	7z a $2 ${@:3}
elif [ "$1" == "tar" ]
	tar -czf $2 ${@:3}
elif [ "$1" == "bzip2" ]
	tar -cjf $2 ${@:3}
fi
