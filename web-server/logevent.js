const path=require("path")
const fsPromise=require('fs').promises
const fs=require('fs')
const {format}=require('date-fns')
const {v4:uuid}=require('uuid')
process.on('uncaughtException',(err)=>{
    console.log(`unknown error occurred:${err.message}`);
    process.exit(1);
});

const logEvent= async (message,logName)=>{
    const date=format(new Date(),'yyyyMMdd\tHH:mm:ss')
    const logItem=`${date}\t${uuid()}\t${message}\n`
    try{
        if(!fs.existsSync('logs')){
            fsPromise.mkdir('logs')
        }
    const logger= await fsPromise.appendFile(path.join(__dirname,'logs',logName),logItem)
    console.log(logItem)
    }catch(err){
        fsPromise.appendFile(path.join(__dirname,'error.txt'),`${date}\t${err.message}\n`)
        console.log("view 'error.txt' for possible errors")
       
    }


}
module.exports=logEvent