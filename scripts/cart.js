// cart.js

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSummaryContainer = document.getElementById('cart-summary');

  // Defensive: Check containers exist
  if (!cartItemsContainer || !cartSummaryContainer) return;

  if (!Array.isArray(cart) || cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Go to <a href="products.html">products</a> to add items.</p>
      </div>
    `;
    cartSummaryContainer.innerHTML = '';
    return;
  }

  let itemsHTML = '';
  let subtotal = 0;
  cart.forEach((item, idx) => {
    subtotal += (Number(item.price) || 0) * (Number(item.quantity) || 1);
    itemsHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-img">
        <div class="cart-details">
          <h3>${item.name}</h3>
          <p>${item.description ? item.description : ""}</p>
          <div class="cart-qty-price">
            <div class="qty-box">
              <button type="button" class="qty-btn" data-idx="${idx}" data-change="-1">-</button>
              <span>${item.quantity}</span>
              <button type="button" class="qty-btn" data-idx="${idx}" data-change="1">+</button>
            </div>
            <span class="cart-price">₹${((Number(item.price) || 0) * (Number(item.quantity) || 1)).toFixed(2)}</span>
          </div>
          <button type="button" class="remove-btn" data-idx="${idx}">Remove</button>
        </div>
      </div>
    `;
  });
  cartItemsContainer.innerHTML = itemsHTML;

  cartSummaryContainer.innerHTML = `
    <div class="cart-summary-card">
      <h2>Order Summary</h2>
      <div class="summary-row">
        <span>Subtotal:</span>
        <span>₹${subtotal.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Estimated Shipping:</span>
        <span>Calculated at checkout</span>
      </div>
      <div class="summary-row total">
        <span>Total:</span>
        <span>₹${subtotal.toFixed(2)}</span>
      </div>
      <button class="checkout-btn" onclick="window.location.href='payment.html'">Proceed to Checkout</button>
      <a href="products.html" class="continue-shopping">← Continue Shopping</a>
    </div>
  `;

  // Attach event listeners for quantity buttons and remove buttons
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const idx = parseInt(btn.getAttribute('data-idx'));
      const change = parseInt(btn.getAttribute('data-change'));
      updateQty(idx, change);
    });
  });
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const idx = parseInt(btn.getAttribute('data-idx'));
      removeItem(idx);
    });
  });
}

// Update quantity in cart
function updateQty(idx, change) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart[idx]) return;
  cart[idx].quantity = (Number(cart[idx].quantity) || 1) + change;
  if (cart[idx].quantity < 1) {
    cart.splice(idx, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

// Remove item from cart
function removeItem(idx) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart[idx]) return;
  cart.splice(idx, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

// Initial load
window.addEventListener('DOMContentLoaded', loadCart);