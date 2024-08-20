function getWeather() {
  const apiKey = "152c9ed7a50043e489d2314d191de6d8";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please Enter City");
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather data:", error);
      alert("Error Fetching Current Weather Data. Please try again");
    });

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching hourly weather data:", error);
      alert("Error Fetching hourly Weather Data. Please try again");
    });
}

function displayWeather(data) {
  const temp = document.getElementById("temp");
  const infoDiv = document.getElementById("info");
  const icon = document.getElementById("icon");
  const forecast = document.getElementById("forecast");

  //clear previous information
  infoDiv.innerHTML = " ";
  forecast.innerHTML = " ";
  temp.innerHTML = " ";

  if (data.cod == "404") {
    infoDiv.innerHTML = "<p>${data.message}</p>";
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML = `<p>${temperature}°C</p>`;
    const weatherHTML = `<p>${cityName}</p> <p>${description}</p>`;

    temp.innerHTML = temperatureHTML;
    infoDiv.innerHTML = weatherHTML;
    icon.src = iconUrl;
    icon.alt = description;

    showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecast = document.getElementById("forecast");
  const next24hrs = hourlyData.slice(0, 8);

  next24hrs.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
        <div class="hourly-item">
        <span>${hour}:00</span>
        <img src="${iconUrl}" alt="Hourly Weather Icon">
        <span>${temperature}°C</span>
        </div>
        `;

    hourlyForecast.innerHTML += hourlyItemHtml;
  });
}

function showImage() {
  const weatherIcon = document.getElementById("icon");
  weatherIcon.style.display = "block"; // Make the image visible once it's loaded
}
