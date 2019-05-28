const request = require('request');

const WEATHER_URL = 'https://api.darksky.net/forecast/81e2e1366ffb73b944d18dccefc43a44/';
const ERR_MSG = 'Error while getting weather information, please try again after some time..'

async function getWeatherDetails(lat,lng){
    var error = validateInput(lat,lng);

    if(error){
        return {error : error};
    }else{
       try{
        let result = await fetchDetailsFromServer(lat,lng);

        if(result == undefined){
            return {error : ERR_MSG};
        }
        let data = {
            data : {
                temperature : result.temperature,
                rain : result.precipProbability
            }
        }
        return data;
       }catch(error){
           console.log(error);
       }
       
    }
}

const validateInput = (lat,lng)=>{
    if(lat == undefined || lat == '' || lng == undefined || lng == ''){
        return 'Sorry we could not locate you..';
    }
}

const fetchDetailsFromServer = (lat,lng)=>{
    return new Promise((resolve,reject)=>{
        const options = {
            uri: WEATHER_URL + lat + ','+lng + '?units=si',
            json : true
        }
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
