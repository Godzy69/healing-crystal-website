// Initialize Stripe
const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY'); // Replace with your Stripe public key
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

// Handle form submission
const paymentForm = document.getElementById('payment-form');
paymentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Disable the submit button to prevent multiple submissions
  paymentForm.querySelector('button').disabled = true;

  // Create a payment intent on your server
  const response = await fetch('/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: total * 100, // Convert to cents
    }),
  });

  const { clientSecret } = await response.json();

  // Confirm the payment
  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
    },
  });

  if (error) {
    // Show error to the customer
    document.getElementById('card-errors').textContent = error.message;
    paymentForm.querySelector('button').disabled = false;
  } else {
    // Payment succeeded
    alert('Payment successful! Thank you for your purchase.');
    window.location.href = 'thank-you.html'; // Redirect to a thank-you page
  }
});