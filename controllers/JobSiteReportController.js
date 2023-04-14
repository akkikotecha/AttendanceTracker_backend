const mongoose = require("../dbConnect");
const mong = require("mongoose");

const AttedanceModel = require("../model/AttedanceModel");
var moment = require('moment');
const moment_tz = require('moment-timezone');

getJobSiteReport = async (req, res, next) => {
  try {
    console.log("HELLO "+req.body.date);
    if (req.body.date != "" && req.body.jobsite != "") {
      let text = req.body.date;
      const mydate = text.split("-");
      const newData = req.body.jobsite.split(",");
      const AttedanceData = await AttedanceModel.Attedance.aggregate([
        {
          $lookup: {
            from: "job_sites",
            localField: "job_site_id",
            foreignField: "_id",
            as: "jobSiteData",
          },
        },
        {
          $lookup: {
            from: "employeeforemen",
            localField: "employee_foreman_id",
            foreignField: "_id",
            as: "empforemenData",
          },
        },
        { $match: { shift_start_date: { $gte: moment(mydate[0]).format('MM-DD-YYYY') } } }, //01/04/2023  >        12/15/2022
        { $match: { shift_start_date: { $lt: moment(mydate[1]).format('MM-DD-YYYY') } } },  //01/04/2023  <       01/13/2023
        {$match: {"job_site_id": {$in :newData.map((listData)=>{
          return mong.Types.ObjectId(listData);
        })}}},
                 
        {
          $group: {
            _id: {
              day: { $dayOfMonth: "$createdAt" },
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
              hour: { $hour: "$createdAt" },
              minute: { $minute: "$createdAt" },
              selectHourDeduct: "$selectHourDeduct",
              id: "$attedanceUniqueID",
              shift_date: "$shift_start_date",
              attedanceUniqueID: "$attedanceUniqueID",
              selectStartTime: "$selectStartTime",
              selectEndTime: "$selectEndTime",
              created_at: "$created_at",
              job_site_name: "$jobSiteData.site_name",
              job_site_id: "$jobSiteData._id",
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: -1 } },
      ]);
    //  console.log(AttedanceData);
      res.status(200).send(AttedanceData);
    } else if (req.body.date != "") {

      let text = req.body.date;
      const mydate = text.split("-");
      // console.log("0 :  "+moment(mydate[0]).format('MM-DD-YYYY'));
      // console.log("1 : "+moment(mydate[1]).format('MM-DD-YYYY'));
    
      
      const AttedanceData = await AttedanceModel.Attedance.aggregate([
        {
          $lookup: {
            from: "job_sites",
            localField: "job_site_id",
            foreignField: "_id",
            as: "jobSiteData",
          },
        },
        {
          $lookup: {
            from: "employeeforemen",
            localField: "employee_foreman_id",
            foreignField: "_id",
            as: "empforemenData",
          },
        },
        { $match: { shift_start_date: { $gte: moment(mydate[0]).format('MM-DD-YYYY') } } }, //01/04/2023  >        12/15/2022
        { $match: { shift_start_date: { $lt: moment(mydate[1]).format('MM-DD-YYYY') } } },  //01/04/2023  <       01/13/2023
           
        {
          $group: {
            _id: {
              day: { $dayOfMonth: "$createdAt" },
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
              id: "$attedanceUniqueID",
              hour: { $hour: "$createdAt" },
              minute: { $minute: "$createdAt" },
              selectHourDeduct: "$selectHourDeduct",
              shift_date: "$shift_start_date",
              attedanceUniqueID: "$attedanceUniqueID",
              selectStartTime: "$selectStartTime",
              selectEndTime: "$selectEndTime",
              created_at: "$created_at",
              job_site_name: "$jobSiteData.site_name",
              job_site_id: "$jobSiteData._id",
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: -1 } },
      ]);
      console.log("AK "+AttedanceData);
      res.status(200).send(AttedanceData);
    } else if (req.body.jobsite != "") {
      //let id = mong.Types.ObjectId(req.body.jobsite);
      const id = req.body.jobsite.split(",");
      //console.log({ jobsiteNew: newData });
      
      const AttedanceData = await AttedanceModel.Attedance.aggregate([
        {
          $lookup: {
            from: "job_sites",
            localField: "job_site_id",
            foreignField: "_id",
            as: "jobSiteData",
          },
        },
        {
          $lookup: {
            from: "employeeforemen",
            localField: "employee_foreman_id",
            foreignField: "_id",
            as: "empforemenData",
          },
        },
       // { $match: { job_site_id: id } },
        //{$match: {job_site_id: {$in :[ '63b907033fa41780037f7c4b', '63bc3c4eb92f326fbb2d51f1' ]}}},
        {$match: {"job_site_id": {$in :id.map((listData)=>{
          return mong.Types.ObjectId(listData);
        })}}},
        {
          $group: {
            _id: {
              day: { $dayOfMonth: "$createdAt" },
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
              hour: { $hour: "$createdAt" },
              minute: { $minute: "$createdAt" },
              selectHourDeduct: "$selectHourDeduct",

              id: "$attedanceUniqueID",
              shift_date: "$shift_start_date",
              selectStartTime: "$selectStartTime",
              attedanceUniqueID: "$attedanceUniqueID",
              selectEndTime: "$selectEndTime",
              created_at: "$created_at",
              job_site_name: "$jobSiteData.site_name",
              job_site_id: "$jobSiteData._id",
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: -1 } },
      ]);
      //   console.log(AttedanceData);
      res.status(200).send(AttedanceData);
    } else {
      const AttedanceData = await AttedanceModel.Attedance.aggregate([
        {
          $lookup: {
            from: "job_sites",
            localField: "job_site_id",
            foreignField: "_id",
            as: "jobSiteData",
          },
        },
        {
          $lookup: {
            from: "employeeforemen",
            localField: "employee_foreman_id",
            foreignField: "_id",
            as: "empforemenData",
          },
        },
        {
          $group: {
            _id: {
              day: { $dayOfMonth: "$createdAt" },
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
              hour: { $hour: "$createdAt" },
              minute: { $minute: "$createdAt" },
              selectHourDeduct: "$selectHourDeduct",

              id: "$attedanceUniqueID",
              attedanceUniqueID: "$attedanceUniqueID",
              selectStartTime: "$selectStartTime",
              selectEndTime: "$selectEndTime",
              shift_date: "$shift_start_date",
              job_site_name: "$jobSiteData.site_name",
              job_site_id: "$jobSiteData._id",
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: -1 } },
      ]);
      //console.log(AttedanceData);
      res.status(200).send(AttedanceData);
    }
  } catch (error) {
    console.log({error});
    res.status(500).send({ status: 0, message: error.message });
  }
};

const Auth = {
  getJobSiteReport,
};

module.exports = Auth;
