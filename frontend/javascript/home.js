const userName =  document.getElementById("name");

const flightList = document.getElementById("flight-list");
const searchBar =  document.getElementById("search-bar");
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");



const flightsSearch = [
    // {
    //     from: "New York",
    //     to: "Los Angeles",
    //     price: 300,
    //     dates: [
    //         { departDate: new Date("2023-01-15"), returnDate: new Date("2023-01-20") },
            
    //     ]
    // },
    // {
    //     from: "Chicago",
    //     to: "Miami",
    //     price: 250,
    //     dates: [
    //         { departDate: new Date("2023-01-10"), returnDate: new Date("2023-01-17") },
           
    //     ]
    // },
    // {
    //     from: "San Francisco",
    //     to: "Seattle",
    //     price: 150,
    //     dates: [
    //         { departDate: new Date("2023-01-12"), returnDate: new Date("2023-01-18") },
          
    //     ]
    // }
];

const myFlights = []
const apiFlights = []

const getflights = async () => {
    try {
        const response = await fetch('http://localhost:8000/flight');
        const flights = await response.json();

        // Clear the existing flight data in flightsSearch
        apiFlights.length = 0;

        // Push the new data from the API
        apiFlights.push(flights.data.flightDeals);
        //console.log(apiFlights)

        // Display the new flights
        display();
    } catch (err) {
        console.log(err);
    }
}
//  getflights()
 
//  function display() {
//     flightList.innerHTML = '';
//     // console.log('apiFlights[0] data structure:', typeof apiFlights[0], apiFlights[0]);

//     if (flightsSearch[0]) {
//          console.log('Data available:', flightsSearch[0]);
         
//                   const flightCard = createflightCard(flightsSearch[0]);

//         // if (Array.isArray(flightsSearch[0])) {
//             // Iterate through the new data and create flight cards
//             // flightsSearch[0].forEach(flight => {
//                 // Process each flight object
//                 // console.log('Key:', flight.key);
//                 // console.log('Offer Token:', flight.offerToken);
//                 // console.log('Price:', flight.price);
//                 // console.log('Traveller Prices:', flight.travellerPrices);
//                 //  const flightCard = createflightCard(flight);
//                 //  console.log('flight', flight);
//                   flightList.appendChild(flightCard);
//                 // You can create flight cards or perform other actions with this data
//             // });
//         // } else {
//         //     console.log('apiFlights[0] is not an array.');
//         // }
//     } else {
//         console.log('No data available in apiFlights.');
//     }
// }


function logout(){

    localStorage.removeItem('user');
    localStorage.removeItem('myFlights')
    window.location.href = "../index.html";
}


function loadState() {
    const savedState = localStorage.getItem('user');
    
    if (savedState) {
      const gameState = JSON.parse(savedState);
      email = gameState.email;
      password = gameState.password;
      name = gameState.name;
      admin = gameState.isAdmin;
     
    }

    if(admin === true){
        
    console.log("admin")
        const add = document.querySelector('.add');
        add.style.display = "block"
    }
}
loadState()

flightsSearch.forEach((flight) => {
    const flightCard = createflightCard(flight);
    flightList.appendChild(flightCard);
  });


  function createflightCard({ from, to, flightDeals }) {
    const cardContainer = document.createElement("div");
    cardContainer.style.width = '95%'

    flightDeals.forEach((flight) => {
        const listItem = document.createElement("li");
        listItem.classList.add("flight-list-item");


        const KeyElement = document.createElement("p");
        KeyElement.appendChild(document.createTextNode(` ${flight.key}`));
        listItem.appendChild(KeyElement);

        const fromElement = document.createElement("p");
        const fromStrong = document.createElement("strong");
        fromStrong.textContent = "From:";
        fromElement.appendChild(fromStrong);
        fromElement.appendChild(document.createTextNode(` ${from}`));
        listItem.appendChild(fromElement);

        const toElement = document.createElement("p");
        const toStrong = document.createElement("strong");
        toStrong.textContent = "To:";
        toElement.appendChild(toStrong);
        toElement.appendChild(document.createTextNode(` ${to}`));
        listItem.appendChild(toElement);

        const priceElement = document.createElement("p");
        const priceStrong = document.createElement("strong");
        priceStrong.textContent = "Price:";
        priceElement.appendChild(priceStrong);
        priceElement.appendChild(document.createTextNode(` ${flight.price.units} ${flight.price.currencyCode}`));
        listItem.appendChild(priceElement);


        const addToCart = document.createElement("button");
        addToCart.classList.add("addToCart")
        addToCart.textContent = "add to cart";
        addToCart.addEventListener("click", function () {
            addCart(flight) 
        });
        listItem.appendChild(addToCart);

        cardContainer.appendChild(listItem);
    });

    return cardContainer;
}

