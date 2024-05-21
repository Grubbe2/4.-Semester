import { useEffect, useState } from "react";
import { API_KEY } from "./APIKEY";

const useFetchWeather = () => {
  const [City, setCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [mainData, setMainData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log('FETCHING DATA...')

  const getWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=55.39594&lon=10.38831&APPID=${API_KEY}&units=metric`);
      const json = await response.json();
      setCity(json.name);
      setWeatherData(json.weather[0]);
      setMainData(json.main);
      console.log(json.main);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(loading);
    getWeather();
    console.log(loading);
  }, []);

  return { weatherData, City, mainData, error, loading };
};

export default useFetchWeather;