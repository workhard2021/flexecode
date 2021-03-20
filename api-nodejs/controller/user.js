
const {modelUser}=require('../model/model');
const {ValidationMail,upload,destroy_cloud}=require('../middleware/middleware');

const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const salt=10;

const sign=(req,res,next)=>{

       let data=req.body;
	   data.deni=false;
	   data.connexion=false;
	   data.role='admin';
	   let error={};
       let test=false;

    if(!ValidationMail(data.email) ) {
            error.email='Veuillez remplir le champ';
            test=true;   
    }

   if( data.password ==='' || data.password ===undefined) {
            error.password='Veuillez remplir le champ'; 
            test=true;
			
   }else if(data.password.length<6){

	       error.password='Le mot de passe doit être supperieur à six caractères';
		   test=true;
   }

   if( data.fullName ==='' || data.fullName ===undefined) {
           error.fullName='Veuillez remplir le champ';
           test=true;
   }
   
 
   if(test){

       return res.status(201).json(error);
   }
	  
   
     modelUser.find({email:data.email}).then(item=>{

      	     if(item.length>0) {
      	     	 res.status(201).json({email:'cet email existe déja'})
      	     }else {

		      bcrypt.hash(data.password,salt)
		     .then((password)=> {

		     	   modelUser.insertMany({...data,password,imageUrl:'a.jpg',dataInsert:Date.now})
		     	   .then(item=> {
                      
				      return  res.status(200).json('Profil a été crée')

				   }).catch(e=> res.status(404).json(e.message))
		     })
		     .catch(e=> res.status(404).json(e.message) ) 
      	   }

      }).catch(e=>res.status(404).json(e.message))
};


