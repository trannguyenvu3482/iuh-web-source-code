let mainImage = document.querySelector('.main-product__image-main');
let images = document.querySelectorAll('.main-product__image-preview-item');

let sizes = document.querySelectorAll('.main-product__info-size');

const quantity = document.querySelector('.main-product__info-quantity-input');
const minusQuantityBtn = document.querySelector(
  '.main-product__info-quantity-minus'
);
const plusQuantityBtn = document.querySelector(
  '.main-product__info-quantity-plus'
);

// Get query string from url
const getQueryString = () => {
  var result = {},
    queryString = location.search.slice(1),
    re = /([^&=]+)=([^&]*)/g,
    m;

  while ((m = re.exec(queryString))) {
    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  return result;
};

// Get product id from query string
const productId = getQueryString().id;

console.log(productId);

// Fetch product data from API
const getProduct = async () => {
  const response = await fetch(
    `https://6421447c34d6cd4ebd6ecd50.mockapi.io/api/v1/shoes/${productId}`
  );
  const data = await response.json();
  return data;
};

getProduct().then((data) => {
  console.log(data);
});

// Zoom image handler
mainImage.addEventListener('mousemove', (e) => {
  // Get mouse position, width and height of image
  const { offsetX: x, offsetY: y } = e;
  const { offsetWidth: width, offsetHeight: height } = mainImage;

  // Calculate background position, without going out of bounds
  const bgX = Math.min(Math.max(0, (x / width) * 100), 100);
  const bgY = Math.min(Math.max(0, (y / height) * 100), 100);

  // Set background position
  mainImage.style.backgroundPosition = `${bgX}% ${bgY}%`;
  mainImage.style.backgroundSize = '150%';
});

mainImage.addEventListener('mouseleave', () => {
  mainImage.style.backgroundPosition = 'center';
  mainImage.style.backgroundSize = 'cover';
});

// Change image handler
images.forEach((image) => {
  image.addEventListener('click', (e) => {
    // Remove active class from current image
    document
      .querySelector('.main-product__image-preview-item.active')
      .classList.remove('active');

    // Add active class to parent .main-product__image-preview-item element
    e.target.parentElement.classList.add('active');

    // Update current image
    currentImage = e.target;

    // Update main image
    mainImage.style.backgroundImage = `url(${e.target.src})`;
  });
});

// Increase quantity handler
plusQuantityBtn.addEventListener('click', () => {
  quantity.value = parseInt(quantity.value) + 1;
});

// Decrease quantity handler
minusQuantityBtn.addEventListener('click', () => {
  if (quantity.value > 1) {
    quantity.value = parseInt(quantity.value) - 1;
  }
});

// Handle size selection
sizes.forEach((size) => {
  size.addEventListener('click', (e) => {
    // Remove active class from current size
    document
      .querySelector('.main-product__info-size.active')
      .classList.remove('active');

    // Add active class to current size
    e.target.classList.add('active');
  });
});
