const request = require('request');
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiZnVyb2ZvIiwiYSI6ImNrdzhxY25tNjFjY3gzMHBwZzBpYW95MmgifQ.h-GK13wXYxBFXUlDJRWj9Q&limit=1';
    request({url, json:true}, (error, {body} = {}) => {
        if(error) {
            //can leave undefined out just being explicit
            callback('Unable to connect to location services!', undefined);
        } else if(body.message && body.message == "Not Found") {
            callback ('unable to find location. Try another serach', undefined);
        }
        else if (!address) {
            callback('Please Input a location');
        }
        else if (body.features.length === 0) {
            callback('Unable to find location try antoher serach', undefined);
        }
        else {
           callback(undefined, {
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0],
               location: body.features[0].place_name
           })
        }
    });

}

module.exports = geocode;