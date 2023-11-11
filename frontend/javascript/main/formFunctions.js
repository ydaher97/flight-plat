//form


 const closeButton = document.getElementById("closeButton");
// const addFlightButton = document.getElementById("addFlightButton");
const addFlightForm = document.getElementById("addFlightForm");


 
const fromInput = document.getElementById("fromInput");
const toInput = document.getElementById("toInput");
const priceInput = document.getElementById("priceInput");
const departDateInput = document.getElementById("departDateInput");
const returnDateInput = document.getElementById("returnDateInput");
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
