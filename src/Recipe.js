import React from 'react'

export const Recipe = ({image, title, setSelectedRecipe, value}) => {

    const handleSelectRecipe = (e) =>{
        setSelectedRecipe(e.target.getAttribute('value'));
    }

  return (
    <div onClick={handleSelectRecipe} className="recipe">
      <img src={image} value={value}/>
      <h3>{title}</h3>
    </div>
  )
}