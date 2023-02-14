const mongoose  = require('../dbConnect');
var mong = require('mongoose');

const AttedanceModel  = require('../model/AttedanceModel');

const bcrypt = require('bcrypt')

const multer = require('multer');

const path = require('path');
var moment = require('moment');
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
  var str_array = req.body.array_data.split(',');
  //var employee_data = req.body.array_foreman.split(',');
    try {
      for(var i = 0; i < str_array.length; i++) {
        var getdata = str_array[i].split('*');
        collection.push({attedanceUniqueID:uniqueNo,job_site_id:req.body.jobSiteId,type:getdata[6],employee_foreman_id:getdata[1],shift_start_date:new Date(getdata[0]),shift_start_time:getdata[2],shift_end_time:getdata[3],hour_deduct:getdata[4],notes:req.body.notes,no_of_employee:getdata[5],status:1,selectStartTime:getdata[7],selectEndTime:getdata[8],selectHourDeduct:getdata[9],assign_id:getdata[10],document_upload:getdata[11]})   
      }
     // console.log("EHLLO "+JSON.stringify(collection))
     // return false;
      try {
        const Attedance = await AttedanceModel.Attedance.insertMany(collection);
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
    
    try {
      try {
         // let AttedanceData = await AttedanceModel.Attedance.find({job_site_id : req.params.getJobSiteID});
         if(req.body.date != "" && req.body.jobsite != "")
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
            //{ $match: { shift_start_date: { $gte: new Date(moment(moment(mydate[0], 'MM/DD/YYYY')).format('YYYY-MM-DD'))  } } }, //01/04/2023  >        12/15/2022
          
            {$match: {"shift_start_date": {$eq:new Date(moment(moment(req.body.date, 'MM/DD/YYYY')).format('YYYY-MM-DD'))}}},
            {$match: {"job_site_id": id}},
            
            {"$group" : {_id:{day: {$dayOfMonth: "$createdAt"},
            month: {$month: "$createdAt"}, 
            year: {$year: "$createdAt"},
            hour: {$hour: "$createdAt"},
            minute: {$minute: "$createdAt"},
            selectHourDeduct:"$selectHourDeduct",
            id:"$attedanceUniqueID",shift_date:"$shift_start_date",attedanceUniqueID:"$attedanceUniqueID",selectStartTime:"$selectStartTime",selectEndTime:"$selectEndTime",created_at:"$created_at",job_site_name:"$jobSiteData.site_name",job_site_id:"$jobSiteData._id",document_upload:"$document_upload"}, count:{$sum:1}}},
            { $sort: {_id: -1} },



          ]);
          res.status(200).send(AttedanceData);
 
        }
         else if(req.body.date != "")
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
            
            {$match: {"shift_start_date": {$eq:new Date(moment(moment(req.body.date, 'MM/DD/YYYY')).format('YYYY-MM-DD'))}}},
            {"$group" : {_id:{day: {$dayOfMonth: "$createdAt"},
            month: {$month: "$createdAt"}, 
            year: {$year: "$createdAt"},id:"$attedanceUniqueID",
            hour: {$hour: "$createdAt"},
            minute: {$minute: "$createdAt"},
            selectHourDeduct:"$selectHourDeduct",

            shift_date:"$shift_start_date",attedanceUniqueID:"$attedanceUniqueID",selectStartTime:"$selectStartTime",selectEndTime:"$selectEndTime",created_at:"$created_at",job_site_name:"$jobSiteData.site_name",job_site_id:"$jobSiteData._id",document_upload:"$document_upload"}, count:{$sum:1}}},
            { $sort: {_id: -1} },


          ]);
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
            {"$group" : {_id:{day: {$dayOfMonth: "$createdAt"},
            month: {$month: "$createdAt"}, 
            year: {$year: "$createdAt"},
            hour: {$hour: "$createdAt"},
            minute: {$minute: "$createdAt"},
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
            {"$group" : {_id:{
              day: {$dayOfMonth: "$createdAt"},
               month: {$month: "$createdAt"}, 
               year: {$year: "$createdAt"},
               hour: {$hour: "$createdAt"},
               minute: {$minute: "$createdAt"},
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
          
          {$match: {"shift_start_date": {$eq:new Date(moment(moment(req.body.date, 'MM/DD/YYYY')).format('YYYY-MM-DD'))}}},
          {$match: {"job_site_id": id}},

          {$match: {"jobSiteData.project_manager_id": prj_id}},
          
          {"$group" : {_id:{day: {$dayOfMonth: "$createdAt"},
            month: {$month: "$createdAt"}, 
            year: {$year: "$createdAt"},id:"$attedanceUniqueID",
            hour: {$hour: "$createdAt"},
            minute: {$minute: "$createdAt"},
            selectHourDeduct:"$selectHourDeduct",

            shift_date:"$shift_start_date",attedanceUniqueID:"$attedanceUniqueID",selectStartTime:"$selectStartTime",selectEndTime:"$selectEndTime",created_at:"$created_at",job_site_name:"$jobSiteData.site_name",job_site_id:"$jobSiteData._id",document_upload:"$document_upload"}, count:{$sum:1}}},
            { $sort: {_id: -1} },


        ]);
        res.status(200).send(AttedanceData);

      }
       else if(req.body.date != "")
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
          {$match: {"shift_start_date": {$eq:new Date(moment(moment(req.body.date, 'MM/DD/YYYY')).format('YYYY-MM-DD'))}}},
          {$match: {"jobSiteData.project_manager_id": prj_id}},
          {"$group" : {_id:{day: {$dayOfMonth: "$createdAt"},
          month: {$month: "$createdAt"}, 
          year: {$year: "$createdAt"},id:"$attedanceUniqueID",
          hour: {$hour: "$createdAt"},
          minute: {$minute: "$createdAt"},
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
          {"$group" : {_id:{day: {$dayOfMonth: "$createdAt"},
          month: {$month: "$createdAt"}, 
          year: {$year: "$createdAt"},id:"$attedanceUniqueID",
          hour: {$hour: "$createdAt"},
          minute: {$minute: "$createdAt"},
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
          {"$group" : {_id:{day: {$dayOfMonth: "$createdAt"},
          month: {$month: "$createdAt"}, 
          year: {$year: "$createdAt"},id:"$attedanceUniqueID",
          hour: {$hour: "$createdAt"},
          minute: {$minute: "$createdAt"},
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
    //  return false; 
     try {
           try {
   

             let user = await AttedanceModel.Attedance.deleteMany({attedanceUniqueID:req.params.parent_id});
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
   


   

   deleteOneAttedanceData = async (req, res, next) => {
     try {
           try {
   
  
            let DeleteObjectID = mong.Types.ObjectId(req.body.deleteId);
            //console.log(req.body.deleteId);
            //return false; 
       
             let user = await AttedanceModel.Attedance.findByIdAndRemove(DeleteObjectID);
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
  uploadDocument
};

module.exports = Auth;