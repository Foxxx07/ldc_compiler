import Expression from "./Expression";

 class ExpressionFactory {
    constructor(){
        this.expr = new Expression();
    }

      createExpression(tokens, positionCurrentToken){
        let currentToken = tokens[positionCurrentToken];
        var errorMsg = [];

        switch(currentToken.type){
            case 'public-accessor':
            case 'private-accessor':
            case 'final-element':
            case 'static-element':
                if (this.expr.childs.length > 0){
                    // console.log("bonjour");
                    if (this.expr.childs.indexOf(currentToken.type) != -1){
                        errorMsg.push({
                            name : "Can't specified "+currentToken.type+" more than once.",
                            pos : positionCurrentToken
                        });

                        /*errorMsg["name"] = "Can't specified "+currentToken.type+" more than once.";
                        errorMsg["position"] = positionCurrentToken;*/

                        // console.log('Can\'t specified '+currentToken.type+' more than once.');
                        return;
                    } else if (this.expr.childs.length == 3) {
                        // console.log("hahai");
                        //console.log("Error : uncorrect number of elements : ");
                        errorMsg.push({
                            name : "Error : uncorrect number of elements : (Max 3)",
                            pos : positionCurrentToken
                        });
                        break;
                    } else {
                        // console.log("hoho");
                        this.expr.addChild(currentToken.type);
                    }
                } else {
                    this.expr.addChild(currentToken.type);
                }
                // console.log( this.expr.childs.length)
                // console.log( this.expr.childs)

                positionCurrentToken++;
                let nextToken = tokens[positionCurrentToken];
                if (nextToken.type != "space") {
                    //console.log( "You must specified a space after a "+currentToken.type);
                    errorMsg.push({
                        name : "You must specified a space after a "+currentToken.type,
                        pos : positionCurrentToken
                    });
                }
                positionCurrentToken++;
                this.createExpression(tokens,positionCurrentToken);
            case 'class':
                // console.log("pika");
                positionCurrentToken++;
                this.createExpression(tokens,positionCurrentToken);
            default:
                console.log("default"); break;
            
        }
    }
}

export default ExpressionFactory;