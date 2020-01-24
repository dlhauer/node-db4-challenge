const db = require('../data/db-config');

module.exports = {
  getRecipes,
  getShoppingList,
  getInstructions,
  addRecipe,
  remove,
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

function addRecipe(recipeData) {
  const recipeWithoutIngredients = {
    recipe_name: recipeData.recipe_name,
    instructions: recipeData.instructions,
  };

  return db('recipes')
          .insert(recipeWithoutIngredients)
          .then(([ recipe_id ]) => {
             recipeData.ingredients.forEach(item => {
              return db('ingredients')
                      .where({ingredient_name: item.ingredient_name})
                      .select('id as ingredient_id')
                      .then(([ ingredient_id ]) => {
                        // const {ingredient_id} = ingredient_id;
                        console.log( ingredient_id.ingredient_id);
                        return db('recipe_ingredients')
                                .insert({recipe_id: recipe_id, ingredient_id: ingredient_id.ingredient_id, quantity: item.quantity})
                      })
            })
          });
}

function remove(id) {
  return db('recipes')
          .where({ id })
          .del();
}