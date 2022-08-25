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

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", ,];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");
}
function getForecast(coordinates) {
  let apiKey = "460ad125169d1bce8021a502d6b900de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  let temperatureEl = document.querySelector("#temperature");
  let cityEl = document.querySelector("#city");
  let countryEl = document.querySelector("#country");
  let typedCity = document.querySelector("#city-input");
  let humidityEl = document.querySelector("#humidity");
  let windEl = document.querySelector("#wind");
  let dateEl = document.querySelector("#date");
  let visibilityEl = document.querySelector("#visibility");

  cityEl.innerHTML = response.data.name;
  countryEl.innerHTML = response.data.sys.country;
  humidityEl.innerHTML = response.data.main.humidity;
  visibilityEl.innerHTML = Math.round(response.data.visibility);
  windEl.innerHTML = Math.round(response.data.wind.speed);
  dateEl.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}
let apiKey = "460ad125169d1bce8021a502d6b900de";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=San Antonio&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

function search(city) {
  let apiKey = "460ad125169d1bce8021a502d6b900de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function button(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", button);

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
