const fs=require('fs');
const {modelArticle,modelCommentaire}=require('../model/model');
const {ValidationMail,upload,destroy_cloud}=require('../middleware/middleware');

const all=(req,res,next)=> {

 	      modelArticle.find().sort({dateInsert:-1})
 	      .then(item=>{

 	      	return  res.status(200).json(item)

 	      }).catch(e=> res.status(404).json({message:e.message}))
 };

 const view=(req,res,next)=> {
               const {id}=req.params;
        
 	      modelArticle.findOne({_id:id}).
 	      then(item=> {
                
 	      	  return res.status(200).json(item)

 	      }).catch(e=> res.status(404).json(e))
 };

 const create=(req,res,next)=>{   
        const data=JSON.parse(req.body.data);
        const files=req.files;
        let error={};
        let test=false;
        if( data.title ==='' || data.title ===undefined) {
               error.title='Veuillez remplir le champ';
               test=true;   
        }
        if( data.comment ==='' || data.comment ===undefined) {
             error.comment='Veuillez remplir le champ';
             test=true;
        }
        if( data.categorie ==='' || data.categorie ===undefined) {
                error.categorie='Veuillez remplir le champ';
                test=true;   
        }
       if( data.linkYoutube ==='' || data.linkYoutube ===undefined) {
                error.linkYoutube='Veuillez remplir le champ'; 
                test=true;
       }
       if( data.linkGithub ==='' || data.linkGithub ===undefined) {
               error.linkGithub='Veuillez remplir le champ';
               test=true;
       }
     
       if(test){

           return res.status(201).json(error);
       }

      if(files.length>0) {
        			for(let file of files){
                                        const {path}=file;
        				   upload(path,'image').then(result=>{
        						   modelArticle.insertMany({...data,cloud_id:result.public_id,imageUrl:result.url,dateInsert:Date.now()})
        						   .then(item=>{
        						          res.status(200).json('Article a été crée')
        						   }).catch(e=> res.status(404).json(e.message))
        				   })
        				   fs.unlinkSync(path)
        			   } 
      }else{
               modelArticle.insertMany({...data,imageUrl:'r1.jpg',dateInsert:Date.now()})
                       .then(item=>{
                          res.status(200).json('Article a été crée')
               }).catch(e=> res.status(404).json(e.message))
      }

	 
 	    
 };
 
const update=(req,res,next)=>{   
    const data=JSON.parse(req.body.data);
    const files=req.files;
    const id=req.params.id;
    let error={};
    let test=false;
    if( data.title ==='' || data.title ===undefined) {
           error.title='Veuillez remplir le champ';
           test=true;   
    }
    if( data.comment ==='' || data.comment ===undefined) {
         error.comment='Veuillez remplir le champ';
         test=true;
    }
    if( data.categorie ==='' || data.categorie ===undefined) {
            error.categorie='Veuillez remplir le champ';
            test=true;   
    }
   if( data.linkYoutube ==='' || data.linkYoutube ===undefined) {
            error.linkYoutube='Veuillez remplir le champ'; 
            test=true;
   }
   if( data.linkGithub ==='' || data.linkGithub ===undefined) {
           error.linkGithub='Veuillez remplir le champ';
           test=true;
   }
 
   if(test){

       return res.status(201).json(error);
   }

      if(files.length>0) {

              for(let file of files){
                   const {path}=file;
                   upload(path,'image').then(result=>{
                       destroy_cloud(data.cloud_id)
                       modelArticle.updateOne({_id:id},{...data,cloud_id:result.public_id,imageUrl:result.url,dateInsert:Date.now()})
                       .then(item=>{
                          res.status(200).json('Mise à jour a été effectuée')
                       }).catch(e=> res.status(404).json(e.message))
                   })
                   fs.unlinkSync(path);
              } 
              
      }else{
               modelArticle.updateOne({_id:id},{...data,dateInsert:Date.now()})
                       .then(item=>{
                          res.status(200).json('Mise à jour a été effectuée')
               }).catch(e=> res.status(404).json(e.message))
      }
   
 };


const destroy=(req,res,next)=>{
     
        const {id}=req.params;
        modelArticle.findOne({_id:id})
       .then(item=>{
                 destroy_cloud(item.cloud_id)
  	         modelArticle.deleteOne({_id:id})
 	        .then(x=>{
                      modelCommentaire.deleteMany({idArticle:id}).
                      then(y=>{
                         res.status(200).json('Article a été supprimé')
                    }).catch(e=> res.status(404).json(e.message))

                 }).catch(e=> res.status(404).json(e.message))

       }).catch(e=> res.status(404).json(e.message))

 };

 const categorie=(req,res,next)=> {

         modelArticle.find({categorie:req.params.categorie}).sort({_id:-1})
 	      .then(item=>{

 	      	  res.status(200).json(item)

 	      }).catch(e=> res.status(404).json({message:e.message}))
 };

 const search=(req,res,next)=> {

 	    const data=req.params.title;
            const regex=new RegExp('^'+data+'*','i');
 	    modelArticle.find({$or:[{title:regex},{comment:regex}]}).sort({title:1}).limit(15)
 	    .then(item=> {
 	    	      return  res.status(200).json(item)

 	    }).catch(e=> res.status(404).json(e.message))
 }

 module.exports={
 	    all:all,
 	    view:view,
 	    create:create,
 	    update:update,
 	    destroy:destroy,
 	    categorie:categorie,
 	    search:search
 };








