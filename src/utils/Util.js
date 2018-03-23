class Util {
    constructor() {
    }

    countParenthesis(counterParentheses, data) {
        if(counterParentheses != 0){
            if(counterParentheses > 0){
                data.errs.push("Error you have not close your parenthesis at line :"+data.lines);
                data.score += 1;
            }else{
                data.errs.push("Error you haven not open your parenthesis at line :"+data.lines);
                data.score += 1;
            }
        }

        return data;
    }

    countCurlyBrackets(counterCurlyBrackets, data) {
        if(counterCurlyBrackets != 0){
            if(counterCurlyBrackets > 0){
                data.errs.push("Error you have not close your curly bracket at line :"+data.lines);
                data.score += 1;
            }else{
                data.errs.push("Error you haven not open your curly bracket at line :"+data.lines);
                data.score += 1;
            }
        }

        return data;
    }
}

export default Util;