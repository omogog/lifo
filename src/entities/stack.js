class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        return this.items.length > 0 ? this.items.pop() : null;
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

module.exports = Stack;