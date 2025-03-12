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
}

// Checkout button
document.getElementById('checkout').addEventListener('click', () => {
  document.querySelector('.contact').scrollIntoView({ behavior: 'smooth' });
});

// Form submission
document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Add cart data to hidden input
  const cartData = JSON.stringify(cart);
  document.getElementById('cart-data').value = cartData;

  // Submit the form
  this.submit();
});