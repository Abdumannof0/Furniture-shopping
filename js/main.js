const iconCard = document.querySelector('.icon_cart')
const closeCart = document.querySelector('.close')
const body = document.querySelector('body')
const listProductHTML = document.querySelector('.listProduct')

let listProducts = [];

iconCard.addEventListener('click', () => {
    body.classList.toggle('show_cart')
})

closeCart.addEventListener('click', () => {
    body.classList.toggle('show_cart')
})

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProducts.length > 0) {
        listProducts.forEach(data => {
            let newProduct = document.createElement('div')
            newProduct.classList.add('item')
            newProduct.innerHTML =
                `
                <img src="./image/1.png" alt="" class="item_img" />
                    <h2 class="item_title">Furniture</h2>
                    <h3 class="item_price">100.00</h3>
                <button class="item_btn">Add to Cart</button>

            `;
            listProductHTML.appendChild(newProduct)
        })
    }
}

const initApp = () => {
    fetch('products.json')
        .then(res => res.json())
        .then(data => {
            listProducts => data;
            // console.log(data);
            addDataToHTML()
        })
}
initApp()