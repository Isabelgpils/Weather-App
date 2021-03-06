const path = require('path')
const express = require('express')
const hbs = require ('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
       title: 'Weather',
       name: 'Isabel Gutierrez'
    })
})
//dynamic hbs
app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name:'Isabel Gutierrez-Pils'

    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        name: 'Isabel Gutierrez-Pils'
    })
})
app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send(
            'Please provide a search term'
        )}
    res.send(
        {product:[]
    })
})
//static
app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({error:'You must provide an address'
       })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
    forecast(latitude, longitude, (error, forecastData) => {
        if(error){
            return res.send({error})
        }
        res.send(
            {
                forecast: forecastData,
                location: location, 
                address: req.query.address
            })

        })
   })
})

app.get('/help/*', (req, res)=> {
    res.render('404', {
        title: '404',
        name: 'Isabel Gutierrez-Pils',
        errorMessage:'Help Article Not Found'
     })
})

//Set up error message. Expresses uses * as (wildcard)
app.get('*', (req, res) =>{  
    res.render('404', {
        title: '404',
        name: 'Isabel Gutierrez-Pils',
        errorMessage: 'Page Not Found'
     })
})

// start browser
app.listen(port, ()=>{

    //callback that runs when server is up 
    console.log('Server is up on port PORT '+ port )
})