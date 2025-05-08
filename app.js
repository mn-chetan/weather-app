// Fetch weather data from Visual Crossing API
const getWeather = async (location) => {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=TTW6K2XJNXHZFYN5AVK566E4Q&contentType=json`
  );
  const data = await response.json();
  return data;
};
