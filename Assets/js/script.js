
class Fetch {
    async getCurrent(input) {
        const apiKey = "3b3b57943ecc5559dd982ec49a44012a";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=imperial`
        );

        const data = await response.json();

        console.log(data);

        return data;
    }
    async getForecast(res) {
        const apiKey = "3b3b57943ecc5559dd982ec49a44012a";
        console.log(res);
        const lat = res.coord.lat
        const lon = res.coord.lon
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}&units=imperial`
        );

        const data = await response.json();
        data.name = res.name
        console.log(data);

        return data;

    }
}

class UI {
    constructor() {
        this.uiContainer = document.getElementById("currentWeather");
        this.uiForecastContainer = document.getElementById("5dayweather")
        this.city;
        this.defaultCity = "Columbus";
    }

    populateUI(data) {
        console.log(data);
        console.log(data.current.dt);
        console.log(new Date(data.current.dt * 1000).toDateString())
        this.uiContainer.innerHTML = `
        
        <div class="card mx-auto mt-5" style="width: 18rem;">
            <div class="card-body justify-content-center">
                <h5 class="card-title">${data.name}</h5>
                <img src="http://openweathermap.org/img/w/${data.current.weather[0].icon}.png"></img>
                <h6 class="card-subtitle mb-2 text-muted">Highs of ${data.daily[0].temp.max}. Lows of ${data.daily[0].temp.min}</h6>
                <p class="card-text ">In ${data.name}, the current conditons are: ${data.daily[0].weather[0].description}</p>
                
            </div>
        </div>
        `;
        for (let i = 1; i < 6; i++) {
            this.uiForecastContainer.innerHTML += `
        
        <div class="card mx-auto mt-5" style="width: 18rem;">
            <div class="card-body justify-content-center">
                <h5 class="card-title">${new Date(data.daily[i].dt * 1000).toDateString()}</h5>
                <img src="http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png"></img>
                <h6 class="card-subtitle mb-2 text-muted">Highs of ${data.daily[i].temp.max}. Lows of ${data.daily[i].temp.min}</h6>
                <p class="card-text ">On ${data.name}, the current conditons are likely to be: ${data.daily[i].weather[0].description}</p>
                
            </div>
        </div>
        `;

        }
    }

    clearUI() {
        uiContainer.innerHTML = "";
    }

    saveToLS(data) {
        localStorage.setItem("city", JSON.stringify(data));
    }

    getFromLS() {
        if (localStorage.getItem("city" == null)) {
            return this.defaultCity;
        } else {
            this.city = JSON.parse(localStorage.getItem("city"));
        }

        return this.city;
    }

    clearLS() {
        localStorage.clear();
    }
}

const ft = new Fetch();
const ui = new UI();

const search = document.getElementById("typeCity");
const button = document.getElementById("searchButton");
button.addEventListener("click", () => {
    const currentVal = search.value;

    ft.getCurrent(currentVal).then((data) => {
        ft.getForecast(data).then((forecastData) => {
            ui.populateUI(forecastData);

            ui.saveToLS(forecastData);
        })
    });
});

// window.addEventListener("DOMContentLoaded", () => {
//     const dataSaved = ui.getFromLS();
//     ui.populateUI(dataSaved);
// });


for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);

    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}