import React,{useState,useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import * as API from '../api/config/api';

const MenagerUser=(props)=>{

   const [array,setArray]=useState([]);
   const [success,setSuccess]=useState(false);
   const [message,setMessage]=useState('');
   const [up,setUp]=useState(false);

   const URL=`/user/all`;
   const init= useCallback (  async ()=>{
           const res = await API.view(URL);
            if(res.error){
                setArray(res.data);
            }
   },[URL]);

   const destroy= async (id)=> {
           
           const URL=`/user/destroy/${id}`;
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
   const deni= async(id)=>{
            const URL=`/user/deni/${id}`
           const res= await API.view(URL);
           if(res.error){
                   setMessage(res.data)
                   setSuccess(true)
           }else{  
                   setSuccess(false)
                   setMessage(res.data)
           }
   }

   useEffect(()=>{
          setUp(true);
          init()
         return ()=>setUp(false)
   },[up,success,message,init])
   
     if(!up){
           return null
     }


if(array.length>0) {

return <section>
            <h1>Menager {array[0].categorie}</h1>
             {message &&  <div className={success? 'valide':'invalid'}> {message}</div>}

           <ul>

             {array && array.map(value=> {
                 return <React.Fragment key={value._id}> 

                          <li>{value.fullName}</li>
                          <li>{value.email}</li>
                          <li> <Link to={`/user/profil/${value._id}`}>{value.fullName} voir profil </Link></li>
                          <li><button onClick={(e)=>destroy(value._id)}>Delete</button></li>
                          {/*<li><button onClick={(e)=>deni(value._id)}>{deni? 'Bloqué':'Debloqué'}</button></li>*/}
                         </React.Fragment>})
             }
           </ul>  
  </section> 

}else return <div>Aucun Project trouvé</div>

}

export default  MenagerUser