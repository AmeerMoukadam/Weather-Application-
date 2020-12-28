let long;
let lat;
let temperatureSection = document.querySelector(".temperature");
let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector("#temperature-degree");
let locationTimeZone = document.querySelector(".location-timezone");
let temperatureSpan = document.querySelector(".temperature span");

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/a4072fcf43222bfca20ccef107c75834/${lat},${long}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temperature, summary, icon } = data.currently;
          //Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimeZone.textContent = data.timezone;
          //formula for celsius
          let celsius = (temperature - 32) * (5 / 9);

          //set icon
          setIcons(icon, document.querySelector(".icon"));

          //change temperature to celsius/farenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
