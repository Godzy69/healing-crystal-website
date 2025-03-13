// Initialize cart and total from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;

// Function to update the cart display
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');
  const checkoutButton = document.getElementById('checkout');
  const emptyCartMessage = document.createElement('p');

  // Clear existing items
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    // Show empty cart message
    emptyCartMessage.textContent = "You don't have anything added yet!";
    emptyCartMessage.style.textAlign = 'center';
    emptyCartMessage.style.color = '#666';
    cartItems.appendChild(emptyCartMessage);

    // Hide the "Proceed to Checkout" button
    checkoutButton.style.display = 'none';
  } else {
    // Add new items
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
      
      // Add a remove button for each item
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-item');
      removeButton.addEventListener('click', () => removeItem(index));

      li.appendChild(removeButton);
      cartItems.appendChild(li);
    });

    // Show the "Proceed to Checkout" button
    checkoutButton.style.display = 'block';
  }

  // Update total and cart count
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;

  // Save cart data to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('total', total);
}

// Function to remove an item from the cart
function removeItem(index) {
  const removedItem = cart.splice(index, 1)[0];
  total -= removedItem.price;

  // Update stock when an item is removed
  const productButtons = document.querySelectorAll('.add-to-cart');
  productButtons.forEach(button => {
    if (button.getAttribute('data-name') === removedItem.name) {
      const stockSpan = button.parentElement.querySelector('.stock');
      let stock = parseInt(stockSpan.getAttribute('data-stock'));
      stockSpan.setAttribute('data-stock', stock + 1);
      stockSpan.textContent = stock + 1 === 0 ? 'Out of Stock' : `${stock + 1} left`;

      // Re-enable button if stock is available
      if (stock + 1 > 0) {
        button.disabled = false;
        button.textContent = 'Add to Cart';
      }
    }
  });

  updateCart();
}

// Add to cart button functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    const stockSpan = button.parentElement.querySelector('.stock');
    let stock = parseInt(stockSpan.getAttribute('data-stock'));

    if (stock > 0) {
      // Add item to cart
      cart.push({ name, price });
      total += price;

      // Update stock
      stockSpan.setAttribute('data-stock', stock - 1);
      stockSpan.textContent = stock - 1 === 0 ? 'Out of Stock' : `${stock - 1} left`;

      // Disable button if stock is 0
      if (stock - 1 === 0) {
        button.disabled = true;
        button.textContent = 'Out of Stock';
      }

      // Update the cart display
      updateCart();
    }
  });
});

// Toggle cart dropdown
const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');

cartIcon.addEventListener('click', () => {
  cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
  if (!cartIcon.contains(event.target) && !cartDropdown.contains(event.target)) {
    cartDropdown.style.display = 'none';
  }
});

// Initialize the cart display on page load
updateCart();