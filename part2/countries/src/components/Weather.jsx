import { useEffect, useState } from "react";
import axios from "axios";
// import loadingIcon from "../../public/wait-1.1s-200px.svg"

const Weather = ({ countryData }) => {
  const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
  const weather_api_key = process.env.REACT_APP_API_KEY;
  //default object for before the fetching of weather succeeds ie. avoid undefined obj before being defined by fetch
  const weatherDataLoading = {
    wind: {
      speed: "Loading",
    },
    weather: [{ icon: "Loading" }],
    main: { temp: "Loading" },
  };
  const [weatherData, setWeatherData] = useState(weatherDataLoading);

  //example api call
  //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

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

  const tempature = (weatherData.main.temp - 273.15).toFixed(1);
  const iconLink = weatherData.weather[0].icon
    ? "http://openweathermap.org/img/wn/" +
      weatherData.weather[0].icon +
      "@2x.png"
    : "Loading Icon...";

  //rendering
  return (
    <>
      <h1> Weather in {countryData.capital}</h1>
      <p>tempature: {tempature} Celcius </p>
      <img src={iconLink} alt="Weather Icon" />
      <p>wind: {weatherData.wind.speed} m/s</p>
    </>
  );
};

export default Weather;
