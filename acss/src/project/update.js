import React,{useState,useRef,useEffect, useCallback} from 'react';
import {useParams,useHistory} from 'react-router-dom';
import * as API from '../api/config/api';
import '../containersite/css/formulaire.css';
const Update=(props)=>{
    const {user}=props;
    const option=['php','css','java','javascript','python','nodejs','reactjs','react native'];
    const [data,setData]=useState({});
    const [invalid,setInvalid]=useState({})
    const [message,setMessage]=useState('');
    const inputRefFile=useRef(null);
    const [images,setImage]=useState('')
    const {id}=useParams();
    const history=useHistory();
    const URL=`/project/view/${id}`;
    const URLUPDATE=`/project/update/${id}`;

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
         const form_data=new FormData();
        if(data.image){
                for(let i=0;i<data.image.length;i++){
                    form_data.append('imageUrl',data.image[i]);
                }
        }
        form_data.append('data',JSON.stringify({...data,idUser:user._id}));
         const res= await API.update(form_data,URLUPDATE);
         if(res){
              if(res.error){
                   setMessage(res.data)
                   if(inputRefFile.current){
                        inputRefFile.current.value=null;
                   }
                   setInvalid({})
                   setImage('')
               
              }else{
                   
                   setInvalid(res.data)
              }

         }
    }

    const init= useCallback(async()=>{
            const res= await API.view(URL);
            if(res){
                   if(res.error){
                    setData(state=>{ return {...state,...res.data} });
                }else{
                         setMessage(res.data)
                         
                    }
              }else{ 
                     setMessage('Veuillez actualiser la page')
              }
    },[URL])

    useEffect(()=>{
         init()
    },[init])

    return <section className="formulaire">
    <div className="title">Mettre à jour </div>
   <form className="login_sign" onSubmit={(e)=>send(e)}>
       
       <div className="item">
                <span className="btn_redirection" onClick={()=>history.goBack()}> <i className="fas fa-times-circle"></i></span>
       </div>
       
       {message &&  
         <div className="item">
           <p className="valid_msg">{message}</p>
         </div>
        }
       <div  className="item">
            <label htmlFor="select">Categorie <span className={ invalid.categorie? "valid":"inValid"}> {invalid.categorie? invalid.categorie:''}</span></label>
              <div id="select_item">
                <select name="categorie" id="select" value={data.categorie || ''} onChange={(e)=>saisir(e)}>
                       <option  value='' desabled='true'>Choisir</option>
                      {option.map((value,index)=>{ return <option key={index} value={value}>{value}</option> }) }
                 </select>
              </div>
        </div>

       <div  className="item">
            <label htmlFor="title">Titre <span className={ invalid.title? "valid":"inValid"}> {invalid.title || ''}</span></label>
            <input type="text" value={data.title || ""}  id="title" name="title" placeholder="Titre"  onChange={(e)=>saisir(e)}/>
       </div>

       <div  className="item">
            <label htmlFor="linkGithub">LinkGithub <span className={ invalid.linkGithub? "valid":"inValid"}> {invalid.linkGithub || ''}</span></label>
            <input type="text" value={data.linkGithub || ""} id="linkGithub" name="linkGithub" placeholder="Lien github"  onChange={(e)=>saisir(e)}/>
       </div>

       <div  className="item">
            <label htmlFor="image"> <span className="image" >image</span> {images}</label>
            <input id="image" type="file" name="image" ref={inputRefFile}  onChange={(e)=>saisir(e)} />
       </div> 


       <div  className="item">
            <label htmlFor="comment">Commantaire <span className={ invalid.comment? "valid":"inValid"}> {invalid.comment || ''}</span></label>
            <textarea id="comment" value={data.comment || ""} name="comment" placeholder="Ajouter commentaire" onChange={(e)=>saisir(e)}> </textarea>
       </div> 
       
       <div  className="item ">
           <button>Envoyer</button>
       </div>
   </form>
 
</section>  

}

export default Update;

