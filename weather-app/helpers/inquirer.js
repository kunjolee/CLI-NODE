const inquirer = require("inquirer");
require("colors");

const questions = [
  {
    type: "list",
    name: "option",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: 1,
        name: `${"1".green}. Buscar ciudad`,
      },
      {
        value: 2,
        name: `${"2".green}. Historial`,
      },
      {
        value: 0,
        name: `${"0".green}. Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  process.stdout.write("\u001b[2J\u001b[0;0H");

  console.log("========================".green);
  console.log("Seleccione una opcion".white);
  console.log("========================".green);

  const { option } = await inquirer.prompt(questions);

  return option;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "pause",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];

  console.log("\n");

  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "value",
      message,
      validate(value) {
        if (value.length === 0) return "Tiene que ingresar un valor";

        return true;
      },
    },
  ];

  const { value } = await inquirer.prompt(question);

  return value;
};

const listarLugares = async (lugares = []) => {
  let c = 0;

  const choices = lugares.map((lugar) => {
    const idx = `${++c}.`.green;
    return {
      value: lugar.id,
      name: `${idx} ${lugar.name}`,
    };
  });

  choices.unshift({
    value: 0,
    name: "0. ".green + "Cancelar",
  });

  const question = [
    {
      type: "list",
      name: "id",
      message: "Coincidencias con su busqueda",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(question);

  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);

  return ok;
};

const listarTareasCheckBox = async (tareas = []) => {
  const choices = tareas.map((tarea) => ({
    value: tarea.id,
    name: tarea.description,
    checked: tarea.completadoEn ? true : false,
  }));

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione su opcion",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listarLugares,
  confirm,
  listarTareasCheckBox,
};
