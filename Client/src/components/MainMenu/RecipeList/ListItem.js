import dish1 from "../../../img/dish1.jpg";
import watch from "../../../img/MainMenu/RecipeList/watch.svg";
import chat from "../../../img/MainMenu/RecipeList/chat.svg";
import {Link} from "react-router-dom";

const ListItem = () => {
    const OpenRecipe = () => {
        window.scrollBy({
            top: -10000,
            behavior: 'smooth'
        });
    }
    return (
        <div className="list-item">
            <Link to="/recipe/1" className="link" onClick={OpenRecipe}>
                <img src={dish1} alt="dish1"/>
                <p>Сёмга с картошкой</p>
                <div className="recipe-bottom-list">
                    <div className="recipe-bottom">
                        <img src={watch} alt="dish2"/>
                        <p>1,5 часа</p>
                    </div>
                    <div className="recipe-bottom">
                        <img src={chat} alt="dish3"/>
                        <p>35</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default ListItem