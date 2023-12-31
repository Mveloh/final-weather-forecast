function setDate(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
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
  let day = days[now.getDay()];
  return `${day} ${hour}:${minute}`;
}

function setDaily(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function showForecast(response) {
  console.log(response.data.daily);
  let forecastt = response.data.daily;
  let forecastPart = document.querySelector("#forecast");

  let forecastHTML = `<div class ="row">`;

  forecastt.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="forecast-date">${setDaily(forecastDay.time)}</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                    forecastDay.condition.icon
                  }.png"
                  alt="weather-img"
                  width="36"
                />
                <div class="weather-app-temp">
                  <span class="weather-app-temp-max">${Math.round(
                    forecastDay.temperature.maximum
                  )}°</span>
                  <span class="weather-app-temp-min">${Math.round(
                    forecastDay.temperature.minimum
                  )}°</span>
                </div>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastPart.innerHTML = forecastHTML;
}
function showAllForecast(coordinates) {
  let apiKey = "864c93f2e4tcc8176afdd913f0a2b0o2";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function showTemperature(response) {
  showAllForecast(response.data.coordinates);
  let temperaturePart = document.querySelector("#temp");
  celsiusPart = response.data.temperature.current;
  temperaturePart.innerHTML = Math.round(celsiusPart);
  let cityPart = document.querySelector("#city");
  cityPart.innerHTML = response.data.city;
  let conditionPart = document.querySelector("#condition");
  conditionPart.innerHTML = response.data.condition.description;
  let humidityPart = document.querySelector("#humii");
  humidityPart.innerHTML = response.data.temperature.humidity;
  let windPart = document.querySelector("#speed");
  windPart.innerHTML = Math.round(response.data.wind.speed);
  let datePart = document.querySelector("#date");
  datePart.innerHTML = setDate(response.data.time * 1000);
  let iconPart = document.querySelector("#icon");
  iconPart.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconPart.setAttribute("alt", response.data.condition.description);
}
function displaySearch(city) {
  let apiKey = "864c93f2e4tcc8176afdd913f0a2b0o2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function searchForCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  displaySearch(cityInput.value);
}

let celsiusPart = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchForCity);

displaySearch("Durban");
