// Load cart data from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const total = parseFloat(localStorage.getItem('total')) || 0;

// Display cart items and total
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

cartItems.innerHTML = '';
cart.forEach(item => {
  const li = document.createElement('li');
  li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
  cartItems.appendChild(li);
});

cartTotal.textContent = total.toFixed(2);

// PayPal Button
paypal.Buttons({
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: total.toFixed(2), // Total amount
          currency_code: 'USD'
        }
      }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      alert('Payment successful! Thank you for your purchase.');
      // Redirect to a thank-you page
      window.location.href = 'thank-you.html';
    });
  },
  onError: function(err) {
    alert('Payment failed. Please try again.');
    console.error(err);
  }
}).render('#paypal-button-container');