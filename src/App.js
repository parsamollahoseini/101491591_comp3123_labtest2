import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState('Toronto');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '350336fea47c43b89228dc43989c0be2';

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');

    try {
      // Fetch current weather
      const weatherResponse = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!weatherResponse.ok) {
        throw new Error('City not found');
      }

      const weather = await weatherResponse.json();
      setWeatherData(weather);

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
          `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      const forecast = await forecastResponse.json();
      setForecastData(forecast);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      setWeatherData(null);
      setForecastData(null);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeather(searchCity);
  };

  return (
      <div className="App">
        <div className="container">
          <h1 className="app-title">Weather</h1>

          <SearchBar onSearch={handleSearch} />

          {loading && <div className="loading">Loading...</div>}

          {error && <div className="error">{error}</div>}

          {weatherData && forecastData && !loading && !error && (
              <>
                <WeatherCard weatherData={weatherData} />
                <WeatherDetails weatherData={weatherData} forecastData={forecastData} />
              </>
          )}
        </div>
      </div>
  );
}

export default App;