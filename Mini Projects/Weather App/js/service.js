
const getCityInfo =  async (cityName)=>
{
    let queryParam = `?apikey=${apiKey}&q=${cityName}`
    let response =  await fetch(citiesUrl + queryParam);
    let data =  await response.json();
    return data;
}

const getCityWeather = async (cityCode)=>
{
    let queryParam = `?apikey=${apiKey}`;
    let response = await fetch(weatherUrl + `/${cityCode}` + queryParam);
    let data =  await response.json();
    return data;
}
