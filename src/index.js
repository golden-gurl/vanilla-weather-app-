function displayTemp(response) {
  console.log(response.data.main.temp);
  let tempElement = document.querySelector("#Temp");
  tempElement.innerHTML = response.data.main.temp;
}

let apiKey = `5d5058b9c4b2f291c2f88009101bb780`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemp);
