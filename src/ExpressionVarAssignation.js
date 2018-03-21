import Expression from "./Expression.js";

export default class ExpressionVarAssignation extends Expression{
	
	constructor(token_identifier, token_value){
		if(token_identifier.type!="identifier"){
			throw 'You have to put an valid identifier for a variable assignation';
		}
		super("ExpressionVarAssignation");
		this.variableName= token_identifier.value;
		switch(token_value.type){
			case 'string-declaraction':
			case 'char-declaraction':
			case 'double-declaraction':
			case 'int-declaraction':
			case 'byte-declaraction':
			case 'boolean-declaraction':
			case 'number':
			case 'number-float':
				this.variableValue= token_value;
				break;
			default:
				throw 'You have to assigne a know type to variable ';
		}
	}
}

