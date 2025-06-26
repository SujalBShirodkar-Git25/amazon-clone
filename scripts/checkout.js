import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProductsFetch} from '../data/products.js';
import {cart} from '../data/cart.js';

async function loadPage(){
  try{
    await loadProductsFetch();
    const value = await new Promise((resolve,reject) => {
      cart.loadCart(() => {
        resolve('value3');
      });
    });
  }
  catch(error){
    console.log('Unexpected error. Please try again later.');
  }
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();