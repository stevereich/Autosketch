var OpenWeather = function(options){
    this.apiKey = (options.apiKey !== "string") ? options.apiKey : null;
    this.lon = (options.lon !== "number") ? options.lon : null;
    this.lat = (options.at !== "number") ? options.lat : null;
    this.zip = (options.zip !== "number") ? options.zip : null;
    this.city = (options.city !== "string") ? options.city : null;
}

OpenWeather.prototype = {
    directionMap: [
        {
            direction: "N",
            rangeLow: 348.75,
            rangeHigh: 11.25
        },
        {
            direction: "NNE",
            rangeLow: 11.25,
            rangeHigh: 33.75
        },
        {
            direction: "NE",
            rangeLow: 33.75,
            rangeHigh: 56.25
        },
        {
            direction: "ENE",
            rangeLow: 56.25,
            rangeHigh: 78.75
        },
        {
            direction: "E",
            rangeLow: 78.75,
            rangeHigh: 101.25
        },
        {
            direction: "ESE",
            rangeLow: 101.25,
            rangeHigh: 123.75
        },
        {
            direction: "SE",
            rangeLow: 123.75,
            rangeHigh: 146.25
        },
        {
            direction: "SSE",
            rangeLow: 146.25,
            rangeHigh: 168.75
        },
        {
            direction: "S",
            rangeLow: 168.75,
            rangeHigh: 191.25
        },
        {
            direction: "SSW",
            rangeLow: 191.25,
            rangeHigh: 213.75
        },
        {
            direction: "SW",
            rangeLow: 213.75,
            rangeHigh: 236.25
        },
        {
            direction: "WSW",
            rangeLow: 236.25,
            rangeHigh: 258.75
        },
        {
            direction: "W",
            rangeLow: 258.75,
            rangeHigh: 281.25
        },
        {
            direction: "WNW",
            rangeLow: 281.25,
            rangeHigh: 303.75
        },
        {
            direction: "NW",
            rangeLow: 303.75,
            rangeHigh: 326.25
        },
        {
            direction: "NNW",
            rangeLow: 326.25,
            rangeHigh: 348.75
        }
    ],
    currentConditions: function(callback) {
        var location = this.zip,
            apiKey = this.apiKey,
            directions = this.directionMap,
            currentWeather = {},
            request = $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather",
                method: "GET",
                data: {
                    APPID: apiKey,
                    zip : location + ",us", // San Antonio AT&T Building
                    units: "imperial"
                },
                dataType: "json"
            });
        request.done(function(data){
            var getDirection = function(deg){
                    for(var i=1;i<directions.length;i++){
                        if(deg >= directions[i].rangeLow && deg <= directions[i].rangeHigh){
                            return directions[i].direction;
                        }
                    }
                },
                parseTime = function(date){
                    var h = (date.getHours() > 12) ? date.getHours() - 12 : date.getHours(),
                        m = date.getMinutes(),
                        ampm = (date.getHours() >= 12) ? "PM" : "AM",
                        zeroPad = function(num){
                            return (num.length == 1) ? "0" + num : num;
                        }
                    return zeroPad(h) + ":" + zeroPad(m) + " " + ampm;
                };
            currentWeather = {
                error: false,
                updated: new Date(data.dt * 1000).toDateString() + " " + new Date(data.dt * 1000).toLocaleTimeString(),
                name: data.name,
                temperature: {
                    current: Math.round(data.main.temp) + "&deg",
                    low: Math.round(data.main.temp_min) + "&deg",
                    high: Math.round(data.main.temp_max) + "&deg"
                },
                conditions: {
                    main: data.weather[0].main,
                    description: data.weather[0].description,
                    icon: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
                    owfIcon: "<i class=\"owf owf-"+data.cod+"\"></i>",
                    cod: data.cod
                },
                barometricPressure: (data.main.pressure * .02953).toFixed(2) + "\" Hg",
                humidity: data.main.humidity + "%",
                visibility: data.visibility.toLocaleString() + " ft",
                clouds: data.clouds.all + "%",
                wind: {
                    speed: Math.round(data.wind.speed) + " mph ",
                    direction: getDirection(data.wind.deg),
                    iconOffset: data.wind.deg - 45
                },
                sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
                sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString()
            };
            if(typeof callback === 'function'){
                callback(currentWeather);
            }
        });
        request.fail(function(jqXHR, textStatus) {
            if(typeof callback === 'function'){
                callback({
                    error: true,
                    message: "Request failed: " + textStatus,
                });
            }
        });
    }
};