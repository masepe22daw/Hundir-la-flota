//drag-and-drop.js
import {tableroJugador,tableroMaquina} from './tablero.js'

const barcos = JSON.parse(localStorage.getItem('barcos'));


const tabla = document.querySelector('.tablero');
const contenedoresBarco = document.querySelectorAll('.barco');


contenedoresBarco.forEach(contenedor => {
    contenedor.addEventListener('dragstart', dragStart);
    contenedor.addEventListener('dragend', dragEnd);
});


// Funciones de arrastrar el barco
export function dragStart() {
    this.classList.add('dragging');
}

export function dragEnd() {
    this.classList.remove('dragging');
}


export function dragOver(e) {
    e.preventDefault();
}

export function dragEnter(e) {
    e.preventDefault();

    this.classList.add('barco');
}



export function dragLeave(e) {
    const celda = e.target;
    celda.classList.remove('barco');
}

export function drop(e) {
    e.preventDefault();
    const barcoArrastrado = document.querySelector('.dragging');
    const tabla = e.target.closest('.tablero');
    const celda = e.target;
    const x = parseInt(celda.dataset.x);
    const y = parseInt(celda.dataset.y);
    const jugador = celda.dataset.jugador;
    const barco = barcos.find(b => b.nombre === barcoArrastrado.dataset.barco);
    const tamano = barco.size;
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
            celda.dataset.size = tamano;
            celda.dataset.direction = direccion;

        }
        // Eliminar la clase "dragging
        barcoArrastrado.classList.remove('dragging');
    }
}

