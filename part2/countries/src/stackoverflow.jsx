import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ countryData }) => {
  const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
  const weather_api_key = process.env.REACT_APP_API_KEY;
  const weatherDataLoading = { main: { temp: "Loading" } };
  const [weatherData, setWeatherData] = useState(weatherDataLoading);

  //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

  // the useEffect works
  useEffect(() => {
    const getWeatherData = async (URL, capital, key) => {
      let res = await axios.get(URL + "?q=" + capital + "&appid=" + key);
      return res;
    };
    getWeatherData(WEATHER_URL, countryData.capital[0], weather_api_key).then(
      (res) => {
        setWeatherData(res.data);
      }
    );
  }, []);

  // this works, i can see temp and its value
  for (const property in weatherData.main) {
    console.log(`${property}: ${weatherData.main[property]}`);
  }

  // this doesn't work
  console.log(weatherData.main.temp);

  return <h1>tbd</h1>;
};

export default Weather;
