import ExpressionFactory from "./ExpressionFactory";
import Data from "./Data";

class Parser {
    constructor() {
        this.data = new Data();
    }

    parse(tokens){
        let i = 0;
        let lines = 1;
        let score = 0;
        while( i <= tokens.length) {
            let currentToken = tokens[i];
            let tokenType;
            if(typeof(currentToken) != "undefined"){
                tokenType = currentToken.type;
            }
            switch(tokenType) {
                case 'space':
                case 'line-break-r':
                case 'console-object':
                case 'dot':
                //  case 'parenthesis-start':
                //case 'parenthesis-end':
                case 'identifier':
                case 'bracket-start':
                case 'bracket-end':
                case 'curly-bracket-start':
                case 'curly-bracket-end':
                case 'pipe':
                case 'angle-bracket-start':
                case 'angle-bracket-end':
                    break;
                case 'line-break':
                    lines++;
                    break;
                default:
                    let expressionFactory = new ExpressionFactory();
                    expressionFactory.data.lines = lines;
                    expressionFactory.data.score = score;

                    let data = expressionFactory.createExpression(tokens,i);

                    if (data.errs.length > 0){
                        this.data.errs.push(data.errs);
                        this.data.score = this.data.score - (data.score);
                    }
                    i = data.inc;
                    break;
            }
            i++;
        }
    }

    /*score(data){
        console.log("---------Score---------\n");

        console.log(data.score + "/20");
    }*/
}

export default Parser;