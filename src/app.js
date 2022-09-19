function formatDate(timestamp) {}

function displayTemperature(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temperature");
  let location = document.querySelector("#location");
  let minTemperature = document.querySelector("#temp-low");
  let maxTemperature = document.querySelector("#temp-high");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let feelsLike = document.querySelector("#feels-like");
  let date = document.querySelector("#time-date");
  temperature.innerHTML = Math.round(response.data.main.temp);
  location.innerHTML = response.data.name;
  minTemperature.innerHTML = Math.round(response.data.main.temp_min);
  maxTemperature.innerHTML = Math.round(response.data.main.temp_max);
  wind.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  date.innerHTML = "Wednesday September 14, 18:55";
}

let apiKey = "6672216a4aa17866c4eee801a1995ca5";
let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
let apiUrl = `${apiEndpoint}q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
