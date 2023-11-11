
//book
const cartIcon =document.querySelector(".cart-icon");
const body = document.querySelector('body');
const closeBtn =document.querySelector(".close-cart");

cartIcon.addEventListener('click', ()=> {
    body.classList.toggle('show-cart')
})

closeBtn.addEventListener('click', ()=> {
    body.classList.toggle('show-cart')
})


const bookButton = document.querySelector("#bookButton");
bookButton.addEventListener("click", function () {
    
    const divItem = document.querySelector("#cart-items div");
    const cartItems = document.querySelectorAll("#cart-items li");
     const itemButton = document.querySelectorAll("#cart-items button");
     const itemInput = document.querySelectorAll("#cart-items input");

   if(cartItems.length === 0){
    bookButton.disabled = false;
   }else{
    bookButton.disabled = true;

   
    let totalPrice = 0;

    cartItems.forEach(cartItem => {
        const quantity = parseInt(cartItem.cartData.quantityInput.value);
        const flightPrice = cartItem.cartData.flightPrice;
        totalPrice += flightPrice * quantity;

        const bookedFlight = {
            from: cartItem.cartData.from,
            to: cartItem.cartData.to,
            quantity: parseInt(cartItem.cartData.quantityInput.value),
            total: cartItem.cartData.flightPrice,
        }
        myFlights.push(bookedFlight)
        
    });
    
    localStorage.setItem("myFlights", JSON.stringify(myFlights));
    const confirmationPopup = document.createElement("div");
    confirmationPopup.className = "confirmation-popup";
    confirmationPopup.innerHTML = `
        <p>Your booking is confirmed.</p>
        <p>Total Amount to Pay: $${totalPrice}</p>
    `;

    confirmationPopup.addEventListener("click", function (event) {
        if (event.target === confirmationPopup) {
            confirmationPopup.remove();
            cartItems.forEach(cartItem => cartItem.remove());
            itemButton.forEach(cartButton => cartButton.remove());
            itemInput.forEach(input => input.remove())
            divItem.remove()
            cartNum =0
            spanNum.textContent = `${cartNum}`
        }
    });


    cart.appendChild(confirmationPopup);
}
});