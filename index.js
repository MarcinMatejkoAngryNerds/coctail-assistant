import { component } from "haunted";
import { html } from "lit-html";
import { useState } from "haunted/core";
import { API_URL } from "./environments/environment";
import "./src/components/cocktail-item";
import "./src/components/cocktail-list";
import "./src/components/shopping-list-item";

function App() {
  const [query, setQuery] = useState();
  const [cocktails, setCocktails] = useState();
  const [shoppingList, setShoppingList] = useState([]);

  const searchForCocktails = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/search.php?s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setCocktails(data.drinks);
        // if (data.drinks) {
        //   console.log("Here are the results.", data.drinks);
        // } else {
        //   console.log("No results found.", data);
        // }
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
        <shopping-list-item .shoppingList=${shoppingList}></shopping-list-item>
      </div>
    </div>
  `;
}

customElements.define("my-app", component(App));
