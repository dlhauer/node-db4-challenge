const db = require('../data/db-config');

module.exports = {
  getRecipes,
  getShoppingList,
  getInstructions,
};

function getRecipes() {
  return db.select('*').from('recipes');
}

function getShoppingList(recipe_id) {
  return db('recipe_ingredients as ri')
          .join('ingredients as i', 'ri.ingredient_id', 'i.id')
          .join('recipes as r', 'ri.recipe_id', 'r.id')
          .where({ recipe_id })
          .select('r.recipe_name', 'i.ingredient_name', 'ri.quantity');
}

function getInstructions(recipe_id) {
  return db('recipes')
          .where({id: recipe_id})
          .select('recipe_name', 'instructions')
          .first();
}