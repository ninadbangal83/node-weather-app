const request = require("postman-request");

const weatherCode = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ac1a507652013258f0058a44b36ea424&query=${lat},${lon}`;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      let data = body.current;
      callback(undefined, data);
    }
  });
};

module.exports = weatherCode;
