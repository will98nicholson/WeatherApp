class Fetch {
    async getCurrent(input) {
        const apiKey = "3b3b57943ecc5559dd982ec49a44012a";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`
        );

        const data = await response.json();

        console.log(data);

        return data;
    }
}

class UI {
    constructor() {
        this.uiContainer = document.getElementById("5dayweather");
        this.city;
        this.defaultCity = "Columbus";
    }

    populateUI(data) {

        this.uiContainer.innerHTML = `
        
        <div class="card mx-auto mt-5" style="width: 18rem;">
            <div class="card-body justify-content-center">
                <h5 class="card-title">${data.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Highs of ${data.main.temp_max}. Lows of ${data.main.temp_min}</h6>
                <p class="card-text ">In ${data.name}, the current conditons are: ${data.weather[0].description}</p>
                
            </div>
        </div>
        
        
        `;
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

        ui.populateUI(data);

        ui.saveToLS(data);
    });
});

window.addEventListener("DOMContentLoaded", () => {
    const dataSaved = ui.getFromLS();
    ui.populateUI(dataSaved);
});