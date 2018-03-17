import TokenFactory from "./TokenFactory";

class Tokenizer {

    constructor() {
        this.tokenFactory = new TokenFactory();
        this.tokens = [];
        this.cursor = 0;
    }

    tokenisation(file_in) {
        let items ;
        let debugInc = 0;
        do {
            items = file_in.substring(this.cursor);
            this.addToken(items);
            debugInc++;
        } while(item.length > 0 && debugInc < 2) ;
    }

    addToken(items){
        let token = this.tokenFactory.createToken(items,this.cursor);
    }
}

export default Tokenizer;