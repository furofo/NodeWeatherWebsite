const hbs = require('hbs');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

//allwo leaving off extesions off local host like .hgml
const options = {
    extensions: ['htm', 'html']
}

//defien paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = (path.join(__dirname, '../templates/views' ));
const partialsPath = path.join(__dirname, '../templates/partials');

//setup hanldebars egnine nad views loction
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath, options));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App Node',
        name: 'Christian Malpass'
    });

})
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Christian Malpass'
    });

})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Abouit Page',
        name: 'Christian Malpass'
    });

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is help message',
        message: 'lorem ipsum sadkjfksdajf sdfkjd \n dkfjasdjfsadjsdjlksdjfklsd \n kjsdfsdjfskdlok',
        name: 'Christian Malpass'
    });

})
app.get('/weather', (req, res)=> {
    if(!req.query.address) {
        return res.send({
            error: 'YOu must provide an address',
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({
                        error
                    })
                }
                res.send({
                   address: req.query.address,
                   location,
                   weather: forecastData
                })
            })

        


    })
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
       return res.send({
           error: 'You must provide a serach term'
       })

    }
 
    res.send({
        products: []
    })
    
})


//all help page not founded
app.get('/help/*', (req, res) => {
   res.render('404', {
    title: 'PHelp article not found',
    name: 'Christian Malpass'
})
});

//404 pge not handled
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Christian Malpass'
    });
});
app.listen(port, () => {
    console.log('Server is up on port' + port);
});
