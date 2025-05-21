
// header.js
import { AuthService } from './utils/auth.js';

function HeaderComponent() {
  const { isAuthenticated, getUserName } = AuthService;
  const userGreeting = isAuthenticated() ? `Hi ${getUserName()}` : 'LOG IN';
  
  return `
    <header class="header" role="banner">
      <nav class="header-nav" aria-label="Main navigation">
        <!-- Mobile Menu Toggle -->
        <button class="hamburger" aria-label="Toggle navigation menu">
          <span class="fas fa-bars" aria-hidden="true"></span>
        </button>

        <!-- Logo -->
        <div class="brand-logo">
          <a href="./index.html" aria-label="Return to homepage">
            <img src="./assets/logo.svg" 
                 alt="Basha Studio Logo"
                 width="280" 
                 height="140"
                 loading="lazy">
          </a>
        </div>

        <!-- Navigation Links -->
        <div class="nav-controls">
          <a href="./search.html" class="nav-link" aria-label="Product search">
            <span class="fas fa-search"></span>
            <span class="link-text">SEARCH</span>
          </a>
          
          <a href="./login.html" class="nav-link" aria-label="User account">
            <span class="fas fa-user"></span>
            <span class="link-text">${userGreeting}</span>
          </a>

          <a href="./help.html" class="nav-link" aria-label="Help center">
            <span class="fas fa-question-circle"></span>
            <span class="link-text">HELP</span>
          </a>

          <a href="./shoppingBasket.html" class="nav-link" aria-label="Shopping cart">
            <span class="fas fa-shopping-bag"></span>
            <span class="link-text">CART</span>
            <span class="cart-count" aria-live="polite"></span>
          </a>
        </div>
      </nav>
    </header>`;
}

export default HeaderComponent;