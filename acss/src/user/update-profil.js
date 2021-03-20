import React,{useState,useRef,useEffect, useCallback} from 'react';
import {useParams,useHistory} from 'react-router-dom';
import '../containersite/css/formulaire.css';
import * as API from '../api/config/api';

const UpdateProfil=(props)=>{

    const [data,setData]=useState({});
    const [success,setSuccess]=useState(false);
    const [message,setMessage]=useState('');
    const[image,setImage]=useState('');
    const {initUser}=props;
    const inputRefFile=useRef(null);
    const [invalid,setInvalid]=useState({})
    const history=useHistory();
    const {id}=useParams();
    const URL=`/user/view/${id}`;
    const URLUPDATE=`/user/update/${id}`;

    const saisir=(e)=>{
          e.preventDefault();
          const name=e.target.name;
          const value=e.target.value;
          switch(name){
               case 'image':
                    setImage(e.target.files[0].name)
                 
                    setData(state=>{return {...state,[name]:e.target.files}})
                    break;
               default :
                     setData(state=>{return {...state,[name]:value}})
                    return null
          }
    }
    
    const send=async (e)=>{
         e.preventDefault();
         setMessage('')
         setInvalid({})
         const form_data=new FormData();
        if(data.image){
                for(let i=0;i<data.image.length;i++){
                    form_data.append('imageUrl',data.image[i]);
                }
        }
        form_data.append('data',JSON.stringify(data));
    
         const res= await API.update(form_data,URLUPDATE);
         if(res){
              if(res.error){
                   setMessage(res.data.message)
                   if(inputRefFile.current){
                        inputRefFile.current.value=null;
                    }
                     localStorage.setItem('user',JSON.stringify(res.data.user))
                     initUser(res.data.user)
                     setSuccess(true)
              }else{
                  setInvalid(res.data)
                  setSuccess(false)
              }
         }else{
              setMessage('Veuillez actualiser la page')
              setSuccess(false)
         }
    }

    const init=useCallback( async()=>{
            const res= await API.view(URL);
            if(res){
                   if(res.error){
                         delete res.data.password;
                        setData(state=>{ return {...state,...res.data} });
                        setSuccess(true)
                }else{
                         setMessage(res.data)
                         setSuccess(false)
                    }
              }else{
                   setMessage('Veuillez actualiser la page')
                   setSuccess(false)
              }
    },[URL])


    useEffect(()=>{
         init()
    },[success,init])


      return <section className="formulaire" >
                <div className="title">Modifier vos informations</div>
               <form className="login_sign" onSubmit={(e)=>send(e)}>

                   <div className="item">
                            <span className="btn_redirection" onClick={()=>history.push('/article')}> <i className="fas fa-times-circle"></i></span>
                   </div>
                   {message &&
                     <div className="item">
                            <p className={!success?"valid_msg":"inValid_msg"}>{message && message} </p>
                     </div>
                    }

                   <div  className="item">
                        <label htmlFor="fullName">Nom utilisateur <span className={invalid.fullName ? "valid":"inValid"}> {invalid.fullName || ''}</span></label>
                        <input value={data.fullName || ''} id="fullName" type="text" name="fullName" placeholder="Nom utilisateur"onChange={(e)=>saisir(e)}/>
                   </div>
                   <div  className="item">
                        <label htmlFor="email">Email <span className={invalid.email ? "valid":"inValid"}> {invalid.email || ''}</span></label>
                        <input value={data.email || ''} id="email" type="email" name="email" placeholder="Votre email" onChange={(e)=>saisir(e)}/>
                   </div>
                   <div className="item">
                   <label htmlFor="linkGithub">Lien github <span className={invalid.lienGithub ? "valid":"inValid"}> {invalid.lienGithub || ''}</span></label>
                       <input type="text" value={data.linkGithub || ""} id="linkGithub" name="linkGithub" placeholder="Lien github" onChange={(e)=>saisir(e)}/>
                   </div>

                   <div  className="item">
                       <label htmlFor="image"> <span className="image" >image</span> {image}</label>
                        <input  id="image" type="file" name="image" ref={inputRefFile}  onChange={(e)=>saisir(e)}/>
                   </div> 
                   
                   <div  className="item">
                        <label htmlFor="password">Nouveau mot de passe <span className={invalid.password ? "valid":"inValid"}>{invalid.password || ''}</span></label>
                        <input value={data.password || ""} id="password" type="password" name="password" placeholder="Nouveau password" onChange={(e)=>saisir(e)}/>
                   </div>

                   <div  className="item">
                        <label htmlFor="password2">Ancian mot de passe <span className={invalid.password2 ? "valid":"inValid"}>{invalid.password2 || ''}</span></label>
                        <input value={data.password2 || ""} id="password2" type="password" name="password2" placeholder="Ancien mot de passe" onChange={(e)=>saisir(e)}/>
                   </div>
                   <div className="item">
                   <label htmlFor="comment">Commentaire <span className={invalid.comment ? "valid":"inValid"}>{invalid.comment || ''}</span></label>
                       <textarea name="comment" value={data.comment || ''} id="comment" placeholder="Faire un commentaire sur vous!" onChange={(e)=>saisir(e)}></textarea>
                   </div>

                   <div  className="item ">
                       <button>Envoyer</button>
                   </div>
                
               </form>
        </section>   
}
export default UpdateProfil