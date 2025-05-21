// utils/auth.js (new shared module)
export const AuthService = {
  getToken: () => JSON.parse(localStorage.getItem("token")) || null,
  getUserName: () => JSON.parse(localStorage.getItem("userName")) || "",
  isAuthenticated: () => !!JSON.parse(localStorage.getItem("token"))
};

// navbar.js
import { AuthService } from './utils/auth.js';

function NavbarComponent() {
  const { isAuthenticated, getUserName } = AuthService;
  const greeting = isAuthenticated() ? `Hi ${getUserName()}` : "LOG IN";

  return `
    <div id="navbar">
      <div id="logo">
        <a href="./index.html">
          <img src="./assets/logo.png" alt="Basha Studio Logo">
        </a>
      </div>

      <div id="progress">
        <div class="step active">SHIPPING</div>
        <div class="separator">&rang;</div>
        <div class="step">PAYMENT</div>
        <div class="separator">&rang;</div>
        <div class="step">SUMMARY</div>
      </div>

      <nav id="actions" aria-label="Main navigation">
        <a href="./login.html" class="nav-link">${greeting}</a>
        <a href="./help.html" class="nav-link">HELP</a>
      </nav>
    </div>`;
}

export default NavbarComponent;