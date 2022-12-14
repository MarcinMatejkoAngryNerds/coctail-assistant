import { component } from "haunted";
import { html } from "lit-html";
import { useState } from "haunted/core";
import { API_URL } from "./environments/environment";
import "./src/components/cocktail-item";
import "./src/components/cocktail-list";
import "./src/components/shopping-list-item";
import "./src/components/toaster";

function App() {
  const [query, setQuery] = useState();
  const [cocktails, setCocktails] = useState();
  const [shoppingList, setShoppingList] = useState([]);
  const [toastMessage, setToastMessage] = useState([]);

  const searchForCocktails = (e) => {
    e.preventDefault();

    setToastMessage("Searching...");

    fetch(`${API_URL}/search.php?s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setCocktails(data.drinks);
        if (data.drinks) {
          setToastMessage("Here are the results.");
        } else {
          setToastMessage("No results found.");
        }
      });
  };

  const addToShoppingList = (e) => {
    let newItems = [];
    e.forEach((item) => {
      if (!shoppingList.includes(item)) {
        newItems.push(item);
      }
    });
    setShoppingList([...shoppingList, ...newItems]);
    setToastMessage("Ingredients added to shopping list.");
  };

  const removeFromShoppingList = (e) => {
    setShoppingList(shoppingList.filter((item) => item !== e));
    setToastMessage("Ingredients removed from shopping list.");
  };

  return html`
    <style>
      .search {
        margin-bottom: 16px;
        text-align: center;
      }
      input {
        width: 60%;
        height: 34px;
        padding: 0px 16px;
        border: 1px solid black;
        border-radius: 4px;
      }
      button {
        height: 36px;
        padding: 0px 24px;
        border: none;
        border-radius: 4px;
        background-color: #d3d3d3;
        cursor: pointer;
      }
      button:hover {
        background-color: #c6c6c6;
      }
      .cocktail-list {
        min-width: 438px;
      }
    </style>
    <div>
      <form class="search" @submit=${searchForCocktails}>
        <input
          type="text"
          placeholder="Cocktail Name..."
          @change=${(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div style="display:flex;flex-direction:row">
        <cocktail-list
          class="cocktail-list"
          .cocktails=${cocktails}
          @add-ingredients=${(event) =>
            addToShoppingList(event.detail.cocktail)}
        ></cocktail-list>
        <div>
        <shopping-list-item .shoppingList=${shoppingList} @remove-ingredient=${(
    event
  ) => removeFromShoppingList(event.detail.ingredient)}></shopping-list-item>
        <app-toaster .toastMessage=${toastMessage}></app-toaster>
        </div
        
      </div>
      
    </div>
  `;
}

customElements.define("my-app", component(App));
