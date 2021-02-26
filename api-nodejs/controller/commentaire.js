const {modelCommentaire}=require('../model/model');
const { v4:uuidv4} = require('uuid');


const all=(req,res,next)=> {

        modelCommentaire.find().sort({_id:-1})
        .then(item=>{

            return res.status(200).json(item)

        }).catch(e=> res.status(404).json({message:e.message}))
 };

 const view=(req,res,next)=> {

        modelCommentaire.findOne({_id:req.params.id}).
        then(item=> {

            return res.status(200).json(item)

        }).catch(e=> res.status(404).json(e))
 };


const create=(req,res,next)=> {

    const data=req.body;
    if(data.comment!=='' && data.comment !==undefined) { 
       
       return res.status(201).json('Votre commentaire est vide')
    }

    if(ValidationMail(data.email)) { 

       return  res.status(201).json('Email est invalide')
    } 
    modelCommentaire.insertMany({...data,dateInsert:Date.now()})
    .then(item=> {

        return res.status(200).json('Commentaire a été envoyé')

    }).catch(e=>{ res.status(404).json(e.message)})
 }


 const update=(req,res,next)=> {

    const data=req.body;
    data.id=uuidv4();

    if(data.comment!=='' && data.comment !==undefined) { 
       
       return res.status(201).json('Votre commentaire est vide')
    }

    if(ValidationMail(data.email)) { 

       return  res.status(201).json('Email est invalide')
    } 

    modelCommentaire.findOne({_id:data._id,idArticle:idArticle}).then(item=>{
          
         const update={item,commentItem:[...item.commentItem,data]}
         modelCommentaire.updateOne({_id:_id},{$set:update})
         .then(item=>{
                return res.status(200).json('Commenté')
         })

    }).catch(e=>res.status(404).json(e))

 }

 const destroy=(req,res,next)=>  {
          
      modelCommentaire.deleteOne({_id:eq.params.data._id}).then(item=> {
                 
                 console.log(item)
                 return res.status(200).json('Commentaire a été supprimé');

      }).catch(e=> res.status(404).json(e.message))

}

module.exports={
      create:create,
      all:all,
      update:update,
      view:view,
      search:search,
      destroy:destroy,
      all:all
};








