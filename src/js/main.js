// Eventlisteners
window.addEventListener('load', getEducation);
window.addEventListener('load', getWork);
window.addEventListener('load', getWebsite);


// Variables
const edu = document.getElementById("eduDiv");
const work = document.getElementById("workDiv");
const webb = document.getElementById("webbDiv");


function getEducation() {
    eduDiv.innerHTML = '';
    // Call
    fetch('https://emmlan.se/src/api/education.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(edu => {
            eduDiv.innerHTML +=
            `<div class="edu">
            <h5> ${edu.education_name} </h5>
            <p class="name"> ${edu.university} </p>
            <p class="date"> ${edu.start_date} - ${edu.end_date} </p>
            </div>`;
        });
    })
}

// Get
function getWork() {
    workDiv.innerHTML = '';
    // Call
    fetch('https://emmlan.se/src/api/work.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(work => {
            workDiv.innerHTML +=
            `<div class="work">
            <h5>${work.title} </h5>
            <p class="name"> ${work.workplace} </p>
            <p class="date"> ${work.start_date} - ${work.end_date} </p>
            </div>`;
        });
    })
}

function getWebsite() {
    webbDiv.innerHTML = '';
    // Call
    fetch('https://emmlan.se/src/api/website.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(webb => {
            webbDiv.innerHTML +=
            `<div class="webb-project">
            <img alt="Bild på webbplats" src="img/${webb.img}.jpg">
            <h4>${webb.title} </h4>
            <p> ${webb.description} </p>
            <a href="${webb.url}" target="_blank">Besök webbplats</a>
            </div>`;
        });
    })
}
