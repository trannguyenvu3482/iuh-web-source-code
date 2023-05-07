const header = document.querySelector('header');
const cartQuantity = document.querySelector('.header__bottom-cart-quantity');

const stickyHeader = () => {
  if (window.scrollY > 200) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
};

const cartQuantityUpdate = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart.items.length > 0) {
    cartQuantity.innerHTML = cart.items.length;
  } else {
    cartQuantity.innerHTML = 0;
  }
};

window.addEventListener('load', () => {
  cartQuantityUpdate();
});

window.addEventListener('scroll', stickyHeader);
