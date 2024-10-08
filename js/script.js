let search = document.querySelector("#search");
let submit = document.querySelector("#submit");
let today = document.querySelector("#today");
let todayDate = document.querySelector("#todayDate");
let locationCite = document.querySelector("#locationCite");
let tempToday = document.querySelector("#tempToday");
let todayIcon = document.querySelector("#todayIcon");
let umbrella = document.querySelector("#umbrella");
let wind = document.querySelector("#wind");
let compass = document.querySelector("#compass");
let todayDescription = document.querySelector("#todayDescription");

/////////////////  Display Next Day
let dayTomorrow = document.querySelectorAll(".dayTomorrow");
let iconTomorrow = document.querySelectorAll(".iconTomorrow");
let maxTempTomorrow = document.querySelectorAll(".maxTempTomorrow");
let minTempTomorrow = document.querySelectorAll(".minTempTomorrow");
let tomorrowDescription = document.querySelectorAll(".tomorrowDescription");
/////////////////  Display After Next Day

let afterNextDay = document.querySelectorAll(".afterNextDay");
let iconAfterNextDay = document.querySelectorAll(".iconAfterNextDay");
let maxTempAfterTomorrow = document.querySelectorAll(".maxTempAfterTomorrow");
let minTempAfterTomorrow = document.querySelectorAll(".minTempAfterTomorrow");
let afterNextDayDescription = document.querySelectorAll(
    ".afterNextDayDescription"
);

let spinner = document.querySelector(".spinner");

///////////  Days of the week
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

///////////  Months of the Year
let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
/////////// Input Search
search.addEventListener("input", function (e) {
    getWeather(e.target.value);
    hideSpinner();
});

/////////// Get location
function success(location) {
    getWeather(`${location.coords.latitude},${location.coords.longitude}`);
}
/////////// handling error
function errorHandler() {
    getWeather(city);
}

/////////// geolocation
navigator.geolocation.getCurrentPosition(success, errorHandler);

/////////// Show spinner
function showSpinner() {
    spinner.style.display = "flex";
}

///////////hidden spinner
function hideSpinner() {
    spinner.style.display = "none";
}

/////////// Get Weather Async Function
let data;
async function getWeather(city) {
    showSpinner();
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=76324a5dcc0c47119dd21046241809&days=3&aqi=no&alerts=no&q=${city}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        data = await response.json();
        displayToday();
        displayTomorrow();
        displayAfterNextDay();
        checkTemperatureToday();
        checkTemperatureTomorrow();
        checkTemperatureAfterTomorrow();
    } catch (error) {
        console.log(error);
    } finally {
        hideSpinner();
    }
}

/////////// Display Today Data
function displayToday() {
    let date = new Date(data.current.last_updated);
    today.innerHTML = days[date.getDay()];
    todayDate.innerHTML = date.getDate() + " " + months[date.getMonth()];
    locationCite.innerHTML = data.location.name;
    tempToday.innerHTML = Math.round(data.current.temp_c) + "°C";
    todayIcon.src = `https:${data.current.condition.icon}`;
    todayDescription.innerHTML = data.current.condition.text;
    wind.innerHTML =
        `<img src="images/icon-wind.png" alt=""> ` +
        Math.round(data.current.wind_kph) +
        " km/h";
    compass.innerHTML =
        `<img src="images/icon-compass.png" alt=""> ` + data.current.wind_dir;
    umbrella.innerHTML =
        `<img src="images/icon-umbrella.png" alt=""> ` +
        data.current.humidity +
        "%";
}

/////////// Display Tomorrow Data
function displayTomorrow() {
    for (let i = 0; i < dayTomorrow.length; i++) {
        if (data.forecast.forecastday[i + 1]) {
            let forecast = data.forecast.forecastday[i + 1];
            let forecastDate = new Date(forecast.date);
            dayTomorrow[i].innerHTML = days[forecastDate.getDay()];
            iconTomorrow[i].src = `https:${forecast.day.condition.icon}`;
            maxTempTomorrow[i].innerHTML =
                Math.round(forecast.day.maxtemp_c) + "°C";
            minTempTomorrow[i].innerHTML =
                Math.round(forecast.day.mintemp_c) + "°C";
            tomorrowDescription[i].innerHTML = forecast.day.condition.text;
        }
    }
}

