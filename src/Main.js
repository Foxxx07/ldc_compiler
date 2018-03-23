#! /usr/bin/env node
'use strict';

import  Tokenizer from "./indexing/Tokenizer";
import Parser from "./parsing/Parser";

const fs = require('fs');
const args = process.argv;
let entryPoint = "";
if (args.length > 2) {
    entryPoint = args[2];
} else {
    console.log("Error : Must speficied an entry point");
}

if (fs.existsSync(entryPoint)){
    let tokenizer = new Tokenizer();
    let tokens = tokenizer.tokenisation(fs.readFileSync(entryPoint,'utf8'));
    fs.closeSync;
    console.log("---------TOKENS---------\n");
    console.log(tokens);
    console.log("---------END TOKENS-----\n");
    let parser = new Parser();

    parser.parse(tokens);
    if (parser.data.errs.length > 0){
        console.log("---------ERRORS---------");
        for (var j in parser.data.errs){
            console.log(parser.data.errs[j]);
        }
        console.log("---------END ERRORS-----\n");
    }

    let score = parser.data.score;
    console.log("---------SCORE---------");
    if(score == 20){
        console.log("Votre score est de : " + score +"/20 félicitation ! Votre code est parfait, il n'y a rien à dire");
    }else if(score >= 15 && score <= 20){
        console.log("Votre score est de : " + score +"/20 bien joué ! Vous pouvez vous améliorer ");
    }else if(score >= 10 && score <= 15){
        console.log("Votre score est de : " + score +"/20 encore un petit effort");
    }else{
        if(score < 0){
            score = 0;
        }
        console.log("Votre score est de : " + score +"/20 vous pouvez changer de langage ");
    }
    console.log("---------END SCORE-----\n");

} else {
    console.log("Error : Couldn't find the entry point : "+entryPoint);
}