class Artwork {
    #status;
    #dateAdded;
    #creationTime;
    #requests;
    #ownerId;

    static creationTimeOptions = ["24", "1", "7", "30", "90", "365"];

    constructor(
        ownerId = null,
        status = true,
        creationTime = "7",
        dateAdded = new Date().toISOString()
    ) {
        this.#ownerId = ownerId;
        this.#requests = new Set();

        this.setStatus(status);
        this.setCreationTime(creationTime);
        this.setDateAdded(dateAdded);
    }

    constructor(ownerId = null, status = true, creationTime = "", dateAdded = new Date().toISOString()) {
        this.#ownerId = ownerId;
        this.#requests = new Set();
        this.setStatus(status);
        this.setCreatimeTime(creationTime);
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

    getDateAdded() {
        return this.#dateAdded;
    }
    setDateAdded(date) {
        const parsed = new Date(date);
        if (isNaN(parsed.getTime())) {
            throw new Error("Invalid date format.");
        }
        this.#dateAdded = parsed.toISOString();
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
            creationTime: this.#creationTime,
            dateAdded: this.#dateAdded,
            requests: Array.from(this.#requests)
        };
    }
}

export default Artwork;