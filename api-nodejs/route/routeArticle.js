const express=require('express');
const bodyParser=require('body-parser');
const routeArticle=express.Router();
const ctlArticle=require('../controller/article');
const {auth,multer_}=require('../middleware/middleware');

  // parsse html form
const urlencoded=bodyParser.urlencoded({ extended: false })

routeArticle.get('/all/',ctlArticle.all)
routeArticle.delete('/destroy/:id',ctlArticle.destroy)
routeArticle.post('/create/',multer_.array('imageUrl',1),bodyParser.json(),ctlArticle.create)
routeArticle.put('/update/:id',multer_.array('imageUrl',1),bodyParser.json(),ctlArticle.update)
routeArticle.get('/view/:id',ctlArticle.view)
routeArticle.get('/categorie/:categorie',ctlArticle.categorie)
routeArticle.get('/search/:title',ctlArticle.search)

module.exports=routeArticle;
