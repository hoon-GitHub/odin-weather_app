const city = "atlanta"; // default city

async function getWeather (city) {
  try {

    // fetch weather data
    const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=4f55b38b0164467096213919241705&q=' + city + '&days=3&aqi=no&alerts=no', {mode: 'cors'});
    const weatherData = await response.json();

    // break down data and console-log
    console.log(weatherData);
    console.log(weatherData.location);
    console.log(weatherData.current);
    console.log(weatherData.forecast.forecastday[0]);
    console.log(weatherData.forecast.forecastday[1]);
    console.log(weatherData.forecast.forecastday[2]);

  } catch (error) {
    console.warn("ERROR: ", error);
  }
}

window.onload = getWeather(city);