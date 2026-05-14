document.addEventListener("DOMContentLoaded", function () {
  
    const header = document.getElementById('main-header');
    const main_container = document.getElementById('main-container');

    // recupero estado de "abierto" o "cerrado" de la pagina
    const state = localStorage.getItem('pageState');

    if(state === 'open'){
        // al recargar la pagina, pregunto si antes estaba "abierta"
        // en ese caso, recargo la pagina ya abierta
        header.classList.add('small-header');
        main_container.classList.add('expand');
    }

    openPage();
    closePage();

    //newComment();
    //loadComments();

    var section1 = document.getElementById('first-section');
    var section2 = document.getElementById('second-section');
    var section3 = document.getElementById('thirth-section');
    var section4 = document.getElementById('fourth-section');
    var section5 = document.getElementById('fifth-section');

    var informacion = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem qui alias, id quae autem aliquam adipisci quaerat possimus voluptates praesentium veritatis nihil vero cum perspiciatis culpa nostrum quos fuga. Excepturi.";
    
    // insertando article en la seccion soft skills
    addPresentationArticle(section1, 'Article 1', './img/card.png', informacion);
    addPresentationArticle(section1, 'Article 2', './img/card.png', informacion);
    addPresentationArticle(section1, 'Article 3', './img/card.png', informacion);
    addPresentationArticle(section1, 'Article 4', './img/card.png', informacion);

    // insertando archivos en la seccion education
    addEducationArticle(section2, './img/diploma.png', 'E.E.M N° 5 María Eva Duarte de Perón', 'Economía y gestión de las organizaciones');
    addEducationArticle(section2, './img/diploma.png', 'E.E.M N° 5 María Eva Duarte de Perón', 'Asistente de programación');
    addEducationArticle(section2, './img/diploma.png', 'Universidad Nacional Arturo Jauretche', 'Ingeniería en informática');

    // insertando articulos en la seccion dev skills
    addDevArticle(section3, './img/html.png', 'HTML 5');
    addDevArticle(section3, './img/css.png', 'CSS 3');
    addDevArticle(section3, './img/javascript.png', 'JavaScript');
    addDevArticle(section3, './img/jquery.png', 'JQuery');
    addDevArticle(section3, './img/java.png', 'Java');

    // insertando articulos en la seccion 3
    addSkillArticle(section4, 'Article 1', './img/card.png', informacion);
    addSkillArticle(section4, 'Article 2', './img/card.png', informacion);
    addSkillArticle(section4, 'Article 3', './img/card.png', informacion);
    addSkillArticle(section4, 'Article 4', './img/card.png', informacion);

    // insertando articulos en la seccion de proyectos
    var links = {info: './pages/warning.html', page: 'https://matiasbartoluche.github.io/profile/', github: 'https://github.com/MatiasBartoluche/profile'};
    var keyworlds = "<p class='keys'>Keyworlds: </p>"+"<p class='html'>HTML</p>"+"<p class='css'>CSS</p>"+"<p class='javascript'>JavaScript</p>";

    addProyectArticle(section5, './img/default-proyect.jpg', 'Proyect 1', informacion, links, keyworlds);
});

function openPage(){
  let open = document.getElementById('open-page');
  const header = document.getElementById('main-header');
  const main_container = document.getElementById('main-container');

  open.addEventListener('click', function(){
    header.classList.add('small-header');
    main_container.classList.add('expand');
    // elimina estado inicial
    document.documentElement.classList.add('page-open');
    //guardar estado "abierto" de la pagina
    localStorage.setItem('pageState', 'open');
  });
}

function closePage(){
  let close = document.getElementById('close-page');
  const header = document.getElementById('main-header');
  const main_container = document.getElementById('main-container');

  close.addEventListener('click', function(){
    header.classList.remove('small-header');
    main_container.classList.remove('expand');
    // elimina estado inicial
    document.documentElement.classList.remove('page-open');
    //guardar estado "cerrado" de la pagina
    localStorage.setItem('pageState', 'closed');
  });
}

// funcion que captura datos del formulario y lo inserta en la pagina
function newComment(){
    document.getElementById('btn-comment-main').addEventListener('click', function () {
        var newName = document.getElementById('nombre').value;
        var newJob = document.getElementById('ocupacion').value;
        var newDate = new Date().toLocaleString();
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
                                                '<p>'+newDate+'</p>'+
                                            "</div>"+
                                            "<p class='text-comment'>"+newComment+"</p>"+
                                        "</div>"
                                      "</div>";

        document.getElementById("nombre").value = "";
        document.getElementById("ocupacion").value = "";
        document.getElementById("new-comment-main").value = "";

        // llamado a la funcion que guarda el comentario en la base de datos
        saveSupabase(newName, newJob, newComment);
    });
}

// guardar el comentario en la base de datos
async function saveSupabase(name, job, comment){
    const supabaseUrl = 'https://gigpjajbicqqmlntqiog.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpZ3BqYWpiaWNxcW1sbnRxaW9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1ODI0MjcsImV4cCI6MjA3NDE1ODQyN30.0g3yfVhnjiKMAAO9_gRcjvOSc0gzisp6GmQvzk1-fUc';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

    if (!comment) return;

    const { error } = await supabase.from("main-comment").insert([
      {name: name, job: job, comment: comment }
    ]);

    if (error) {
      console.error(error);
    }
}

