document.addEventListener("DOMContentLoaded", () => {
  const orderItemsContainer = document.getElementById("order-items");
  const totalAmount = document.getElementById("total-amount");
 
  const order = JSON.parse(localStorage.getItem("order")) || [];
  const orderTotal = localStorage.getItem("orderTotal") || "0.00";
 
  if (order.length === 0) {
    orderItemsContainer.innerHTML = "<p>No order found.</p>";
    return;
  }
 
  order.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.textContent = `${item.quantity} x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`;
    orderItemsContainer.appendChild(itemDiv);
  });
 
  totalAmount.textContent = `Total Paid: $${orderTotal}`;
});