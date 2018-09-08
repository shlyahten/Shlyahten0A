 document.addEventListener("deviceready", onDeviceReady, false);
    // device APIs are available
    //
    function onDeviceReady() {
        var element = document.getElementById('deviceProperties');
        element.innerHTML = 'Модель: '    + device.model    + '<br />' +
                            'Версия Cordova: '  + device.cordova  + '<br />' +
                            'Платформа: ' + device.platform + ' ' + device.version + '<br />' +
                            'UUID: '     + device.uuid     + '<br />';
}

 // Wait for device API libraries to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        checkConnection();
    }

        function checkConnection() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = '<b style="color: red;">Отсутствует подключение!</b><br>Неизвестное подключение [FAIL]';
            states[Connection.ETHERNET] = 'Ethernet подключение';
            states[Connection.WIFI]     = 'WiFi [OK]';
            states[Connection.CELL_2G]  = 'Cell 2G [OK]';
            states[Connection.CELL_3G]  = 'Cell 3G [OK]';
            states[Connection.CELL_4G]  = 'Cell 4G [OK]';
            states[Connection.CELL]     = 'Cell generic [OK]';
            states[Connection.NONE]     = '<b style="color: red;">Отсутствует подключение!</b>';

            var NetState = states[networkState];
            document.getElementById('NetState').innerHTML="Подключен через: " + NetState;
        }

//
// LOGIN INPUT
//
document.addEventListener("deviceready", onDeviceReady, false);
    // Retrieve
    e_mail.value = localStorage.getItem("mail");
    uniquecode.value = localStorage.getItem("code");

        function ajax_post() {
            // Create our XMLHttpRequest object
            var hr = new XMLHttpRequest();
            // Create some variables we need to send to our PHP file
            var url = "http://xn--j1ac0b1a.xn--e1alhsoq4c.xn--p1ai/oa_app/app_start.php";
            var fn = document.getElementById("e_mail").value;
            var ln = document.getElementById("uniquecode").value;
    // Store
    localStorage.setItem("mail", fn);
    localStorage.setItem("code", ln);

            var vars = "email=" + fn + "&uniquecode=" + ln + "&model=" + device.model + "&version=" + device.version + "&uuid=" + device.uuid;
            hr.open("POST", url, true);
            // Set content type header information for sending url encoded variables in the request
            hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            // Access the onreadystatechange event for the XMLHttpRequest object
            hr.onreadystatechange = function () {
                if (hr.readyState == 4 && hr.status == 200) {
                    var return_data = hr.responseText;
                    if(return_data.search("ToVk") != -1){
                        vklogin();
                        // window.location.href = "http://xn--j1ac0b1a.xn--e1alhsoq4c.xn--p1ai/oa_app/VK/app_vk_auth_html.php";
                        // App.load('login');

                    }else {
                        document.getElementById("status").innerHTML = return_data;
                    }
                }
            }
            // Send the data to PHP now... and wait for response to update the status div
            hr.send(vars); // Actually execute the request
            document.getElementById("status").innerHTML = '<div class="mdl-spinner mdl-js-spinner is-active"></div>Пожалуйста подождите...';
        }

//
// SUCCESFULL AUTH
//
function vklogin() {
/* document.addEventListener("deviceready", onDeviceReady, false);
var ref = window.open('http://xn--j1ac0b1a.xn--e1alhsoq4c.xn--p1ai/oa_app/VK/app_vk_auth_html.php', '_blank', 'location=no, clearcache=yes, clearsessioncache=yes');
ref.addEventListener('loadstop', function() {
    ref.insertCSS({file: "/css/browser.css"});
    });*/
    document.location.href="login-final.html";
}