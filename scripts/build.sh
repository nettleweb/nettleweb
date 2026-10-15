#!/bin/bash
baseDir=$(dirname $(realpath -s $0))/..

cd $baseDir
rm -rf out
set -e

if ! [ -e node_modules ]; then
	npmExec=bun

	if ! which $npmExec; then
		npmExec=npm #fallback
	fi

	$npmExec update -g
	$npmExec install
fi

rm -rf "./node_modules/@types/node"
cd $baseDir/src/ && webpack; cd $baseDir
cp -fl out/out.js static/main.js
