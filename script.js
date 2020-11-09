// Function to convert degrees Kelvin to degrees Farenheit
function toFar(degreesKelvin) {
    let degreesFar = Math.floor(((degreesKelvin - 273.15) * (9 / 5) + 32));
    return degreesFar;
}

// Function to convert windspeed from meters/second to miles/hour
function toMPH(windSpeed) {
    return (windSpeed * 2.2369).toFixed(2);
}

function weatherAPICall(cityName) {

    let apiKey = "d3072320e04803d944e7b8f07bb0cdd9";

    let queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&mode=json&appid=" + apiKey;

    $.ajax({
        url: queryURLForecast,
        method: "GET"
    }).then(function (response) {

        // 5-day:
        // Date
        function getDate(dateIndex) {
            let unix_timestamp = response.list[dateIndex].dt;
            let date = new Date(unix_timestamp * 1000);
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let year = date.getFullYear();
            let dateStr = month + "/" + day + "/" + year;
            return dateStr;
        }
        // Send date to html
        for (let i = 0; i < 5; i++) {
            $("#day" + (i + 1) + "Date").text(getDate(i * 8));
        }

        // Weather condition img
        function getWeatherIcon(dateIndex) {
            let weatherIcon = response.list[dateIndex].weather[0].icon;
            return "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
        }
        // Send weather icons to html
        for (i = 0; i < 5; i++) {
            $("#day" + (i + 1) + "Icon").attr("src", getWeatherIcon(i * 8));
        }

        // Temp (F)
        function getTemp(dateIndex) {
            let temperature = toFar(response.list[dateIndex].main.temp) + "\xB0 F";
            return temperature;
        }
        for (let i = 0; i < 5; i++) {
            $("#day" + (i + 1) + "Temp").text("Temperature: " + getTemp(i * 8));
        }
        //console.log(getTemp(0));

        // Humidity
        function getHumidity(dateIndex) {
            let humidity = response.list[dateIndex].main.humidity + "%";
            return humidity;
        }
        for (let i = 0; i < 5; i++) {
            $("#day" + (i + 1) + "Humidity").text("Humidity: " + getHumidity(i * 8));
        }
        //console.log(getHumidity(0));

        // Get latitude and longitude for One Call Weather API to find current weather
        let latitude = response.city.coord.lat;
        let longitude = response.city.coord.lon;

        function weatherAPIOneCall(latitude, longitude) {

            let queryURLCurrent = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,daily&appid=" + apiKey;

            $.ajax({
                url: queryURLCurrent,
                method: "GET"
            }).then(function (response) {

                // Current weather

                // Date
                function getCurrentDate() {
                    let unix_timestamp = response.current.dt;
                    let date = new Date(unix_timestamp * 1000);
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    let year = date.getFullYear();
                    let dateStr = month + "/" + day + "/" + year;
                    return dateStr;
                }
                $("#currentDate").text(cityName + " " + getCurrentDate() + "    ");

                // Weather Icon
                let currentWeatherIcon = "http://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png";
                // Append weather icon to current date
                $("#currentDate").append("<img src=" + currentWeatherIcon + ">");

                // Temp F
                let currentTemp = toFar(response.current.temp) + "\xB0 F";
                $("#currentTemp").text(currentTemp);

                // Humidity
                let currentHumidity = response.current.humidity + "%";
                $("#currentHumidity").text(currentHumidity);

                // Wind speed (mph)
                let currentWindSpeed = toMPH(response.current.wind_speed) + " mph";
                $("currentWindSpeed").text(currentWindSpeed);

                // UV index
                let currentUVI = response.current.uvi;
                $("#currentUVI").text(currentUVI);
                // Adjust UVI div background color according to conditions
                if (currentUVI < 2) {
                    $("#currentUVI").css("background-color", "green");
                } else if (currentUVI >= 2 && currentUVI < 6) {
                    $("#currentUVI").css("background-color", "yellow");
                } else if (currentUVI >= 6 && currentUVI < 8) {
                    $("#currentUVI").css("background-color", "orange");
                } else if (currentUVI >= 8 && currentUVI <= 10) {
                    $("#currentUVI").css("background-color", "red");
                } else if (currentUVI > 10) {
                    $("#currentUVI").css("background-color", "purple");
                }

            });
        }

        weatherAPIOneCall(latitude, longitude);

    });

}

weatherAPICall("Minneapolis");

$("#cityButton").on("click", function () {
    // Struggling to make this work
    weatherAPICall($("#cityInput").val());

});