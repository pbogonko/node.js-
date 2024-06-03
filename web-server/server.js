const path=require("path")
const express=require('express')

const logEvent=require('./logevent')
const eventEmitter=require('events')

class MyEmitter extends eventEmitter{}
const emitter=new MyEmitter()
const fs=require('fs')
process.on('uncaughtException',(err)=>{
    console.log('some error occurred',err)
})

const app=express()
const filepath=path.join(__dirname,"index.html")

const port=process.env.PORT || 3600
app.get('/',async (req,res,next)=>{
    emitter.on('logEv',(msg)=>{logEvent(msg)})
    emitter.emit('logEv',`${req.method}\t${req.url}`)
    emitter.off
     const data=fs.createReadStream(path.join(__dirname,"index.html"),"utf8")
     const writestr=fs.createWriteStream(path.join(__dirname,'newStream.txt'))
    data.pipe(writestr)
     data.on("data",(readData)=>{
      
        res.send(readData)
       // console.log(readData)
     })
   // const dtta=fs.readFile(path.join(__dirname,'lolem.txt'),'utf8');
    
   // console.log(req.url,req.method);
   
   // res.send(data)

    
})
app.listen(port,()=>{
    console.log("server running at http://localhost:3600")
})