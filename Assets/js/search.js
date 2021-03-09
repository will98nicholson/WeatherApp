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