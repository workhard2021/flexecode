import React,{useEffect,useCallback,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import * as API from '../api/config/api';
const Profil  =(props)=>{

          const {id}=useParams();
          const URL=`/user/view/${id}`;
          const [view,setView]=useState(null)

          const init =useCallback(  async()=>{
               const res= await  API.view(URL);
               if(res){ 
                 if(res.error){
                       setView(res.data)
                 }else{
                      setView(res.data)
                 }

               }else{
                      console.warn('Actualiser la page')
               }
          },[URL])

          useEffect(()=>{
                init()
          },[init])
         
          if(view){ 

          return <>
                    <ul>
                    <Link to='/user/'>HOME USER</Link>
                      <li><Link to={ `/user/update/${view._id}`}>{view.fullName}</Link></li>
                      <li><Link>{view.dateInsert}</Link></li>
                      <li><Link>{view.email}</Link></li>
                    </ul>  
          </>
          }else return <div>Aucun utilisateur</div>

}
export default Profil