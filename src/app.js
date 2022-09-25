let now = new Date();

let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
let hours = (now.getHours() < 10 ? "0" : "") + now.getHours();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];
let currentDateAndTime = document.querySelector("#time-date");
currentDateAndTime.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}`;

function displayTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let location = document.querySelector("#location");
  let minTemperature = document.querySelector("#temp-low");
  let maxTemperature = document.querySelector("#temp-high");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let feelsLike = document.querySelector("#feels-like");
  let icon = document.querySelector("#icon");
  temperature.innerHTML = Math.round(response.data.main.temp);
  location.innerHTML = response.data.name;
  minTemperature.innerHTML = Math.round(response.data.main.temp_min);
  maxTemperature.innerHTML = Math.round(response.data.main.temp_max);
  wind.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "6672216a4aa17866c4eee801a1995ca5";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handelSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", navGeoLoc);

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "6672216a4aa17866c4eee801a1995ca5";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}

function navGeoLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
