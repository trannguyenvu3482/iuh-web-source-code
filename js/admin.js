if (sessionStorage.getItem('username') === null) {
  alert('Please login first!');
  window.location.href = 'login.html';
}
