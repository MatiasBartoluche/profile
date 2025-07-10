document.addEventListener("DOMContentLoaded", function () {
    
    animatedHeader();
});

function animatedHeader(){
    console.log("animated header");
    const header = document.getElementById('main-header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function(){
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if(scrollTop === 0){
            console.log('removiendo clase');
            header.classList.remove('animated-header');
        }
        else if(scrollTop > lastScrollTop){
            console.log('agregando clase');
            header.classList.add('animated-header');
        }
        lastScrollTop = scrollTop;
    });
}