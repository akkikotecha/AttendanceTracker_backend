const mongoose  = require('../dbConnect');

const HistoryLog  = require('../model/HistoryModel');



getHistoryLog = async (req, res, next) => {
  // console.log(req.body);
  // return false;
  
  try {
//console.log("HELLO");
        try {
            const HistoryLogData = await HistoryLog.history_log.aggregate([
                {
                    $lookup: {
                      from: "admin_porject_managers",
                      localField: "action_by",
                      foreignField: "_id",
                      as: "Assign_data",
                    },
                  },
                  { $sort: {_id: -1} },

            ]);

            // let JobSiteData = await JobSite.job_site.find();
               //console.log("HELLO "+JSON.stringify(HistoryLogData));
            //return false;
            res.status(200).send(HistoryLogData);
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
 
  getHistoryLog,
 
};

module.exports = Auth;