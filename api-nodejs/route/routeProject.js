const express=require('express');
const bodyParser=require('body-parser');
const routeProject=express.Router();
const projectCtl=require('../controller/project');
const {auth,multer_}=require('../middleware/middleware');

 //parsse html form
const urlencoded=bodyParser.urlencoded({ extended: false })
 
routeProject.get('/all/',projectCtl.all)
routeProject.delete('/destroy/:id',projectCtl.destroy)
routeProject.post('/create/',multer_.array('image',1),projectCtl.create)
routeProject.post('/update/',auth,multer_.array('image',1),projectCtl.update)
routeProject.get('/view/:id',projectCtl.view)
routeProject.delete('/delete/:id',auth,projectCtl.destroy)

module.exports=routeProject;