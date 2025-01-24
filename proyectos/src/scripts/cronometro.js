// Selección de elementos
const pararCronometro = document.getElementById('stop');
const reiniciarCronometro = document.getElementById('reset');
const iniciarCronometro = document.getElementById('start');
const bola = document.getElementById('bola');

// Dimensiones del círculo
const radio = 192; // Mitad del tamaño del círculo (w-96/h-96) menos la mitad de la bola (w-4/h-4)

// Variables para el cronómetro
let cronometro;
let segundos = 0;
let minutos = 0;
let imprimirSegundos;
let imprimirMinutos;
let cronometroCorriendo = false; // Nuevo indicador

// Variables para el movimiento de la bola
let anguloActual = -90; // Empieza en -90 grados (parte superior del círculo)
let intervaloMovimiento;
const intervaloActualizacion = 10; // Intervalo en ms para movimiento fluido
const incrementoPorIntervalo = (6 / 1000) * intervaloActualizacion; // 6 grados por segundo dividido en pasos

// Función para mover la bola
function moverBolaFluida() {
    anguloActual += incrementoPorIntervalo; // Incrementar el ángulo
    if (anguloActual >= 270) anguloActual = -90; // Reiniciar cuando completa el círculo

    // Convertir ángulo a radianes
    const angulo = anguloActual * (Math.PI / 180);

    // Calcular las coordenadas de la bola en el borde del círculo
    const x = Math.cos(angulo) * radio;
    const y = Math.sin(angulo) * radio;

    // Actualizar la posición de la bola
    bola.style.transform = `translate(${x}px, ${y}px)`;
}

// Iniciar el movimiento fluido sincronizado con el cronómetro
function iniciarMovimientoFluido() {
    intervaloMovimiento = setInterval(moverBolaFluida, intervaloActualizacion); // Actualizar cada 10 ms
}

// Detener el movimiento fluido
function detenerMovimientoFluido() {
    clearInterval(intervaloMovimiento);
}

// Resetear la posición inicial de la bola
function posicionInicialBola() {
    anguloActual = -90; // Reiniciar ángulo a la parte superior
    const x = Math.cos(anguloActual * (Math.PI / 180)) * radio;
    const y = Math.sin(anguloActual * (Math.PI / 180)) * radio;
    bola.style.transform = `translate(${x}px, ${y}px)`;
}

// Función para actualizar el cronómetro
function actualizarCronometro() {
    segundos++;

    if (segundos > 59) {
        segundos = 0;
        minutos++;
    }

    // Formatear minutos y segundos
    imprimirSegundos = segundos < 10 ? `0${segundos}` : segundos;
    imprimirMinutos = minutos < 10 ? `0${minutos}` : minutos;

    // Mostrar el tiempo actualizado
    document.getElementById('minutos').innerText = imprimirMinutos;
    document.getElementById('segundos').innerText = imprimirSegundos;
}

// Función para iniciar el cronómetro
function iniciar() {
    if (!cronometroCorriendo) {
        cronometro = setInterval(actualizarCronometro, 1000); // Iniciar cronómetro con intervalo de 1 segundo
        cronometroCorriendo = true; // Marcar como corriendo
    }
    iniciarMovimientoFluido(); // Iniciar el movimiento de la bola
    iniciarCronometro.disabled = true; // Deshabilitar el botón de inicio
    iniciarCronometro.classList.add('disabled');
}

// Función para detener el cronómetro
function parar() {
    clearInterval(cronometro);
    detenerMovimientoFluido(); // Detener el movimiento de la bola
    cronometroCorriendo = false; // Marcar como detenido
    iniciarCronometro.disabled = false; // Habilitar el botón de inicio
    iniciarCronometro.classList.remove('disabled');
}

// Función para reiniciar el cronómetro
function reiniciar() {
    clearInterval(cronometro);
    detenerMovimientoFluido(); // Detener el movimiento de la bola
    cronometroCorriendo = false; // Marcar como detenido

    // Resetear los valores de tiempo
    segundos = 0;
    minutos = 0;

    // Mostrar los valores reseteados
    document.getElementById('minutos').innerText = "00";
    document.getElementById('segundos').innerText = "00";

    posicionInicialBola(); // Resetear la posición de la bola
    iniciarCronometro.disabled = false; // Habilitar el botón de inicio
    iniciarCronometro.classList.remove('disabled');
    // iniciar(); // Iniciar el cronómetro nuevamente
    
}

// Ejecutar la posición inicial al cargar la página
posicionInicialBola();

// Asignar eventos a los botones
iniciarCronometro.addEventListener('click', iniciar);
pararCronometro.addEventListener('click', parar);
reiniciarCronometro.addEventListener('click', reiniciar);



// // Selección de elementos
// const pararCronometro = document.getElementById('stop');
// const reiniciarCronometro = document.getElementById('reset');
// const iniciarCronometro = document.getElementById('start');

