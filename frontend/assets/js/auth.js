// Constants

const server = "http://localhost:3000";
const currentPage = window.location.pathname.split("/").pop();

// Functions

const login = async (email, password) => {
    const response = await fetch(`${server}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
    const response = await fetch(`${server}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
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

const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    window.location.replace("login.html");
}

const resetPassword = async (email) => {};

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
                await resetPassword(email);
                break;
            default:
                break;
        }
    });
}