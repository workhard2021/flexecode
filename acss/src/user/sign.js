import React,{useState,useRef} from 'react';
import {Link,useHistory} from 'react-router-dom';
import * as API from '../api/config/api';
import '../containersite/css/formulaire.css';
import Loader from '../containersite/loader';
const Sign=(props)=>{

    const [data,setData]=useState({});
    const [invalid,setInvalid]=useState({});
    const [message,setMessage]=useState('');
    const inputRefFile=useRef(null);
    const history=useHistory();
    const [loader,setLoaer]=useState(false);
    const URL='/user/sign/';
    const saisir=(e)=>{
        e.preventDefault();
        const name=e.target.name;
        const value=e.target.value;

        switch(name){
             case 'image':
                  setData(state=>{return {...state,[name]:e.target.files}})
                  break;
             default :
                   setData(state=>{return {...state,[name]:value}})
                  return null
        }
    }
    
    const send= async (e)=> {
         e.preventDefault();
         setMessage('');
         setLoaer(true);
         const res= await API.create(data,URL);
         if(res){
              setLoaer(false);
              if(res.error){
                  
                   setMessage(res.data)
                   if(inputRefFile.current){
                        inputRefFile.current.value=null;
                   }
                    setData({})
                    setInvalid({})
              }else{
                    setInvalid(res.data)
              }

         }
    }
  
   return  <section  className="formulaire">

   <div className="title title_p">S'inscrire</div>
   <form className="login_sign" onSubmit={(e)=>send(e)} >
       { loader && <Loader/> }
       <div className="item">
                 <span className="btn_redirection" onClick={()=>history.push('/')}> <i className="fas fa-times-circle"></i></span>
       </div>
       {message &&  
         <div className="valid_msg">
              {message}
         </div>
        }
       <div  className="item">
            <label htmlFor="email">Email <span className={ invalid.email!==undefined ? "valid":"inValid"}> {invalid.email}</span></label>
            <input id="email" value={data.email || ''} type="email" name="email" placeholder="Votre email" onChange={(e)=>saisir(e)}/>
       </div>

       <div  className="item">
            <label htmlFor="fullName">Nom utilisateur <span className={ invalid.fullName!==undefined ? "valid":"inValid"}> {invalid.fullName}</span></label>
            <input id="fullName" value={data.fullName || ''} type="text" name="fullName" placeholder="Nom utilisateur" onChange={(e)=>saisir(e)}/>
       </div>
       <div  className="item">
            <label htmlFor="password">Mot de passe <span className={ invalid.password!==undefined ? "valid":"inValid"}> {invalid.password}</span></label>
            <input id="password" value={data.password || ''} type="password" name="password" placeholder="Mot de passe" onChange={(e)=>saisir(e)}/>
       </div>

       <div  className="item ">
           <button>S'inscrire</button>
       </div>
       <div className="item btn">
               <Link to={`/user/login`}>Se connecter</Link>
       </div>
       
   </form>
 
</section>   

   
}

export default Sign;