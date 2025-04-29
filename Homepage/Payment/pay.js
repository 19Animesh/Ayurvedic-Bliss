// Replace this with your actual Razorpay API key
const razorpayApiKey = "rzp_live_mOKiqJFUGPC4Ec";

// Simulated amount from cart (can be passed from localStorage or URL param)
const totalAmount = localStorage.getItem("totalAmount") || 1000; // Default ₹1000
document.getElementById("amount").innerText = totalAmount;

document.getElementById("pay-button").addEventListener("click", function () {
  const options = {
    key: razorpayApiKey,
    amount: totalAmount * 100, 
    currency: "INR",
    name: "Ayurvedic Bliss",
    description: "Order Payment",
    image: "logo.png", // optional logo path
    handler: function (response) {
      alert("Payment successful!\nPayment ID: " + response.razorpay_payment_id);
      // Redirect or clear cart logic here
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalAmount");
      window.location.href = "success.html"; // Optional: redirect to thank you page
    },
    prefill: {
      name: "",
      email: "",
      contact: ""
    },
    theme: {
      color: "#8bc34a"
    }
  };
  const rzp = new Razorpay(options);
  rzp.open();
});