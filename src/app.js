import { parse, format } from "date-fns";

// Fetch weather data from Visual Crossing API
const getWeather = async (location) => {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=TTW6K2XJNXHZFYN5AVK566E4Q&contentType=json`
  );
  const data = await response.json();
  return data;
};

// Extract required data from JSON
const extractData = async (location) => {
  const data = await getWeather(location);
  return {
    location: data.resolvedAddress.split(",")[0],
    temp: data.days.slice(0, 7).map((day) => ({
      temp: day.temp,
      high: day.tempmax,
      low: day.tempmin,
      icon: day.icon,
      condition: day.conditions,
      hours: day.hours,
      chanceofrain: day.precipprob,
      uvindex: day.uvindex,
      feelslike: day.feelslike,
      wind: day.windspeed,
      date: day.datetime,
    })),
  };
};

// Display today's weather on the webpage
const displayWeather = (data) => {
  const display = document.querySelector(".display-weather");

  // Clear existing content to prevent duplicates
  display.innerHTML = "";

  const leftPanel = document.createElement("div");
  leftPanel.className = "left-panel"; // Optional: for styling

  const infoContainer = document.createElement("div");
  infoContainer.className = "weather-info";

  const cityName = document.createElement("div");
  cityName.textContent = data.location;

  const rainChance = document.createElement("div");
  rainChance.textContent = `Chance of Rain: ${data.temp[0].chanceofrain}%`;

  infoContainer.appendChild(cityName);
  infoContainer.appendChild(rainChance);

  leftPanel.appendChild(infoContainer);

  const temp = document.createElement("div");
  temp.textContent = `${data.temp[0].temp}°`;
  leftPanel.appendChild(temp);

  const rightPanel = document.createElement("div");
  rightPanel.className = "right-panel";
  const logo = document.createElement("img");
  logo.src = `../icons/weather/${data.temp[0].icon}.svg`;
  logo.alt = "Weather Icon";
  rightPanel.appendChild(logo);

  display.appendChild(leftPanel);
  display.appendChild(rightPanel);
};

// Display today's weather forecast in 3 hour increments starting at 6 am and ending at 9 pm
const todayForecast = (data) => {
  const convertTimeFormat = (timeStr) => {
    const parsedTime = parse(timeStr, "HH:mm:ss", new Date());
    return format(parsedTime, "h:mm a");
  };

  const today = document.querySelector(".todays-forecast");

  // Clear existing content to prevent duplicates
  today.innerHTML = "";

  for (let i = 6; i <= 22; i += 3) {
    const forecastBox = document.createElement("div");
    const time = document.createElement("div");
    const icon = document.createElement("img");
    const temp = document.createElement("div");

    time.textContent = convertTimeFormat(data.temp[0].hours[i].datetime);
    temp.textContent = data.temp[0].hours[i].temp;

    forecastBox.appendChild(time);
    forecastBox.appendChild(icon);
    forecastBox.appendChild(temp);

    today.appendChild(forecastBox);
  }
};

// Display today's air condition
const airCondition = (data) => {
  const air = document.querySelector(".air-conditions");

  const realFeel = document.createElement("div");
  const wind = document.createElement("div");
  const chanceOfRain = document.createElement("div");
  const uvIndex = document.createElement("div");

  // helper to make a <p>
  const makeP = (text) => {
    const p = document.createElement("p");
    p.textContent = text;
    return p;
  };

  // Real Feel
  realFeel.appendChild(makeP("Real Feel"));
  realFeel.appendChild(makeP(`${data.temp[0].feelslike}°`));

  // Wind Speed
  wind.appendChild(makeP("Wind Speed"));
  wind.appendChild(makeP(`${data.temp[0].wind} mph`));

  // Chance of Rain
  chanceOfRain.appendChild(makeP("Chance of Rain"));
  chanceOfRain.appendChild(makeP(`${data.temp[0].chanceofrain}%`));

  // UV Index
  uvIndex.appendChild(makeP("UV Index"));
  uvIndex.appendChild(makeP(`${data.temp[0].uvindex}`));

  air.appendChild(realFeel);
  air.appendChild(wind);
  air.appendChild(chanceOfRain);
  air.appendChild(uvIndex);
};

(async () => {
  const data = await extractData("London");
  displayWeather(data);
  todayForecast(data);
  airCondition(data);
})();
