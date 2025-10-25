class ClothesSearchEngine {
    constructor(clothesArray) {
        this.clothesArray = clothesArray; // Array of Clothes objects
    }

    categoryFilter(categoryId) {
        return this.clothesArray.filter(clothes => items.categoryId === categoryId);

    }

    conditionFilter(condition) {
        return this.clothesArray.filter(clothes => clothes.getCondition() === condition);
    }

    sizeFilter(size) {
        return this.clothesArray.filter(clothes => clothes.getSize() === size);
    }

    nameFilter(name) {
        return this.clothesArray.filter(clothes => clothes.name.toLowerCase().includes(name.toLowerCase()));
    }

    combinedFilter({ categoryId = null, condition = null, size = null } = {}) {
        let filteredClothes = [];

        for (let i = 0; i < this.clothesArray.length; i++) {
            let clothes = this.clothesArray[i];
            let matchCategory = true;
            let matchCondition = true;
            let matchSize = true;

            if (filter.categoryId) {
                matchCategory = clothes.getCategoryId() === filters.categoryId;
            }

            if (filter.condition) {
                matchCondition = clothes.getCondition() === filters.condition;
            }

            if (filter.size) {
                matchSize = clothes.getSize() === filters.size;
            }

            if (matchCategory && matchCondition && matchSize) {
                filteredClothes.push(clothes);
            }

            return filteredClothes;
    }

    }
}