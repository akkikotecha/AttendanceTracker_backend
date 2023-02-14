const mongoose  = require('../dbConnect');

const EmployeeModel  = require('../model/EmployeeModel');

const multer = require('multer');

const path = require('path');

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
      const job_site = await EmployeeModel.EmployeeForeman.create({first_name:req.body.add_first_name,last_name:req.body.add_last_name,oso_id:req.body.add_osho_id,osho_image:image,mobile_no:req.body.add_mobile_number,email:req.body.add_email_address,employee_and_foreman_select:req.body.add_selectEMployee,no_of_employee:req.body.no_of_employee,oshoIdExpireDate:req.body.add_expire_date,status:1});
            //const lastid= user._id;
            
                res.status(200).send({message : "Added"});
           
        }catch (error) {
      return res.status(500).send({status:0,message: error.message});
    }

  });
}


deleteEmployee = async (req, res, next) => {
  try {
        try {

          let user = await EmployeeModel.EmployeeForeman.findByIdAndRemove(req.params.EmployeeId);
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

getEmployeeForeman = async (req, res, next) => {
  try {
        try {
            let JobSiteData = await EmployeeModel.EmployeeForeman.find();

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
                        mobile_no:req.body.edit_mobile_number
                        
                      }
                    }
                 ).then(result=>{
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
                        mobile_no:req.body.edit_mobile_number
                        
                      }
                    }
                 ).then(result=>{
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
  deleteEmployee,
  getOnlyEmployee,
  getOnlyForeman,
  updateEmployeeForeman
};

module.exports = Auth;