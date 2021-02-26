
const express=require('express');
const bodyParser=require('body-parser');
const routeCommantaire=express.Router();
const commentCtl=require('../controller/commentaire');
const {auth,multer_}=require('../middleware/middleware');
 //parsse html form
const urlencoded=bodyParser.urlencoded({ extended: false })
 

 routeCommantaire.get('/all/',commentCtl.all);
 routeCommantaire.get('/view/:id',commentCtl.view);
 routeCommantaire.post('/create/',auth,bodyParser.json(),commentCtl.create);
 routeCommantaire.post('/update/',auth,bodyParser.json(),commentCtl.connexion);
 routeCommantaire.get('/search/:data',commentCtl.search);
 routeCommantaire.delete('/destroy/:id',auth,commentCtl.destroy);


module.exports=routeCommantaire;



