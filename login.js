const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginButton = document.getElementById("loginButton");


// ================================
// LOGIN
// ================================

loginButton.addEventListener("click", async function () {

    const email =
        loginEmail.value.trim().toLowerCase();

    const password =
        loginPassword.value;


    // ================================
    // VALIDATION
    // ================================

    if (email === "") {

        alert("Please enter your email address.");

        loginEmail.focus();

        return;
    }


    if (!email.includes("@") || !email.includes(".")) {

        alert("Please enter a valid email address.");

        loginEmail.focus();

        return;
    }


    if (password === "") {

        alert("Please enter your password.");

        loginPassword.focus();

        return;
    }


    // ================================
    // LOGIN BUTTON
    // ================================

    loginButton.disabled = true;

    loginButton.textContent =
        "Logging in...";


    try {

        // ================================
        // BACKEND LOGIN
        // ================================

        const response = await fetch(
            (window.location.hostname === "localhost" ||
             window.location.hostname === "127.0.0.1")
                ? "http://localhost:5000/api/login"
                : "https://nexora-o8wi.onrender.com/api/login",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        const data =
            await response.json();


        // ================================
        // LOGIN FAILED
        // ================================

        if (!response.ok || !data.success) {

            alert(
                data.message ||
                "Invalid email or password."
            );

            return;
        }


        // ================================
        // LOGIN SUCCESS
        // ================================

        const user =
            data.user;


        // Save login status

        localStorage.setItem(
            "nexoraLoggedIn",
            "true"
        );


        // Save USER ID

        localStorage.setItem(
            "nexoraUserId",
            user.id
        );


        // Save USER NAME

        localStorage.setItem(
            "nexoraUserName",
            user.name
        );


        // Save USER EMAIL

        localStorage.setItem(
            "nexoraUserEmail",
            user.email
        );


        // Also save user object

        localStorage.setItem(
            "nexoraUser",
            JSON.stringify(user)
        );


        alert(
            "Login successful! 🎉\n\n" +
            "Welcome back, " +
            user.name +
            "!"
        );


        // ================================
        // DASHBOARD
        // ================================

        window.location.href =
            "search.html";


    } catch (error) {

        console.error(
            "NEXORA Login Error:",
            error
        );


        alert(
            "Could not connect to NEXORA backend.\n\n" +
            "Please check your internet connection and try again."
        );


    } finally {

        loginButton.disabled = false;

        loginButton.textContent =
            "Login";

    }

});


// ================================
// ENTER KEY
// ================================

loginPassword.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            loginButton.click();

        }

    }
);