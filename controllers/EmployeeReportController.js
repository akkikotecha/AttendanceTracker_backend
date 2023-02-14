const mongoose = require("../dbConnect");
const mong = require("mongoose");

const AttedanceModel = require("../model/AttedanceModel");
var moment = require('moment');

getEmployeeReport = async (req, res, next) => {

  const dateEmp  =req.body.date;
  const employee = req.body.employee;
  const jobsite = req.body.jobsite;
  console.log("Upper : %j", req.body)
  try {
    if (dateEmp && employee && jobsite) {
      let text = dateEmp;
      const mydate = text.split("-");
      const newData = employee.split(",");
      const newjobsite = jobsite.split(",");
      
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
        {$match: {"employee_foreman_id": {$in :newData.map((listData)=>{
          return mong.Types.ObjectId(listData);
        })}}},
        {$match: {"job_site_id": {$in :newjobsite.map((listData)=>{
          return mong.Types.ObjectId(listData);
        })}}},
        { $match: { shift_start_date: { $gte: new Date(moment(moment(mydate[0], 'MM/DD/YYYY')).format('YYYY-MM-DD')),  $lte: new Date(moment(moment(mydate[1], 'MM/DD/YYYY')).format('YYYY-MM-DD'))  } } }, //01/04/2023  >        12/15/2022
                   
       
        { $sort: { _id: -1 } },
      ]);
   
      res.status(200).send(AttedanceData);

    }
    else if((dateEmp || jobsite) && employee) {
     
  let text = dateEmp;
      const mydate = text.split("-");
      const newData = employee.split(",");
      //const newjobsite = req.body.jobsite.split(",");
      
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
       {$match: {"employee_foreman_id": {$in :newData.map((listData)=>{
          return mong.Types.ObjectId(listData);
        })}}},
        { $match: { shift_start_date: { $gte: new Date(moment(moment(mydate[0], 'MM/DD/YYYY')).format('YYYY-MM-DD')),  $lte: new Date(moment(moment(mydate[1], 'MM/DD/YYYY')).format('YYYY-MM-DD'))  } } }, //01/04/2023  >        12/15/2022
        
        /* {$match: {"job_site_id": {$in :newjobsite.map((listData)=>{
          return mong.Types.ObjectId(listData);
        })}}},*/
        { $sort: { _id: -1 } },
      ]);
    
      res.status(200).send(AttedanceData);
    } 
    else if((dateEmp || employee) && jobsite) {
     
  let text = dateEmp;
      const mydate = text.split("-");
      const newjobsite = jobsite.split(",");
      
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
        /*{$match: {"employee_foreman_id": {$in :newData.map((listData)=>{
          return mong.Types.ObjectId(listData);
        })}}},*/
        {$match: {"job_site_id": {$in :newjobsite.map((listData)=>{
          return mong.Types.ObjectId(listData);
        })}}},
        { $match: { shift_start_date: { $gte: new Date(moment(moment(mydate[0], 'MM/DD/YYYY')).format('YYYY-MM-DD')),  $lte: new Date(moment(moment(mydate[1], 'MM/DD/YYYY')).format('YYYY-MM-DD'))  } } }, //01/04/2023  >        12/15/2022
        
        { $sort: { _id: -1 } },
      ]);
      res.status(200).send(AttedanceData);
    } 
     else if (dateEmp) {
        let text = dateEmp;
      const mydate = text.split("-");
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
        { $match: { shift_start_date: { $gte: new Date(moment(moment(mydate[0], 'MM/DD/YYYY')).format('YYYY-MM-DD')),  $lte: new Date(moment(moment(mydate[1], 'MM/DD/YYYY')).format('YYYY-MM-DD'))  } } }, //01/04/2023  >        12/15/2022
            
        
        { $sort: { _id: -1 } },
      ]);
      //let text_date = dateEmp;
      //const mydate_date = text_date.split("-");
      //console.log(moment(moment(mydate_date[0], 'MM/DD/YYYY')).format('YYYY-MM-DD'));
