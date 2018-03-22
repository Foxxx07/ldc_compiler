import ExpressionFactory from "./ExpressionFactory";

class Parser {
    constructor() {
    }

    parse(tokens){
        var i = 0;
        while (tokens.length > 0){
            let currentToken = tokens[i];

            switch(currentToken.type) {
                case 'space':
                case 'line-break-r':
                case 'line-break':
                case 'console-object':
                case 'point':
                case 'parenthesis-start':
                case 'parenthesis-end':
                case 'identifier':
                case 'bracket-start':
                case 'bracket-end':
                case 'curly-bracket-start':
                case 'curly-bracket-end':
                case 'pipe':
                case 'angle-bracket-start':
                case 'angle-bracket-end':
                    continue;
                default:
                    let exp = new ExpressionFactory();
                    exp.createExpression(tokens,i);
                    i++;
            }
        }
    }
}

export default Parser;