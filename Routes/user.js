const User = require("../models/user"),
      express = require("express"),
      userRoute = express.Router();
//route *********************************************
userRoute.get("/:id",async(req,res)=>{
    let result = await User.findOne({_id:req.params.id}).catch(e=>res.status(501).send("error "+e))
    if(result)
        res.status(200).send({data:result,"message":"Sucess found"})
    else
        res.status(404)
            .send({error:"not found the user","message":"not found the usert to dispaly the todo"})
})
userRoute.post("/:id/add-todoo",async(req,res)=>{
    let result = await User.findOne({_id:req.params.id}).catch(e=>res.status(501).send("error "+e))
    console.log(req.body.title)
    if(result)
    { 
        if(req.body.title && req.body.title != "" )
        {
            result.todoList.push(req.body.title)
            result.save().catch(e=>res.status(501).send("error "+e))
            res.status(200).send({data:result,"message":"Sucess add Todoo"})
        }
        else
        {
            res.status(404)
                .send({errors:["tilte field rquried"],"message":"error validation"})
        }
    }
    else
        res.status(404)
            .send({error:"not found the user","message":"not found the usert to dispaly the todo"})
})
module.exports = userRoute;