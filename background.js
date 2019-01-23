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
