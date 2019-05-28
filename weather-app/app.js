const weather = require('./weather.js');
const loc = require('./geo.js');
const chalk = require('chalk');

let result = loc.getGeoLocation();

result.then((result)=>{
    console.log(result);
    let weatherInfo = weather.getWeatherDetails(result.lat,result.lng);

    weatherInfo.then((result)=>{
        console.log(chalk.green('Current temperature:') + result.temperature + '\n' + chalk.green('chances of rain :')+ result.precipProbability);
    },(err)=>{
        console.log(err);
    })

},(err)=>{
    console.log(err);
})

