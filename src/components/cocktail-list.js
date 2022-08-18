import { component } from "haunted";
import { html } from "lit-html";

function CocktailList({ cocktails }) {
  return html`
    ${cocktails?.map(
      (cocktail) => html`<cocktail-item .cocktail=${cocktail}></cocktail-item>`
    )}
  `;
}

customElements.define("cocktail-list", component(CocktailList));
