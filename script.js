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
    const nav = document.querySelector(".nav");

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

    window.addEventListener("scroll", updateHeader);
    updateHeader();


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("active");

            menuButton.classList.toggle("active", isOpen);

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        /* Fecha ao clicar em um link */

        nav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");
                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* Fecha ao clicar fora */

        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                nav.contains(event.target);

            const clickedButton =
                menuButton.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedButton &&
                nav.classList.contains("active")
            ) {

                nav.classList.remove("active");
                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =====================================================
       FECHA MENU AO AUMENTAR A TELA
    ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 800 && nav && menuButton) {

            nav.classList.remove("active");
            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =====================================================
       ESC FECHA O MENU
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (nav && menuButton) {

                nav.classList.remove("active");
                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    });


    /* =====================================================
       ANIMAÇÕES AO ENTRAR NA TELA
    ===================================================== */

    const animatedElements = document.querySelectorAll(
        ".feature-card, " +
        ".training-card, " +
        ".intro-content, " +
        ".section-heading, " +
        ".cta-content"
    );


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observerInstance.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        animatedElements.forEach((element) => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    } else {

        animatedElements.forEach((element) => {

            element.classList.add("show");

        });

    }


    /* =====================================================
       ANIMAÇÃO DOS LINKS INTERNOS
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       ANO AUTOMÁTICO DO FOOTER
    ===================================================== */

    const footerText = document.querySelector(
        ".footer-bottom span"
    );

    if (footerText) {

        footerText.textContent =
            `© ${new Date().getFullYear()} Studio North. Todos os direitos reservados.`;

    }


    /* =====================================================
       ACESSIBILIDADE DO MENU
    ===================================================== */

    if (menuButton) {

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    /* =====================================================
       PROTEÇÃO CONTRA ERROS
    ===================================================== */

    window.addEventListener("error", (event) => {

        console.warn(
            "Studio North:",
            event.message
        );

    });

});
