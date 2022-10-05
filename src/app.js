function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img src= "http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" class="forecast-img" />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}° </span><span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
            </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "6672216a4aa17866c4eee801a1995ca5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let location = document.querySelector("#location");
  let minTemperature = document.querySelector("#temp-low");
  let maxTemperature = document.querySelector("#temp-high");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let feelsLike = document.querySelector("#feels-like");
  let icon = document.querySelector("#icon");

  celcius = response.data.main.temp;
  min = response.data.main.temp_min;
  max = response.data.main.temp_max;
  feels = response.data.main.feels_like;

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

  getForecast(response.data.coord);
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

function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let minTemperature = document.querySelector("#temp-low");
  let maxTemperature = document.querySelector("#temp-high");
  let feelsLikeTemperature = document.querySelector("#feels-like");
  let cTextOne = document.querySelector("#c-text-one");
  let cTextTwo = document.querySelector("#c-text-two");
  let cTextThree = document.querySelector("#c-text-three");
  celciusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  cTextOne.innerHTML = "°F";
  cTextTwo.innerHTML = "°F";
  cTextThree.innerHTML = "°F";
  let fahrenheitTemperature = (celcius * 9) / 5 + 32;
  let fahrenheidMinTemperature = (min * 9) / 5 + 32;
  let fahrenheidMaxTemperature = (max * 9) / 5 + 32;
  let fahrenheidFeelsLikeTemperature = (feels * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
  minTemperature.innerHTML = Math.round(fahrenheidMinTemperature);
  maxTemperature.innerHTML = Math.round(fahrenheidMaxTemperature);
  feelsLikeTemperature.innerHTML = Math.round(fahrenheidFeelsLikeTemperature);
}

function showCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let minTemperature = document.querySelector("#temp-low");
  let maxTemperature = document.querySelector("#temp-high");
  let feelsLikeTemperature = document.querySelector("#feels-like");
  let cTextOne = document.querySelector("#c-text-one");
  let cTextTwo = document.querySelector("#c-text-two");
  let cTextThree = document.querySelector("#c-text-three");
  fahrenheitTemp.classList.remove("active");
  celciusTemp.classList.add("active");
  cTextOne.innerHTML = "°C";
  cTextTwo.innerHTML = "°C";
  cTextThree.innerHTML = "°C";
  temperature.innerHTML = Math.round(celcius);
  minTemperature.innerHTML = Math.round(min);
  maxTemperature.innerHTML = Math.round(max);
  feelsLikeTemperature.innerHTML = Math.round(feels);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", navGeoLoc);

let celcius = null;

let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", showFahrenheit);

let celciusTemp = document.querySelector("#celcius");
celciusTemp.addEventListener("click", showCelcius);

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
