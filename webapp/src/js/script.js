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
inputFile.addEventListener('change', fileInputHandler)
dropArea.addEventListener('dragover', dragOver)
dropArea.addEventListener('dragleave', dragLeave)
dropArea.addEventListener('drop', fileDropHandler)

function dragOver(e) {
    e.preventDefault();
    dropArea.classList.add("dragover");
}
function dragLeave() {
    dropArea.classList.remove("dragover");
}

function fileInputHandler(e) {
    processFiles(e.target.files);
}

function fileDropHandler(e) {
    e.preventDefault();
    processFiles(e.dataTransfer.files);
}

function processFiles(file) {
    for (var i = 0; i < file.length; i++) {
        var fileName = file[i].name;
        var fileType = file[i].type;
        var fileSize = file[i].size;
        if (fileSize < 5242880) {
            var fileSizeConversion = new Array(' B', ' KB', ' MB');
            x = 0;
            while (fileSize > 1024) {
                fileSize /= 1024; x++;
            }
            var exactSize = (Math.round(fileSize * 100) / 100) + fileSizeConversion[x];
            if (fileType == "image/png" || fileType == "image/jpg" || fileType == "application/pdf") {
                if (fileType == "image/png") {
                    fileType = "PNG";
                    fileIcon = '<svg class="icon"><use href="/webapp/dist/images/sprite.svg#img-icon" /></svg>'
                } else if (fileType == "image/jpg") {
                    fileType = "JPG";
                    fileIcon = '<svg class="icon"><use href="/webapp/dist/images/sprite.svg#img-icon" /></svg>'
                } else if (fileType == "application/pdf") {
                    fileType = "PDF";
                    fileIcon = '<svg class="icon"><use href="/webapp/dist/images/sprite.svg#pdf-icon" /></svg>'
                }
            }
            else {
                dropArea.classList.add("invalid");
            }
            outputFileDetails(fileName, exactSize, fileType, fileIcon);
            dropArea.classList.remove("dragover");
        }
        else {
            document.getElementById("invalid-text").innerHTML = "File is too large to upload!";
            document.getElementById("invalid-text").style.color = "red";
            dropArea.classList.add("invalid");
        }
    }
}

function outputFileDetails(name, size, type, icon) {
    var createFileRow = document.createElement('tr');
    createFileRow.setAttribute('class', 'uploaded-files__list');
    createFileRow.setAttribute('id', 'fileRow');
    createFileRow.innerHTML = '<td class="file-details pl-2">' +
        '<figure class="file-icon mr-1" id="file-icon">' + icon + '</figure>' +
        '<p class="file-name" id="file-name">' + name + '</p></td>' +
        '<td class="file-details" id="file-type">' + type + '</td>' +
        '<td class="file-details" id="file-size">' + size + '</td>' +
        '<td class="file-details">UPLOADED</td>' +
        '<td class="file-details">' +
        '<button class="btn del-icon" id="del-icon" onclick="deleteItem()">' +
        '<svg class="icon">' +
        '<use href="/webapp/dist/images/sprite.svg#delete" />' +
        '</svg>' +
        '</button>' +
        '</td>';
    document.getElementById("fileListTable").appendChild(createFileRow);
}

function deleteItem() {
    document.getElementById('fileRow').remove();
}
