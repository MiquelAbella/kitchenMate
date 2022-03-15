import React, { useState } from "react";

export const SelectedRecipe = ({ recipe, setSelectedRecipe }) => {
  const handleGoMain = () => {
    setSelectedRecipe(null);
  };

  const [qty, setQty] = useState(1);

  const handleIncreaseQty = () => {
    setQty(qty + 0.01);
  };
  const handleDecreaseQty = () => {
    setQty(qty - 0.01);
  };

  console.log(recipe.images);

  return (
    <div className="selected-recipe">
      <h1 onClick={handleGoMain} className="back-btn">
        &larr;
      </h1>
      <div className="selected-container-img-container">
        <img
          className="selected-container-img"
          src={recipe.images.REGULAR.url}
        />
      </div>
      <div className="selected-recipe-container">
        <h1 className="selected-recipe-title">{recipe.label}</h1>
        <div className="controllers">
          <button onClick={handleDecreaseQty}>-</button>
          <button onClick={handleIncreaseQty}>+</button>
        </div>
        {recipe.ingredients.map((ingredient) => {
          return (
            <div className="recipe-ingredients-container">
              <div className="recipe-ingredients">
                <h2>{ingredient.food}</h2>
                <h3>{(ingredient.weight * qty).toFixed(2)}</h3>
              </div>
            </div>
          );
        })}
        <a className="link" href={recipe.url} target="_blank">
          Go to recipe
        </a>
        <h3 className="info">*All numbers represents weight units, not units.</h3>
      </div>
    </div>
  );
};
