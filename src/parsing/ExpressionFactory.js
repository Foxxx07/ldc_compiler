import Expression from "./Expression";

 class ExpressionFactory {
    constructor(){
        this.expr = new Expression();
    }

      createExpression(tokens, positionCurrentToken){
        let currentToken = tokens[positionCurrentToken];
        
        switch(currentToken.type){
            case 'public-accessor':
            case 'private-accessor':
            case 'final-element':
            case 'static-element':
                if (this.expr.childs.length > 0){
                    if (this.expr.childs.indexOf(currentToken.type) != -1){
                        console.log('Can\'t specified '+currentToken.type+' more than once.');
                        return;
                    } else if (this.expr.childs.length >= 3) {
                        throw "Error : uncorrect number of elements : ";   
                    } else {
                        this.expr.addChild(currentToken.type);
                    }
                } else {
                    this.expr.addChild(currentToken.type);
                }
                console.log( this.expr.childs.length > 0)
                console.log( this.expr.childs.length)

                positionCurrentToken++;
                let nextToken = tokens[positionCurrentToken];
                if (nextToken.type != "space") {
                    throw "You must specified a space after a "+currentToken.type;
                }
                positionCurrentToken++;
                this.createExpression(tokens,positionCurrentToken);
            case 'class':
            console.log("pika");
            break;
            
        }
    }
}

export default ExpressionFactory;