const iconCart = document.querySelector('.icon-cart');
const cartTab = document.querySelector('.cartTab');
const header = document.querySelector('header');
const listProduct = document.querySelector('.listProduct')

iconCart.addEventListener('click', () => {
  cartTab.classList.toggle('showCart');
  header.classList.toggle('transform');
  listProduct.classList.toggle('transform');
})