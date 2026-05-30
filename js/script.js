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

    //newComment();
    //loadComments();

    var section1 = document.getElementById('first-section');
    var section2 = document.getElementById('second-section');
    var section3 = document.getElementById('thirth-section');
    var section4 = document.getElementById('fourth-section');
    var section5 = document.getElementById('fifth-section');

    // insertando articulos en la seccion de proyectos
    var links_presentacion = {info: './pages/warning.html', page: 'https://matiasbartoluche.github.io/profile/', github: 'https://github.com/MatiasBartoluche/profile'};
    var keyworlds_presentacion = '<p class="keys">Keyworlds: </p>'+'<p class="html">HTML</p>'+'<p class="css">CSS</p>'+'<p class="javascript">JavaScript</p>';
    var info_presentacion = "Página en la que enlisto mis habilidades, conocimientos de tecnologías y proyectos y repositorios en los que he estado trabajando. El aspecto de la paginacambiará periodicamente para hacerla mas atractiva y estetica.";
    addProyectArticle(section5, './img/default-proyect.jpg', 'Página de presentación', info_presentacion, links_presentacion, keyworlds_presentacion);

    var links_fases_luna ={info:'./pages/warning.html', page:'https://matiasbartoluche.github.io/realidad-aumentada-jardin/', github:'https://github.com/MatiasBartoluche/realidad-aumentada-jardin'};
    var keyworlds_fases_luna = '<p class="keys">Keyworlds: </p>'+'<p class="html">HTML</p>'+'<p class="html">A-Frame</p>'+'<p class="css">CSS</p>'+'<p class="css">Bootstrap</p>'+'<p class="javascript">JavaScript</p>'+'<p class="javascript">AR-JS</p>'+'<p class="css">Respoinsive desing</p>';
    var info_fases_luna = 'Aplicacion web creada con el objetivo de ilustrar las fases de la luna de forma didactica. A través de dispositivos moviles, escanea imagenes determinadas y visualiza modelos 3D del sol, la tierra y la luna. Pensado para alumnos de nivel inicial.';
    addProyectArticle(section5, './img/fases-luna.png', 'Fases de la luna con realidad aumentada', info_fases_luna, links_fases_luna, keyworlds_fases_luna);

  });

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