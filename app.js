const jugador = document.getElementById('jugador');
const maquina = document.getElementById('maquina');
const tableroJugador = [];
const tableroMaquina = [];

let barcoEnMano = null;

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
            celda.addEventListener('click', clicEnCelda);
            fila.appendChild(celda);
            if (jugador === 'jugador') {
                tableroJugador[i] = tableroJugador[i] || [];
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
    let randomRow2 = Math.floor(Math.random() * tableroMaquina.length);
    let randomCol2 = Math.floor(Math.random() * (tableroMaquina.length - 1));
    for (let i = 0; i < barco2.size; i++) {
        const div = tableroMaquina[randomRow2][randomCol2 + i].div;
        barco2.divs.push(div);
    }
    // Tercer barco
    const barco3 = {
        nombre: 'barco3',
        size: 3,
        divs: []
    };
    let randomRow3 = Math.floor(Math.random() * tableroMaquina.length);
    let randomCol3 = Math.floor(Math.random() * (tableroMaquina.length - 2));
    for (let i = 0; i < barco3.size; i++) {
        const div = tableroMaquina[randomRow3][randomCol3 + i].div;
        barco3.divs.push(div);
    }
    // Cuarto barco
    const barco4 = {
        nombre: 'barco4',
        size: 4,
        divs: []
    };
    let randomRow4 = Math.floor(Math.random() * tableroMaquina.length);
    let randomCol4 = Math.floor(Math.random() * (tableroMaquina.length - 3));
    for (let i = 0; i < barco4.size; i++) {
        const div = tableroMaquina[randomRow4][randomCol4 + i].div;
        barco4.divs.push(div);
    }
    barcos.push(barco1, barco2, barco3, barco4);
    return barcos;
}

function colocarBarcos() {
    crearBarcos().forEach(barco => {
        barco.divs.forEach(div => {
            div.classList.add('barco');
            div.dataset.barco = barco.nombre;
        });
    });
}




jugador.addEventListener('dragover', e => {
    e.preventDefault();
});

jugador.addEventListener('drop', e => {
    const x = e.target.dataset.x;
    const y = e.target.dataset.y;
    const barco = barcoEnMano;
    if (barco && validarBarco(x, y, barco.longitud, 'horizontal')) {
        colocarBarco(x, y, barco.longitud, 'horizontal', jugador);
        return false;
    }
    else {
        if (x + longitud > 10) {
            return false;
        }
        for (let i = x; i < x + longitud; i++) {
            if (tableroJugador[i][y].barco) {
                return false;
            }
        }
    }
    return true;

});




function clicEnCelda(event) {
    const celda = event.target;
    const jugador = celda.dataset.jugador;

    if (jugador === 'jugador' && !juegoTerminado) {
        manejarDisparo(celda);
    }
}


