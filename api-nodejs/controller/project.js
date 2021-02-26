const fs=require('fs');
const {modelProject}=require('../model/model');
const {upload,destroy_cloud}=require('../middleware/middleware');

const all=(req,res,next)=> {

 	      modelProject.find().sort({dateInsert:-1})
 	      .then(item=>{

 	      	return  res.status(200).json(item)

 	      }).catch(e=> res.status(404).json({message:e.message}))
 };

 const view=(req,res,next)=> {

 	      modelProject.findOne({_id:req.params.id}).
 	      then(item=> {

 	      	  return res.status(200).json(item)

 	      }).catch(e=> res.status(404).json(e))
 };

 const create=(req,res,next)=>{   
      let data=JSON.parse(req.body.data);
        data.idUser='123';
       const files=req.files;
       let error={};
	   let test=' ';
	   const text='Veuillez remplir le champ:';
		 
	    if( data.title ==='' || data.title ===undefined) {
				  error.title='titre';
				 
		 }
		  
	    if( data.categorie ==='' || data.categorie ===undefined) {
				   error.categorie=', categorie';    
	    }
   
    	if( data.linkGithub ==='' || data.linkGithub ===undefined) {
				error.linkGithub=', lien github';    
	    }
	   
		for(let key in error){
				test+=' '+error[key];      
	    }
   
		if(Object.values(error).length>0){
			  return res.status(201).json(text+test);
	    }
	   
        if(files.length>0) {
        			for(let file of files){
                                        const {path}=file;
        				   upload(path,'project').then(result=>{
        						 modelProject.insertMany({...data,cloud_id:result.public_id,imageUrl:result.url,dateInsert:Date.now()})
        						 .then(item=>{
        						        return  res.status(200).json('Votre poste a été crée ')
        						  }).catch(e=> res.status(404).json(e.message))
        				   })
        				   fs.unlinkSync(path)
        			   } 
        }else{
               modelProject.insertMany({...data,imageUrl:'a.jpg',dateInsert:Date.now()})
                       .then(item=>{
                        return res.status(200).json('Votre project a été crée')
               }).catch(e=> res.status(404).json(e.message))
        }

	 
 	    
 };
 
const update=(req,res,next)=>{   
    const data=JSON.parse(req.body.data);
    const files=req.files;
    const id=req.params.id;
    let error={};
    let test=' ';
    const text='Veuillez remplir le champ:';
	  
        if( data.title ==='' || data.title ===undefined) {
               error.title='titre';
              
        }
       
	    if( data.categorie ==='' || data.categorie ===undefined) {
                error.categorie=', categorie';    
       }

	   if( data.linkGithub ==='' || data.linkGithub ===undefined) {
		     error.linkGithub=', lien github';    
       }
    
       for(let key in error){
             test+=' '+error[key];      
       }

       if(Object.values(error).length>0){
           return res.status(201).json(text+test);
       }
	   

      if(files.length>0) {

              for(let file of files){
                   const {path}=file;
                   upload(path,'project').then(result=>{
                       modelProject.updateOne({_id:id},{...data,cloud_id:result.public_id,imageUrl:result.url,dateInsert:Date.now()})
                       .then(item=>{
                          return res.status(200).json('Mise à jour a été effectuée')
                       }).catch(e=> res.status(404).json(e.message))
                   })
				   destroy_cloud(data.cloud_id)
                   fs.unlinkSync(path)
              } 
              
      }else{
               modelProject.updateOne({_id:id},{...data,imageUrl:'a.jpg',dateInsert:Date.now()})
                       .then(item=>{
                        return  res.status(200).json('Mise à jour a été effectuée')
               }).catch(e=> res.status(404).json(e.message))
      }
   
 };


const destroy=(req,res,next)=>{
        const {id}=req.params;
        modelProject.findOne({_id:id})
       .then(item=>{
                 destroy_cloud(item.cloud_id)
  	         modelProject.deleteOne({_id:id})
 	        .then(x=>{
                   return  res.status(200).json('Project a été supprimé')

             }).catch(e=> res.status(404).json(e.message))

       }).catch(e=> res.status(404).json(e.message))

 };

 const categorie=(req,res,next)=> {

         modelProject.find({categorie:req.params.categorie}).sort({title:-1})
 	      .then(item=>{

 	      	  res.status(200).json(item)

 	      }).catch(e=> res.status(404).json({message:e.message}))
 };

 const search=(req,res,next)=> {
  
 	    const data=req.params.title;
      const regex=new RegExp('^'+data+'*','i');
 	    modelProject.find({$or:[{title:regex},{comment:regex}]}).sort({title:1}).limit(15)
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








