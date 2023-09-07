#!/bin/bash -e

NEUTRALIZER=
COMMAND=ln

while [ $# -gt 0 ]; do
    case $1 in
        -c | --copy)
            COMMAND=cp
            ;;
        -d | --dry | --dry-run)
            NEUTRALIZER=echo
            ;;
        -h | --help)
            echo "Usage: $0 [--copy] [--dry-run]"
            exit 0
            ;;
        *)
            echo "Unknown parameter passed: $1"
            exit 1
            ;;
    esac
    shift
done

# Add more languages to the string below like...
# langs="es cat"
langs="es"
files=$(find src/pages -type f)

for lang in $langs
do
    files=$(echo "${files}" | grep -v "src/pages/$lang")
done

for lang in $langs
do
    if [ -d "src/pages/$lang" ]
    then
        $NEUTRALIZER rm -r "src/pages/$lang"
    fi

    for file in $files
    do
        local=$(echo "${file}" | sed s"@src/pages/@src/pages/$lang/@"g)
        echo $local
        $NEUTRALIZER mkdir -p $(dirname "${local}")
        $NEUTRALIZER $COMMAND "${file}" "${local}"
    done
done