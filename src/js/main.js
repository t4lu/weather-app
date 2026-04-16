import { GEO_URL, WEATHER_URL } from "./config.js";

async function getWeatherByCity(city) {
    try {
        const geoResponse = await fetch(
            `${GEO_URL}?name=${city}&count=1`
        );
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            console.log("Cidade não encontrada");
            return
        }
        const { latitude, longitude, name, country } = geoData.results[0];

        const weatherResponse = await fetch(
            `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`
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