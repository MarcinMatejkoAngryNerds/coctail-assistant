import { component } from "haunted";
import { html } from "lit-html";

function CocktailItem({ cocktail }) {
  let ingredients = [];
  const maxIngredientsCount = 15;
  for (let index = 1; index < maxIngredientsCount; index++) {
    const ingredient = cocktail[`strIngredient${index}`];
    if (ingredient && ingredients.indexOf(ingredient) === -1) {
      ingredients.push(ingredient);
    }
  }

  const addToShoppingList = (cocktail) => {
    const event = new CustomEvent("add-ingredients", {
      bubbles: true,
      composed: true,
      detail: { cocktail },
    });
    this.dispatchEvent(event);
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
          <button @click=${() => addToShoppingList(ingredients)}>+</button>
        </div>
      </div>
    </div>`;
}

customElements.define("cocktail-item", component(CocktailItem));
