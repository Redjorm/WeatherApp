import React, { useEffect, useState } from "react";

const WeatherCard = ({ weather }) => {
  const imgUrl = `http://openweathermap.org/img/w/${weather?.weather[0].icon}.png`;
  const celsius = (weather?.main.temp - 273.15).toFixed(2)
  const fahrenheit = (celsius * 1.8) + 32

  const [temp, setTemp] = useState(true)
  const chanceTemp = () => setTemp(!temp)
  
  return (
    <>
      <article className="widget">
        <div className="weatherIcon">
          <img className="img" src={imgUrl} alt="" />
        </div>
        <div className="weatherInfo">
          <div className="temperature">
            {
              temp
              ? <span>{celsius}°C</span>
              : <span>{fahrenheit}°F</span>
            }
          </div>
          <div className="description">
            <div className="weatherCondition">
              {weather?.weather[0].description}
            </div>
            <div className="place">
              {weather?.name}, {weather?.sys.country}
            </div>
            <ul>
              <li>
                <span>Wind Speed: </span>{weather?.wind.speed}m/s
              </li>
              <li>
                <span>Clouds: </span>
                {weather?.clouds.all}%
              </li>
              <li>
                <span>Pressure: </span>
                {weather?.main.pressure}hPa
              </li>
            </ul>
          </div>
        </div>
        <div className="space__btn">
          <button onClick={chanceTemp}>Change Temp</button>
        </div>
      </article>
    </>
  );
};

export default WeatherCard;
