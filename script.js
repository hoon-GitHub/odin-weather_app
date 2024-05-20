let city = "atlanta"; // default city

const cityInfo = document.getElementById('cityInfo');
const current = document.getElementById('current');
const today = document.getElementById('today');
const tomorrow = document.getElementById('tomorrow');
const dayAfter = document.getElementById('dayAfter');

const searchInput = document.getElementById('searchInput');
const searchButton = document.querySelector('.searchButton');

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  city = searchInput.value;
  while (cityInfo.firstChild) cityInfo.firstChild.remove();
  while (current.firstChild) current.firstChild.remove();
  while (today.firstChild) today.firstChild.remove();
  while (tomorrow.firstChild) tomorrow.firstChild.remove();
  while (dayAfter.firstChild) dayAfter.firstChild.remove();
  searchInput.value = "";
  getWeather(city);
})

async function getWeather (city) {

  if (city === "") {
    console.log("ERROR: City name is empty.");
    city = "atlanta";
  }

  let weatherData;
  try {
    // fetch weather data
    searchButton.classList.add('buttonLoading');
    const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=4f55b38b0164467096213919241705&q='
      + city + '&days=3&aqi=no&alerts=no', {mode: 'cors'});
    searchButton.classList.remove('buttonLoading');
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

  // process data to get only what we need
  const data = processData(weatherData);
  
  // render the above processed data to the webpage
  renderWeather(data);

}

// filter out unnecessary data
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
      'icon' : weatherData.current.condition.icon,
      'temp' : weatherData.current.temp_f,
      'feelslike' : weatherData.current.feelslike_f,
      'humidity' : weatherData.current.humidity,
      'wind_dir' : weatherData.current.wind_dir,
      'wind' : weatherData.current.wind_mph,
      'uv' : weatherData.current.uv
    },
    'today' : {
      'date' : weatherData.forecast.forecastday[0].date,
      'icon' : weatherData.forecast.forecastday[0].day.condition.icon,
      'condition' : weatherData.forecast.forecastday[0].day.condition.text,
      'low' : weatherData.forecast.forecastday[0].day.mintemp_f,
      'high' : weatherData.forecast.forecastday[0].day.maxtemp_f,
      'chanceRain' : weatherData.forecast.forecastday[0].day.daily_chance_of_rain,
      'humidity' : weatherData.forecast.forecastday[0].day.avghumidity,
      'uv' : weatherData.forecast.forecastday[0].day.uv
    },
    'tomorrow' : {
      'date' : weatherData.forecast.forecastday[1].date,
      'icon' : weatherData.forecast.forecastday[1].day.condition.icon,
      'condition' : weatherData.forecast.forecastday[1].day.condition.text,
      'low' : weatherData.forecast.forecastday[1].day.mintemp_f,
      'high' : weatherData.forecast.forecastday[1].day.maxtemp_f,
      'chanceRain' : weatherData.forecast.forecastday[1].day.daily_chance_of_rain,
      'humidity' : weatherData.forecast.forecastday[1].day.avghumidity,
      'uv' : weatherData.forecast.forecastday[1].day.uv
    },
    'dayAfter' : {
      'date' : weatherData.forecast.forecastday[2].date,
      'icon' : weatherData.forecast.forecastday[2].day.condition.icon,
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

// render data onto webpage
function renderWeather (data) {

  const locName = document.createElement('h2');
  locName.textContent = `weather for: ${data.location.name}`;
  cityInfo.appendChild(locName);
  const locRegion = document.createElement('h4');
  locRegion.textContent = data.location.region;
  cityInfo.appendChild(locRegion);
  const locCountry = document.createElement('h4');
  locCountry.textContent = data.location.country;
  cityInfo.appendChild(locCountry);
  const locTime = document.createElement('h6');
  locTime.textContent = data.location.localtime;
  cityInfo.appendChild(locTime);

  const currTitle = document.createElement('h3');
  currTitle.textContent = "Right now:";
  current.appendChild(currTitle);
  const currIcon = document.createElement('img');
  currIcon.src = "https:" + data.current.icon;
  current.appendChild(currIcon);
  const currCondition = document.createElement('h2');
  currCondition.textContent = data.current.condition;
  current.appendChild(currCondition);
  const currTemp = document.createElement('h5');
  currTemp.textContent = `Temperature: ${data.current.temp} F`;
  current.appendChild(currTemp);
  const currFeelsLike = document.createElement('h5');
  currFeelsLike.textContent = `Feels like: ${data.current.feelslike} F`;
  current.appendChild(currFeelsLike);
  const currHumidity = document.createElement('h5');
  currHumidity.textContent = `Humidity: ${data.current.humidity} %`;
  current.appendChild(currHumidity);
  const currWind = document.createElement('h5');
  currWind.textContent = `Wind: ${data.current.wind} mph, ${data.current.wind_dir}`;
  current.appendChild(currWind);
  const currUv = document.createElement('h5');
  currUv.textContent = `UV Index: ${data.current.uv}`;
  current.appendChild(currUv);

  // and populate the 3-day forecast sections
  renderForecastDay('today', data);
  renderForecastDay('tomorrow', data);
  renderForecastDay('dayAfter', data);

}

// function for populating 3-day forecast divs
function renderForecastDay(day, data) {
  const dayDiv = document.getElementById(day);

  const dayTitle = document.createElement('h5');
  if (day === 'today') dayTitle.textContent = "Today:";
  else if (day === 'tomorrow') dayTitle.textContent = "Tomorrow:";
  else if (day === 'dayAfter') dayTitle.textContent = "The Day After:";
  dayDiv.appendChild(dayTitle);

  const dayDate = document.createElement('h6');
  dayDate.textContent = `(${data[day].date})`;
  dayDiv.appendChild(dayDate);
  const dayIcon = document.createElement('img');
  dayIcon.src = "https:" + data[day].icon;
  dayDiv.appendChild(dayIcon);
  const dayCondition = document.createElement('h4');
  dayCondition.textContent = data[day].condition;
  dayDiv.appendChild(dayCondition);
  const dayHigh = document.createElement('h6');
  dayHigh.textContent = `High: ${data[day].high} F`;
  dayDiv.appendChild(dayHigh);
  const dayLow = document.createElement('h6');
  dayLow.textContent = `Low: ${data[day].low} F`;
  dayDiv.appendChild(dayLow);
  const dayRain = document.createElement('h6');
  dayRain.textContent = `Chance of Rain: ${data[day].chanceRain} %`;
  dayDiv.appendChild(dayRain);
  const dayHumidity = document.createElement('h6');
  dayHumidity.textContent = `Humidity: ${data[day].humidity} %`;
  dayDiv.appendChild(dayHumidity);
  const dayUv = document.createElement('h6');
  dayUv.textContent = `UV Index: ${data[day].uv}`;
  dayDiv.appendChild(dayUv);
}

getWeather(city);