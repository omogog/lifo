const KeyValueStore = require('../entities/keyValueStore');

class KeyValueStoreUseCase {
    constructor() {
        this.kvStore = new KeyValueStore();
    }

    addItem(key, value, ttl) {
        this.kvStore.set(key, value, ttl);
    }

    getItem(key) {
        return this.kvStore.get(key);
    }

    deleteItem(key) {
        this.kvStore.delete(key);
    }
}

module.exports = KeyValueStoreUseCase;