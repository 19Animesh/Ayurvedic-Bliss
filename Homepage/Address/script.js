document.getElementById("addressForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const addressData = {
      fullName: document.getElementById("fullName").value,
      addressLine: document.getElementById("addressLine").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      pincode: document.getElementById("pincode").value,
      country: document.getElementById("country").value,
    };
  
    // Example: Store locally or send to backend
    console.log("User Address:", addressData);
    alert("Address saved!");
  
    // Optional: Send to backend
    // fetch("/api/save-address", { method: "POST", body: JSON.stringify(addressData) })
  });
  