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
    location: data.resolvedAddress.split(",")[0], // This provides just the name of the city
    temp: data.days.slice(0, 7).map((day) => ({
      temp: day.temp,
      high: day.tempmax,
      low: day.tempmin,
      condition: day.conditions,
      hours: day.hours, // 'hours' is an array consisting of temperatures in one hour increments for a certain day in 24 hour format
      changeofrain: day.precipprob,
      uvindex: day.uvindex,
      feelslike: day.feelslike,
      wind: day.windspeed,
      date: day.datetime,
    })), // days is an array consisting of temperatures starting from present day to 15 days ahead
  };
};
