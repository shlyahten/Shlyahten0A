//---------------------------
// Version control
//---------------------------
function getUpdate(){
var ver = 300;

$.getJSON('test.json', function(data){ // http://xn--j1ac0b1a.xn--e1alhsoq4c.xn--p1ai/oa_app/update.js
  var items = [];
 
// test version
console.log("Version on server: "+data.version);
console.log("Version of app: "+ver);
if (data.version>ver) {
  $("#update-banner").css( "display", "block" );
}

  $.each(data.info[0], function(key, val){
    items.push('<li id="' + key + '">' + val + '</li>');
  });
 
  $('<ul/>', {
    'class': 'update-list',
    html: items.join('')
  }).appendTo('#update-info');
});
}

//---------------------------
// News loading
//---------------------------
function getNews(){
  $('#news').load('http://xn--j1ac0b1a.xn--e1alhsoq4c.xn--p1ai/oa_app/news.html');
}

//---------------------------
// Cordova js
//---------------------------
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    document.addEventListener("backbutton", function(e){  
           e.preventDefault();
           document.location.href="index.html";
    }, false);
}

app.initialize();
