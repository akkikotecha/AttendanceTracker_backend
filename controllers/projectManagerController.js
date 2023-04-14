const mongoose  = require('../dbConnect');

const User  = require('../model/userModel');
const HistoryLog  = require('../model/HistoryModel');

const role_master  = require('../model/rolesModel');
const bcrypt = require('bcrypt')

const multer = require('multer');
var moment = require('moment');
const moment_tz = require('moment-timezone');

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


addProjectManager = async (req, res, next) => {

  upload_osho_image(req, res, async(err) => {
    
    var image = '';
    if(req.file == '' || req.file == undefined) {
      image="";
    }else{
      image="assets/assets/upload/"+req.file.originalname;
    }
    const saltPassword = await bcrypt.genSalt(4);
    const securePassword = await bcrypt.hash(req.body.add_password, saltPassword);


      try {
        const userDetails = await role_master.rolesModel.findOne({role_name : "Project Manager"});

            const user = await User.User.create({first_name:req.body.add_first_name,last_name:req.body.add_last_name,oso_id:req.body.add_osho_id,osho_image:image,mobile_no:req.body.add_mobile_number,email:req.body.add_email_address, status:1,password:securePassword,role_id:userDetails._id,oshoExpiryDate:req.body.add_expire_date,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});
            
            
             const HistoryLog_data = await HistoryLog.history_log.create({action_by:req.body.action_by,log_activity:'Project Manager ('+req.body.add_first_name+' '+req.body.add_last_name+') Created',create_date:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});
 
            res.status(200).send({message : "Added"});
       
           
        } catch (error) {
          return res.status(500).send({status:0,message: error.message});
        }
    

  })
}



deleteProjectManager = async (req, res, next) => {
  //  console.log(req.params);
  //   return false;
  
  try {

        
    let updatedata = User.User.findOneAndUpdate(
      { _id: req.params.ProjectManagerId },
      {
        $set: {
         status:req.params.status,
         updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')
        }
      }
   ).then(result=>{

    const HistoryLog_data = 
 HistoryLog.history_log.create({action_by:req.params.action_by,log_activity:req.params.message,create_date:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});
            
     res.status(200).send({status:1,message : "record Deleted"});

   })
    /*
    try {

          let user = await User.User.findByIdAndRemove(req.params.ProjectManagerId);
          res.status(200).send({status:1,message : "record Deleted"});

        
           
        }catch(err) {
            res.status(500).send({status:0,message : err.message});
        }*/
  } catch (error) {
    console.log(mongoose);
    return res.status(500).send({status:0,
      message: error.message
    });
  }
}




