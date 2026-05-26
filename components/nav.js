class NavComponent extends HTMLElement{
    connectedCallback(){
        const page = this.getAttribute('page');
        var construir_menu ='';
        var menu ='';

        // detectar de que pagina se usara el componente
        if(page === 'index'){
            menu = [
                {text:'Sobre mí', href:'#first-section'},
                {text:'Formación académica', href:'#first-section'},
                {text:'Tecnologías', href:'#second-section'},
                {text:'Habilidades', href:'#thirth-section'},
                {text:'Proyectos', href:'#fourth-section'},
                {text:'Comentarios', href:'#fifth-section'}
            ]
        }
        else{
            menu = [ {text:'', href:''} ]
        }

        // convierto el objeto a texto para insertarlo en la pagina
        menu.forEach(item => {
            //console.log(`${item.text} - ${item.href}`);
            construir_menu = construir_menu + '<li>'+
                                                    '<a href="'+item.href+'"> '+item.text+' </a>'+
                                                '</li>'
        });

        // inserto el texto en la pagina
        this.innerHTML ='<ul>'+construir_menu+'</ul>';
    }
}

customElements.define("nav-component", NavComponent);