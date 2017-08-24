"use strict";
const ajaxFunctions = require("../common/ajax-function.js");

(function(){
    var clickNum    = document.querySelector("#click-num");
    var addButton   = document.querySelector(".btn-add");
    var resetButton = document.querySelector(".btn-reset");
    var apiURL      = "http://localhost:8080/api/clicks";


    /*
    * call this to update the number of clicks from database
    * @param {object} data returned from the server, is actually XMLHttpRequest.response
    */
    function updateClicksCount(data) {
        var dataObj = JSON.parse(data);
        clickNum.innerHTML = dataObj.clicks;
    }

    // show user the number of clicks at page load
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest("GET", apiURL, updateClicksCount));

    // server is configured to send the data AFTER it was updated with POST
    // so updateClicksCount can be called directly from ajaxRequest
    addButton.addEventListener("click", function() {
        ajaxFunctions.ajaxRequest("POST", apiURL, updateClicksCount);
    });

    // server does not send any data back with DELETE request
    resetButton.addEventListener("click", function() {
        ajaxFunctions.ajaxRequest("DELETE", apiURL, function() {
            ajaxFunctions.ajaxRequest("GET", apiURL, updateClicksCount);
        });
    });
})();
