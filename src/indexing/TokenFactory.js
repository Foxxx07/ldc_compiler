import keywords from "./keywords"
import Token from "./Token";

class TokenFactory {
    constructor() {
    }

    createToken(items, cursor){
        const char = items.charAt(0);

        switch (char) {
            case '\r': return new Token('line-break-r', '\r', cursor);
            case '\n': return new Token('line-break', '\n', cursor);
            case ' ' : return new Token('space', ' ', cursor);
            case '=' : return new Token('equal', '=', cursor);
            case ';' : return new Token('instruction-end', ';', cursor);
            case '.' : return new Token('dot', '.', cursor);
            case ',' : return new Token('comma', ',', cursor);
            case '(' : return new Token('parenthesis-start', '(', cursor);
            case ')' : return new Token('parenthesis-end', ')', cursor);
            case '[' : return new Token('bracket-start', '[', cursor);
			case ']' : return new Token('bracket-end', ']', cursor);
			case '{' : return new Token('curly-bracket-start', '{', cursor);
			case '}' : return new Token('curly-bracket-end', '}', cursor);
			case '|' : return new Token('pipe', '|', cursor);
			case '<' : return new Token('angle-bracket-start', '<', cursor);
            case '>' : return new Token('angle-bracket-end', '>', cursor);
            case '"':
				let sub_current = 1
				let sub_char = items.charAt(sub_current)
				var isString= false;
				while (sub_current < items.length) {
				  sub_char = items.charAt(sub_current)
				  if (sub_char === '"') {
                    sub_current++;
                    let token = new Token('string-declaration', items.substring(0, sub_current), cursor); 
                    //console.log(token);
                    return token;
				  }
				  sub_current++
				}
				if(!isString){
					return false;
				}
				break;
            
            default  :
                let token = this.checkKeywords(items);
               
                if (token) {
                    token.pos = cursor;
                   // console.log(token)
                    return token;
                } else if (char.match(/[aA-zZ]/)) {
                    let inc = 0;
                    let sub_char;
                    do {
                        sub_char = items.charAt(inc);
                        if (sub_char.match(/([aA-zZ]|[0-9])/) === null) {
                            token = new Token('identifier', items.substring(0,inc),cursor);
                           // console.log(token);
                            return token;
                        }
                        inc++;
                    } while(inc <= items.length);
                }
                break;
        }
    }

    checkKeywords(items){
        const keywordsKeys = Object.keys(keywords);
        for (let i = 0 ; i < keywordsKeys.length ; i++) {
            let currentKeyword = keywords[keywordsKeys[i]];
            if (!this.isToken(currentKeyword.r, items)) {
                return new Token(keywordsKeys[i],currentKeyword.s);
            }
        }
        return false;
    }
	
	isToken(tokenRegex, items) {
     
	  const match = items.match(tokenRegex)
	  return match === null ? -1 : match.index
	}
}

export default TokenFactory;