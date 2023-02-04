require("colors");
const { guardarDB, leerDB } = require("./helpers/helpDb");
const {
  inquirerMenu,
  pause,
  readInput,
  deleteList,
  confirm,
  listarTareasCheckBox,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";

  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) tareas.cargarTareas(tareasDB);

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const res = await readInput("Descripcion: ");
        tareas.crearTarea(res);
        break;

      case "2":
        tareas.listadoCompleto();
        break;

      case "3":
        tareas.listarPendientesCompletadas();
        break;

      case "4":
        tareas.listarPendientesCompletadas(false);
        break;

      case "5":
        const ids = await listarTareasCheckBox(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await deleteList(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirm("Esta seguro que desea eliminar?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
          break;
        }
    }

    guardarDB(tareas.listadoArr);

    if (opt !== "0") await pause();
  } while (opt !== "0");
};

main();
