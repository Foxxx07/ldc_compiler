import Data from "./Data";
import Util from "../utils/Util";
class ExpressionFactory {
    constructor(){
        this.data = new Data();
    }

    createExpression(tokens,pos){
        let currentToken = tokens[pos];
        let currentTokenType;
        if(typeof(currentToken) != "undefined"){
            currentTokenType = currentToken.type;
        }
        let util  = new Util();

        let i = pos;

        //i++;
        let nextToken ;

        switch(currentTokenType) {
            case "public-accessor" :
            case "private-accessor" :
            case "protected-accessor":
            case "static-element" :
            case "final-element" :

               // let i = pos;
                let counterAccessor = this.isAccesor(currentToken);
                let counterParentheses = 0;
                let counterCurlyBrackets = 0;
                let stopcounterAccessor = false;
                i++;
                //let nextToken ;
                this.data.expr.addChild(currentToken);
                while ( i < tokens.length ) {
                    nextToken = tokens[i];

                    if (!this.isSpace(nextToken)) {
                        counterAccessor += this.isAccesor(nextToken);
                        let index = this.data.expr.childs.findIndex( c => c.type === nextToken.type);
                        if (index != -1 && nextToken.type != "identifier") {
                            this.data.errs.push("Error multiple accessor "+nextToken.type+" at line :"+this.data.lines);
                            this.data.score = this.data.score - 2;
                        } else if (counterAccessor > 1 && !stopcounterAccessor){
                            this.data.errs.push("Error more than once accessor used at line :"+this.data.lines);
                            this.data.score = this.data.score - 2;
                            stopcounterAccessor = true;
                        } else if ( (nextToken.type == "instruction-end") || (nextToken.type == "curly-bracket-start")) {
                            this.data.inc = i;
                            this.data.expr.addChild(nextToken);
                            this.data = util.countParenthesis(counterParentheses,this.data);
                            if(nextToken.type == "curly-bracket-start"){
                                counterCurlyBrackets++;
                            }

                            return this.data;
                        } else if (nextToken.type == "line-break"){
                            this.data.setLines(this.data.lines+1);
                        } else if (nextToken.type == "parenthesis-start"){
                            counterParentheses++;
                        } else if (nextToken.type == "parenthesis-end"){
                            counterParentheses--;
                        }else if (nextToken.type == "line-break"){
                            this.data.setLines(this.data.lines+1);
                        } else if(nextToken.type == "main-element"){
                            if(tokens[i+1].type !=="parenthesis-start" || tokens[i+2].value !=="String[]"
                                || tokens[i+3].type !== "space" || tokens[i+4].type !== "identifier"
                                || tokens[i+5].type !== "parenthesis-end" ){
                                this.data.errs.push("Error your main element isn't well formed at line :"+this.data.lines);
                                this.data.score = this.data.score - 1;
                            }
                        } else {
                            this.data.inc = i;
                            this.data.expr.addChild(nextToken);
                        }
                    }
                    i++;
                }
                this.data.inc = i;
                return this.data;
            case "class":
                this.data.expr.addChild(currentToken);
                i++;
                while ( i < tokens.length ) {
                    nextToken = tokens[i];

                    if (!this.isSpace(nextToken)) {
                        //console.log(nextToken.type);

                        let index = this.data.expr.childs.findIndex( c => c.type === nextToken.type);
                       let identifier = this.data.expr.childs.findIndex( c => c.type === "identifier");

                        if (index != -1 && nextToken.type != "curly-bracket-start") {
                            this.data.errs.push("Error identifier is expected after class element at line :"+this.data.lines);
                            this.data.score = this.data.score - 2;
                        }else if ((nextToken.type == "curly-bracket-start")) {
                            this.data.inc = i;
                            this.data.expr.addChild(nextToken);
                            return this.data;
                        }else if(nextToken.type !== "curly-bracket-start" && identifier == 1){
                            this.data.errs.push("Error bracket start is expected after identifier in class element at line :"+this.data.lines);
                            this.data.score = this.data.score - 2;
                        } else{
                            this.data.inc = i;
                            this.data.expr.addChild(nextToken);
                        }
                    }
                    i++;
                }
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
        return token.type.match(/.*accessor/g) ? 1 : 0;
    }
}

export default ExpressionFactory;