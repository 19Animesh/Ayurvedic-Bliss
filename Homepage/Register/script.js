const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => container.classList.add("active"));
loginBtn.addEventListener('click', () => container.classList.remove("active"));

function handleCredentialResponse(response) {
  const jwt = response.credential;
  const payload = JSON.parse(atob(jwt.split('.')[1]));

  fetch('http://localhost:5501/api/users/google-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      googleId: payload.sub
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(`Welcome, ${payload.name}!`);
      localStorage.setItem('token', data.token);
    })
    .catch(err => console.error(err));
}

// SIGNUP
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  try {
      const res = await fetch('http://localhost:8080/api/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              firstName: name.split(' ')[0],
              lastName: name.split(' ')[1] || '',
              email, 
              password 
          })
      });

      const data = await res.json();
      if (data.token) {
          localStorage.setItem('token', data.token);
          alert(data.message || "Signup successful!");
          // Redirect to dashboard or home page
          window.location.href = '/dashboard.html';
      } else {
          alert(data.message || "Signup failed.");
      }
  } catch (err) {
      alert("Signup failed. Please try again.");
      console.error(err);
  }
});

// SIGNIN
document.getElementById('signin-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;

  try {
      const res = await fetch('http://localhost:8080/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (data.token) {
          localStorage.setItem('token', data.token);
          alert(data.message || "Login successful!");
          // Redirect to dashboard or home page
          window.location.href = '/dashboard.html';
      } else {
          alert(data.message || "Login failed.");
      }
  } catch (err) {
      alert("Login failed. Please try again.");
      console.error(err);
  }
});