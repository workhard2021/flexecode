const express=require('express');
const bodyParser=require('body-parser');
const routeProject=express.Router();
const projectCtl=require('../controller/project');
const {auth,multer_}=require('../middleware/middleware');

 //parsse html form
const urlencoded=bodyParser.urlencoded({ extended: false })
 

routeProject.get('/all/',projectCtl.all)
routeProject.delete('/destroy/:id',projectCtl.destroy)
routeProject.post('/create/',multer_.array('imageUrl',1),bodyParser.json(),projectCtl.create)
routeProject.put('/update/:id',multer_.array('imageUrl',1),bodyParser.json(),projectCtl.update)
routeProject.get('/view/:id',projectCtl.view)
routeProject.get('/categorie/:categorie',projectCtl.categorie)
routeProject.get('/search/:title',projectCtl.search)

module.exports=routeProject;