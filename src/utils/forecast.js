const request = require('request')

const forecast = (longitude, latitude, callback)=>{

const url = 'https://api.darksky.net/forecast/9023c1bf0e8ff37154844560daca49d3/' + longitude + ',' + latitude +'?lang=en'

 request({url, json:true}, (error, response) =>{
   if(error){
     callback('Unable to connect to weather to location services', undefined )
   } else if(response.body.error){
     callback('Unable to find location. Try another search', undefined)
   }else{
     callback(undefined, 
        response.body.daily.data[1].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. The high is ' + response.body.daily.data[0].temperatureHigh + ' and the low is ' + response.body.daily.data[0].temperatureLow + '. There is a '  + response.body.currently.precipProbability + '% chance of rain.')
     }
})
}

module.exports = forecast