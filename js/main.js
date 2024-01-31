const iconCard = document.querySelector('.icon_cart')
const closeCart = document.querySelector('.close')
const body = document.querySelector('body')

iconCard.addEventListener('click', () => {
    body.classList.toggle('show_cart')
})

closeCart.addEventListener('click', () => {
    body.classList.toggle('show_cart')
})
