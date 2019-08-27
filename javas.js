let appkey="2758a892dc41c877c747bbd011298a26";

let units='imperial';
function searchWeather(searchTerm){
   fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&APPID=${appkey}&units=${units}`).then(result=>{
        return result.json();
    }).then(result=>{
        init(result);
    })
}
function init(resultfromServer){
    console.log(resultfromServer);
    switch(resultfromServer.weather[0].main){
        case 'Clear':
            document.body.style.backgroundImage='url("clearbluesky.jpg")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage='url("cloudy.jpg")';
            break;
        case 'Rain':
            document.body.style.backgroundImage='url("storm.jpg")';
            break;
        case 'Drizzle':
            document.body.style.backgroundImage='url("storm.jpg")';
            break;
        case 'Mist':
            document.body.style.backgroundImage='url("mist.jpg")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage='url("storm.jpg")';
            break;
        case 'Snow':
            document.body.style.backgroundImage='url("snow.jpg")';  
            break;
        default:
            break;
    }
    
    let weatherDescription=document.getElementById('weatherDescriptionHeader');
    let tempElement=document.getElementById('temp');
    let humidityElement=document.getElementById('humidity');
    let cityHeader=document.getElementById('cityheader');
    
    let resultDescription=resultfromServer.weather[0].description;
    weatherDescription.innerText=resultDescription;
    tempElement.innerHTML=resultfromServer.main.temp +"&#176";
    humidityElement.innerHTML='Humidity levels at : ' +resultfromServer.main.humidity +"%";
    cityHeader.innerHTML=resultfromServer.name;
    
}
document.getElementById('searchbtn').addEventListener('click',()=>{
    let searchTerm=document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
})
 