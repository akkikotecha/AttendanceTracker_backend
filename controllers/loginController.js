const mongoose  = require('../dbConnect');

const User  = require('../model/userModel');

const role_master  = require('../model/rolesModel');
const moment_tz = require('moment-timezone');

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

authLogin = async (req, res, next) => {
  try {
        try {
            const userDetails = await User.User.aggregate([
              {
                "$lookup":{
                  from:"role_masters",
                  localField:"role_id",
                  foreignField:'_id',
                  as: "Roles",
                  }, 
              },
              {$match: {'email': {$eq:req.body.email}}},
              {$match: {'status': {$eq:1}}},
              
              
            ]);
             // console.log("userDetails "+userDetails.replace(/\s/g, ''))
            if(userDetails)
            {
              if(userDetails.length === 0)
              {
                res.status(200).send({status:0,data : "Invalid email or password"});

              }else
              {
                console.log("PASS "+userDetails[0].password);
                if(userDetails[0].password)
                {
                  let bool = bcrypt.compareSync(req.body.password,userDetails[0].password)
                  if(bool ==false)
                  {
                    res.status(200).send({status:0,data : "Incorrect Password"});
     
                  }else
                  {

                    const token = jwt.sign({"email":req.body.email},
                      process.env.JWT_SECRET_KEY,
                       {
                         expiresIn: "1m",
                       }
                    );
              
                    // save user token
                    //userDetails.token = token;
                    res.status(200).send({status:1,data : userDetails,token:token});
     
                  }
                }else{
                  res.status(200).send({status:0,data : "Incorrect Password"});
                }
                
  
              }
            }
        }catch(err) {
            res.status(500).send({status:0,message : err.message});
        }
  } catch (error) {
    console.log(mongoose);
    return res.status(500).send({status:0,
      message: error.message
    });
  }

//try{
//  const userDetails = await role_master.rolesModel.findOne({role_name : "Admin"});
  //res.status(200).send({message : userDetails._id});

//return false;

//   const user = await User.User.create({first_name:req.body.first_name,last_name:req.body.last_name,oso_id:req.body.oso_id,mobile_no:req.body.mobile_no,email:req.body.email, password:req.body.password});
//   const lastid= user._id;
//   try{

//     const userDetails = await role_master.rolesModel.findOne({role_name : "Admin"});
//     //res.status(200).send({message : userDetails._id});


//     const role = await User.UserRole.create({role_id:userDetails._id,User:lastid});
//     res.status(200).send({message : "Added"});

//   }catch(error)
//   {
//     console.log(error.message);
//   }
// }catch(error)
// {
//   console.log(error.message);
// }

// try{
//   const user = await role_master.rolesModel.create({role_name:req.body.role_name});
//   res.status(200).send({message : "Added"});

// //   
// }catch(error)
// {
//   console.log(error.message);
// }


}



const Auth = {
    authLogin
};

module.exports = Auth;