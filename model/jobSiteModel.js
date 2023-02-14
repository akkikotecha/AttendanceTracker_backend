//import mongoose from "mongoose";
//var mongoose = require('mongoose');
const { Schema, model} = require("mongoose");

var dotenv = require('dotenv');



let UserSchema = new Schema({
    site_name:{
        type:String,
    },
    address:{
        type:String,
    },
    start_date:{
        type:Date,
    },
    end_date:{
        type:Date,
    },
    status : {
        type :String,
      //  required : true
    },
    project_manager_id : {
        type :Array, ref: "Admin_Project_Manager",
    },
    job_status:
    {
        type:Number,
    }
  },{ timestamps: true,versionKey: false });
  

module.exports.job_site = model("job_site", UserSchema);
