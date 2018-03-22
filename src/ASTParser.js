import Expression from "./Expression.js";
import ExpressionFactory from ".parsing/ExpressionFactory.js";
import Token from "./Token";

export default class ASTParser{
	constructor(){
		this.ast = new Expression('Body');
		this.last_exp= this.ast;
	}
	
	static parse(tokens){
		let instance = new ASTParser();
		for(let cursor={position: 0}; cursor.position < tokens.length; cursor.position++){
			let current_token = tokens[cursor.position];
			switch(current_token.type){
				case 'space':
				case 'line-break-r':
				case 'line-break':
				case 'console-object':
				case 'point':
				case 'parenthesis-start':
				case 'parenthesis-end':
				case 'identifier':
				case'bracket-start':
				case'bracket-end':
				case'curly-bracket-start':
				case'curly-bracket-end':
				case'pipe':
				case'angle-bracket-start':
				case'angle-bracket-end':
				case'public-accessor':
				case'class':
					continue;
				default:
					let exp = ExpressionFactory.create(cursor, tokens);
					if(exp){
						instance.addExpToTree(exp);
					}else{
						throw `grammar error`
					}
					break;
			}
		}
		return instance.ast;
	}
	
	addExpToTree(exp){
		switch(exp.type){
			case 'ExpressionVarDeclaration':
			case 'ExpressionVarAssignation':
				this.last_exp.addChild(exp);
				break;
		}
	}
	
	
}