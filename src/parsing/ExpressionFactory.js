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
        let nextToken ;

        switch(currentTokenType) {
            case "public-accessor" :
            case "private-accessor" :
            case "protected-accessor":
            case "static-element" :
            case "final-element" :

                let counterAccessor = this.isAccesor(currentToken);
                let counterParentheses = 0;
                let counterCurlyBrackets = 0;
                let stopcounterAccessor = false;
                i++;
                this.data.expr.addChild(currentToken);
                while ( i < tokens.length ) {
                    nextToken = tokens[i];

                    if (!this.isSpace(nextToken)) {
                        counterAccessor += this.isAccesor(nextToken);
                        let index = this.data.expr.childs.findIndex( c => c.type === nextToken.type);
                        if (index != -1 && nextToken.type != "identifier" && counterAccessor < 1) {
                            if(this.data.errs.indexOf("Error multiple accessor "+nextToken.type+" at line :"+this.data.lines) === -1) {
                                this.data.errs.push("Error multiple accessor " + nextToken.type + " at line :" + this.data.lines);
                            }
                            this.data.score += 2;
                        } else if (counterAccessor > 1 && !stopcounterAccessor){
                            if(this.data.errs.indexOf("Error the accessor has been used more than once at line :"+this.data.lines) === -1) {
                                this.data.errs.push("Error the accessor has been used more than once at line :" + this.data.lines);
                            }
                            this.data.score += 2;
                            stopcounterAccessor = true;
                        }else if (index !== -1){
                            if(this.data.errs.indexOf("Error more than one " + nextToken.type + " at line :"+this.data.lines) === -1){
                                this.data.errs.push("Error more than one " + nextToken.type + " at line :"+this.data.lines);
                            }
                            this.data.score += 2;
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
                            if(tokens[i+1].type !=="parenthesis-start" || tokens[i+2].type !=="string-tab-declaration"
                                || tokens[i+3].type !== "space" || tokens[i+4].type !== "identifier"
                                || tokens[i+5].type !== "parenthesis-end" ){
                                this.data.errs.push("Error your main element is not well formed at line :"+this.data.lines);
                                this.data.score += 1;
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
                        let index = this.data.expr.childs.findIndex( c => c.type === nextToken.type);
                        let identifier = this.data.expr.childs.findIndex( c => c.type === "identifier");

                        if(index != -1 && nextToken.type != "curly-bracket-start") {
                            if (identifier) {
                                if(this.data.errs.indexOf("Error Can't have multiple identifier at line :"+this.data.lines) === -1) {
                                    this.data.errs.push("Error Can't have multiple identifier at line :" + this.data.lines);
                                }
                            } else {
                                this.data.errs.push("Error identifier is expected after class element at line :" + this.data.lines);
                            }
                            this.data.score += 2;
                        }else if ((nextToken.type == "curly-bracket-start")) {
                            this.data.inc = i;
                            this.data.expr.addChild(nextToken);
                            return this.data;
                        }else if(nextToken.type !== "curly-bracket-start" && identifier == 1){
                            this.data.errs.push("Error bracket start is expected after identifier in class element at line :"+this.data.lines);
                            this.data.score += 2;
                        }else{
                            this.data.inc = i;
                            this.data.expr.addChild(nextToken);
                        }
                    }
                    i++;
                }
                break;
            /*case "console-object":
                this.data.expr.addChild(currentToken);
                i++;
                while (i < tokens.length ) {
                    nextToken = tokens[i];

                    if (!this.isSpace(nextToken)) {
                        let index = this.data.expr.childs.findIndex( c => c.type === nextToken.type);
                        let identifier = this.data.expr.childs.findIndex( c => c.type === "identifier");

                        if(nextToken.type != "dot") {
                            this.data.errs.push("Error need dot after System at line :" + this.data.lines);
                        }else if(tokens[i+1].type !=="identifier" || tokens[i+2].type !=="dot"
                            || tokens[i+3].type !== "identifier" || tokens[i+4].type !== "parenthesis-start") {

                            while()
                            /!*if (identifier) {
                                this.data.errs.push("Error Can't have multiple identifier at line :" + this.data.lines);
                            } else {
                                this.data.errs.push("Error identifier is expected after class element at line :" + this.data.lines);
                            }
                            this.data.score += 2;*!/
                        }


                        }else if ((nextToken.type == "curly-bracket-start")) {
                            this.data.inc = i;
                            this.data.expr.addChild(nextToken);
                            return this.data;
                        }else if(nextToken.type !== "curly-bracket-start" && identifier == 1){
                            this.data.errs.push("Error bracket start is expected after identifier in class element at line :"+this.data.lines);
                            this.data.score += 2;
                        }else{
                            this.data.inc = i;
                            this.data.expr.addChild(nextToken);
                        }
                    }
                    i++;
                }
                break;*/
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