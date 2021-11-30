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
            let string =  " \n It is curently "  + body.current.temperature +' eegrees out \n It feels like' +
            body.current.feelslike +' degrees out!';
            callback(undefined, string);
        }
       
    });

}
module.exports = forecast;