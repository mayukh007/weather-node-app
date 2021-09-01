const path  = require('path')
const { response } = require('express');
const express = require('express');
const app =express()
const hbs =require('hbs')
const geocode =require('./utils/geocode')
const forecast  = require('./utils/forecast')
const port =proces.env.PORT||3000
//define paths for express configs
const viewsPath = path.join(__dirname,"../templates/views")
const publicDirectoryPath = path.join(__dirname,"../public")
const partialPath = path.join(__dirname, "../templates/partials")

//setup handle bar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)
//setup static directory to server
app.use(express.static(publicDirectoryPath))
app.get('', (req, res )=>{
    res.render('index',{
        title:'index',
        name:'mayukh'
    })
})
app.get('/about', (req, res)=>{
    res.render('about',{
        title:"about me",
        name:"mayukh"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:"contact me for any qeuries",
        name:'mayukh'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){   
      return  res.send({error:"provide an adress"})
    }
geocode(req.query.address,(error,{lat, long, location}={})=>{
    if(error){
        return res.send({error})
     }
    forecast(long, lat, (error,forcastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forcastData,
            location:location
        })
        
        })
                
})
})
// app.get('/products',(req,res)=>{
//     if(req.query.search){
//    return res.send(
//         {
//             products:[]
//         }
//     )}
//         res.send({
//             error:'you must provide a search term'
//         })
        
    
// })
app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'mayukh',
        errorMessage:'help article not found'
    })
})
app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'mayukh',
        errorMessage:'404 page not found'
    })
})
app.listen(port, ()=>{
    console.log("serve is up at"+port);
})