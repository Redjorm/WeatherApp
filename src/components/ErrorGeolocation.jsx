import React, { useState } from "react";

const ErrorGeolocation = () => {
  const [show, setShow] = useState(false);

  setTimeout(() => {
    setShow(true);
  }, 100);

  return (
    <>
      <article className="widget">
        <div className="weatherIcon">
          <h1>Weather App</h1>
        </div>
        <div className={`weatherInfo__error ${show ? 'show' : ''}`}>
          <div className="error">
            <span>¡Vaya, parece que no tienes la ubicación activada 😢!</span>
          </div>
        </div>
      </article>
    </>
  );
};

export default ErrorGeolocation;
