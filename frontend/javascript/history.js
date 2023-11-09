const myFlights = document.getElementById("my-flights");
const flights = getMyFlights(); // Assuming this function retrieves your flights

if (flights.length > 0) {
    const flightsContainer = document.createElement("div");
    const totalPrice = document.getElementById('total');

    let total =0
    flights.forEach(flight => {
        const flightElement = document.createElement("div");
        flightElement.classList.add("flight-card"); 

         total += flight.quantity * flight.total;

        const fromToElement = document.createElement("p");
        fromToElement.textContent = `From: ${flight.from} To: ${flight.to}`;

        const quantityPriceElement = document.createElement("p");
        quantityPriceElement.textContent = `Quantity: ${flight.quantity}, Price: $${flight.total}`;
        
        flightElement.appendChild(fromToElement);
        flightElement.appendChild(quantityPriceElement);

        flightsContainer.appendChild(flightElement);
    });
    totalPrice.textContent = `total is :${total} `
    myFlights.appendChild(flightsContainer);
    
} else {
    myFlights.textContent = "No flights found in your order history.";
}






function getMyFlights() {
    const flightsJSON = localStorage.getItem("myFlights");

    if (flightsJSON) {
        const flights = JSON.parse(flightsJSON);
        myFlights.textContent = `you have ${flights.length} flights`;
        return flights;
    } else {
        myFlights.textContent = "No flights found.";
        return [];
    }
}