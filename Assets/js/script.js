var apiKey = "d1907e69911786cb18b6bcba4e6a1ab6";
var searchButton = $("#searchButton");
var cityInput = $(".cityInput").val();

var urlWeather = "api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + apiKey;

for (var i = 0; i < localStorage.length; i++) {

    var citySearch = localStorage.getItem(i);


    var cityList = $(".list-group").addClass("list-group-item");

    cityList.append("<li>" + citySearch + "</li>");
}
searchButton.onclick = function () {
    if (cityInput == "") {
        console.log(cityInput);
    } else {
        $.ajax({
            url: urlWeather,
            method: "GET",
        }).then(function (response) {
            var cityList = $(".list-group").addClass("list-group-item");
            cityList.append("<li>" + response.name + "</li>");

        })
    }