function display() {
    flightList.innerHTML = '';

    if (flightsSearch[0]) {
        const flightCard = createflightCard(flightsSearch[0]);
        flightList.appendChild(flightCard);
    } else {
        console.log('No data available in flightsSearch.');
    }
}


// function createflightCard({from,to,flightDeals}) {
//     const listItem = document.createElement("li");
//     listItem.classList.add("flight-list-item");
//     // listItem.setAttribute("data-flight-id", flight.id);
    



//     const fromElement = document.createElement("p");
//     const fromStrong = document.createElement("strong");
//     fromStrong.textContent = "from:";
//     fromElement.appendChild(fromStrong);
//     fromElement.appendChild(document.createTextNode(` ${from}`));
//     listItem.appendChild(fromElement);

//     const toElement = document.createElement("p");
//     const toStrong = document.createElement("strong");
//     toStrong.textContent = "to:";
//     toElement.appendChild(toStrong);
//     toElement.appendChild(document.createTextNode(` ${to}`));
//     listItem.appendChild(toElement);

//     const priceElement = document.createElement("p");
//     const priceStrong = document.createElement("strong");
//     priceStrong.textContent = "price:";
//     priceElement.appendChild(priceStrong);
//     priceElement.appendChild(document.createTextNode(` ${flightDeals.forEach((flight) =>{
//         flight.price.units
//     })} `));
//     listItem.appendChild(priceElement);

//     // const datesElement = document.createElement("p");
//     // const datesStrong = document.createElement("strong");
//     // datesStrong.textContent = "dates:";
//     // datesElement.appendChild(datesStrong);
//     // flight.dates.forEach((dateInfo, index) => {
//     //     const dateText = document.createElement("span");
//     //     const separator = index < flight.dates.length - 1 ? ', ' : ''; // Add a comma and space if not the last date
//     //     dateText.textContent = ` Departure: ${formatDate(dateInfo.departDate)}, Return: ${formatDate(dateInfo.returnDate)}${separator}`;
//     //     datesElement.appendChild(dateText);
//     // });

//     // listItem.appendChild(datesElement);

   
//     // const addToCart = document.createElement("button");
//     // addToCart.classList.add("addToCart")
//     // addToCart.textContent = "add to cart";
//     // addToCart.addEventListener("click", function () {
//     //     addCart(flight) 
//     // });
//     // listItem.appendChild(addToCart);

    

//     return listItem;
// }


function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
}

function retrievesUser(){
    const UserJSON = localStorage.getItem("user")
    if (UserJSON) {
        const user = JSON.parse(UserJSON);
        if(user.isAdmin){
            userName.textContent = `${user.name} is Admin `;
        }else{
            userName.textContent = `${user.name} is not Admin `
        }
        return user;
    } else {
        userName.textContent = "No user found.";
        return [];
    }
}
retrievesUser()

