const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const confirmPassword = document.getElementById("confirmPassword");
const signupButton = document.getElementById("signupButton");


// ================================
// CREATE ACCOUNT
// ================================

signupButton.addEventListener("click", function () {

    const name = signupName.value.trim();
    const email = signupEmail.value.trim().toLowerCase();
    const password = signupPassword.value;
    const confirm = confirmPassword.value;


    // NAME

    if (name === "") {

        alert("Please enter your full name.");

        signupName.focus();

        return;
    }


    // EMAIL

    if (email === "") {

        alert("Please enter your email address.");

        signupEmail.focus();

        return;
    }


    // EMAIL CHECK

    if (!email.includes("@") || !email.includes(".")) {

        alert("Please enter a valid email address.");

        signupEmail.focus();

        return;
    }


    // PASSWORD

    if (password === "") {

        alert("Please create a password.");

        signupPassword.focus();

        return;
    }


    if (password.length < 6) {

        alert("Password must be at least 6 characters.");

        signupPassword.focus();

        return;
    }


    // CONFIRM PASSWORD

    if (confirm === "") {

        alert("Please confirm your password.");

        confirmPassword.focus();

        return;
    }


    // PASSWORD MATCH

    if (password !== confirm) {

        alert("Passwords do not match.");

        confirmPassword.focus();

        return;
    }

// ================================
// CREATE ACCOUNT USING BACKEND API
// ================================

try {

    signupButton.disabled = true;
    signupButton.textContent = "Creating Account...";

    const response = await fetch(
        "http://localhost:5000/api/signup",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {

        alert(
            data.message ||
            "Signup failed. Please try again."
        );

        return;
    }


    // Save only non-sensitive user information
    localStorage.setItem(
        "nexoraUser",
        JSON.stringify(data.user)
    );


    // SUCCESS

    alert(
        "Account created successfully! 🎉\n\n" +
        "Welcome to NEXORA, " +
        data.user.name +
        "!"
    );


    // GO TO LOGIN

    window.location.href = "login.html";


} catch (error) {

    console.error(
        "Signup API Error:",
        error
    );

    alert(
        "Unable to connect to NEXORA server.\n\n" +
        "Please make sure the backend is running."
    );

} finally {

    signupButton.disabled = false;
    signupButton.textContent = "Create Account";

}

});


// ================================
// ENTER KEY
// ================================

confirmPassword.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            signupButton.click();

        }

    }
);