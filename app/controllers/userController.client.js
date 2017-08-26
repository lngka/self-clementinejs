"use strict";
(function() {
    // this script applies to two .html files, some DOM elements might not exist depends on which .html run this script
    const profileId       = document.querySelector("#profile-id") || null;
    const profileUsername = document.querySelector("#profile-username") || null;
    const profileRepos    = document.querySelector("#profile-repos") || null;
    const displayName     = document.querySelector("#display-name");

    // cuz we don't want to write the callback for ajax request all the time
    function updateHtmlElement (element, data, dataProperty) {
        if (element) {
            console.log(data);
            console.log(typeof data);
            console.log(data[displayName]);
            element.innerHTML = data[dataProperty];
        }
    }

    /*eslint-disable no-undef *///appUrl defined by ajax-functions.js
    const apiUrl = appUrl + "/api/:id";
    /*eslint-enable no-undef */

    /*eslint-disable no-undef *///ajaxFunctions defined by ajax-functions.js
    ajaxFunctions.ready(function() {
        ajaxFunctions.ajaxRequest("GET",apiUrl, function(response) {
            updateHtmlElement(displayName, response, "displayName");
            updateHtmlElement(profileId, response, "id");
            updateHtmlElement(profileUsername, response, "username");
            updateHtmlElement(profileRepos, response, "publicRepos");
        });
    });
    /*eslint-enable no-undef */


})();
