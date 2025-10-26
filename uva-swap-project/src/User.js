class User{
    constructor({
    id,
    username,
    email,
    passwordHash,
    name = "",
    pfp = "",
    bio = "",
    phoneNum = "",
    rating = 0,})
    {
    this.id = id;
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.name = name;
    this.pfp = pfp;
    this.bio = bio;
    this.phoneNum = phoneNum;
    this.rating = rating;

    this.listings = [];       // items user listed for swapping
    this.requests = [];        // saved for purchase
    this.swaps = [];          // swap history
    this.reviews = [];        // 
    }

    addListing(item){
        item.setOwner(this)
        if (!this.listings.includes(item)){
            this.listings.push(item);
        }
    } // add item to user's listings and also establishes a connection saying this is the owner

    requestItem(item){
        item.addRequest(this.id);
        if (!this.requests.includes(item)){
            this.requests.push(item);
        }
    } // this can record a user wants this item and updates the item's request list

    removeRequest(item){
        item.removeRequest(this.id);
        this.requests = this.requests.filter((reqItem) => reqItem !== item);
    } //cancles the request both in user and item

    completeSwap(item, otherUser){
        this.listings = this.listings.filter((listedItem) => listedItem !== item);
        this.requests = this.requests.filter((reqItem) => reqItem !== item);
        //these remove the item from current listings and requests

        otherUser.listings = otherUser.listings.filter((listedItem) => listedItem !== item);
        otherUser.requests = otherUser.requests.filter((reqItem) => reqItem !== item);
        //these remove the item from other user's current listings and requests
        
        this.swaps.push(item.ownerId);
        otherUser.swaps.push(this.id);
        //add each other to swap history

    }

}