//
// Version control
//

$("#update-banner").css( "display", "block" );

$.getJSON('test.json', function(data){
  var items = [];
 
  $.each(data, function(key, val){
    items.push('<li id="' + key + '">' + val + '</li>');
  });
 
  $('<ul/>', {
    'class': 'my-new-list',
    html: items.join('')
  }).appendTo('#update-info');
});


// ajax loading


// News loading
var xmlhttp, text;
xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', 'http://xn--j1ac0b1a.xn--e1alhsoq4c.xn--p1ai/oa_app/news.html', false);
xmlhttp.send();
text = xmlhttp.responseText;

document.getElementById('news').innerHTML = text;


// Cordova js
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    document.addEventListener("backbutton", function(e){  
           e.preventDefault();
           document.location.href="index.html";
    }, false);
}

app.initialize();
