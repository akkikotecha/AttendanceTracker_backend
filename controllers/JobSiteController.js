const mongoose  = require('../dbConnect');

const JobSite  = require('../model/jobSiteModel');
const HistoryLog  = require('../model/HistoryModel');


var mong = require('mongoose');

const moment_tz = require('moment-timezone');

var moment = require('moment');

addJobSite = async (req, res, next) => {

  //console.log(req.body[5].value);
  //return false;
    try {
            const job_site = await JobSite.job_site.create({site_name:req.body[0].value,address:req.body[1].value,start_date:req.body[2].value,end_date:req.body[3].value,status:req.body[4].value,project_manager_id:[],job_status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});

            const HistoryLog_data = await HistoryLog.history_log.create({action_by:req.body[5].value,log_activity:'Jobsite ('+req.body[0].value+') Created',create_date:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});
            //const lastid= user._id;
            
            res.status(200).send({message : "Added"});

        }catch (error) {
      return res.status(500).send({status:0,message: error.message});
    }

}



deleteJobSite = async (req, res, next) => {
 //  return false; 
  try {
       

          //let user = await JobSite.job_site.findByIdAndRemove(req.params.JobSiteId);

        

            let updatedata = JobSite.job_site.findOneAndUpdate(
               { _id: req.params.JobSiteId },
               {
                 $set: {
                  job_status:req.params.status,
                  updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')
                 }
               }
            ).then(result=>{
              res.status(200).send({status:1,message : "record Deleted"});
   
            })


            const HistoryLog_data = await HistoryLog.history_log.create({action_by:req.params.action_by,log_activity:req.params.job_site_name,create_date:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});
            


  } catch (error) {
    console.log(mongoose);
    return res.status(500).send({status:0,
      message: error.message
    });
  }
}


getJobSite = async (req, res, next) => {
  // console.log(req.body);
  // return false;
  
  try {
//console.log("HELLO");
        try {
            const JobSiteData = await JobSite.job_site.aggregate([
              {
                "$lookup":{
                  from:"admin_porject_managers",
                  'let': { 'pid': '$project_manager_id' },
                  'pipeline': [
                  { '$match': { '$expr': { '$in': ['$_id', '$$pid'] } } }
                  // Add additional stages here 
                  ],
                  as: "User",
                  }, 
              },
              { $sort: {_id: -1} },
            ]);

            // let JobSiteData = await JobSite.job_site.find();
             //  console.log(JSON.stringify(JobSiteData));
            //return false;
            res.status(200).send(JobSiteData);
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




active_getJobsite = async (req, res, next) => {
  // console.log(req.body);
  // return false;
  
  try {
//console.log("HELLO");
        try {
            const JobSiteData = await JobSite.job_site.aggregate([
              {
                "$lookup":{
                  from:"admin_porject_managers",
                  'let': { 'pid': '$project_manager_id' },
                  'pipeline': [
                  { '$match': { '$expr': { '$in': ['$_id', '$$pid'] } } }
                  // Add additional stages here 
                  ],
                  as: "User",
                  }, 
              },
              {$match: {'job_status': {$eq:1}}},
            ]);

            // let JobSiteData = await JobSite.job_site.find();
             //  console.log(JSON.stringify(JobSiteData));
            //return false;
            res.status(200).send(JobSiteData);
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



AssignProjectManager = async (req, res, next) => {

//  console.log(req.body);
  //return false;
  var collection = []

  //let selectPm = array();
   for(var property of req.body[3].value) {
    //console.log("HELLO "+property);
    //let data = req.body[property].value;
    collection.push(mong.Types.ObjectId(property.trim()))
   }
  // console.log("HELLO "+collection+ "JOBSITE ID: "+req.params.ID);

   // return false;
  
  try {
//console.log("HELLO");
        try {

         let updatedata = JobSite.job_site.findOneAndUpdate(
            { _id: req.params.id },
            {
              $set: {
                project_manager_id:collection,
                updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')
              }
            }
         ).then(result=>{

            
          const HistoryLog_data = HistoryLog.history_log.create({action_by:req.body[2].value,log_activity:req.body[0].value,create_date:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});
          res.status(200).json({status:1,message : "updated"});

         }).catch(err=>{
          res.status(500).send({status:0,message : err.message});
      
         })


         return updatedata;

           
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



EditJobSite = async (req, res, next) => {
    //console.log(req.body[0].value);
     //return false;
   
   try {
 //console.log("HELLO");
         try {

         
          let updatedata = JobSite.job_site.findOneAndUpdate(
             { _id: req.body[0].value },
             {
               $set: {
                 site_name:req.body[1].value,
                 address:req.body[2].value,
                 start_date:req.body[3].value,
                 end_date:req.body[4].value,
                 status:req.body[5].value,
                 updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')
               }
             }
          ).then(result=>{

            const HistoryLog_data = HistoryLog.history_log.create({action_by:req.body[6].value,log_activity:'Jobsite ('+req.body[1].value+') Updated',create_date:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});
 

           res.status(200).json({status:1,message : "updated"});
 
          }).catch(err=>{
           res.status(500).send({status:0,message : err.message});
       
          })
 
          return updatedata;
 
            
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
 
 



getJobSiteAssign = async (req, res, next) => {
  //console.log("HELLO "+getJobSiteAssign);
  try {
        try {
             
             const JobSiteData = await JobSite.job_site.aggregate([
                  {$match: {"project_manager_id": {$in :[mong.Types.ObjectId(req.params.ProjectManagerId)]}}},
                  { "$lookup": {
                     "from": "admin_porject_managers",
                     "let": { "details": "$project_manager_id" },
                     "pipeline": [
                        { "$match": { "$expr": { "$in": [ "$_id", "$$details" ] } } }
                     ],
                     "as": "projact_manager"
                  },
                
                },
                { $sort: {_id: -1} },
          
               ])
             res.status(200).send(JobSiteData);


        }catch(err) {
            res.status(500).send({status:0,message : err.message});
        }
  } catch (error) {
    console.log(mongoose);
    return res.status(500).send({status:0,message: error.message });
  }
}


getJobSiteId = async (req, res, next) => {
  
  try {
        try {
             const JobSiteData = await JobSite.job_site.find({_id : req.params.jobsiteId});
            res.status(200).send({status:1,data : JobSiteData});
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





const Auth = {
  addJobSite,
  getJobSite,
  deleteJobSite,
  AssignProjectManager,
  getJobSiteAssign,
  getJobSiteId,
  EditJobSite,
  active_getJobsite
};

module.exports = Auth;