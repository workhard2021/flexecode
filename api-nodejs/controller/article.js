const fs=require('fs');
const {modelArticle}=require('../model/model');
const {ValidationMail,upload,destroy_cloud}=require('../middleware/middleware');

const all=(req,res,next)=> {

 	      modelArticle.find().sort({dateInsert:-1})
 	      .then(item=>{

 	      	return  res.status(200).json(item)

 	      }).catch(e=> res.status(404).json({message:e.message}))
 };

 const view=(req,res,next)=> {

 	      modelArticle.findOne({_id:req.params.id}).
 	      then(item=> {

 	      	  return res.status(200).json(item)

 	      }).catch(e=> res.status(404).json(e))
 };

 const create=(req,res,next)=>{   
    const data=JSON.parse(req.body.data);

    const files=req.files;
    let error={};
    let a=' '
    const text='Veuillez remplir le champ:';

     if( data.title ==='' || data.title ===undefined) {
               error.title='titre';
              
     }
     if( data.comment ==='' || data.comment ===undefined) {
             error.comment='commentaire';
     }
     if( data.categorie ==='' || data.categorie ===undefined) {
                error.categorie='categorie';    
      }
      if( data.linkYoutube ==='' || data.linkYoutube ===undefined) {
                error.categorie='lien youtube'; 
      }
      if( data.linkGithub ==='' || data.linkGithub ===undefined) {
               error.categorie='lien github';
      }

       for(let key in error){
             a+=' '+error[key];      
       }
      if(Object.values(error).length>0){
           return res.status(201).json(text+a);
       }
      
      if(files.length>0) {
        			for(let file of files){
                                        const {path}=file;
        				   upload(path,'image').then(result=>{
        						   modelArticle.insertMany({...data,cloud_id:result.public_id,imageUrl:result.url,dateInsert:Date.now()})
        						   .then(item=>{
        						          res.status(200).json('Votre article a été crée ')
        						   }).catch(e=> res.status(404).json(e.message))
        				   })
        				   fs.unlinkSync(path)
        			   } 
      }else{
               modelArticle.insertMany({...data,imageUrl:'a.jpg',dateInsert:Date.now()})
                       .then(item=>{
                          res.status(200).json('Votre article a été crée')
               }).catch(e=> res.status(404).json(e.message))
      }

	 
 	    
 };
 
const update=(req,res,next)=>{   
    const data=req.body;
    const files=req.files;

    if( (data.title !=='' && data.comment && data.categorie !=='') &&
        (data.title !==undefined && data.comment!==undefined &&
                data.categorie !==undefined)) { 
     
      if(files.length>0) {
              const {path}=file;
              for(let file of files){

                   upload(path,'image').then(result=>{
                       destroy_cloud(data.cloud_id)

                       modelArticle.insertMany({...data,cloud_id:result.public_id,imageUrl:result.url,dateInsert:Date.now()})
                       .then(item=>{
                          res.status(200).json('Mise à jour a été effectuée')
                       }).catch(e=> res.status(404).json(e.message))
                   })
                   fs.unlinkSync(path)
              } 
              
      }else{
               modelArticle.insertMany({...data,imageUrl:'a.jpg',dateInsert:Date.now()})
                       .then(item=>{
                          res.status(200).json('Mise à jour a été effectuée')
               }).catch(e=> res.status(404).json(e.message))
      }

    }else {
             return res.status(201).json('Veuillez remplir tout les champs');
    }
   
 };


const destroy=(req,res,next)=>{
 	    modelArticle.findOne({_id:req.params.id})
 	    .then(item=>{

  	         modelArticle.deleteOne({_id:req.params.id})
 	        .then(item=>{
                   destroy_cloud(item.cloud_id)
       //suprimer tout les commentaires qui correspondent a cet article:identifiant(id)
         modelCommentaire.deleteMany({_id:req.params.id}).
        then(item=>{
          modelCommentaireCommenter.deleteMany({idCommentaire:req.params.id}).
          then(item=>{
          res.status(200).json('Article a été supprimé')
          }).catch(e=> res.status(404).json(e.message))
 
        }).catch(e=> res.status(404).json(e.message))
       //suprimer tout les commentaires qui correspondent a cet article:identifiant(id)

 	        }).catch(e=> res.status(404).json(e.message))

 	    }).catch(e=> res.status(404).json({message:e}))

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








