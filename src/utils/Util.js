class Util {
    constructor() {
    }

     countParenthesis(counterParentheses, data) {
        if(counterParentheses != 0){
            if(counterParentheses > 0){
                data.errs.push("Error you haven't close your parenthesis at line :"+data.lines);
                data.score = data.score - 1;
            }else{
                data.errs.push("Error you haven't open your parenthesis at line :"+data.lines);
                data.score = data.score - 1;
            }
        }
        
        return data;
    }

     countCurlyBrackets(counterCurlyBrackets, data) {
        if(counterCurlyBrackets != 0){
            if(counterCurlyBrackets > 0){
                data.errs.push("Error you haven't close your curly bracket at line :"+data.lines);
                data.score = data.score - 1;
            }else{
                data.errs.push("Error you haven't open your curly bracket at line :"+data.lines);
                data.score = data.score - 1;
            }
        }

        return data;
    }
}

export default Util;