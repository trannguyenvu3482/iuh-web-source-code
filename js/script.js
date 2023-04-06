const header = document.querySelector('header');

const stickyHeader = () => {
  if (window.scrollY > 200) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
};

window.addEventListener('scroll', stickyHeader);
