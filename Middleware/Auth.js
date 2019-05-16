const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const config = require("../config")

module.exports = (request,response,next)=>{
    const token = request.header("x-auth-token")
    if(!token) return response.status(401).send({messga:"errr access denia",auth:false})
    try {
        const decod = jwt.verify(token,config.secret)
        request.userId = decod
        next()
    } catch (error) {
        console.log(error)
        return response.status(404).send({messga:"invalid token",auth:false})
    }
}