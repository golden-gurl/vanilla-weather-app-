function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours} : ${minutes}`;
}
function displayForecast(response){
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thurs", "Fri", "Sat", "Sun"];
  days.forEach(function (day){
  forecastHTML =
   forecastHTML + 
    ` <div class="col-2">
      <div class ="weather-forecast-day">${day}</div>
       <img src="" alt=""/>              
      <div class="weather-forecast-tempertaures">
      <span class="weather-forecast-tempertaure-max">18°</span> 
      <span class="weather-forecast-tempertaure-min">14°</span>
      </div>
      </div>
`;
  });
  forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}
function getForecast (coordinates){
  console.log(coordinates);
  let apiKey = "c332cfb50649ae3bbb3de721581b0319";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayTemp(response) {
  let cityElement = document.querySelector("#cityName");
  let tempElement = document.querySelector("#temp");
  let condtionElement = document.querySelector("#cityCondition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weather-icon");
  celiusTemperature = response.data.main.temp;
  tempElement.innerHTML = Math.round(celiusTemperature);
  cityElement.innerHTML = response.data.name;
  condtionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
getForecast(response.data.coord);

}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputSearch = document.querySelector("#city-input");
 //console.log(cityInputSearch);
  search(cityInputSearch.value);
}
function search(cityName){
let apiKey = `c332cfb50649ae3bbb3de721581b0319`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemp);
}

function displayfaren(event){
  event.preventDefault();
  let farenTemperature = (celiusTemperature * 9 ) / 5 + 32;
  let tempElement = document.querySelector("#temp");
  celiusLink.classList.remove("active");
  farenLink.classList.add("active");
  tempElement.innerHTML = Math.round(farenTemperature);
}


function displaycelius(event){
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  farenLink.classList.remove("active");
  celiusLink.classList.add("active");
  tempElement.innerHTML = Math.round(celiusTemperature);
}

let celiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit); 

let farenLink = document.querySelector("#faren-link");
farenLink.addEventListener("click", displayfaren);

let celiusLink = document.querySelector("#celius-link");
celiusLink.addEventListener("click", displaycelius);

search("Sarasota");
displayForecast();