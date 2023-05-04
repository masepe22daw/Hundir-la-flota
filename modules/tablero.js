//tablero.js
import { dragOver, dragEnter, dragLeave, drop } from './drag-and-drop.js'

export const tableroJugador = [];
export const tableroMaquina = [];
const barcos = [];

//sintaxis de objeto JS basada en prototipado para definir métodos y atributos en las celdas del tablero
export function crearTablero(id, tamano, jugador) {
    const tabla = document.createElement('tabla');
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
            celda.addEventListener('click', seleccionarCasilla);



            fila.appendChild(celda);
            if (jugador === 'jugador') {
                tableroJugador[i] = tableroJugador[i] || new Array(tamano);
                tableroJugador[i][j] = { barco: false, div: celda };
            } else {
                tableroMaquina[i] = tableroMaquina[i] || [];
                tableroMaquina[i][j] = { barco: false, div: celda };
            }
        }

        tabla.appendChild(fila);
    }
    const contenedor = document.getElementById(id);
    contenedor.appendChild(tabla);

}

export const crearBarcos = () => {
    class Barco {
        constructor(nombre, size, divs) {
            this.nombre = nombre;
            this.size = size;
            this.divs = divs;
        }
    }

    const barco1 = new Barco('barco1', 1, []);
    const barco2 = new Barco('barco2', 2, []);
    const barco3 = new Barco('barco3', 3, []);
    const barco4 = new Barco('barco4', 4, []);

    barcos.push(barco1, barco2, barco3, barco4);

    const barco5 = new Barco('barco5', 1, []);
    const randomRow = Math.floor(Math.random() * tableroMaquina.length);
    const randomCol = Math.floor(Math.random() * tableroMaquina.length);
    barco5.divs.push(tableroMaquina[randomRow][randomCol].div);

    const barco6 = new Barco('barco6', 2, []);
    let randomRow2, randomCol2;
    do {
        randomRow2 = Math.floor(Math.random() * tableroMaquina.length);
        randomCol2 = Math.floor(Math.random() * (tableroMaquina.length - 1));
    } while (tableroMaquina[randomRow2][randomCol2].barco || tableroMaquina[randomRow2][randomCol2 + 1].barco);
    for (let i = 0; i < barco6.size; i++) {
        const div = tableroMaquina[randomRow2][randomCol2 + i].div;
        barco6.divs.push(div);
        tableroMaquina[randomRow2][randomCol2 + i] = { barco: true, div: div };
    }

    const barco7 = new Barco('barco7', 3, []);
    let randomRow3, randomCol3;
    do {
        randomRow3 = Math.floor(Math.random() * (tableroMaquina.length - 2));
        randomCol3 = Math.floor(Math.random() * tableroMaquina.length);
    } while (tableroMaquina[randomRow3][randomCol3].barco || tableroMaquina[randomRow3 + 1][randomCol3].barco || tableroMaquina[randomRow3 + 2][randomCol3].barco);
    for (let i = 0; i < barco7.size; i++) {
        const div = tableroMaquina[randomRow3 + i][randomCol3].div;
        barco7.divs.push(div);
        tableroMaquina[randomRow3 + i][randomCol3] = { barco: true, div: div };
    }

    const barco8 = new Barco('barco8', 4, []);

    let randomRow4, randomCol4;
    do {
        randomRow4 = Math.floor(Math.random() * (tableroMaquina.length - 3));
        randomCol4 = Math.floor(Math.random() * tableroMaquina.length);
    } while (tableroMaquina[randomRow4][randomCol4].barco || tableroMaquina[randomRow4 + 1][randomCol4].barco || tableroMaquina[randomRow4 + 2][randomCol4].barco);
    for (let i = 0; i < barco8.size; i++) {
        const div = tableroMaquina[randomRow4 + i][randomCol4].div;
        barco8.divs.push(div);
        tableroMaquina[randomRow4 + i][randomCol4] = { barco: true, div: div };
    }


    barcos.push(barco5, barco6, barco7, barco8);
    localStorage.setItem('barcos', JSON.stringify(barcos));

    // Ordenar los barcos por tamaño, de mayor a menor
    barcos.sort((a, b) => b.size - a.size);
    console.log(barcos);

    return barcos;
}

export const colocarBarcosMaquina = () => {
    crearBarcos().forEach(barco => {
        barco.divs.forEach(div => {
            div.classList.add('barco');
            div.dataset.barco = barco.nombre;
        });
    });
}


//Genera dinamicamente
export const seleccionarCasilla = (event) => {
    let turnoJugador = true;
    let turnoMaquina = false; 
    const tabla = document.querySelector('.tablero');
    const celda = event.target;
    const x = parseInt(celda.dataset.x);
    const y = parseInt(celda.dataset.y);
    const jugador = celda.dataset.jugador;

    //Operador ternario
    const tablero = jugador === 'jugador' ? tableroJugador : tableroMaquina;

    const casilla = tablero[x][y];

    const audio = new Audio('explosion.mp3');
    audio.play();

    if (turnoJugador) {
        casilla.seleccionada = true;
        if (casilla.barco) {
            celda.classList.add('tocado');
        } else {
            celda.classList.add('agua');
        }


        setTimeout(() => {
            let xAleatorio, yAleatorio;

            turnoJugador = false;
            turnoMaquina = true;


            let casillaAleatoria = null;
            do {
                xAleatorio = Math.floor(Math.random() * tablero.length);
                yAleatorio = Math.floor(Math.random() * tablero[0].length);
                casillaAleatoria = tablero[xAleatorio][yAleatorio];
            } while (casillaAleatoria.seleccionada);
            casillaAleatoria.seleccionada = true;


            const celdaAleatoria = tabla.querySelector(`[data-jugador="jugador"][data-x="${xAleatorio}"][data-y="${yAleatorio}"]`);
            if (casillaAleatoria.barco) {
                celdaAleatoria.classList.add('tocado');
                const audio = new Audio('explosion.mp3');
                audio.play();
            } else {
                celdaAleatoria.classList.add('agua');
                const audio = new Audio('explosion.mp3');
                audio.play();
            }


            turnoMaquina = false;
            turnoJugador = true;

            turnoJugador;

        }, 3800);
    } else {
        // Es el turno de la máquina, no hace nada
    }
}