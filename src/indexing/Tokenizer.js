import TokenFactory from "./TokenFactory";

class Tokenizer {

    constructor() {
        this.tokenFactory = new TokenFactory();
        this.tokens = [];
        this.cursor = 0;
    }

    tokenisation(file_in) {
        let items ;
        do {
            items = file_in.substring(this.cursor);
            this.addToken(items);
        } while(items.length > 0 ) ;
        return this.tokens;
    }

    addToken(items){
        let token = this.tokenFactory.createToken(items,this.cursor);
        if (token) {
            switch(token.type){
                case 'line-break':
                    this.cursor_y += 1
                    this.cursor_x = 1
                    this.cursor++
                    this.tokens.push(token);
                    break;
                case 'line-break-r': 
                case 'space':
                case 'equal':
                case 'instruction-end':
                case 'dot':
                case 'virgule':
                case 'parenthesis-start':
                case 'parenthesis-end':
                case 'curly-bracket-end':
                case 'curly-bracket-start':
                this.tokens.push(token);
                    this.cursor++
                    break;
                default:
                this.tokens.push(token);
                this.cursor+= token.value.length;
         }
        
        }
       

        //console.log(token);
    }
}


export default Tokenizer;