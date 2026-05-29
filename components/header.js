class HeaderComponent extends HTMLElement {

    connectedCallback() {
        //const page verifica si la pagina es index.html
        //const page = this.getAttribute('page');
        const name = 'Matías Bartoluche';
        const subtitle = 'Front-end / Back-end Developer';
        const resources =[
                {linkedin: '/img/linkedin.png'},
                {gmail: '/img/gmail.png'},
                {github: '/img/github.png'},
                {curriculum: '/docs/plantilla-curriculum-ejemplo.docx'},
                {portada: '/img/portada.png'},
                {arrow_up: '/img/double-arrow-up.png'},
                {arrow_down: '/img/double-arrow-down.png'}
            ];

        // si la pagina no es index, cambio las rutas
 /*       if(page !== 'index'){
            const resources =[
                    {linkedin: './img/linkedin.png'},
                    {mail: './img/gmail.png'},
                    {github: './img/github.png'},
                    {curriculum: './docs/plantilla-curriculum-ejemplo.docx'},
                    {portada: './img/portada.png'},
                    {arrow_up: './img/double-arrow-up.png'},
                    {arrow_down: './img/double-arrow-down.png'}
                ];
        }*/

        // HTML del header
        this.innerHTML = `
        
        <header id="main-header" class="header">
        
            <div class="header-inner">

                <div id="header-container" class="header-container">

                    <div class="title">
                        <h1>`+name+`</h1>
                        <h2>`+subtitle+`</h2>
                    </div>

                    <div class="contact-buttons">

                        <a href="https://www.linkedin.com/in/mat%C3%ADas-bartoluche-433982161/" 
                           target="_blank"
                           class="social-media-button light-button">

                            <img src="`+resources[0].linkedin+`">
                        </a>

                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=bartoluche.matias@gmail.com&su=Contacto%20desde%20mi%20sitio%20web%20Github" 
                           target="_blank"
                           class="social-media-button light-button">

                            <img src="`+resources[1].gmail+`">
                        </a>

                        <a href="https://github.com/MatiasBartoluche"
                           class="social-media-button light-button">

                            <img src="`+resources[2].github+`">
                        </a>

                        <a href="`+resources[3].curriculum+`">
                            <button id="cv" class="custom-button">
                                Descargar cv
                            </button>
                        </a>

                    </div>

                    <div class="image-header">
                        <img src="`+resources[4].portada+`">
                    </div>

                    <div id="trapecio-open" class="trapecio-wrapper glow-white-infinite">

                        <button id="open-page" class="open-page">
                            <img src="`+resources[5].arrow_up+`">
                        </button>

                    </div>

                </div>

                <div id="trapecio-close" class="trapecio-wrapper glow-white-infinite">

                    <button id="close-page" class="close-page">
                        <img src="`+resources[6].arrow_down+`">
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