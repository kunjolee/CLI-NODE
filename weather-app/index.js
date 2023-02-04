require("dotenv").config();

const {
  inquirerMenu,
  pause,
  readInput,
  listarLugares,
} = require("./helpers/inquirer");

const Busquedas = require("./models/busquedas");

const main = async () => {
  const busquedas = new Busquedas();
  opt = 0;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // Mostrar mensaje
        const termino = await readInput("Ciudad: ");
        // Buscar los lugares
        const lugares = await busquedas.ciudad(termino);
        // Seleccionar el lugar
        const id = await listarLugares(lugares);
        const lugarSel = lugares.find((el) => id === el.id);

        // Agregar historial
        busquedas.agregarHistorial(lugarSel.name);
        // Clima
        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
        // Mostrar resultados

        if (lugarSel) {
          process.stdout.write("\u001b[2J\u001b[0;0H");
          console.log("\nInformación de la ciudad\n".green);
          console.log("Ciudad: ", lugarSel.name.green);
          console.log("Lat: ", lugarSel.lat);
          console.log("Lng: ", lugarSel.lng);
          console.log("Temperatura: ", clima.temp);
          console.log("Mínima: ", clima.min);
          console.log("Máxima: ", clima.max);
          console.log("El clima se ve como: ", clima.desc.green);
        } else {
          console.log("No selecciono ninguna ciudad");
        }

        break;

      case 2:
        busquedas.historyCapitalized.forEach((el, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${el}`);
        });
        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
