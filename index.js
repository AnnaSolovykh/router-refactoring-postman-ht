const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());


const recipesRoute = require('./routes/RecipesRoute');
app.use('/recipes', recipesRoute);

app.listen(4000, () => {
    console.log('It is working')
})