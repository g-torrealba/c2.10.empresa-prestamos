class Cl_persona {
   constructor(cedula, nombre, tipo, estadoCivil, montoSolicitado) {
      this.cedula = cedula;
      this.nombre = nombre;
      this.tipo = tipo;
      this.estadoCivil = estadoCivil;
      this.montoSolicitado = montoSolicitado;
   }
   creditoAprobado() {
      return this.cumpleRequisitos();
   }
   cumpleRequisitos() {
      return false;
   }
   montoAprobado() {
      return this.montoSolicitado;
   }
}

class Cl_comerciante extends Cl_persona {
   constructor(cedula, nombre, tipo, estadoCivil, montoSolicitado, sexo) {
      super(cedula, nombre, tipo, estadoCivil, montoSolicitado);
      this.sexo = sexo;
   }
   cumpleRequisitos() {
      if (this.sexo === "M" || this.estadoCivil === "C")
         // Está implícito si no es hombre => es mujer
         return true;
      else return false;
   }
   montoAprobado() {
      if (this.cumpleRequisitos())
         return this.montoSolicitado / (this.sexo === "M" ? 1 : 2);
      else return 0;
   }
}

class Cl_estudiante extends Cl_persona {
   constructor(
      cedula,
      nombre,
      tipo,
      estadoCivil,
      montoSolicitado,
      edad,
      notaPromedio
   ) {
      super(cedula, nombre, tipo, estadoCivil, montoSolicitado);
      this.edad = edad;
      this.notaPromedio = notaPromedio;
   }
   cumpleRequisitos() {
      if (this.edad < 20 && this.notaPromedio > 17) return true;
      else if (
         this.edad >= 20 &&
         this.estadoCivil === "C" &&
         this.notaPromedio > 15
      )
         return true;
      else return false;
   }
}

class Cl_casaPrestamos {
   constructor() {
      this.cntAprobadosCompleto = this.cntSolicitudes = this.cntRechazados = 0;
   }
   procesarPersona(p) {
      if (p.montoSolicitado === p.montoAprobado()) this.cntAprobadosCompleto++;
      this.cntSolicitudes++;
      if (p.creditoAprobado()) this.cntRechazados++;
   }
   porcAprobadosCompleto() {
      return this.cntSolicitudes !== 0
         ? ((this.cntAprobadosCompleto / this.cntSolicitudes) * 100).toFixed(2)
         : 0;
   }
   porcRechazados() {
      return this.cntSolicitudes !== 0
         ? ((this.cntRechazados / this.cntSolicitudes) * 100).toFixed(2)
         : 0;
   }
}

let p1 = new Cl_comerciante(222, "Luis", 1, "S", 1000, "M");
let p2 = new Cl_estudiante(111, "Ana", 2, "C", 2000, 20, 14);
let p3 = new Cl_estudiante(111, "Lin", 2, "C", 5000, 20, 17);
let p4 = new Cl_comerciante(444, "Reina", 1, "S", 3000, "F");
let p5 = new Cl_estudiante(333, "Mery", 2, "S", 6000, 25, 18);
let p6 = new Cl_comerciante(666, "Diana", 1, "C", 4000, "F");
let casaPrest = new Cl_casaPrestamos();

casaPrest.procesarPersona(p1);
casaPrest.procesarPersona(p2);
casaPrest.procesarPersona(p3);
casaPrest.procesarPersona(p4);
casaPrest.procesarPersona(p5);
casaPrest.procesarPersona(p6);

let salida = document.getElementById("app");

salida.innerHTML = "RESULTADOS";
salida.innerHTML += `<br>${p1.nombre} (C.I.${p1.cedula}): crédito ${
   p1.creditoAprobado() ? "APROBADO" : "RECHAZADO"
} ${p1.creditoAprobado() ? `, por un monto de $${p1.montoAprobado()}` : ""}`;

salida.innerHTML += `<br>${p2.nombre} (C.I.${p2.cedula}): crédito ${
   p2.creditoAprobado() ? "APROBADO" : "RECHAZADO"
} ${p2.creditoAprobado() ? `, por un monto de $${p2.montoAprobado()}` : ""}`;

salida.innerHTML += `<br>${p3.nombre} (C.I.${p3.cedula}): crédito ${
   p3.creditoAprobado() ? "APROBADO" : "RECHAZADO"
} ${p3.creditoAprobado() ? `, por un monto de $${p3.montoAprobado()}` : ""}`;

salida.innerHTML += `<br>${p4.nombre} (C.I.${p4.cedula}): crédito ${
   p4.creditoAprobado() ? "APROBADO" : "RECHAZADO"
} ${p4.creditoAprobado() ? `, por un monto de $${p4.montoAprobado()}` : ""}`;

salida.innerHTML += `<br>${p5.nombre} (C.I.${p5.cedula}): crédito ${
   p5.creditoAprobado() ? "APROBADO" : "RECHAZADO"
} ${p5.creditoAprobado() ? `, por un monto de $${p5.montoAprobado()}` : ""}`;

salida.innerHTML += `<br>${p6.nombre} (C.I.${p6.cedula}): crédito ${
   p6.creditoAprobado() ? "APROBADO" : "RECHAZADO"
} ${p6.creditoAprobado() ? `, por un monto de $${p6.montoAprobado()}` : ""}`;

salida.innerHTML += `<br>El porcentaje de créditos aprobados por el monto completo solicitado es ${casaPrest.porcAprobadosCompleto()}% (${
   casaPrest.cntAprobadosCompleto
} de ${casaPrest.cntSolicitudes})`;

salida.innerHTML += `<br>El porcentaje de créditos que no fueron aprobados por la Casa de Préstamos es ${casaPrest.porcRechazados()}% (${
   casaPrest.cntRechazados
} de ${casaPrest.cntSolicitudes})`;
