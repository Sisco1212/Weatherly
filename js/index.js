const form = document.querySelectorAll("form");
// const cityInput = document.querySelector("input");
const apiKey = "2b8e3774f08692423a8fe008ca408479";
const thunderstorm = document.querySelector("#thunderstorm");
const rain = document.querySelector("#rain");
const drizzle = document.querySelector("#drizzle");
const snow = document.querySelector("#snow");
const cloudy = document.querySelector("#cloudy");
const sun = document.querySelector("#sun");
const fog = document.querySelector("#fog");
const temparatureNode = document.querySelectorAll(".temparature");
const cityNode = document.querySelectorAll(".location");
const humidityNode = document.querySelectorAll(".humidity");
const descriptionNode = document.querySelectorAll(".description");
const emojiNode = document.querySelectorAll(".emoji");
const windSpeedNode = document.querySelectorAll(".speed");
const pressureNode = document.querySelectorAll(".pressure");
const suggestions = document.querySelectorAll(".suggestions p");
const time = document.querySelectorAll(".time");
let menuTogglee = document.querySelector(".mobile-nav");
let navv = document.querySelector(".mobile-menu");
let popup = document.querySelector(".pop-up");
let popupText = document.querySelector(".pop-up p");



 window.onload = async () => {
    const defaultCity = localStorage.getItem("defaultCity") || "Uyo";

     try {
  const weatherData = await getWeatherData(defaultCity);
  displayWeatherInfo(weatherData);
     } catch(error) {
        displayError("Could not fetch weather");
     }
    }


    form.forEach((f) => {
        f.addEventListener("submit", async e => {
        e.preventDefault();

    
     const city = f.cityInput.value.trim();
    
        if(city) {
            try {
                const weatherData = await getWeatherData(city);
                displayWeatherInfo(weatherData);
                localStorage.setItem("defaultCity", city);

            } catch(error) {
                displayError("Could not fetch weather");
            }
            menuTogglee.classList.remove("active");
  navv.classList.remove("show");
        }
        else {
            displayError("Enter a valid city name")
        }
    })});


    suggestions.forEach((suggest) => {
      suggest.addEventListener('click', async () => {
          try {
            const suggestion = suggest.textContent.trim();
            const weatherDeets = await getWeatherData(suggestion);
            displayWeatherInfo(weatherDeets);
            localStorage.setItem("defaultCity", suggestion)
          }
          catch(error) {
            displayError("Could not fetch weather");
          }
      })
    })

async function getWeatherData(city) {
    try {

        const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
         const response = await fetch(apiurl);
    
         if(!response.ok) {
            throw new Error("Could not fetch weather");
         }
         return await response.json();
    } catch(error) {
        displayError(error)
    }

}

function displayWeatherInfo(data) {

    console.log(data)
 const {
    name:city, 
    main: {temp, humidity, pressure},
    weather: [{description, id}],
    wind: {speed},
    dt,
    timezone
} = data;
 const weatherStatus = displayWeatherEmoji(id)

 if(weatherStatus.status == "thunderstorm") {
     thunderstorm.style.display = "block"
     rain.style.display = "none";
     drizzle.style.display = "none";
     snow.style.display = "none";
     cloudy.style.display = "none";
     sun.style.display = "none";
     fog.style.display = "none";

 } 
 
 else if( weatherStatus.status == "rain") {
     rain.style.display = "block";
    thunderstorm.style.display = "none"
     drizzle.style.display = "none";
     snow.style.display = "none";
     cloudy.style.display = "none";
     sun.style.display = "none";
     fog.style.display = "none";
 } 
 
 else if(weatherStatus.status == "drizzle") {
     drizzle.style.display = "block";
    thunderstorm.style.display = "none"
     rain.style.display = "none";
     snow.style.display = "none";
     cloudy.style.display = "none";
     sun.style.display = "none";
     fog.style.display = "none";
 } 
 
 else if(weatherStatus.status == "snow") {
     snow.style.display = "block";
    thunderstorm.style.display = "none"
     rain.style.display = "none";
     drizzle.style.display = "none";
     cloudy.style.display = "none";
     sun.style.display = "none";
     fog.style.display = "none";
 }

 else if(weatherStatus.status == "fog") {
     fog.style.display = "block";
    thunderstorm.style.display = "none"
     rain.style.display = "none";
     drizzle.style.display = "none";
     snow.style.display = "none";
     cloudy.style.display = "none";
     sun.style.display = "none";
 }

 else if(weatherStatus.status == "sun") {
     sun.style.display = "block";
    thunderstorm.style.display = "none"
     rain.style.display = "none";
     drizzle.style.display = "none";
     snow.style.display = "none";
     cloudy.style.display = "none";
     fog.style.display = "none";
 }

 else if(weatherStatus.status == "cloudy") {
     cloudy.style.display = "block";
    thunderstorm.style.display = "none"
     rain.style.display = "none";
     drizzle.style.display = "none";
     snow.style.display = "none";
     sun.style.display = "none";
     fog.style.display = "none";
 }

     cityNode.forEach(node => node.textContent = city);
     temparatureNode.forEach(node => node.innerHTML = `${(temp - 273.15).toFixed(1)}<sup><small>°C</small></sup>`);
     humidityNode.forEach(node => node.textContent = humidity + ' %');
     descriptionNode.forEach(node => node.textContent = description);
     emojiNode.forEach(node => node.textContent = weatherStatus.emoji);
     pressureNode.forEach(node => node.textContent = pressure +" km/h");
     windSpeedNode.forEach(node => node.textContent = speed + " hPa");

     const cityDate = getCityDateTime(dt, timezone)
     const formattedTime = formatCityTime(cityDate);

     time.forEach(t => {
        t.textContent = formattedTime;
     })

}

function displayWeatherEmoji(weatherId) {
    switch(true) {
        case (weatherId >= 200 && weatherId < 300):
            return {"emoji":'⛈️', "status": "thunderstorm"};
        case (weatherId >= 300 && weatherId < 400):
            return {"emoji": '🌧️', "status": "rain"};
        case (weatherId >= 500 && weatherId < 600):
            return {"emoji" :'🌧️', "status": "drizzle"};
        case (weatherId >= 600 && weatherId < 700):
            return {"emoji": '❄️', "status": "snow"};
        case (weatherId >= 700 && weatherId < 800):
            return {"emoji" :'🌫️', "status": "fog"};
        case (weatherId === 800):
            return {"emoji": '☀️', "status": "sun"};
        case (weatherId > 800 && weatherId <= 809):
            return {"emoji": '☁️', "status": "cloudy"};
        default:
            return '❓';
    }
}

function displayError(message) {
   console.error(message);

   popup.classList.add("show");
   popupText.textContent = message;

   setTimeout(() => {
   popup.classList.remove("show");
   }, 2000)

}

function getCityDateTime(dt, timezone) {
        const localTimeMs = (dt + timezone) * 1000

        return new Date(localTimeMs);
     }

function formatCityTime(date) {
        return `${date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })}
        -
        ${date.toLocaleDateString("en-us", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"

        })}
        `
     }