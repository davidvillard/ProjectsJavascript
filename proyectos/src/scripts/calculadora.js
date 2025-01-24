const botones = document.querySelectorAll(".grid div"); // Selecciono todos los botones


let numeroActual = "";
let numeroPrevio = "";
let operador = "";
let resultadoMostrado = false;

botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const valor = e.target.textContent; // Obtén el texto del botón
      manejarBoton(valor); // Llama a una función para manejar el botón
    });
  });

  function manejarBoton(valor) {
    if (resultadoMostrado && !isNaN(valor)) {
      // Si ya se mostró el resultado, empieza de nuevo con el número actual
      numeroActual = valor;
      resultadoMostrado = false;
      actualizarPantalla(numeroActual);
    } else if (!isNaN(valor) || valor === ".") {
      // Si es un número o un punto decimal
      numeroActual += valor;
      actualizarPantalla(numeroPrevio + operador + numeroActual);
    } else if (["+", "-", "*", "/", "%"].includes(valor)) {
      // Si es un operador
      if (numeroActual === "") return;  // No hacer nada si no hay número actual
      if (numeroPrevio !== "") {
        // Si ya hay un número previo, hacer el cálculo antes de agregar un nuevo operador
        numeroPrevio = calcular();
        actualizarPantalla(numeroPrevio + valor);
      } else {
        numeroPrevio = numeroActual;  // Si no hay número previo, lo guardamos
        operador = valor;
        actualizarPantalla(numeroPrevio + operador);
      }
      numeroActual = "";
    } else if (valor === "=") {
      // Si es el botón igual
      if (numeroPrevio === "" || numeroActual === "") return;
      const resultado = calcular();
      actualizarPantalla(resultado);
      numeroActual = resultado.toString();
      numeroPrevio = "";
      operador = "";
      resultadoMostrado = true;  // Indicar que ya se mostró el resultado
    } else if (valor === "C") {
      // Si es el botón limpiar
      limpiar();
    }
  }
  


function calcular(){
    const num1 = parseFloat(numeroPrevio);
    const num2 = parseFloat(numeroActual);

    switch(operador){
        case "+":
            return sumar(num1, num2);
        case "-":
            return restar(num1, num2);
        case "*":
            return multiplicar(num1, num2);
        case "/":
            return dividir(num1, num2);
        case "%":
            return num1 % num2;
        default:
            return "0";
        }
}

function limpiar() {
    numeroActual = "";
    numeroPrevio = "";
    operador = "";
    actualizarPantalla("0");
  }
  

  function actualizarPantalla(valor) {
    const pantalla = document.getElementById("pantalla");
    pantalla.textContent = valor;
  }
  







// Funciones de la calculadora
function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b == 0) {
        return "Infinito";
    }

    return a / b;
}

