import { component } from "haunted";
import { html } from "lit-html";

function ShoppingListItem({ shoppingList }) {
  const removeFromShoppingList = (ingredient) => {
    const event = new CustomEvent("remove-ingredient", {
      bubbles: true,
      composed: true,
      detail: { ingredient },
    });
    this.dispatchEvent(event);
  };
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
      .item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
      .print-btn {
        padding: 8px;
        width: 120px;
        border: none;
        border-radius: 4px;
        background-color: #d3d3d3;
        cursor: pointer;
      }
      .print-btn:hover {
        background-color: #c6c6c6;
      }
      .remove-btn {
        height: 24px;
        border: none;
        padding: 2px 16px;
        margin: 8px 16px;
        border-radius: 2px;
        background-color: #4caf50;
        cursor: pointer;
      }

      .remove-btn:hover {
        background-color: #419444;
      }
    </style>
    <div class="list">
      <div class="list-items">
        <h4>Shopping List</h4>
        ${shoppingList?.map(
          (ingredient) =>
            html`<div class="item">
              <span>${ingredient}</span
              ><button
                class="remove-btn"
                @click=${() => removeFromShoppingList(ingredient)}
              >
                -
              </button>
            </div>`
        )}
      </div>
      <button class="print-btn">Print</button>
    </div>`;
}

customElements.define("shopping-list-item", component(ShoppingListItem));
