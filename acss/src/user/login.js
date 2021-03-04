import React,{useState} from 'react';
import {useHistory,Link} from 'react-router-dom';
// import Verifier  from '../autre/verifier';
import * as API from '../api/config/api';
const Login=(props)=>{
    const [data,setData]=useState({});
    const [message,setMessage]=useState('');
    const [invalid,setInvalid]=useState({email:true,password:true})
    const email='Veuillez entrer votre email';
    const password='Veuillez entrer votre mot de passe';
    
   
    const history=useHistory();
    const URL='/user/login/';
   
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
         setMessage('')
         const res= await API.login(data,URL);
     //     const test=Verifier(data,['fullName','email']);
           
     //     if(test.verifier){
               //   return setInvalid(test);
          // }

         if(res){
              if(res.error){
                   
                    localStorage.setItem('user',JSON.stringify(res.data))
                    history.push('/article');
                    setInvalid({})
                    setData({})
                    
              }else{
                  setMessage(res.data)
              }

         }else{
              setMessage('Veuillez actualiser la page')
         }
    }
    
  
    return  <section  className="formulaire">

    <div className="title">Se connecter</div>
   <form className="login_sign" onSubmit={(e)=>send(e)} >
       
       <div className="item">
                 <span className="btn_redirection" onClick={()=>history.push('/article')}> <i class="fas fa-times-circle"></i></span>
       </div>
       {message && 
         <div className="item">
                <p className={`inValid_msg`}>{message}</p>
         </div>
       }
       <div  className="item">
            <label htmlFor="email">Email <span className={!invalid.email? "valid":"inValid"} > {!invalid.email?email:''}</span></label>
            <input id="email" value={data.email || ''} type="email" name="email" placeholder="Votre email" onChange={(e)=>saisir(e)}/>
       </div>

       <div  className="item">
            <label htmlFor="password">Mot de passe <span className={!invalid.password ? "valid":"inValid"} > {!invalid.password?password :''}</span></label>
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