// Función para mostrar comentarios
async function loadComments() {
    const supabaseUrl = 'https://gigpjajbicqqmlntqiog.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpZ3BqYWpiaWNxcW1sbnRxaW9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1ODI0MjcsImV4cCI6MjA3NDE1ODQyN30.0g3yfVhnjiKMAAO9_gRcjvOSc0gzisp6GmQvzk1-fUc';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)
    const commentContainer = document.getElementById('comments-main');

    const { data, error } = await supabase
        .from("main-comment")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      if(data == 0){
        // no hay coemntarios
        commentContainer.innerHTML += "<div class='comment'>"+
                                            "<h2>No hay comentarios</h2>"+
                                        "</div>"
      }
      else{
        // variable que controlan si el comentario es par
        var par = false;
        // variable que inserta una class al comentario segun si es par o impar
        var clase = "impar";

        data.forEach(comment => {
          //obtengo la fecha y hora del comentario en formato texto
          const fechaOriginal = comment.created_at;
          // convierto el texto en Date
          const fecha = new Date(fechaOriginal);
          // obtengo la fecha
          const fechaTexto = fecha.toLocaleDateString("es-AR");
          //obtengo la hora
          const horaTexto = fecha.toLocaleTimeString("es-AR", {hour:"2-digit",
                                                              minute:"2-digit",
                                                              hour12: false});
          const fechaFinal = fechaTexto+" at "+horaTexto;

          if(par){
            clase = "par";
            par = false;
          }
          else{
            clase = "impar";
            par = true;
          }

          commentContainer.innerHTML += "<div class='comment "+clase+"'>"+
                                          "<img src='./img/generic-user.png'>"+
                                          "<div class='content'>"+
                                              "<div class='user-info'>"+
                                                  "<p>Nombre: "+comment.name+"</p>"+
                                                  "<p>Ocupacion: "+comment.job+"</p>"+
                                                  '<p>'+fechaFinal+'</p>'+
                                              "</div>"+
                                              "<p class='text-comment'>"+comment.comment+"</p>"+
                                          "</div>"
                                        "</div>";
        });
      }
}

// funcion que inserta articulos de soft skills
// container = contenedor donde se va a insertar el articulo
// title = String - tilulo del articulo
// image = String - ruta del archivo de imagen (debe introducirse en formato texto)
// info = String - informacion del articulo
function addPresentationArticle(container, title, image, info){
  var contenedor = container;

  contenedor.innerHTML += "<article class='card-article glow-circle glow-orange'>"+
                            "<h2>"+title+"</h2>"+
                            "<div class='info-container'>"+
                                "<img src='"+image+"'>"+
                                "<p>"+info+"</p>"+
                            "</div>"+
                          "</article>"
}

// funcion que inserta articulos de education
// container = contenedor donde se va a insertar el articulo
//title = String - tituli del articulo
// image = String - ruta del archivo imagen
// info = String - informacion del articulo
function addEducationArticle(container, image, title, info){
  var contenedor = container;

  contenedor.innerHTML += "<article class='card-article education-article glow-circle glow-blue'>"+
                            "<h2>"+title+"</h2>"+
                            "<div class='info-container'>"+
                                "<img src='"+image+"'>"+
                                "<h3>"+info+"</h3>"+
                            "</div>"+
                          "</article>";
}

// funcion que inserta articulos de programacion
// container = contenedor donse se va a instalar el articulo
// image = String - ruta de la imagen del articulo
// title = String - titulo del articulo
function addDevArticle(container, image, title){
  var contenedor = container;

  contenedor.innerHTML += "<article class='card-article dev-article glow-circle glow-sky'>"+
                            "<img src="+image+">"+
                            "<p>"+title+"</p>"+
                          "</article>";
}

// funcion que inserta articulos de soft skills
// container = contenedor donde se va a insertar el articulo
// title = String - tilulo del articulo
// image = String - ruta del archivo de imagen (debe introducirse en formato texto)
// info = String - informacion del articulo
function addSkillArticle(container, title, image, info){
  var contenedor = container;

  contenedor.innerHTML += "<article class='card-article glow-circle glow-green'>"+
                            "<h2>"+title+"</h2>"+
                            "<div class='info-container'>"+
                                "<img src='"+image+"'>"+
                                "<p>"+info+"</p>"+
                            "</div>"+
                          "</article>"
}

// funcion que inserta articulos de proyectos
// container = contenedor donde se insertaran los articulos
// image = String - ruta del archivo de imagen
// title = String - titulo del articulo
// description = String - descripcion del articulo
// links = object - objeto que consta de tres atributos string, links para botones
function addProyectArticle(container, image, title, description, links, keyworlds){
  var contenedor = container;

  contenedor.innerHTML += "<article class='card-proyect glow-circle glow-rainbow'>"+
                              "<div class='img-content'>"+
                                  "<img src='"+image+"'>"+
                              "</div>"+
                              "<h2>"+title+"</h2>"+
                              "<p>"+description+"</p>"+
                              "<div class='keyworlds'>"+keyworlds+"</div>"+

                              "<div class='proyect-buttons'>"+
                                  "<a class='custom-button light-button' href='"+links.info+"'>"+
                                      "<img src='./img/details-white.png'>"+
                                      "<p>Details</p>"+
                                  "</a>"+
                        
                                  "<a class='custom-button light-button' href='"+links.page+"'>"+
                                      "<img src='./img/internet-white.png'>"+
                                      "<p>Visit page</p>"+
                                  "</a>"+
                                  
                                  "<a class='custom-button light-button' href='"+links.github+"'>"+
                                      "<img src='./img/github.png'>"+
                                      "<p>Github</p>"+
                                  "</a>"+
                              "</div>"+
                          "</article>";
}