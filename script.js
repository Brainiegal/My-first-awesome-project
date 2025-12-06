function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#current-date");
  let weatherIcon = document.querySelector("#weather-icon");

  if (temperatureElement) {
    let temperature = Math.round(response.data.temperature.current);
    temperatureElement.innerHTML = temperature;
  }

  if (cityElement) {
    cityElement.innerHTML = response.data.city;
  }

  if (humidityElement) {
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  }

  if (windElement) {
    windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  }

  if (dateElement) {
    let description = response.data.condition.description;
    dateElement.innerHTML = `${formatDate(new Date())}, ${description}`;
  }

  if (weatherIcon) {
    let icon = getWeatherIcon(response.data.condition.icon);
    weatherIcon.innerHTML = icon;
  }
}

function getWeatherIcon(iconCode) {
  const iconMap = {
    "clear-sky-day": "☀️",
    "clear-sky-night": "🌙",
    "few-clouds-day": "⛅",
    "few-clouds-night": "☁️",
    "scattered-clouds-day": "☁️",
    "scattered-clouds-night": "☁️",
    "broken-clouds-day": "☁️",
    "broken-clouds-night": "☁️",
    "shower-rain-day": "🌧️",
    "shower-rain-night": "🌧️",
    "rain-day": "🌦️",
    "rain-night": "🌧️",
    "thunderstorm-day": "⛈️",
    "thunderstorm-night": "⛈️",
    "snow-day": "❄️",
    "snow-night": "❄️",
    "mist-day": "🌫️",
    "mist-night": "🌫️"
  };
  
  return iconMap[iconCode] || "☀️";
}

function search(event) {
  event.preventDefault();
  
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  
  let apiKey = "c8348o5b825a070bd50b2ac18daatf0b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;


  axios.get(apiUrl).then(updateWeather);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
if (searchForm) {
  searchForm.addEventListener("submit", search);
}

let currentDateElement = document.querySelector("#current-date");
if (currentDateElement) {
  let currentDate = new Date();
  currentDateElement.innerHTML = formatDate(currentDate);
}