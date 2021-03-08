var apiKey = "d1907e69911786cb18b6bcba4e6a1ab6";
var searchButton = $("#searchButton");
var cityInput = $(".cityInput").val();

var urlWeather = "api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + apiKey;

for (var i = 0; i < localStorage.length; i++) {

    var citySearch = localStorage.getItem(i);


    var cityList = $(".list-group").addClass("list-group-item");

    cityList.append("<li>" + citySearch + "</li>");
}
searchButton.click(function () {

    var cityInput = $(".cityInput").val();
    var urlWeather = "api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + apiKey;

    if (cityInput == "") {
        console.log(cityInput);
    } else {
        $.ajax({
            url: urlWeather,
            method: "GET",
        }).then(function (response) {
            var cityList = $(".list-group").addClass("list-group-item");
            cityList.append("<li>" + response.name + "</li>");

            var logged = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            var currentWeather = $(".currentWeather").append("<div>").addClass("card-body");
            currentWeather.empty();
            var currentCity = currentWeather.append("<p>");
            currentWeather.append(currentCity);
            //check
            var timeUTC = new Date(response.dt * 1000);
            currentCity.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentCity.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);


            var currentTemp = currentCity.append("<p>");

            currentCity.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");

            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");

            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;


            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {

                var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);

            });
        });
        $.ajax({
            url: urlWeather,
            method: "GET"
        }).then(function (response) {

            var day = [0, 8, 16, 24, 32];
            var fiveDays = $(".fiveDays").addClass("card-body");
            var fiveDaysDiv = $(".dayCard").addClass("card-text");
            fiveDaysDiv.empty();

            day.forEach(function (i) {
                var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

                fiveDaysDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");

            })

        });
    }
});
