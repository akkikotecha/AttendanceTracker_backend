const express = require('express'); //import express
const middleware = require('../middleware/middleware')
const router  = express.Router(); 

const authController = require('../controllers/loginController'); 
const PorjectManagerAdd = require('../controllers/projectManagerController'); 
const Employee = require('../controllers/EmployeeController'); 
const Attedance = require('../controllers/AttedanceController');
const ShiftTime = require('../controllers/ShiftTimeController');
const jobSiteReport = require('../controllers/JobSiteReportController');
const EmployeeReport = require('../controllers/EmployeeReportController');
const MasterReport = require('../controllers/MasterReportController');
const HistoryLog = require('../controllers/HistoryLogController');


const JobSite = require('../controllers/JobSiteController'); 
//Login API
router.post('/login', authController.authLogin); 

//Project Manager API
router.post('/projectManagerAdd', middleware,PorjectManagerAdd.addProjectManager); 
router.get('/getProjectManager', middleware,PorjectManagerAdd.getProjectManager); 
router.get('/deleteProjectManager/:ProjectManagerId/:status/:message/:action_by', middleware,PorjectManagerAdd.deleteProjectManager); 
router.put('/updateProjectManager', middleware,PorjectManagerAdd.updateProjectManager); 
router.put('/updateProfile',middleware, PorjectManagerAdd.updateProfile); 
router.put('/updatePassword',middleware, PorjectManagerAdd.updatePassword); 


//Shift Time API
router.post('/shiftTimeAdd',middleware, ShiftTime.addShiftTime); 
router.get('/getShiftTime',middleware, ShiftTime.getShiftTime); 
router.get('/deleteShiftTime/:shiftTimeId',middleware, ShiftTime.deleteShiftTime); 
router.put('/updateShiftTime',middleware, ShiftTime.updateShiftTime); 


//JobSite API

router.post('/JobsiteAdd',middleware, JobSite.addJobSite); 
router.get('/getJobsite',middleware, JobSite.getJobSite);
router.get('/active_getJobsite',middleware, JobSite.active_getJobsite);

router.get('/deleteJobsite/:JobSiteId/:status/:job_site_name/:action_by',middleware, JobSite.deleteJobSite); 
router.put('/AssignProjectManager/:id',middleware, JobSite.AssignProjectManager); 
router.get('/getJobSiteAssign/:ProjectManagerId',middleware, JobSite.getJobSiteAssign); 
router.get('/getJobSiteId/:jobsiteId',middleware, JobSite.getJobSiteId); 
router.put('/editJobSite',middleware, JobSite.EditJobSite); 

//History Logs API
router.get('/getHistoryLog',middleware, HistoryLog.getHistoryLog);

//Employee Foreman API
router.post('/EmployeeAdd',middleware, Employee.addEmployee); 
router.get('/getEmployeeForeman',middleware, Employee.getEmployeeForeman); 
router.get('/getActiveEmployeeForeman',middleware, Employee.getActiveEmployeeForeman); 

router.post('/deleteEmployee',middleware, Employee.deleteEmployee); 
router.get('/getOnlyEmployee',middleware, Employee.getOnlyEmployee); 
router.get('/getOnlyForeman',middleware, Employee.getOnlyForeman); 
router.put('/updateEmployeeForeman',middleware, Employee.updateEmployeeForeman); 


//Attedance API
router.post('/AttedanceAdd',middleware, Attedance.addAttedanceData);
router.post('/addAttedanceEdit',middleware, Attedance.addAttedanceEdit);
router.post('/uploadDocument',middleware, Attedance.uploadDocument); 
router.get('/getAttedance/:getJobSiteID',middleware, Attedance.getAttedance); 
router.post('/getAllAttedanceData',middleware, Attedance.getAllAttedanceData);
router.post('/getGroupAllAttedanceData',middleware, Attedance.getGroupAllAttedanceData);
router.post('/getPorjectManagerGroupAllAttedanceData',middleware, Attedance.getPorjectManagerGroupAllAttedanceData);
router.post('/getProjectManagerAllAttedanceData',middleware, Attedance.getProjectManagerAllAttedanceData);
router.get('/deleteViewAllAttedance/:parent_id/:status/:site_name/:date/:action_by',middleware, Attedance.deleteViewAllAttedance); 
router.post('/updateAttedanceData',middleware, Attedance.updateAttedanceData);
router.post('/deleteOneAttedanceData',middleware, Attedance.deleteOneAttedanceData);

//Report API
router.post('/getJobSiteReport',middleware, jobSiteReport.getJobSiteReport);
router.post('/getEmployeeReport',middleware, EmployeeReport.getEmployeeReport);
router.post('/getMasterReport',middleware, MasterReport.getMasterReport);
router.post('/getMasterReportView',middleware, MasterReport.getMasterReportView);

module.exports = router;