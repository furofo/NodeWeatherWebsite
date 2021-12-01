const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7a1ed09dfff7acaf5c46a2693fda7f88&query='+ String(latitude) + ',' + String(longitude) +
     '&units=f'; 
    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
          callback('UNable to connect to weather Service sorry :(', undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined);
        }
        else {
            console.log(JSON.stringify(body));
            let string =  " It is curently "  + body.current.temperature +' degrees out. But It feels like it is ' +
            body.current.feelslike +' degrees out! ' + ' The weather looks like it is ' + body.current['weather_descriptions'][0] + ' today!';
            callback(undefined, string);
        }
       
    });

}
module.exports = forecast;