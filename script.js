const iconCart = document.querySelector('.icon-cart');
const cartTab = document.querySelector('.cartTab');
const header = document.querySelector('header');
const listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

let listProducts = [];
let carts = [];

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
      newProduct.dataset.id = product.id;
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

listProductHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains('addCart')) {
    let product_id = positionClick.parentElement.dataset.id;
    addToCart(product_id);
  }
})

const addToCart = (product_id) => {
  let findProductInCart = carts.findIndex((value) => value.product_id == product_id);
  if(carts.length <= 0) {
    carts = [{
      product_id: product_id,
      quantity: 1
    }]
  } else if(findProductInCart < 0) {
    carts.push({
      product_id: product_id,
      quantity: 1
    })
  } else {
    carts[findProductInCart].quantity += 1;
  }
  addCartToHTML();
}

const addCartToHTML = () => {
  listCartHTML.innerHTML = '';
  if (carts.length > 0) {
    carts.forEach(cart => {
      let newCart = document.createElement('div');
      newCart.classList.add('item');
      let findProduct = listProducts.findIndex((value) => value.id == cart.product_id);
      let info = listProducts[findProduct];
      newCart.innerHTML = `
        <div class="image">
          <img src="${info.image}" alt="">
        </div>
        <div class="name">
          ${info.name}
        </div>
        <div class="totalPrice">
          $${info.price * cart.quantity}
        </div>
        <div class="quantity">
          <span class="minus"><</span>
          <span>${cart.quantity}</span>
          <span class="plus">></span>
        </div>
      `;
      listCartHTML.appendChild(newCart);
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