import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import * as API from '../api/config/api';
const Login=(props)=>{
    const [data,setData]=useState({});

    const [message,setMessage]=useState('');
   
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
         if(res){
              if(res.error){
                    setData({codeSource:{}})
                    localStorage.setItem('user',JSON.stringify(res.data))
                    history.push('/article');
              }else{
                  setMessage(res.data)
              }

         }else{
              setMessage('Veuillez actualiser la page')
         }
    }
    

    return <form onSubmit={(e)=>send(e)}>
              {message &&  <div className='invalid'> {message}</div>}
    
              <table>
                <tbody>

                 <tr>
                      <th>
                          <label htmlFor='email'>Email:</label>
                      </th>
                      <td><input type="email" value={data.email || ""}  id="email" name="email" placeholder="Votre email"  onChange={(e)=>saisir(e)}/></td>
                  </tr>
                   <tr>
                      <th>
                          <label htmlFor='password'>Password:</label>
                      </th>
                      <td><input type="password" value={data.password || ""}  id="password" name="password" placeholder="Nouveau mot de passe"  onChange={(e)=>saisir(e)}/></td>
                  </tr>

                   <tr>
                      <td colSpan="2"><button>Se connecter</button></td>
                   </tr>
                 </tbody>
              </table>
    </form>
}

export default Login;