alert("Cotizador de costo mensual de mano de obra de EXPERTO INGENIERIA");

let seguir = true;

function condiciones(
  trabajo,
  cantidad,
  opcionTiempo,
  dias,
  precio,
  herramientas,
  costo,
  horas,
  trabajoString,
  detalle
) {
  this.trabajo = trabajo; // Tipo de personal que se necesita
  this.cantidad = cantidad; // El dato de tiempo va en dias o meses
  this.opcionTiempo = opcionTiempo; // Dias o meses
  this.dias = dias; // Cantidad de dias que se trabaja
  this.precio = precio; // Precio de la hora
  this.herramientas = herramientas; // Necesita o no herramientas
  this.costo = costo; // Costo total del servicio
  this.horas = horas; // Horas de jornada laboral
  this.trabajoString = trabajoString; // String del tipo de trabajo
  this.detalle = detalle; // Detalle del trabajo
}

var cantidadConsultas = [0,0,0];

var trabajoProgramador = new condiciones(0, 0, 0, 0, 0, 0, 0, 0, "Indefinido");
var trabajoElectricista = new condiciones(0, 0, 0, 0, 0, 0, 0, 0, "Indefinido");
var trabajoAsistencia = new condiciones(0, 0, 0, 0, 0, 0, 0, 0, "Indefinido");
var trabajoGeneral = new condiciones(0, 0, 0, 0, 0, 0, 0, 0, "Indefinido");
var trabajoTotal = new condiciones(0, 0, 0, 0, 0, 0, 0, 0, "Indefinido");
var trabajoTotalCosto = 0;

var dato = 0; // opcion ingresada
var min = 0; // valor minimo para la opcion
var max = 0; // valor maximo para la opcion
var repetir = true; // booleano para repetir la peticion de informacion
var consultaSiNo = "";
var otraObra = "";
var otraObraSi = false;

function costoHora(trabajo) {
  if (trabajo == 1) {
    trabajoGeneral.precio = 20;
    trabajoGeneral.trabajoString = "Programador";
  } else if (trabajo == 2) {
    trabajoGeneral.precio = 15;
    trabajoGeneral.trabajoString = "Electricista";
  } else if (trabajo == 3) {
    trabajoGeneral.precio = 14;
    trabajoGeneral.trabajoString = "Asistencia Tecnica";
  } else if (trabajo == 4) {
    trabajoGeneral.precio = 0;
    trabajoGeneral.trabajoString = "Indefinido";
  }

  return trabajoGeneral.precio;
}

function controlarNumero(dato, min = 0, max = 0) {
  if (isNaN(dato) || dato == 0) {
    repetir = true;
  } else if ((dato < min || dato > max) && min != 0 && max != 0) {
    repetir = true;
  } else {
    repetir = false;
  }
  return repetir;
}

function formatearSiNo(entradaSiNo) {
  if (
    entradaSiNo == "Si" ||
    entradaSiNo == "si" ||
    entradaSiNo == "SI" ||
    entradaSiNo == "sI"
  ) {
    entradaSiNo = "Si";
  } else if (
    entradaSiNo == "no" ||
    entradaSiNo == "No" ||
    entradaSiNo == "NO" ||
    entradaSiNo == "nO"
  ) {
    entradaSiNo = "No";
  }
  return entradaSiNo;
}

function calculoTotal(programador, electricista, asistencia, general) {
  let total = new condiciones(0, 0, 0, 0, 0, 0, 0, 0, "Indefinido");

  total.costo = programador.costo + electricista.costo + asistencia.costo;
  total.detalle = general.detalle;

  return total;
}

trabajoGeneral.detalle = String(
  prompt("Descripcion del trabajo o codigo de referencia")
);

