const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for express config
const public_dir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static dir to serve
app.use(express.static(public_dir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Paloma P.'
    })
}) 

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'May I help you',
        name: 'Paloma Pérez'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About this app',
        name: 'Paloma Pérez'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.address) {
        return res.send({
            error: 'U must provide an addr'
        })
    }

    const location = req.query.address
    if (!location) console.log('Please provide location')
    else {
    geocode(location, (error, {latitude, longitude, location} = {})=>{
        if (error) console.log('Error', error)
        else{
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) console.log('Error', error)
            else{
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })

            }
        }) }
    })}


})


app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'Must provide search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})
app.get('/help/*',  (req, res)=> {
    res.render('404', {
        name: 'Help article  not found',
        errorMessage: 'Not found',
    title: '404'})
})

app.get('*', (req, res)=> {
    res.render('404', {
        title: '404',
        name: 'Paloma Pérez',
        errorMessage: 'Not found',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})