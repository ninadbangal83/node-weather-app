const request = require("postman-request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYmFuZ2FsbmluYWQ4MyIsImEiOiJjbGVndWt6d2wwa2JuM3NyeDhkdG5lMmRtIn0.3vUOfog1qzBudwjGMc7FJA`;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location!", undefined);
    } else {
      let data = body.features[0];
      callback(undefined, {
        latitude: data.center[1],
        longitude: data.center[0],
        place: data.place_name,
      });
    }
  });
};

module.exports = geoCode;
