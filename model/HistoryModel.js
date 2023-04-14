//import mongoose from "mongoose";
//var mongoose = require('mongoose');
const { Schema, model} = require("mongoose");

var dotenv = require('dotenv');

let history_logSchema = new Schema({
    create_date:{
        type:String,
        timezone: "America/New_York",
    },
    log_activity:{
        type:String,
    },
    action_by:{
        type : Schema.Types.ObjectId, ref: "admin_porject_managers",
    },
    status:{
        type:Number
    },
    createdAt:{
        type:String,
        timezone: "America/New_York",
    },
  },{ timestamps: false,versionKey: false });
  

module.exports.history_log = model("history_log", history_logSchema);
