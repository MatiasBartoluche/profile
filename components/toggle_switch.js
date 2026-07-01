class ToggleSwitch extends HTMLElement{
    connectedCallback(){

        var type_switch = this.getAttribute('type');

        console.log(type_switch);

        this.innerHTML = "<div class='dark-toggle'>"+
                            "<input type='checkbox' id='toggle-dark' class='offscreen'>"+
                            "<label for='toggle-dark' class='switch'>"+
                                "<svg class='sun-toggle' xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' fill='#1f1f1f'>"+
                                    "<path d='M451.5-771.5Q440-783 440-800v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80q0 17-11.5 28.5T480-760q-17 0-28.5-11.5ZM678-678q-11-11-11-27.5t11-28.5l56-57q12-12 28.5-12t28.5 12q11 11 11 28t-11 28l-57 57q-11 11-28 11t-28-11Zm122 238q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520h80q17 0 28.5 11.5T920-480q0 17-11.5 28.5T880-440h-80ZM451.5-51.5Q440-63 440-80v-80q0-17 11.5-28.5T480-200q17 0 28.5 11.5T520-160v80q0 17-11.5 28.5T480-40q-17 0-28.5-11.5ZM226-678l-57-56q-12-12-12-29t12-28q11-11 28-11t28 11l57 57q11 11 11 28t-11 28q-12 11-28 11t-28-11Zm508 509-56-57q-11-12-11-28.5t11-27.5q11-11 27.5-11t28.5 11l57 56q12 11 11.5 28T791-169q-12 12-29 12t-28-12ZM80-440q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h80q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440H80Zm89 271q-11-11-11-28t11-28l57-57q11-11 27.5-11t28.5 11q12 12 12 28.5T282-225l-56 56q-12 12-29 12t-28-12Zm141-141q-70-70-70-170t70-170q70-70 170-70t170 70q70 70 70 170t-70 170q-70 70-170 70t-170-70Z'/>"+
                                "</svg>"+
                                "<svg class='moon-toggle' xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' fill='#1f1f1f'>"+
                                    "<path d='M483-80q-84 0-157.5-32t-128-86.5Q143-253 111-326.5T79-484q0-124 68.5-225T331-857q14-5 29-3.5t25 9.5q8 7 12.5 19.5T402-799q2 79 32 150.5T520-521q56 56 128 86t151 32q21 0 32 3.5t18 11.5q8 10 10.5 26t-2.5 29q-46 115-148 184T483-80Zm89-588-64-64q-12-12-12-28t12-28l64-64q12-12 28-12t28 12l64 64q12 12 12 28t-12 28l-64 64q-12 12-28 12t-28-12Zm200 120-24-24q-12-12-12-28t12-28l24-24q12-12 28-12t28 12l24 24q12 12 12 28t-12 28l-24 24q-12 12-28 12t-28-12Z'/>"+
                                "</svg>"
                            "</label>"+
                        "</div>";

        var toggle = document.getElementById('toggle-dark');
        // recupero el ultimo valor del toggle
        var page_style = localStorage.getItem('style');
        // en caso de ser null, guardo 'dark' para inicializar la pagina en tema oscuro
        if(page_style === null){
            page_style = 'dark';
            localStorage.setItem('style', page_style);
        }
        // restauro estado del toggle
        toggle.checked = page_style === 'dark';
        // aplico estilos
        changeStyle(page_style);

        toggle.addEventListener('change', () => {
            const nuevoEstilo = toggle.checked ? 'dark' : 'white';
            localStorage.setItem('style', nuevoEstilo);
            changeStyle(nuevoEstilo);
        });

        function changeStyle(style){
        if(style === 'dark'){
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        }
        else{
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }
        }

    }
}

customElements.define('toggle-switch', ToggleSwitch);