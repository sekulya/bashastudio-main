import API from './utils/api.js';
import SearchResults from './components/SearchResults.js';

class ProductSearch {
  constructor() {
    this.searchInput = document.getElementById("searchbar");
    this.init();
  }

  init() {
    this.searchInput.addEventListener('input', this.handleSearch.bind(this));
    this.loadInitialProducts();
  }

  async loadInitialProducts() {
    try {
      const products = await API.fetchProducts();
      this.organizeProducts(products);
    } catch (error) {
      this.showError(error);
    }
  }

  handleSearch(event) {
    const query = event.target.value.trim();
    if (query.length > 2) {
      this.performSearch(query);
    }
  }

  async performSearch(query) {
    try {
      const results = await API.searchProducts(query);
      new SearchResults(results).render();
    } catch (error) {
      this.showError(error);
    }
  }

  // Additional methods...
}

new ProductSearch();