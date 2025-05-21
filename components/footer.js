function FooterComponent() {
  return `
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <section aria-labelledby="help-heading">
            <h4 id="help-heading">HELP</h4>
            <ul class="footer-list">
              <li><a href="/shop" aria-label="Shop at Basha Studio">SHOP AT BASHASSTUDIO</a></li>
              <!-- Other list items -->
            </ul>
          </section>
          
          <!-- Repeat for other sections -->

        </div>
        <hr aria-hidden="true">
        
        <div class="footer-meta">
          <div class="language-selector">
            <label for="language">Language:</label>
            <select id="language" aria-label="Select website language">
              <option value="en">English</option>
            </select>
          </div>
          <p class="copyright">&copy; ${new Date().getFullYear()} Basha Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>`;
}

export default FooterComponent;