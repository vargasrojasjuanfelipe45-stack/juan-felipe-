const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const edad = Number(document.getElementById("edad").value);
  const identificacion = document.getElementById("identificacion").value.trim();

  // Arreglo para guardar las cinco notas, igual que notas = [] en Python.
  const notas = [];

  // Bucle para leer y guardar las cinco notas.
  for (let i = 1; i <= 5; i++) {
    const nota = Number(document.getElementById("nota" + i).value);

    if (nota < 0 || nota > 5 || !Number.isFinite(nota)) {
      resultado.innerHTML = '<p class="error">Las notas deben estar entre 0 y 5.</p>';
      return;
    }

    notas.push(nota);
  }

  // Cálculo del promedio.
  let suma = 0;
  for (let i = 0; i < notas.length; i++) {
    suma += notas[i];
  }
  const promedio = suma / 5;

  // Condicional para determinar si aprobó o perdió.
  const estado = promedio >= 3
    ? "Aprobó la materia"
    : "Perdió la materia";

  const claseEstado = promedio >= 3 ? "aprobado" : "perdido";

  resultado.innerHTML = `
    <h2>Resultados del boletín</h2>
    <p><strong>Nombre:</strong> ${escaparHTML(nombre)}</p>
    <p><strong>Edad:</strong> ${edad}</p>
    <p><strong>Identificación:</strong> ${escaparHTML(identificacion)}</p>
    <p><strong>Notas:</strong> ${notas.join(", ")}</p>
    <p><strong>Promedio:</strong> ${promedio.toFixed(2)}</p>
    <p class="${claseEstado}"><strong>${estado}</strong></p>
  `;
});

// Evita que el texto ingresado se interprete como código HTML.
function escaparHTML(texto) {
  return texto.replace(/[&<>"']/g, function(caracter) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[caracter];
  });
}
