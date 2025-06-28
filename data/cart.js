import {validDeliveryOption} from './deliveryOptions.js';

class Cart{
  cartItems;
  #localStorageKey;

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];

    /*if(!this.cartItems){
      this.cartItems = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }*/
  }

  saveToStorage(){
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
  }

  addToCart(productId){
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const quantity = Number(quantitySelector.value);

    if(matchingItem){
      matchingItem.quantity += quantity;
    }
    else{
      const deliveryOptionId = '1';
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId
      });
    }

    this.saveToStorage();
  }

  addToCartOrders(productId,quantity){
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    if(matchingItem){
      matchingItem.quantity += quantity;
    }
    else{
      const deliveryOptionId = '1';
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId){
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });

    this.cartItems=newCart;

    this.saveToStorage();

    /*let index = cart.findIndex(cartItem => cartItem.productId === productId);
    if(index !== -1) cart.splice(index,1);*/
  }

  calculateCartQuantity(){
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

  updateQuantity(productId,newQuantity){
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        cartItem.quantity = newQuantity;
      }
    });
    this.saveToStorage();
  }

  updateDeliveryOption(productId,deliveryOptionId){
    if(!validDeliveryOption(deliveryOptionId)) return;

    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    if(!matchingItem) return;

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }

  loadCart(fun){
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load',() => {
      console.log(xhr.response);
      fun();
    });

    xhr.open('GET','https://supersimplebackend.dev/cart');
    xhr.send();
  }

  async loadCartFetch(){
    const response = await fetch('https://supersimplebackend.dev/cart');
    const text = await response.text();
    console.log(text);
  }

  resetCart(){
    this.cartItems = [];
    this.saveToStorage();
  }
}

export const cart = new Cart('cart');