import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../containersite/css/liste-article.css';
import * as API from '../api/config/api';

const ListeUser=(props)=>{
   
   const placeholder="Rechercher...";
   const [array,setArray]=useState([]);
   const [success,setSuccess]=useState(false);
   const [message,setMessage]=useState('');
   
   const URL=`/user/all`;
   const init= async ()=>{
           const res = await API.view(URL);
            if(res.error){
                setArray(res.data);
            }
   };

   const destroy= async (id)=> {
           
           const URL=`/user/destroy/${id}`;
           setMessage('');
           const res= await API.destroy(URL);
          
           if(res){
                   
              if(res.error){
                     setMessage(res.data)  
                     setSuccess(!success)
              }else{
                     setMessage(res.data)
              }
           }else{
                  setMessage('Veuillez actualiser la page')
           }     
   }
   const deni= async(id)=>{
            const URL=`/user/deni/${id}`
           const res= await API.deconnexionDeni(URL);
          
           if(res.error){
                   setMessage(res.data)
                   setSuccess(!success)
                  
           }else{  
                
                   setMessage(res.data)
           }
   }

   useEffect(()=>{
          init()
         
   },[success])
  
      
    return <setion className="list">
                
                <table>  
                    <caption>Liste des utilisateurs</caption>
                    <div className={message? 'valide':'invalid'}> {message}</div>
                    <form>
                        <input type="text" name="search" placeholder={placeholder}/>
                        <button><i class="fas fa-search"></i></button>
                    </form>
                    <thead>
                        <tr>
                           <th>N°</th>
                         
                           <th>Voir</th>
                           <th>Modifier</th>
                           <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {array && array.map(value=> {
                           
                       return <tr key={value._id}>
                            <td><a href="#">1</a></td>
                            <td><Link to={`/user/profil/${value._id}`}><img  src="/image/r1.jpg" alt="tag" /></Link></td>
                            <td><Link to="#"  onClick={(e)=>destroy(value._id)}><i class="fas fa-edit" >Delete</i></Link></td>
                            <td><Link  to="#" onClick={(e)=>deni(value._id)}>{value.deni? 'Bloquer':'Debloquer'}</Link></td>
                        </tr>
                       })}
                    </tbody>
                </table>
        </setion>   
}
export default ListeUser