import { sanitize } from './utils/security.js';
import Cart from './services/Cart.js';

class ProductView {
  constructor() {
    this.product = JSON.parse(localStorage.getItem("product"));
    this.init();
  }

  init() {
    this.renderProduct();
    this.addEventListeners();
  }

  renderProduct() {
    this.renderImages();
    this.renderDetails();
  }

  renderImages() {
    const container = document.querySelector(".image_div");
    container.innerHTML = sanitize(`
      <img src="${this.product.imgUrl}" 
           alt="${this.product.prod_name}" 
           loading="lazy">
    `);
  }

  renderDetails() {
    const container = document.querySelector(".product_info_rightSide");
    container.innerHTML = sanitize(`
      <div class="product-header">
        <h1>${this.product.prod_name}</h1>
        <div class="price">
          <span class="original">${this.product.strikedOffPrice}</span>
          <span class="current">${this.product.price}</span>
        </div>
      </div>
      <!-- Other product details -->
    `);
  }

  handleAddToCart() {
    Cart.addItem({
      ...this.product,
      qty: 1,
      size: 'M' // Default size
    });
    this.showCartNotification();
  }

  // Additional methods...
}

new ProductView();