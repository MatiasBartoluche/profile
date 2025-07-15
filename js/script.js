document.addEventListener("DOMContentLoaded", function () {

    animatedHeader();
});

function animatedHeader(){
    const header = document.getElementById('main-header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function(){
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if(scrollTop === 0){
            header.classList.remove('animated-header');
            scrollController();
        }
        else if(scrollTop > lastScrollTop){
            header.classList.add('animated-header');
        }
        lastScrollTop = scrollTop;
    });
}

// controla que el primer scroll mueva solo 1px, luego se desplaza con normalidad
// esto evita que el #main-container se muestre inicialmente por debajo del nav
function scrollController(){
    //let hasDoneInitialScroll = false; // controla si se ha hecho scroll por primera vez
    window.addEventListener("wheel", function (e) {
        const atTop = window.scrollY === 0; // scroll = 0 para no scroll o para volver arriba de la pagina
        const scrollingDown = e.deltaY > 0; // controla la altura del scroll

        if (atTop && scrollingDown) {
            e.preventDefault(); // evitar el scroll natural
            window.scrollTo({
                top: 1,
                behavior: "smooth"
            });
            //hasDoneInitialScroll = true;
        }
    }, { passive: false });
}