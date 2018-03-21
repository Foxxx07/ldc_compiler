class Expression {
	constructor(firstToken= null) {
		this.childs = [];
	}
	
	addChild(expression){
		this.childs.push(expression);
	}
}

export default Expression;