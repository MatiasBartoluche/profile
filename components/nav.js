class NavComponent extends HTMLElement{
    connectedCallback(){
        this.innerHTML =`
            <ul>
                <!-- cada link hace un desplazamiento interno a su seccion correspondiente -->
                <li> <a href="#first-section" id="option1">Sobre mí</a> </li>
                <li> <a href="#second-section">Formación académica</a> </li>
                <li> <a href="#thirth-section">Tecnologías</a> </li>
                <li> <a href="#fourth-section">Habilidades</a> </li>
                <li> <a href="#fifth-section">Proyectos</a> </li>
                <li> <a href="#comments-section">Comentarios</a> </li>
            </ul>
        `;
    }
}

customElements.define("nav-component", NavComponent);