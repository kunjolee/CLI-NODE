require(`colors`);

const showMenu = () => {
  return new Promise((resolve) => {
    process.stdout.write(`\u001b[2J\u001b[0;0H`);
    console.log("=============================".green);
    console.log("    Seleccione una opcion".green);
    console.log("=============================\n".green);
    console.log(`${"1.".green} Crear tarea`);
    console.log(`${"2.".green} Listar tareas`);
    console.log(`${"3.".green} Listar tareas completadas`);
    console.log(`${"4.".green} LIstar tareas pendientes`);
    console.log(`${"5.".green} Completar tarea(s)`);
    console.log(`${"6.".green} Borrar tarea`);
    console.log(`${"5.".green} Salir`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Ingrese su opción: ", (option) => {
      readline.close();

      resolve(option);
    });
  });
};

const pause = async () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPresione ${"ENTER".green} para continuar\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  showMenu,
  pause,
};
