document.addEventListener("DOMContentLoaded", function () {

    //animatedHeader();
    //controlarScroll();

    openPage();
    closePage();

    newComment();
});

function openPage(){
  let open = document.getElementById('open-page');
  const header = document.getElementById('main-header');
  const main_container = document.getElementById('main-container');

  open.addEventListener('click', function(){
    header.classList.add('animated-header');
    main_container.classList.add('animated-container');
  });
}

function closePage(){
  let close = document.getElementById('close-page');
  const header = document.getElementById('main-header');
  const main_container = document.getElementById('main-container');

  close.addEventListener('click', function(){
    header.classList.remove('animated-header');
    main_container.classList.remove('animated-container');
  });
}

function newComment(){
    document.getElementById('btn-comment-main').addEventListener('click', function () {
        var newName = document.getElementById('nombre').value;
        var newJob = document.getElementById('ocupacion').value;
        var newComment = document.getElementById('new-comment-main').value;

        console.log('nombre: '+newName);
        console.log('ocupacion: '+newJob);

        if(newName == ''){
            newName = 'Unnamed';
        }

        if(newJob == ''){
          newJob = 'Usuario';
        }

        if(newComment == ''){
          newComment = 'Sin comentarios';
        }

        const commentContainer = document.getElementById('comments-main');
        
        commentContainer.innerHTML += "<div class='comment'>"+
                                        "<img src='./img/generic-user.png'>"+
                                        "<div class='content'>"+
                                            "<div class='user-info'>"+
                                                "<p>Nombre: "+newName+"</p>"+
                                                "<p>Ocupacion: "+newJob+"</p>"+
                                                '<p>1/1/2025</p>'+
                                            "</div>"+
                                            "<p class='text-comment'>"+newComment+"</p>"+
                                        "</div>"
                                      "</div>";

        document.getElementById("nombre").value = "";
        document.getElementById("ocupacion").value = "";
        document.getElementById("new-comment-main").value = "";
    });
}

/*########################################################################################################*/

function animatedHeader(){
    const header = document.getElementById('main-header');
    const title = document.getElementById('title');
    const image_header = document.getElementById('image-header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function(){
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if(scrollTop === 0){
            header.classList.remove('animated-header');
            title.classList.remove('animated-title');
            image_header.classList.remove('animated-image-header');
            //scrollController();
        }
        else if(scrollTop > lastScrollTop){
            header.classList.add('animated-header');
            title.classList.add('animated-header');
            image_header.classList.add('animated-header');
            
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
        const scrollingDown = e.deltaY === 0; // controla la altura del scroll

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

function controlarScroll(){
 let firstDownHandled = false; // primera vez que el usuario baja desde el top: ir exactamente a 1px
  let allowZero = false;        // tras frenar en 1, permitir 0 en el próximo intento hacia arriba

  // --- BLOQUEO PREVIO AL SCROLL NATIVO (wheel) ---
  window.addEventListener('wheel', (e) => {
    const y = window.scrollY;
    console.log(y);

    // 1) Primer gesto hacia abajo estando arriba del todo -> moverse EXACTAMENTE a 1px
    if (!firstDownHandled && y <= 0 && e.deltaY > 0) {
      e.preventDefault();                    // cortar el scroll nativo
      firstDownHandled = true;
      window.scrollTo({ top: 1, behavior: 'auto' }); // salto instantáneo (evita overshoot)
      return;
    }

    // 2) Cerca del top y el usuario quiere seguir subiendo
    if (y <= 100 && e.deltaY < 0) {
      if (!allowZero) {
        // Primer intento: freno en 1 y marco que el próximo sí puede llegar a 0
        e.preventDefault();
        window.scrollTo({ top: 1, behavior: 'auto' });
        allowZero = true;
        return;
      }
      // Segundo intento consecutivo hacia arriba: lo dejamos llegar a 0 (no tocamos nada)
    }

    // 3) Si el usuario baja, reseteamos para que la próxima subida vuelva a frenar en 1 primero
    if (e.deltaY > 0 && y > 5) {
      allowZero = false;
    }
  }, { passive: false }); // IMPORTANTE: passive:false para poder usar preventDefault()

  // --- SCROLL: sólo para mantener el estado prolijo, no forzamos posiciones acá ---
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    // Si llegamos a 0, ya consumimos ese "permiso"; volver a bloquear en la próxima subida
    if (y === 0) {
      allowZero = false;
    }
  }, { passive: true });


    // Solo aplicar el scroll suave y bloqueo al link con id=option1
    const linkEspecial = document.getElementById('option1');
    if (linkEspecial) {
        linkEspecial.addEventListener('click', function (e) {
            e.preventDefault();
            bloqueoSuperior = true; // activar bloqueo solo en este caso

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop + 1,
                    behavior: 'smooth'
                });

                // Después de un tiempo, desactivar bloqueo para permitir scroll normal
                setTimeout(() => {
                    bloqueoSuperior = false;
                }, 1000); // 1 segundo aprox. ajustable
            }
        });
    }
}