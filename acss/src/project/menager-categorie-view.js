import React,{useState,useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import '../containersite/css/liste-article.css';
import * as API from '../api/config/api';



const MenagerCategorieView=(props)=>{
   const [array,setArray]=useState([]);
   const [success,setSuccess]=useState(false);
   const [message,setMessage]=useState('');
   const [up,setUp]=useState(false);
   const {categorie}=useParams()
   const placeholder="Rechercher..."
   const URL=`/project/categorie/${categorie}`;

   const init=  async ()=>{
           const res = await API.view(URL);
            if(res.error){
                setArray(res.data);
            }
   };

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
   },[success])
   

      return <setion className="list">
                
                <table>
                    
                    <caption>Gestion des  Projets des utlisateur</caption>
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
                           
                            <td><Link to="#">1</Link></td>
                            <td><Link to={`${value.linkGithub}`} target='_blank' onClick={(e)=>redirection(e,value.linkGithub)} ><img  src={value.imageUrl}alt="tag" /></Link></td>
                            <td><Link to={`/project/update/${value._id}`}><i className="fas fa-edit">Modifier</i></Link></td>
                            <td><Link to="#" onClick={(e)=>destroy(value._id)}> <i className="fas fa-trash-alt">suprimer</i></Link></td>
                       
                        </tr>
                     })}

                    </tbody>
                </table>
         
         
        </setion>   
}
export default MenagerCategorieView