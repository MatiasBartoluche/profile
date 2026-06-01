class DevArticleComponent extends HTMLElement{
    connectedCallback(){
        var image = this.getAttribute('image');
        var title = this.getAttribute('title');

        this.innerHTML ="<img src="+image+">"+
                        "<p>"+title+"</p>";
    }
}

customElements.define('dev-article', DevArticleComponent);