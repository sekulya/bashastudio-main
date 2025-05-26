export const sanitizeInput = (value) => {
  // Implement proper sanitization logic
  return typeof value === 'string' ? value.trim() : value;
};

export const displayMessage = (type, text, containerId) => {
  const container = document.querySelector(containerId);
  container.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${text}
    </div>
  `;
  setTimeout(() => container.innerHTML = '', 5000);
};