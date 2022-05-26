console.log("hello world");

const API_URL_GEO = "https://se-weather-api.herokuapp.com/api/v1/geo?zip_code";
const API_URL_FORE = "https://se-weather-api.herokuapp.com/api/v1/forecast?";
const HTMLIcon = document.getElementById("icon");
const HTMLClimate = document.getElementById("climate");
const HTMLCity = document.getElementById("tittle");
const date = new Date();

//function to get the zip code from the index,
async function getZipCode() {
  cleanData();
  const zipCode = document.getElementById("text").value;
  var today = date.toLocaleDateString();
  await GetApiGeo(zipCode, today);
}

// Function to get the API_GEO use fetch to consume the API, this function takes 2 arguments zipCode and date, zipCode sends to the Fetch URL and the date sends to the other function GetAPiFore
function GetApiGeo(zipCode, date) {
  fetch(`${API_URL_GEO}=${zipCode}`, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      if (Object.keys(data).length === 0 || data.error) {
        return alert(
          "There is no information, zip code is invalid or has no data"
        );
      }
      HTMLCity.innerHTML = `Weather forecast for Region: ${data.region}, City: ${data.city}`;
      GetApiFore(data.latitude, data.longitude, date);
    })
    .catch((err) => console.log(err));
}

//Function to get the API_FORE, use fetch to consume the API, this function takes 3 arguments, latitude, longitude and date.
function GetApiFore(latitude, longitude, date) {
  fetch(
    `${API_URL_FORE}latitude=${latitude}&longitude=${longitude}&date=${date}`,
    { method: "GET" }
  )
    .then((response) => response.json())
    .then((data) => {
      HTMLIcon.innerHTML = `Icon: ${data.daily.icon}`;
      HTMLClimate.innerHTML = `Climate information: ${data.daily.summary}`;
    })
    .catch((err) => console.log(err));
}

//Function to erase the data store in the elements
function cleanData() {
  HTMLCity.innerHTML = "";
  HTMLClimate.innerHTML = "";
  HTMLIcon.innerHTML = "";
}
