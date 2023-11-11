const userName =  document.getElementById("name");

const flightList = document.getElementById("flight-list");
const searchBar =  document.getElementById("search-bar");
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");



const flightsSearch = [
   
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






let cartNum = 0

  function createflightCard({ from, to, flightDeals }) {
    const cardContainer = document.createElement("div");
    cardContainer.style.width = '70%'
    


    flightDeals.forEach((flight) => {

        const listItem = document.createElement("li");
        listItem.classList.add("flight-list-item");
        const rightDiv =  document.createElement("div");
        const leftDiv =  document.createElement("div");
        rightDiv.classList.add("right-div");
        rightDiv.classList.add("left-div");
        const fromToDiv =  document.createElement("div");
        fromToDiv.classList.add("from-to-div");

        const svgString = '<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/></svg>';

        // Convert the SVG string to a DOM element
        const parser = new DOMParser();
        const svgElement = parser.parseFromString(svgString, 'image/svg+xml').querySelector('svg');


        const KeyElement = document.createElement("p");
        KeyElement.appendChild(document.createTextNode(` ${flight.key}`));
        leftDiv.appendChild(KeyElement);

        const fromElement = document.createElement("p");
        const fromStrong = document.createElement("strong");
        fromStrong.textContent = "From:";
        fromElement.appendChild(fromStrong);
        fromElement.appendChild(document.createTextNode(` ${from}`));
        fromToDiv.appendChild(fromElement);

        fromToDiv.appendChild(svgElement);

        const toElement = document.createElement("p");
        const toStrong = document.createElement("strong");
        toStrong.textContent = "To:";
        toElement.appendChild(toStrong);
        toElement.appendChild(document.createTextNode(` ${to}`));
        fromToDiv.appendChild(toElement);
        leftDiv.appendChild(fromToDiv);


        const priceElement = document.createElement("p");
        const priceStrong = document.createElement("strong");
        // priceStrong.textContent = "Price:";
        priceElement.appendChild(priceStrong);
        priceElement.appendChild(document.createTextNode(` ${flight.price.units} ${flight.price.currencyCode}`));
        rightDiv.appendChild(priceElement);


        const addToCart = document.createElement("button");
        addToCart.classList.add("addToCart")
        addToCart.textContent = "add to cart";
        addToCart.addEventListener("click", function () {
             cartNum += 1
            spanNum.textContent = `${cartNum}`
            addCart(flight,from,to) 
           
        });
        rightDiv.appendChild(addToCart);

        listItem.appendChild(leftDiv);
        listItem.appendChild(rightDiv);
        



        cardContainer.appendChild(listItem);
    });

    return cardContainer;
}

// function updateCartNum() {
//     ;
// }

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
const spanNum =document.querySelector(".cart-icon span");


function addCart(flight,from,to) {
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
        flightPrice: flight.price.units,
        from,
        to,

    };
   

    quantityInput.addEventListener("input", function() {
        const totalPrice = flight.price.units * parseInt(quantityInput.value);
        cartItem.textContent = `${from} to ${to} - Price: $${totalPrice}`;
    });

    deleteItem.textContent = 'delete';
    
    deleteItem.addEventListener("click", function () {
        cartItem.remove(); 
        deleteItem.remove();
        quantityInput.remove()
        divItem.remove()
        cartNum -= 1
        spanNum.textContent = `${cartNum}`
          });

    
    cartItem.textContent = `${from} to ${to} - Price: $${flight.price.units}`;
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