
exports.up = function(knex) {
  return knex.schema
    .createTable('recipes', tbl => {
      tbl.increments();
      tbl.string('recipe_name', 120).notNullable();
      tbl.string('instructions', 3000).notNullable();
    })
    .createTable('ingredients', tbl => {
      tbl.increments();
      tbl.string('ingredient_name', 120).notNullable();
    })
    .createTable('recipe_ingredients', tbl => {
      tbl.increments();
      tbl.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('recipes')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
      tbl.integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('ingredients')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
      tbl.float('quantity').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema 
          .dropTableIfExists('recipe_ingredients')
          .dropTableIfExists('ingredients')
          .dropTableIfExists('recipes');
};
