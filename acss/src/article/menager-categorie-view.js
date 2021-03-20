import React,{useState,useEffect, useCallback} from 'react';
import {Link, useParams} from 'react-router-dom';
import * as API from '../api/config/api';
import '../containersite/css/liste-article.css';

const MenagerCategorieView=(props)=>{

   const [array,setArray]=useState([]);
   const [success,setSuccess]=useState(false);
   const [message,setMessage]=useState('');
   const {categorie}=useParams()
   const placeholder='Recherche ...';

   const URL=`/article/categorie/${categorie}`;
   const init=useCallback( async ()=>{
           const res = await API.view(URL);
            if(res.error){
                setArray(res.data);
            }

   },[URL]);

   const destroy= async (id)=> {
           const URL=`/article/destroy/${id}`;
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

   useEffect(()=>{
          init()
   },[init,success])
   
     

return <section className="list">
                
<table>
    
    <caption>Gestion des articles</caption>
    <form>
        <input type="text" name="search" placeholder={placeholder}/>
        <button><i class="fas fa-search"></i></button>
    </form>
        {message&& <p>{message}</p>}
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
            <td><Link to={ `/article-view/${value._id}`}><img  src={value.imageUrl}alt="tag" /></Link></td>
            <td><Link to={`/article/update/${value._id}`}><i className="fas fa-edit">Modifier</i></Link></td>
            <td><Link to="#" onClick={(e)=>destroy(value._id)}> <i className="fas fa-trash-alt">suprimer</i></Link></td>
       
        </tr>
     })}

    </tbody>
</table>


</section>   

}

export default  MenagerCategorieView