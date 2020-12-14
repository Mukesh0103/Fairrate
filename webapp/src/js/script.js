var screen1 = document.getElementById("screen1");
var screen2 = document.getElementById("screen2");
var screen3 = document.getElementById("screen3");
var screen4 = document.getElementById("screen4");
function changeScreen(screen) {
    if (screen == "screen1") {
        screen1.style.display = "block";
        screen2.style.display = "none";
        screen3.style.display = "none";
        screen4.style.display = "none";
        document.getElementById("home").classList.add("active");
        document.getElementById("application").classList.remove("active");
        document.getElementById("documents").classList.remove("active");
    } else if (screen == "screen2") {
        screen1.style.display = "none";
        screen2.style.display = "block";
        screen3.style.display = "none";
        screen4.style.display = "none";
        document.getElementById("application").classList.add("active");
        document.getElementById("home").classList.remove("active");
        document.getElementById("documents").classList.remove("active");
    } else if (screen == "screen3") {
        screen1.style.display = "none";
        screen2.style.display = "none";
        screen3.style.display = "block";
        screen4.style.display = "none";
        document.getElementById("documents").classList.add("active");
        document.getElementById("home").classList.remove("active");
        document.getElementById("application").classList.remove("active");
    } else {
        screen1.style.display = "none";
        screen2.style.display = "none";
        screen3.style.display = "none";
        screen4.style.display = "block";
        document.getElementById("documents").classList.add("active");
        document.getElementById("home").classList.remove("active");
        document.getElementById("application").classList.remove("active");
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

var selectDropdown = document.getElementById("selectDropdownBox");
var Dropdown = document.getElementById("dropdownBox");
var selectBox = document.getElementById("select-box");
var selectInput = document.getElementById("select-input");

function openDropdown(value) {
    value === 'dropdown' ? Dropdown.classList.toggle("show") : selectDropdown.classList.toggle("show");
}

window.addEventListener('click', function (e) {
    if (!selectBox.contains(e.target)) {
        selectDropdown.classList.remove("show");
    }
});

var dropdownList = document.getElementsByClassName("select-dropdown__list");
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
var inputFile = document.getElementById("file");
var fileIcon = document.getElementById("file-icon");
inputFile.addEventListener('change', fileSelectHandler, false)
dropArea.addEventListener('dragover', dragOver, false)
dropArea.addEventListener('dragleave', dragLeave, false)
dropArea.addEventListener('drop', fileSelectHandler, false)

function dragOver(e) {
    e.preventDefault();
    dropArea.classList.add("dragover");
}
function dragLeave() {
    dropArea.classList.remove("dragover");
}

function fileSelectHandler(e) {
    e.preventDefault();

    var file = e.target.files || e.dataTransfer.files;
    var fileName = file[0].name;
    var fileType = file[0].type;
    var fileSize = file[0].size;
    console.log(fileName)
    console.log(fileSize)
    if (fileSize < 5242880) {
        var fileSizeConversion = new Array(' B', ' KB', ' MB')
        i = 0;
        while (fileSize > 1024) {
            fileSize /= 1024; i++;
        }
        var sizeInNumber = (Math.round(fileSize * 100) / 100);
        var exactSize = sizeInNumber + fileSizeConversion[i];
        document.getElementById("file-size").innerHTML = exactSize;
    } else {
        document.getElementById("invalid-text").innerHTML = "File is too large to upload!";
        document.getElementById("invalid-text").style.color = "red";
        dropArea.classList.add("invalid");
        return false;
    }

    if (fileType == "image/png" || fileType == "image/jpg") {
        fileIcon.innerHTML = '<svg class="icon"><use href="/webapp/dist/images/sprite.svg#img-icon" /></svg>'
    } else {
        fileIcon.innerHTML = '<svg class="icon"><use href="/webapp/dist/images/sprite.svg#pdf-icon" /></svg>'
    }
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
    }
    else {
        document.getElementById("invalid-text").innerHTML = "Invalid File Format";
        document.getElementById("invalid-text").style.color = "red";
        dropArea.classList.add("invalid");
        return false;
    }
}