class PresentationCardComponent extends HTMLElement{
    connectedCallback(){
        var title = this.getAttribute('title');
        var image = this.getAttribute('image');
        var description = this.getAttribute('description');

        this.innerHTML = "<article class='card-article glow-circle glow-orange'>"+
                            "<h2>"+title+"</h2>"+
                            "<div class='info-container'>"+
                                "<img src='"+image+"'>"+
                                "<p>"+description+"</p>"+
                            "</div>"+
                          "</article>";

    }
}

customElements.define("presentation-card", PresentationCardComponent);