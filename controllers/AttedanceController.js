const mongoose  = require('../dbConnect');
var mong = require('mongoose');

const AttedanceModel  = require('../model/AttedanceModel');

const HistoryLog  = require('../model/HistoryModel');
const bcrypt = require('bcrypt')

const multer = require('multer');

const path = require('path');
var moment = require('moment');

const moment_tz = require('moment-timezone');
const st = path.join(__dirname, '..', "public/assets/assets/upload");

console.log(st);
const { basename } = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, st)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload_osho_image = multer({ storage: storage }).single('myFile');



uploadDocument = async (req, res, next) => {
  // console.log(req.body);
   // return false;

   upload_osho_image(req, res, async(err) => {
    
    //console.log(req.body);
    //return false;
    var image = '';
    
      image="assets/assets/upload/"+req.file.originalname;
    //  return image;
      res.status(200).send({status:1,image_url:image});
});
}

addAttedanceData = async (req, res, next) => {
 /* console.log(req.body);
  return false;
  */
 
  var collection = []
  
  const timestamp = Date.now();
 
  const dateObject = new Date(timestamp);
  const date = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  
  var uniqueNo = date+month+year+Math.floor(timestamp/10);
  //console.log("EHHELO "+uniqueNo);
//return false;
  var set_date = '';
  var str_array = req.body.array_data.split(',');
  //var employee_data = req.body.array_foreman.split(',');
    try {
      for(var i = 0; i < str_array.length; i++) {
        var getdata = str_array[i].split('*');
        set_date = getdata[0];
        collection.push({attedanceUniqueID:uniqueNo,job_site_id:req.body.jobSiteId,type:getdata[6],employee_foreman_id:getdata[1],shift_start_date:new Date(getdata[0]),shift_start_time:getdata[2],shift_end_time:getdata[3],hour_deduct:getdata[4],notes:req.body.notes,no_of_employee:getdata[5],status:1,selectStartTime:getdata[7],selectEndTime:getdata[8],selectHourDeduct:getdata[9],assign_id:getdata[10],document_upload:getdata[11],createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')})   
      }
     // console.log("EHLLO "+JSON.stringify(collection))
     // return false;
      try {
        const Attedance = await AttedanceModel.Attedance.insertMany(collection);
        //const lastid= user._id;
        const HistoryLog_data = await HistoryLog.history_log.create({action_by:req.body.action_by,log_activity:'Marked attendance of Jobsite "'+req.body.get_jobsite_data_name.trim()+'" on "'+set_date.trim()+'"',create_date:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});
            

            res.status(200).send({message : "Added"});
       
    }catch (error) {
  return res.status(500).send({status:0,message: error.message});
  }
}
catch(error)
{
  return res.status(500).send({status:0,message: error.message});
}
}



addAttedanceEdit = async (req, res, next) => {
   //console.log(req.body);
   //return false;
   
  
   var collection = []
   
  
   //console.log("EHHELO "+uniqueNo);
 //return false;
   var str_array = req.body.select_multiple_data;
   //console.log("LENGTH : "+str_array.length);

  // var da = req.body.global_edit_date.split('T');
   //console.log(da[0]);
     try {
      if (typeof str_array === 'string' || str_array instanceof String)
    {
      //console.log("HELLO TREU");

     // for(var i = 0; i < str_array.length; i++) {
        //console.log(str_array[i])
         var getdata = str_array.split('-');
        // console.log("getdata : split : "+getdata[0]);
         var emp_for = 'null'; 
         if(getdata[1] == "Foreman")
          {
            emp_for = "0";
          }else{
            emp_for = 'null';
          }         
        //  global_set_end_time
          collection.push({attedanceUniqueID:req.body.global_edit_unique_id,job_site_id:req.body.global_edit_job_site_id,type:getdata[1],employee_foreman_id:getdata[0],shift_start_date:req.body.global_edit_date.trim(),shift_start_time:req.body.add_attendance_start_time,shift_end_time:req.body.add_attendance_end_time,hour_deduct:req.body.add_attendance_min_deudct,notes:req.body.add_attendance_note,no_of_employee:emp_for,status:1,selectStartTime:req.body.global_set_start_time,selectEndTime:req.body.global_set_end_time,selectHourDeduct:req.body.global_min_deduct,assign_id:req.body.assign_id,document_upload:'',createdAt:req.body.global_created_at,updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});   
       
          //console.log("EHLLO "+JSON.stringify(collection)+"\n\n")
       
      


     }else
     {
     //console.log("HELLO FALSE");
 
     
       for(var i = 0; i < str_array.length; i++) {
       // console.log(str_array[i])
         var getdata = str_array[i].split('-');
         var emp_for = 'null'; 
         if(getdata[1] == "Foreman")
          {
            emp_for = "0";
          }else{
            emp_for = 'null';
          }         collection.push({attedanceUniqueID:req.body.global_edit_unique_id,job_site_id:req.body.global_edit_job_site_id,type:getdata[1],employee_foreman_id:getdata[0],shift_start_date:req.body.global_edit_date.trim(),shift_start_time:req.body.add_attendance_start_time,shift_end_time:req.body.add_attendance_end_time,hour_deduct:req.body.add_attendance_min_deudct,notes:req.body.add_attendance_note,no_of_employee:emp_for,status:1,selectStartTime:req.body.global_set_start_time,selectEndTime:req.body.global_set_end_time,selectHourDeduct:req.body.add_attendance_min_deudct,assign_id:req.body.assign_id,document_upload:'',createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')})   
       
          //console.log("EHLLO "+JSON.stringify(collection)+" \n \n ")
       
        }

      }
       //console.log("EHLLO "+JSON.stringify(collection))
      // return false;
       try {
         const Attedance = await AttedanceModel.Attedance.insertMany(collection);


         const HistoryLog_data = await HistoryLog.history_log.create({action_by:req.body.action_by,log_activity:'Marked attendance of Jobsite "'+req.body.global_site_name.trim()+'" on "'+req.body.global_edit_only_date.trim()+'"',create_date:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});
         //const lastid= user._id;
         
             res.status(200).send({message : "Added"});
        
     }catch (error) {
   return res.status(500).send({status:0,message: error.message});
   }
 }
 catch(error)
 {
   return res.status(500).send({status:0,message: error.message});
 }
 }




getAttedance = async (req, res, next) => {
//console.log(req.params.getJobSiteID);
  try {
        try {
           // let AttedanceData = await AttedanceModel.Attedance.find({job_site_id : req.params.getJobSiteID});
            const AttedanceData = await AttedanceModel.Attedance.aggregate([
              {
                "$lookup":{
                  from:"job_sites",
                  localField:"job_site_id",
                  foreignField:'_id',
                  as: "jobSiteData",
                  }, 
              },
              {
                "$lookup":{
                  from:"employeeforemen",
                  localField:"employee_foreman_id",
                  foreignField:'_id',
                  as: "empforemenData",
                  }, 
              },    
             // {$match: {"job_site_id": {$eq:req.params.getJobSiteID}}}
            ]);

            res.status(200).send({status:1,data : AttedanceData});
        }catch(error) {
            res.status(500).send({status:0,message : error.message});
        }
  } catch (error) {
    console.log(mongoose);
    return res.status(500).send({status:0,message: error.message});
  }
}

getAllAttedanceData = async (req, res, next) => {
  //console.log(req.body);
    try {
          try {
             // let AttedanceData = await AttedanceModel.Attedance.find({job_site_id : req.params.getJobSiteID});
             let id = mong.Types.ObjectId(req.body.selectJobSiteid);

             if(req.body.date != "")
             {
              const AttedanceData = await AttedanceModel.Attedance.aggregate([
                {
                  "$lookup":{
                    from:"job_sites",
                    localField:"job_site_id",
                    foreignField:'_id',
                    as: "jobSiteData",
                    }, 
                },
                {
                  "$lookup":{
                    from:"employeeforemen",
                    localField:"employee_foreman_id",
                    foreignField:'_id',
                    as: "empforemenData",
                    }, 
                },
                
                {$match: {"shift_start_date": {$eq:req.body.date}}},
                {$match: {"status": Number(req.body.status)}},

                {$match: {"job_site_id": id}},
                {$match: {"attedanceUniqueID": req.body.parent_id}},


              ]);
              res.status(200).send(AttedanceData);

             }
             else
             {
              const AttedanceData = await AttedanceModel.Attedance.aggregate([
                {
                  "$lookup":{
                    from:"job_sites",
                    localField:"job_site_id",
                    foreignField:'_id',
                    as: "jobSiteData",
                    }, 
                },
                {
                  "$lookup":{
                    from:"employeeforemen",
                    localField:"employee_foreman_id",
                    foreignField:'_id',
                    as: "empforemenData",
                    }, 
                },
                {$match: {"job_site_id": id}},
                {$match: {"status": Number(req.body.status)}},

                {$match: {"attedanceUniqueID": req.body.parent_id}},
                
              //  {"$group" : {_id:{id:"$attedanceUniqueID",shift_date:"$shift_start_date",shift_date:"$shift_start_date"}, count:{$sum:1}}}

                
//                {$match: {"shift_start_date": {$eq:req.body.date}}}

              ]);
              //console.log(AttedanceData);
              res.status(200).send(AttedanceData);

             }
  
          }catch(error) {
            console.log(error);
              res.status(500).send({status:0,message : error.message});
          }
    } catch (error) {
      console.log(mongoose);
      return res.status(500).send({status:0,message: error.message});
    }
  }
  
  getGroupAllAttedanceData = async (req, res, next) => {
    //console.log(req.body);
    //return false;
    try {
      try {
         // let AttedanceData = await AttedanceModel.Attedance.find({job_site_id : req.params.getJobSiteID});
         if(req.body.date != "" && req.body.jobsite != "")
        {
          let id = mong.Types.ObjectId(req.body.jobsite);
          const mydate = req.body.date.split("-");
          const AttedanceData = await AttedanceModel.Attedance.aggregate([
            {
              "$lookup":{
                from:"job_sites",
                localField:"job_site_id",
                foreignField:'_id',
                as: "jobSiteData",
                }, 
            },
            {
              "$lookup":{
                from:"employeeforemen",
                localField:"employee_foreman_id",
                foreignField:'_id',
                as: "empforemenData",
                }, 
            },
            //{ $match: { shift_start_date: { $gte: new Date(moment(moment(mydate[0], 'MM/DD/YYYY')).format('YYYY-MM-DD'))  } } }, //01/04/2023  >        12/15/2022
          
            // {$match: {"shift_start_date": {$eq:new Date(moment(moment(req.body.date, 'MM/DD/YYYY')).format('YYYY-MM-DD'))}}},

            { $match: { "shift_start_date": { $gte: new Date(moment(moment(mydate[0], 'MM/DD/YYYY')).format('YYYY-MM-DD')),  $lte: new Date(moment(moment(mydate[1], 'MM/DD/YYYY')).format('YYYY-MM-DD'))  } } }, //01/04/2023  >        12/15/2022
            {$match: {"job_site_id": id}},
            {$match: {"status": Number(req.body.status)}},
            
            {"$group" : {_id:{
              
            //   day: {$dayOfMonth: "$createdAt"},
            // month: {$month: "$createdAt"}, 
            // year: {$year: "$createdAt"},
            // hour: {$hour: "$createdAt"},
            // minute: {$minute: "$createdAt"},
            createdAt:"$createdAt",
            selectHourDeduct:"$selectHourDeduct",
            id:"$attedanceUniqueID",shift_date:"$shift_start_date",attedanceUniqueID:"$attedanceUniqueID",selectStartTime:"$selectStartTime",selectEndTime:"$selectEndTime",created_at:"$created_at",job_site_name:"$jobSiteData.site_name",job_site_id:"$jobSiteData._id",document_upload:"$document_upload"}, count:{$sum:1}}},
            { $sort: {_id: -1} },



          ]);
          res.status(200).send(AttedanceData);
 
        }
         else if(req.body.date != "")
         {
          const mydate = req.body.date.split("-");
          const AttedanceData = await AttedanceModel.Attedance.aggregate([
            {
              "$lookup":{
                from:"job_sites",
                localField:"job_site_id",
                foreignField:'_id',
                as: "jobSiteData",
                }, 
            },
            {
              "$lookup":{
                from:"employeeforemen",
                localField:"employee_foreman_id",
                foreignField:'_id',
                as: "empforemenData",
                }, 
            },
            //{$match: {"jobSiteData.job_status": 1}},
            {$match: {"status": Number(req.body.status)}},
            // {$match: {"shift_start_date": {$eq:new Date(moment(moment(req.body.date, 'MM/DD/YYYY')).format('YYYY-MM-DD'))}}},
            { $match: { "shift_start_date": { $gte: new Date(moment(moment(mydate[0], 'MM/DD/YYYY')).format('YYYY-MM-DD')),  $lte: new Date(moment(moment(mydate[1], 'MM/DD/YYYY')).format('YYYY-MM-DD'))  } } }, //01/04/2023  >        12/15/2022
            {"$group" : {_id:{//   day: {$dayOfMonth: "$createdAt"},
              // month: {$month: "$createdAt"}, 
              // year: {$year: "$createdAt"},
              // hour: {$hour: "$createdAt"},
              // minute: {$minute: "$createdAt"},
              createdAt:"$createdAt",
            selectHourDeduct:"$selectHourDeduct",

            shift_date:"$shift_start_date",attedanceUniqueID:"$attedanceUniqueID",selectStartTime:"$selectStartTime",selectEndTime:"$selectEndTime",created_at:"$created_at",job_site_name:"$jobSiteData.site_name",job_site_id:"$jobSiteData._id",document_upload:"$document_upload"}, count:{$sum:1}}},
            { $sort: {_id: -1} },


          ]);
          console.log("AttedanceData : "+AttedanceData);
          res.status(200).send(AttedanceData);

         }
         else if(req.body.jobsite != "")
         {
          let id = mong.Types.ObjectId(req.body.jobsite);

          const AttedanceData = await AttedanceModel.Attedance.aggregate([

            {
              "$lookup":{
                from:"job_sites",
                localField:"job_site_id",
                foreignField:'_id',
                as: "jobSiteData",
                }, 
            },
            {
              "$lookup":{
                from:"employeeforemen",
                localField:"employee_foreman_id",
                foreignField:'_id',
                as: "empforemenData",
                }, 
            },
            {$match: {"job_site_id": id}},
            {$match: {"status": Number(req.body.status)}},

            //{$match: {"jobSiteData.job_status": 1}},
            {"$group" : {_id:{//   day: {$dayOfMonth: "$createdAt"},
              // month: {$month: "$createdAt"}, 
              // year: {$year: "$createdAt"},
              // hour: {$hour: "$createdAt"},
              // minute: {$minute: "$createdAt"},
              createdAt:"$createdAt",
            selectHourDeduct:"$selectHourDeduct",

            id:"$attedanceUniqueID",shift_date:"$shift_start_date",
            selectStartTime:"$selectStartTime",attedanceUniqueID:"$attedanceUniqueID",selectEndTime:"$selectEndTime",created_at:"$created_at",job_site_name:"$jobSiteData.site_name",job_site_id:"$jobSiteData._id",document_upload:"$document_upload"}, count:{$sum:1}}},
            { $sort: {_id: -1} },

          ]);
       //   console.log(AttedanceData);
          res.status(200).send(AttedanceData);

         }
         else
         {
          const AttedanceData = await AttedanceModel.Attedance.aggregate([
            {
              "$lookup":{
                from:"job_sites",
                localField:"job_site_id",
                foreignField:'_id',
                as: "jobSiteData",
                }, 
            },
            {
              "$lookup":{
                from:"employeeforemen",
                localField:"employee_foreman_id",
                foreignField:'_id',
                as: "empforemenData",
                }, 
            },
            {$match: {"status": Number(req.body.status)}},

            //{$match: {"jobSiteData.job_status": 1}},
            {"$group" : {_id:{
             //   day: {$dayOfMonth: "$createdAt"},
            // month: {$month: "$createdAt"}, 
            // year: {$year: "$createdAt"},
            // hour: {$hour: "$createdAt"},
            // minute: {$minute: "$createdAt"},
            createdAt:"$createdAt",
               selectHourDeduct:"$selectHourDeduct",

                id:"$attedanceUniqueID",attedanceUniqueID:"$attedanceUniqueID",selectStartTime:"$selectStartTime",selectEndTime:"$selectEndTime",shift_date:"$shift_start_date",job_site_name:"$jobSiteData.site_name",job_site_id:"$jobSiteData._id",document_upload:"$document_upload"}, count:{$sum:1}}
               
              },
              { $sort: {_id: -1} },
          ]);
          //console.log(AttedanceData);
          res.status(200).send(AttedanceData);

         }

      }catch(error) {
        console.log(error);
          res.status(500).send({status:0,message : error.message});
      }
} catch (error) {
  console.log(mongoose);
  return res.status(500).send({status:0,message: error.message});
}



}





getPorjectManagerGroupAllAttedanceData = async (req, res, next) => {


  try {
    try {
       // let AttedanceData = await AttedanceModel.Attedance.find({job_site_id : req.params.getJobSiteID});
       if(req.body.date != "" && req.body.jobsite != "")
      {
        let id = mong.Types.ObjectId(req.body.jobsite);
        let prj_id = mong.Types.ObjectId(req.body.prj_id);
        const mydate = req.body.date.split("-");
        const AttedanceData = await AttedanceModel.Attedance.aggregate([
          {
            "$lookup":{
              from:"job_sites",
              localField:"job_site_id",
              foreignField:'_id',
              as: "jobSiteData",
              }, 
          },
          {
            "$lookup":{
              from:"employeeforemen",
              localField:"employee_foreman_id",
              foreignField:'_id',
              as: "empforemenData",
              }, 
          },
          {$match: {"status": Number(req.body.status)}},

          // {$match: {"shift_start_date": {$eq:new Date(moment(moment(req.body.date, 'MM/DD/YYYY')).format('YYYY-MM-DD'))}}},
          { $match: { "shift_start_date": { $gte: new Date(moment(moment(mydate[0], 'MM/DD/YYYY')).format('YYYY-MM-DD')),  $lte: new Date(moment(moment(mydate[1], 'MM/DD/YYYY')).format('YYYY-MM-DD'))  } } }, //01/04/2023  >        12/15/2022
          {$match: {"job_site_id": id}},
          //{$match: {"jobSiteData.job_status": 1}},
          {$match: {"jobSiteData.project_manager_id": prj_id}},
          
          {"$group" : {_id:{//   day: {$dayOfMonth: "$createdAt"},
            // month: {$month: "$createdAt"}, 
            // year: {$year: "$createdAt"},
            // hour: {$hour: "$createdAt"},
            // minute: {$minute: "$createdAt"},
            createdAt:"$createdAt",
            selectHourDeduct:"$selectHourDeduct",

            shift_date:"$shift_start_date",attedanceUniqueID:"$attedanceUniqueID",selectStartTime:"$selectStartTime",selectEndTime:"$selectEndTime",created_at:"$created_at",job_site_name:"$jobSiteData.site_name",job_site_id:"$jobSiteData._id",document_upload:"$document_upload"}, count:{$sum:1}}},
            { $sort: {_id: -1} },


        ]);
        res.status(200).send(AttedanceData);

      }
       else if(req.body.date != "")
       {
        let prj_id = mong.Types.ObjectId(req.body.prj_id);
        const mydate = req.body.date.split("-");
        const AttedanceData = await AttedanceModel.Attedance.aggregate([
          {
            "$lookup":{
              from:"job_sites",
              localField:"job_site_id",
              foreignField:'_id',
              as: "jobSiteData",
              }, 
          },
          {
            "$lookup":{
              from:"employeeforemen",
              localField:"employee_foreman_id",
              foreignField:'_id',
              as: "empforemenData",
              }, 
          },
          // {$match: {"shift_start_date": {$eq:new Date(moment(moment(req.body.date, 'MM/DD/YYYY')).format('YYYY-MM-DD'))}}},
          { $match: { "shift_start_date": { $gte: new Date(moment(moment(mydate[0], 'MM/DD/YYYY')).format('YYYY-MM-DD')),  $lte: new Date(moment(moment(mydate[1], 'MM/DD/YYYY')).format('YYYY-MM-DD'))  } } }, //01/04/2023  >        12/15/2022
          {$match: {"status": Number(req.body.status)}},
          {$match: {"jobSiteData.project_manager_id": prj_id}},
          //{$match: {"jobSiteData.job_status": 1}},
          {"$group" : {_id:{//   day: {$dayOfMonth: "$createdAt"},
            // month: {$month: "$createdAt"}, 
            // year: {$year: "$createdAt"},
            // hour: {$hour: "$createdAt"},
            // minute: {$minute: "$createdAt"},
            createdAt:"$createdAt",
          selectHourDeduct:"$selectHourDeduct",

          shift_date:"$shift_start_date",attedanceUniqueID:"$attedanceUniqueID",selectStartTime:"$selectStartTime",selectEndTime:"$selectEndTime",created_at:"$created_at",job_site_name:"$jobSiteData.site_name",job_site_id:"$jobSiteData._id",document_upload:"$document_upload"}, count:{$sum:1}}},
          { $sort: {_id: -1} },
      ]);
        res.status(200).send(AttedanceData);
       }
       else if(req.body.jobsite != "")
       {
        let id = mong.Types.ObjectId(req.body.jobsite);
        let prj_id = mong.Types.ObjectId(req.body.prj_id);

        const AttedanceData = await AttedanceModel.Attedance.aggregate([
          {
            "$lookup":{
              from:"job_sites",
              localField:"job_site_id",
              foreignField:'_id',
              as: "jobSiteData",
              }, 
          },
          {
            "$lookup":{
              from:"employeeforemen",
              localField:"employee_foreman_id",
              foreignField:'_id',
              as: "empforemenData",
              }, 
          },
          {$match: {"job_site_id": id}},
          {$match: {"jobSiteData.project_manager_id": prj_id}},
          {$match: {"status": Number(req.body.status)}},

          //{$match: {"jobSiteData.job_status": 1}},
          {"$group" : {_id:{//   day: {$dayOfMonth: "$createdAt"},
            // month: {$month: "$createdAt"}, 
            // year: {$year: "$createdAt"},
            // hour: {$hour: "$createdAt"},
            // minute: {$minute: "$createdAt"},
            createdAt:"$createdAt",
          selectHourDeduct:"$selectHourDeduct",

          shift_date:"$shift_start_date",attedanceUniqueID:"$attedanceUniqueID",selectStartTime:"$selectStartTime",selectEndTime:"$selectEndTime",created_at:"$created_at",job_site_name:"$jobSiteData.site_name",job_site_id:"$jobSiteData._id",document_upload:"$document_upload"}, count:{$sum:1}}},
          { $sort: {_id: -1} },

        ]);
       // console.log(AttedanceData);
        res.status(200).send(AttedanceData);

       }
       else
       {
        let prj_id = mong.Types.ObjectId(req.body.prj_id);

        const AttedanceData = await AttedanceModel.Attedance.aggregate([
          {
            "$lookup":{
              from:"job_sites",
              localField:"job_site_id",
              foreignField:'_id',
              as: "jobSiteData",
              }, 
          },
          {
            "$lookup":{
              from:"employeeforemen",
              localField:"employee_foreman_id",
              foreignField:'_id',
              as: "empforemenData",
              }, 
          },
          {$match: {"jobSiteData.project_manager_id": prj_id}},
          {$match: {"status": Number(req.body.status)}},

          //{$match: {"jobSiteData.job_status": 1}},
          {"$group" : {_id:{//   day: {$dayOfMonth: "$createdAt"},
            // month: {$month: "$createdAt"}, 
            // year: {$year: "$createdAt"},
            // hour: {$hour: "$createdAt"},
            // minute: {$minute: "$createdAt"},
            createdAt:"$createdAt",
          selectHourDeduct:"$selectHourDeduct",

          shift_date:"$shift_start_date",attedanceUniqueID:"$attedanceUniqueID",selectStartTime:"$selectStartTime",selectEndTime:"$selectEndTime",created_at:"$created_at",job_site_name:"$jobSiteData.site_name",job_site_id:"$jobSiteData._id",document_upload:"$document_upload"}, count:{$sum:1}}},
          { $sort: {_id: -1} },
   ]);
        //console.log("HELLO "+AttedanceData);
        res.status(200).send(AttedanceData);
      }

    }catch(error) {
      console.log(error);
        res.status(500).send({status:0,message : error.message});
    }
} catch (error) {
console.log(mongoose);
return res.status(500).send({status:0,message: error.message});
}


}


getProjectManagerAllAttedanceData = async (req, res, next) => {
  //console.log(req.body);
    
          try {
             // let AttedanceData = await AttedanceModel.Attedance.find({job_site_id : req.params.getJobSiteID});
             let id = mong.Types.ObjectId(req.body.selectJobSiteid);

             if(req.body.date != "")
             {
              let prj_id = mong.Types.ObjectId(req.body.prj_id);

              const AttedanceData = await AttedanceModel.Attedance.aggregate([
                {
                  "$lookup":{
                    from:"job_sites",
                    localField:"job_site_id",
                    foreignField:'_id',
                    as: "jobSiteData",
                    }, 
                },
                {
                  "$lookup":{
                    from:"employeeforemen",
                    localField:"employee_foreman_id",
                    foreignField:'_id',
                    as: "empforemenData",
                    }, 
                },
                
                {$match: {"shift_start_date": {$eq:req.body.date}}},
                {$match: {"attedanceUniqueID": req.body.parent_id}},
                {$match: {"job_site_id": id}},
                {$match: {"status": Number(req.body.status)}},
                {$match: {"jobSiteData.project_manager_id": prj_id}},

              ]);
              res.status(200).send(AttedanceData);

             }
             else
             {
              let prj_id = mong.Types.ObjectId(req.body.prj_id);

              const AttedanceData = await AttedanceModel.Attedance.aggregate([
                {
                  "$lookup":{
                    from:"job_sites",
                    localField:"job_site_id",
                    foreignField:'_id',
                    as: "jobSiteData",
                    }, 
                },
                {
                  "$lookup":{
                    from:"employeeforemen",
                    localField:"employee_foreman_id",
                    foreignField:'_id',
                    as: "empforemenData",
                    }, 
                },
                {$match: {"job_site_id": id}},
                {$match: {"attedanceUniqueID": req.body.parent_id}},
                {$match: {"status": Number(req.body.status)}},

                {$match: {"jobSiteData.project_manager_id": prj_id}},
        
              //  {"$group" : {_id:{id:"$attedanceUniqueID",shift_date:"$shift_start_date",shift_date:"$shift_start_date"}, count:{$sum:1}}}

                
//                {$match: {"shift_start_date": {$eq:req.body.date}}}

              ]);
              //console.log(AttedanceData);
              res.status(200).send(AttedanceData);

             }
  
          }catch(error) {
            console.log(error);
              res.status(500).send({status:0,message : error.message});
          }
    
  }


  deleteViewAllAttedance = async (req, res, next) => {

 // console.log(req.params);
   //   return false; 
     try {
           try {
   

            let updatedata = AttedanceModel.Attedance.updateMany(
              { attedanceUniqueID: req.params.parent_id },
              {
                $set: {
                 status:Number(req.params.status),
                 updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')
                }
              }
           ).then(result=>{

              var status_data;
            if(req.params.status == 1 || req.params.status == '1')
            {
              status_data = 'Restore';
            }else{
              status_data = 'Archive';
            }
            const HistoryLog_data = HistoryLog.history_log.create({action_by:req.params.action_by,log_activity:status_data+' attendance of Jobsite "'+req.params.site_name.trim()+'" on "'+req.params.date.trim()+'"',create_date:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});


             res.status(200).send({status:1,message : "record Deleted"});
  
           })

             //let user = await AttedanceModel.Attedance.deleteMany({attedanceUniqueID:req.params.parent_id});
             //res.status(200).send({status:1,message : "record Deleted"});
   
           }catch(err) {
               res.status(500).send({status:0,message : err.message});
           }
     } catch (error) {
       console.log(mongoose);
       return res.status(500).send({status:0,
         message: error.message
       });
     }
   }
   


   

   deleteOneAttedanceData = async (req, res, next) => {
     try {
           try {
   
            let DeleteObjectID = mong.Types.ObjectId(req.body.deleteId);
            
           /* let updatedata = AttedanceModel.Attedance.findOneAndUpdate(
              { _id: DeleteObjectID },
              {
                $set: {
                 status:Number(req.body.status),
                 updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')
                }
              }
           ).then(result=>{
             res.status(200).send({status:1,message : "record Deleted"});
  
           })
  */
           
            //console.log(req.body.deleteId);
            //return false; 
       
             let user = await AttedanceModel.Attedance.findByIdAndRemove(DeleteObjectID);

             const HistoryLog_data = await HistoryLog.history_log.create({action_by:req.body.action_by,log_activity:'Delete attendance of Jobsite "'+req.body.site_name.trim()+'" on "'+req.body.shift_start_date.trim()+'"',create_date:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});

             res.status(200).send({status:1,message : "record Deleted"});
   
           }catch(err) {
               res.status(500).send({status:0,message : err.message});
           }
     } catch (error) {
       console.log(mongoose);
       return res.status(500).send({status:0,
         message: error.message
       });
     }
   }
   

updateAttedanceData = async (req, res, next) => {
    var collection = [];
 var count = 1;
    var str_array = req.body.array_data.split(',');
      try {
        for(var i = 0; i < str_array.length; i++) {
          var getdata = str_array[i].split('*');

          try {
            AttedanceModel.Attedance.findByIdAndUpdate(mong.Types.ObjectId(getdata[0]), {
              "shift_start_time": getdata[1],
              "shift_end_time": getdata[2],
              "no_of_employee":getdata[3],
              "hour_deduct":getdata[4],
              "updatedAt":moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')
          },
            function (err, docs) {
            if (err){
            console.log(err);
            return err;
            }
            else{
           // console.log("Updated User : ", docs);
            }
          });

            count++;
          }catch (error) {
            return res.status(500).send({status:0,message: error.message});
            }
        }

        const HistoryLog_data = await HistoryLog.history_log.create({action_by:req.body.action_by,log_activity:'Edit attendance of Jobsite "'+req.body.get_jobsite_data_name.trim()+'" on "'+req.body.global_edit_date.trim()+'"',create_date:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});

        if(count > 0)
        {
          return res.status(200).send({message : "Updated"});
        }else{
          return res.status(500).send({message : "Not Updated"});
        }
  }
  catch(error)
  {
    return res.status(500).send({status:0,message: error.message});
  }
}
  

const Auth = {
  addAttedanceData,
  getAttedance,
  getAllAttedanceData,
  getGroupAllAttedanceData,
  getPorjectManagerGroupAllAttedanceData,
  getProjectManagerAllAttedanceData,
  deleteViewAllAttedance,
  updateAttedanceData,
  deleteOneAttedanceData,
  uploadDocument,
  addAttedanceEdit
};

module.exports = Auth;