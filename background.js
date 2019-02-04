var setBackground = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', "http://localhost:3000/pets", true);
  xhr.responseType = 'document';
  xhr.onload = function(e) {
    var doc = this.response;
    var imageArray = new Array();
    var imageSrc = doc.getElementsByTagName('img'); // 왠만하면 id plz
    for(var i = 0, l = imageSrc.length; i < l; i++){
      imageArray[i]= imageSrc[i].src;
    }
    var randomImage = imageArray[Math.floor(Math.random()*imageArray.length)+1];
    document.getElementById("background").style.backgroundImage = 'url("'+randomImage+'")';
  };
  xhr.send();
}

function getMessage() {
  var ar = new Array(20)
  ar[0] = "늦었다고 생각할 때가 정말 늦은 때다. 그러니 지금 당장 시작하라. -박명수"
  ar[1] = "위로가 필요할때 들어봐.                             https://www.youtube.com/watch?v=S6-Ma7rNh5Y"
  ar[2] = "넌 최선을 다했어. 그러면 된거야."
  ar[3] = "넌 할수있어. 아자아자 화이팅!"
  ar[4] = "아직 그대 안에 꽃피지 못한 가능성이 남아있습니다. 천천히, 그대 안의 가능성을 펼치십시오."
  ar[5] = "자신을 믿어라. 자신의 능력을 신뢰하라."
  ar[6] = "겸손하지만 합리적인 자신감 없이는 성공할 수도 행복할 수도 없다."
  ar[7] = "행복하지 않을 이유가 하나도 없습니다. 행복과 불행은 본인이 결정하는 것입니다. -김제동"
  ar[8] = "힘들때 웹툰 한편 어때? https://comic.naver.com/webtoon/weekday.nhn"
  ar[9] = "할수 있을때 하지 않으면 하고 싶을때 하지 못한다."
  ar[10] = "후회하기 싫으면 그렇게 살지 말고 그렇게 살 거면 후회하지 마라."
  ar[11] = "잊지마라. 벽을 눕히면 다리가 된다. -안젤라 데이비스-"
  ar[12] = "우리는 거북이 같아요. 천천히 그리고 꾸준히. 거북이가 결국 경주에서 이기지 않나요? -BTOB, 이민혁"
  ar[13] = "당신의 오늘 하루는 당신 예상보다 훨씬 더 잘 풀립니다. 당신은 잘 될 것이며, 잘 할 것이며, 잘 해낼 것입니다.모든 긍정은 당신을 위한 말이에요. 당신은 충분한 사람입니다."
  ar[14] = "어둠으로 뒤덮여있던 하늘. 그 어느 때보다 빛나는 달이지만 아침이 되어 빛을 잃어가면 어때요. 또다시 빛날 달인데, 너무 조급해하지 말아요."
  ar[15] = "행운이란 100퍼센트 노력한 뒤에 남는 것이다."
  ar[16] = "우리들은 말을 안해서 후회되는 일보다도 말을 해버렸기 떄문에 후회되는 일이 얼마나 많은가."
  ar[17] = "꿈이 없으신 분들 괜찮습니다. 꿈이 없을 수도 있어요. 행복하시면 됩니다. -슈가, 방탄소년단"
  ar[18] = "청춘, 자기 마음 속에 있는 꽃 같아요. 자기가 그 꽃을 찾으면 그때가 청춘이라 생각합니다. -RM, 방탄소년단"
  ar[19] = "자신감을 가져요. 자신이 먼저 자신을 믿지 않으면 그 누구도 자신을 믿어주지 않아요. -김성규, 인피니트"

  var now = new Date()
  var sec = now.getSeconds()
  document.getElementById("pet-name").innerHTML =ar[sec % 20]
}



//NOTE: ES5 chosen instead of ES6 for compatibility with older devices
var now, dd, td, details;
var lat, lon, gd;
var weatherurl, wd, icon;
var city, region;
var temperaturescale = "C"; //set to F or C (fahrenheit or celsius)
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

// function getClockStrings(){
//   now = new Date();
//   var year = now.getFullYear();
//   var month = months[now.getMonth()];
//   var date = now.getDate();
//   var day = days[now.getDay()];
//   var hour = now.getHours();
//   var minutes = now.getMinutes();
//   var seconds = now.getSeconds();
//   var meridian = hour < 12 ? "AM" : "PM";
//   var clockhour = hour > 12 ? hour - 12 : hour;
//   if (hour === 0) {clockhour = 12;}
//   var clockminutes = minutes < 10 ? "0" + minutes : minutes;
//   var clockseconds = seconds < 10 ? "0" + seconds : seconds;
//   var datehtml = day + ", " + month + " " + date + ", " + year;
//   var timehtml = clockhour + ":" + clockminutes + "<span>:" + clockseconds + " " + meridian + "</span>";
//   return {"datehtml":datehtml,"timehtml":timehtml};
// }


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


