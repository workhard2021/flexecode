import React,{useState,useRef} from 'react';
import {useHistory} from 'react-router-dom';
import '../containersite/css/formulaire.css';
import Loader from '../containersite/loader';


import * as API from '../api/config/api';

const Create=()=>{
    const option=['php','css','java','javascript','python','nodejs','reactjs','react native'];
    const [data,setData]=useState({});
    const [invalid,setInvalid]=useState({})
    const [message,setMessage]=useState('');
    const inputRefFile=useRef(null);
    const [images,setImage]=useState('')
    const URL='/article/create';
    const history=useHistory();
    const [loader,setLoaer]=useState(false);

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
         setInvalid({});
         setLoaer(true);
         
         const form_data=new FormData();
        if(data.image){
                for(let i=0;i<data.image.length;i++){
                    form_data.append('imageUrl',data.image[i]);
                }
        }
       
        form_data.append('data',JSON.stringify(data));
        const res= await API.create(form_data,URL);

         if(res){
              setLoaer(false);
              if(res.error) {
                    
                    setMessage(res.data)
                    inputRefFile.current.value=null;
                    setData({})
                   
              }else {
                    
                    setInvalid(res.data)
              }

         }
    }


      return <section className="formulaire">
                <div className="title title_p">Creer article</div>
               <form className="login_sign" onSubmit={(e)=>send(e)}>
                  { loader && <Loader/> }
                   <div className="item">
                             <span className="btn_redirection" onClick={()=>history.goBack()}> <i className="fas fa-times-circle"></i></span>
                   </div>
                   { message!=='' &&
                      <div className="item">
                            <p className="valid_msg">{message}</p>
                      </div>
                   }

                   <div  className="item">
                        <label htmlFor="select">Categorie<span className={ invalid.categorie!==undefined ? "valid":"inValid"}> {invalid.categorie}</span></label>
                          <div id="select_item">
                            <select name="categorie" id="select" value={data.categorie || ''} onChange={(e)=>saisir(e)}>
                                   <option  value='' desabled='true'>Choisir</option>
                                  {option.map((value,index)=>{ return <option key={index} value={value}>{value}</option> }) }
                             </select>
                          </div>
                    </div>

                   <div  className="item">
                        <label htmlFor="title">Titre <span className={ invalid.title!==undefined ? "valid":"inValid"}> {invalid.title}</span></label>
                        <input id="title" type="text" value={data.title || ''} name="title" placeholder="Titre" onChange={(e)=>saisir(e)}/>
                   </div>

                   <div  className="item">
                        <label htmlFor="linkGithub">Link Github <span className={ invalid.linkGithub!==undefined ? "valid":"inValid"}> {invalid.linkGithub}</span></label>
                        <input id="linkGithub" type="text" value={data.linkGithub || ""} name="linkGithub" placeholder="Lien github"  onChange={(e)=>saisir(e)}/>
                   </div>

                   <div  className="item">
                        <label htmlFor="linkYoutube">Lien Youtube <span className={ invalid.linkYoutube!==undefined ? "valid":"inValid"}>  {invalid.linkYoutube}</span></label>
                        <input id="linkYoutube" value={data.linkYoutube || "" } type="text" name="linkYoutube" placeholder="lien Youtube" onChange={(e)=>saisir(e)}/>
                   </div>

                   <div  className="item">
                        <label htmlFor="image"> <span className="image" >image</span> {images} </label>
                        <input id="image" type="file" name="image"  ref={inputRefFile}  onChange={(e)=>saisir(e)} />
                   </div> 

                   <div  className="item">
                        <label htmlFor="comment">Commantaire <span className={ invalid.comment!==undefined ? "valid":"inValid"}> {invalid.comment}</span></label>
                        <textarea id="comment" value={data.comment || ""} name="comment" placeholder="Ajouter commentaire" onChange={(e)=>saisir(e)}></textarea>
                   </div> 
                   <div  className="item ">
                       <button>Envoyer</button>
                   </div>

               </form>
             
        </section>   
}
export default Create