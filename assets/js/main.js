var costoTotal = 0;
var precioHora = 0;
var precioHoraHerr = 0;

var cotizacion = {
  id: Date,
  referencia: "",
  trabajo: "",
  herramientas: "no",
  personas: 0,
  dias: 0,
  horas: 0,
  costoTotal: 0,
};

var cotizacionesRealizadas = [];

function costoHora(val) {
  let precio = 0;
  if (val == "Programador") {
    console.log(1);
    precio = 20;
  } else if (val == "Electricista") {
    console.log(2);
    precio = 15;
  } else if (val == "Asistencia Tecnica") {
    console.log(3);
    precio = 14;
  }

  return precio;
}

function sincronizarConLocalStorage() {
  localStorage.setItem("cotizacion", JSON.stringify(cotizacionesRealizadas));
}

//if (typeof window === "object") {
window.addEventListener("DOMContentLoaded", function () {
  // NUEVO: Contenido cargado
  console.log("EL DOM SE CARGO");

  cotizacionesRealizadas = JSON.parse(localStorage.getItem("cotizacion")) || [];
  agregarCotizacion();

  const formatearSiNo = (val) => {
    if (val == "si" || val == "SI" || val == "sI" || val == "Si") {
      val = "Si";
      console.log("Si");
    } else if (val == "no" || val == "No" || val == "NO" || val == "nO") {
      val = "No";
      console.log("No");
    }
    return val;
  };
  
  const checkString = (val) => {
    if (/[a-zA-z]+$/.test(val) && val.length >= 1) {
      return true;
    }
    return false;
  };
  
  const checkNumero = (val) => {
    let number = parseInt(val);
  
    if (/[^0-9]/g.test(number) && typeof number === "number") {
      return false;
    }
    return true;
  };

  // Validamos el campo referencia
  referencia.addEventListener("input", (e) => {
    let validaReferencia = checkString(e.target.value);
    if (validaReferencia) {
      error_referencia.style.display = "none";
      error_referencia.innerHTML = ``;
    } else {
      error_referencia.style.display = "block";
      error_referencia.innerHTML = `Debe ingresar numeros o letras`;
    }
  });

  // Validamos el campo trabajo
  trabajo.addEventListener("input", (e) => {
    let validaTrabajo = checkString(e.target.value);
    precioHora = costoHora(e.target.value);
    if (validaTrabajo) {
      error_trabajo.style.display = "none";
      error_trabajo.innerHTML = ``;
    } else {
      error_trabajo.style.display = "block";
      error_trabajo.innerHTML = `Debe ingresar alguna opcion`;
    }
  });

  // Validamos el campo herramientas
  herramientas.addEventListener("input", (e) => {
    let validaHerramientas = checkString(e.target.value);
    validaHerramientas = formatearSiNo(e.target.value);
    if (validaHerramientas == "Si") {
      precioHoraHerr = 1.25;
      error_herramientas.style.display = "none";
      error_herramientas.innerHTML = ``;
    } else {
      precioHoraHerr = 1;
      error_herramientas.style.display = "block";
      error_herramientas.innerHTML = `Debe ingresar alguna opcion`;
    }
  });

  // Validamos el campo personas
  personas.addEventListener("input", (e) => {
    let validaPersonas = checkNumero(e.target.value);
    if (validaPersonas) {
      error_personas.style.display = "none";
      error_personas.innerHTML = ``;
    } else {
      error_personas.style.display = "block";
      error_personas.innerHTML = `Debe ingresar sólo numeros`;
    }
  });

  // Validamos el campo dias
  dias.addEventListener("input", (e) => {
    let validaDias = checkNumero(e.target.value);
    if (validaDias) {
      error_dias.style.display = "none";
      error_dias.innerHTML = ``;
    } else {
      error_dias.style.display = "block";
      error_dias.innerHTML = `Debe ingresar sólo numeros`;
    }
  });

  // Validamos el campo horas
  horas.addEventListener("input", (e) => {
    let validaHoras = checkNumero(e.target.value);
    if (validaHoras) {
      error_horas.style.display = "none";
      error_horas.innerHTML = ``;
    } else {
      error_horas.style.display = "block";
      error_horas.innerHTML = `Debe ingresar solo numeros`;
    }
  });

  // Seleccionamos el formulario
  let formulario = document.querySelector("#formulario");
  // mensaje con los datos del formulario
  let mensajeDatos = document.querySelector("#alerta");
  // escondemos el mensaje
  mensajeDatos.style.display = "none";

  // Input de error
  let error_referencia = document.querySelector("#error_referencia");
  let error_trabajo = document.querySelector("#error_trabajo");
  let error_herramientas = document.querySelector("#error_herramientas");
  let error_personas = document.querySelector("#error_personas");
  let error_dias = document.querySelector("#error_dias");
  let error_horas = document.querySelector("#error_horas");

  error_referencia.style.display = "none";
  error_trabajo.style.display = "none";
  error_herramientas.style.display = "none";
  error_personas.style.display = "none";
  error_dias.style.display = "none";
  error_horas.style.display = "none";

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    // guardamos datos que ingresamos en los input
    let referencia = document.querySelector("#referencia").value;
    let trabajo = document.querySelector("#trabajo").value;
    let herramientas = document.querySelector("#herramientas").value;
    let personas = document.querySelector("#personas").value;
    let dias = document.querySelector("#dias").value;
    let horas = document.querySelector("#horas").value;

    if (referencia && trabajo && herramientas && personas && dias && horas) {
      let infoReferencia = document.querySelector("#infoReferencia"),
        infoTrabajo = document.querySelector("#infoTrabajo"),
        infoHerramientas = document.querySelector("#infoHerramientas"),
        infoPersonas = document.querySelector("#infoPersonas"),
        infoDias = document.querySelector("#infoDias"),
        infoHoras = document.querySelector("#infoHoras"),
        infoCostoTotal = document.querySelector("#infoCostoTotal");

      costoTotal = dias * precioHora * precioHoraHerr * personas * horas;
      console.log(costoTotal);
      console.log(precioHoraHerr);

      cotizacion.id = Date;
      cotizacion.referencia = referencia;
      cotizacion.trabajo = trabajo;
      cotizacion.herramientas = herramientas;
      cotizacion.personas = personas;
      cotizacion.dias = dias;
      cotizacion.horas = horas;
      cotizacion.costoTotal = costoTotal;

      let cotizaciones = [];

      cotizaciones.push(cotizacion);

      cotizacionesRealizadas = [...cotizacionesRealizadas, ...cotizaciones];

      //      document.location.reload ();

      infoReferencia.innerHTML = `${cotizacion.referencia}`;
      infoTrabajo.innerHTML = `${cotizacion.trabajo}`;
      infoHerramientas.innerHTML = `${cotizacion.herramientas}`;
      infoPersonas.innerHTML = `${cotizacion.personas}`;
      infoDias.innerHTML = `${cotizacion.dias}`;
      infoHoras.innerHTML = `${cotizacion.horas}`;
      infoCostoTotal.innerHTML = `${cotizacion.costoTotal}`;
      //      mensajeDatos.style.display = "block";

      agregarCotizacion();

      console.log(cotizacion);
      console.log(cotizaciones);
      console.log(cotizacionesRealizadas);
    } else {
      alert("Debe llenar los campos");
    }
  });

});

function agregarCotizacion() {
  tabla.innerHTML = ``;
  cotizacionesRealizadas.forEach((element, index) => {
    tabla.innerHTML += `<div class="tablaDos">
             <tr>
             <td class="text-center">${element.referencia}"</td>
             <td class="text-center">${element.id}"</td>
             <td class="text-center">${element.trabajo}</td>
             <td class="text-center">${element.costoTotal}</td>
             <td class="text-center"><a href="#" id="${element.id}" class="borrar-cotizacion" data-id="1">X</a></td>
           </tr>
           </div>`;
  });

  // Seleccionamos el boton eliminar
  let buttonDelete = document.querySelectorAll(".borrar-cotizacion");

  // Lo recorremos
  buttonDelete.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();

      let id = e.target.id;
      console.log(id);
      cotizacionesRealizadas = cotizacionesRealizadas.filter(
        (elemento) => elemento.id != id
      );

      console.log("Salida de cotizacionesRealizadas", cotizacionesRealizadas);
      agregarCotizacion();
    });
  });

  sincronizarConLocalStorage();
}
