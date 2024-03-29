import React,{useState} from 'react';
import {useHistory,Link} from 'react-router-dom';
import Loader from '../containersite/loader';
import * as API from '../api/config/api';
const Login=(props)=>{
    const [data,setData]=useState({});
    const [message,setMessage]=useState('');
    const {initUser}=props;
    const history=useHistory();
    const URL='/user/login/';
    const [loader,setLoaer]=useState(false);

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
    
    const send=async (e)=>{
         e.preventDefault();
         setMessage('');
         setLoaer(false);
         const res= await API.login(data,URL);

         if(res){
            
              if(res.error){
                   
                        localStorage.setItem('user',JSON.stringify(res.data))
                         initUser(res.data)
                         history.push('/');
                        
              }else{
                  setMessage(res.data)
              }

         }
    }
     
    
    return  <section  className="formulaire">

    <div className="title title_p">Se connecter</div>
   <form className="login_sign" onSubmit={(e)=>send(e)} >
       { loader && <Loader/> }
       <div className="item">
                 <span className="btn_redirection" onClick={()=>history.push('/')}> <i className="fas fa-times-circle"></i></span>
       </div>
       {message &&  
         <div className="valid_msg color">
              {message}
         </div>
        }
       <div  className="item">
            <label htmlFor="email">Email </label>
            <input id="email" value={data.email || ''} type="email" name="email" placeholder="Votre email" onChange={(e)=>saisir(e)}/>
       </div>

       <div  className="item">
            <label htmlFor="password">Mot de passe </label>
            <input id="password" value={data.password || ''} type="password" name="password" placeholder="Mot de passe" onChange={(e)=>saisir(e)}/>
       </div>

       <div  className="item ">
           <button>Se connecter</button>
       </div>
       <div className="item btn">
               <Link to={`/user/sign`}>S'inscrire</Link>
       </div>
       
   </form>
 
</section>   

   
}

export default Login;