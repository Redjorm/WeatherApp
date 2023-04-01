import React from "react";

const Loading = () => {
  return (
    <>
      <article className="widget">
        <div className="weatherIcon">
          <h1>Weather App</h1>
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </article>
      <div className="weatherInfo"></div>
      <div className="space__btn"></div>
    </>
  );
};

export default Loading;
