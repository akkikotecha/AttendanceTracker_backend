const { Schema, model} = require("mongoose");

var dotenv = require('dotenv');

let AttedanceSchema = new Schema({
    attedanceUniqueID:
    {
        type:String,

    },
    job_site_id:{
        type: Schema.Types.ObjectId, ref: "job_sites",      //  required : true
    },
    type:{
        type:String,
    },
    employee_foreman_id : {
        type : Schema.Types.ObjectId, ref: "employeeforemen",
    },
    shift_start_date:{
        type:Date,
    },
    selectStartTime:{
        type:String,
    },
    selectEndTime:{
        type:String,
    },
    selectHourDeduct:
    {
        type:String,
    },
    shift_start_time:{
        type:String,
    },
    shift_end_time:{
        type:String,
    },
    hour_deduct : {
        type :String,
    },
    notes : {
        type :String,      //  required : true
    },
    no_of_employee : {
        type :String,
    },
    assign_id : {
        type : Schema.Types.ObjectId, ref: "admin_porject_managers",
    },
    document_upload:{
        type:String,
    },
    status:{
        type:Number,
    }
  },{ timestamps: true,versionKey: false });
  
module.exports.Attedance = model("Attedance", AttedanceSchema);
