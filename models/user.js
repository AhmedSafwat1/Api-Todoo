const joi = require("joi");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt  = require('jsonwebtoken');
const config = require("../config")
const userSchema = new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
        minlength:3,
        maxlength:255
    },
    email:
    {
        type:String,
        required:true,
        minlength:5,
        maxlength:500,
        index: true,
        unique: true
    },
    password:
    {
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
    },
    todoList:[{  type: String }]  
})
//jwt
userSchema.methods.getToken = function(){
    token = jwt.sign({
        id: this._id
      }, config.secret, { expiresIn: 86400 });
    return token;
}
const User = mongoose.model("User",userSchema)
// validation  register
function validateUser(User)
{
    const validSchema = {
        name:joi.string().required().min(3).max(255),
        password:joi.string().required().min(3).max(100),
        email:joi.string().email().required().min(5).max(255),
    }
    return joi.validate(User, validSchema)
}
// validation  login
function validateUserlogin(User)
{
    const validSchema = {
        password:joi.string().required().min(3).max(100),
        email:joi.string().email().required().min(5).max(255),
    }
    return joi.validate(User, validSchema)
}
async function hashPassword (user) {

    const password = user.password
    const saltRounds = 10;
    
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
          if (err) reject(err)
          resolve(hash)
        });
      })
    // console.log(hashPassword,"kkk")
    return hashedPassword
  
  }
//check passeord 
async function checkUser( user, password) {
    //... fetch user from a db etc.
 
    const match = await bcrypt.compare(password, user.password);
 
    if(match) {
        return true
    }
    return false
    //...
}

module.exports = User;
module.exports.validate = validateUser
module.exports.validateUserlogin = validateUserlogin
module.exports.hashPassword = hashPassword
module.exports.checkUser = checkUser
module.exports.userSchema = userSchema