do {
  do {
    trabajoGeneral.trabajo = Number(
      prompt(
        "La obra '" +
          trabajoGeneral.detalle +
          "' necesita: 1-Programador, 2-Electricista, 3-Asistencia tecnica, 4-Finalizar",
        0
      )
    );
  } while (controlarNumero(trabajoGeneral.trabajo, 1, 4));

  trabajoGeneral.precio = costoHora(trabajoGeneral.trabajo);

  do {
    if (trabajoGeneral.trabajo == 1) {
      trabajoGeneral.herramientas = String(
        prompt("Llevar computadora propia?")
      );
    } else if (trabajoGeneral.trabajo == 2) {
      trabajoGeneral.herramientas = String(
        prompt("Llevar herramientas propias?")
      );
    } else if (trabajoGeneral.trabajo == 3) {
      alert("No se asiste con herramientas ni computadora");
      trabajoGeneral.herramientas = "no";
    }

    trabajoGeneral.herramientas = formatearSiNo(trabajoGeneral.herramientas);
  } while (
    trabajoGeneral.herramientas != "Si" &&
    trabajoGeneral.herramientas != "No"
  );

  if (trabajoGeneral.herramientas == "Si") {
    trabajoGeneral.precio = trabajoGeneral.precio * 1.25;
  }

  if (trabajoGeneral.trabajo != 4) {
    do {
      trabajoGeneral.cantidad = Number(
        prompt("Cantidad de personas que necesita: ", 0)
      );
    } while (controlarNumero(trabajoGeneral.cantidad));
    do {
      trabajoGeneral.opcionTiempo = Number(
        prompt("Tiempo que necesitara es en: 1-dias, 2-meses", 0)
      );
    } while (controlarNumero(trabajoGeneral.opcionTiempo, 1, 2));

    if (trabajoGeneral.opcionTiempo == 1) {
      do {
        trabajoGeneral.dias = Number(
          prompt("Cantidad de dias que necesitara el personal: ", 0)
        );
      } while (controlarNumero(trabajoGeneral.dias));
    } else if (trabajoGeneral.opcionTiempo == 2) {
      do {
        trabajoGeneral.dias = Number(
          prompt("Cantidad de meses que necesitara el personal: ", 0)
        );
      } while (controlarNumero(trabajoGeneral.dias));

      trabajoGeneral.dias = trabajoGeneral.dias * 24;
    }

    do {
      trabajoGeneral.horas = Number(
        prompt("Horas diarias de la jornada laboral promedio", 0)
      );
    } while (controlarNumero(trabajoGeneral.horas));

    trabajoGeneral.costo =
      trabajoGeneral.dias *
      trabajoGeneral.precio *
      trabajoGeneral.cantidad *
      trabajoGeneral.horas;

    alert("Costo total: USD " + trabajoGeneral.costo);
  }

  if (trabajoGeneral.trabajo != 4) {
    console.log("Costo total " + trabajoGeneral.costo);

    document.write(
      "<p>El costo total de " +
        trabajoGeneral.trabajoString +
        " es de: USD " +
        trabajoGeneral.costo +
        "</p>"
    );
  }

  if (trabajoGeneral.trabajo === 1) {
    trabajoProgramador.costo = trabajoProgramador.costo + trabajoGeneral.costo;
    cantidadConsultas[0]++;
  } else if (trabajoGeneral.trabajo === 2) {
    trabajoElectricista.costo =
      trabajoElectricista.costo + trabajoGeneral.costo;
      cantidadConsultas[1]++;
    } else if (trabajoGeneral.trabajo === 3) {
    trabajoAsistencia.costo = trabajoAsistencia.costo + trabajoGeneral.costo;
    cantidadConsultas[2]++;
  }

  do {
    otraObra = prompt(String("Desea agregar mas personal a la cotizacion?"));

    otraObra = formatearSiNo(otraObra);
  } while (otraObra != "Si" && otraObra != "No");

  if (otraObra == "Si") {
    otraObraSi = true;
  } else if (otraObra == "No") {
    otraObraSi = false;
  }
} while (otraObraSi);

trabajoTotal = calculoTotal(
  trabajoProgramador,
  trabajoElectricista,
  trabajoAsistencia,
  trabajoGeneral
);

console.log("Codigo de obra: " + trabajoTotal.detalle);
console.log("Costo total " + trabajoTotal.costo);
console.log("Cantidad de veces que se agrego Programadores:", cantidadConsultas[0]);
console.log("Cantidad de veces que se agrego Electricistas:", cantidadConsultas[1]);
console.log("Cantidad de veces que se agrego Asistencia tecnica:", cantidadConsultas[2]);


document.write("<h2>Resultado:</h2>");
document.write("<h3>Codigo de obra: " + trabajoTotal.detalle + "</h3>");
document.write("<h4>El costo total es de: USD " + trabajoTotal.costo + "</h4>");
