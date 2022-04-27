// Tanggal
const month = ['Januari', 'Februari', 'Maret','April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

const date = document.querySelector('.date')

const d = new Date();
const dayName = days[d.getDay()];
const dd = String(d.getDate()).padStart(2, '0');
const mm = d.getMonth(); 
const nowDate = `${dayName}, ${dd} ${month[mm]}`;

date.textContent = nowDate

// Mendapatkan Lokasi Sekarang
navigator.geolocation.getCurrentPosition((position) => {
    const p = position.coords;
    const APIKey = '8769f4545ea2c79a35ef17dbcec226bc'


    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${p.latitude}&lon=${p.longitude}&appid=${APIKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const {
            name, wind, main, weather
        } = data


        
        const cityName = document.querySelector('.city')
        let weatherImg = document.querySelector('.weather-icon')
        const temp = document.querySelector('.temp h1')
        const weatherName = document.querySelector('.weather-name')
        const windSpeed = document.querySelector('.wind')
        const hum = document.querySelector('.hum')

        // Ganti ke Switch 
        // Dikondisikan lagi siang dan malam
        if (weather[0].main == 'Clouds') {
            weatherImg.src = 'img/partly-cloudy-day.png'
        } else if (weather[0].main == 'Thunderstorm') {
            weatherImg.src = 'img/thunderstorm-showers.png'
        } else if (weather[0].main == 'Drizzle') {
            weatherImg.src = 'img/heavy-showers.png'
        } else if (weather[0].main == 'Rain') {
            weatherImg.src = 'img/showes.png'
        } else if (weather[0].main == 'Snow') {
            weatherImg.src = 'img/snow.png'
        } else {
            weatherImg.src = 'img/fog.png'
        }
        
        temp.textContent = Math.floor(main.temp / 10) 
        weatherName.textContent = weather[0].description
        cityName.textContent = name
        windSpeed.textContent = wind.speed
        hum.textContent = main.humidity
    })
})






