import React,{useState,useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import '../containersite/css/liste-article.css';
import Search from '../containersite/search';
import * as API from '../api/config/api';

const ListeUser=(props)=>{
   

   const [array,setArray]=useState([]);
   const [success,setSuccess]=useState(false);
   const [message,setMessage]=useState('');
   
   const URL=`/user/all`;
   const init=useCallback(  async ()=>{
           const res = await API.view(URL);
            if(res.error){
                setArray(res.data);
            }
   },[URL]);

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
         
   },[success,init]);
  
      
    return <section className="list">
                <Search setSearch={setArray} success={success} setSuccess={setSuccess} setMessage={setMessage} visibilite={false} url='/user/search'/>
                {message && <div className="invalid"> {message}</div> }
                <table>  
                    <caption>Liste des utilisateurs</caption>
                    <thead>
                        <tr>
                           <th>N°</th>
                         
                           <th>Voir</th>
                           <th>Supprimer</th>
                           <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {array && array.map((value,index)=> {
                           
                       return <tr key={value._id}>
                            <td><Link to="#">{index+1}</Link></td>
                            <td><Link to={`/user/profil/${value._id}`}><img  src="/image/r1.jpg" alt="tag" /></Link></td>
                            <td><Link to="#" onClick={(e)=>destroy(value._id)}><i className="fas fa-edit" >Delete</i></Link></td>
                            <td><Link  to="#" onClick={(e)=>deni(value._id)}>{value.deni? 'Bloquer':'Debloquer'}</Link></td>
                        </tr>
                       })}
                    </tbody>
                </table>
        </section>   
}
export default ListeUser