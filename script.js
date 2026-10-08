/* =========================================================
   STUDIO NORTH
   SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const header = document.getElementById("header");
    const menuButton = document.getElementById("menuButton");
    const nav = document.getElementById("nav");


    /* =====================================================
       HEADER AO ROLAR
    ===================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    function openMenu() {

        if (!nav || !menuButton) return;

        nav.classList.add("active");
        menuButton.classList.add("active");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        menuButton.setAttribute(
            "aria-label",
            "Fechar menu"
        );

        document.body.classList.add("menu-open");
    }


    function closeMenu() {

        if (!nav || !menuButton) return;

        nav.classList.remove("active");
        menuButton.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Abrir menu"
        );

        document.body.classList.remove("menu-open");
    }


    function toggleMenu() {

        if (!nav) return;

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


        /* Fechar ao clicar em um link */

        nav.querySelectorAll("a").forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            }
        );


        /* Fechar ao clicar fora */

        document.addEventListener(
            "click",
            (event) => {

                const clickedInsideNav =
                    nav.contains(event.target);

                const clickedMenuButton =
                    menuButton.contains(event.target);

                if (
                    !clickedInsideNav &&
                    !clickedMenuButton &&
                    nav.classList.contains("active")
                ) {

                    closeMenu();

                }

            }
        );


        /* Fechar com ESC */

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
       FECHAR MENU AO VOLTAR PARA DESKTOP
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800 &&
                nav &&
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
    ).forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const id =
                        link.getAttribute("href");

                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(id);

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

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

        }
    );


    /* =====================================================
       ANO AUTOMÁTICO
    ===================================================== */

    const copyright =
        document.getElementById("copyright");

    if (copyright) {

        copyright.textContent =
            `© ${new Date().getFullYear()} Studio North`;

    }


    /* =====================================================
       ANIMAÇÃO DOS ELEMENTOS
    ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".feature, .training-card"
        );


    if (
        "IntersectionObserver" in window &&
        animatedElements.length > 0
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observerInstance.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(
            (element) => {

                observer.observe(element);

            }
        );

    } else {

        animatedElements.forEach(
            (element) => {

                element.classList.add("visible");

            }
        );

    }


    /* =====================================================
       PROTEÇÃO CONTRA CLIQUES DUPLOS NO MENU
    ===================================================== */

    let lastMenuClick = 0;

    if (menuButton) {

        menuButton.addEventListener(
            "click",
            () => {

                const now = Date.now();

                if (
                    now - lastMenuClick < 250
                ) {
                    return;
                }

                lastMenuClick = now;

            }
        );

    }


    /* =====================================================
       ANIMAÇÃO INICIAL DO HERO
    ===================================================== */

    const heroCopy =
        document.querySelector(".hero-copy");

    if (heroCopy) {

        heroCopy.style.opacity = "0";
        heroCopy.style.transform = "translateY(20px)";

        requestAnimationFrame(() => {

            heroCopy.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

            heroCopy.style.opacity = "1";
            heroCopy.style.transform = "translateY(0)";

        });

    }

});
