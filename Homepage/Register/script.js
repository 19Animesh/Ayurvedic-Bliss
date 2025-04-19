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
    const res = await fetch('http://localhost:5501/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: name, email, password })
    });

    const data = await res.json();
    alert(data.message || "Signup successful!");
  } catch (err) {
    alert("Signup failed.");
    console.error(err);
  }
});

// SIGNIN
document.getElementById('signin-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;

  try {
    const res = await fetch('http://localhost:5501/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      alert("Login successful!");
    } else {
      alert(data.error || "Login failed.");
    }
  } catch (err) {
    alert("Login failed.");
    console.error(err);
  }
});