const login=(req,res,next)=>{

       let data=req.body;

    if(!ValidationMail(data.email)) { 

	 	   return res.status(201).json('Email ou mot de passe est incorrecte')
	 }

	 modelUser.findOne({email:data.email}).then((item)=>{
	
	    if(item!==null) { 
			
	    	    bcrypt.compare(data.password,item._doc.password)
			    .then(valid=> {
					
			  	   if(valid) {
				           const TOKEN_SECRET=item._doc.fullName;
						   
		                   jwt.sign({idUser:item._doc._id},TOKEN_SECRET,{expiresIn:'5h'},(error,token)=>{
							   
		                	   if(error){
								   
		                	   	  return res.status(201).json("Email ou mot de passe est incorrecte")
		                	   }
		                	   else{
								    
								   modelUser.updateOne({_id:item._doc._id},{$set:{connexion:true}})
								   .then(c=>{
									    delete item._doc.password;
									   return  res.status(200).json({...item._doc,connexion:true,token:token})
								   }).catch(e=>res.status(404).json(e))
		                           
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
	
	    modelUser.findOne({_id:req.params.id}).then((item)=> {
			
                if(item){
					 delete item._doc.password;
					 return res.status(200).json(item)
				}else {
					return res.status(200).json({})
				}
	            

        }).catch( e => res.status(404).json(e.message) )
};

const all= (req,res,next)=>{
         
	    modelUser.find().sort({_id:-1}).then( item =>{

            return res.status(200).json(item)

        }).catch( e => res.status(404).json(e.message))  
}

const update= async (req,res,next)=> {

    let data=JSON.parse(req.body.data);	
	const {id}=req.params;
    const files=req.files;
	let error={};
	let test=false;
	
    if(!ValidationMail(data.email)) { 

		error.email='Email est incorrect';
		test=true;
    }
	if(data.fullName ==='' || data.fullName===undefined){
		error.email='Veuillez remplir le champ';
		test=true;
	}
   
	
	 const count = await modelUser.findOne({email:data.email});
		   
	  if(count !==null){
		
			    if(count._id!=id){ 
				     error.email= data.email+' existe déja';
					 test=true;
				}
	   }
	  
	   if(data.password !==null && data.password!==undefined) { 

		if(data.password.length<6){

		  error.password='Le mot de passe doit être superieur 5 caractères';
		  test=true;
		}

		if(data.password2 !==null && data.password2!==undefined) { 
			const password2= await bcrypt.compare(data.password2,count.password);
			if(!password2){
				  error.password2='Ancien mot de passe est incorrect';
				  test=true;
		    }

		 }

      }
	   
 

	 if(test) {

		   return res.status(201).json(error)
      }


	  
    if(files.length>0) {
		
    	  for (let file of files) {
			
    	  	     const {path}=file;
				 
    	  	     upload(path,(result)=> {
				 
                       if(data.password){
							
	    	  	     	 bcrypt.hash(data.password,salt).then(hash=> {

							modelUser.updateOne({_id:id},{$set:{...data,cloud_id:result.public_id,imageUrl:result.url,password:hash}})
							  .then(item => {

										  const token=jwt.sign({idUser:id},data.fullName,{expiresIn:'1h'});
	                                      const user={...data,token:token}
										  delete user.password;
										  delete user.password2;
										 

								  return  res.status(200).json({message:'Mise à jour a été effectuéé',user:user}) 
   
							  }).catch(e=> res.status(404).json(e.message))
  
						  }).catch(e=> res.status(404).json(e.message))
					   
						}else{
							
							modelUser.updateOne({_id:id},{$set:{...data,cloud_id:result.public_id,imageUrl:result.url,password:hash}})
							  .then(item => {
								
								const token=jwt.sign({idUser:id},data.fullName,{expiresIn:'1h'});
								const user={...data,token:token}
								delete user.password;
								delete user.password2;
								

								  return  res.status(200).json({message:"Mise à jour a été éffectuée",user:user}) 
   
							  }).catch(e=> res.status(404).json(e.message))							  
						}
	                  
    	  	     })

				if(data.cloud_id){
					destroy_cloud(data.cloud_id)
				}
			     

    	   }


    }else {
		     
		 
		   if(data.password){
		     	bcrypt.hash(data.password,salt).then(hash=> {

				modelUser.updateOne({_id:id},{$set:{...data,password:hash}})
				  .then(item =>{
					
					const token=jwt.sign({idUser:id},data.fullName,{expiresIn:'1h'});
					const user={...data,token:token}
					delete user.password;
					delete user.password2;

					  return  res.status(200).json({message:"Mise à jour a été éffectuée",user:user}) 
					 
				  }).catch(e=> res.status(404).json(e.message))
  
			  }).catch(e=> res.status(404).json(e.message))

		   }else{

				  modelUser.updateOne({_id:id},{$set:{...data}})
				  .then(item =>{
				
					const token=jwt.sign({idUser:id},data.fullName,{expiresIn:'1h'});
					const user={...data,token:token}
					delete user.password;
					delete user.password2;

					  return  res.status(200).json({message:"Mise à jour a été éffectuée",user:user}) 
					 
				  }).catch(e=> res.status(404).json(e.message))

		   }

	       
    } 

}



const search=(req,res,next)=>{

	   modelUser.find({fullName:req.params.fullName}).sort({fullName:-1}).then((item)=>{
	        res.status(200).json(item)

        }).catch( e => res.status(404).json(e.message) )
};


const destroy=(req,res,next)=>{

	const {id}=req.params;
	
	modelUser.findOne({_id:id})
   .then(item=>{
			 destroy_cloud(item.cloud_id)
		   modelUser.deleteOne({_id:id})
		 .then(x=>{
			   return  res.status(200).json('Compte a été supprimé')

		 }).catch(e=> res.status(404).json(e.message))

   }).catch(e=> res.status(404).json(e.message))

};

const deni=(req,res,next)=>{
	
	const {id}=req.params;
	modelUser.findOne({_id:id})
   .then(item=>{
			 const msg=item.deni? 'Utilisateur Bloqué': 'Utilisateur Debloqué';
		    modelUser.updateOne({_id:id},{$set:{deni:!item.deni}})
		 .then(x=>{
			   return  res.status(200).json(msg)
		 }).catch(e=> res.status(404).json(e.message))

   }).catch(e=> res.status(404).json(e.message))
};

const deconnexion=(req,res,next)=>{
	const {id}=req.params;
	modelUser.findOne({_id:id})
   .then(item=>{
	     modelUser.updateOne({_id:id},{$set:{connexion:false}})
		 .then(x=>{
			   return  res.status(200).json(true)
		 }).catch(e=> res.status(404).json(e.message))

   }).catch(e=> res.status(404).json(e.message))
	   
}

module.exports={

	    sign:sign,
	    login:login,
	    all:all,
	    update:update,
	    view:view,
	    search:search,
	    destroy:destroy,
		deni:deni,
		deconnexion:deconnexion
};



 




