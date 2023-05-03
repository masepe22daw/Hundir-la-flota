const jugador = document.getElementById('jugador');
const maquina = document.getElementById('maquina');
const tableroJugador = [];
const tableroMaquina = [];

var barcoEnMano = null;

// Seleccionar la tabla y los contenedores de barco
const tabla = document.querySelector('.tablero');
const contenedoresBarco = document.querySelectorAll('.contenedor-barco');

// Agregar event listeners a los contenedores de barco
contenedoresBarco.forEach(contenedor => {
    contenedor.addEventListener('dragstart', dragStart);
    contenedor.addEventListener('dragend', dragEnd);
});



// Funciones de arrastrar el barco
function dragStart() {
    // Obtiene los datos del barco a través del atributo "data-barco" en el contenedor
    const barco = this.dataset.barco;

    // Crea un nuevo elemento de barco con las propiedades correspondientes
    const barcoArrastrado = document.createElement('div');
    barcoArrastrado.classList.add('barco'); // Agrega la clase "barco" al elemento
    barcoArrastrado.dataset.barco = barco;

    // Agrega el nuevo elemento de barco a la página
    document.body.appendChild(barcoArrastrado);

    // Agrega la clase "dragging" para marcar que el elemento está siendo arrastrado
    this.classList.add('dragging');
}



function dragEnd() {
    this.classList.remove('dragging');
}

// Funciones de soltar el barco en la tabla
function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add('barco');
}

function dragLeave(e) {
    const celda = e.target;
    celda.classList.remove('barco');
}


function drop(e) {
    e.preventDefault();
    const barcoArrastrado = document.querySelector('.dragging');
    console.log(barcoArrastrado); // imprimir el elemento arrastrado
    const tabla = e.target;
    tabla.appendChild(barcoArrastrado);
    barcoArrastrado.classList.remove('dragging');
    const celda = e.target;
    celda.classList.remove('over');
    tabla.classList.add('over');

    // Agrega la clase "barco" al elemento arrastrado para visualizarlo en la tabla
    barcoArrastrado.classList.add('barco');
}

function crearTablero(id, tamano, jugador) {
    const tabla = document.createElement('table');
    tabla.classList.add('tablero');
    const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const filaLetras = document.createElement('tr');
    filaLetras.appendChild(document.createElement('th'));
    for (let i = 0; i < tamano; i++) {
        const th = document.createElement('th');
        th.textContent = letras[i];
        filaLetras.appendChild(th);
    }
    tabla.appendChild(filaLetras);
    for (let i = 0; i < tamano; i++) {
        const fila = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = i + 1;
        fila.appendChild(th);
        for (let j = 0; j < tamano; j++) {
            const celda = document.createElement('td');
            celda.dataset.jugador = jugador;
            celda.dataset.x = i.toString();
            celda.dataset.y = j.toString();
            celda.addEventListener('dragover', dragOver);
            celda.addEventListener('dragenter', dragEnter);
            celda.addEventListener('dragleave', dragLeave);
            celda.addEventListener('drop', drop);
            celda.addEventListener('dragleave', dragLeave);

            fila.appendChild(celda);
            if (jugador === 'jugador') {
                tableroJugador[i] = tableroJugador[i] || new Array(tamano);
                tableroJugador[i][j] = { barco: false, disparado: false, div: celda };
            } else {
                tableroMaquina[i] = tableroMaquina[i] || [];
                tableroMaquina[i][j] = { barco: false, disparado: false, div: celda };
            }
        }

        tabla.appendChild(fila);
    }
    const contenedor = document.getElementById(id);
    contenedor.appendChild(tabla);

}

function crearBarcos() {
    const barcos = [];
    // Primer barco
    const barco1 = {
        nombre: 'barco1',
        size: 1,
        divs: []
    };
    const randomRow = Math.floor(Math.random() * tableroMaquina.length);
    const randomCol = Math.floor(Math.random() * tableroMaquina.length);
    barco1.divs.push(tableroMaquina[randomRow][randomCol].div);
    // Segundo barco
    const barco2 = {
        nombre: 'barco2',
        size: 2,
        divs: []
    };
    let randomRow2, randomCol2;
    do {
        randomRow2 = Math.floor(Math.random() * tableroMaquina.length);
        randomCol2 = Math.floor(Math.random() * (tableroMaquina.length - 1));
    } while (tableroMaquina[randomRow2][randomCol2].barco || tableroMaquina[randomRow2][randomCol2 + 1].barco);
    for (let i = 0; i < barco2.size; i++) {
        const div = tableroMaquina[randomRow2][randomCol2 + i].div;
        barco2.divs.push(div);
        tableroMaquina[randomRow2][randomCol2 + i] = { barco: true, disparado: false, div: div };
    }
    // Tercer barco
    const barco3 = {
        nombre: 'barco3',
        size: 3,
        divs: []
    };
    let randomRow3, randomCol3;
    do {
        randomRow3 = Math.floor(Math.random() * (tableroMaquina.length - 2));
        randomCol3 = Math.floor(Math.random() * tableroMaquina.length);
    } while (tableroMaquina[randomRow3][randomCol3].barco || tableroMaquina[randomRow3 + 1][randomCol3].barco || tableroMaquina[randomRow3 + 2][randomCol3].barco);
    for (let i = 0; i < barco3.size; i++) {
        const div = tableroMaquina[randomRow3 + i][randomCol3].div;
        barco3.divs.push(div);
        tableroMaquina[randomRow3 + i][randomCol3] = { barco: true, disparado: false, div: div };
    }

    // Tercer barco
    const barco4 = {
        nombre: 'barco4',
        size: 4,
        divs: []
    };
    let randomRow4, randomCol4;
    do {
        randomRow4 = Math.floor(Math.random() * (tableroMaquina.length - 3));
        randomCol4 = Math.floor(Math.random() * tableroMaquina.length);
    } while (tableroMaquina[randomRow4][randomCol4].barco || tableroMaquina[randomRow4 + 1][randomCol4].barco || tableroMaquina[randomRow4 + 2][randomCol4].barco);
    for (let i = 0; i < barco4.size; i++) {
        const div = tableroMaquina[randomRow4 + i][randomCol4].div;
        barco4.divs.push(div);
        tableroMaquina[randomRow4 + i][randomCol4] = { barco: true, disparado: false, div: div };
    }
    // Agregar los barcos al arreglo de barcos
    barcos.push(barco1);
    barcos.push(barco2);
    barcos.push(barco3);
    barcos.push(barco4);
    return barcos;
}

function colocarBarcosMaquina() {
    crearBarcos().forEach(barco => {
        barco.divs.forEach(div => {
            div.classList.add('barco');
            div.dataset.barco = barco.nombre;
        });
    });
}

function colocarBarco(x, y, size, direccion, jugador) {
    const barco = { size, direccion, divs: [] };
    const tabla = jugador === 'jugador' ? tableroJugador : tableroMaquina;
    if (direccion === 'vertical') {
        for (let i = 0; i < size; i++) {
            const celda = tabla[x + i][y].div;
            celda.classList.add('barco');
            celda.dataset.barco = barco;
            barco.divs.push(celda);
            tabla[x + i][y].barco = barco;
        }
    } else {
        for (let i = 0; i < size; i++) {
            const celda = tabla[x][y + i].div;
            celda.classList.add('barco');
            celda.dataset.barco = barco;
            barco.divs.push(celda);
            tabla[x][y + i].barco = barco;
        }
    }
}
