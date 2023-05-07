import { getAllShoes } from '../api/shoesAPI.js';
const newProductsTag = document.querySelector('.main-section__grid-products');
const hotProductsTag = document.querySelector(
  '.hot-products > .hot-products-list'
);
const saleProductsTag = document.querySelector(
  '.sale-products > .hot-products-list'
);

const accessoriesTag = document.querySelector(
  '.accessories-products > .hot-products-list'
);

let listAllShoes;

const getShoesHTML = (shoes) => {
  return `
        <a
        href="/pages/product.html?id=${shoes.id}"
        class="main-section__grid-product"
        >
            <img
            src=${shoes.images[0]}
            alt=""
            />
            <div class="main-section__grid-product-info">
            <h3 class="main-section__grid-product-info-title">
                ${shoes.name}
            </h3>
            <div>
            <span class="main-section__grid-product-info-ratings">
            <i class="fa-solid fa-star"></i
            ><i class="fa-solid fa-star"></i
            ><i class="fa-solid fa-star"></i
            ><i class="fa-solid fa-star"></i
            ><i class="fa-solid fa-star"></i>
        </span>
        <p class="main-section__grid-product-info-price">
            ${new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(shoes.currentPrice)}
        </p>
            </div>

            </div>
            ${
              shoes.isNew === true
                ? '<span class="main-section__grid-product-new-tag">New</span>'
                : ''
            }
            ${
              shoes.isHot === true
                ? '<span class="main-section__grid-product-new-tag">Hot</span>'
                : ''
            }
        </a>
    `;
};

document.addEventListener('DOMContentLoaded', async () => {
  listAllShoes = await getAllShoes();

  const newProductsHTML = listAllShoes
    .splice(0, 10)
    .map((shoes) => {
      return getShoesHTML(shoes);
    })
    .join('');

  const hotProductsHTML = listAllShoes
    .splice(0, 5)
    .map((shoes) => {
      return getShoesHTML(shoes);
    })
    .join('');

  const saleProductsHTML = listAllShoes
    .splice(0, 5)
    .map((shoes) => {
      return getShoesHTML(shoes);
    })
    .join('');

  const accessoriesHTML = listAllShoes
    .splice(0, 5)
    .map((shoes) => {
      return getShoesHTML(shoes);
    })
    .join('');

  newProductsTag.innerHTML = newProductsHTML;
  hotProductsTag.innerHTML = hotProductsHTML;
  saleProductsTag.innerHTML = saleProductsHTML;
  accessoriesTag.innerHTML = accessoriesHTML;
});
