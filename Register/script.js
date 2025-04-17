const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


  function handleCredentialResponse(response) {
    // Decode JWT token (optional)
    const jwt = response.credential;
    const payload = JSON.parse(atob(jwt.split('.')[1]));

    console.log("Google User Info:", payload);
    alert(`Welcome, ${payload.name}!`);
  }

  