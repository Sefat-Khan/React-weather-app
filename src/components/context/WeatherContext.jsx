import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();
export function StateContextProvider({children}) {
   const [temp, setTemp] = useState();
   const [areaName, setAreaName] = useState();
   const [cityName, setCityName] = useState();
   const [countryName, setCountryName] = useState();
   const [windSpeed, setWindSpeed] = useState();
   const [humidity, setHumidity] = useState();
   const [weatherDetails, setWeatherDetails] = useState();
   const [rainChance, setRainChance] = useState();
   const [image, setImage] = useState();
   const [forecast, setForecast] = useState([]);
   const [icon, setIcon] = useState();

    
    // Function to get background based on weather condition
async function getBackground(weatherDetails) {
  const weatherData = {
      "haze": "./src/assets/image/haze.jpg",
      "light rain": "./src/assets/image/light rain.jpg",
      "broken clouds": "./src/assets/image/broken clouds.jpg",
      "clear sky": "./src/assets/image/clear sky.jpg",
      "dust": "./src/assets/image/dust.jpg",
      "few clouds": "./src/assets/image/few clouds.jpg",
      "fog": "./src/assets/image/fog.jpg",
      "mist": "./src/assets/image/mist.jpg",
      "sand": "./src/assets/image/sand.jpg",
      "scattered clouds": "./src/assets/image/scattered clouds.jpg",
      "shower rain": "./src/assets/image/shower rain.jpg",
      "snow": "./src/assets/image/snow.jpg",
      "thunderstorm": "./src/assets/image/thunderstorm.jpg",
      "drizzle": "./src/assets/image/drizzle.jpg",
      "squall": "./src/assets/image/squall.jpg",
      "hurricane": "./src/assets/image/hurricane.jpg",
      "tornado": "./src/assets/image/tornado.jpg",
      "overcast clouds": "./src/assets/image/overcast clouds.jpg",
      "moderate rain": "./src/assets/image/moderate rain.jpg",
      "heavy intensity rain": "./src/assets/image/heavy intensity rain.jpg",
      "very heavy rain": "./src/assets/image/very heavy rain.jpg",
      "extreme rain": "./src/assets/image/extreme rain.jpg",
      "freezing rain": "./src/assets/image/freezing rain.jpg",
      "light intensity shower rain": "./src/assets/image/light intensity shower rain.jpg",
      "heavy intensity shower rain": "./src/assets/image/heavy intensity shower rain.jpg",
      "ragged shower rain": "./src/assets/image/ragged shower rain.jpg",
      "light intensity drizzle": "./src/assets/image/light intensity drizzle.jpg",
      "heavy intensity drizzle": "./src/assets/image/heavy intensity drizzle.jpg",
      "light intensity drizzle rain": "./src/assets/image/light intensity drizzle rain.jpg",
      "drizzle rain": "./src/assets/image/drizzle rain.jpg",
      "heavy intensity drizzle rain": "./src/assets/image/heavy intensity drizzle rain.jpg",
      "thunderstorm with light rain": "./src/assets/image/thunderstorm with light rain.jpg",
      "thunderstorm with rain": "./src/assets/image/thunderstorm with rain.jpg",
      "thunderstorm with heavy rain": "./src/assets/image/thunderstorm with heavy rain.jpg",
      "light thunderstorm": "./src/assets/image/light thunderstorm.jpg",
      "heavy thunderstorm": "./src/assets/image/heavy thunderstorm.jpg",
      "ragged thunderstorm": "./src/assets/image/ragged thunderstorm.jpg",
      "thunderstorm with light drizzle": "./src/assets/image/thunderstorm with light drizzle.jpg",
      "thunderstorm with drizzle": "./src/assets/image/thunderstorm with drizzle.jpg",
      "thunderstorm with heavy drizzle": "./src/assets/image/thunderstorm with heavy drizzle.jpg",
      "light snow": "./src/assets/image/light snow.jpg",
      "heavy snow": "./src/assets/image/heavy snow.jpg",
      "sleet": "./src/assets/image/sleet.jpg",
      "light shower sleet": "./src/assets/image/light shower sleet.jpg",
      "shower sleet": "./src/assets/image/shower sleet.jpg",
      "light rain and snow": "./src/assets/image/light rain and snow.jpg",
      "rain and snow": "./src/assets/image/rain and snow.jpg",
      "light shower snow": "./src/assets/image/light shower snow.jpg",
      "shower snow": "./src/assets/image/shower snow.jpg",
      "heavy shower snow": "./src/assets/image/heavy shower snow.jpg",
      "smoke": "./src/assets/image/smoke.jpg",
      "volcanic ash": "./src/assets/image/volcanic ash.jpg",
      "squalls": "./src/assets/image/squalls.jpg" 
  };

  return weatherData[weatherDetails] || "./image/pexels-matheus-oliveira-924393-1841447.jpg";
}

   //fetch data
   const fetchWeather = async(latitude, longitude) => {
    const apiKey = "00a4965e8c7b8a499b89751899a69436";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${apiKey}&units=metric`;
      try {
        const response = await fetch(
            apiUrl
        );
        const data = await response.json();

        //update the weather data
        setTemp(data.main.temp);
        setCityName(data.name);
        setCountryName(data.sys.country);
        setAreaName(',');
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
        setWeatherDetails(data.weather[0].description);
        setRainChance(data.clouds.all + '%');

        const iconCode = data.weather[0].icon;
        setIcon(`https://openweathermap.org/img/wn/${iconCode}@2x.png`);

        // Set background image based on weather
        const bgImage = await getBackground(data.weather[0].description);
        setImage(bgImage);

      }catch (error) {
        console.error("Error fetching WeatherAPI data:", error)
      }
   };

   const fetchWeather2 = async(latitude, longitude) => {
    const apiKey2 = "5e19717aa5d54276882164625241809";
    const urlApi = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey2}&q=${latitude},${longitude}&days=7`;
    try {
      const response2 = await fetch(
        urlApi
      );
      const data2 = await response2.json();


      const forecastDays = data2.forecast.forecastday.slice(1, 7);

      //update the weather data
      const forecastData = forecastDays.map(day => ({
         icon: `https:${day.day.condition.icon}`,
         maxTemp: day.day.maxtemp_c,
         minTemp: day.day.mintemp_c
      }));

      // Set the forecast data array in state
      setForecast(forecastData);
     
    }catch (error) {
      console.error("Error fetching WeatherAPI data:", error)
    }
 };

   //Get user location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            fetchWeather(latitude, longitude);
            fetchWeather2(latitude, longitude);
        }, ShowError);
    }else{
        alert("Geolocation is not supported by this browser")
    }
}

function ShowError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

useEffect(() => {
  getLocation();
}, []);

return (
    <StateContext.Provider
       value={{
        temp,
        areaName,
        cityName,
        countryName,
        windSpeed,
        humidity,
        weatherDetails,
        rainChance,
        icon,
        getLocation,
        forecast,
        image
       }}
       >
        {children}
       </StateContext.Provider>
  );
}

// Custom hook to use the state context
export const useWeatherState = () => useContext(StateContext);