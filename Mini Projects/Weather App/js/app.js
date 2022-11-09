var cityDetails = {};
const searchForm =  document.querySelector('.change-location');
const details = document.querySelector(".details");
const card = document.querySelector('.card');
const time = document.querySelector('.time');
const img =  document.querySelector(".icon img");


const getCityDetails = async (cityName) =>
{
    let cityInfo =  await getCityInfo(cityName);
    let cityWeather =  await getCityWeather(cityInfo[0].Key);

    let obj = { info : cityInfo[0] , weather : cityWeather[0]};
    return obj;
}

const updateUI = (cityDetails)=>
{
    let info = cityDetails.info;
    let weather = cityDetails.weather;
    details.innerHTML = `
    <h5 class="my-3"> ${ info.EnglishName } </h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span> ${weather.Temperature.Metric.Value} </span>
      <span>&deg;C</span>
    </div>
    `

   if(card.classList.contains("d-none"))
   {
        card.classList.remove('d-none');
   }

   let dayTimeSrc =  weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
   time.setAttribute("src", dayTimeSrc);

   let imgSrc =  `img/icons/${weather.WeatherIcon}.svg`
   img.setAttribute("src", imgSrc);


}


searchForm.addEventListener("submit", (e)=>
{
    e.preventDefault();

    let cityName = searchForm.city.value.trim();
    searchForm.reset();
    if(cityName.length == 0)
    {
        console.error("your search is empty, please try with a real city name");
        return;
    }

    const response = getCityDetails(cityName).then((data)=>
    {
        updateUI(data);
    }).catch((err)=>
    {
        let toast = document.querySelector(".toast");
        toast.classList.remove('d-none');
        $('.toast').toast('show');
    });
})

