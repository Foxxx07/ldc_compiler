class Token {
    constructor(type, value = null, pos = null ) {
        this.type = type;
        this.value = value;
        this.pos = pos;
    }
}

export default Token;