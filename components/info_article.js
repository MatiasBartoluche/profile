class InfoArticleComponent extends HTMLElement{
    connectedCallback(){
        var title = this.getAttribute('title');
        var bottom_color = this.getAttribute('color');
        var description = this.getAttribute('description');

        this.innerHTML ='<h1>'+title+'</h1>'+
                        '<div class="neon-bottom '+bottom_color+'"></div>'+
                        '<p>'+description+'</p>';
                
    }
}

customElements.define('info-article', InfoArticleComponent);