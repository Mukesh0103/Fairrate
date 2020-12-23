var dropdownBox = document.querySelectorAll(".dropdown-box");
var dropdownButton = document.querySelectorAll(".dropdown-button");
var selectInput = document.getElementById("select-input");
var dropdownList = document.getElementsByClassName("select-dropdown__list");

for (let i = 0; i < dropdownList.length; i++) {
    var current = dropdownList[i];
    current.addEventListener('click', function () {
        selectInput.innerHTML = event.target.innerHTML;
    });
}

for (let i = 0; i < dropdownButton.length; i++) {
    dropdownButton[i].addEventListener("click", function () {
        dropdownBox[i].classList.toggle("show");
    })
}