const User = require("../models/user"),
      express = require("express"),
      authRoute = express.Router();
//route *********************************************
authRoute.post("/register",async(req,res)=>{
    let data = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    const isvalid = User.validate(data)
    if(isvalid.error)
    {
        return res.status(500).send({message:"error not valid data",errors:isvalid.error})
    }
    else
    {
        user  = new User(data)
        hasPassword = await User.hashPassword(data)
                            .catch((e)=>res.status(501).send("error  in server "))
        console.log(user.getToken)
        
        user.password = hasPassword
       
        user =  await user.save()
            .catch(
                (err)=>{
                        if (err) {
                            var e = "";
                            if (err.code == 11000) {
                                e = "User Email already exists";                    
                            } else {
                                e = err;
                            }
                        res.status(501).send({message:"error in data and save",errors:e})}
                    }
                    );
        
        res.status(200).send({user:user,token:user.getToken()})
    }
   
})
authRoute.post("/login", async(req, res)=>{
    let data = {
        email:req.body.email,
        password:req.body.password
    }
    const isvalid = User.validateUserlogin(data)
    if(isvalid.error)
    {
        return res.status(500).send({message:"error not valid data",errors:isvalid.error})
    }
    else
    {
        user = await User.findOne({email:data.email})
                      .catch((err)=>res.status(501).send("error  in server "+err))
        if(user)
        {
            let  match = await User.checkUser(user, data.password)
                                    .catch((err)=>res.status(501).send("error  in server "+err))
            if(match)
            {
                res.status(200).send({user:user,token:user.getToken()})
            }
        }
        return res.status(404).send({message:"user not found"})
        
    }
})
module.exports = authRoute;