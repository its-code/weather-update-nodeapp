const path = require('path')
const express = require("express")
const hbs = require('hbs')
const { title } = require('process')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// from wraper function (__dirname)

const app = express()

const port = process.env.PORT || 3000

// define paths for the express config
const publicPathDir = path.join(__dirname,'../public')
const viewPathDir = path.join(__dirname, '../templates/views')
const partialPathDir = path.join(__dirname, '../templates/partials')

// setup handlebars and view engines
app.set('view engine','hbs')
app.set('views', viewPathDir)
hbs.registerPartials(partialPathDir)

// setup static directory to server
app.use(express.static(publicPathDir))

app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather Update",
        name : "Asad"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About Me",
        name : "Asad"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "How can i help you",
        name: "Asad"
    })
})

app.get('/weatherupdate',(req,res)=>{
    if(!req.query.address){
        return res.send({error: "Input the correct location Please!"})
    }

    geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
        
        if(error){
            return res.send({ error })
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({ error })
            }

            res.send({
               location,
               forecast:forecastData, 
               address: req.query.address
            })
        })

    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error : "Help Article not found!",
        name: "Asad",
        title: "Error 404!"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        error : "404 Error!",
        name: "Asad",
        title: "Error 404!"
    })
})



app.listen(port,(req,res)=>{
    console.log("You are running on port "+port+",Sucessfully")
})