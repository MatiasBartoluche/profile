class StandarArticleComponent extends HTMLElement{
    connectedCallback(){
        var title = this.getAttribute('title');
        var image = this.getAttribute('image');
        var description = this.getAttribute('description');

        this.innerHTML ="<h2>"+title+"</h2>"+
                        "<div class='info-container'>"+
                            "<img src='"+image+"'>"+
                            "<p>"+description+"</p>"+
                        "</div>";

    }
}

customElements.define("standar-article", StandarArticleComponent);