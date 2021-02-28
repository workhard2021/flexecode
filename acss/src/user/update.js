import React,{useState,useRef,useEffect,useCallback} from 'react';
import {useParams,Link} from 'react-router-dom';
import * as API from '../api/config/api';
const Update=(props)=>{
    const [data,setData]=useState({});
    const [success,setSuccess]=useState(false);
    const [message,setMessage]=useState('');
    const inputRefFile=useRef(null);
    const {id}=useParams();
    const URL=`/user/view/${id}`;
    const URLUPDATE=`/user/update/${id}`;

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
    
         const res= await API.update(form_data,URLUPDATE);
         if(res){
              if(res.error){
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

    const init= useCallback (  async()=>{
            const res= await API.view(URL);
            if(res){
                   if(res.error){
                         delete res.data.password;
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

    return <form onSubmit={(e)=>send(e)}>
              {message &&  <div className={success? 'valide':'invalid'}> {message}</div>}
              <Link to='/'>HOME</Link>

              <table>
                <tbody>
  
                <tr>
                      <th>
                          <label htmlFor='fullName'>Nom utilisateur:</label>
                      </th>
                      <td><input type="text" value={data.fullName || ""}  id="fullName" name="fullName" placeholder="Nom d'utilisateur"  onChange={(e)=>saisir(e)}/></td>
                  </tr>

                  <tr>
                      <th>
                          <label htmlFor='email'>Email:</label>
                      </th>
                      <td><input type="email" value={data.email || ""}  id="email" name="email" placeholder="Votre email"  onChange={(e)=>saisir(e)}/></td>
                  </tr>
                  <tr>
                      <th>
                          <label htmlFor='linkGithub'>Lien github:</label>
                      </th>
                      <td><input type="text" value={data.linkGithub || ""} id="linkGithub" name="linkGithub" placeholder="Lien github"  onChange={(e)=>saisir(e)}/></td>
                  </tr>
                  <tr>
                      <th>
                       <label htmlFor='imageUrl'>Image:</label>
                     </th>
                      <td><input type="file" name="image"  ref={inputRefFile}  onChange={(e)=>saisir(e)} /></td>
                  </tr>
                   <tr>
                      <th>
                         <label htmlFor="comment">commentaire:</label>
                      </th>
                      <td><textarea id="comment" value={data.comment || ""} name="comment" placeholder="Ajouter commentaire" onChange={(e)=>saisir(e)}></textarea></td>
                   </tr>

                   <tr>
                      <th>
                          <label htmlFor='password'>Password:</label>
                      </th>
                      <td><input type="password" value={data.password || ""}  id="password" name="password" placeholder="Nouveau mot de passe"  onChange={(e)=>saisir(e)}/></td>
                  </tr>

                  <tr>
                      <th>
                          <label htmlFor='password2'>Email:</label>
                      </th>
                      <td><input type="password2" value={data.password2 || ""}  id="password2" name="password2" placeholder="Ancian mot de passe"  onChange={(e)=>saisir(e)}/></td>
                  </tr>

                   <tr>
                      <td colSpan="2"><button>Mettre à jour</button></td>
                   </tr>
                 </tbody>
              </table>

    </form>
}

export default Update;