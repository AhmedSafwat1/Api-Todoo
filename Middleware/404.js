module.exports = (request,response,next)=>{
    response.status(404).send({"message":"url not found"})
}