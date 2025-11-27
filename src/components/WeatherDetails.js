import React from 'react';

function WeatherDetails({ weatherData, forecastData }) {
    const { main, wind, visibility, sys } = weatherData;

    // Format time function
    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    // Process forecast data - get one forecast per day (at noon)
    const getDailyForecasts = () => {
        const dailyData = {};

        forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateStr = date.toDateString();

            // Only take forecast around noon (12:00 PM) for each day
            if (date.getHours() >= 11 && date.getHours() <= 14) {
                if (!dailyData[dateStr]) {
                    dailyData[dateStr] = {
                        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                        temp_max: item.main.temp_max,
                        temp_min: item.main.temp_min,
                        icon: item.weather[0].icon,
                        description: item.weather[0].main
                    };
                }
            }
        });

        return Object.values(dailyData).slice(0, 5);
    };

    const forecasts = getDailyForecasts();

    return (
        <div className="weather-details-container">
            {/* Current Conditions */}
            <div className="conditions-grid">
                <div className="condition-box">
                    <div className="condition-icon">💧</div>
                    <div className="condition-label">Humidity</div>
                    <div className="condition-value">{main.humidity}%</div>
                </div>

                <div className="condition-box">
                    <div className="condition-icon">🌡️</div>
                    <div className="condition-label">Feels Like</div>
                    <div className="condition-value">{Math.round(main.feels_like)}°</div>
                </div>

                <div className="condition-box">
                    <div className="condition-icon">💨</div>
                    <div className="condition-label">Wind</div>
                    <div className="condition-value">{wind.speed} m/s</div>
                </div>

                <div className="condition-box">
                    <div className="condition-icon">👁️</div>
                    <div className="condition-label">Visibility</div>
                    <div className="condition-value">{(visibility / 1000).toFixed(1)} km</div>
                </div>

                <div className="condition-box">
                    <div className="condition-icon">🔽</div>
                    <div className="condition-label">Pressure</div>
                    <div className="condition-value">{main.pressure} mb</div>
                </div>

                <div className="condition-box">
                    <div className="condition-icon">🌅</div>
                    <div className="condition-label">Sunrise</div>
                    <div className="condition-value">{formatTime(sys.sunrise)}</div>
                </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="forecast-section">
                <h3 className="forecast-title">5-Day Forecast</h3>
                <div className="forecast-list">
                    {forecasts.length > 0 ? (
                        forecasts.map((forecast, index) => (
                            <div key={index} className="forecast-item">
                                <div className="forecast-day">{forecast.day}</div>
                                <img
                                    src={`http://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
                                    alt={forecast.description}
                                    className="forecast-icon"
                                />
                                <div className="forecast-desc">{forecast.description}</div>
                                <div className="forecast-temps">
                                    <span className="forecast-high">{Math.round(forecast.temp_max)}°</span>
                                    <span className="forecast-low">{Math.round(forecast.temp_min)}°</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{textAlign: 'center', padding: '20px', opacity: 0.7}}>
                            Loading forecast data...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WeatherDetails;