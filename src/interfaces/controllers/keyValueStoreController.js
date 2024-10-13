const KeyValueStoreUseCase = require('../../useCases/keyValueStoreUseCase');

class KeyValueStoreController {
    constructor() {
        this.kvStoreUseCase = new KeyValueStoreUseCase();
    }

    addToKeyValueStore(req, res) {
        const { key, value, ttl } = req.body;
        if (!key || !value) {
            return res.status(400).json({ error: 'Key and value are required' });
        }
        this.kvStoreUseCase.addItem(key, value, ttl);
        return res.status(200).json({ message: `Key ${key} added with value ${value}` });
    }

    getFromKeyValueStore(req, res) {
        const { key } = req.params;
        const value = this.kvStoreUseCase.getItem(key);
        if (value === null) {
            return res.status(404).json({ message: 'Key not found or expired' });
        }
        return res.status(200).json({ key, value });
    }

    deleteFromKeyValueStore(req, res) {
        const { key } = req.params;
        this.kvStoreUseCase.deleteItem(key);
        return res.status(200).json({ message: `Key ${key} deleted` });
    }
}

module.exports = KeyValueStoreController;