class Artwork {
    #status;
    #dateAdded;
    #creationTime;
    #requests;
    #ownerId;

    static creationTimeOptions = ["24", "1", "7", "30", "90", "365"];

    constructor({ 
        id, 
        title, 
        category, 
        description, 
        status = true, 
        creationTime = Date.now(), 
        image = null,
        ownerId = null,
        dateAdded = new Date().toISOString(),
        requests = [],
        user = {} 
    }) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.image = image;               // ✅ store image path
        this.#ownerId = ownerId;          // ✅ store ownerId
        this.setStatus(status);
        this.setCreationTime(creationTime);
        this.user = user;
        this.#requests = new Set(requests); // ✅ preserve requests from JSON
        this.#dateAdded = dateAdded;        // ✅ preserve dateAdded
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
        if (typeof newStatus === 'boolean') {
            this.#status = newStatus ? "Available" : "Unavailable";
        } else if (typeof newStatus === 'string') {
            const validStatuses = ["Available", "Unavailable"];
            if (!validStatuses.includes(newStatus)) {
                throw new Error(`Status must be one of the following: ${validStatuses.join(', ')}.`);
            } this.#status = newStatus;
        }else {
            throw new Error("Status must be a boolean or a valid status string.");
        }
    }

    getCreationTime() {
        return this.#creationTime;
    }

    setCreationTime(newCreationTime) {
        if (newCreationTime === null) {
            this.#creationTime = null;
            return;
        }
        if (!Artwork.creationTimeOptions.includes(newCreationTime)) {
            throw new Error(`Creation time must be one of the following: ${Artwork.creationTimeOptions.join(', ')}.`);
        }

        const numTime = parseInt(newCreationTime);

        switch (numTime) {
            case 24: this.#creationTime = "Hours"; break;
            case 1: this.#creationTime = "Days"; break;
            case 7: this.#creationTime = "Weeks"; break;
            case 30: this.#creationTime = "Month"; break;
            case 90: this.#creationTime = "3+ Months"; break;
            case 365: this.#creationTime = "Year+"; break;
        }
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

    hasRequests(userId) {
        return this.#requests.has(userId);
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            category: this.category,
            description: this.description,
            image: this.image,              // ✅ include image in output too
            ownerId: this.#ownerId,
            status: this.#status,
            creationTime: this.#creationTime,
            dateAdded: this.#dateAdded,
            requests: Array.from(this.#requests)
        };
    }
}

export default Artwork;
