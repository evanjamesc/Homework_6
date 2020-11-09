$("#testingDiv").text("TESTING");

// Function to convert degrees Kelvin to degrees Farenheit
function toFar(degreesKelvin) {
    let degreesFar = ((degreesKelvin - 273.15) * (9 / 5) + 32).toFixed(2);
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

        //console.log(response);

        // 5-day:
        // Date
        let unix_timestamp = response.list[0].dt;
        console.log(unix_timestamp);
        let date = new Date(unix_timestamp * 1000);
        let dateDay = date.getDate();
        let dateStr = dateDay + "/";
        console.log(dateStr);
        // Weather condition img
        // Temp (F)
        // Humidity

        let latitude = response.city.coord.lat;
        let longitude = response.city.coord.lon;

        function weatherAPIOneCall(latitude, longitude) {

            let queryURLCurrent = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,daily&appid=" + apiKey;

            $.ajax({
                url: queryURLCurrent,
                method: "GET"
            }).then(function (response) {

                //console.log(response);

                // Current weather
                // Temp F
                let currentTemp = toFar(response.current.temp) + "\xB0 F";
                //console.log(currentTemp);
                // Humidity
                let currentHumidity = response.current.humidity + "%";
                //console.log(currentHumidity);
                // Wind speed (mph)
                let currentWindSpeed = toMPH(response.current.wind_speed) + " mph";
                //console.log(currentWindSpeed);
                // UV index
                let currentUVI = response.current.uvi;
                //console.log(currentUVI);
            });
        }

        weatherAPIOneCall(latitude, longitude);

    });

}

weatherAPICall("River Falls",);