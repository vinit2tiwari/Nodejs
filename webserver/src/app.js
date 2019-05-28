const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const weather = require('./weather');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));


app.get('' , (req,res)=>{
    res.render('index' , {
        title : 'Weather app',
        name : 'Vinit tiwari'
    });
})

app.get('/about' , (req,res)=>{
    res.render('about' , {
        title : 'About me',
        name: 'Vinit tiwari'
    });
});

app.get('/help' , (req,res)=>{
    res.render('help' , {
        helpText: 'This is some helpful text.',
        title : 'Help',
        name : 'Vinit tiwari'
    });
})

app.get('/weather', (req, res) => {
    res.render('weather' , {
        title : 'Weather report',
        name : 'Vinit tiwari',
        api_key : 'AIzaSyDQtur7EIXz7ixfzqeZKRP8TQveZKf1FjE'
    });
})

app.post('/weatherInfo' , async (req,res)=>{
    if(req.body!= undefined){
        var {lat, lng} = req.body;

        let weatherDetails = await weather.getWeatherDetails(lat,lng);
        console.log(weatherDetails);
        if(weatherDetails.error){
            res.send(weatherDetails.error);
        }else{
            res.send(weatherDetails.data);
        }
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vinit tiwari',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vinit tiwari',
        errorMessage: 'Page not found.'
    })
})
app.listen(port , ()=>{
    console.log('server running on port' + port);
})