//import mongoose from "mongoose";
//var mongoose = require('mongoose');
const { Schema, model} = require("mongoose");

var dotenv = require('dotenv');


  let rolesModel = new Schema({
    
    role_name : {
        type : String,
    //    required : true
    },
    createdAt:{
      type: String,
      timezone: "America/New_York",
  },
  updatedAt:{
      type: String,
      timezone: "America/New_York",
  }
  },{ timestamps: false,versionKey: false });
  

module.exports.rolesModel = model("role_master", rolesModel);
