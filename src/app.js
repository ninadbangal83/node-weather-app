const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("../src/utils/geocode");
const weatherCode = require("../src/utils/weathercode");
// const request = require("postman-request");
const chalk = require("chalk");

const app = express();

// Define paths for express configuration.
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars and views location.
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDirPath));

// Setup Express routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    page: "Home",
    forecastMessage: "",
  });
});

app.get("/weather", (req, res) => {
  geoCode(req.query.address, (error, { latitude, longitude, place } = {}) => {
    if (error) {
      return res.send({ error });
    }

    if (!req.query.address) {
      return res.send({ forecastMessage: "Provide address!" });
    }

    return weatherCode(
      latitude,
      longitude,
      (error, { weather_descriptions, temperature, precip } = {}) => {
        if (error) {
          return res.send({ error });
        }

        console.log(chalk.bgWhite.black("Weather Forecast - "));
        console.log("Location - " + place);
        console.log(
          `${weather_descriptions}. It is currently ${temperature} degrees out. There is a ${precip}% chance of rain. `
        );

        return res.send({
          forecastMessage: `${weather_descriptions}. It is currently ${temperature} degrees out. There is a ${precip}% chance of rain. `,
        });
      }
    );
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App",
    page: "About",
    name: "Ninad Bangal",
    role: "Developer",
    technologies: ["Reactjs, Nodejs, MongoDB"],
  });
});

app.get("/about/*", (req, res) => {
  res.render("404", {
    title: "Weather App",
    errorMessage: "Article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", { title: "Weather App", errorMessage: "Page not found!" });
});

app.listen("3000", () => {
  console.log("Server is listening on port 3000...");
});
