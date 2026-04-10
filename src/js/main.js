import { getWeather } from "./api/weatherApi.js";
import { renderWeather } from "./ui/render.js";

async function getWeatherByCity(city) {
    try {
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            console.log("Cidade não encontrada");
            return
        }
        const { latitude, longitude, name, country } = geoData.results[0];

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const weatherData = await weatherResponse.json();

        const temperature = weatherData.current_weather.temperature;

        console.log(`Clima em ${name}, ${country}: `);
        console.log(`Temperatura: ${temperature}°C`);
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
    }
}

getWeatherByCity("São Paulo");

/*
async function handleSearch(city) {
    const data = await getWeather(city);
    renderWeather(data);
}*/