class NavComponent extends HTMLElement{
    connectedCallback(){
        var construir_menu ='';
        var links = JSON.parse(this.getAttribute('links'));

        if(links !== null){
            // recorro la lista json conla info de los item del menu y su href
            links.forEach((item, indice) => {
            // concatenar en la variable construir_menu cada etiqueta <li> que se construye
                construir_menu = construir_menu + '<li>'+
                                                    '<a href="'+item.link+'"> '+item.name+' </a>'+
                                                '</li>'
            });
        }

        // inserto el nav en la pagina
        this.innerHTML ='<ul>'+construir_menu+'</ul>';
    }
}

customElements.define("nav-component", NavComponent);