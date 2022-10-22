const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('#search-button');
const temperatureText = document.querySelector('#temperature');
const locationText = document.querySelector('#location');
const conditionText = document.querySelector('#weather-condition');
const humidityText = document.querySelector('#humidity');
const feelsLikeText = document.querySelector('#feels-like');



const getInfos = (event) => {
    event.preventDefault()

    const cityName = searchInput.value
    axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=20ce4be2790486118f707683c2bb267a`).then(function (response) {
            
            const data = response.data[0];

            console.log(data)

            if (data == undefined) {
                alert('City not found :/')
            }

            locationText.innerText = (`${data.name}, ${data.state}, ${data.country}`)

            const coordinates = {
                lat: data.lat,
                lon: data.lon
            };

            axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,alerts&units=metric&appid=20ce4be2790486118f707683c2bb267a`).then(function (response) {
                    console.log(response)
                    temperatureText.innerText = Math.round(response.data.current.temp)
                    conditionText.innerText = (response.data.current.weather[0].description)
                    humidityText.innerText = (`Humidity: ${response.data.current.humidity}%`)
                    feelsLikeText.innerText = (`Feels like: ${Math.round(response.data.current.feels_like)}ºC`)
                    searchInput.value = ''
            })
        });
}


function getLocation() {
    axios.get('https://www.gogeoip.com/json/?user').then(function (response) {
        const location = {"city": response.data.location.city, "country": response.data.location.country.name};

        console.log('Request 1 passed');

        console.log(`${location.city}, ${location.country}`);

        locationText.innerText = (`${location.city}, ${location.country}`);


        axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${location.city}&appid=20ce4be2790486118f707683c2bb267a`).then(function (response) {
            
            const data = response.data[0];

            console.log(data)

            const coordinates = {
                lat: data.lat,
                lon: data.lon
            };

            axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,alerts&units=metric&appid=20ce4be2790486118f707683c2bb267a`).then(function (response) {
                    console.log(response)
                    temperatureText.innerText = Math.round(response.data.current.temp)
                    conditionText.innerText = (response.data.current.weather[0].description)
                    humidityText.innerText = (`Humidity: ${response.data.current.humidity}%`)
                    feelsLikeText.innerText = (`Feels like: ${Math.round(response.data.current.feels_like)}ºC`)
            })

            
        });
    });
};

getLocation()
searchForm.addEventListener('submit', getInfos)
searchButton.addEventListener('click', getInfos)
/*
const getCoordinates = async (query) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${API_KEY}`
    );
    const json = await response.json();
    const data = json[0];

    const coordinates = {
      lat: data.lat,
      lon: data.lon,
    };
    const location = `${data.name}, ${data.country}`;

    return {
      coordinates,
      location,
    };
  };*/