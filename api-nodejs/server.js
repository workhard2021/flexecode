const express=require('express');
const app=express();
const cors=require('cors');
const http=require('http');
const routeArticle=require('./route/routeArticle');
const routeUser=require('./route/routeUser');
const routeProject=require('./route/routeProject');
const routeCommentaire=require('./route/routeCommentaire');
const PORT=process.env.PORT || 8181;

if(process.env.PRODUCTION==='production'){ 
    app.use(express.static("acss/build"));
 }

 app.use(cors());

/*app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS,DELETE');
  next();
});*/

app.use('/user/',routeUser);
app.use('/article/',routeArticle);
app.use('/project/',routeProject);
app.use('/commentaire/',routeCommentaire);

app.listen(PORT,()=>{
	  console.log('Server en connexion sur le port ==> '+PORT);
});