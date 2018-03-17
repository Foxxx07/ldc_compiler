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
            case '(' : return new Token('parenthesis-start', '\r', cursor);
            case ')' : return new Token('parenthesis-end', '\r', cursor);
            case '[' : return new Token('bracket-start', '[', cursor);
			case ']' : return new Token('bracket-end', ']', cursor);
			case '{' : return new Token('curly-bracket-start', '{', cursor);
			case '}' : return new Token('curly-bracket-end', '}', cursor);
			case '|' : return new Token('pipe', '|', cursor);
			case '<' : return new Token('angle-bracket-start', '<', cursor);
            case '>' : return new Token('angle-bracket-end', '>', cursor);
            
            default  : 
                break;
        }
    }
}

export default TokenFactory;