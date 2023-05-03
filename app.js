const jugador = document.getElementById('jugador');
const maquina = document.getElementById('maquina');
const tableroJugador = [];
const tableroMaquina = [];
const barcos = [];


const barco1 = {
    nombre: 'barco1',
    size: 1,
    divs: []
};


const barco2 = {
    nombre: 'barco2',
    size: 2,
    divs: []
};


const barco3 = {
    nombre: 'barco3',
    size: 3,
    divs: []
};


const barco4 = {
    nombre: 'barco4',
    size: 4,
    divs: []
};

barcos.push(barco1, barco2, barco3, barco4);


var barcoEnMano = null;

// Seleccionar la tabla y los contenedores de barco
const tabla = document.querySelector('.tablero');
const contenedoresBarco = document.querySelectorAll('.barco');

// Agregar event listeners a los contenedores de barco
contenedoresBarco.forEach(contenedor => {
    contenedor.addEventListener('dragstart', dragStart);
    contenedor.addEventListener('dragend', dragEnd);
});


// Funciones de arrastrar el barco
function dragStart() {
    this.classList.add('dragging');
}

function dragEnd() {
    this.classList.remove('dragging');
}


function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    
    this.classList.add('barco');
    this.dataset.barco = this.id; 
  }
  


function dragLeave(e) {
    const celda = e.target;
    celda.classList.remove('barco');
}


function drop(e) {
    e.preventDefault();
    const barcoArrastrado = document.querySelector('.dragging');
    const tabla = e.target.closest('.tablero');
    const celda = e.target;
    const x = parseInt(celda.dataset.x);
    const y = parseInt(celda.dataset.y);
    const jugador = celda.dataset.jugador;
    const barco = barcos.find(b => b.nombre === barcoArrastrado.dataset.barco);
    const tamano = barco.tamano;
    const direccion = barcoArrastrado.dataset.direccion || 'horizontal';

    // Verificar que el barco cabe en la posición
    let puedeColocar = true;
    for (let i = 0; i < tamano; i++) {
        let fila = x;
        let columna = y;
        if (direccion === 'vertical') {
            fila += i;
        } else {
            columna += i;
        }
        if (fila >= tableroJugador.length || columna >= tableroJugador[0].length) {
            console.log("El barco está fuera del tablero")
            puedeColocar = false;
            break;
        }
        if (jugador === 'jugador' && tableroJugador[fila][columna].barco) {
            console.log("Hay otro barco en la posición")
            puedeColocar = false;
            break;
        }
        if (jugador === 'maquina' && tableroMaquina[fila][columna].barco) {
            console.log("Hay otro barco en la posición")
            puedeColocar = false;
            break;
        }
    }

    if (puedeColocar) {
        for (let i = 0; i < tamano; i++) {
            let fila = x;
            let columna = y;
            if (direccion === 'vertical') {
                fila += i;
            } else {
                columna += i;
            }
            const celda = tabla.querySelector(`[data-jugador="${jugador}"][data-x="${fila}"][data-y="${columna}"]`);
            celda.classList.add('barco');
            celda.dataset.barco = barcoArrastrado.dataset.barco;
        }
        // Eliminar la clase "dragging
        barcoArrastrado.classList.remove('dragging');

        // Obtener el tamaño del barco arrastrado
        const tamanoBarco = parseInt(barcoArrastrado.dataset.tamano);

        // Obtener la celda en la que se soltó el barco
        const celdaInicial = e.target;
        const xInicial = parseInt(celdaInicial.dataset.x);
        const yInicial = parseInt(celdaInicial.dataset.y);

        // Obtener la orientación del barco (horizontal o vertical)
        const orientacion = barcoArrastrado.dataset.orientacion;

        // Aplicar la clase "barco" y el atributo "data-barco" a las celdas correspondientes
        for (let i = 0; i < tamanoBarco; i++) {
            const celda = (orientacion === 'horizontal') ? tablero[xInicial][yInicial + i] : tablero[xInicial + i][yInicial];
            celda.div.classList.add('barco');
            celda.div.dataset.barco = barco.dataset.nombre;

        }
    }
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
    // Primer barco
    const barco5 = {
        nombre: 'barco5',
        size: 1,
        divs: []
    };
    const randomRow = Math.floor(Math.random() * tableroMaquina.length);
    const randomCol = Math.floor(Math.random() * tableroMaquina.length);
    barco5.divs.push(tableroMaquina[randomRow][randomCol].div);

    // Segundo barco
    const barco6 = {
        nombre: 'barco6',
        size: 2,
        divs: []
    };
    let randomRow2, randomCol2;
    do {
        randomRow2 = Math.floor(Math.random() * tableroMaquina.length);
        randomCol2 = Math.floor(Math.random() * (tableroMaquina.length - 1));
    } while (tableroMaquina[randomRow2][randomCol2].barco || tableroMaquina[randomRow2][randomCol2 + 1].barco);
    for (let i = 0; i < barco6.size; i++) {
        const div = tableroMaquina[randomRow2][randomCol2 + i].div;
        barco6.divs.push(div);
        tableroMaquina[randomRow2][randomCol2 + i] = { barco: true, disparado: false, div: div };
    }
    // Tercer barco
    const barco7 = {
        nombre: 'barco7',
        size: 3,
        divs: []
    };
    let randomRow3, randomCol3;
    do {
        randomRow3 = Math.floor(Math.random() * (tableroMaquina.length - 2));
        randomCol3 = Math.floor(Math.random() * tableroMaquina.length);
    } while (tableroMaquina[randomRow3][randomCol3].barco || tableroMaquina[randomRow3 + 1][randomCol3].barco || tableroMaquina[randomRow3 + 2][randomCol3].barco);
    for (let i = 0; i < barco7.size; i++) {
        const div = tableroMaquina[randomRow3 + i][randomCol3].div;
        barco7.divs.push(div);
        tableroMaquina[randomRow3 + i][randomCol3] = { barco: true, disparado: false, div: div };
    }

    // Tercer barco
    const barco8 = {
        nombre: 'barco8',
        size: 4,
        divs: []
    };

    let randomRow4, randomCol4;
    do {
        randomRow4 = Math.floor(Math.random() * (tableroMaquina.length - 3));
        randomCol4 = Math.floor(Math.random() * tableroMaquina.length);
    } while (tableroMaquina[randomRow4][randomCol4].barco || tableroMaquina[randomRow4 + 1][randomCol4].barco || tableroMaquina[randomRow4 + 2][randomCol4].barco);
    for (let i = 0; i < barco8.size; i++) {
        const div = tableroMaquina[randomRow4 + i][randomCol4].div;
        barco8.divs.push(div);
        tableroMaquina[randomRow4 + i][randomCol4] = { barco: true, disparado: false, div: div };
    }
    // Agregar los barcos al arreglo de barcos
    barcos.push(barco5);
    barcos.push(barco6);
    barcos.push(barco7);
    barcos.push(barco8);
    console.log(barcos);
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