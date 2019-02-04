
//NOTE: ES5 chosen instead of ES6 for compatibility with older devices
var now, dd, td, details;
var lat, lon, gd;
var weatherurl, wd, icon;
var city, region;
var temperaturescale = "F"; //set to F or C (fahrenheit or celsius)
var usephp = false; // set to true to use a php document to hide your api key
var locationRequested = false;
var weatherminute;
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var sunsettime = 0;
var sunrisetime = 0;
var iconurl = "https://openweathermap.org/img/w/";
var winddegrees = [[348.75,"N"],[326.25,"NNW"],[303.75,"NW"],[281.25,"WNW"],[258.75,"W"],[236.25,"WSW"],[213.75,"SW"],[191.25,"SSW"],[168.75,"S"],[146.25,"SSE"],[123.75,"SE"],[101.25,"ESE"],[78.75,"E"],[56.25,"ENE"],[33.75,"NE"],[11.25,"NNE"],[0,"N"]];

document.addEventListener("DOMContentLoaded", init, false);
function init(){
  //a set of custom icons I created
  iconurl = "https://shearspiremedia.com/demos/icons4owm/"; 
  dd = document.getElementById("date");
  td = document.getElementById("time");
  wd = document.getElementById("weather");
  gd = document.getElementById("gps");
  icon = document.getElementById("icon");
  details = document.getElementById("weatherdetails");
  weatherminute = randRange(0,14);
  getLocation();
  updateTime();
  setInterval(updateTime,1000);
}
function updateTime(){
  var clockdata = getClockStrings();
  dd.innerHTML = clockdata.datehtml;
  td.innerHTML = clockdata.timehtml;
  dd.dateTime = now.toISOString();
  td.dateTime = now.toISOString();
  var sec = now.getSeconds();
  var minutes = now.getMinutes();
  if (locationRequested && sec === 0){
    checkForSunset(); //checks for sunset once each minute
     if (minutes % 15 === weatherminute){
      getWeather(); //get weather every 15 minutes
      //weatherminute is a random number between
      //0 and 14 to ensure that users don't all hit
      //the API at the same minute
    }
  }
}
function getClockStrings(){
  now = new Date();
  var year = now.getFullYear();
  var month = months[now.getMonth()];
  var date = now.getDate();
  var day = days[now.getDay()];
  var hour = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var meridian = hour < 12 ? "AM" : "PM";
  var clockhour = hour > 12 ? hour - 12 : hour;
  if (hour === 0) {clockhour = 12;}
  var clockminutes = minutes < 10 ? "0" + minutes : minutes;
  var clockseconds = seconds < 10 ? "0" + seconds : seconds;
  var datehtml = day + ", " + month + " " + date + ", " + year;
  var timehtml = clockhour + ":" + clockminutes + "<span>:" + clockseconds + " " + meridian + "</span>";
  return {"datehtml":datehtml,"timehtml":timehtml};
}
function getLocation() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
      var noerror = true;//for testing
      if (this.status === 200 && noerror){
        var data = xhttp.responseText;
        showPosition(JSON.parse(data));
      }else{
        showPosition(null);
      }
    }
  };
  xhttp.open("GET", "https://extreme-ip-lookup.com/json/", true);
  xhttp.send();
}

function showPosition(position) {
  if (!position){
    gd.innerHTML = "IP address location service is unavailable.";
    return;
  }
  lat = Number(position.lat);
  lon = Number(position.lon);
  city = position.city;
  region = position.region;
  //gd.innerHTML = "GPS: " + lat.toFixed(2) + " | " + lon.toFixed(2);
  gd.innerHTML = city + ", " + region;
  if (usephp){
    weatherurl = "clock.php?lat=" + lat + "&lon=" + lon;
    //weatherurl = "clock.php?lat=200&lon=200"; // for testing error response
  }else{    
    weatherurl = "https://api.openweathermap.org/data/2.5/weather?";
    weatherurl += "lat=" + lat + "&lon=" + lon + "&APPID=";
    weatherurl += "f749d7b37751644081621a98faf341f4";
    //for the APPID, please substitute your own API Key you can get for free from openweathermap.org
  }
  /*
        an alternative to exposing your API Key is to call a PHP document
        where the API Key is stored securely on the server. The PHP document in turn
        calls the weatherurl and returns an HTML document whose body is a json string that
        can be parsed. Codepen doesn't allow php access so I established a throw-away
        account on openweathermap.org for this demonstration which has the apikey referenced here.

        for a working example that uses PHP to hide the api key see     
        https://shearspiremedia.com/demos/clock/
   */
  if (!locationRequested){
    getWeather();
    locationRequested = true;
  }
}
function getWeather(){
  wd.innerHTML = "getting weather";
  // I opted to use the older XMLHttpRequest because fetch is not supported on old devices like the iPhone 4s
  // I developed this page so I could use my old iPhone 4s as a wall clock.
  var xhttp = new XMLHttpRequest();
  xhttp.responseType = usephp ? "document" : "text"; //the php file returns a document rather than plain text
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      //when using PHP as a data source we need the textContent of the body of the returned document
      var data = usephp ? xhttp.response.body.textContent : xhttp.responseText;
      processWeather(JSON.parse(data));
    }
  };
  xhttp.open("GET", weatherurl, true);
  xhttp.send();
}
function convertTemperature(kelvin){
  //converts temps in kelvin to celsius or fahrenheit
  var celsius = (kelvin - 273.15);
  return temperaturescale === "F" ? celsius * 1.8 + 32 : celsius;
}
function processWeather(data){
  var weather = data["weather"][0];
  icon.src = iconurl + weather.icon + ".png";
  icon.style.opacity = 1;
  var localtemperature = convertTemperature(data["main"].temp).toFixed(0);
  wd.innerHTML =  localtemperature + "°" + temperaturescale + "&nbsp;&nbsp;" + weather.description;
  sunsettime = Number(data["sys"].sunset);
  sunrisetime = Number(data["sys"].sunrise);
  checkForSunset();
  
  
        var gpsline = "GPS: " + lat.toFixed(2) + " | " + lon.toFixed(2) + "<br>";
        var pressureline = "Pressure: " + data.main.pressure + " hpa<br>";
        var humidityline = "Humidity: " + data.main.humidity + "%<br>";
        var windline = "Winds: " + data.wind.speed + " mph ";
        if (data.wind.deg){
            windline += data.wind.deg + "° (" + getWindDirection(data.wind.deg) + ")";
        }
        windline += "<br>";
        var sunriseline = "Sunrise: " + new Date(data.sys.sunrise * 1000).toLocaleTimeString() + "<br>";
        var sunsetline = "Sunset: " + new Date(data.sys.sunset * 1000).toLocaleTimeString() + "<br>";

        details.innerHTML = windline + pressureline + humidityline + sunriseline + sunsetline + gpsline;
}

function checkForSunset(){
  var nowtime = now.getTime()/1000;
  //changes the presentation style if the time of day is after sunset
  //or before the next day's sunrise
  var isDark = nowtime > sunsettime || nowtime < sunrisetime;
  document.getElementById("container").className = isDark ? "nightmode" : "daymode";
  //uncomment the following if you want santa mode
  // if (now.getMonth() === 11 && now.getDate() < 26){
  //   document.getElementById("container").className = "santamode";
  // }
}
//random number utility function
function randRange(min, max) {
  return Math.floor(Math.random()*(max-min+1))+min;
}

function getWindDirection(deg){
  for (var i=0;i<winddegrees.length;i++){
    if (deg > winddegrees[i][0]){
      return winddegrees[i][1];
    }
  }
  return "__";
}


