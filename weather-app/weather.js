const request = require('request');

const WEATHER_URL = 'https://api.darksky.net/forecast/81e2e1366ffb73b944d18dccefc43a44/';

const options = {
    uri: WEATHER_URL,
    json : true
}

const getWeatherDetails = (lat,long)=>{
    return new Promise((resolve,reject)=>{
        options.uri = options.uri + lat + ','+long + '?units=si';
        console.log(options.uri);
        request(options, (err,res)=>{
            if(err){
                reject(err);
            }else{
                const current = res.body.currently;
                resolve(current);
            } 
        })
    });
}

module.exports = {
    getWeatherDetails : getWeatherDetails
}
