document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const paymentForm = document.getElementById("payment-form");
 
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
 
  if (cart.length === 0) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
    paymentForm.style.display = "none";
    return;
  }
 
  // Display product list
  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.style.marginBottom = "8px";
    itemDiv.innerHTML = `
      ${item.quantity} x <strong>${item.name}</strong> - $${(item.price * item.quantity).toFixed(2)}
    `;
    productList.appendChild(itemDiv);
  });
 
  // Handle payment submission
  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
 
    // Simulate payment success
    localStorage.setItem("order", JSON.stringify(cart));
    localStorage.setItem("orderTotal", calculateTotal(cart).toFixed(2));
    localStorage.removeItem("cart");
 
    // Redirect to success page
    window.location.href = "success.html";
  });
 
  function calculateTotal(cart) {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
});