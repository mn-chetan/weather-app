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
const displayWeather = async (data) => {
  const display = document.querySelector(".display-weather");

  // Clear existing content to prevent duplicates
  display.innerHTML = "";

  const infoContainer = document.createElement("div");
  infoContainer.className = "weather-info";

  const cityName = document.createElement("div");
  cityName.textContent = data.location;

  const rainChance = document.createElement("div");
  rainChance.textContent = `Chance of Rain: ${data.temp[0].chanceofrain}%`;

  infoContainer.appendChild(cityName);
  infoContainer.appendChild(rainChance);

  display.appendChild(infoContainer);

  const temp = document.createElement("div");
  temp.textContent = data.temp[0].temp;

  display.appendChild(temp);
};

// Display today's weather forecast in 3 hour increments starting at 6 am and ending at 9 pm
const todayForecast = async (data) => {
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

(async () => {
  const data = await extractData("London");
  await displayWeather(data);
  await todayForecast(data);
})();
