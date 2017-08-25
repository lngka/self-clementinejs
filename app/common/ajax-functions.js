"use strict";
/* eslint-disable no-unused-vars*/
const appUrl = window.location.origin;
const ajaxFunctions = {
    "ready": ready,
    "ajaxRequest": ajaxRequest
};
/* eslint-enable no-unused-vars*/
/*
* function fn needs to be run once the DOM finnished loading
* @params {function} fn - function to be run
*/
function ready(fn) {
    if (typeof fn !=="function")
        return;

    if (document.readyState === "complete")
        return fn();

    document.addEventListener("DOMContentLoaded", fn, false);
}

/*
* callback function needs to be run with server"s response
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
    };
    // XMLHttpRequest.open(method, url, async)
    xmlHTTP.open(method, url, true);
    xmlHTTP.send();
}
