import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import Loading from "./components/Loading";

function App() {
  const [latLon, setLatLon] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    const success = (pos) => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setLatLon(obj);
    };

    const error = () => {};

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (latLon) {
      const apiKey = "3b8a950ddbbc721e44ac5166babd9420";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${apiKey}`;

      axios
        .get(url)
        .then((res) => setWeather(res.data))
        .catch((err) => console.log(err.resquest));
    }
  }, [latLon]);

  return (
    <div className="App">
      {
        weather
        ?
        <WeatherCard weather={weather}/>
        :
        <Loading />
      }
    </div>
  );
}

export default App;
