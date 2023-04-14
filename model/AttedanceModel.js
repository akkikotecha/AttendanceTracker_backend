const { Schema, model} = require("mongoose");

var dotenv = require('dotenv');
var moment = require('moment');
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

//   AttedanceSchema.pre("save", function(next) {
//     var self = this;
//     self.createAt = moment().tz("America/Los_Angeles").format();
//     console.log("heloo",self.createAt);
//     next();
// });
  
module.exports.Attedance = model("Attedance", AttedanceSchema);
