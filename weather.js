const API_KEY = config_key.KEY_1

 states_list = [
	'Alabama',        'Alaska',        'Arizona',
	'Arkansas',       'California',    'Colorado',
	'Connecticut',    'Delaware',      'Florida',
	'Georgia',        'Hawaii',        'Idaho',
	'Illinois',       'Indiana',       'Iowa',
	'Kansas',         'Kentucky',      'Louisiana',
	'Maine',          'Maryland',      'Massachusetts',
	'Michigan',       'Minnesota',     'Mississippi',
	'Missouri',       'Montana',       'Nebraska',
	'Nevada',         'New Hampshire', 'New Jersey',
	'New Mexico',     'New York',      'North Carolina',
	'North Dakota',   'Ohio',          'Oklahoma',
	'Oregon',         'Pennsylvania',  'Rhode Island',
	'South Carolina', 'South Dakota',  'Tennessee',
	'Texas',          'Utah',          'Vermont',
	'Virginia',       'Washington',    'Washington, D.C.',
	'West Virginia',  'Wisconsin',     'Wyoming'
  ]

let cities_list=[]
const select_state = document.getElementById("selectState")

// generate state drop down list from states_list array
for(let i=0;i<states_list.length;i++){
    let state = states_list[i]
    let el = document.createElement("option")
    el.textContent = state
    el.value = state
    select_state.add(el)
}

// generate city drop down list using state selected from state drop down list
let state_selected
selectState.onchange = async function(){
	cities_list = []
	state_selected = select_state.value
	await getCityList()
	generateDropDownCityList()
}
	

// calling API to get city list
async function getCityList() {
        const response = await fetch(`http://api.airvisual.com/v2/cities?state=${state_selected}&country=USA&key=${API_KEY}`)
        const responseData_cities = await response.json()
		if(!response.ok){
			console.log('there is a problem 1')
		}
		for(let i=0;i<responseData_cities.data.length;i++){
			cities_list.push (responseData_cities.data[i].city)
		  }
}



function generateDropDownCityList(){
	select_city.length=1  //remove previous generated cities
	for(let i=0;i<cities_list.length;i++){
		let city = cities_list[i]
		let el = document.createElement("option")
		el.textContent = city
		el.value = city
		select_city.add(el)		
	}
}

// use city and state to call API to get weather data
let select_city = document.getElementById("selectCity")
let city_selected
selectCity.onchange = function(){
    city_selected = select_city.value
	getWeather()
}

	
async function getWeather() {
    const response = await fetch(`http://api.airvisual.com/v2/city?city=${city_selected}&state=${state_selected}&country=USA&key=${API_KEY}`)
 	const responseData_city = await response.json()
	 if(!response.ok){
		console.log('there is a problem 2')
	}
    last_updated_time.innerHTML = new Date(responseData_city.data.current.weather.ts);
    city_temperature_celsius.innerHTML = responseData_city.data.current.weather.tp
	city_temperature_fahrenheit.innerHTML = Math.round((city_temperature_celsius.innerHTML * 1.8) + 32)
    city_AQI.innerHTML = responseData_city.data.current.pollution.aqius
	city_humidity.innerHTML = responseData_city.data.current.weather.hu
	city_windSpeed.innerHTML = responseData_city.data.current.weather.ws
	city_coordinates_longitude.innerHTML = responseData_city.data.location.coordinates[0]
	city_coordinates_latitude.innerHTML = responseData_city.data.location.coordinates[1]
	weather_at_city_state.innerHTML =` at ${city_selected}, ${state_selected} is here!`
}




