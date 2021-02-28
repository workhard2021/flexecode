import React,{useState,useEffect, useCallback} from 'react';
import {Link, useParams} from 'react-router-dom';
import * as API from '../api/config/api';

const MenagerCategorieView=(props)=>{

   const [array,setArray]=useState([]);
   const [success,setSuccess]=useState(false);
   const [message,setMessage]=useState('');
   const [up,setUp]=useState(false);
   const {categorie}=useParams()

   const URL=`/article/categorie/${categorie}`;
   const init= useCallback (  async ()=>{
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
          setUp(true);
          init()
         return ()=>setUp(false)
   },[up,success,init])
   
     if(!up){
           return null
     }


if(array.length>0) {

return <section>
            <h1>Menager en {array[0].categorie}</h1>
             {message &&  <div className={success? 'valide':'invalid'}> {message}</div>}

           <ul>

             {array && array.map(value=> {
                 return <React.Fragment key={value._id}>                         
                          <li><Link to={ `/article-view/${value._id}`}>{`${value.title} en ${value.categorie}`} voir linkGithub</Link></li>
                          <li><Link to={ `/article/update/${value._id}`}>Update</Link></li>
                          <li><button onClick={(e)=>destroy(value._id)}>Delete</button></li>
                         </React.Fragment>})
             }
           </ul>  
  </section> 

}else return <div>Aucun Project trouvé</div>

}

export default  MenagerCategorieView