function addCart(flight) {
    const divItem = document.createElement("div");
    const cartItem = document.createElement("li");
    const deleteItem = document.createElement("button");
    bookButton.disabled = false;

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.min = 1;
    quantityInput.value = 1;

    cartItem.cartData = {
        quantityInput: quantityInput,
        flightPrice: flight.price,
        from: flight.from,
        to: flight.to,

    };

    quantityInput.addEventListener("input", function() {
        const totalPrice = flight.price * parseInt(quantityInput.value);
        cartItem.textContent = `${flight.from} to ${flight.to} - Price: $${totalPrice}`;
    });

    deleteItem.textContent = 'delete';
    
    deleteItem.addEventListener("click", function () {
        cartItem.remove(); 
        deleteItem.remove();
        quantityInput.remove()
        divItem.remove()
      });

    
    cartItem.textContent = `${flight.from} to ${flight.to} - Price: $${flight.price}`;
    divItem.appendChild(cartItem);
    divItem.appendChild(quantityInput);
    divItem.appendChild(deleteItem);

    cartItems.appendChild(divItem);
}






  function displayflights(searchQuery) {
    flightList.innerText = ""; 
  
    flightsSearch.forEach((flight) => {
      if (searchQuery) {
        if (flight.from.toLowerCase().includes(searchQuery.toLowerCase())) {
          const flightCard = createflightCard(flight);
          flightList.appendChild(flightCard);
        }
      } else {
        const flightCard = createflightCard(flight);
        flightList.appendChild(flightCard);
      }
    });
  }
  
 
  displayflights("");
  
  
  searchBar.addEventListener("input", function () {
    const searchQuery = searchBar.value;
    displayflights(searchQuery);
  });



//form
  const addFlightButton = document.getElementById("addFlightButton");
const addFlightForm = document.getElementById("addFlightForm");
const fromInput = document.getElementById("fromInput");
const toInput = document.getElementById("toInput");
const priceInput = document.getElementById("priceInput");
const departDateInput = document.getElementById("departDateInput");
const returnDateInput = document.getElementById("returnDateInput");
const closeButton = document.getElementById("closeButton");
const FormWindow = document.getElementById("formWindow")

addFlightButton.addEventListener("click", function () {
    addFlightForm.style.display = "block";
    FormWindow.style.display = "block"
});

closeButton.addEventListener("click", function () {
    addFlightForm.style.display = "none";
    FormWindow.style.display = "none"

});

addFlightForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const from = fromInput.value;
    const to = toInput.value;
    const price = parseInt(priceInput.value);
    const departDate = new Date(departDateInput.value);
    const returnDate = new Date(returnDateInput.value);

    const newFlight = {
        from,
        to,
        price,
        dates: [{ departDate, returnDate }],
    };

    
    flightsSearch.push(newFlight);

   
    addFlightForm.reset();
    addFlightForm.style.display = "none";
    addFlightButton.style.display = "block";

    
    displayflights("");
    FormWindow.style.display = "none"

    
});



//book
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
        }
    });


    cart.appendChild(confirmationPopup);
}
});




//sort
const sortSelect = document.getElementById("sort-flights");

sortSelect.addEventListener("change", function () {
    const selectedOption = sortSelect.value;
    flightList.innerText = "";

    if (selectedOption === "price") {
        // Sort flights by price in ascending order
        flightsSearch.sort((a, b) => a.price - b.price);
        flightsSearch.forEach((flight) => {
            const flightCard = createflightCard(flight);
        flightList.appendChild(flightCard);
        })
    }
        displayflights("");

    

   
   
});


const apiParamsForm = document.getElementById('apiParamsForm');

apiParamsForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(apiParamsForm);

    try {
        const response = await fetch('http://localhost:8000/search', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();


            if (data.data && Array.isArray(data.data.flightDeals)) {
                const from = formData.get('fromId');
                const to = formData.get('toId');
                //  const { from, to } = Object.fromEntries(formData);

                flightsSearch.push({
                    from: from,
                    to: to,
                    flightDeals: data.data.flightDeals,
                });

                console.log('flightsSearch', flightsSearch);
                display();
            } else {
                console.error('Invalid data structure in API response.');
            }
        } else {
            console.error('Request failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});