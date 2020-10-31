"use strict"

// creating variables
var menu = document.getElementById("mobile-menu");
var openButton = document.getElementById("open-button");
var closeButton = document.getElementById("close-button");



function openNav() {
    menu.style.display = "block";
    openButton.style.display = "none";
    closeButton.style.display = "block";
}
function closeNav() {
    menu.style.display = "none";
    closeButton.style.display = "none";
    openButton.style.display = "block";
}
