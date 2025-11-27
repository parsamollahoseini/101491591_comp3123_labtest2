import React from 'react';

function WeatherCard({ weatherData }) {
    const { name, main, weather, sys } = weatherData;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

    return (
        <div className="weather-card">
            <div className="current-location">{name}, {sys.country}</div>

            <div className="current-weather">
                <div className="main-temp-section">
                    <img src={iconUrl} alt={weather[0].description} className="main-weather-icon" />
                    <div className="temp-display">
                        <span className="current-temp">{Math.round(main.temp)}°</span>
                        <span className="temp-range">
              H:{Math.round(main.temp_max)}° L:{Math.round(main.temp_min)}°
            </span>
                    </div>
                </div>
                <div className="condition-text">{weather[0].description}</div>
            </div>
        </div>
    );
}

export default WeatherCard;