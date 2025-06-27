import {orders} from '../data/orders.js';
import {getProduct,loadProductsFetch} from '../data/products.js';
import formatCurrency from './utils/money.js';
import {cart} from '../data/cart.js';
import renderAmazonHeader from './amazonHeader.js';
//import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

renderAmazonHeader();

async function renderOrders(){
  await loadProductsFetch();

  let ordersHTML = '';

  function getDate(time){
    //const orderDate = dayjs(time).format('MMMM D');
    
    const date = new Date(time);
    const orderDate = date.toLocaleDateString('en-US',{
      month: 'long',
      day: 'numeric'
    });
    return orderDate;
  }

  orders.forEach((order) => {
    ordersHTML +=
    `
      <div class="order-container">
            
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${getDate(order.orderTime)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
  
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid js-order-details-grid">
          ${renderProducts(order)}
        </div>
      </div>
    `
  });

  function renderProducts(order){
    let html = '';

    order.products.forEach((product) => {
      const matchingProduct = getProduct(product.productId);

      html +=
      `
        <div class="product-image-container">
          <img src=${matchingProduct.image}>
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${getDate(product.estimatedDeliveryTime)}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again" data-product-id="${matchingProduct.id}" data-quantity="${product.quantity}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${matchingProduct.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    return html;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click',() => {
      const {productId} = button.dataset;
      const {quantity} = button.dataset;
      cart.addToCartOrders(productId,Number(quantity));
      
      button.innerHTML = 'Added';
      setTimeout(() => {
        button.innerHTML = `
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
        `;
      },1000);

      renderAmazonHeader();
    });
  });
}
renderOrders();