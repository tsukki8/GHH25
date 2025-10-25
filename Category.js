// category class with constructor including the id, name, and parentId if applicable
class Category {
    constructor(id, name, parentId = null) {
    this.id = id;
    this.name = name;
    this.parentId = parentId;
    this.children = [];
    }

    // add children for parent class: ex. Women or Men (parent), tops (child)
    addChild(childCategory) {
    childCategory.parentId = this.id;
    this.children.push(childCategory);
    }
}