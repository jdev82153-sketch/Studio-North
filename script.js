/* =========================================================
   STUDIO NORTH
   SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("header");
    const menuButton = document.getElementById("menuButton");
    const nav = document.getElementById("nav");

    /* =====================================================
       HEADER AO ROLAR
    ===================================================== */

    function updateHeader() {

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    function openMenu() {

        nav.classList.add("active");
        menuButton.classList.add("active");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add("menu-open");

    }


    function closeMenu() {

        nav.classList.remove("active");
        menuButton.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");

    }


    function toggleMenu() {

        if (nav.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }

    }


    if (menuButton && nav) {

        menuButton.addEventListener(
            "click",
            toggleMenu
        );


        /* Fecha ao clicar nos links */

        nav.querySelectorAll("a").forEach((link) => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


        /* Fecha clicando fora */

        document.addEventListener(
            "click",
            (event) => {

                const clickedMenu =
                    nav.contains(event.target);

                const clickedButton =
                    menuButton.contains(event.target);

                if (
                    !clickedMenu &&
                    !clickedButton &&
                    nav.classList.contains("active")
                ) {

                    closeMenu();

                }

            }
        );


        /* ESC */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    nav.classList.contains("active")
                ) {

                    closeMenu();

                }

            }
        );

    }


    /* =====================================================
       FECHAR MENU AO REDIMENSIONAR
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800 &&
                nav.classList.contains("active")
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       SCROLL SUAVE
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const id =
                    link.getAttribute("href");

                if (!id || id === "#") {
                    return;
                }

                const target =
                    document.querySelector(id);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    header.offsetHeight;

                const position =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       ANO AUTOMÁTICO
    ===================================================== */

    const copyright =
        document.getElementById("copyright");

    if (copyright) {

        copyright.textContent =
            `© ${new Date().getFullYear()} Studio North`;

    }

});
