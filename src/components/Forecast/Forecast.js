import React, { useState } from "react";
import Conditions from "../Conditions/Conditions";
import classes from "./Forecast.module.css";

const Forecast = () => {
  let [responseObj, setResponseObj] = useState({});
  let [city, setCity] = useState("");
  let [unit, setUnit] = useState("metric");
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);

  function getForecast(e) {
    e.preventDefault();

    if (city.length === 0) {
      return setError(true);
    }
    // weather data fetch function will go here

    setError(false);
    setResponseObj({});

    setLoading(true);

    const uriEncodedCity = encodeURIComponent(city);

    fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key": "a67c00cd81msh951e1961708ce8fp12b6a3jsn0fe322e85b3c"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        if (response.cod !== 200) {
          throw new Error();
        }
        setLoading(false);
        setResponseObj(response);
      })
      .catch(err => {
        setLoading(false);
        setError(true);
      });
  }

  return (
    // JSX code will go here
    <div>
      <h2>Find Current Weather Conditions</h2>

      <form onSubmit={getForecast}>
        <input
          type="text"
          placeholder="Enter City"
          maxLength="50"
          value={city}
          onChange={e => setCity(e.target.value)}
          className={classes.textInput}
        />
        <label className={classes.Radio}>
          <input
            type="radio"
            name="units"
            checked={unit === "imperial"}
            value="imperial"
            onChange={e => setUnit(e.target.value)}
          />
          Fahrenheit
        </label>
        <label className={classes.Radio}>
          <input
            type="radio"
            name="units"
            checked={unit === "metric"}
            value="metric"
            onChange={e => setUnit(e.target.value)}
          />
          Celcius
        </label>
        <button className={classes.Button} type="submit">
          Get Forecast
        </button>
      </form>
      <Conditions responseObj={responseObj} error={error} loading={loading} />
    </div>
  );
};

export default Forecast;
