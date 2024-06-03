const express=require('express')
const path = require("path")
const fpromise = require('fs').promises
const fs = require('fs')
const eventEmitter=require('events')
const logEvent=require('./logevent')


const app= express()
const PORT=process.env.PORT||3000
let filepath;
app.get('^/$|/index?(.html)',(req,res)=>{

    //res.sendFile('./views/index.html',{root:__dirname})
    console.log(req.url)
    res.sendFile(path.join(__dirname,'views','index.html'))

})
app.get('/new-page?(.html)',(req,res)=>{

    //res.sendFile('./views/index.html',{root:__dirname})
    console.log(req.url)
    res.sendFile(path.join(__dirname,'views','new-page.html'))

})


app.listen(PORT,()=>{
    console.log('server running at http://localhost:3000')
})