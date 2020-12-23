var nextBtn = document.querySelectorAll(".next-btn");
var screens = document.querySelectorAll(".screens");
for (let i = 0; i < nextBtn.length; i++) {
    nextBtn[i].addEventListener('click', function () {
        screens[i + 1].classList.add("active-screen");
        screens[i].classList.remove("active-screen");
    });
}

var onScrollShadow = document.getElementById("header");
window.onscroll = function () {
    if (window.scrollY >= 100) {
        onScrollShadow.classList.add("scroll-shadow");
    } else {
        onScrollShadow.classList.remove("scroll-shadow");
    }
}