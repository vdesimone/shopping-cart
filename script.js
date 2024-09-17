const iconCart = document.querySelector('.icon-cart');
const cartTab = document.querySelector('.cartTab');
const header = document.querySelector('header');
const listProductHTML = document.querySelector('.listProduct');

let listProducts = [];

iconCart.addEventListener('click', () => {
  cartTab.classList.toggle('showCart');
  header.classList.toggle('transform');
  listProductHTML.classList.toggle('transform');
})

const addDataToHTML = () => {
  listProductHTML.innerHTML = '';
  if(listProducts.length > 0) {
    listProducts.forEach(product => {
      let newProduct = document.createElement('div');
      newProduct.classList.add('item');
      newProduct.innerHTML = `
        <div class="productImage">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <h2>${product.name}</h2>
        <div class="price">${product.price}</div>
        <button class="addCart">
          Add To Cart
        </button>
      `;
      listProductHTML.appendChild(newProduct);
    })
  }
}

const initApp = () => {
  fetch('products.json')
  .then(response => response.json())
  .then(data => {
    listProducts = data;
    addDataToHTML();
  })
}
initApp();