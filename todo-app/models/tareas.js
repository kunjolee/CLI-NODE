require("colors");
const Tarea = require("./tarea");

class Tareas {
  constructor() {
    this._listado = {};
  }

  get listadoArr() {
    /* Listar las tareas pero en forma de arreglo*/
    const listado = Object.keys(this._listado).map((key) => this._listado[key]);
    return listado;
  }

  cargarTareas(tareas = []) {
    tareas.forEach((el) => {
      this._listado[el.id] = el;
    });
  }

  crearTarea(desc) {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((el, i) => {
      console.log(
        `${++i}.`.green,
        `${el.description} :: ${
          el.completadoEn ? "Completada".green : "Pendiente".red
        }`
      );
    });
  }

  listarPendientesCompletadas(completadas = true) {
    let c = 0;
    this.listadoArr.forEach((el) => {
      const { description, completadoEn } = el;

      if (completadas && completadoEn) {
        console.log(`${++c}.`.green, `${description} :: `, completadoEn.green);
      } else if (!completadas && !completadoEn) {
        console.log(`${++c}.`.red, `${description} :: ${"Pendiente".red} `);
      }
    });
  }

  borrarTarea(id) {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toLocaleString();
      }
    });

    //  Todas las tareas que no vengan en el parametro ids las pondre en incompletas
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}
module.exports = Tareas;
