const request = require ('request')
const forcast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=42e88400e696f0f26e552ac0c5b58473&query='+latitude+','+longitude+'&units=f';
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

module.exports = forcast