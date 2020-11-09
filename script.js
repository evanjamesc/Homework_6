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

        //console.log(response);

        // 5-day:
        // Date
        function getDate(dateIndex) {
            let unix_timestamp = response.list[dateIndex].dt;
            console.log(unix_timestamp);
            let date = new Date(unix_timestamp * 1000);
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let year = date.getFullYear();
            let dateStr = month + "/" + day + "/" + year;
            return dateStr;
        }
        // console.log(getDate(0));
        // console.log(getDate(8));
        // console.log(getDate(16));
        // console.log(getDate(24));

        // Weather condition img
        function getWeatherIcon(dateIndex) {
            let weatherIcon = response.list[dateIndex].weather[dateIndex].icon;
            return weatherIcon;
        }
        //$("#testingDiv").append("<img src='http://openweathermap.org/img/wn/" + getWeatherIcon(0) + "@2x.png'>")

        // Temp (F)
        function getTemp(dateIndex) {
            let temperature = toFar(response.list[dateIndex].main.temp) + "\xB0 F";
            return temperature;
        }
        //console.log(getTemp(0));

        // Humidity
        function getHumidity(dateIndex) {
            let humidity = response.list[dateIndex].main.humidity + "%";
            return humidity;
        }
        console.log(getHumidity(0));

        // Get latitude and longitude for One Call Weather API to find current weather
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