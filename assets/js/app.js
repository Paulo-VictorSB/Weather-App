
// Variaveis e seleção de elementos
const APIKey = "d87cdc09e60a4ccbf2ff652d28f1432d";

const cityInput = document.querySelector("#btn-cidade");
const searchBtn = document.querySelector("#pesquisar");

const cityElement = document.querySelector("#cidade")
const temperatureElement = document.querySelector("#temperatura span")
const descElement = document.querySelector("#descricao")
const watherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#pais")
const humidityElement = document.querySelector("#umidade span")
const windElement = document.querySelector("#vento span")
const loadingElement = document.querySelector("#loading")
const iframe = document.querySelector('.inframe iframe')

// Funções

const resetClass = document.querySelectorAll(".infos")

const changeBackgroundGradient = (temp) => {
    let colorStart, colorEnd;

    // Defina as cores com base na temperatura
    if (temp <= 0) {
        colorStart = '#00f'; // Azul para temperaturas muito frias
        colorEnd = '#00a'; // Azul escuro
    } else if (temp > 0 && temp <= 10) {
        colorStart = '#7eb6ff'; // Azul claro
        colorEnd = '#e5fafd'; // Azul muito claro
    } else if (temp > 10 && temp <= 20) {
        colorStart = '#7fff00'; // Verde claro
        colorEnd = '#ffeb3b'; // Amarelo
    } else if (temp > 20 && temp <= 30) {
        colorStart = '#ffd700'; // Amarelo
        colorEnd = '#ff6347'; // Laranja
    } else if (temp > 30 && temp <= 40) {
        colorStart = '#ff4500'; // Laranja
        colorEnd = '#ff0000'; // Vermelho
    } else {
        colorStart = '#ff0000'; // Vermelho
        colorEnd = '#b22222'; // Vermelho escuro
    }

    // Aplica o degradê ao fundo da .container
    const container = document.querySelector('.container');
    container.style.background = `linear-gradient(to bottom, ${colorStart}, ${colorEnd})`;
};

const showWeatherData = async (city) => {
    loadingElement.classList.remove('hide');

    try {
        // Obter dados da API
        const data = await getWeatherData(city);
        const temperature = parseInt(data.main.temp);
        changeBackgroundGradient(temperature)
        const latitude = data.coord.lat
        const longitude = data.coord.lon

        // Exibir os dados
        cityElement.innerHTML = data.name;
        temperatureElement.innerHTML = parseInt(data.main.temp)
        descElement.innerHTML = data.weather[0].description;
        watherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        humidityElement.innerHTML = `${data.main.humidity}%`;
        countryElement.src = `https://flagsapi.com/${data.sys.country}/flat/64.png`;
        windElement.innerHTML = `${data.wind.speed}Km/h`;
        iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.901384757054!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c2a306c9c66d47%3A0x450bd93f68fbb30e!2sLocal%20Exemplo!5e0!3m2!1spt-BR!2sbr!4v1632323349694!5m2!1spt-BR!2sbr`

    } catch (error) {
        console.error("Erro ao buscar os dados do clima:", error);
        alert('Não foi possível buscar os dados do clima. Tente novamente.');
    } finally {
        // Esconder o estado de loading quando os dados forem exibidos
        loadingElement.classList.add('hide');
        resetClass.forEach(element => {
            if(element.classList.contains('hide')){
                element.classList.toggle('hide')
            }
        });
    }
}

const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=pt_br`;

        const res = await fetch(apiWeatherURL)
        const data = await res.json()

    return data
}

// Eventos

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault()

    const cidade = cityInput.value;
    
    if(cidade != ''){
        showWeatherData(cidade)
    }
})
    
cityInput.addEventListener('keyup', (e)=>{
    if(e.code === 'Enter'){
        const city = e.target.value
        const cidade = cityInput.value;
    
        if(cidade != ''){
            showWeatherData(cidade)
        }
}})