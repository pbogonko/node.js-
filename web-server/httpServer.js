const { error } = require('console');
const http = require('http')
const path = require("path")
const fpromise = require('fs').promises
const fs = require('fs')
const eventEmitter=require('events')
const logEvent=require('./logevent')

class MyEmitter extends eventEmitter{}

const emitter=new MyEmitter()
emitter.on('log',(msg,filename)=>logEvent(msg,filename));


const PORT = process.env.PORT || 4000
let contenttype;

let filepath;
//this function will be responsible for reading the files
const servefile = async (path, content_type, response) => {

    try {
        
        const file = await fpromise.readFile(path, !content_type.includes('image')?'utf8':'')
        
        
     //without this even a 404 will indicate a 200 message since the 404.html also loads successfully
        if(path.includes('404.html')){
        response.statusCode = 404
        }else{
            response.statusCode=200
        }
        response.setHeader("content-type", content_type)
        if(content_type==='appication/json'){
            response.end(JSON.stringify(file))
        }else{
            response.end(file)
        }
    
        //this part will handle possible server errors
    } catch (err) {
        //console.log(err.message);
       emitter.emit('log',`${err.name}:${err.message}\n`,'errors.txt')
        response.statusCode = 500;
        response.end()
    }
}
//we will start by creating our http server
const server = http.createServer((req, res) => {
    let extension = path.extname(req.url);
  emitter.emit('log',`${req.url}\t${req.method}\n`,'reqlog.txt')
    switch (extension) {
        case '.css':
            contenttype = 'text/css'
            break
        case '.js':
            contenttype = 'text/javascript'
            break
        case '.json':
            contenttype = 'application/json'
            break
        case '.jpg':
            contenttype = 'image/jpeg'
            break
        case '.png':
            contenttype = 'image/png'
            break
        case '.txt':
            contenttype = 'text/plain'
            break
        default:
            contenttype = 'text/html'
    }

    if (contenttype === 'text/html' && req.url === '/') {
        filepath = path.join(__dirname, 'views', 'index.html')

    } else if (contenttype === 'text/html' && req.url.slice(-1) === '/') {
        filepath = path.join(__dirname, 'views', req.url, 'index.html')
    } else if (contenttype === 'text/html') {
        filepath = path.join(__dirname, 'views', req.url)
    } else {
        filepath = path.join(__dirname, req.url)
    }
    if (!extension && req.url.slice(-1) !== '/') filepath += '.html';

    const exists = fs.existsSync(filepath)
    
    //lets check if the path exists and if true lets go and serve the file

    if (exists) {
        servefile(filepath, contenttype, res)
    }


    else {
        //a 301 mesag represent a redirect
        switch (path.parse(filepath).base) {
            case "old-page.html":
                res.writeHead(301, { 'Location': '/new-page.html' });
                res.end();
                break

            case 'www-page.html':
                res.writeHead(301, { 'location': "/" });
                res.end()
                break;
            default:
             //by now we are crtain that the file doesnt exist.
             //we will serve a 404
             servefile(path.join(__dirname,"views","404.html"),"text/html",res)   
            // res.statusCode=404;
            // res.setHeader('content-type','text/html')
            // const error=await fpromise.readFile(path.join(__dirname,'views',"404.html"));
            // res.end(error)

        }
    }
    //     // res.statusCode=404;
    //     // res.setHeader('content-type','text/html')
    //     // const error=await fpromise.readFile(path.join(__dirname,'views',"404.html"));




        console.log(req.url, req.method)
    //     /*try{
    //     if(req.url==="/"||req.url==='index.html'){
    //         const file=await fpromise.readFile(path.join(__dirname,'index.html'))
    //         res.statusCode=200;
    //         res.setHeader('content-type','text/html');
    //         res.end(file)
    
            
    
    //     }
    //     console.log(req.url,req.method)
    //   }catch (err){
    //         console.log("an error occurre",err.message)
    //     }*/

    });
server.listen(PORT, () => {
    console.log("server running on http://localhost:4000")
})
