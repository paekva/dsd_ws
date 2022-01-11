const template = document.createElement('template');
template.innerHTML = `
  <style>
    div {
      margin-top: 20px;
      color: green;
    }
  </style>
  <div>
    <p>Cart will be here</a></p>
  </div>
`;

class ShoppingCart extends HTMLElement {
    constructor() {
        super();
    
        this.attachShadow({ mode: 'open' });
    
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      }
}

customElements.define("shopping-cart", ShoppingCart, { });