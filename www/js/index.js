/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//---------------------------
// News loading
//---------------------------
function getNews(){
  $('#news').load('http://xn--j1ac0b1a.xn--e1alhsoq4c.xn--p1ai/oa_app/news.html');
}
//---------------------------
// Pages
//---------------------------
function loadTab(page){
        $(".container").load(page+".html");
            

        if (page == "main") {
            setTimeout(function () {getNews();}, 50);
        } else if (page == "info") {
            setTimeout(function () {deviceInfo();}, 50);  
        } else if (page == "login") {
            setTimeout(function () {loadValues();}, 50);
        }
    return false;
}
//---------------------------
// Pages active tab
//---------------------------
$('.tab-nav').click(function(){
    $('.tab-nav').removeClass("actv");
    $(this).addClass("actv");
});

//---------------------------
// Cordova js
//---------------------------
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    document.addEventListener("backbutton", function(e){  
           e.preventDefault();
           document.location.href="index.html";
    }, false);


    var success = function(status) {
        //alert('Message: ' + status);
    };
    var error = function(status) {
        alert('Error: ' + status);
    };
    window.CacheClear(success, error);
}

//---------------------------
// Device info
//---------------------------
function deviceInfo() {
        var element = document.getElementById('deviceInfo');
        element.innerHTML = 'Модель: '    + device.model    + '<br />' +
                            'Версия Cordova: '  + device.cordova  + '<br />' +
                            'Платформа: ' + device.platform + ' ' + device.version + '<br />' +
                            'UUID: '     + device.uuid     + '<br />'+
                            'Serial: '     + device.serial     + '<br />';
}

//---------------------------
// Login
//---------------------------
function loadValues() {
// Retrieve
    e_mail.value = window.localStorage.getItem("mail");
    uniquecode.value = window.localStorage.getItem("code");
        $(document).ready(function() {
        M.updateTextFields();
        });
}
        function ajax_post() {
            // Create our XMLHttpRequest object
            var hr = new XMLHttpRequest();
            // Create some variables we need to send to our PHP file
            var url = "http://xn--j1ac0b1a.xn--e1alhsoq4c.xn--p1ai/oa_app/app_start.php";
            var fn = document.getElementById("e_mail").value;
            var ln = document.getElementById("uniquecode").value;
                // Store
                window.localStorage.setItem("mail", fn);
                window.localStorage.setItem("code", ln);

            var vars = "email=" + fn + "&uniquecode=" + ln + "&model=" + device.model + "&version=" + device.version + "&uuid=" + device.uuid;
            hr.open("POST", url, true);
            // Set content type header information for sending url encoded variables in the request
            hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            // Access the onreadystatechange event for the XMLHttpRequest object
            hr.onreadystatechange = function () {
                if (hr.readyState == 4 && hr.status == 200) {
                    var return_data = hr.responseText;
                    if(return_data.search("ToVk") != -1){
                        login();
                    }else {
                        document.getElementById("status").innerHTML = return_data;
                    }
                }
            }
            // Send the data to PHP now... and wait for response to update the status div
            hr.send(vars); // Actually execute the request
            document.getElementById("status").innerHTML = 'Пожалуйста подождите...';
        }


function login() {
    $("#login-form").html('<iframe src="http://xn--j1ac0b1a.xn--e1alhsoq4c.xn--p1ai/oa_app/final.php" style="width: 100%;" frameborder="0"></iframe>');
    // $("#info-card").css( "display", "none" );
}