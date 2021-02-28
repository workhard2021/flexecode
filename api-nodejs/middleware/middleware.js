const multer=require('multer');
const path=require('path');
const fs=require('fs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');

const storage= multer.diskStorage({
     
	       destination:function(req,file,callaback){
                callaback(null,__dirname.replace('api-nodejs/middleware','acss/public/image'));
	       },
	       filename:function(req,file,callaback){
	       	   let ext=path.extname(file.originalname);
	       	    callaback(null,Date.now()+ext);
	       }
});
//jpeg|jpg|gif|png


const multer_=multer({
	         storage:storage,
	         limits:{fileSize:1000000}       
 });

const deleteImage=file=>{

	           fs.exists(file,exist=>{
	 	             if(exist){
	 	      	   	    fs.unlink(file,error=>{
	 	      	   	    	   if(error){
	 	      	   	    	   	   //console.log(error)
	 	      	   	    	    }
	 	      	   	    })

	 	      	     }
	 	        })         
};

function ValidationMail(email)
{
	var regex = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i;
    return regex.test(email)
}


const auth= async (req,res,next)=>{
     const auth=req.headers.authorization;
	  const token=auth? auth.token:null;
	  const user=req.body;
	  console.log(req.headers)

	jwt.verify(token,user.fullName,function(err, decoded) {
		    console.log(decoded)
		   if(error){

			    res.status(404).json('Veuillez vous connnecter');

		   }else{
			   
			   if(decoded.idUser!==user._id){
                         res.status(201).json('Veuillez vous connnecter');
				}else{
				    next();	 
				}
		   }
	  
	});

	     
}

const cloudinaryKey= process.env.CLOUD_NAME? {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
} : {
    cloud_name:'flexecode',
    api_key:714827735799256,
    api_secret:'7QjbDG0VMIsV5XGaiJhlBwV3eoc'
 }

 cloudinary.config(cloudinaryKey)
upload = (file, folder) => {
     return   cloudinary.uploader.upload(file, (result) => {
			 return result
	    })
}
destroy_cloud = (file, folder) => {

	return   cloudinary.uploader.destroy(file, (result) => {
			return result
	   })
}

module.exports={
	            deleteImage:deleteImage,
	            ValidationMail:ValidationMail,
	            auth:auth,
				multer_:multer_,
				upload:upload,
				destroy_cloud:destroy_cloud
	          };



