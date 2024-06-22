const input= document.querySelector(".type");
const btn= document.querySelector(".search");
const firstDay= document.getElementById("firstDay")
const firstCardDate= document.getElementById("firstCardDate")
const country= document.getElementById("country")
const cardTitle= document.querySelector(".card-title")
const theIcon= document.querySelector(".text-warning")





btn.addEventListener("click" , function(){
    const res=input.value
    console.log(res);
    getData(res)
    
    
})

// basic location when i open the site
async function getBasicLoc(){
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=34e33b010a604f9296c190337241206&q=damanhour&days=3&aqi=no&alerts=no`)
  const data= await response.json() 
  // console.log(data);
  displayFirstDay(data)
  displaySecDay(data)
  displayThirdDay(data)

}
getBasicLoc()



// get dynamic location from user
async function getData(res){
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=34e33b010a604f9296c190337241206&q=${res}&days=3&aqi=no&alerts=no`)
  const data= await response.json() 
  console.log(data);
  displayFirstDay(data)
  displaySecDay(data)
  displayThirdDay(data)

}

// show first day data
function displayFirstDay(data){
  const firstDate= data.current.last_updated;
  const date= new Date(firstDate)
  const day= date.toLocaleString('en-us',{weekday:"long"})
  // console.log(day);
  const dayOfMonth= date.getDate();
  // console.log(dayOfMonth);
  const month= date.toLocaleString('en-us',{month:"long"})
  // console.log(month);
  firstDay.innerHTML= day;
  firstCardDate.innerHTML= `${dayOfMonth} ${month}`
  const city= data.location.name
  country.innerHTML= city

  const theCardTitle= data.current.temp_c+" C"
  cardTitle.innerHTML=theCardTitle

  
  theIcon.setAttribute('src', data.current.condition.icon)



  const theWeather= document.querySelector(".theWeather")
  const shadow= document.getElementById("shadow")
  const wind= document.getElementById("wind")
  const compass= document.getElementById("compass")


  const theDayWeather= data.current.condition.text
  theWeather.innerHTML= theDayWeather

  const theShadow= data.current.humidity  
  shadow.innerHTML= theShadow

  const theWind=data.current.wind_kph  
  wind.innerHTML= theWind

  const theCompass= data.current.wind_dir
  compass.innerHTML= theCompass
  
  
}

function displaySecDay({forecast}){
  const secondDay= document.getElementById("secondDay")
  secondDay.innerHTML= new Date(forecast.forecastday[1].date).toLocaleString("en-us",{weekday:'long'})


  const secondIcon= document.getElementById("secondIcon")
  secondIcon.setAttribute("src", forecast.forecastday[1].day.condition.icon);

  const tempMax= document.getElementById("tempMax")
  tempMax.innerHTML= forecast.forecastday[1].day.maxtemp_c+" C"

  const tempMin= document.getElementById("tempMin")
  tempMin.innerHTML= forecast.forecastday[1].day.mintemp_c

  const secondWeather= document.getElementById("secondWeather")
  secondWeather.innerHTML= forecast.forecastday[1].day.condition.text


}

// show third day data
function displayThirdDay({forecast}){
  const thirdDay= document.getElementById("thirdDay")
  thirdDay.innerHTML= new Date(forecast.forecastday[2].date).toLocaleString("en-us",{weekday:'long'})


  const thirdIcon= document.getElementById("thirdIcon")
  thirdIcon.setAttribute("src", forecast.forecastday[2].day.condition.icon);

  const tempMax3= document.getElementById("tempMax3")
  tempMax3.innerHTML= forecast.forecastday[2].day.maxtemp_c+" C"

  const tempMin3= document.getElementById("tempMin3")
  tempMin3.innerHTML= forecast.forecastday[2].day.mintemp_c

  const thirdWeather= document.getElementById("thirdWeather")
  thirdWeather.innerHTML= forecast.forecastday[2].day.condition.text


}


