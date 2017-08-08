'use strict';
(function(){
    var clickNum    = document.querySelector("#click-num");
    var addButton   = document.querySelector(".btn-add");
    var resetButton = document.querySelector(".btn-reset");
    var apiURL      = 'http://localhost:3000/api/clicks';

    /*
    * function fn needs to be run once the DOM finnished loading
    * @params {function} fn - function to be run
    */
    function ready(fn) {
        if (typeof fn !=='function')
            return;

        if (document.readyState === 'complete')
            return fn();

        document.addEventListener('DOMContentLoaded', fn, false);
    }

    /*
    * callback function needs to be run with server's response
    * @param {string} method - one of HTTP verbs
    * @param {string} url - the url to make request
    * @param {function} callback - the function
    */
    function ajaxRequest(method, url, callback) {
        var xmlHTTP = new XMLHttpRequest();
        xmlHTTP.onreadystatechange = function() {
            // XMLHttpRequest.DONE === 4
            if (xmlHTTP.readyState === 4 && xmlHTTP.status === 200) {
                callback(xmlHTTP.response);
            }
        }
        // XMLHttpRequest.open(method, url, async)
        xmlHTTP.open(method, url, true);
        xmlHTTP.send();
    }

    /*
    * call this to update the number of clicks from database
    * @param {object} data returned from the server, is actually XMLHttpRequest.response
    */
    function updateClicksCount(data) {
        var dataObj = JSON.parse(data);
        clickNum.innerHTML = dataObj.clicks;
    }

    // show user the number of clicks at page load
    ready(ajaxRequest('GET', apiURL, updateClicksCount));

    // server is configured to send the data AFTER it was updated with POST
    // so updateClicksCount can be called directly from ajaxRequest
    addButton.addEventListener('click', function(event) {
        ajaxRequest('POST', apiURL, updateClicksCount);
    });

    // server does not send any data back with DELETE request
    resetButton.addEventListener('click', function(event) {
        ajaxRequest('DELETE', apiURL, function() {
            ajaxRequest('GET', apiURL, updateClicksCount);
        });
    });
})();
