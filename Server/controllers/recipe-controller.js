const recipeService = require('../service/recipe-service')
const userService = require("../service/user-service");

class RecipeController {
    async addRecipe(req, res, next) {
        try {
            const {name, shortDesc, mainPhoto, category, time, desc, video, count} = req.body
            const recipeData = await recipeService.addRecipe(name, shortDesc, mainPhoto, category, time, desc, video, count)
            return res.json(recipeData)
        } catch (e) {
            next(e)
        }
    }
    async getRecipes(req, res, next) {
        try {
            const recipes = await recipeService.getAllRecipes()
            return res.json(recipes)
        } catch (e) {
            next(e)
        }
    }

    async getRecipe(req, res, next) {
        try {
            const { name } = req.body
            const recipe = await recipeService.getRecipe(name)
            return res.json(recipe)
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new RecipeController()