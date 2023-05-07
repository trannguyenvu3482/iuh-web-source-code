import { getShoesById } from '../api/shoesAPI.js';

let cart;

// cart = {
//   items: [
//     {
//       id: 1,
//       quantity: 1,
//       price: 200000,
//       totalPrice: 200000,
//     },
//   ],
//   totalPrice: 200000,
// };

// localStorage.setItem('cart', JSON.stringify(cart));

const getItemHTML = (shoes, item) => {
  const price = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(shoes.currentPrice);

  console.log(item.totalPrice);

  const totalPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(item.totalPrice);

  return `
    <div class="cart-list__item">
      <img
        class="cart-list__item-img"
        src=${shoes.images[0]}
        alt=""
      />
      <div class="cart-list__item-info">
        <div class="cart-list__item-title">
          ${shoes.name}
        </div>
        <span class="cart-list__item-size">Size Giày: 38.5</span>
        <div class="cart-list__item-shoes-id">
          Mã SP: <span>${shoes.shoes_id}</span>
        </div>
        <div class="cart-list__item-quantity">
          <div class="cart-list__item-quantity-btn">
            <button class="cart-list__item-quantity-btn-dec">
              -
            </button>
            <span>${item.quantity}</span>
            <button class="cart-list__item-quantity-btn-inc">
              +
            </button>
          </div>

          <i class="fa fa-times"></i>

          <div class="cart-list__item-price">
            <span>${price}</span>
          </div>
        </div>

        <span class="cart-list__item-total-price">
          Thành tiền:
          <span class="cart-list__item-price">${totalPrice}</span>
        </span>
      </div>

      <button class="cart-list__item-remove-btn">
        <i class="fa fa-times"></i>
      </button>
  </div>
  `;
};

const loadDataToUI = async () => {
  // Load data to UI
  const cartList = document.querySelector('.cart-list');

  cart.totalPrice = 0;
  await cart.items.forEach(async (item) => {
    const shoes = await getShoesById(item.id);

    // Set price for item
    item.price = shoes.currentPrice;
    item.totalPrice = item.quantity * item.price;
    cart.totalPrice += item.totalPrice;

    localStorage.setItem('cart', JSON.stringify(cart));

    const html = getItemHTML(shoes, item);
    cartList.insertAdjacentHTML('beforeend', html);
  });

  console.log('After', cart.totalPrice);

  localStorage.setItem('cart', JSON.stringify(cart));

  // Render total price to UI
  const totalPriceOfCart = document.querySelector('.cart-total');
  totalPriceOfCart.innerHTML = `
    Tổng tiền:
    <span class="cart-total__price">
      ${new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(cart.totalPrice)}
    </span>
  `;
};

// Onload event
window.addEventListener('DOMContentLoaded', async () => {
  // Get cart
  cart = JSON.parse(localStorage.getItem('cart'));

  if (cart.items.length > 0) {
    await loadDataToUI();
    console.log('Load data to UI');

    handleRemoveItem();
    console.log('Handle remove item');

    handleQuantityBtns();
    console.log('Handle quantity');

    updateCartTotalPrice();
  } else {
    document.querySelector('.cart-container').innerHTML = `
      <div class="no-products">
        <h1 class="title-none">Giỏ hàng</h1>
      
        <p class="text-none">Không có sản phẩm nào trong giỏ hàng</p>
        <a href="/index.html" class="back-home-btn"> Về trang chủ</a>
        <div class="callship text-center">
          Khi cần trợ giúp vui lòng gọi <a class="callNow" href="tel:0909300746">0909300746</a>
        </div>
      </div>
    `;
  }
});

// Handle remove item
const handleRemoveItem = () => {
  const itemList = document.querySelector('.cart-list');

  itemList.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('cart-list__item-remove-btn') ||
      e.target.closest('.cart-list__item-remove-btn')
    ) {
      const item = e.target.closest('.cart-list__item');
      const itemIndex = Array.from(item.parentElement.children).indexOf(item);

      // Remove item from cart
      cart.items.splice(itemIndex, 1);
      localStorage.setItem('cart', JSON.stringify(cart));

      // Remove item from UI
      item.remove();

      // Update total price in cart
      cart.totalPrice = 0;
      cart.items.forEach((item) => {
        cart.totalPrice += item.totalPrice;
      });
      localStorage.setItem('cart', JSON.stringify(cart));

      // Render total price to UI
      const totalPriceOfCart = document.querySelector('.cart-total');
      totalPriceOfCart.innerHTML = `
        Tổng tiền:
        <span class="cart-total__price">
          ${new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(cart.totalPrice)}
        </span>
      `;

      if (cart.items.length === 0) {
        document.querySelector('.cart-container').innerHTML = `
        <div class="no-products">
          <h1 class="title-none">Giỏ hàng</h1>
        
          <p class="text-none">Không có sản phẩm nào trong giỏ hàng</p>
          <a href="/index.html" class="back-home-btn"> Về trang chủ</a>
          <div class="callship text-center">
            Khi cần trợ giúp vui lòng gọi <a class="callNow" href="tel:0909300746">0909300746</a>
          </div>
        </div>
      `;
      }
    }
  });
};

