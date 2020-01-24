const express = require('express');
const RecipesRouter = require('./recipes/recipes-router')
const IngredientsRouter = require('./ingredients/ingredients-router')
const server = express();

server.use(express.json());
server.use('/api/recipes', RecipesRouter)
server.use('/api/ingredients', IngredientsRouter)
module.exports = server;