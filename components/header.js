class HeaderComponent extends HTMLElement {

    connectedCallback() {

        // HTML del header
        this.innerHTML = `
        
        <header id="main-header" class="header">
        
            <div class="header-inner">

                <div id="header-container" class="header-container">

                    <div class="title">
                        <h1>Matías Bartoluche</h1>
                        <h2>Front-end / Back-end Developer</h2>
                    </div>

                    <div class="contact-buttons">

                        <a href="https://www.linkedin.com/in/mat%C3%ADas-bartoluche-433982161/" 
                           target="_blank"
                           class="social-media-button light-button">

                            <img src="/img/linkedin.png">
                        </a>

                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=bartoluche.matias@gmail.com&su=Contacto%20desde%20mi%20sitio%20web%20Github" 
                           target="_blank"
                           class="social-media-button light-button">

                            <img src="/img/gmail.png">
                        </a>

                        <a href="https://github.com/MatiasBartoluche"
                           class="social-media-button light-button">

                            <img src="/img/github.png">
                        </a>

                        <a href="/docs/plantilla-curriculum-ejemplo.docx">
                            <button id="cv" class="custom-button">
                                Descargar cv
                            </button>
                        </a>

                    </div>

                    <div class="image-header">
                        <img src="/img/portada.png">
                    </div>

                    <div id="trapecio-open" class="trapecio-wrapper glow-white-infinite">

                        <button id="open-page" class="open-page">
                            <img src="/img/double-arrow-up.png">
                        </button>

                    </div>

                </div>

                <div id="trapecio-close" class="trapecio-wrapper glow-white-infinite">

                    <button id="close-page" class="close-page">
                        <img src="/img/double-arrow-down.png">
                    </button>

                </div>

            </div>

        </header>`;

        // esperar a que el HTML exista
        const open_button = this.querySelector('#open-page');
        open_button.addEventListener('click', () => {
            //console.log('abrir');
            const header = document.getElementById('main-header');
            const main_container = document.getElementById('main-container');

            header.classList.add('small-header');
            main_container.classList.add('expand');
            // elimina estado inicial
            document.documentElement.classList.add('page-open');
            //guardar estado "abierto" de la pagina
            localStorage.setItem('pageState', 'open');
        });


        const close_button = this.querySelector('#close-page');
        close_button.addEventListener('click', () => {
            //console.log('cerrar');
            const header = document.getElementById('main-header');
            const main_container = document.getElementById('main-container');

            header.classList.remove('small-header');
            main_container.classList.remove('expand');
            // elimina estado inicial
            document.documentElement.classList.remove('page-open');
            //guardar estado "cerrado" de la pagina
            localStorage.setItem('pageState', 'closed');
        });
    }
}

customElements.define("header-component", HeaderComponent);