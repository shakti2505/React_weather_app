import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import weatherIcon from './static/images/Icon.png'
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  


  const [data, setData] = useState({})

  const [inputCity, setInputCity] = useState("")


  const weatherData = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" +  process.env.REACT_APP_API_KEY;

    axios.get(apiURL).then((res) => {
      console.log('response', res.data)
      setData(res.data);

    }).catch((err) => {
      console.log("err", err)
    })

  }

  
  const handleSearch = () => {
    weatherData(inputCity);
    console.log(inputCity)
  }

  

  // taking input from form value and passing
  const handleChangeInput = (e) => {
    setInputCity(e.target.value)
    // console.log(e.target.value)

  }


useEffect(() => {
    weatherData("Delhi");
  }, []);



  if (!data) {
    return <div>Loading!</div>;
  }
  else {
    return (
      <>
        <div className="col-md-12">
          <div className="weatherBg">
            <h1 className="heading">Weather App</h1>
            <div className="d-grid gap-3 col-4 mt-4">
              <input id="search" type="text" className="form-control" value={inputCity} onChange={handleChangeInput} />
              <button id="city" className="btn btn-primary" type="button"  onClick={handleSearch}>Search</button>
            </div>

          </div>
        </div>

        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded weatherResultBox">
            <img className="weathericon" src={weatherIcon} alt="" />
            <h5 className="other">Country: {data?.sys?.country}</h5>
            <h5 className="WeatherCity">City: {data.name}</h5>
            <h5 className="temp">Temp: {((data?.main?.temp) - 273.15).toFixed(2)}&deg;C</h5>
            <h5 className="other">feels_like: {((data?.main?.feels_like) - 273.15).toFixed(2)}&deg;C</h5>
            <h5 className="other">Humidity: {(data?.main?.humidity)}%</h5>
          </div>
        </div>

      </>
    );
  }
}

export default App;
