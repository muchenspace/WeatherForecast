import request from "../utils/request.js"

function nowWeather(data) 
{ 
    return request.get("https://devapi.qweather.com/v7/weather/now", {params: data});
}
function tDWeather(data)
{
    return request.get("https://devapi.qweather.com/v7/weather/3d", {params: data});
}
function weatherFor24H(data)
{
    return request.get("https://devapi.qweather.com/v7/weather/24h", {params: data});
}
export{nowWeather,tDWeather,weatherFor24H}