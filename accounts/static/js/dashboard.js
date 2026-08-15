document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    const menuButton = document.querySelector(".mobile-menu-btn");
    const sidebar = document.querySelector(".sidebar");

    if (menuButton && sidebar) {

        menuButton.addEventListener("click", function () {

            sidebar.classList.toggle("show");

        });

    }


    /* =====================================================
       CLOSE SIDEBAR WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", function (event) {

        if (!sidebar || !menuButton) {
            return;
        }

        const clickedInsideSidebar =
            sidebar.contains(event.target);

        const clickedMenuButton =
            menuButton.contains(event.target);

        if (
            window.innerWidth <= 900 &&
            !clickedInsideSidebar &&
            !clickedMenuButton
        ) {

            sidebar.classList.remove("show");

        }

    });


    /* =====================================================
       CLOSE MOBILE SIDEBAR AFTER CLICKING MENU ITEM
    ===================================================== */

    const menuItems =
        document.querySelectorAll(".sidebar-menu .menu-item");

    menuItems.forEach(function (item) {

        item.addEventListener("click", function () {

            if (window.innerWidth <= 900) {

                sidebar.classList.remove("show");

            }

        });

    });


    /* =====================================================
       ACTIVE SIDEBAR MENU
    ===================================================== */

    const currentPath =
        window.location.pathname;

    menuItems.forEach(function (item) {

        const link =
            item.getAttribute("href");

        if (
            link &&
            link !== "#" &&
            link !== "" &&
            currentPath.includes(link)
        ) {

            menuItems.forEach(function (menu) {

                menu.classList.remove("active");

            });

            item.classList.add("active");

        }

    });


    /* =====================================================
       NOTIFICATION BUTTON
    ===================================================== */

    const notificationButton =
        document.querySelector(".notification-btn");

    const notificationDot =
        document.querySelector(".notification-dot");

    if (notificationButton) {

        notificationButton.addEventListener("click", function () {

            if (notificationDot) {

                notificationDot.style.display = "none";

            }

        });

    }


    /* =====================================================
       TOP PROFILE CLICK
    ===================================================== */

    const topProfile =
        document.querySelector(".top-profile");

    if (topProfile) {

        topProfile.addEventListener("click", function () {

            topProfile.classList.toggle("profile-open");

        });

    }


    /* =====================================================
       SEARCH BOX
    ===================================================== */

    const searchInput =
        document.querySelector(".search-box input");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchText =
                searchInput.value.toLowerCase().trim();

            const cards =
                document.querySelectorAll(
                    ".project-item, .designer-item"
                );

            cards.forEach(function (card) {

                const cardText =
                    card.textContent.toLowerCase();

                if (
                    searchText === "" ||
                    cardText.includes(searchText)
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }


    /* =====================================================
       QUICK ACTION CLICK
    ===================================================== */

    const quickActions =
        document.querySelectorAll(".quick-action");

    quickActions.forEach(function (action) {

        action.addEventListener("click", function () {

            const href =
                action.getAttribute("href");

            if (!href || href === "#") {

                return;

            }

        });

    });


    /* =====================================================
       WINDOW RESIZE
    ===================================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 900 && sidebar) {

            sidebar.classList.remove("show");

        }

    });

});