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
        type:String,
    },
    mobile_no : {
        type :String,
    },
    email : {
        type :String,
    },
    employee_and_foreman_select : {
        type :String,
    },
    no_of_employee:{
        type:String,
    },
    oshoIdExpireDate:{
        type:String,
    },
    status:{
        type:Number
    },

  },{ timestamps: true,versionKey: false });
  

module.exports.EmployeeForeman = model("EmployeeForeman", UserSchema);
