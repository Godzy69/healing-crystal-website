// Cart functionality
let cart = [];
let total = 0;

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    cart.push({ name, price });
    total += price;

    updateCart();
  });
});

// Update cart display
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  // Clear existing items
  cartItems.innerHTML = '';

  // Add new items
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItems.appendChild(li);
  });

  // Update total
  cartTotal.textContent = total.toFixed(2);

  // Save cart data to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('total', total);
}

// Checkout button
document.getElementById('checkout').addEventListener('click', () => {
  // Ensure cart is not empty
  if (cart.length === 0) {
    alert('Your cart is empty. Please add items before proceeding to checkout.');
    return;
  }
});