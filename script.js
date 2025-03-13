// Initialize cart and total from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;

// Function to update the cart display
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  // Clear existing items
  cartItems.innerHTML = '';

  // Add new items
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    
    // Add a remove button for each item
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-item');
    removeButton.addEventListener('click', () => removeItem(index));

    li.appendChild(removeButton);
    cartItems.appendChild(li);
  });

  // Update total
  cartTotal.textContent = total.toFixed(2);

  // Save cart data to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('total', total);
}

// Function to remove an item from the cart
function removeItem(index) {
  const removedItem = cart.splice(index, 1)[0];
  total -= removedItem.price;
  updateCart();
}

// Add to cart button functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    // Add item to cart
    cart.push({ name, price });
    total += price;

    // Update the cart display
    updateCart();
  });
});

// Checkout button functionality
document.getElementById('checkout').addEventListener('click', (event) => {
  if (cart.length === 0) {
    event.preventDefault(); // Prevent navigation if cart is empty
    alert('Your cart is empty. Please add items before proceeding to checkout.');
  }
});

// Initialize the cart display on page load
updateCart();