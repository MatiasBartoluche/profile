// conserva el estado del toggle switch al retroceder entre paginas
window.addEventListener('pageshow', function(){
    // obtener el id del switch
    var toggle = document.getElementById('toggle-dark');
    // Recupero el último valor del toggle
    var page_style = localStorage.getItem('style');
    // En caso de ser null, guardo 'dark'
    if(page_style === null){
        page_style = 'dark';
        localStorage.setItem('style', page_style);
    }
    // Restauro estado del toggle (AHORA SÍ SE EJECUTARÁ AL VOLVER)
    toggle.checked = page_style === 'dark';
    // Aplico estilos
    changeStyle(page_style);
});

document.addEventListener("DOMContentLoaded", function () {
    // obtener el id del switch
    var toggle = document.getElementById('toggle-dark');

    toggle.addEventListener('change', () => {
        const nuevoEstilo = toggle.checked ? 'dark' : 'white';
        localStorage.setItem('style', nuevoEstilo);
        changeStyle(nuevoEstilo);
    });

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
});

function changeStyle(style){
    if(style === 'dark'){
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    }
    else{
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
    }
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