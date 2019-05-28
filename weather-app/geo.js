const request = require("request");
const rp = require('request-promise');
const GEO_LOCATION_URL = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDQtur7EIXz7ixfzqeZKRP8TQveZKf1FjE'

const options = {
    uri: GEO_LOCATION_URL,
    method: "POST",
    json : true
}

const getGeoLocation = function(){
    return new Promise((resolve,reject)=>{
        request(options, (err,res,body)=>{
            if(err){
                reject(err);
            }else{
                latitude = body.location.lat;
                longitude = body.location.lng;
                resolve(body.location);
            }
        })
    })
}

module.exports = {
    getGeoLocation: getGeoLocation
}