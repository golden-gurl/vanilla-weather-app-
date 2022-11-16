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


function displayTemp(response) {
  let cityElement = document.querySelector("#cityName");
  let tempElement = document.querySelector("#Temp");
  let condtionElement = document.querySelector("#cityCondition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weather-icon");

  tempElement.innerHTML = response.data.main.temp;
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


}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputSearch = document.querySelector("#city-input");
 console.log(cityInputSearch);
  search(cityInputSearch.value);
}
function search(cityName){
let apiKey = `c332cfb50649ae3bbb3de721581b0319`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemp);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit); 

search("Sarasota");