//import mongoose from "mongoose";
//var mongoose = require('mongoose');
const { Schema, model} = require("mongoose");

var dotenv = require('dotenv');



let UserSchema = new Schema({
    first_name:{
        type:String,
    },
    last_name:{
        type:String,
    },
    oso_id:{
        type:String,
    },
    osho_image:{
        type:String
    },
    mobile_no:{
        type:String,
    },
    email : {
        type :String,
      //  required : true
    },
    password : {
        type : String,
    },
    oshoExpiryDate:
    {
        type:String,
    },
    role_id : {
        type: Schema.Types.ObjectId, ref: "role_master"      //  required : true
    },
    status:
    {
        type:Number,
    },
    createdAt:{
        type: String,
        timezone: "America/New_York",
    },
    updatedAt:{
        type: String,
        timezone: "America/New_York",
    }    //    ,
    // roles:[{
    //     type: Schema.Types.ObjectId, ref: "user_role"
    //  }]
  },{ timestamps: false,versionKey: false });
  
/*
  let UserRole = new Schema({
    role_id : {
        type: Schema.Types.ObjectId, ref: "role_master"      //  required : true
    },
    role_name : {
        type : String,
    //    required : true
    },
    user_id:{
        type: Schema.Types.ObjectId, ref: "user"
    },
    jobsite_id : {
        type :Schema.Types.ObjectId, ref: "job_site",
    }

  },{ timestamps: true,versionKey: false });
  


module.exports.UserRole = model("user_role", UserRole);*/
module.exports.User = model("Admin_Porject_Manager", UserSchema);
