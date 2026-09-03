export function navbar() {
    let clickMenu = document.getElementById("menu");
    let navbarDisplay = document.getElementById("navbar");

    
    if (clickMenu && navbarDisplay) {
        clickMenu.addEventListener("click", function() {
            clickMenu.classList.toggle("change");
            navbarDisplay.classList.toggle("show"); 
        });

        const linksLista = document.querySelectorAll(".header__navbar-links a");
        linksLista.forEach(link => {
            link.addEventListener("click", () => {
                clickMenu.classList.remove("change");
                navbarDisplay.classList.remove("show");
            });
        });
    }

    
    const linksSmooth = document.querySelectorAll(".header__navbar-links a");
    
    linksSmooth.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // Evita o salto instantâneo do navegador
            
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Pega a posição da seção na página
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
                const startPosition = window.scrollY;
                const distance = targetPosition - startPosition;
                
                let startTime = null;
                const duration = 1000;
                
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    
                    window.scrollTo(0, run);
                    
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        });
    });

    
    const secoes = document.querySelectorAll("section[id]");
    const linksMenu = document.querySelectorAll(".header__navbar-links a");

    const opcoes = {
        root: null,
        rootMargin: "-30% 0px -50% 0px",
        threshold: 0
    };

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                const idSecao = entrada.target.getAttribute("id");

                linksMenu.forEach((link) => link.classList.remove("active"));
                
                const linkAtivo = document.querySelector(`.header__navbar-links a[href="#${idSecao}"]`);
                if (linkAtivo) {
                    linkAtivo.classList.add("active");
                }
            }
        });
    }, opcoes);

    secoes.forEach((secao) => observador.observe(secao));
}
