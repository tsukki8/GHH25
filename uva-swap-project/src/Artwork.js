class Artwork {
    #status;
    //#size;
    //#condition;
    #creationTime;
    #requests;
    #ownerId;

    //static sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
    //static conditions = ['new', 'excellent', 'good', 'fair', 'poor'];

    constructor(ownerId = null, status = true) {
        this.#ownerId = ownerId;
        this.#requests = new Set();
        this.setStatus(status);
        //this.setSize(size);
        //this.setCondition(condition);
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

    getCreationTime() {
        return this.#creationTime;
    }
    setCreationTime(newCreationTime) {
        if (newCreationTime === null) {
            this.#creationTime = null;
            return;
        }
        if (!Artwork.sizes.includes(newCreationTime)) {
            throw new Error(`Size must be one of the following: ${Artwork.creationTime.join(', ')}.`);
        }
        this.#creationTime = newCreationTime;
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

    toJSON() {
        return {
            ownerId: this.#ownerId,
            status: this.#status,
            //size: this.#size,
            //condition: this.#condition,
            requests: Array.from(this.#requests),
        };
    }
}