/////////// Display After Next Day Data
function displayAfterNextDay() {
    for (let i = 0; i < afterNextDay.length; i++) {
        if (data.forecast.forecastday[i + 2]) {
            let forecast = data.forecast.forecastday[i + 2];
            let forecastDate = new Date(forecast.date);
            afterNextDay[i].innerHTML = days[forecastDate.getDay()];
            iconAfterNextDay[i].src = `https:${forecast.day.condition.icon}`;
            maxTempAfterTomorrow[i].innerHTML =
                Math.round(forecast.day.maxtemp_c) + "°C";
            minTempAfterTomorrow[i].innerHTML =
                Math.round(forecast.day.mintemp_c) + "°C";
            afterNextDayDescription[i].innerHTML = forecast.day.condition.text;
        }
    }
}

/////////// check Temperature for Today
function checkTemperatureToday() {
    let bgToday = document.querySelector(".bgToday");
    let currentTemp = data.current.temp_c;
    if (currentTemp !== undefined) {
        if (currentTemp <= 0 || currentTemp <= 15) {
            bgToday.style.backgroundImage = "url('images/mountains.gif')";
            console.log("Weather Today Background image Mountains ");
        } else if (currentTemp <= 20 || currentTemp <= 23) {
            bgToday.style.backgroundImage = "url('images/spring.gif')";
            console.log("Weather Today Background image Spring");
        } else if (currentTemp >= 25) {
            bgToday.style.backgroundImage = "url('images/sun.gif')";
            console.log("Weather Today Background image Sun Hot ");
        }
    } else {
        console.error("Temperature data is not available.");
    }
}

/////////// check Temperature for Tomorrow
function checkTemperatureTomorrow() {
    if (
        data &&
        data.forecast &&
        data.forecast.forecastday &&
        data.forecast.forecastday[1]
    ) {
        let bgTomorrow = document.querySelector(".bgTomorrow");
        let foreTemp = data.forecast.forecastday[1].day.maxtemp_c;
        if (foreTemp !== undefined) {
            if (foreTemp <= 15) {
                bgTomorrow.style.backgroundImage =
                    "url('images/mountains.gif')";
                console.log("Weather Tomorrow Background image Mountains");
            } else if (foreTemp > 15 && foreTemp <= 23) {
                bgTomorrow.style.backgroundImage = "url('images/spring.gif')";
                console.log("Weather Tomorrow Background image Spring");
            } else if (foreTemp > 23) {
                bgTomorrow.style.backgroundImage = "url('images/sun.gif')";
                console.log("Weather Tomorrow Background image Sun Hot ");
            }
        }
    } else {
        console.error("Forecast data for tomorrow is not available.");
    }
}

/////////// check Temperature for After Tomorrow
function checkTemperatureAfterTomorrow() {
    if (
        data &&
        data.forecast &&
        data.forecast.forecastday &&
        data.forecast.forecastday[2]
    ) {
        let bgAfterTomorrow = document.querySelector(".bgAfterTomorrow");
        let foreTemp = data.forecast.forecastday[2].day.maxtemp_c;
        if (foreTemp !== undefined) {
            if (foreTemp <= 15) {
                bgAfterTomorrow.style.backgroundImage =
                    "url('images/mountains.gif')";
                console.log(
                    "Weather After Tomorrow Background image Mountains"
                );
            } else if (foreTemp > 15 && foreTemp <= 23) {
                bgAfterTomorrow.style.backgroundImage =
                    "url('images/spring.gif')";
                console.log("Weather After Tomorrow Background image Spring");
            } else if (foreTemp > 23) {
                bgAfterTomorrow.style.backgroundImage = "url('images/sun.gif')";
                console.log("Weather After Tomorrow Background image Sun Hot ");
            }
        }
    } else {
        console.error("Forecast data for tomorrow is not available.");
    }
}
