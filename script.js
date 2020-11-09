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

        // 5-day:
        // Date
        // Weather condition img
        // Temp (F)
        // Humidity

        // console.log(response);
        let latitude = response.city.coord.lat;
        let longitude = response.city.coord.lon;

        function weatherAPIOneCall(latitude, longitude) {

            let queryURLCurrent = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,daily&appid=" + apiKey;

            $.ajax({
                url: queryURLCurrent,
                method: "GET"
            }).then(function (response) {

                console.log(response);

                // Current weather
                // Temp F
                // Humidity
                // Wind speed (mph)
                // UV index

            });
        }

        weatherAPIOneCall(latitude, longitude);

    });

}

weatherAPICall("River Falls");