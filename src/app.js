import { parse, format } from "date-fns";
import mockWeatherData from "./mockWeatherData.json";

const USE_MOCK_DATA = true;

// Fetch weather data from Visual Crossing API
const getWeather = async (location) => {
  if (USE_MOCK_DATA) {
    return mockWeatherData;
  }

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
  leftPanel.className = "left-panel";

  const infoContainer = document.createElement("div");
  infoContainer.className = "weather-info";

  const cityName = document.createElement("div");
  cityName.textContent = data.location;

  const rainChance = document.createElement("div");
  rainChance.textContent = `Chance of Rain: ${data.temp[0].chanceofrain}%`;

  infoContainer.appendChild(cityName);
  infoContainer.appendChild(rainChance);

  const temp = document.createElement("div");
  temp.textContent = `${data.temp[0].temp}°`;

  leftPanel.appendChild(infoContainer);
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

  // Add heading
  const heading = document.createElement("h2");
  heading.textContent = "Today's Forecast";
  today.appendChild(heading);

  // Create container for forecast boxes
  const forecastContainer = document.createElement("div");
  forecastContainer.className = "forecast-container";

  for (let i = 6; i <= 21; i += 3) {
    const forecastBox = document.createElement("div");
    forecastBox.className = "forecast-box";

    const time = document.createElement("div");
    time.textContent = convertTimeFormat(data.temp[0].hours[i].datetime);

    const icon = document.createElement("img");
    icon.src = `../icons/weather/${data.temp[0].hours[i].icon}.svg`;
    icon.alt = data.temp[0].hours[i].conditions;
    icon.style.width = "2.5rem";
    icon.style.height = "2.5rem";

    const temp = document.createElement("div");
    temp.textContent = `${data.temp[0].hours[i].temp}°`;

    forecastBox.appendChild(time);
    forecastBox.appendChild(icon);
    forecastBox.appendChild(temp);

    forecastContainer.appendChild(forecastBox);
  }

  today.appendChild(forecastContainer);
};

// Display today's air condition
const airCondition = (data) => {
  const air = document.querySelector(".air-conditions");

  // Clear existing content to prevent duplicates
  air.innerHTML = "";

  // Add heading
  const heading = document.createElement("h2");
  heading.textContent = "Air Conditions";
  air.appendChild(heading);

  // Create grid container
  const conditionsGrid = document.createElement("div");
  conditionsGrid.className = "conditions-grid";

  // helper to make a condition item
  const makeConditionItem = (label, value) => {
    const div = document.createElement("div");
    const labelP = document.createElement("p");
    labelP.textContent = label;
    const valueP = document.createElement("p");
    valueP.textContent = value;
    div.appendChild(labelP);
    div.appendChild(valueP);
    return div;
  };

  // Real Feel
  const realFeel = makeConditionItem("Real Feel", `${data.temp[0].feelslike}°`);

  // Wind Speed
  const wind = makeConditionItem("Wind Speed", `${data.temp[0].wind} mph`);

  // Chance of Rain
  const chanceOfRain = makeConditionItem(
    "Chance of Rain",
    `${data.temp[0].chanceofrain}%`
  );

  // UV Index
  const uvIndex = makeConditionItem("UV Index", `${data.temp[0].uvindex}`);

  conditionsGrid.appendChild(realFeel);
  conditionsGrid.appendChild(wind);
  conditionsGrid.appendChild(chanceOfRain);
  conditionsGrid.appendChild(uvIndex);

  air.appendChild(conditionsGrid);
};

// Take location input from user
const formInput = () => {
  const form = document.querySelector("form");
  const input = document.querySelector("input");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = input.value;
    input.value = ""; // Clear the input

    // Fetch and display data after form submission
    const data = await extractData(city);
    displayWeather(data);
    todayForecast(data);
    airCondition(data);
    weekForecast(data);
  });
};

// Display week's forecast
const weekForecast = (data) => {
  const week = document.querySelector("aside");

  // Clear existing content to prevent duplicates when a new search is made
  week.innerHTML = "";

  const dateToDayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    return format(date, "EEE");
  };

  for (let i = 0; i < 7; i++) {
    const dayForecastItem = document.createElement("div");
    dayForecastItem.classList.add("day-forecast-item");

    const day = document.createElement("p");
    day.classList.add("day-name");
    const centerDiv = document.createElement("div");
    centerDiv.classList.add("day-icon-condition");
    const icon = document.createElement("img");
    const name = document.createElement("p");
    name.classList.add("day-condition-name");

    const tempContainer = document.createElement("p");
    tempContainer.classList.add("day-temp");
    const tempHigh = document.createElement("span");
    tempHigh.classList.add("temp-high");
    const tempLow = document.createElement("span");
    tempLow.classList.add("temp-low");

    if (i === 0) {
      day.textContent = "Today";
    } else {
      day.textContent = dateToDayOfWeek(data.temp[i].date);
    }

    icon.src = `../icons/weather/${data.temp[i].icon}.svg`;
    name.textContent = data.temp[i].condition;
    centerDiv.appendChild(icon);
    centerDiv.appendChild(name);

    tempHigh.textContent = `${data.temp[i].high}°`;
    tempLow.textContent = ` / ${data.temp[i].low}°`;
    tempContainer.appendChild(tempHigh);
    tempContainer.appendChild(tempLow);

    dayForecastItem.appendChild(day);
    dayForecastItem.appendChild(centerDiv);
    dayForecastItem.appendChild(tempContainer);

    week.appendChild(dayForecastItem);
  }
};

(async () => {
  const data = await extractData("London");
  displayWeather(data);
  todayForecast(data);
  airCondition(data);
  weekForecast(data);

  formInput();
})();