const handleQuantityDec = (e) => {
  const quantity = e.target.nextElementSibling;
  const quantityValue = parseInt(quantity.innerText);
  if (quantityValue > 1) {
    quantity.innerText = quantityValue - 1;

    // Get item index from cart
    const item = e.target.closest('.cart-list__item');
    const itemIndex = Array.from(item.parentElement.children).indexOf(item);

    // Update cart
    cart.items[itemIndex].quantity = quantityValue - 1;
    cart.items[itemIndex].totalPrice =
      cart.items[itemIndex].quantity * cart.items[itemIndex].price;
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update UI
    const totalPrice = item.querySelector('.cart-list__item-total-price');
    totalPrice.innerHTML = `
      Thành tiền:
      <span class="cart-list__item-price">
        ${new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(cart.items[itemIndex].totalPrice)}
      </span>
    `;

    // Update total price in cart
    cart.totalPrice = 0;
    cart.items.forEach((item) => {
      cart.totalPrice += item.totalPrice;
    });
    localStorage.setItem('cart', JSON.stringify(cart));

    // Render total price to UI
    const totalPriceOfCart = document.querySelector('.cart-total');
    totalPriceOfCart.innerHTML = `
    Tổng tiền:
    <span class="cart-total__price">
      ${new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(cart.totalPrice)}
    </span>
  `;
  } else {
    alert('Số lượng giày tối thiểu là 1');
  }
};

const handleQuantityInc = (e) => {
  const quantity = e.target.previousElementSibling;
  const quantityValue = parseInt(quantity.innerText);
  quantity.innerText = quantityValue + 1;

  // Get item index from cart
  const item = e.target.closest('.cart-list__item');
  const itemIndex = Array.from(item.parentElement.children).indexOf(item);

  // Update cart
  cart.items[itemIndex].quantity = quantityValue + 1;
  cart.items[itemIndex].totalPrice =
    cart.items[itemIndex].quantity * cart.items[itemIndex].price;
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update UI
  const totalPrice = item.querySelector('.cart-list__item-total-price');
  totalPrice.innerHTML = `
    Thành tiền:
    <span class="cart-list__item-price">
      ${new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(cart.items[itemIndex].totalPrice)}
    </span>
  `;

  // Update total price in cart
  cart.totalPrice = 0;
  cart.items.forEach((item) => {
    cart.totalPrice += item.totalPrice;
  });
  localStorage.setItem('cart', JSON.stringify(cart));

  // Render total price to UI
  const totalPriceOfCart = document.querySelector('.cart-total');
  totalPriceOfCart.innerHTML = `
    Tổng tiền:
    <span class="cart-total__price">
      ${new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(cart.totalPrice)}
    </span>
  `;
};

// Handle quantity btns using event delegation
const handleQuantityBtns = () => {
  const itemList = document.querySelector('.cart-list');
  itemList.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-list__item-quantity-btn-dec')) {
      handleQuantityDec(e);
      saveCartToLocalStore();
    } else if (
      e.target.classList.contains('cart-list__item-quantity-btn-inc')
    ) {
      handleQuantityInc(e);
      saveCartToLocalStore();
    }
  });
};

const saveCartToLocalStore = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const updateCartTotalPrice = () => {
  cart.totalPrice = 0;
  cart.items.forEach((item) => {
    cart.totalPrice += item.totalPrice;
  });
  localStorage.setItem('cart', JSON.stringify(cart));

  // Render total price to UI
  const totalPriceOfCart = document.querySelector('.cart-total');
  totalPriceOfCart.innerHTML = `
    Tổng tiền:
    <span class="cart-total__price">
      ${new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(cart.totalPrice)}
    </span>
  `;
};
