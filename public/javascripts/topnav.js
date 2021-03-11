const cart = document.getElementById('cart');
const order = document.getElementById('order');
const session = JSON.parse(localStorage.getItem('session'));

if (cart) {
    console.log(cart);
    cart.addEventListener('click', () => {
        window.location.replace(`/cart/cart/${session.user._id}`)
    }) 
}

if (order) {
    console.log(order);
    order.addEventListener('click', () => {
        window.location.replace(`/order/userorderdetail/${session.user._id}`)
    }) 
}

