const { Router } = require('express');
const router = Router();
const recipes = require('../Recipes');


router.get('/', (req, res) => {
    res.send(recipes)
})

router.post('/',(req, res) => {
    const addRecipe = {
        name: req.body.name,
        id: req.body.id,
        price: req.body.price
    }
    recipes.push(addRecipe)
    res.json(recipes)
})

router.delete('/:id', (req, res) => {
    let { id } = req.params;
    let recipeToBeDeleted = recipes.find( recipe => recipe.id === id);

    if (recipeToBeDeleted) {
        res.json ({
            message: 'The recipe is deleted', 
            recipes: recipes.filter(recipe => recipe.id !== id)
        })
    } else {
        res.status(404) 
        .json({
            message:'The recipe you are looking for is not found'
        })
    }
})

router.put('/:name', (req, res) => {
    let { name } = req.params;
    let recipeToBeChanged = recipes.find( recipe => recipe.name === name );

    if (recipeToBeChanged) {
        const changeRecipe = req.body;
        
        recipes.forEach(recipe => {
            if (recipe.name === req.params.name) {
                recipe.name = changeRecipe ? changeRecipe.name : recipe.name;
                recipe.id = changeRecipe ? changeRecipe.id : recipe.id;
                recipe.price = changeRecipe ? changeRecipe.price : recipe.price;
                res.json ({
                    message: 'The recipe is changed', recipe 
                })
            }
        })
    } else {
        res.status(404) 
        .json ({message:  `The recipe  ${req.params.name} is not found`})
    }
}) 

module.exports = router;