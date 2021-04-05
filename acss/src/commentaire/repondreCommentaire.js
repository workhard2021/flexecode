import React,{useState} from 'react';
import '../containersite/css/formulaire.css';
import * as API from '../api/config/api';
// repondre commentaire
const Update=(props)=>{

    let {idCommentaire,comment,user,idArticle,setOpenComment}=props;
    let info={idArticle:idArticle,idCommentaire:idCommentaire};
    const [message,setMessage]=useState('');
     
     if(user.connexion) {

         info={...info,idUser:user._id};

      }else{
          info={...info,idUser:''};
      }

    const [data,setData]=useState({...info});
  
    const saisir=(e)=>{
          e.preventDefault();
          const name=e.target.name;
          const value=e.target.value;
          switch(name){
               default :
                  setData(state=>{return {...state,[name]:value}})
               return null
          }
    }
    
    const send= async (e)=>{
        
         e.preventDefault();
         setMessage('');
         const form_data=JSON.stringify(data);
         const res= await API.create(form_data,'/commentaire/update/');
         if(res){

              if(res.error){
                   
                   setData(state=>{  return {...state,comment:''} });
                   comment('');
                   setMessage('');
                   setOpenComment(false)
                  
               }else{
                  setMessage(res.data.msg || '');
                  
               }
         }
    }
      return <>
        <section className="formulaire">
               <form className="login_sign" id="form_commentaire" onSubmit={(e)=>send(e)}>
                 
                   {message &&  
                     <div className="valid">
                       {message}
                     </div>
                   }
                   <div  className="item">
                        
                        <textarea id="comment" value={data.comment || ""} name="comment" placeholder="Ajouter commentaire" onChange={(e)=>saisir(e)}> </textarea>
                   </div> 
                   
                   <div  className="item " id="btn_item">
                       <button>Repondre</button>
                       <button onClick={()=>comment(idCommentaire)}>Annuler</button>
                   </div>
               </form>
             
        </section> 
        </>  
}
export default Update;