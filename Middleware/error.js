module.exports = (error,request,response,next)=>{
    winston.error(error.message,error.message)
    response.status(501).send("server error")
}