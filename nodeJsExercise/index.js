const logEvent=require('./logEvent')
const  eventEmitter=require('events');
const express=require('express');
const path=require('path');


const PORT=process.env.PORT||4000


const app=express()
//middlewares
app.use(express.static(path.join(__dirname,"/css")))

app.get('^/$|index.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'))
})
app.get('/signup.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','signup.html'))
})
app.listen(PORT,()=>{
    console.log('server learning at http://localhost:4000')
});

//


class myEventEmitter extends eventEmitter{}

const Emitter=new myEventEmitter();

Emitter.on('logs',(message)=>logEvent(message))

setTimeout(()=>{
    Emitter.emit('logs',"this is a log item ");
    Emitter.emit('logs',"another log item ");
    //

},3000)
