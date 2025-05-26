export class AuthService {
  static get isValidSession() {
    return !!this.token && this.isTokenValid();
  }

  static get token() {
    return this.getSafeItem('token');
  }

  static async logout() {
    try {
      // Add API call to invalidate token server-side
      await fetch('/api/logout', {
        headers: { Authorization: `Bearer ${this.token}` }
      });
    } finally {
      this.clearSession();
    }
  }

  static clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.dispatchEvent(new CustomEvent('authChange'));
  }

  static async isTokenValid() {
    try {
      const response = await fetch('/api/validate-token', {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  static getSafeItem(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      this.clearSession();
      return null;
    }
  }
}