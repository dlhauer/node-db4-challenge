
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {
          id: 1, 
          recipe_name: 'egg salad', 
          instructions: 'Boil egg and chop. Chop onion. Mix with mayonnaise and mustard. Enjoy.'
        },
        {
          id: 2, 
          recipe_name: 'tomato soup', 
          instructions: 'Chop tomato and onion. Boil. Enjoy.'
        },
        {
          id: 3, 
          recipe_name: 'eggs benedict', 
          instructions: 'Poach egg. Fry ham. Toast English muffin. Make hollandaise sauce. Pile on top of one another. Enjoy.'
        },
      ]);
    });
};
