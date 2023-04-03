import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import Loading from "./components/Loading";
import ErrorGeolocation from "./components/ErrorGeolocation";

function App() {
  const [latLon, setLatLon] = useState();

  const [location, setLocation] = useState();

  const [hasLocation, setHasLocation] = useState();

  const [nameLocation, setnameLocation] = useState();

  const [weather, setWeather] = useState();

  const [geoError, setGeoError] = useState(false);

  const [hasErrorLocationIq, setHasErrorLocationIq] = useState(false);

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
      maximunAge: 0,
    };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const country = e.target.country.value;
    if (country.trim().length > 0) {
      setnameLocation(country.trim().replace(/ /g, "%20").toLowerCase());
    } else {
      setnameLocation("venezuela%20caracas%20el%20valle");
    }
  };

  useEffect(() => {
    if (nameLocation) {
      const apiKey = "pk.f8f5cdbdad2222080b5a9ef907a80781";
      const url = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${nameLocation}&format=json`;
      axios
        .get(url)
        .then((res) => {
          const obj = {
            lat: res.data[0].lat,
            lon: res.data[0].lon,
          };
          setLatLon(obj);

          setLocation(res.data[0]);

          setHasLocation(true);
          setTimeout(() => {
            setHasLocation(false);
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
          setHasErrorLocationIq(true);
          setTimeout(() => {
            setHasErrorLocationIq(false);
          }, 5000);
        });
    }
  }, [nameLocation]);

  return (
    <div className="App">
      <div className="cont__input">
        <form className="form" onSubmit={handleSubmit}>
          <input type="text" id="country" placeholder="Enter an address"/>
          <button className="btn">search</button>
        </form>
        {hasLocation && 
          <div className="data__filter">
            <ul>
              <li>Name: {location.display_name}</li>
              <li>Latitude: {location.lat}</li>
              <li>Longitude: {location.lon}</li>
            </ul>
          </div>
        }
        {hasErrorLocationIq && 
        <p class="error__location">❌ This location is not found</p>
        }
      </div>

      {weather ? (
        <WeatherCard weather={weather} />
      ) : geoError ? (
        <ErrorGeolocation />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
