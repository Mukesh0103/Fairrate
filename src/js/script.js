var menuList = document.getElementById("menuList");

function toggleMenu() {
    if (getComputedStyle(menuList).display === "none") {
        menuList.style.display = "block";
    }
    else {
        menuList.style.display = "none";
    }
}