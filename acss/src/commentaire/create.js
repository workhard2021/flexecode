import React,{useState} from 'react';
import '../containersite/css/formulaire.css';
import * as API from '../api/config/api';
import ItemComment from '../containersite/item_comment';
const Create=(props)=>{

    let {id_article,user}=props;
    let info={idArticle:id_article};
     
    if(user.connexion) {
         info={...info,idUser:user._id};
    }else{
        info={...info,idUser:''};
    }
    
    const [data,setData]=useState({...info});
    const [message,setMessage]=useState('');
    const [success,setSuccess]=useState(false);
    const [openComment,setOpenComment]=useState(false);
    const URL='/commentaire/create/';
    


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
        
         setData(state=>{return {...state} })
         
         const form_data=JSON.stringify({...data});
         const res= await API.create(form_data,URL);
         if(res){

              if(res.error){
                   
                   setMessage('');
                   setData(state=>{  return {...state,comment:''} });
                   setSuccess(!success);
                  
               }else{
                 setMessage(res.data.msg || '') 
               }

         }
    }

  
      return <>
        <section className="formulaire">
               <br/>
               <ItemComment idArticle={id_article} user={user} setSuccess={setSuccess} success={success} setOpenComment={setOpenComment} /> 
               <br/>
               {!openComment &&
               <form className="login_sign" id="form_commentaire" onSubmit={(e)=>send(e)}>
                 
                   {message &&  
                     <div className="item">
                       <p className="valid">{message}</p>
                     </div>
                    }
                 
                   <div  className="item">
                        
                        <textarea id="comment" value={data.comment || ""} name="comment" placeholder="Ajouter commentaire" onChange={(e)=>saisir(e)}> </textarea>
                   </div> 
                   
                   <div  className="item ">
                       <button>Envoyer</button>
                   </div>
               </form>
              }
             
        </section> 
        </>  
}
export default Create;