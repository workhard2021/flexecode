
const express=require('express');
const bodyParser=require('body-parser');
const routeUser=express.Router();
const userCtl=require('../controller/user');
const {auth,multer_}=require('../middleware/middleware');

//parsse html form
const urlencoded=bodyParser.urlencoded({ extended: false })

routeUser.post('/sign/',bodyParser.json(),userCtl.create);
routeUser.post('/login/',bodyParser.json(),userCtl.connexion);
routeUser.put('/update/:id',multer_.array('image',1),auth,userCtl.update);
routeUser.get('/search/:fullName',userCtl.search);
routeUser.delete('/destroy/:id',auth,userCtl.destroy);
routeUser.get('/deni/:id',auth,userCtl.deni);
routeUser.get('/deconnexion/:id',auth,userCtl.deconnexion);
routeUser.get('/all/',userCtl.all);
routeUser.get('/view/:id',userCtl.view);

module.exports=routeUser;



