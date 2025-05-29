// index.js
import { NavigationService } from './utils/navigation.js';
import { ProductService } from './utils/products.js';

class CategoryHandler {
  constructor() {
    this.categoryMap = new Map([
      ['womenJacks', 'womenJacket'],
      ['womenAcc', 'womenAccessories'],
      ['menShirts', 'mensShirt'],
      ['menShoes', 'mensShoes']
    ]);

    this.init();
  }

  async init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupCategoryHandlers();
    });
  }

  setupCategoryHandlers() {
    this.categoryMap.forEach((searchTerm, elementId) => {
      const element = document.getElementById(elementId);
      if (!element) {
        console.error(`Element #${elementId} not found`);
        return;
      }

      element.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleCategorySelection(searchTerm);
      });

      element.setAttribute('role', 'button');
      element.setAttribute('aria-label', `Browse ${searchTerm}`);
    });
  }

  handleCategorySelection(category) {
    try {
      ProductService.setSearchCategory(category);
      NavigationService.navigateToProducts();
    } catch (error) {
      console.error('Category selection failed:', error);
      NavigationService.navigateToErrorPage();
    }
  }
}

// Initialize category handler
new CategoryHandler();