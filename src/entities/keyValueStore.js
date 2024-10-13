class KeyValueStore {
    constructor() {
        this.store = new Map();
    }

    set(key, value, ttl = null) {
        const expireAt = ttl ? Date.now() + ttl * 1000 : null;
        this.store.set(key, { value, expireAt });
    }

    get(key) {
        const entry = this.store.get(key);
        if (!entry) return null;

        const { value, expireAt } = entry;
        if (expireAt && Date.now() > expireAt) {
            this.store.delete(key); // Automatically delete expired key
            return null;
        }

        return value;
    }

    delete(key) {
        return this.store.delete(key);
    }

    exists(key) {
        return this.store.has(key);
    }
}

module.exports = KeyValueStore;