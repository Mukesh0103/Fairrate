var menuList = document.getElementById("menuList");

function toggleMenu() {
    if (getComputedStyle(menuList).display === "none") {
        menuList.style.display = "block";
    }
    else {
        menuList.style.display = "none";
    }
}

var onScrollShadow = document.getElementById("header");
window.onscroll = function () {
    if (window.scrollY >= 100) {
        onScrollShadow.classList.add("scroll-shadow");
    } else {
        onScrollShadow.classList.remove("scroll-shadow");
    }
}