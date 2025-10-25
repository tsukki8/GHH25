class Clothes {
    #status;
    #size;
    #condition;
    #requests;
    #ownerId;

    static sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
    static conditions = ['new', 'excellent', 'good', 'fair', 'poor'];

    constructor(ownerId = null, status = true, size = null, condition = null) {
        this.#ownerId = ownerId;
        this.#requests = new Set();
        this.setStatus(status);
        this.setSize(size);
        this.setCondition(condition);
    }

    getOwnerId() {
        return this.#ownerId;
    }

    getStatus() {
        return this.#status;
    }
    
    isAvailable() {
        return !!this.#status;
    }

    setStatus(newStatus) {
        if (typeof newStatus !== 'boolean') {
            throw new Error('Status must be a boolean value.');
        }
        this.#status = newStatus;
    }

    getSize() {
        return this.#size;
    }
    setSize(newSize) {
        if (newSize === null) {
            this.#size = null;
            return;
        }
        if (!Clothes.sizes.includes(newSize)) {
            throw new Error(`Size must be one of the following: ${Clothes.sizes.join(', ')}.`);
        }
        this.#size = newSize;
    }
    getCondition() {
        return this.#condition;
    }
    setCondition(newCondition) {
        if (newCondition == null) {
            this.#condition = null;
            return;
        }
        if (!Clothes.conditions.includes(newCondition)) {
            throw new Error(`Condition must be one of the following: ${Clothes.conditions.join(', ')}.`);
        }
              
        this.#condition = newCondition;
    }

    addRequest(userId) {
        this.#requests.add(userId);
    }

    removeRequest(userId) {
        this.#requests.delete(userId);
    }

    hasRequests() {
        return this.#requests.has(userId);
    }

    filterBySize(filterSize) {
        if (!filterSize || filterSize === 'ALL') {
            return true;
        }
        return this.#size === filterSize;
    }

    toJSON() {
        return {
            ownerId: this.#ownerId,
            status: this.#status,
            size: this.#size,
            condition: this.#condition,
            requests: Array.from(this.#requests),
        };
    }

}