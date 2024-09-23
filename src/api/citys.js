import request from "../utils/request.js"

function findByname(data) 
{ 
    return request.get("https://geoapi.qweather.com/v2/city/lookup", {params: data});
}
export{findByname}