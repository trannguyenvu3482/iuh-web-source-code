const logout = document.querySelector('.main-menu-bar button');

if (sessionStorage.getItem('username') === null) {
  window.location.href = 'login.html';
  alert('Please login first!');
}


// TODO: Đăng xuất
logout.addEventListener('click', () => {
  sessionStorage.removeItem('username');
  window.location.href = 'login.html';
});
