const express = require('express');
const Recipes = require('./recipes-model.js');
const router = express.Router();


router.get('/', (req, res) => {
  Recipes.getRecipes()
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Failed to get recipes'
      });
    });
});

router.get('/:id/list', (req, res) => {
  const { id } = req.params;
  Recipes.getShoppingList(id)
    .then(list => {
      res.status(200).json(list);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Failed to get shopping list.'
      });
    });
});

router.get('/:id/instructions', (req, res) => {
  const { id } = req.params;
  Recipes.getInstructions(id)
    .then(instructions => {
      res.status(200).json(instructions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Failed to get instructions.'
      });
    });
});
module.exports = router;