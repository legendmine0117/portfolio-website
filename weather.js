const API_KEY = config_key.KEY_1


const openAq_url = `https://api.airvisual.com/v2/city?city=New York City&state=New York&country=USA&key=${API_KEY}`
    async function getWeather() {
        const response = await fetch(openAq_url)
        const responseData = await response.json()
        last_updated_time.innerHTML = new Date(responseData.data.current.weather.ts);
        nyc_temperature.innerHTML = responseData.data.current.weather.tp
        nyc_AQI.innerHTML = responseData.data.current.pollution.aqius
        nyc_humidity.innerHTML = responseData.data.current.weather.hu
}
getWeather()


