import React, {useState} from "react";
import RecipeService from "../../../services/RecipeService";
import {Link} from "react-router-dom";
import watch from "../../../img/MainMenu/RecipeList/watch.svg";
import chat from "../../../img/MainMenu/RecipeList/chat.svg";

const Salad = () => {
    const [recipes, setRecipes] = useState([]);
    async function getRecipes() {
        try {
            const category = "Салаты"
            const response = await RecipeService.getRecipeByCategory(category);
            setRecipes(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    getRecipes()

    const OpenRecipe = () => {
        window.scrollBy({
            top: -10000,
            behavior: 'smooth'
        });
    }
    return (
        <div>
            <div className="container">
                <h1>Салаты</h1>
                <div className="recipeList">
                {recipes.map(recipe =>
                    <div className="recipe-item" key={recipe._id}>
                        <Link to={"/recipe/"+recipe._id} className="link" onClick={OpenRecipe}>
                            <img src={recipe.mainPhoto} alt="dish1"/>
                            <p>{recipe.name}</p>
                            <div className="recipe-bottom-list">
                                <div className="recipe-bottom">
                                    <img src={watch} alt="dish2"/>
                                    <p>{recipe.time}</p>
                                </div>
                                <div className="recipe-bottom">
                                    <img src={chat} alt="dish3"/>
                                    <p>35</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}
export default Salad