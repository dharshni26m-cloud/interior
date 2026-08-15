document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       NAVBAR SCROLL EFFECT
       ========================================= */

    const navbar = document.getElementById("mainNavbar");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });


    /* =========================================
       ACTIVE NAVIGATION
       ========================================= */

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

        });

    });


    /* =========================================
       MOBILE NAVBAR CLOSE
       ========================================= */

    const mobileLinks = document.querySelectorAll(
        ".navbar-nav .nav-link"
    );

    const navbarMenu = document.getElementById("navbarMenu");

    const navbarButton =
        document.querySelector(".navbar-toggler");


    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (navbarMenu.classList.contains("show")) {

                navbarButton.click();

            }

        });

    });


});