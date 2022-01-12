const template = document.createElement('template');
template.innerHTML = `
<style>
    body {
        font: 15px normal Arial, sans-serif;
        color: #000000;
    }
    label {
        width: 5em;
        display: inline-block;
    }
    ul {
        padding: 0;
    }
    form {
        display: inline;
    }
</style>
<h1>Shopping Cart</h1>
<ul></ul>
<hr>
<img src="cart.gif">
<hr>
<form id='form'>
    <label for="name">Name</label> <input id="name" type="text" name="name" placeholder="Name"><br>
    <label for="amount">Amount</label> <input id="amount" type="number" name="amount" placeholder="Amount"><br>
    <input type="hidden" name="action" value="add">
    <button type="submit">Add entry</button>
</form>
`;

class ShoppingCart extends HTMLElement {
    constructor() {
        super();
    
        this.attachShadow({ mode: 'open' });
    
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        const form = this.shadowRoot.querySelector('#form');
        form.addEventListener('submit', (ev) => this.onAddItem(this, ev));

        this.updateData(this);
    }

    static get observedAttributes() {
        return ['url'];
    }

    attributeChangedCallback(name, oldValue, newValue) { 
        this.updateData(this);
    }

    onAddItem = (th, ev) => {
        ev.stopImmediatePropagation();
        ev.preventDefault();

        const form = ev.target;

        const xhttp = new XMLHttpRequest();

        const url = th.getAttribute('url');
        if(url) {
            xhttp.open("POST", url + "/cart", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify({name: form[0].value, amount: form[1].value}));
        }

        this.updateData(this);
    }

    updateData = (th) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const cartData = JSON.parse(this.responseText);

                const root = th.shadowRoot.querySelector("ul");
                root.innerHTML = "";

                cartData.forEach(element => {
                    root.appendChild(th.createNewElement(th, element));
                });
            }
        };

        const url = th.getAttribute('url');
        if(url) {
            xhttp.open("GET", url + "/cart", true);
            xhttp.send();
        }
    }

    deleteAnEntry = (th, id) => {
        const xhttp = new XMLHttpRequest();

        const url = th.getAttribute('url');
        if(url) {
            xhttp.open("DELETE", url + "/cart/" + id, true);
            xhttp.send();
        }
        
        th.updateData(th);
    }

    createNewElement = (th, element) => {
        const newEntry = document.createElement("li");

        const name = document.createElement("b");
        name.innerText = element['name'] + " ";

        const amount = document.createElement("i");
        amount.innerText = element['amount'] + "x ";

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = 'delete';
        deleteBtn.addEventListener('click', (e) => th.deleteAnEntry(e, element['id']));

        newEntry.appendChild(amount);
        newEntry.appendChild(name);
        newEntry.appendChild(deleteBtn);

        return newEntry;
    }
}

customElements.define("shopping-cart", ShoppingCart, { });