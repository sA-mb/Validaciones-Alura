/* yo mostre la fecha asi
const btn = document.querySelector("[data-form-btn]");

const verFecha = (evento) => {
  evento.preventDefault();
  const fecha = document.querySelector("[data-date]");
  const value = fecha.value;
  console.log(value);
  fecha.value = "";
};

btn.addEventListener("click", verFecha);
*/

export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMostrarMensajeError(tipoDeInput, input);
  }
}

const tipoErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesError = {
  nombre: {
    valueMissing: "Este campo no puede estar vacio.",
  },
  email: {
    valueMissing: "Este campo no puede estar vacio.",
    typeMismatch: "El correo no es valido",
  },
  password: {
    valueMissing: "Este campo no puede estar vacio.",
    patternMismatch:
      "Debe tener de 6 a 12 caracteres con al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.",
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacio.",
    customError: "Debes de tener al menos 18 años de edad!",
  },
  numero: {
    valueMissing: "Este campo no puede estar vacio.",
    patternMismatch: "Se requiere un numero de 9 digitos",
  },
  direccion: {
    valueMissing: "Este campo no puede estar vacio.",
    patternMismatch: "Debe de contener entre 10 a 40 caracteres",
  },
  ciudad: {
    valueMissing: "Este campo no puede estar vacio.",
    patternMismatch: "Debe de contener entre 10 a 40 caracteres",
  },
  estado: {
    valueMissing: "Este campo no puede estar vacio.",
    patternMismatch: "Debe de contener entre 10 a 40 caracteres",
  },
};

const validadores = {
  nacimiento: (input) => validarEdad(input),
};

function mostrarMostrarMensajeError(tipoDeInput, input) {
  let mensaje = "";
  tipoErrores.forEach((error) => {
    if (input.validity[error]) {
      console.log(mensajesError[tipoDeInput][error]);
      mensaje = mensajesError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarEdad(input) {
  //obtener año ingreado
  const fecha = new Date(input.value);
  const anoIngresado = fecha.getFullYear();

  //obtener año actual
  const fechaActual = new Date(); // da fecha de hoy
  const anoActual = fechaActual.getFullYear();

  let mensaje = "";

  if (anoActual - anoIngresado < 18) {
    mensaje = "Debes de tener al menos 18 años de edad!";
  }
  input.setCustomValidity(mensaje);
}
