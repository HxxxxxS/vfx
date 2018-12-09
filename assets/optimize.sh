#!/bin/bash

if [ "$(which gifsicle 2>/dev/null)" == '' ]; then
    echo "This script requires https://www.lcdf.org/gifsicle, please download and try again."
    exit 1
fi

i=$(ls -1 img/*.gif | wc -l)

for f in *.gif; do
    i=$(($i+1))
    gifsicle -v -b -O2 --colors=64 --use-col=web --resize-fit-width 500 "$f"
    mv "$f" "img/$i.gif"
done

echo "All gifs imported and optimized. Change gifcount to $i"
