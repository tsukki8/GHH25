import Artwork from "./Artwork.js";
import listings from "./listings.json" assert { type: "json" };
import users from "./users.json" assert { type: "json" };

export const artworks = listings.map(item => {
    const art = new Artwork({
        id: item.id,
        title: item.title,
        category: item.category,
        description: item.description,
        status: item.status,
        creationTime: item.creationTime,
        user: users.users.find(u => u.id === item.ownerId)
    });

    return art;
});
