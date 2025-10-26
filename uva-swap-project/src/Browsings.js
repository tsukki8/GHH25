import React from "react"; 
import artworks from 'listings.json';

function Browsings() {
    return (
        <div className = "browsingFeed">
            {artworks.map((artwork) => (
                <div key={artwork.id} className = "artworkItem">
                    <img src={artwork.image} alt={artwork.title} />
                    <h3>{artwork.title}</h3>
                    <p>{artwork.description}</p>
                </div>
            ))}
        </div>
    );
}
export default Browsings;