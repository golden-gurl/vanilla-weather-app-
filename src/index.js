function displayTemp(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#cityName");
  let tempElement = document.querySelector("#Temp");
  let condtionElement = document.querySelector("#cityCondition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  tempElement.innerHTML = response.data.main.temp;
  cityElement.innerHTML = response.data.name;
  condtionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
}

let apiKey = `5d5058b9c4b2f291c2f88009101bb780`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemp);
