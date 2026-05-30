class DevCardComponent extends HTMLElement{
    connectedCallback(){
        var image = this.getAttribute('image');
        var title = this.getAttribute('title');

        this.innerHTML =  "<article>"+
                            "<img src="+image+">"+
                            "<p>"+title+"</p>"+
                          "</article>";
    }
}

customElements.define('dev-card', DevCardComponent);