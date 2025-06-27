function switchTab(tab) {
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.form').forEach(form => form.classList.remove('active'));

  document.querySelector(`#${tab}-form`).classList.add('active');
  document.querySelector(`.tab-button[onclick*="${tab}"]`).classList.add('active');

  // Clear messages
  document.getElementById('login-message').innerText = '';
  document.getElementById('signup-message').innerText = '';
}

function login() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const message = document.getElementById('login-message');

  const users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[username]) {
    if (users[username] === password) {
      message.style.color = 'green';
      message.innerText = 'Login successful! Redirecting...';
      setTimeout(() => {
        alert(`Welcome back, ${username}!`);
      }, 1000);
    } else {
      message.style.color = 'red';
      message.innerText = 'Incorrect password.';
    }
  } else {
    message.style.color = 'red';
    message.innerText = 'Account not found. Please sign up.';
  }
}

function signup() {
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value;
  const message = document.getElementById('signup-message');

  const users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[username]) {
    message.style.color = 'red';
    message.innerText = 'Username already exists.';
  } else if (!username || !password) {
    message.style.color = 'red';
    message.innerText = 'Please enter all fields.';
  } else {
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
    message.style.color = 'green';
    message.innerText = 'Account created! You can now log in.';
    switchTab('login');
  }
}
