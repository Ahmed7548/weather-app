/* Global Variables */
// API base url
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
//unit of measurement
let unit = "&units=metric";
// my specified Api key
const myApiKey = "&appid=a645eb98a6715f6aceb66fbb8a48eb2c";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

/* _____functions_____ */
//specifying the unit of measurement
const specifyingUnit = async () => {
  //storing the value of select element
  const select = document.querySelector("select").value;
  switch (select) {
    case "metric":
      unit = "&units=metric";
      document.getElementById("degree").innerHTML = "&#8451;";
      break;
    case "imperial":
      unit = "&units=imperial";
      document.getElementById("degree").innerHTML = "&#8457;";
      break;
    case "standard":
      unit = "";
      document.getElementById("degree").innerHTML = "&#x212A; &deg;";
      break;
    default:
      unit = "";
      document.getElementById("degree").innerHTML = "&#x212A; &deg;";
  }
};

// setteng an async call function to fetch weather from the API
const getWeather = async (url) => {
  const res = await fetch(url);
  try {
    const newData = await res.json();
    const neededData = {
      date: newDate,
      temp: newData.main.temp,
      content: document.getElementById("feelings").value,
    };
    return neededData;
  } catch (err) {
    console.log(`error ${err}`);
  }
};

//setting an async callback function to post the data to the setted rout on the server side
const postWeather = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// an async callback function to get data fro server side and display it on client UI
const displayData = async () => {
  const res = await fetch("/displaydata");
  try {
    const disData = await res.json();
    document.getElementById("date").textContent = disData.date;
    document.getElementById("temp").textContent = disData.temp;
    document.getElementById("content").textContent = disData.content;
    console.log(disData);
  } catch (err) {
    console.log(`error ${err}`);
  }
};
/* chaine promises */
// chsining async function using then
function call() {
  let zipCode = document.getElementById("zip").value;
  specifyingUnit();
  let url = baseUrl + zipCode + unit + myApiKey;
  getWeather(url)
    .then((data) => postWeather("/input", data))
    .then(() => displayData());
}
/* events  */

document.getElementById("generate").addEventListener("click", call);
