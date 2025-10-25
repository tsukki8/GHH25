// Store categories for quick lookup later if needed
const categories = {};

function register(category) {
  categories[category.id] = category;
  return category;
}

// roots - larger category
const women = register(new Category(1, "Women"));
const men = register(new Category(2, "Men"));

// women subcategories- filtered under women
women.addChild(register(new Category(11, "Dresses and Skirts")));
women.addChild(register(new Category(12, "Tops")));
women.addChild(register(new Category(13, "Pants")));
women.addChild(register(new Category(14, "Coats")));
women.addChild(register(new Category(15, "Shoes")));
women.addChild(register(new Category(16, "Accessories")));

// men subcategories- filtered under men
men.addChild(register(new Category(21, "Tops")));
men.addChild(register(new Category(22, "Bottoms")));
men.addChild(register(new Category(23, "Shoes")));
men.addChild(register(new Category(24, "Coats")));
men.addChild(register(new Category(25, "Accessories")));

// export root list (useful in UI later)
const rootCategories = [women, men];