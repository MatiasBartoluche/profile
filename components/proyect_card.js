class ProyectCardComponent extends HTMLElement{
    connectedCallback(){
        var image = this.getAttribute('image');
        var title = this.getAttribute('title');
        var description = this.getAttribute('description');
        var keyworlds = this.getAttribute('keyworlds');
        var links = JSON.parse(this.getAttribute('links'));

        console.log(links);

        this.innerHTML =  
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
                        
                                  "<a class='custom-button light-button' href='"+links.page+"' target='_blank'>"+
                                      "<img src='./img/internet-white.png'>"+
                                      "<p>Visit page</p>"+
                                  "</a>"+
                                  
                                  "<a class='custom-button light-button' href='"+links.github+"' target='_blank'>"+
                                      "<img src='./img/github.png'>"+
                                      "<p>Github</p>"+
                                  "</a>"+
                              "</div>";
    }
}

customElements.define('proyect-card',ProyectCardComponent);