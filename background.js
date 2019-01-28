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
