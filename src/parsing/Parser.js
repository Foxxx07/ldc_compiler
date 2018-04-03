import ExpressionFactory from "./ExpressionFactory";

class Parser {
    constructor() {
        
    }

    parse(tokens){
        let i = 0;
        let lines = 1;
        while( i <= tokens.length) {
           // console.log(tokens.length)
            let currentToken = tokens[i];
            let tokenType = currentToken.type;
           // console.log(currentToken);
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
                    //console.log("LINES  = "+ lines)
                    let expressionFactory = new ExpressionFactory();
                    expressionFactory.data.lines = lines;
                    let data = expressionFactory.createExpression(tokens,i);
                    //console.log(data);
                    // console.log("inc = "+data.inc)
                    //console.log("token length = "+tokens.length)
                    // console.log(data.expr.childs);
                    if (data.errs.length > 0){
                        for (var j in data.errs){
                            console.log(data.errs[j]);
                        }
                        console.log("\n");
                    }
                   
                    i = data.inc;
                    //console.log("i = "+i);
                    break;
            }
            i++;
        }
    }
}

export default Parser;