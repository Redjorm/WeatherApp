import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import Loading from "./components/Loading";
import ErrorGeolocation from "./components/ErrorGeolocation";

function App() {
  const [latLon, setLatLon] = useState();
  const [weather, setWeather] = useState();
  const [geoError, setGeoError] = useState(false);

  useEffect(() => {
    const success = (pos) => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setLatLon(obj);
    };

    const error = (error) => {
      console.log(error);
      setGeoError(true);
    };

    const options = {
      enableHightAccuracy: true,
      timeout: 10000,
      maximunAge: 0
    }
    
    
    navigator.geolocation.getCurrentPosition(success, error, options);
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
        geoError ? <ErrorGeolocation /> : <Loading />
        
      }
    </div>
  );
}

export default App;
