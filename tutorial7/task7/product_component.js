const template = document.createElement('template');
template.innerHTML = `
<style>
.product {
    max-width: 340px;
    margin: 10px;
}

.image {
    width: 300px;
    height: 300px;
    margin: 0 auto;
}
</style>
<div class="product">
<div class="image"><img src=""></div>
<h3 class="title"></h3>
<p class="price"><span></span>€</p>
<p class="description"></p>
</div>
`;

class Product extends HTMLElement {
    constructor() {
        super();
    
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelectorAll("img")[0].src = "./placeholder.png";
        this.shadowRoot.querySelectorAll(".title")[0].innerHTML = "Placeholder";
        this.shadowRoot.querySelectorAll(".price > span")[0].innerHTML = "0 ";
    }

}


customElements.define("product-component", Product, { });