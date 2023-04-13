const taulerPersona = document.getElementById("tauler-persona");
const taulerMaquina = document.getElementById("tauler-maquina");

// Crear las filas y las celdas para el tablero de la persona
for (let i = 0; i < 10; i++) {
    const fila = document.createElement("tr");
    const numFila = document.createElement("td");
    numFila.textContent = i+1;
    numFila.classList.add("numero");
    numFila.setAttribute("id", `color_numerito`);
    fila.appendChild(numFila);
    for (let j = 0; j < 10; j++) {
      const celda = document.createElement("td");
      celda.setAttribute("id", `persona-${i}-${j}`);
      celda.classList.add("numero"); // agregar la clase "numero" a la celda
      fila.appendChild(celda);
    }
    taulerPersona.appendChild(fila);
  }
  
  // Crear las filas y las celdas para el tablero de la máquina
  for (let i = 0; i < 10; i++) {
    const fila = document.createElement("tr");
    const numFila = document.createElement("td");
    numFila.textContent = i+1;
    numFila.classList.add("numero");
    numFila.setAttribute("id", `color_numerito`);
    fila.appendChild(numFila);
    for (let j = 0; j < 10; j++) {
      const celda = document.createElement("td");
      celda.setAttribute("id", `maquina-${i}-${j}`);
      celda.classList.add("numero"); // agregar la clase "numero" a la celda
      fila.appendChild(celda);
    }
    taulerMaquina.appendChild(fila);
  }
