const StackUseCase = require('../../useCases/stackUseCase');

class StackController {
    constructor() {
        this.stackUseCase = new StackUseCase();
    }

    addToStack(req, res) {
        const { item } = req.body;
        if (!item) {
            return res.status(400).json({ error: 'Item is required' });
        }
        this.stackUseCase.addItem(item);
        return res.status(200).json({ message: `Item ${item} added to stack` });
    }

    getFromStack(req, res) {
        const item = this.stackUseCase.getItem();
        if (!item) {
            return res.status(404).json({ message: 'Stack is empty' });
        }
        return res.status(200).json({ item });
    }
}

module.exports = StackController;