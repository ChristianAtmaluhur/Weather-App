const APIKey = '8769f4545ea2c79a35ef17dbcec226bc'

const recentSearch = []
const recentContainer = document.querySelector('.recent-container')


const newLocCard = document.querySelector('.new-loc')
const backBtn = document.querySelector('.back-btn')
const setBtn = document.querySelector('.set-btn')
const currentLocationBtn = document.querySelector('.cLocation-btn')
backBtn.addEventListener('click', () => {
    newLocCard.style.display = 'none'
})

setBtn.addEventListener('click', () => {
    newLocCard.style.display = 'block'
})

currentLocationBtn.addEventListener('click', () => {
    getCurrentLocation()
})

// Menentukan Tanggal Sekarang
function currentDate() {
    const month = ['Januari', 'Februari', 'Maret','April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    const date = document.querySelector('.date')

    const d = new Date();
    const dayName = days[d.getDay()];
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = d.getMonth(); 
    const nowDate = `${dayName}, ${dd} ${month[mm]}`;

    date.textContent = nowDate
}

// Mendapatkan Lokasi Sekarang
function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        const p = position.coords;
        playFetch(p, APIKey)
    })
}


// Fetch untuk memanggil API
function playFetch(p, APIKey, inputValue) {
    let used;
    let inputCity = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${APIKey}`
    let currentLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${p.latitude}&lon=${p.longitude}&appid=${APIKey}`

    if(p == '') {
        used = inputCity
        recentSearch.unshift(inputValue)
    } else {
        used = currentLocation
    }

    fetch(used)
    .then(response => response.json())
    .then(data => {
        const {
            name, wind, main, weather, message
        } = data

        if(message) {
            alert(message)
            recentSearch.pop(inputValue)
        } 
        mainFunc(name, wind, main, weather)
        const filterArray = uniq(recentSearch)
        displayRecentSearch(filterArray)
    })
}

// Menampilkan data dari API
function mainFunc(name, wind, main, weather) {
    const cityName = document.querySelector('.city')
        let weatherImg = document.querySelector('.weather-icon')
        const temp = document.querySelector('.temp h1')
        const weatherName = document.querySelector('.weather-name')
        const windSpeed = document.querySelector('.wind')
        const hum = document.querySelector('.hum')

        let tempNum = Math.floor(main.temp / 10)
        let isCelcius = true
        const cBtn = document.querySelector('.c-btn')
        const fBtn = document.querySelector('.f-btn')
        cBtn.style.fontWeight = 700

        cBtn.addEventListener('click', () => {
            cBtn.style.fontWeight = 700
            fBtn.style.fontWeight = 400
            if(!isCelcius) {
                tempNum = (tempNum - 32) * 5 / 9 
                temp.textContent = tempNum
                isCelcius = true
            }
        })

        fBtn.addEventListener('click', () => {
            fBtn.style.fontWeight = 700
            cBtn.style.fontWeight = 400
            if(isCelcius) {
                tempNum = (tempNum * 9 / 5) + 32
                temp.textContent = tempNum
                isCelcius = false
            }
        })

        const time = formatDayNight(new Date)
        switch (weather[0].main) {
            case 'Clear':
                time == 'am'? weatherImg.src = 'img/clear-day.png' : weatherImg.src = 'img/clear-night.png'
                break;``
            case 'Clouds':
                if (weather[0].description == 'broken clouds' || weather[0].description == 'overcast clouds') {
                    weatherImg.src = 'img/overcast.png'
                } else if (time == 'am') {
                    weatherImg.src = 'img/partly-cloudy-day.png'
                } else {
                    weatherImg.src = 'img/partly-cloudy-night.png'
                }
                break;
            case 'Thunderstorm':
                weatherImg.src = 'img/thunderstorm-showers.png'
                break;
            case 'Drizzle':
                weatherImg.src = 'img/heavy-showers.png'
                break;
            case 'Rain':
                weatherImg.src = 'img/showers.png'
                break;
            case 'Snow':
                weatherImg.src = 'img/snow.png'
                break;
            default:
                weatherImg.src = 'img/fog.png'
                break;
        }

        temp.textContent = tempNum
        weatherName.textContent = weather[0].description
        cityName.textContent = name
        windSpeed.textContent = wind.speed
        hum.textContent = main.humidity
}

//Form 
const form = document.querySelector('form')
const input = document.querySelector('form input')

form.addEventListener('submit', e => {
    e.preventDefault()
    playFetch('', APIKey, input.value)
    input.value = ''
})

// function untuk menentukan waktu pagi atau malam
function formatDayNight(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 18 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const  strTime = ampm;
    return strTime;
}

// function untuk menghilangkan value yang sama pada array recentSearch
function uniq(requested) {
    return Array.from(new Set(requested));
}

// funtion untuk menampilkan value array ke recent search
function displayRecentSearch(filterArray) {
    let cardDOM = ''
    for(let i = 0; i < filterArray.length; i++) {
        cardDOM += `
            <div class="recent-card">
                <img src="img/clock line.png">
                <h1>${filterArray[i]}</h1>
            </div>
        `

        if(i > 2) {
            return false
        }
    }
    recentContainer.innerHTML = cardDOM
}

