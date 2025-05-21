// utils/auth.js
export const AuthService = {
  getToken: () => {
    try {
      return JSON.parse(localStorage.getItem("token")) || null;
    } catch (error) {
      console.error('Token parse error:', error);
      return null;
    }
  },
  
  getUserName: () => {
    try {
      return JSON.parse(localStorage.getItem("userName")) || '';
    } catch (error) {
      console.error('Username parse error:', error);
      return '';
    }
  },

  isAuthenticated: () => !!AuthService.getToken()
};