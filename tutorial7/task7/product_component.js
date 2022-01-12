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

const defaultData = {
    title: "Placeholder", 
    description: "No description is provided", 
    price: "0 ", 
    image: "./placeholder.png",
};

class Product extends HTMLElement {
    elementData = defaultData;

    constructor() {
        super();
    
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.setElementData(this.elementData);
    }

    static get observedAttributes() {
        return ['image', 'title', 'price', 'description'];
    }

    attributeChangedCallback(name, oldValue, newValue) { 
        this.setElementData({...this.elementData, [name]: newValue});
    }

    setElementData(data) {
        this.elementData = data;
        
        this.shadowRoot.querySelectorAll("img")[0].src = data['image'];
        this.shadowRoot.querySelectorAll(".title")[0].innerHTML = data['title'];
        this.shadowRoot.querySelectorAll(".description")[0].innerHTML = data['description'];
        this.shadowRoot.querySelectorAll(".price > span")[0].innerHTML = data['price'];
    }
}


customElements.define("product-component", Product, { });