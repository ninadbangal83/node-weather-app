const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecast = document.getElementById("forecast");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let location = search.value;
  console.log(location);

  forecast.textContent = "Loading..."

  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    console.log(res);
    res.json().then((data) => {
      console.log(data)
      if(data.error) {
        forecast.textContent = `${data.error}`
      } else {
        forecast.textContent = `${data.forecastMessage}`
      }
    })
  });
});
