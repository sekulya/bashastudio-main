// scripts/LoginValidation.js
import { AuthService } from '../utils/auth.js';
import { showConfirmationModal, showAlert } from '../utils/uiHelpers.js';
import { Routes } from '../utils/config.js';

class SessionValidator {
  constructor() {
    this.authService = AuthService;
    this.initSessionCheck();
  }

  async initSessionCheck() {
    if (!this.authService.isValidSession()) return;

    try {
      const wantsLogout = await this.promptLogout();
      if (wantsLogout) {
        await this.handleLogout();
      }
      this.redirectTo(Routes.home);
    } catch (error) {
      console.error('Session validation error:', error);
      this.redirectTo(Routes.home);
    }
  }

  async promptLogout() {
    return new Promise((resolve) => {
      showConfirmationModal({
        title: 'Active Session Detected',
        message: 'You are already logged in. Would you like to logout?',
        confirmText: 'Logout',
        cancelText: 'Continue',
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      });
    });
  }

  async handleLogout() {
    try {
      await this.authService.logout();
      showAlert({
        type: 'success',
        message: 'You have been successfully logged out',
        duration: 3000
      });
    } catch (error) {
      showAlert({
        type: 'error',
        message: 'Logout failed. Please try again.',
        duration: 5000
      });
      throw error;
    }
  }

  redirectTo(route) {
    window.location.href = route;
  }
}

// Initialize session validation
new SessionValidator();