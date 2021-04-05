const {modelCommentaire, modelUser}=require('../model/model');
const {ValidationMail}=require('../middleware/middleware');
const model = require('../model/model');
const user = require('./user');
// const { v4:uuidv4} = require('uuid');

 const view= async (req,res,next)=> {
    try{ 
         const {id}=req.params;
         let objt={},array_=[],array=[];
         const items= await modelCommentaire.find({idArticle:id}).sort({_id:-1});
         let users= await modelUser.find();
         
          for (item of items){
                   const {idUser}=item;
                   const idC=item._id;
                   const {commentItem}=item;
                   
                   for(let user of users){
                      
                        const _id=user._doc._id;      
                        if(_id==idUser){
                              
                              for (comment of commentItem){
                                 const {idUser}=comment;

                                 if(idUser==_id){
                                     
                                     array_=[...array_,{...comment,
                                      fullName:user.fullName,email:user.email,imageUser:user.imageUser}];    
             
                                 }
                               }
              
                               objt={...item._doc,email:user.email,fullName:user.fullName,imageUser:user.imageUser,_id:idC,commentItem:array_}; 
                               array.push(objt); 
                        }
                        
                   } 
                     // commentItem   
          }
          return res.status(200).json(array);
     }

     catch(e) {
      console.log(e)

          return res.status(404).json(e);
    }
      
 };


const create= async (req,res,next)=> {
   

   try{ 
    const data= req.body; 
    if(data.idUser==='' || data.idUser ===undefined) { 
        return res.status(201).json({msg:'Veuillez vous connecter pour postuler'});
    }
   
    if(data.comment==='' || data.comment ===undefined) { 
       return res.status(201).json({msg:'Votre commentaire est vide'});
    }

    if(data.comment.length<5){
      return res.status(201).json({msg:'la taille de commentaire doit être supperieur à 4 caractères'});
    }
   
   const item = await modelCommentaire.create({idArticle:data.idArticle,idUser:data.idUser,comment:data.comment,commentItem:[],like:[],dateInsert:Date.now()});
       
      return res.status(200).json({msg:'Commentaire a été envoyé',data:item[0]});
   }
   catch(e){
           
           return res.status(404).json(e);
    }
    
    
 }


 const update= async (req,res,next)=> {

   try{ 
  
      const data= req.body;
      const {idArticle,idCommentaire}=data;
      delete data.idArticle;delete data.idCommentaire;
      let array=[];
   
      if(data.idUser==='' || data.idUser ===undefined) { 
          return res.status(201).json({msg:'Veuillez vous connecter pour postuler'});
      }
     
      if(data.comment==='' || data.comment ===undefined) { 
         return res.status(201).json({msg:'Votre commentaire est vide'});
      }
  
      if(data.comment.length<5){
        return res.status(201).json({msg:'la taille de commentaire doit être supperieur à 4 caractères'});
      }
     
    const c= await modelCommentaire.findOne({_id:idCommentaire,idArticle:idArticle});
    if(c.commentItem.length>0) {

        array=[...c.commentItem,{...data,dateInsert:Date.now()}];
    }else{
       array=[{...data,dateInsert:Date.now()}];
    }
     
     const item = await modelCommentaire.updateOne({_id:idCommentaire},{$set:{commentItem:array} });
     return res.status(200).json({msg:'Commentaire a été envoyé'});
   }

   catch(e){
             console.log(e)
           return res.status(404).json(e);
    }

 }

 const destroy= async (req,res,next)=>  {
      const {id}=req.params;
      try{ 
            const item= await modelCommentaire.deleteOne({_id:id});
         
            return res.status(200).json('Commentaire a été supprimé');
     }
     catch(e) {

           return res.status(404).json(e);
     }
}

const like= async (req,res,next)=>  {

   const {data}=req.params;
   const {id,idUser}=JSON.parse(data);

   let like=[];
   let a='';
  
   try{ 
         
         const c= await modelCommentaire.findOne({_id:id});
 
         if(c){
               
                   const index=c.like.findIndex(value=> value.idUser===idUser);
                   if(index !=-1){

                     like=c.like.filter((value,index)=>value.idUser != idUser );

                   }else{
                     like=[...c.like,{idUser:idUser}]; 
                   }          
         }
          
         a= await modelCommentaire.updateOne({_id:id},{$set:{like:like} }); 
       
         return res.status(200).json('like et dislike');
  }
  catch(e) {
   console.log(e)
        return res.status(404).json(e);
  }
}

module.exports={
      create:create,
      update:update,
      view:view,
      destroy:destroy,
      like:like
};








