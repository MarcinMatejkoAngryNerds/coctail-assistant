import { component } from "haunted";
import { html } from "lit-html";

function ShoppingListItem({ shoppingList }) {
  return html` <style>
      .list {
        border: none;
        border-radius: 4px;
        margin: 16px;
        padding: 8px;
        width: 220px;
        height: 400px;
        box-shadow: 2px 2px 16px -6px rgba(66, 68, 90, 1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .list-items {
        display: flex;
        flex-direction: column;
      }
      h4 {
        margin: 12px 0;
      }
      button {
        padding: 8px;
        width: 120px;
        border: none;
        border-radius: 4px;
        background-color: #d3d3d3;
        cursor: pointer;
      }
      button:hover {
        background-color: #c6c6c6;
      }
    </style>
    <div class="list">
      <div class="list-items">
        <h4>Shopping List</h4>
        ${shoppingList?.map((ingredient) => html`<span>${ingredient}</span>`)}
      </div>
      <button>Print</button>
    </div>`;
}

customElements.define("shopping-list-item", component(ShoppingListItem));
