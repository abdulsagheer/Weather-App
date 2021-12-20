import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

// useEffect hook tell our component app to do something after rendering
function App() {
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState({
    city: "Bangalore",
    country: "IN",
    temperature: "25",
    humidity: "42",
    minTemperature: "18",
    weatherIcons: "02d",
  });

  useEffect(() => {
    // we add what we want to happen after rendering
    // fetch the database information the API call
    // weather database
    fetchData();
  }, []);

  const fetchData = async (city) => {
    // try catch error handling
    try {
      const APIKEY = "651bf3255df84c520837489036541a6b";
      // axios is a library which will allow us
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=Metric`
      );
      await setAllData({
        city: result.data.name,
        country: result.data.sys.country,
        temperature: result.data.main.temp,
        humidity: result.data.main.humidity,
        minTemperature: result.data.main.temp_min,
        weatherIcons: result.data.weather[0].icon,
      });
    } catch (e) {
      console.log("API loaded for the first time or not loaded correctly");
    }
  };

  const handleSubmit = (event) => {
    console.log(search);
    event.preventDefault();
    fetchData(search);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    // section tag in react for sections is the main tga for the main build
    <main>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            value={search}
            type="text"
            name="city"
            placeholder="Enter your Location"
            onChange={handleChange}
          />
          <button for="city">Search</button>
        </form>
        <section>
          <div className="header-div">
            <div>
              <div className="data">
                <img
                  src={
                    "https://openweathermap.org/img/wn/" +
                    allData.weatherIcons +
                    "@2x.png"
                  }
                />

                <h1 className="title">{allData.city}</h1>
                <h2 className="location">{allData.country}</h2>

                <div className="weather-description">
                  <div>
                    <h3>HUMIDITY</h3>
                    <p>{allData.humidity}%</p>
                  </div>
                  <div>
                    <h3>TEMPERATURE</h3>
                    <p>{allData.temperature}°C</p>
                  </div>
                  <div>
                    <h3>MIN TEMPERATURE</h3>
                    <p>{allData.minTemperature}°C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
