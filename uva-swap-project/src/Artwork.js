class Artwork {
    #status;
    #dateAdded;
    #creationTime;
    #requests;
    #ownerId;

    static creationTimeOptions = ["24", "1", "7", "30", "90", "365"];

    /*constructor(ownerId = null, status = true, creationTime = "", dateAdded = new Date().toISOString()) {
        this.#ownerId = ownerId;
        this.#requests = new Set();
        this.setStatus(status);
        this.setCreatimeTime(creationTime);
    }*/
    constructor({ 
        id, 
        title, 
        category, 
        description, 
        status = true, 
        creationTime = Date.now(), 
        user = {} 
    }) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.setStatus(status);
        this.setCreationTime(creationTime);
        this.user = user; // user object: { name, email, etc. }
        this.#requests = new Set();
        this.#dateAdded = new Date().toISOString();
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
        if (newStatus === true){
            this.#status = "Available"; 
        } else {
            this.#status = "Unavailable";
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
            throw new Error(`Size must be one of the following: ${Artwork.creationTime.join(', ')}.`);
        }
        hour = newCreationTime/24;
        switch(hour){
            case hour < 24:
                this.#creationTime = "Hours";
                break;
            case hour >= 24 && hour < 168:
                this.#creationTime = "Days";
                break;
            case hour >= 720 && hour < 2160:
                this.#creationTime = "Month";
                break;   
            case hour >= 2160 && hour < 25920:
                this.#creationTime = "3+ Months";
                break;                   
            case hour >= 25920:
                this.#creationTime = "Year+";
                break;     
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
            ownerId: this.#ownerId,
            status: this.#status,
            creationTime: this.#creationTime,
            dateAdded: this.#dateAdded,
            requests: Array.from(this.#requests)
        };
    }
}

export default Artwork;