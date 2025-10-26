// Store categories for quick lookup later if needed
const categories = {};

function register(category) {
  categories[category.id] = category;
  return category;
}

// roots - larger category
const paintings = register(new Category(1, "Paintings"));
const sculptures = register(new Category(2, "Sculptures"));
const drawings = register(new Category(3, "Drawings"));
const digitalArt = register(new Category(4, "Digital Art"));
const prints = register(new Category(5, "Prints"));

// export root list (useful in UI later), ignore child subcategories for now
const rootCategories = [paintings, sculptures, drawings, digitalArt, prints];