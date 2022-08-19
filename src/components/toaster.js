import { component } from "haunted";
import { html } from "lit-html";

function Toaster({ toastMessage }) {
  console.log("toastMessage", toastMessage);
  return html` ${toastMessage.length > 0
    ? html` <style>
          .toaster {
            border: none;
            border-radius: 4px;
            margin: 16px;
            padding: 8px;
            width: 220px;
            height: 35px;
            box-shadow: 2px 2px 16px -6px rgba(66, 68, 90, 1);
          }
        </style>
        <div class="toaster">
          <span>${toastMessage}</span>
        </div>`
    : null}`;
}

customElements.define("app-toaster", component(Toaster));
