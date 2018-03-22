import Expression from "./Expression";

class Data {
    constructor(){
        this.expr = new Expression();
        this.errs = [];
        this.inc = 0;
        this.lines = 0;
    }

    setLines(lines){
        this.lines = lines;
    }

    countParenthesis(counterParentheses, data) {
        if(counterParentheses != 0){
            if(counterParentheses > 0){
                data.errs.push("Error you haven't close your parenthesis at line :"+data.lines);
            }else{
                data.errs.push("Error you haven't open your parenthesis at line :"+data.lines);
            }
        }
        
        return data;
    }
}

export default Data;