// ======================================
// DreamSpace AI - Register Validation
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    // Form
    const form = document.getElementById("registerForm");

    // Inputs
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    // Error Messages
    const fullNameError = document.getElementById("fullNameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");

    // ==============================
    // Show Error
    // ==============================

    function setError(input, errorElement, message) {
        errorElement.textContent = message;
        input.classList.add("error-input");
        input.classList.remove("success-input");
    }

    // ==============================
    // Show Success
    // ==============================

    function setSuccess(input, errorElement) {
        errorElement.textContent = "";
        input.classList.remove("error-input");
        input.classList.add("success-input");
    }

    // ==============================
    // Password Eye Icon
    // ==============================

    const eyeIcons = document.querySelectorAll(".eye-icon");

    eyeIcons.forEach(function (icon) {

        icon.addEventListener("click", function () {

            const input = icon.previousElementSibling;

            if (input.type === "password") {
                input.type = "text";
                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            } else {
                input.type = "password";
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            }

        });

    });

    // ==============================
    // Form Validation
    // ==============================

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        let isValid = true;

        // Full Name
        if (fullName.value.trim() === "") {
            setError(fullName, fullNameError, "Full Name is required.");
            isValid = false;
        } else {
            setSuccess(fullName, fullNameError);
        }

        // Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.value.trim() === "") {
            setError(email, emailError, "Email is required.");
            isValid = false;
        } else if (!emailPattern.test(email.value.trim())) {
            setError(email, emailError, "Enter a valid email.");
            isValid = false;
        } else {
            setSuccess(email, emailError);
        }

        // Phone
        const phonePattern = /^[0-9]{10}$/;

        if (phone.value.trim() === "") {
            setError(phone, phoneError, "Phone number is required.");
            isValid = false;
        } else if (!phonePattern.test(phone.value.trim())) {
            setError(phone, phoneError, "Phone number must contain exactly 10 digits.");
            isValid = false;
        } else {
            setSuccess(phone, phoneError);
        }

        // Password
        if (password.value.trim() === "") {
            setError(password, passwordError, "Password is required.");
            isValid = false;
        } else if (password.value.length < 8) {
            setError(password, passwordError, "Password must be at least 8 characters.");
            isValid = false;
        } else {
            setSuccess(password, passwordError);
        }

        // Confirm Password
        if (confirmPassword.value.trim() === "") {
            setError(confirmPassword, confirmPasswordError, "Confirm your password.");
            isValid = false;
        } else if (password.value !== confirmPassword.value) {
            setError(confirmPassword, confirmPasswordError, "Passwords do not match.");
            isValid = false;
        } else {
            setSuccess(confirmPassword, confirmPasswordError);
        }

        // ==============================
        // Submit Form
        // ==============================

        if (isValid) {
            form.submit();
        }

    });

});