// =========================================================
// STUDIO NORTH
// SCRIPT.JS
// =========================================================


// HEADER AO ROLAR
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// MENU MOBILE
const menuButton = document.getElementById("menuButton");
const nav = document.querySelector(".nav");

if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("active");
        menuButton.classList.toggle("active");

    });


    // Fecha o menu ao clicar em um link
    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");
            menuButton.classList.remove("active");

        });

    });

}


// ANIMAÇÃO SUAVE DOS ELEMENTOS
const animatedElements = document.querySelectorAll(
    ".feature-card, .training-card, .intro-content, .section-heading, .cta-content"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


animatedElements.forEach((element) => {

    element.classList.add("reveal");

    observer.observe(element);

});


// FECHA MENU SE A JANELA FICAR GRANDE
window.addEventListener("resize", () => {

    if (window.innerWidth > 800) {

        nav.classList.remove("active");
        menuButton.classList.remove("active");

    }

});
