const iconCard = document.querySelector('.icon_cart')
const closeCart = document.querySelector('.close')
const body = document.querySelector('body')
const listProductHTML = document.querySelector('.list_product')
const listCartHTML = document.querySelector('.list_cart')
let iconCartBtn = document.querySelector('.logo_basket span')

let listProducts = [];
let carts = []

iconCard.addEventListener('click', () => {
    body.classList.toggle('show_cart')
})

closeCart.addEventListener('click', () => {
    body.classList.toggle('show_cart')
})

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            const newProduct = document.createElement('div')
            newProduct.classList.add('item')
            newProduct.dataset.id = product.id
            newProduct.innerHTML =
                `
            <img src="${product.image}" alt="" class="item_img" />
            <h2 class="item_title">${product.name}</h2>
            <h3 class="item_price">${product.price}</h3>
            <button class="item_btn">Add to Cart</button>
            `;
            listProductHTML.appendChild(newProduct)
        })
    }
}

listProductHTML.addEventListener('click', (event) => {
    const positionClick = event.target;
    if (positionClick.classList.contains('item_btn')) {
        const product_id = positionClick.parentElement.dataset.id
        addToCart(product_id)
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts
        .findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    } else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        })
    } else {
        carts[positionThisProductInCart]
            .quantity = carts[positionThisProductInCart]
                .quantity + 1;
    }
    addCartToHTML()
    console.log(carts);
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    if (carts.length > 0) {
        carts.forEach(cart => {
            let newCart = document.createElement('div')
            newCart.classList.add('total_item')
            let positionProduct = listProducts
                .findIndex((value) => value.id == cart.product_id)
            let info = listProducts[positionProduct]
            newCart.innerHTML =
                `
            <div class="total_img">
             <img src="${info.image}" alt="" />
         </div>
         <div class="total_name"></div>
         <div class="total_price">$</div>
         <div class="quantity">
          <button class="minus">-</button>
          <button>1</button>
          <button class="plus">+</button>
        </div>
            `;
            listCartHTML.appendChild(newCart)
        })
    }
}

const initApp = () => {
    fetch('products.json')
        .then(res => res.json())
        .then(data => {
            listProducts = data;
            addDataToHTML()
        })
}
initApp()