
const {modelUser}=require('../model/model');
const {deleteImage,ValidationMail,upload,destroy_cloud}=require('../middleware/middleware');

const User=modelUser;
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const salt=10;

const create=(req,res,next)=>{

      const data=req.body;
      let error={};
     
     if(data.password ==='' || data.password===undefined ){

     	 error={...error,password:'Entrez votre mot de passe'}
     }
     
     if(!ValidationMail(data.email)) {
     	 error={...error,email:'Votre email est invalide'}
     }

     if (data.fullName==='' || data.fullName===undefined) {

          error={...error,fullName:'Notre nom utilisateur'}
     }
     if(Oject.values(error).length>0){
     	   return res.status(201).json(error);
     }
   
     User.find({email:data.email}).then(item=>{

      	     if(item.length>0) {

      	     	 res.status(201).json('Cet email existe déja')

      	     }else {

		      bcrypt.hash(data.password,salt)
		     .then((password)=> {

		     	   User.insertMany({...data,password,imageUrl:'a.jpg',dataInsert:Date.now})
		     	   .then(item=> {

				        res.status(200).json('Profil a été crée')

				   }).catch(e=> res.status(404).json(e.message))
		     })
		     .catch(e=> res.status(404).json(e.message) ) 
      	   }

      }).catch(e=>res.status(404).json(e.message))
};

const connexion=(req,res,next)=>{

       let data=req.body;

    if(!ValidationMail(data.email)) { 

	 	   return res.status(201).json('Email est invalide')
	 }

	 User.findOne({email:data.email}).then((item)=>{
	
	    if(item!==null) { 
	    	  
	    	    bcrypt.compare(data.password,item.password)
			    .then(valid=> {

			  	   if(valid) {
		              
		                   jwt.sign({idUser:item._id},'SECRTE_JWT',{expiresIn:'1h'},(error,token)=>{
		                	   if(error){
		                	   	   res.status(201).json("Email ou mot de passe est incorrecte")
		                	   }
		                	   else{
		                            delete user.password;
		                	   	    res.status(200).json({...item,token:token})
		                	   }
		                });

			  	   }else { 
			  	   	    
			  	   	    return res.status(201).json(" Email ou mot de passe est incorrecte")
			  	   }

			    }).catch(e => res.status(404).json(e.message) );

		}else{
		        
		        return res.status(201).json("Email ou mot de passe est incorrecte")
	    }

     }).catch(e=> res.status(404).json(e.message))

	
};

const view=(req,res,next)=>{

	    User.findOne({_id:req.params.id}).then((item)=> {

	            return res.status(200).json(item)

        }).catch( e => res.status(404).json(e.message) )
};

const all= (req,res,next)=>{
         
	    User.find().sort({_id:-1}).then( item =>{

            return res.status(200).json(item)

        }).catch( e => res.status(404).json(e.message))  
}

const update=(req,res,next)=> {
       
    let data=JSON.parse(req.body.data);
    const files=req.files;

    if(!ValidationMail(data.email)) { 

    	  return  res.status(201).json({message:'Email est invalide'})
    }

    if(data.password.length>0 && data.password<=6){

    	 return res.status(201).json('Le mot de passe doit être superieur 5 caractères')
    }

    if(files.length>0) {

    	  for (let file of files) {

    	  	     const {path}=file;
    	  	     upload(path,(result)=> {

	    	  	     	 bcrypt.hash(data.password,salt).then(hash=> {

				          User.updateOne({_id:data._id},{$set:{...data,cloud_id:result.public_id,imageUrl:result.url,password:hash}})
						    .then(item => {

						        return  res.status(200).json({message:"Mise à jour a été éffectuée"}) 
 
						    }).catch(e=> res.status(404).json(e.message))

				        }).catch(e=> res.status(404).json(e.message))
	                  
    	  	     })
			     destroy_cloud(data.cloud_id)

    	   }


    }else {

	        bcrypt.hash(data.password,salt).then(hash=> {

	          User.updateOne({_id:data._id},{$set:{...data,password:hash}})
			    .then(item =>{

			        return  res.status(200).json({message:"Mise à jour a été éffectuée"}) 
			       
			    }).catch(e=> res.status(404).json(e.message))

	        }).catch(e=> res.status(404).json(e.message))
    } 

}



const search=(req,res,next)=>{
	    
	    articles.find({fullName:req.params.fullName}).sort({fullName:-1}).then((item)=>{
	        res.status(200).json(item)

        }).catch( e => res.status(404).json(e.message) )
};


const destroy=(req,res,next)=>  {
          
        const {cloud_id,_id}=req.params.data;

	    User.deleteOne({_id:id}).then(item=> {
	    	 	 
	    	 	  destroy_cloud(cloud_id)
	  	          return res.status(200).json('utilisateur a été supprimé');

	    }).catch(e=> res.status(404).json(e.message))
}

module.exports={

	    create:create,
	    connexion:connexion,
	    all:all,
	    update:update,
	    view:view,
	    search:search,
	    destroy:destroy
};



 




