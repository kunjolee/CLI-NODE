const fs = require("fs");
const axios = require("axios");

class Busquedas {
  constructor() {
    this.historial = [];
    this.dbPath = "./db/db.json";
    this.leerDB();
  }

  get historyCapitalized() {
    return this.historial.map((el) => {
      let palabras = el.split(" ");

      palabras = palabras.map((p) => p[0].toUpperCase() + p.slice(1));

      return palabras.join(" ");
    });
  }
  get paramsMapbox() {
    return {
      limit: 5,
      access_token: process.env.MAPBOX,
      language: "es",
    };
  }

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_key,
      lang: "es",
      units: "metric",
    };
  }

  async ciudad(lugar) {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });
      const res = await instance.get();

      const placesInformation = res.data.features.map((el) => ({
        name: el.place_name,
        id: el.id,
        lng: el.center[0],
        lat: el.center[1],
      }));

      return placesInformation;
    } catch (error) {
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5/weather",
        params: { ...this.paramsWeather, lat, lon },
      });

      const res = await instance.get();
      const { weather, main } = res.data;
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (err) {
      console.log("Estas imprimiendo el error entonces?", err);
    }
  }

  agregarHistorial(lugar) {
    if (this.historial.includes(lugar.toLowerCase())) return;

    this.historial.unshift(lugar.toLowerCase());

    this.historial = this.historial.splice(0, 5);

    this.guardarDB();
  }

  guardarDB() {
    const data = {
      historial: this.historial,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(data));
  }

  leerDB() {
    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const data = JSON.parse(info);

    this.historial = data.historial;
  }
}

module.exports = Busquedas;
