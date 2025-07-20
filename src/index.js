function refreshWeather(response) {
  const temperatureElement = document.querySelector("#temperature");
  const cityElement = document.querySelector("#city");
  const descriptionElement = document.querySelector("#description");
  const humidityElement = document.querySelector("#humidity");
  const windSpeedElement = document.querySelector("#wind-speed");
  const timeElement = document.querySelector("#time");
  const iconElement = document.querySelector("#icon");

  // Parse data
  const temperature = Math.round(response.data.temperature.current);
  const humidity = response.data.temperature.humidity;
  const windSpeed = Math.round(response.data.wind.speed);
  const description = response.data.condition.description;
  const iconUrl = response.data.condition.icon_url;
  const city = response.data.city;
  const date = new Date(response.data.time * 1000);

  // Populate DOM
  cityElement.innerHTML = city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = description.charAt(0).toUpperCase() + description.slice(1);
  humidityElement.innerHTML = `${humidity}%`;
  windSpeedElement.innerHTML = `${windSpeed} km/h`;
  temperatureElement.innerHTML = temperature;
  iconElement.innerHTML = `<img src="${iconUrl}" alt="${description}" class="weather-app-icon" />`;
}

function formatDate(date) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[date.getDay()];
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  const apiKey = "b2a5adcct04b33178913oc335f405433"; // SheCodes API key
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl)
    .then(refreshWeather)
    .catch(() => {
      alert("City not found. Please try another.");
    });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-form-input");
  const city = searchInput.value.trim();
  if (city !== "") {
    searchCity(city);
  }
}

document.querySelector("#search-form").addEventListener("submit", handleSearchSubmit);

// Default city on load
searchCity("Paris");









