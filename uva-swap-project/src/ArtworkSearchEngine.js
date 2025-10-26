class ArtworkSeachEngine {

    filterArtworks(artworks, filters) {
        return artworks.filter(artwork => { 
            const matchesCategory =
            !filters.category || artwork.category.toLowerCase() === filters.category.toLowerCase();

            const matchesKeyword = 
            !filters.keyword || artwork.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            artwork.description.toLowerCase().includes(filters.keyword.toLowerCase())
            
            const matchesCreationTime =
            !filters.creationTime || artwork.getCreationTime() === filters.creationTime;

            const matchesStatus =
                (filters.status === undefined || filters.status === null) ||
                artwork.getStatus() === filters.status;

            // Debug what’s happening with each item:
            console.log({
                artwork: artwork.title,
                matchesCategory,
                matchesKeyword,
                matchesCreationTime,
                matchesStatus
            });
                    
            return matchesCategory && matchesKeyword && (matchesCreationTime || matchesStatus);       
        });
    }
}
