class ArtworkSearchEngine {

    filterArtworks(artworks, filters) {
        return artworks.filter(artwork => { 
            const matchesCategory =
            !filters.category || artwork.category.toLowerCase() === filters.category.toLowerCase();

            const matchesKeyword = 
            !filters.keyword || artwork.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            artwork.description.toLowerCase().includes(filters.keyword.toLowerCase())
            
            const matchesCreationTime =
            !filters.creationTime || artwork.getCreationTime() === filters.creationTime;

            let matchesStatus = true
            if (filters.status !== undefined && filters.status !== null) {
                matchesStatus = artwork.getStatus() === filters.status;
            }
            
            return matchesCategory && matchesKeyword && (matchesCreationTime || matchesStatus);       
        });
}
}
