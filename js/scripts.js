// create constants to get elements from my html
const submitButton = document.querySelector("#submitButton");
const tableBody = document.querySelector("#tableBody");
const userInput = document.querySelector(".userInput");

const myID = "1227169";
const myName = "Kiana";

//Function that fetches teh weather from the API
function fetchDataFromAPI() {
    // create constants for baseURL, api key, user's input
    const baseURL = "https://api.openweathermap.org/data/2.5/weather";
    const key = "d6449715b6e887c3c7c555b49116dc2f";
    const userSearch = userInput.value;

    if (userSearch === "") {
        alert("Please enter a city to be searched!");
    } else {
        // create the complete url
        const url = `${baseURL}?q=${userSearch}&appid=${key}`;
        console.log(url);

        // fetch request to the complete url
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(json => {
                if (json.cod !== 200) {
                    throw new Error(json.message || 'Unknown error');
                }
                displayWeather(json);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                console.error('Response status:', error.response.status);
                console.error('Response text:', error.response.statusText);
            });
    }
}



// function to display the movies to dom
function displayWeather(json) {
    console.log(json);

    tableBody.innerHTML = "";

    const tableRow = document.createElement("tr");



    // create the elemets for the table
    const cityNameTd = document.createElement("tr");
    const temperatureTd = document.createElement("tr");
    const weatherdescriptionTd = document.createElement("tr");

    //Populate table cells
    cityNameTd.textContent = json.name;
    temperatureTd.textContent = `${Math.round(json.main.temp - 273.15)}°C`;
    weatherdescriptionTd.textContent = json.weather[0].description;

    tableRow.appendChild(cityNameTd);
    tableRow.appendChild(temperatureTd);
    tableRow.appendChild(weatherdescriptionTd);

    //Table row to table body
    tableBody.appendChild(tableRow);



    tableBody.appendChild(tableRow);

}

// add event listener for button click
submitButton.addEventListener("click", fetchDataFromAPI);