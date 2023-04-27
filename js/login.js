const userNameInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');
const loginButton = document.querySelector('.login-submit');

loginButton.addEventListener('click', (e) => {
  e.preventDefault();
  const username = userNameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username && password) {
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('username', 'admin');
      window.location.href = 'admin.html';
    } else {
      alert('Incorrect username or password');
    }
  } else {
    alert('Please enter your username and password');
  }

  userNameInput.value = '';
  passwordInput.value = '';
});
