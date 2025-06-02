function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
 
  cartItemsContainer.innerHTML = '';
 
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<tr><td colspan="7">Your cart is empty.</td></tr>';
    cartTotal.textContent = 'Total: $0.00';
    return;
  }
 
  let total = 0;
 
  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
 
    const row = document.createElement('tr');
    row.innerHTML = `
<td><img src="${item.image}" alt="${item.name}"></td>
<td>${item.name}</td>
<td>${item.description}</td>
<td>$${item.price.toFixed(2)}</td>
<td>
<button class="qty-btn decrease" data-index="${index}">−</button>
        ${item.quantity}
<button class="qty-btn increase" data-index="${index}">+</button>
</td>
<td>$${subtotal.toFixed(2)}</td>
<td><button class="remove-btn" data-index="${index}">Remove</button></td>
    `;
    cartItemsContainer.appendChild(row);
  });
 
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
 
  // Quantity control
  document.querySelectorAll('.qty-btn').forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.dataset.index);
      if (button.classList.contains('increase')) {
        cart[index].quantity += 1;
      } else if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });
 
  // Remove item
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.dataset.index);
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });
}
 
// Checkout handler
function handleCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
 
  // Save cart to localStorage (already done) and redirect
  window.location.href = "payment.html";
}
 
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
 
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", handleCheckout);
  }
});