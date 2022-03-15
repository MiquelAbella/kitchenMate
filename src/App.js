import { useState } from "react";
import "./App.css";
import { Recipe } from "./Recipe";
import { SelectedRecipe } from "./SelectedRecipe";

import Swal from 'sweetalert2'

import einstein from "./einsteing.png";

function App() {
  const APP_ID = "5bafc9d8";
  const APP_KEY = "1126546e28c64c9d0577335fd9718be9";

  const [recipeQuery, setRecipeQuery] = useState({ recipe: "" });
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isStarted, setIsStarted] = useState(false);

  const handleInputChange = (e) => {
    setRecipeQuery({ ...recipeQuery, [e.target.name]: e.target.value });
  };

  const handleSearchRecipe = async (e) => {
    e.preventDefault();
    await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeQuery.recipe}&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.hits.length === 0) {
          Swal.fire(
            'NOTHING FOUND...',
            'Did you mispell something?',
            'question'
          )
        } else if (data.hits.length) {
          setRecipes(data.hits);
        }
      });
  };

  return (
    <div className="App">
      {!recipes.length && (
        <>
          <h1 className="app-title">SMART CHEFF</h1>
          <h1 className="app-subtitle">THE BEST KITCHEN MATE</h1>
          {!isStarted ? (
            <button
              className="start-btn"
              onClick={() => {
                setIsStarted(true);
              }}
            >
              START
            </button>
          ) : (
            <form
              className="search-form animate__animated animate__fadeIn"
              onSubmit={handleSearchRecipe}
            >
              <input
                type="text"
                placeholder="Search for a recipe"
                name="recipe"
                value={recipeQuery.recipe}
                onChange={handleInputChange}
              ></input>
              <button>Search</button>
            </form>
          )}
          <img className="einstein" src={einstein} />
        </>
      )}
      <div className="recipes-container animate__animated animate__fadeIn">
        {!selectedRecipe && recipes.length ? (
          <div className="titles-container">
            <h1 className="app-title main-title">SMART CHEFF</h1>
            <h1 className="app-subtitle main-subtitle">
              THE BEST KITCHEN MATE
            </h1>
          </div>
        ) : null}
        {!selectedRecipe && recipes.length ? (
          <form
            className="search-form main-form animate__animated animate__fadeIn"
            onSubmit={handleSearchRecipe}
          >
            <input
              type="text"
              placeholder="Search for a recipe"
              name="recipe"
              value={recipeQuery.recipe}
              onChange={handleInputChange}
            ></input>
            <button id="search-button-main">Search</button>
          </form>
        ) : null}
        {!selectedRecipe
          ? recipes.map((recipe, idx) => {
              return (
                <Recipe
                  value={idx}
                  setSelectedRecipe={setSelectedRecipe}
                  title={recipe.recipe.label}
                  image={recipe.recipe.images.SMALL.url}
                  key={idx}
                />
              );
            })
          : null}
      </div>
      {selectedRecipe && (
        <SelectedRecipe
          setSelectedRecipe={setSelectedRecipe}
          recipe={recipes[parseInt(selectedRecipe)].recipe}
        />
      )}
    </div>
  );
}

export default App;
