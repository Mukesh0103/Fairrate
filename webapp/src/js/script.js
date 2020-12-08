var screen1 = document.getElementById("screen1");
var screen2 = document.getElementById("screen2")
var screen3 = document.getElementById("screen3")
var nextPage = document.getElementById("next-btn");
nextPage.addEventListener('click', function() {
    if(getComputedStyle(screen2).display === "none") {
        screen2.style.display = "block";
        screen1.style.display = "none";
    }
})