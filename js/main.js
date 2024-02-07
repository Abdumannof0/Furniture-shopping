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
        const product_id = positionClick.parentElement.dataset.id;
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
    addCartToMemory()
}
addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts))
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity
            let newCart = document.createElement('list_cart')
            newCart.classList.add('total_item')
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts
                .findIndex((value) => value.id == cart.product_id)
            let info = listProducts[positionProduct]
            newCart.innerHTML =
                `
                <div class="total_image">
                    <img class="total_img" src="${info.image}" alt="" />
                </div>
                <div class="total_name">${info.name}</div>
                <div class="total_price">$${info.price}</div>
                <div class="quantity">
                    <button class="minus">-</button>
                    <button>1</button>
                    <button class="plus">+</button>
                </div>
            `;
            listCartHTML.appendChild(newCart)
        })
    }
    iconCartBtn.innerHTML = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') ||
        positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus'
        if (positionClick.classList.contains('plus')) {
            type = 'plus'
        }
        changeQuantity(product_id, type)
    }
})
const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts
        .findIndex((value) => value.product_id == product_id)
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;

            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                } else {
                    carts.splice(positionItemInCart, 1)
                }
                break;
        }
    }
    addCartToMemory()
    addCartToHTML()
}

const initApp = () => {
    // Get data from JSON
    fetch('products.json')
        .then(res => res.json())
        .then(data => {
            listProducts = data;
            addDataToHTML()
            // Get cart from Memory
            if (localStorage.getItem('cart')) {
                carts = JSON.parse(localStorage.getItem('cart'))
                addCartToHTML()
            }
        })
}
initApp()