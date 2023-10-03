date = dayjs();

function fetchStartUp(){
    var  defaultUrl = "https://api.openweathermap.org/data/2.5/forecast?q=San-Antonio&cnt=41&units=Imperial&appid=acf3ea10facd01c4dc6de3076424a517";



    fetch(defaultUrl)
    .then((response) => response.json())
    .then((data) =>  startUp(data));

}
//Jquery Handles for Header Weather report
var cityHeader = $('#cityHeader');
var tempHeader = $('#tempHeader');
var windHeader = $('#windHeader');
var humidHeader = $('#humidHeader');

//Default to San Antonio Weather
function startUp(weather){
    //Delete once complete
    console.log(weather.city.name);
    console.log(weather);
    
    
    cityHeader.text(weather.city.name + " " + date.format('M/D/YYYY'));    tempHeader.text("Temp: " + weather.list[0].main.temp + "  °F");
    windHeader.text("Wind: " + weather.list[0].wind.speed + " MPH");
    humidHeader.text("Humidity: " + weather.list[0].main.humidity + " %");
    console.log(weather.list[0].main.humidity + " %");

    for(var i = 1; i < 5;i++ ){
    
    var nextDate = date.add(i, 'day');
    console.log("These are the next 5 dates: " + nextDate.format("M/D/YYYY"));
        var dateHandle = $('#date-'+i);
        var tempHandle = $('#temp-'+i);
        var windHandle = $('#wind-'+i);
        var humidHandle = $('#humid-'+i);

        dateHandle.text(nextDate.format('M/D/YYYY'));
        tempHandle.text("Temp: " + weather.list[i*8].main.temp + "  °F");
        windHandle.text("Wind: " + weather.list[i*8].wind.speed + " MPH");
        humidHandle.text("Humidity: " + weather.list[i*8].main.humidity + " %");
    }

    var dateHandleLast = $('#date-5');
    var tempHandleLast = $('#temp-5');
    var windHandleLast = $('#wind-5');
    var humidHandleLast = $('#humid-5');

        var finalDate = date.add(5,'day');

        dateHandleLast.text(finalDate.format('M/D/YYYY'));
        tempHandleLast.text("Temp: " + weather.list[39].main.temp + "  °F");
        windHandleLast.text("Wind: " + weather.list[39].wind.speed + " MPH");
        humidHandleLast.text("Humidity: " + weather.list[39].main.humidity + " %");
};

fetchStartUp();

var searchBtn = $('#searchBtn');
var userInput = $('#cityName');

searchBtn.click(function(){
    var location = userInput.val();
    console.log(location);
    userInput.text(" ");
    
    //return location;

    fetchCoords(location);
});

function getCoords(weather){
    console.log(weather);
    var coords= [weather.city.coord.lat, weather.city.coord.lon];
    console.log(coords[0] + "long: " + coords[1]);

    fetchWeather(coords);
};


function fetchCoords(location){
    var  getCordsUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+ location + "&cnt=41&units=Imperial&appid=acf3ea10facd01c4dc6de3076424a517";

    fetch(getCordsUrl)
    .then((response) => response.json())
    .then((data) =>  getCoords(data));

}


function fetchWeather(coords){

    var userUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + coords[0] + "&lon=" + coords[1]+ "&units=imperial&appid=acf3ea10facd01c4dc6de3076424a517";
    fetch(userUrl)
    .then((response) => response.json())
    .then((data) => renderWeather(data));
}

function renderWeather(weather){
    cityHeader.text(weather.city.name);
    tempHeader.text("Temp: " + weather.list[0].main.temp + "  °F");
    windHeader.text("Wind: " + weather.list[0].wind.speed + " MPH");
    humidHeader.text("Humidity: " + weather.list[0].main.humidity + " %");
    console.log(weather.list[0].main.humidity + " %");

    for(var i = 1; i < 5;i++ ){
    
    var nextDate = date.add(i, 'day');
    console.log("These are the next 5 dates: " + nextDate.format("M/D/YYYY"));
        var dateHandle = $('#date-'+i);
        var tempHandle = $('#temp-'+i);
        var windHandle = $('#wind-'+i);
        var humidHandle = $('#humid-'+i);

        dateHandle.text(nextDate.format('M/D/YYYY'));
        tempHandle.text("Temp: " + weather.list[i*8].main.temp + "  °F");
        windHandle.text("Wind: " + weather.list[i*8].wind.speed + " MPH");
        humidHandle.text("Humidity: " + weather.list[i*8].main.humidity + " %");
    }

    var dateHandleLast = $('#date-5');
    var tempHandleLast = $('#temp-5');
    var windHandleLast = $('#wind-5');
    var humidHandleLast = $('#humid-5');

    var finalDay = date.add(5,'day');
    dateHandleLast.text(finalDay.format('M/D/YYYY'));
    console.log(finalDay.format('M/D/YYYY'));
    tempHandleLast.text("Temp: " + weather.list[39].main.temp + "  °F");
    windHandleLast.text("Wind: " + weather.list[39].wind.speed + " MPH");
    humidHandleLast.text("Humidity: " + weather.list[39].main.humidity + " %");
}