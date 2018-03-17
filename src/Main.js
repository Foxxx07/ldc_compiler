#! /usr/bin/env node
'use strict';

import  Tokenizer from "./indexing/Tokenizer";

const fs = require('fs');
const args = process.argv;
let entryPoint = "";
if (args.length > 2) {
    entryPoint = args[2];
} else {
    console.log("Error : Must speficied an entry point");
}

if (fs.existsSync(entryPoint)){
    //console.log("Ok sa exist");
    let tokenizer = new Tokenizer();
    let tokens = tokenizer.tokenisation(fs.readFileSync(entryPoint,'utf8'));


} else {
    console.log("Error : Couldn't find the entry point : "+entryPoint);
}