// Constants

const server = `https://localhost:3000`;
const currentPage = window.location.pathname.split("/").pop();

// Functions

const checkIfLoggedIn = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
        window.location.replace("login.html");
        return;
    }

    const response = await fetch(`${server}/users/check`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            mode: "cors",
            cache: "default",
        },
    });

    const data = await response.json();

    if (data.error) {
        alert(data.message);
        logout();
        return;
    }

    return !!data.error;
};

const login = async (email, password) => {
    const response = await fetch(`${server}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        mode: "cors",
        cache: "default",
    });

    const data = await response.json();

    if (data.error) {
        alert(data.message);
        return;
    }

    sessionStorage.setItem("username", email);
    sessionStorage.setItem("token", data.token);
    window.location.replace("dashboard.html");
};

const signup = async (email, username, password) => {
    const response = await fetch(`${server}/users/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
        mode: "cors",
        cache: "default",
    });

    const data = await response.json();

    if (data.error) {
        alert(data.message);
        return;
    }

    sessionStorage.setItem("username", username);
    sessionStorage.setItem("token", data.token);
    window.location.replace("dashboard.html");
};

const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    window.location.replace("login.html");
}

const resetPassword = (email) => {};

// Page related

const loadPage = async () => {
    const fileList = await list();
    const tableBody = document.querySelector("tbody.table-border-bottom-0");

    tableBody.innerHTML = "";

    fileList.forEach((fileName, i) => {
        tableBody.innerHTML += `
        <tr>
            <td>${fileName}</td>
            <td>
                <button class="btn btn-download btn-success" type="button"><i class="bx bx-download"></i></button>
                <button class="btn btn-remove btn-danger" type="button"><i class="bx bx-trash"></i></button>
            </td>
        </tr>
        `;
    });

    const downloadButtons = document.querySelectorAll(".btn-download");
    const removeButtons = document.querySelectorAll(".btn-remove");

    downloadButtons.forEach((downloadButton) => {
        downloadButton.addEventListener("click", async () => {
            const fileName = downloadButton.parentElement.parentElement.querySelector("td").innerText;
            await download(fileName);
        });
    });

    removeButtons.forEach((removeButton) => {
        removeButton.addEventListener("click", async () => {
            const fileName = removeButton.parentElement.parentElement.querySelector("td").innerText;
            await remove(fileName);
            await loadPage();
        });
    });
};

// File related

const list = async () => {
    const response = await fetch(`${server}/files`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
    });

    const data = await response.json();

    if (data.error) {
        alert(data.message);
        return;
    }

    return data.fileNames;
};

const upload = async (files) => {
    for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);

        const response = await fetch(`${server}/files/upload`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: formData,
        });

        const data = await response.json();
    
        if (data.error) {
            alert(data.message);
            return;
        }
    }
};

const download = async (fileName) => {
    fetch(`${server}/files/download`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({ fileName }),
    }).then(async (response) => {
        const blob = new Blob([await response.blob()], { type: "application/octet-stream" });
        const url= URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = fileName;

        link.click();
        window.URL.revokeObjectURL(url);
    }).catch((error) => {
        alert(error.message);
        return;
    });
};

const remove = async (fileName) => {
    const response = await fetch(`${server}/files/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({ fileName }),
    });

    const data = await response.json();
    
    if (data.error) {
        alert(data.message);
        return;
    }

    alert(data.message);
};

// Main

if (currentPage !== "dashboard.html") {
    const authForm = document.getElementById("formAuthentication");
    
    authForm.addEventListener("submit", async (event) => {
        event.preventDefault();
    
        const email = document.getElementById("email")?.value;
        const username = document.getElementById("username")?.value;
        const password = document.getElementById("password")?.value;
    
        switch (currentPage) {
            case "login.html":
                await login(email, password);
                break;
            case "signup.html":
                await signup(email, username, password);
                break;
            case "forgot-password.html":
                resetPassword(email);
                break;
            default:
                break;
        }
    });
} else {
    if (checkIfLoggedIn()) {
        const layoutWrapper = document.querySelector(".layout-wrapper");
        const navbarNavRight = document.querySelector(".navbar-nav-right");
        
        layoutWrapper.style.display = "flex";
        navbarNavRight.innerHTML = `<span>Hey, <b>${sessionStorage.getItem("username")}</b> 👋</span>` + navbarNavRight.innerHTML;

        await loadPage();
        
        const uploadButton = document.getElementById("btn-upload");
        const logoutButton = document.querySelector(".logout");
    
        uploadButton.addEventListener("click", async () => {
            const fileInputMultiple = document.getElementById("formFileMultiple");
    
            await upload(fileInputMultiple.files);
            setTimeout(() => location.reload(), 2000);
        });
    
        logoutButton.addEventListener("click", () => {
            logout();
        });
    }

}