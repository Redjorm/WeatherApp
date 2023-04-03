import React, { useEffect, useState } from "react";

const WeatherCard = ({ weather }) => {
  const imgUrl = `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`;

  const celsius = (weather?.main.temp - 273.15).toFixed(0);
  const fahrenheit = (celsius * 1.8 + 32).toFixed(0);

  const [temp, setTemp] = useState(true);

  const chanceTemp = () => setTemp(!temp);

  const [show, setShow] = useState(false);

  setTimeout(() => {
    setShow(true);
  }, 100);
  
  return (
    <>
      <article className="widget">
        <div className="weatherIcon" >
          <h1>Weather App</h1>
          <img className="img" src={imgUrl} alt="" />
        </div>
        <div className={`weatherInfo ${show ? 'show' : ''}`}>
          <div className="temperature">
            {temp ? <span>{celsius}°C</span> : <span>{fahrenheit}°F</span>}
          </div>
          <div className="description">
            <div className="country">
              {weather?.name}, {weather?.sys.country}
            </div>
            <div className="place">"{weather?.weather[0].description}"</div>
            <ul>
              <li>
                Wind Speed:{" "}
                <span className="span">{weather?.wind.speed}m/s</span>
              </li>
              <li>
                Clouds: <span className="span">{weather?.clouds.all}%</span>
              </li>
              <li>
                Pressure:{" "}
                <span className="span">{weather?.main.pressure}hPa</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={`space__btn ${show ? 'show' : ''}`} >
          <button className="btn" onClick={chanceTemp}>
            Change to {temp ? "°F" : "°C"}
          </button>
        </div>
      </article>
    </>
  );
};

export default WeatherCard;
