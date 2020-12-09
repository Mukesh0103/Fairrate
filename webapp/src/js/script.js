var screen1 = document.getElementById("screen1");
var screen2 = document.getElementById("screen2");
var nextPage = document.getElementById("next-btn");
nextPage.addEventListener('click', function () {
    getComputedStyle(screen2).display === "none" ? (screen2.style.display = "block") && (screen1.style.display = "none") : (screen1.style.display = "block");
})


var selectDropdown = document.getElementById("select-dropdown");
var selectInput = document.getElementById("select-input");
selectInput.addEventListener('click', function () {
    selectDropdown.classList.toggle("show");
})

var dropdownList = document.getElementsByClassName("dropdown-list");
for (var i = 0; i < dropdownList.length; i++) {
    var current = dropdownList[i];
    current.addEventListener('click', function () {
        selectInput.innerHTML = event.target.innerHTML;
        selectDropdown.classList.remove("show");
    });
}

// var profileDetails = document.getElementById("screen2");
// var inputCheckbox = document.getElementsByClassName("checkbox-container");
// inputCheckbox.addEventListener('change', function(){
//     if(inputCheckbox.checked === true) {
//         profileDetails.classList.add("is-selected");
//     } else {
//         profileDetails.classList.remove("is-selected")   
//     }
// })
