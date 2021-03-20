import React,{useState,useEffect,useCallback} from 'react';
import {Link, useParams} from 'react-router-dom';
import '../containersite/css/liste-article.css';
import * as API from '../api/config/api';



const MenagerCategorieView=(props)=>{
   const [array,setArray]=useState([]);
   const [success,setSuccess]=useState(false);
   const [message,setMessage]=useState('');
   const {categorie}=useParams()
   const placeholder="Rechercher..."
   const URL=`/project/categorie/${categorie}`;

   const init= useCallback( async ()=>{
           const res = await API.view(URL);
            if(res.error){
                setArray(res.data);
            }
   },[URL]);

   const destroy= async (id)=> {
           
           const URL=`/project/destroy/${id}`;
           setMessage('');
           setSuccess(false)
           const res= await API.destroy(URL);
           if(res){
              if(res.error){
                     setMessage(res.data)
                     setSuccess(true)  
              }else{
                     setMessage(res.data)
                    
              }
           }else{   
                  setMessage('veuillez actualiser la page')
           }     
   }
   const redirection=(e,a)=>{
            e.preventDefault();
            window.location=a;
   }

   useEffect(()=>{
          init()
   },[success,init])
   

      return <section className="list">
                  <form>
                        <input type="text" name="search" placeholder={placeholder}/>
                        <button><i className="fas fa-search"></i></button>
                   </form>
                <table>
                    
                    <caption>Gestion des  Projets des utlisateur</caption>
                     {message!=='' && <span>{message}</span>}
                  
                    <thead>
                        <tr>
                           <th>N°</th>
                           <th>Voir</th>
                           <th>Modifier</th>
                           <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                    {array && array.map((value,index)=> {
                       return <tr key={value._id}>
                           
                            <td><Link to="#">{index+1}</Link></td>
                            <td><Link to={`${value.linkGithub}`} target='_blank' onClick={(e)=>redirection(e,value.linkGithub)} ><img  src={value.imageUrl}alt="tag" /></Link></td>
                            <td><Link to={`/project/update/${value._id}`}><i className="fas fa-edit">Modifier</i></Link></td>
                            <td><Link to="#" onClick={(e)=>destroy(value._id)}> <i className="fas fa-trash-alt">suprimer</i></Link></td>
                       
                        </tr>
                     })}

                    </tbody>
                </table>
         
         
        </section>   
}
export default MenagerCategorieView