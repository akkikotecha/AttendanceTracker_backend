const express = require('express'); //import express

const router  = express.Router(); 

const authController = require('../controllers/loginController'); 
const PorjectManagerAdd = require('../controllers/projectManagerController'); 
const Employee = require('../controllers/EmployeeController'); 
const Attedance = require('../controllers/AttedanceController');
const ShiftTime = require('../controllers/ShiftTimeController');
const jobSiteReport = require('../controllers/JobSiteReportController');
const EmployeeReport = require('../controllers/EmployeeReportController');
const MasterReport = require('../controllers/MasterReportController');


const JobSite = require('../controllers/JobSiteController'); 
//Login API
router.post('/login', authController.authLogin); 

//Project Manager API
router.post('/projectManagerAdd', PorjectManagerAdd.addProjectManager); 
router.get('/getProjectManager', PorjectManagerAdd.getProjectManager); 
router.get('/deleteProjectManager/:ProjectManagerId', PorjectManagerAdd.deleteProjectManager); 
router.put('/updateProjectManager', PorjectManagerAdd.updateProjectManager); 


//Shift Time API
router.post('/shiftTimeAdd', ShiftTime.addShiftTime); 
router.get('/getShiftTime', ShiftTime.getShiftTime); 
router.get('/deleteShiftTime/:shiftTimeId', ShiftTime.deleteShiftTime); 
router.put('/updateShiftTime', ShiftTime.updateShiftTime); 


//JobSite API

router.post('/JobsiteAdd', JobSite.addJobSite); 
router.get('/getJobsite', JobSite.getJobSite); 
router.get('/deleteJobsite/:JobSiteId', JobSite.deleteJobSite); 
router.put('/AssignProjectManager/:ID', JobSite.AssignProjectManager); 
router.get('/getJobSiteAssign/:ProjectManagerId', JobSite.getJobSiteAssign); 
router.get('/getJobSiteId/:jobsiteId', JobSite.getJobSiteId); 
router.put('/editJobSite', JobSite.EditJobSite); 

//Employee Foreman API

router.post('/EmployeeAdd', Employee.addEmployee); 
router.get('/getEmployeeForeman', Employee.getEmployeeForeman); 
router.get('/deleteEmployee/:EmployeeId', Employee.deleteEmployee); 
router.get('/getOnlyEmployee', Employee.getOnlyEmployee); 
router.get('/getOnlyForeman', Employee.getOnlyForeman); 
router.put('/updateEmployeeForeman', Employee.updateEmployeeForeman); 


//Attedance API
router.post('/AttedanceAdd', Attedance.addAttedanceData); 
router.post('/uploadDocument', Attedance.uploadDocument); 

router.get('/getAttedance/:getJobSiteID', Attedance.getAttedance); 
router.post('/getAllAttedanceData', Attedance.getAllAttedanceData);
router.post('/getGroupAllAttedanceData', Attedance.getGroupAllAttedanceData);
router.post('/getPorjectManagerGroupAllAttedanceData', Attedance.getPorjectManagerGroupAllAttedanceData);
router.post('/getProjectManagerAllAttedanceData', Attedance.getProjectManagerAllAttedanceData);
router.get('/deleteViewAllAttedance/:parent_id', Attedance.deleteViewAllAttedance); 
router.post('/updateAttedanceData', Attedance.updateAttedanceData);
router.post('/deleteOneAttedanceData', Attedance.deleteOneAttedanceData);

//Report API
router.post('/getJobSiteReport', jobSiteReport.getJobSiteReport);
router.post('/getEmployeeReport', EmployeeReport.getEmployeeReport);
router.post('/getMasterReport', MasterReport.getMasterReport);


module.exports = router;