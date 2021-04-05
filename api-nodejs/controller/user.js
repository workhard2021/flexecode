
const {modelUser,modelProject,modelCommentaire}=require('../model/model');
const {ValidationMail,upload,destroy_cloud}=require('../middleware/middleware');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const fs=require('fs');
const salt=10;

const sign=(req,res,next)=>{

       let data=req.body;
	   data.deni=false;
	   data.connexion=false;
	   data.role='user';
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
                      
				      return  res.status(200).json('Inscription effectuée')

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

   try{
	let data=JSON.parse(req.body.data);	
	const {id}=req.params;
    const files=req.files;
	let error={};
	let test=false;
	let password2='';

	if(!ValidationMail(data.email)) { 

		error.email='Email est invalide';
		test=true;
    }
	if(data.fullName ==='' || data.fullName===undefined){
		error.email='Veuillez remplir le champ';
		test=true;
	}
   
	const count = await modelUser.findOne({email:data.email});
		   
	if(count!==null){
		
			    if(count._id!=id){ 
				     error.email= data.email+' existe déja';
					 test=true;
				}
	}
	  
	if(data.password !==null && data.password!==undefined) { 

		if(data.password.length>0 && data.password.length<6 ){
			test=true;
		   error.password='Le mot de passe doit être superieur 5 caractères';
		   if(data.password2==undefined | data.password2==null){
           
			error.password2='Veuillez entrer l\'ancian mot de passe';
			
		   }
		}
		
    }
	
	if(data.password2 !==null && data.password2!==undefined) { 

		if(data.password2.length>0){ 

		  password2= await bcrypt.compare(data.password2,count.password);

			if(!password2){
			  error.password2='Ancien mot de passe est invalide';
			  test=true;
			}
			if(data.password.length==0){

				error.password='Veuillez entrer nouveau mot de passe';
				test=true;
			 }
	
		}
	}
	
	 if(test) {

		   return res.status(201).json(error)
     }

    if(files.length>0) {
		
		  delete data.image;
    	  for (let file of files) {
			
    	  	     const {path}=file;
				 
				 let result=await upload(path,(resultat)=>{{
					    return resultat;
				 }});

                const pw=data.password? true:false;
				fs.unlinkSync(path);
				if(pw){
				      
					  const password= await bcrypt.hash(data.password,salt);
					  delete data.password;
					  delete data.password2;
					  const update= await modelUser.updateOne({_id:id},{$set:{...data,cloud_id:result.public_id,imageUser:result.url,password:password}});
					
			          const a = data.cloud_id ?  await destroy_cloud(data.cloud_id,(error)=>{
					                   return error;
			        	            }):false;
					  
				}else {

					delete data.password;
					delete data.password2;
					const update= await modelUser.updateOne({_id:id},{$set:{...data,cloud_id:result.public_id,imageUser:result.url}});
			        const a =data.cloud_id ?  await destroy_cloud(data.cloud_id,(error)=>{
					                   return error;
			        	            }):false;
				}
				 
                 //   const token=jwt.sign({idUser:id},data.fullName,{expiresIn:'1h'});
                  const user={...data};
                  return  res.status(200).json({message:'Mise à jour a été effectuée',user:user});
    	   }

    }else {

		const pw=data.password2? true:false;
		if(pw){

			  const password= await bcrypt.hash(data.password,salt);
			  delete data.password;
			  delete data.password2;

			  const update= await modelUser.updateOne({_id:id},{$set:{...data,password:password}});

		}else {
			
			delete data.password;
			delete data.password2;
			const update= await modelUser.updateOne({_id:id},{$set:{...data}});
		}
		  
		  const user={...data};
		  return  res.status(200).json({message:'Mise à jour a été effectuée',user:user});
		    
    } 

   }catch(e){
	       console.log(e.message)
		   return res.status(404).json(e.message);
   }

}



const search=(req,res,next)=>{
 	 const data=req.params.fullName;
	 const regex=new RegExp('^'+data+'*','i');
	   modelUser.find({fullName:req.params.fullName}).sort({fullName:-1}).then((item)=>{
	        
	       return res.status(200).json(item)

        }).catch( e => res.status(404).json(e.message) )
};


const destroy= async (req,res,next)=>{
  
	try { 

	const {id}=req.params;
	
	const item= await modelUser.findOne({_id:id});
	const a= (item!==null && item.cloud_id) && await destroy_cloud(item.cloud_id);
	const dlt= await modelUser.deleteOne({_id:id});
    const comment= await modelCommentaire.remove({idUser:id});
    const project= await modelProject.find({idUser:id});
	

   for(val of project) {
	     const cloud_id=val.cloud_id;
		 if(cloud_id!==null && cloud_id!==undefined) {
			const a= await destroy_cloud(cloud_id);
			console.log(a,comment);
		 }
   }
    
    return  res.status(200).json('Compte a été supprimé')
  }

  catch(e){

	    return res.status(404).json(e.message)
  }

}

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



 




