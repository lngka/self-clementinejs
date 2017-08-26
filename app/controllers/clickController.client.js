"use strict";

(function(){
    var clickNum    = document.querySelector("#click-num");
    var addButton   = document.querySelector(".btn-add");
    var resetButton = document.querySelector(".btn-reset");
    /* eslint-disable no-undef*/
    var apiURL = appUrl + "/api/:id/clicks";
    /* eslint-enable no-undef*/


    /*
    * call this to update the number of clicks from database
    * @param {object} data returned from the server, is actually XMLHttpRequest.response
    */
    function updateClicksCount(data) {
        clickNum.innerHTML = data.clicks;
    }

    // show user the number of clicks at page load
    /* eslint-disable no-undef*/
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
