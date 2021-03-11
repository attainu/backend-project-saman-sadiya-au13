// const addToCart = document.querySelectorAll('.add-to-cart');

// console.log(addToCart);
// for (const cartBtn of addToCart) {
//     console.log(cartBtn);
// }

$(".add-to-cart").on('click', function(event){
    const productName = event.target.getAttribute('data-product-name');
    const productPrice = event.target.getAttribute('data-product-price');
    const productId = event.target.getAttribute('data-product-id');
 
     const data = {
         name: productName,
         price: Number(productPrice),
         productId: productId,
         quantity: 1,
     }

     const session = JSON.parse(localStorage.getItem('session'));
     console.log(session);

     console.log(data);
     fetch(`/cart/cart/${session.user._id}`, { 
        method: "POST", 
        body: JSON.stringify(data),  
        headers: { 
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Bearer ${session.token}`,
        } 
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    }).catch(err => console.log(err));
});
 