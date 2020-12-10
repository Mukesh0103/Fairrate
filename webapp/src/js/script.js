var screen1 = document.getElementById("screen1");
var screen2 = document.getElementById("screen2");
var screen3 = document.getElementById("screen3");
function changeScreen(screen) {
    if (screen === "screen1") {
        screen1.style.display = "block";
        screen2.style.display = "none";
        screen3.style.display = "none";
        document.getElementById("home").classList.add("active");
        document.getElementById("application").classList.remove("active");
        document.getElementById("documents").classList.remove("active");
    } else if (screen === "screen2") {
        screen1.style.display = "none";
        screen2.style.display = "block";
        screen3.style.display = "none";
        document.getElementById("application").classList.add("active");
        document.getElementById("home").classList.remove("active");
        document.getElementById("documents").classList.remove("active");
    } else {
        screen1.style.display = "none";
        screen2.style.display = "none";
        screen3.style.display = "block";
        document.getElementById("documents").classList.add("active");
        document.getElementById("home").classList.remove("active");
        document.getElementById("application").classList.remove("active");
    }

}


var selectDropdown = document.getElementById("select-dropdown");
var selectBox = document.getElementById("select-box");
var selectInput = document.getElementById("select-input");
selectInput.addEventListener('click', function () {
    selectDropdown.classList.toggle("show");
})

window.addEventListener('click', function (e) {
    if (!selectBox.contains(e.target)) {
        selectDropdown.classList.remove("show");
    }
});

var dropdownList = document.getElementsByClassName("dropdown-list");
for (var i = 0; i < dropdownList.length; i++) {
    var current = dropdownList[i];
    current.addEventListener('click', function () {
        selectInput.innerHTML = event.target.innerHTML;
        selectDropdown.classList.remove("show");
    });
}