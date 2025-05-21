import { sanitize } from './utils/security.js';
import { CurrencyFormatter } from './utils/formatting.js';

class ShoppingBasket {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.init();
  }

  init() {
    this.render();
    this.addEventListeners();
  }

  render() {
    document.querySelector("#cartLen").textContent = this.itemCount;
    document.querySelector("#total").textContent = CurrencyFormatter.format(this.total);
    this.renderItems();
  }

  get itemCount() {
    return this.cart.reduce((sum, item) => sum + item.qty, 0);
  }

  get total() {
    return this.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  }

  renderItems() {
    const container = document.querySelector("#items");
    container.innerHTML = '';
    
    this.cart.forEach((item, index) => {
      const itemElement = this.createItemElement(item, index);
      container.appendChild(itemElement);
    });
  }

  createItemElement(item, index) {
    const element = document.createElement('div');
    element.className = 'cart-item';
    element.innerHTML = sanitize(`
      <img src="${item.imgUrl}" alt="${item.prod_name}">
      <div class="item-details">
        <h3>${item.prod_name}</h3>
        <div class="price">
          <span class="original">${CurrencyFormatter.format(item.strikedOffPrice)}</span>
          <span class="discounted">${CurrencyFormatter.format(item.price)}</span>
        </div>
        <!-- Quantity controls -->
      </div>
    `);
    
    return element;
  }

  // Add other methods (removeElem, incCount, etc) with proper state management
}

export default new ShoppingBasket();