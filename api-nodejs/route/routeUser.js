
const express=require('express');
const bodyParser=require('body-parser');
const routeUser=express.Router();
const userCtl=require('../controller/user');
const {auth,multer_}=require('../middleware/middleware');

//parsse html form
const urlencoded=bodyParser.urlencoded({ extended: false })


routeUser.get('/all/',userCtl.all);
routeUser.get('/view/:id',userCtl.view);
routeUser.post('/create/',bodyParser.json(),userCtl.create);
routeUser.post('/update/',auth,multer_.array('image',1),userCtl.update);
routeUser.put('/login/:id',bodyParser.json(),userCtl.connexion);
routeUser.get('/search/:fullName',userCtl.search);
routeUser.delete('/destroy/:id',auth,userCtl.destroy);

module.exports=routeUser;



