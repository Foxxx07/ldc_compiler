import Expression from "./Expression";
import Data from "./Data";
import Util from "../utils/Util";
 class ExpressionFactory {
    constructor(){
        this.data = new Data();
        let util  = new Util();
    }

    createExpression(tokens,pos){
        let currentToken = tokens[pos];
        let currentTokenType = currentToken.type;
        switch(currentTokenType) {
            case "public-accessor" :
            case "private-accessor" :
            case "protected-accessor":
            case "static-element" :
            case "final-element" :

                let i = pos;
                let counterAccessor = this.isAccesor(currentToken);
                let counterParentheses = 0;
                let stopcounterAccessor = false;
                i++;
                let nextToken ;
                this.data.expr.addChild(currentToken);
                while ( i < tokens.length ) {
                    nextToken = tokens[i];

                    if (!this.isSpace(nextToken)) {
                        counterAccessor += this.isAccesor(nextToken);
                        let index = this.data.expr.childs.findIndex( c => c.type === nextToken.type);
                        if (index != -1) {
                            this.data.errs.push("Error multiple accessor "+nextToken.type+" at line :"+this.data.lines);
                        } else if (counterAccessor > 1 && !stopcounterAccessor){
                            this.data.errs.push("Error more than once accessor used at line :"+this.data.lines);
                            stopcounterAccessor = true;
                        } else if ( (nextToken.type == "instruction-end") || (nextToken.type == "curly-bracket-start")) {
                            this.data.inc = i;
                            this.data.expr.addChild(nextToken);
                          //  console.log(counterParentheses + "counterParenthesis")

                          this.data = util.countParenthesis(counterParentheses,this.data);
                          //this.data.countParenthesis(counterParentheses,this.data);

                            return this.data;
                        } else if (nextToken.type == "line-break"){
                            this.data.setLines(this.data.lines+1);
                        } else if (nextToken.type == "parenthesis-start"){
                            counterParentheses++;
//console.log("nb parenthesis : " + counterParentheses);

                        } else if (nextToken.type == "parenthesis-end"){
                            counterParentheses--;
                           // console.log("nb parenthesis : " + counterParentheses);

                        }else if (nextToken.type == "line-break"){
                            this.data.setLines(this.data.lines+1);
                        } else {
                                this.data.inc = i;
                                this.data.expr.addChild(nextToken);
                        }

                       // console.log(nextToken.type );
                    }
                    i++;
                }
                this.data.inc = i;
                return this.data;
            default :
                this.data.expr.addChild(currentToken);
                this.data.inc = pos+1;
                return this.data;
        }
    }

    isSpace(token){
        return token.type == "space";
    }

    isAccesor(token){
        return token.type.match(/.*accessor/g) ? 1 : 0 ;
    }
}

export default ExpressionFactory;