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

    await fetch(data.url, data.options)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to download file');
          }
          return response.blob();
        })
        .then(blob => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.click();
        })
        .catch(error => {
          console.error('Error:', error);
        });
}

function dragHandler(e) {
    e.preventDefault();
}