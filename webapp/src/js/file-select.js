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
        var fileIcon;
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
    createFileRow.innerHTML = '<td class="file-details pl-2">' +
        '<figure class="file-icon mr-1" id="file-icon">' + icon + '</figure>' +
        '<p class="file-name" id="file-name">' + name + '</p></td>' +
        '<td class="file-details" id="file-type">' + type + '</td>' +
        '<td class="file-details" id="file-size">' + size + '</td>' +
        '<td class="file-details">UPLOADED</td>' +
        '<td class="file-details">' +
        '<button class="btn del-icon tooltip pos-rel" id="del-icon" onclick="deleteItem(this)">' +
        '<svg class="icon">' +
        '<use href="/webapp/dist/images/sprite.svg#delete" />' +
        '</svg>' + '<span class="tooltiptext ta-center">Delete</span>' +
        '</button>' +
        '</td>';
    document.getElementById("fileListTable").appendChild(createFileRow);
}

function deleteItem(e) {
    document.getElementById('fileListTable').deleteRow(e.parentNode.parentNode.rowIndex);
}