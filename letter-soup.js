function generarSopaDeLetras() {
    const matrizInput = document.getElementById("matriz").value;
    const palabrasInput = document.getElementById("palabras").value;
  
    const matrizFilas = matrizInput.split("\n").map((fila) => fila.split(","));
  
    const sopaDeLetras = matrizFilas.map((fila) => fila.map((letra) => letra.trim()));
  
    const palabrasABuscar = palabrasInput.split(",").map((palabra) => palabra.trim());
  
    const table = document.getElementById("sopaDeLetras");
    table.innerHTML = ""; // Limpiar tabla antes de generar nueva sopa de letras
  
    // Generar sopa de letras en la tabla
    for (let i = 0; i < sopaDeLetras.length; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < sopaDeLetras[i].length; j++) {
        const cell = document.createElement("td");
        cell.textContent = sopaDeLetras[i][j];
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  
    // Llamar al método buscarPalabra para cada palabra
    const palabrasNoEncontradas = [];
    for (const palabra of palabrasABuscar) {
      if (!buscarPalabra(sopaDeLetras, palabra)) {
        palabrasNoEncontradas.push(palabra);
      }
    }
  
    if (palabrasNoEncontradas.length > 0) {
      mostrarPalabrasNoEncontradas(palabrasNoEncontradas);
    }
  }
  
  function buscarPalabra(sopaDeLetras, palabra) {
    const filas = sopaDeLetras.length;
    const columnas = sopaDeLetras[0].length;
  
    function verificarDireccion(filaInicio, columnaInicio, direccion) {
      const longitudPalabra = palabra.length;
      let filaActual = filaInicio;
      let columnaActual = columnaInicio;
      const posicionesPintadas = [];
  
      for (let i = 0; i < longitudPalabra; i++) {
        if (
          filaActual >= 0 &&
          filaActual < filas &&
          columnaActual >= 0 &&
          columnaActual < columnas &&
          sopaDeLetras[filaActual][columnaActual] === palabra[i]
        ) {
          // Guardar la posición pintada
          posicionesPintadas.push([filaActual, columnaActual]);
  
          // Avanzar en la dirección especificada
          filaActual += direccion[0];
          columnaActual += direccion[1];
        } else {
          // La palabra no cabe en la dirección dada
          return [];
        }
      }
  
      // Todas las letras de la palabra coinciden en la dirección dada
      return posicionesPintadas;
    }
  
    function buscarEnTodasDirecciones() {
      const direcciones = [
        [0, 1], // Horizontal derecha
        [0, -1], // Horizontal izquierda
        [1, 0], // Vertical abajo
        [-1, 0], // Vertical arriba
        [1, 1], // Diagonal derecha abajo
        [-1, 1], // Diagonal derecha arriba
        [1, -1], // Diagonal izquierda abajo
        [-1, -1], // Diagonal izquierda arriba
      ];
  
      for (let fila = 0; fila < filas; fila++) {
        for (let columna = 0; columna < columnas; columna++) {
          for (const direccion of direcciones) {
            const posicionesEncontradas = verificarDireccion(fila, columna, direccion);
            if (posicionesEncontradas.length > 0) {
              pintarPalabra(posicionesEncontradas);
              return true;
            }
          }
        }
      }
      // La palabra no fue encontrada en ninguna dirección
      return false;
    }
  
    function pintarPalabra(posiciones) {
      const table = document.getElementById("sopaDeLetras");
      for (const [fila, columna] of posiciones) {
        const cell = table.rows[fila].cells[columna];
        cell.classList.add("found");
      }
    }
  
    return buscarEnTodasDirecciones();
  }
  
  function mostrarPalabrasNoEncontradas(palabras) {
    alert(`Estas palabras no fueron encontradas en la sopa de letras:\n${palabras.join(", ")}`);
  }
  