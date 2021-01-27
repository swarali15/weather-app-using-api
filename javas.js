let appkey="1d8c2d45c9ac41e5ce1adaed96d5b735";
let units='imperial';


const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));
function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
    
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.searchControl');
const suggestions = document.querySelector('.suggestions');
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

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


 

 
 
