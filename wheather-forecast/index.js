require('dotenv').config()

const axios =  require('axios');

const apiKey = process.env.API_KEY
const city = 'Jakarta'
const units = 'metric'

const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(url)
.then(response => {
    const data = response.data
    const forecast = {}

    data.list.forEach(element => {
        const date = element.dt_txt.split(' ')[0]

        if (!forecast[date]) {
            forecast[date] = {
              temperature: element.main.temp
            };
          }
    });

    console.log(`Weather Forecast :`);
    Object.keys(forecast).slice(0, 5).forEach(date => {
        const dateObj = new Date(date);
        const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const formattedDate = date.split('-').join(' ');

        console.log(`${day}, ${formattedDate}: ${forecast[date].temperature}°C`);
    });
})
.catch(err => {
    console.error('Error fetching weather data:', err);
})