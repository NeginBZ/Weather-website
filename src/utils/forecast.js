const request = require ('request')
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${latitude},${longitude}&units=f`
    request( {url , json: true}, (error, {body})=>{
    //console.log(response.body.current);
    if(error){
        callback("Unable to connect to the wether services", undefined)
    }else if(body.error){
        callback("Unable to find location", undefined)
    }else{
        callback(undefined, body.current.weather_descriptions[0] + '. It is curently ' + body.current.temperature + ' degree.It is feelslike '+ body.current.feelslike +' degree') 
    }
    })

}

module.exports = forecast