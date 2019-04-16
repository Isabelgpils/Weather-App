const request = require('request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
 
const forecast = (longitude, latitude, callback)=>{

const url = 'https://api.darksky.net/forecast/9023c1bf0e8ff37154844560daca49d3/' + longitude + ',' + latitude +'?lang=en'

 request({url, json:true}, (error, response) =>{
   if(error){
     callback('Unable to connect to weather to location services', undefined )
   } else if(response.body.error){
     callback('Unable to find location. Try another search', undefined)
   }else{
     callback(undefined, 
        response.body.daily.data[1].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a '  + response.body.currently.precipProbability + '% chance of rain.')
     }
})
}

module.exports = forecast