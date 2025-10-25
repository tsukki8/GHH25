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
}