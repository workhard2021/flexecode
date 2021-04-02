
const express=require('express');
const bodyParser=require('body-parser');
const routeCommantaire=express.Router();
const commentCtl=require('../controller/commentaire');
const {auth,multer_}=require('../middleware/middleware');
 //parsse html form
 //const urlencoded=bodyParser.urlencoded({ extended: false })

 routeCommantaire.get('/view/:id',commentCtl.view);
 routeCommantaire.post('/create/',bodyParser.json(),commentCtl.create);
 routeCommantaire.post('/update/',bodyParser.json(),commentCtl.update);
 routeCommantaire.delete('/destroy/:id',commentCtl.destroy);
 routeCommantaire.get('/like/:data',commentCtl.like);

module.exports=routeCommantaire;



