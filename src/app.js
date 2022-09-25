function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
  let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
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
  let month = months[date.getMonth()];
  return `${day} ${month}, ${hours}:${minutes}`;
}

function displayTemperature(response) {
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
  date.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "6672216a4aa17866c4eee801a1995ca5";
let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
let apiUrl = `${apiEndpoint}q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
