// var images = document.getElementsByTagName('img');
// for (var i = 0, l = images.length; i < l; i++) {
//   images[i].src = 'http://placekitten.com/' + images[i].width + '/' + images[i].height;
// }


// var imgURL = chrome.extension.getURL("http://localhost:3000/uploads/pet/image/1/____.png");
// document.getElementById('img').src = imgURL;

// document.body.style.backgroundImage = "url('http://localhost:3000/uploads/pet/image/1/____.png')";

// var display = "https://www.google.com/";
var xhr = new XMLHttpRequest();
  xhr.open('GET', "http://localhost:3000/pets", true);
  xhr.responseType = 'document';
  xhr.onload = function(e) {
    var doc = this.response;
    var img_arr = new Array();
    var img_src = doc.getElementsByTagName('img');
    for(var i = 0, l = img_src.length; i < l; i++){
      img_arr[i]= img_src[i].src;
      // console.log(img_arr[i]);
  }
   var random_img = img_arr[Math.floor(Math.random()*img_arr.length)+1];
    console.log(random_img);
    document.body.style.backgroundImage = 'url("'+random_img+'")';
    document.body.style.backgroundSize = "cover";
    document.body.style.minHeight = "100%";
    document.body.style.backgroundRepeat = "no-repeat";
    // document.body.style.backgroundPosition = "right";
    document.body.style.marginLeft = "auto";
    document.body.style.marginRight = "auto";
    document.body.style.display = "block";


 };
  xhr.send();

  //setinterval 함수 사용 