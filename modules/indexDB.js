// indexDB.js

import { barcos } from "./tablero.js";

const DB_NAME = 'BattleshipDB';
const DB_VERSION = 1;

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


export function conectarIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = function (event) {
            console.log("Error al abrir la base de datos");
            reject();
        };

        request.onupgradeneeded = function (event) {
            const db = event.target.result;

            // Crear la tabla "barcos"
            const objectStore = db.createObjectStore("barcos", { keyPath: "nombre" });

            // Crear los índices
            objectStore.createIndex("size", "size", { unique: false });
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            resolve(db);
        };
    });
}

export function agregarBarcosIndexedDB(db, barcos) {
    const transaction = db.transaction("barcos", "readwrite");
    const objectStore = transaction.objectStore("barcos");

    barcos.forEach(function (barco) {
        const request = objectStore.add(barco);
        request.onerror = function (event) {
            console.log("Error al agregar el barco: " + barco.nombre);
        };
        request.onsuccess = function (event) {
            console.log("Barco agregado: " + barco.nombre);
        };
    });

    return new Promise((resolve, reject) => {
        transaction.oncomplete = function (event) {
            console.log("Barcos guardados en la base de datos");
            resolve();
        };
        transaction.onerror = function (event) {
            console.log("Error al agregar los barcos");
            reject();
        };
    });
}
