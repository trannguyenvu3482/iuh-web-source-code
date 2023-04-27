import { getShoesById } from '../api/shoesAPI.js';
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

// Load to UI from data
const loadUI = (shoes) => {
  const shoesName = document.querySelector('.main-product__info-title');
  const shoesID = document.querySelector('.main-product__info-shoes-id span');
  const price = document.querySelector('.main-product__info-price');
  const subtitle = document.querySelector('.main-product__info-subtitle');
  const sizeContainer = document.querySelector('.main-product__info-sizes');
  const mainImage = document.querySelector('.main-product__image-main');

  const imagesContainer = document.querySelector(
    '.main-product__image-preview'
  );

  // Update images
  const imagesHTMLs = shoes.images.map((image) => {
    return `
      <div class="main-product__image-preview-item">
        <img src="${image}" alt="shoes" />
      </div>
    `;
  });

  imagesContainer.innerHTML = imagesHTMLs.join('');
  imagesContainer.firstElementChild.classList.add('active');
  mainImage.style.backgroundImage = `url(${shoes.images[0]})`;

  // Update fields
  shoesName.textContent = shoes.name;
  shoesID.textContent = shoes.id;
  price.textContent = shoes.price;
  subtitle.textContent = shoes.subtitle ? shoes.subtitle : '';

  // Update sizes
  const sizesHTMLs = shoes.size.map((size) => {
    return `
      <div class="main-product__info-size">${size}</div>
    `;
  });

  sizeContainer.innerHTML = sizesHTMLs.join('');
  sizeContainer.firstElementChild.classList.add('active');
};

document.addEventListener('DOMContentLoaded', async () => {
  const queryString = getQueryString();
  const productId = queryString.id;
  const shoes = await getShoesById(productId);

  console.log(shoes);

  loadUI(shoes);
});
