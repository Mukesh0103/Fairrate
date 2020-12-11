var screen1 = document.getElementById("screen1");
var screen2 = document.getElementById("screen2");
var screen3 = document.getElementById("screen3");
function changeScreen(screen) {
    if (screen == "screen1") {
        screen1.style.display = "block";
        screen2.style.display = "none";
        screen3.style.display = "none";
        document.getElementById("home").classList.add("active");
        document.getElementById("application").classList.remove("active");
        document.getElementById("documents").classList.remove("active");
    } else if (screen == "screen2") {
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

var tab1 = document.getElementById("tab-1");
var tab2 = document.getElementById("tab-2");
tab1.addEventListener('click', function () {
    tab1.classList.add("active");
    tab2.classList.remove("active");
})
tab2.addEventListener('click', function () {
    tab1.classList.remove("active");
    tab2.classList.add("active");
});

// drag and drop 

var dropArea = document.getElementById("dropbox");

dropArea.addEventListener('dragover', function (e) {
    e.preventDefault();
    dropArea.classList.add("dragover");
})
dropArea.addEventListener('dragleave', function () {
    dropArea.classList.remove("dragover");
})
dropArea.addEventListener('drop', function (e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    var fileName = file.name;
    var fileType = file.type;
    var fileSize = file.size;
    dropArea.classList.remove("dragover");
    if (fileType == "image/png" || fileType == "image/jpg" || fileType == "application/pdf") {
        document.getElementById("file-name").innerText = fileName;
        if (fileType == "image/png") {
            document.getElementById("file-type").innerHTML = "PNG";
        } else if (fileType == "image/jpg") {
            document.getElementById("file-type").innerHTML = "JPG";
        } else if (fileType == "application/pdf") {
            document.getElementById("file-type").innerHTML = "PDF";
        }
        document.getElementById("file-size").innerHTML = fileSize;
    } else {
        document.getElementById("invalid-text").innerHTML = "Invalid File Format";
        document.getElementById("invalid-text").style.color = "red";
        dropArea.classList.add("invalid");
        return false;
    }
})




