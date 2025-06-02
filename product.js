function renderCart() {

  const cartItemsContainer = document.getElementById('cart-items');

  const cartTotal = document.getElementById('cart-total');

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
 
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
 
  // Add event listeners for quantity and remove buttons

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
 
  document.querySelectorAll('.remove-btn').forEach(button => {

    button.addEventListener('click', () => {

      const index = parseInt(button.dataset.index);

      cart.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(cart));

      renderCart();

    });

  });

}
 
document.addEventListener('DOMContentLoaded', renderCart);

 
document.addEventListener("DOMContentLoaded", () => {

  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
 
  addToCartButtons.forEach(button => {

    button.addEventListener("click", () => {

      const name = button.dataset.name;

      const price = parseFloat(button.dataset.price);

      const description = button.dataset.desc;

      const image = button.closest(".product-card").querySelector("img").src;
 
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingIndex = cart.findIndex(item => item.name === name);
 
      if (existingIndex > -1) {

        cart[existingIndex].quantity += 1;

      } else {

        cart.push({ name, price, description, image, quantity: 1 });

      }
 
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`${name} added to cart!`);

    });

  });

});

 