const mongoose  = require('../dbConnect');
const moment_tz = require('moment-timezone');

const ShiftTimeModel  = require('../model/ShiftTimeModel');
var moment = require('moment');
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/src/assets/assets/osho_image')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload_osho_image = multer({ storage: storage }).single('myFile');


addShiftTime = async (req, res, next) => {


    try {
      try {
            const user = await ShiftTimeModel.shift_time.create({shift_title:req.body.shift_title,start_time:req.body.start_time,end_time:req.body.end_time,status:1});
            res.status(200).send({message : "Added"});
       
         
        } catch (error) {
          return res.status(500).send({status:0,message: error.message});
        }
    }catch (error) {
      return res.status(500).send({status:0,message: error.message});
    }

}



getShiftTime = async (req, res, next) => {    
    try {
          try {
              const shiftTimeDetails = await ShiftTimeModel.shift_time.find();
              res.status(200).send(shiftTimeDetails);
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


  
  deleteShiftTime = async (req, res, next) => {
    //  return false; 
     try {
           try {
             let user = await ShiftTimeModel.shift_time.findByIdAndRemove(req.params.shiftTimeId);
             res.status(200).send({status:1,message : "record Deleted"});
   
           }catch(err) {
               res.status(500).send({status:0,message : err.message});
           }
     } catch (error) {
       console.log(mongoose);
       return res.status(500).send({status:0,message: error.message});
     }
   }



   updateShiftTime = async (req, res, next) => {
    // console.log(req.body);
     // return false;
    
    try {
  //console.log("HELLO");
          try {
  
           let updatedata = ShiftTimeModel.shift_time.findOneAndUpdate(
              { _id: req.body[0].value },
              {
                $set: {
                  shift_title: req.body[1].value,
                  start_time: req.body[2].value,
                  end_time: req.body[3].value,
                  
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
  
  
const Auth = {
    addShiftTime,
    getShiftTime,
    deleteShiftTime,
    updateShiftTime
};

module.exports = Auth;