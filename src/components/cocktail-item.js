import { component } from "haunted";
import { html } from "lit-html";
import { useState } from "haunted/core";

function CocktailItem({ cocktail }) {
  const [shoppingList, setShoppingList] = useState();

  let ingredients = [];
  if (cocktail.strIngredient1) {
    ingredients.push(cocktail.strIngredient1);
  }
  if (cocktail.strIngredient2) {
    ingredients.push(cocktail.strIngredient2);
  }
  if (cocktail.strIngredient3) {
    ingredients.push(cocktail.strIngredient3);
  }
  if (cocktail.strIngredient4) {
    ingredients.push(cocktail.strIngredient4);
  }
  if (cocktail.strIngredient5) {
    ingredients.push(cocktail.strIngredient5);
  }
  if (cocktail.strIngredient6) {
    ingredients.push(cocktail.strIngredient6);
  }
  if (cocktail.strIngredient7) {
    ingredients.push(cocktail.strIngredient7);
  }
  if (cocktail.strIngredient8) {
    ingredients.push(cocktail.strIngredient8);
  }
  console.log("ingredients", ingredients);

  const addIngredientsToShoppingList = (ingredients) => {
    setShoppingList(ingredients);
  };

  return html` <style>
      .item {
        border: none;
        border-radius: 4px;
        margin: 16px;
        padding: 8px;
        width: 390px;
        display: flex;
        flex-direction: row;
        box-shadow: 2px 2px 16px -6px rgba(66, 68, 90, 1);
      }

      img {
        border: none;
        border-radius: 2px;
        width: 100px;
        height: 100px;
        margin: 8px;
      }
      .item-desc {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
      }
      .item-desc-body {
        display: flex;
        flex-direction: column;
      }
      h4 {
        margin: 8px 0;
      }
      .add {
        display: flex;
        flex-direction: column;
        justify-content: end;
      }
      button {
        height: 24px;
        border: none;
        padding: 2px 16px;
        margin: 8px 16px;
        border-radius: 2px;
        background-color: #4caf50;
        cursor: pointer;
      }

      button:hover {
        background-color: #419444;
      }
    </style>
    <div class="item">
      <img src="${cocktail.strDrinkThumb}" alt="" class="thumbnail" />
      <div class="item-desc">
        <div class="item-desc-body">
          <h4 class="name">${cocktail.strDrink}</h4>
          <span>${cocktail.strInstructions}</span>
          <span>Salt</span>
        </div>
        <div class="add">
          <button>+</button>
        </div>
      </div>
    </div>`;
}

customElements.define("cocktail-item", component(CocktailItem));
