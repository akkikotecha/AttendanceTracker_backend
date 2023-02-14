const mongoose  = require('../dbConnect');

const User  = require('../model/userModel');

const role_master  = require('../model/rolesModel');
const bcrypt = require('bcrypt')

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

            const user = await User.User.create({first_name:req.body.add_first_name,last_name:req.body.add_last_name,oso_id:req.body.add_osho_id,osho_image:image,mobile_no:req.body.add_mobile_number,email:req.body.add_email_address, password:securePassword,role_id:userDetails._id,oshoExpiryDate:req.body.add_expire_date});
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
//console.log("HELLO");
        try {

          let user = await User.User.findByIdAndRemove(req.params.ProjectManagerId);
        //  let role = await User.UserRole.findByIdAndRemove(req.params.roleId);
          res.status(200).send({status:1,message : "record Deleted"});

                    // const userDetails = await User.User.findByIdAndRemove({'_id':req.params.ProjectManagerId}, async(err, doc) => {
            

          //     const deleteRole = await User.UserRole.deleteOne({'_id':req.params.roleId}, (err, doc) => {
          //         res.status(200).send({status:1,message : "record Deleted"});

          //       })

          // })
           
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
  updateProjectManager
};

module.exports = Auth;