//      console.log("AttedanceData "+moment(mydate[0], 'YYYY-MM-DD').format('YYYY-MM-DD')+" - "+moment(mydate[1], 'YYYY-MM-DD').format('YYYY-MM-DD'))
      res.status(200).send(AttedanceData);
      
     }
     else {
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
        
        { $sort: { _id: -1 } },
      ]);
      //console.log(AttedanceData);
      res.status(200).send(AttedanceData);
    }
    //  else{
    //   console.log("HELLO NOT ALL");
    //   console.log("body: %j", req.body)
      
    //  } 
    
    
    
    //console.log("DATE : "+date+" Employee : "+employee+" jobsite : "+jobsite);
    // if (dateEmp != "" && employee != "" && jobsite != "") {
    //   let text = dateEmp;
    //   const mydate = text.split("-");
    //   const newData = employee.split(",");
    //   const newjobsite = jobsite.split(",");
      
    //   const AttedanceData = await AttedanceModel.Attedance.aggregate([
    //     {
    //       $lookup: {
    //         from: "job_sites",
    //         localField: "job_site_id",
    //         foreignField: "_id",
    //         as: "jobSiteData",
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: "employeeforemen",
    //         localField: "employee_foreman_id",
    //         foreignField: "_id",
    //         as: "empforemenData",
    //       },
    //     },
    //     { $match: { shift_start_date: { $gte: moment(mydate[0]).format('MM-DD-YYYY') } } }, //01/04/2023  >        12/15/2022
    //     { $match: { shift_start_date: { $lt: moment(mydate[1]).format('MM-DD-YYYY') } } },  //01/04/2023  <       01/13/2023
    //     {$match: {"employee_foreman_id": {$in :newData.map((listData)=>{
    //       return mong.Types.ObjectId(listData);
    //     })}}},
    //     {$match: {"job_site_id": {$in :newjobsite.map((listData)=>{
    //       return mong.Types.ObjectId(listData);
    //     })}}},
                 
       
    //     { $sort: { _id: -1 } },
    //   ]);
   
    //   res.status(200).send(AttedanceData);
    // }
    // else if ((dateEmp != "" && employee != "") || jobsite == "") {
    //   let text = dateEmp;
    //   const mydate = text.split("-");
    //   const newData = employee.split(",");
    //   //const newjobsite = req.body.jobsite.split(",");
      
    //   const AttedanceData = await AttedanceModel.Attedance.aggregate([
    //     {
    //       $lookup: {
    //         from: "job_sites",
    //         localField: "job_site_id",
    //         foreignField: "_id",
    //         as: "jobSiteData",
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: "employeeforemen",
    //         localField: "employee_foreman_id",
    //         foreignField: "_id",
    //         as: "empforemenData",
    //       },
    //     },
    //     { $match: { shift_start_date: { $gte: moment(mydate[0]).format('MM-DD-YYYY') } } }, //01/04/2023  >        12/15/2022
    //     { $match: { shift_start_date: { $lt: moment(mydate[1]).format('MM-DD-YYYY') } } },  //01/04/2023  <       01/13/2023
    //     {$match: {"employee_foreman_id": {$in :newData.map((listData)=>{
    //       return mong.Types.ObjectId(listData);
    //     })}}},
    //    /* {$match: {"job_site_id": {$in :newjobsite.map((listData)=>{
    //       return mong.Types.ObjectId(listData);
    //     })}}},*/
    //     { $sort: { _id: -1 } },
    //   ]);
    
    //   res.status(200).send(AttedanceData);
    // } 
    // else if ((dateEmp != "" && employee != "") || jobsite  == "") {
    //   let text = dateEmp;
    //   const mydate = text.split("-");
    //   const newjobsite = jobsite.split(",");
      
    //   const AttedanceData = await AttedanceModel.Attedance.aggregate([
    //     {
    //       $lookup: {
    //         from: "job_sites",
    //         localField: "job_site_id",
    //         foreignField: "_id",
    //         as: "jobSiteData",
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: "employeeforemen",
    //         localField: "employee_foreman_id",
    //         foreignField: "_id",
    //         as: "empforemenData",
    //       },
    //     },
    //     { $match: { shift_start_date: { $gte: moment(mydate[0]).format('MM-DD-YYYY') } } }, //01/04/2023  >        12/15/2022
    //     { $match: { shift_start_date: { $lt: moment(mydate[1]).format('MM-DD-YYYY') } } },  //01/04/2023  <       01/13/2023
    //     /*{$match: {"employee_foreman_id": {$in :newData.map((listData)=>{
    //       return mong.Types.ObjectId(listData);
    //     })}}},*/
    //     {$match: {"job_site_id": {$in :newjobsite.map((listData)=>{
    //       return mong.Types.ObjectId(listData);
    //     })}}},
    //     { $sort: { _id: -1 } },
    //   ]);
    //   res.status(200).send(AttedanceData);
    // } 
    //  else if (dateEmp != "") {
    //   // let text = dateEmp;
    //   // const mydate = text.split("-");
    //   // console.log(new Date(Date.parse(mydate[0])))
    //   // // console.log('TEXT : ' +moment(new Date(mydate[0])).format('MM-DD-YYYY')+"T00:00:00.000Z"+" : "+moment(new Date(mydate[1])).format('MM-DD-YYYY')+"T00:00:00.000Z");
    //   // const AttedanceData = await AttedanceModel.Attedance.aggregate([
    //   //   {
    //   //     $lookup: {
    //   //       from: "job_sites",
    //   //       localField: "job_site_id",
    //   //       foreignField: "_id",
    //   //       as: "jobSiteData",
    //   //     },
    //   //   },
    //   //   {
    //   //     $lookup: {
    //   //       from: "employeeforemen",
    //   //       localField: "employee_foreman_id",
    //   //       foreignField: "_id",
    //   //       as: "empforemenData",
    //   //     },
    //   //   },
    //   //   { $match: { shift_start_date: { $gte: moment(mydate[0]).format('MM-DD-YYYY')+"T00:00:00.000Z" } } }, //01/04/2023  >        12/15/2022
    //   //   { $match: { shift_start_date: { $lt: moment(mydate[1]).format('MM-DD-YYYY')+"T00:00:00.000Z" } } },  //01/04/2023  <       01/13/2023
           
        
    //   //   { $sort: { _id: -1 } },
    //   // ]);
    //   // res.status(200).send(AttedanceData);
    //  } 
    // else {
    //   const AttedanceData = await AttedanceModel.Attedance.aggregate([
    //     {
    //       $lookup: {
    //         from: "job_sites",
    //         localField: "job_site_id",
    //         foreignField: "_id",
    //         as: "jobSiteData",
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: "employeeforemen",
    //         localField: "employee_foreman_id",
    //         foreignField: "_id",
    //         as: "empforemenData",
    //       },
    //     },
        
    //     { $sort: { _id: -1 } },
    //   ]);
    //   //console.log(AttedanceData);
    //   res.status(200).send(AttedanceData);
    // }
  } catch (error) {
    console.log({error});
    res.status(500).send({ status: 0, message: error.message });
  }
};

const Auth = {
  getEmployeeReport,
};

module.exports = Auth;
