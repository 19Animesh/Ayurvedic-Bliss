document.getElementById("payBtn").onclick = function (e) {
    var options = {
      key: "rzp_test_Rw77qyjKRQmhBp", // Replace with your Razorpay key
      amount: 49900, // in paise => ₹499
      currency: "INR",
      name: "Ayurvedic Bliss",
      description: "Payment for your order",
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        // Redirect to success page or show thank you message
      },
      prefill: {
        name: "Your User Name",
        email: "email@example.com",
      },
      theme: {
        color: "#528FF0"
      }
    };
  
    var rzp = new Razorpay(options);
    rzp.open();
    e.preventDefault();
  };
  