// // Se inicializan variables
// let cronometro;
// let segundos = 0;
// let minutos = 0;
// let imprimirSegundos;
// let imprimirMinutos;

// // Añadir evento de iniciar cronómetro
// iniciarCronometro.addEventListener('click', iniciar);

// // Función para iniciar el cronómetro
// function iniciar() {
//     // Iniciar cronómetro con intervalo de 1 segundo
//     cronometro = setInterval(actualizarCronometro, 1000);
    
//     // Deshabilitar el botón de inicio cuando el cronómetro esté corriendo
//     iniciarCronometro.disabled = true;
//     iniciarCronometro.classList.add('disabled');
    
//     // Añadir eventos para los botones de detener y reiniciar
//     pararCronometro.addEventListener('click', parar);
//     reiniciarCronometro.addEventListener('click', reiniciar);
// }

// // Función para actualizar el cronómetro
// function actualizarCronometro() {
//     segundos++;
    
//     if (segundos > 59) {
//         segundos = 0;
//         minutos++;
//     }

//     // Formatear minutos y segundos
//     imprimirSegundos = segundos;
//     imprimirMinutos = minutos;

//     if (segundos < 10) {
//         imprimirSegundos = "0" + segundos;
//     }

//     if (minutos < 10) {
//         imprimirMinutos = "0" + minutos;
//     }

//     // Mostrar el tiempo actualizado
//     document.getElementById('minutos').innerText = imprimirMinutos;
//     document.getElementById('segundos').innerText = imprimirSegundos;

//     // Mover la bola
//     moverBola();
// }

// // Función para detener el cronómetro
// function parar() {
//     clearInterval(cronometro);
//     // Habilitar el botón de inicio nuevamente
//     iniciarCronometro.disabled = false;
//     iniciarCronometro.classList.remove('disabled');
// }

// // Función para reiniciar el cronómetro
// function reiniciar() {
//     clearInterval(cronometro);
//     // Resetear los valores de tiempo
//     segundos = 0;
//     minutos = 0;
    
//     // Mostrar los valores reseteados
//     document.getElementById('minutos').innerText = "00";
//     document.getElementById('segundos').innerText = "00";
    
//     // Habilitar el botón de inicio
//     iniciarCronometro.disabled = false;
//     iniciarCronometro.classList.remove('disabled');

//     // Posicionar la bola en la posición inicial
//     posicionInicialBola();

// }

// // Selección de la bola
// const bola = document.getElementById('bola');

// // Dimensiones del círculo
// const radio = 192; // Mitad del tamaño del círculo (w-96/h-96) menos la mitad de la bola (w-4/h-4)

// // Variables para el ángulo
// let anguloActual = -90; // Empieza en -90 grados (parte superior del círculo)
// let intervaloMovimiento;
// const intervaloActualizacion = 10; // Intervalo en ms para movimiento fluido
// const incrementoPorIntervalo = (6 / 1000) * intervaloActualizacion; // 6 grados por segundo dividido en pasos

// // Función para mover la bola
// function moverBolaFluida() {
//     anguloActual += incrementoPorIntervalo; // Incrementar el ángulo
//     if (anguloActual >= 270) anguloActual = -90; // Reiniciar cuando completa el círculo

//     // Convertir ángulo a radianes
//     const angulo = anguloActual * (Math.PI / 180);

//     // Calcular las coordenadas de la bola en el borde del círculo
//     const x = Math.cos(angulo) * radio;
//     const y = Math.sin(angulo) * radio;

//     // Actualizar la posición de la bola
//     bola.style.transform = `translate(${x}px, ${y}px)`;
// }

// // Iniciar el movimiento fluido sincronizado con el cronómetro
// function iniciarMovimientoFluido() {
//     intervaloMovimiento = setInterval(moverBolaFluida, intervaloActualizacion); // Actualizar cada 10 ms
// }

// // Detener el movimiento fluido
// function detenerMovimientoFluido() {
//     clearInterval(intervaloMovimiento);
// }

// // Resetear la posición inicial de la bola
// function posicionInicialBola() {
//     anguloActual = -90; // Reiniciar ángulo a la parte superior
//     const x = Math.cos(anguloActual * (Math.PI / 180)) * radio;
//     const y = Math.sin(anguloActual * (Math.PI / 180)) * radio;
//     bola.style.transform = `translate(${x}px, ${y}px)`;
// }

// // Ejecutar la posición inicial al cargar la página
// posicionInicialBola();

// // Actualizar la lógica de los botones
// iniciarCronometro.addEventListener('click', () => {
//     iniciar();
//     iniciarMovimientoFluido();
// });

// pararCronometro.addEventListener('click', () => {
//     parar();
//     detenerMovimientoFluido();
// });

// reiniciarCronometro.addEventListener('click', () => {
//     reiniciar();
//     detenerMovimientoFluido();
//     posicionInicialBola();
// });
