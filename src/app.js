console.log(process.env)
const path = require('path')
const express = require("express")
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
        res.render('index', {
            title: 'Weather',
            name: 'Negin',
            footerMessage: '&copy; 2022, Weather App'
        })
    })

app.get('/about', (req, res) => {
        res.render('about', {
            title: 'About',
            name: 'Negin',
            footerMessage: '&copy; 2022, Weather App'
        })
    })
app.get('/help', (req, res) => {
        res.render('help', {
            title: 'Help',
            message1: 'This website helps you to search for weather:',
            message2: 'go to the weather page and enter the location in the search box \n'+ 
                      'then press search button.',
            footerMessage: '&copy; 2022, Weather App'
        })
    })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        }) 
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) =>{
        if(error){
            return res.send(error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
               return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    });
      
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    console.send([{
        products: []
    }])
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Negin',
        errorMessage: 'Help article not found'
    })
})

//This app.get needs to be the last one to check all matches
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Negin',
        errorMessage: 'My 404 page'
    })
})


app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})
