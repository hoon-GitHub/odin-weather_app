const city = "atlanta"; // default city

async function getWeather (city) {

  let weatherData;
  try {

    // fetch weather data
    const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=4f55b38b0164467096213919241705&q=' + city + '&days=3&aqi=no&alerts=no', {mode: 'cors'});
    weatherData = await response.json();

    // console-log all data fetched
    // console.log(weatherData);
    // console.log(weatherData.location);
    // console.log(weatherData.current);
    // console.log(weatherData.forecast.forecastday[0]);
    // console.log(weatherData.forecast.forecastday[1]);
    // console.log(weatherData.forecast.forecastday[2]);

  } catch (error) {
    console.warn("ERROR: ", error);
  }

  // process data to only get what we need
  const data = processData(weatherData);
  
  // render the above processed data to the webpage - frontend portion
  renderWeather(data);

}

// only grab data that we need
function processData (weatherData) {

    const data = {
    'location' : {
      'name' : weatherData.location.name,
      'region' : weatherData.location.region,
      'country' : weatherData.location.country,
      'localtime' : weatherData.location.localtime
    },
    'current' : {
      'condition' : weatherData.current.condition.text,
      'temp' : weatherData.current.temp_f,
      'feelslike' : weatherData.current.feelslike_f,
      'wind_dir' : weatherData.current.wind_dir,
      'wind' : weatherData.current.wind_mph
    },
    'today' : {
      'condition' : weatherData.forecast.forecastday[0].day.condition.text,
      'low' : weatherData.forecast.forecastday[0].day.mintemp_f,
      'high' : weatherData.forecast.forecastday[0].day.maxtemp_f,
      'chanceRain' : weatherData.forecast.forecastday[0].day.daily_chance_of_rain,
      'humidity' : weatherData.forecast.forecastday[0].day.avghumidity,
      'uv' : weatherData.forecast.forecastday[0].day.uv
    },
    'tomorrow' : {
      'condition' : weatherData.forecast.forecastday[1].day.condition.text,
      'low' : weatherData.forecast.forecastday[1].day.mintemp_f,
      'high' : weatherData.forecast.forecastday[1].day.maxtemp_f,
      'chanceRain' : weatherData.forecast.forecastday[1].day.daily_chance_of_rain,
      'humidity' : weatherData.forecast.forecastday[1].day.avghumidity,
      'uv' : weatherData.forecast.forecastday[1].day.uv
    },
    'dayAfter' : {
      'condition' : weatherData.forecast.forecastday[2].day.condition.text,
      'low' : weatherData.forecast.forecastday[2].day.mintemp_f,
      'high' : weatherData.forecast.forecastday[2].day.maxtemp_f,
      'chanceRain' : weatherData.forecast.forecastday[2].day.daily_chance_of_rain,
      'humidity' : weatherData.forecast.forecastday[2].day.avghumidity,
      'uv' : weatherData.forecast.forecastday[2].day.uv
    }
  }

  return data;

}

// render data onto webpage - currently console-logging only
function renderWeather (data) {

  const location = data.location;
  const current = data.current;
  const day0 = data.today;
  const day1 = data.tomorrow;
  const day2 = data.dayAfter;
  console.log(location);
  console.log(current);
  console.log(day0);
  console.log(day1);
  console.log(day2);

}

getWeather(city);