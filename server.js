// import lib 
const express = require("express"),
      mongoose = require("mongoose"),
      app = express(),
      path = require("path"),
      bodyParser = require("body-parser"),
      port = process.env.port || 8080,
      cors = require("cors"),
      morgan = require("morgan"),
      userRoute = require("./Routes/user"),
      authRoute = require("./Routes/auth"),
      authMiddlware = require("./Middleware/Auth"),
      requestError = require("./Middleware/404"),
      error = require("./Middleware/error");

//midlware config *******************************************
app.use(bodyParser.json())//header date json 
app.use(bodyParser.urlencoded({ extended: true }))//header date form Url 
app.use(cors()) // for confilict the connect other server
app.use(morgan("tiny")) // for logger rote in the screen
// connect mongo ********************************************
// mongoose.connect("mongodb://127.0.0.1:27017/JobTask",{useCreateIndex: true, useNewUrlParser: true })
// .then(()=>console.log("connect to mongo"))
// .catch((error)=>console.error("connect to mongo failed"))
///
let dev_db_url = 'mongodb+srv://safwat:123@cluster0-qlihz.mongodb.net/test?retryWrites=true';
mongoose.connect(dev_db_url,{useCreateIndex: true, useNewUrlParser: true })
.then(()=>console.log("connect to mongo"))
.catch((error)=>console.error("connect to mongo failed"))
//Route config ****************************8

app.use("/auth", authRoute)
app.use(authMiddlware)//auth middlware
app.use("/user", userRoute)
app.use(requestError)//url not found
app.use(error)//
//Run server**************************************************
app.listen(port,()=>console.log(`server running ...  http://localhost:${port} `))