const server = "http://localhost:3000";

const pFileNames = document.querySelector(".files");
const sectionDragDrop = document.querySelector(".drag-drop");
const uploadButton = document.getElementById("upload-button");

function fileHandler(e) {
    e.preventDefault();

    console.log("Files dropped");

    pFileNames.innerHTML = "";

    if (e.dataTransfer.items) {
        [...e.dataTransfer.items].forEach((item) => {
            if (item.kind === "file") {
                const file = item.getAsFile();
                pFileNames.innerHTML += `${file.name}<br />`;
            }
        });
    } else {
        [...e.dataTransfer.files].forEach((file) => {
            pFileNames.innerHTML += `${file.name}<br />`;
        });
    }
}

async function downloadFile() {
    const data = await fetch(`${server}/files/download`, {
        method: "GET",
    });
}

function dragHandler(e) {
    e.preventDefault();
}