updateProjectManager = async (req, res, next) => {
  // console.log(req.body);
   // return false;

   upload_osho_image(req, res, async(err) => {
    
    //console.log(req.body);
    //return false;
    var image = '';
    if(req.file == '' || req.file == undefined) {
      image="";
      try {
        //console.log("HELLO");
                try {
        
                 let updatedata = User.User.findOneAndUpdate(
                    { _id: req.body.edit_id },
                    {
                      $set: {
                        first_name: req.body.edit_first_name,
                        last_name: req.body.edit_last_name,
                        oso_id: req.body.edit_osho_id,
                        oshoExpiryDate:req.body.edit_oshoExpiryDate,
                        email:req.body.edit_email,
                        mobile_no:req.body.edit_mobile_number,
                        updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')
                        
                      }
                    }
                 ).then(result=>{

                  const HistoryLog_data = HistoryLog.history_log.create({action_by:req.body.action_by,log_activity:'Project Manager ('+req.body.edit_first_name+' '+req.body.edit_last_name+') Updated',create_date:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm'),status:1,createdAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')});
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
        
                 let updatedata = User.User.findOneAndUpdate(
                    { _id: req.body.edit_id },
                    {
                      $set: {
                        first_name: req.body.edit_first_name,
                        last_name: req.body.edit_last_name,
                        oso_id: req.body.edit_osho_id,
                        osho_image: image,
                        oshoExpiryDate:req.body.edit_oshoExpiryDate,
                        email:req.body.edit_email,
                        mobile_no:req.body.edit_mobile_number,
                        updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')
                        
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



updateProfile = async (req, res, next) => {
  
   // console.log(req.body);
 //   return false;
    
      try {
        //console.log("HELLO");
                try {

                
                 let updatedata = User.User.findOneAndUpdate(
                    { _id: req.body[0].value },
                    {
                      $set: {
                        first_name: req.body[1].value,
                        last_name: req.body[2].value,
                        mobile_no:req.body[3].value,
                        email:req.body[4].value,
                        updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')
                        
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


updatePassword = async (req, res, next) => {
  
   //console.log(req.body);
   //return false;
   
     try {
       //console.log("HELLO");
               try {

          //      const saltPassword = await bcrypt.genSalt(4);
    //const securePassword = await bcrypt.hash(req.body[1].value, saltPassword);
               

    try {
      // get user
      const user = await User.User.findById(req.body[0].value);
      if (!user) {
          return res.status(200).json({status:1,message : "User not found"});
          //res.status(400).send('User not found');
      }
  
      // validate old password
      const isValidPassword = await bcrypt.compare(req.body[1].value, user.password);
      if (!isValidPassword) {
          return res.status(200).json({status:1,message : "Please enter correct old password"});
        //  res.status(400).send('Please enter correct old password');
      }
  
      // hash new password

      const saltPassword = await bcrypt.genSalt(4);
      const securePassword = await bcrypt.hash(req.body[2].value, saltPassword);

    
        let updatedata = User.User.findOneAndUpdate(
           { _id: req.body[0].value },
           {
             $set: {
              password:securePassword,
               updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')
               
             }
           }
        ).then(result=>{
         res.status(200).json({status:1,message : "updated"});

        }).catch(err=>{
         res.status(500).send({status:0,message : err.message});
     
        })

     // const hashedPassword = await bcrypt.hash(password, 12);
  
      // update user's password
      //user.password = hashedPassword;
      //const updatedUser = await user.save();
  
      //return res.json({ user: updatedUser });
    } catch (err) {
      console.log(err);
      return res.status(500).send('Something went wrong. Try again');
    }


  //   bcrypt
  // .hash(password, saltRounds)
  // .then(hash => {
  //   console.log('Hash ', hash)
  // })
  

  //   console.log("HELLO "+securePassword);
                // let updatedata = User.User.findOneAndUpdate(
                //    { _id: req.body[0].value },
                //    {
                //      $set: {
                //        first_name: req.body[1].value,
                //        last_name: req.body[2].value,
                //        email:req.body[3].value,
                //        mobile_no:req.body[4].value,
                //        updatedAt:moment_tz().tz("America/New_York").format('MM-DD-YYYY HH:mm')
                       
                //      }
                //    }
                // ).then(result=>{
                //  res.status(200).json({status:1,message : "updated"});
       
                // }).catch(err=>{
                //  res.status(500).send({status:0,message : err.message});
             
                // })
       
                // return updatedata;
       
                  
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


getProjectManager = async (req, res, next) => {

  try {
//console.log("HELLO");
        try {
            const userDetails = await User.User.aggregate([
            
              {
                "$lookup":{
                  from:"job_sites",
                  'let': { 'pid': '$_id' },
                  'pipeline': [
                  { '$match': { '$expr': { '$in': ['$$pid','$project_manager_id'] } } }
                  ],
                  as: "jobSite",
                  }, 
              },
              {
                "$lookup":{
                  from:"role_masters",
                  localField:"role_id",
                  foreignField:'_id',
                  as: "Roles",
                  }, 
              },
//              {$match: {"jobSite.job_status": 1}},
              //{$match: {'jobSite.job_status': {$eq:1}}},

              {$match: {'Roles.role_name': {$eq:"Project Manager"}}}
            ]);
          //  console.log("HELLO : "+userDetails);
            res.status(200).send(userDetails);
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
  addProjectManager,
  getProjectManager,
  deleteProjectManager,
  updateProjectManager,
  updateProfile,
  updatePassword
};

module.exports = Auth;