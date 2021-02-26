const {modelProject}=require('../model/model');
const {deleteImage,upload,destroy_cloud}=require('../middleware/middleware');

const all=(req,res,next)=>{

 	      modelProject.find().sort({dateInsert:-1})
 	      .then(item=>{
 	      	  res.status(200).json(item)
 	      }).catch(e=> res.status(404).json(e.message))
 };

 const view=(req,res,next)=>{

 	      modelProject.findOne({_id:req.params.id}).
 	      then(item=>{
 	      	   res.status(200).json(item)
 	      }).catch(e=> res.status(404).json(e.message))
 };

 const create=(req,res,next)=>{ 

	const data=req.body;
	const files=req.files;

	if( (data.title !=='' && data.comment && data.categorie !=='') &&
        (data.title !==undefined && data.comment!==undefined &&
                data.categorie !==undefined)) { 
		
		if(files.length>0){

		     const {path}=file;

			 for(let file of files) {

				   upload(path,'image').then(result=>{
						 modelProject.insertMany({...data,cloud_id:result.public_id,imageUrl:result.url,dateInsert:Date.now()})
						 .then(item=>{

								res.status(200).json('Votre project a été crée ')

						 }).catch(e=> res.status(404).json(e.message))
				   })

				   fs.unlinkSync(path)
			 } 

		}else{
			  
			   modelProject.insertMany({...data,imageUrl:'a.jpg',dateInsert:Date.now()})
						 .then(item=>{

								res.status(200).json('Votre project a été crée ')

			   }).catch(e=> res.status(404).json(e.message))
		}

	}else  {
		     return res.status(201).json('Veuillez remplir tout les champs');
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
		    for(let file of files) {

			   upload(path,'image').then(result=>{

					   modelProject.updateOne({_id:data._id},{$set:{...data,cloud_id:result.public_id,imageUrl:result.url,dateInsert:Date.now()}})
					   .then(item=>{

							  res.status(200).json('Mise à jour a été effectuée')

					   }).catch(e=> res.status(404).json(e.message))
			   })

			   destroy_cloud(data.cloud_id)
			   fs.unlinkSync(path)
		    } 
	    }else{
			  
			   modelProject.insertMany({...data,imageUrl:'a.jpg',dateInsert:Date.now()})
						 .then(item=>{

								res.status(200).json('Mise à jour a été effectuée')

	     	   }).catch(e=> res.status(404).json(e.message))
		}

    }else {

             return res.status(201).json('Veuillez remplir tout les champs');
    }

};


 const destroy=(req,res,next)=>{
      
 	    modelProject.deleteOne({_id:req.params.id})
 	    .then(item=>{
 	    	    destroy_cloud(item.cloud_id)
 	    	   res.status(200).json('Votre project a été supprimé')
 	    }).catch(e=> res.status(404).json(e))
 };

 module.exports={
 	    all:all,
 	    view:view,
 	    create:create,
 	    update:update,
 	    destroy:destroy
 };







