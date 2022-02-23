const request = require('request')
const API_KEY = 'adbd811872205b6ee6d7cdf9c9ed0fa8'


const forecast = (lon, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key='+ API_KEY + '&query='+lat+','+lon+'&type=location'
    console.log(url)

    request({ url: url, json: true }, (error, {body})=>{
        if(error){
            callback('Unexpected error... Could not connect', undefined)
        }else if(body.error){
            callback('Unable to find location search.', undefined)
        }else{
        callback(
            undefined,
            
           {temperature: body.current.temperature,
            feels_like: body.current.feelslike
        }
            )
    }})
}




module.exports = forecast