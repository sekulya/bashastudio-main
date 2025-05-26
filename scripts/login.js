// login.js
import { AuthService } from './utils/auth.js';
import { API_ENDPOINTS } from './utils/config.js';
import { sanitizeInput, displayMessage } from './utils/helpers.js';

class LoginController {
  constructor() {
    this.cart = AuthService.getCart();
    this.initEventListeners();
  }

  initEventListeners() {
    document.querySelector('#togglePassword')
      .addEventListener('click', this.togglePasswordVisibility.bind(this));
    
    document.querySelector('#loginForm')
      .addEventListener('submit', this.handleLogin.bind(this));
  }

  togglePasswordVisibility() {
    const passwordField = document.querySelector('#inputPasswd');
    const isPassword = passwordField.type === 'password';
    passwordField.type = isPassword ? 'text' : 'password';
    this.updateToggleButtonState(isPassword);
  }

  updateToggleButtonState(showPassword) {
    const toggleBtn = document.querySelector('#togglePassword');
    toggleBtn.setAttribute('aria-label', 
      showPassword ? 'Show password' : 'Hide password');
    toggleBtn.innerHTML = showPassword ? '👁️' : '🔒';
  }

  async handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    
    try {
      const formData = this.validateForm(form);
      await this.attemptLogin(formData);
      this.handleSuccessfulLogin();
    } catch (error) {
      displayMessage('error', error.message, '#loginMessages');
      console.error('Login Error:', error);
    }
  }

  validateForm(form) {
    const formData = new FormData(form);
    const credentials = {
      email: sanitizeInput(formData.get('email')),
      password: sanitizeInput(formData.get('password'))
    };

    if (!credentials.email || !credentials.password) {
      throw new Error('Please fill in all required fields');
    }

    if (!this.isValidEmail(credentials.email)) {
      throw new Error('Please enter a valid email address');
    }

    return credentials;
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async attemptLogin(credentials) {
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      AuthService.setAuthTokens(data.token, data.user);
    } catch (error) {
      throw new Error(error.message || 'Network error. Please try again.');
    }
  }

  handleSuccessfulLogin() {
    displayMessage('success', 'Login successful! Redirecting...', '#loginMessages');
    const redirectUrl = this.cart.length > 0 ? '/shipping.html' : '/index.html';
    setTimeout(() => window.location.assign(redirectUrl), 1500);
  }
}

// Initialize login controller
new LoginController();