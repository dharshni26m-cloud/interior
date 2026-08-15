// ==============================
// SHOW / HIDE PASSWORD
// ==============================

const password = document.getElementById("password");
const eyeIcon = document.querySelector(".eye-icon");

if (password && eyeIcon) {

    eyeIcon.addEventListener("click", function () {

        if (password.type === "password") {

            password.type = "text";

            eyeIcon.classList.remove("fa-eye");
            eyeIcon.classList.add("fa-eye-slash");

        } else {

            password.type = "password";

            eyeIcon.classList.remove("fa-eye-slash");
            eyeIcon.classList.add("fa-eye");

        }

    });

}


// ==============================
// LOGIN FORM VALIDATION
// ==============================

const form = document.querySelector("form");

if (form) {

    form.addEventListener("submit", function (event) {

        const email = document.querySelector('input[type="email"]');
        const password = document.getElementById("password");

        // Check Empty Email
        if (email.value.trim() === "") {

            alert("Please enter your email address.");
            email.focus();

            event.preventDefault();
            return;

        }

        // Email Validation

        const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value)) {

            alert("Please enter a valid email address.");
            email.focus();

            event.preventDefault();
            return;

        }

        // Check Empty Password

        if (password.value.trim() === "") {

            alert("Please enter your password.");
            password.focus();

            event.preventDefault();
            return;

        }

    });

}