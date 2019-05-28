var lat = undefined;
var lng = undefined;

function getLocation(){
    let options = {
        url : GEOLOCATION_URL,
        method : 'POST'
    }
    ResourceService(options, processLocationDetails);
}

function processLocationDetails(error, success){
    if(error){
        console.log('error occured');
        window.location = '/error';
    }else{
        let {lat , lng} = success.location;
        console.log(lat + '  '+ lng);
        var options = {
            url : '/weatherInfo',
            method : 'POST',
            data : success.location
        }
        ResourceService(options,handleWeatherDetails);
    }
}

function handleWeatherDetails(error , success){
    if(error){
        console.log('error occured');
        window.location = '/error';
    }else{
        var temperature = success.temperature;
        var rain = success.rain;
        $('#temperature').text('Current temperature : '+ temperature);
        $('#rain').text('Chances of rain today : '+ rain);
    }
}


function ResourceService(options, callback){
    $.ajax(options.url, {
        type: options.method,
        data : options.data, 
        success: function (data, status, xhr) {
            if(data!= undefined){
                callback(undefined, data);
            }
        },
        error: function (jqXhr, textStatus, errorMessage) {
            callback(errorMessage, undefined);
        }
    });
}