import React,{useState,useRef} from 'react';
import * as API from '../api/config/api';
const Login=(props)=>{
    const [data,setData]=useState({});
    const [success,setSuccess]=useState(false);
    const [message,setMessage]=useState('');
    const inputRefFile=useRef(null);
    const URL='/user/create';
   
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
         const form_data=new FormData();
        if(data.image){
                for(let i=0;i<data.image.length;i++){
                    form_data.append('imageUrl',data.image[i]);
                }
        }
        form_data.append('data',JSON.stringify(data));
         const res= await API.create(form_data,URL);
         if(res){
              if(res.error){
                   setData({codeSource:{}})
                   setMessage(res.data)
                   if(inputRefFile.current){
                        inputRefFile.current.value=null;
                   }
                   setSuccess(true)

              }else{
                  setMessage(res.data)
              }

         }else{
              setMessage('Veuillez actualiser la page')
         }
    }
    

    return <form onSubmit={(e)=>send(e)}>
              {message &&  <div className={success? 'valide':'invalid'}> {message}</div>}
             
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