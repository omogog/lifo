const Stack = require('../entities/stack');

class StackUseCase {
    constructor() {
        this.stack = new Stack();
    }

    addItem(item) {
        this.stack.push(item);
    }

    getItem() {
        return this.stack.pop();
    }
}

module.exports = StackUseCase;