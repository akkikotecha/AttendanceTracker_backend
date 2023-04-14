const mongoose  = require('../dbConnect');

const EmployeeModel  = require('../model/EmployeeModel');
const HistoryLog  = require('../model/HistoryModel');

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




addEmployee = async (req, res, next) => {

  upload_osho_image(req, res, async(err) => {
//console.log(req.body);
  //   return false;
     var image = '';
     if(req.file == '' || req.file == undefined) {
       image="";
     }else{
       image="assets/assets/upload/"+req.file.originalname;
     }

    try {
      //console.log(req.body);
      //return false;
      const job_site = await EmployeeModel.EmployeeForeman.create({first_name:req.body.add_first_name,last_name:req.body.add_last_name,oso_id:req.body.add_osho_id,osho_image:image,mobile_no:req.body.add_mobile_number,email:req.body.add_email_address,employee_and_foreman_select:req.body.add_selectEMployee,no_of_employee:req.body.no_of_employee,oshoIdExpireDate:req.body.add_expire_date,status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});
            //const lastid= user._id;
            
            const HistoryLog_data = await HistoryLog.history_log.create({action_by:req.body.action_by,log_activity:'Employee/Foreman ('+req.body.add_first_name+' '+req.body.add_last_name+') Created',create_date:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});

                res.status(200).send({message : "Added"});
           
        }catch (error) {
      return res.status(500).send({status:0,message: error.message});
    }

  });
}


deleteEmployee = async (req, res, next) => {
  //console.log(req.body);
  //return false;
  try {
        try {

          let updatedata = EmployeeModel.EmployeeForeman.findOneAndUpdate(
            { _id: req.body.id },
            {
              $set: {
               status:req.body.status,
           updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')
              }
            }
         ).then(result=>{
          const HistoryLog_data = 
 HistoryLog.history_log.create({action_by:req.body.pm_id,log_activity:req.body.message,create_date:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});
           res.status(200).send({status:1,message : "record Deleted"});

         })
          // let user = await EmployeeModel.EmployeeForeman.findByIdAndRemove(req.params.EmployeeId);
          // res.status(200).send({status:1,message : "record Deleted"});

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

getEmployeeForeman = async (req, res, next) => {
  try {
        try {
            let JobSiteData = await EmployeeModel.EmployeeForeman.find().sort({_id:-1});

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

getActiveEmployeeForeman = async (req, res, next) => {
  try {
        try {
            let JobSiteData = await EmployeeModel.EmployeeForeman.find({status: { $eq: 1 }});

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



getOnlyEmployee = async (req, res, next) => {
  try {
        try {
            let JobSiteData = await EmployeeModel.EmployeeForeman.find({employee_and_foreman_select : "Employee"});

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

getOnlyForeman = async (req, res, next) => {
  try {
        try {
            let JobSiteData = await EmployeeModel.EmployeeForeman.find({employee_and_foreman_select : "Foreman"});

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

updateEmployeeForeman = async (req, res, next) => {
   //console.log(req.body);
  //  return false;
  
  upload_osho_image(req, res, async(err) => {
    
    //console.log(req.body);
    //return false;
    var image = '';
    if(req.file == '' || req.file == undefined) {
      image="";

      try {
        //console.log("HELLO");
                try {
        
                 let updatedata = EmployeeModel.EmployeeForeman.findOneAndUpdate(
                    { _id: req.body.edit_id },
                    {
                      $set: {
                        employee_and_foreman_select:req.body.edit_selectEMployee,
                        first_name: req.body.edit_first_name,
                        last_name: req.body.edit_last_name,
                        oso_id: req.body.edit_osho_id,
                        oshoExpiryDate:req.body.edit_expire_date,
                        email:req.body.edit_email_address,
                        mobile_no:req.body.edit_mobile_number,
                        updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')
                      }
                    }
                 ).then(result=>{

                  const HistoryLog_data = HistoryLog.history_log.create({action_by:req.body.action_by,log_activity:'Employee/Foreman ('+req.body.edit_first_name+' '+req.body.edit_last_name+') Updated',create_date:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});
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
        
    }else{
      image="assets/assets/upload/"+req.file.originalname;
      try {
        //console.log("HELLO");
                try {
        
                 let updatedata = EmployeeModel.EmployeeForeman.findOneAndUpdate(
                    { _id: req.body.edit_id },
                    {
                      $set: {
                        employee_and_foreman_select:req.body.edit_selectEMployee,
                        osho_image: image,
                        first_name: req.body.edit_first_name,
                        last_name: req.body.edit_last_name,
                        oso_id: req.body.edit_osho_id,
                        oshoExpiryDate:req.body.edit_expire_date,
                        email:req.body.edit_email_address,
                        mobile_no:req.body.edit_mobile_number,
                        updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')
                        
                      }
                    }
                 ).then(result=>{

                  const HistoryLog_data = HistoryLog.history_log.create({action_by:req.body.action_by,log_activity:'Employee/Foreman ('+req.body.edit_first_name+' '+req.body.edit_last_name+') Updated',create_date:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});
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


});
}

const Auth = {
  addEmployee,
  getEmployeeForeman,
  getActiveEmployeeForeman,
  deleteEmployee,
  getOnlyEmployee,
  getOnlyForeman,
  updateEmployeeForeman
};

module.exports = Auth;