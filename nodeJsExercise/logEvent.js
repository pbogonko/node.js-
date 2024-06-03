const fspromise=require('fs').promises
const fs=require('fs')
const {v4:uuid}=require('uuid')
const {format}=require('date-fns')
const path=require('path')

const logEvent=async (message)=>{
    const date=format(new Date(),"yyyy/MMdd\tHH:mm:dd\n")
    const logItem=`${date}\t${uuid()}\t${message}\n`
  

    try{
        if(!fs.existsSync('log')){
           await fspromise.mkdir('log')
        }
        const file=await fspromise.appendFile(path.join(__dirname,'log','eventLogs.txt'),logItem)

    }catch(err){
        console.log(err.message)
    }
}
module.exports=logEvent