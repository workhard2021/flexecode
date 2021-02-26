import React,{useEffect,useCallback,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import * as API from '../api/config/api';
const View  =(props)=>{

          const {id}=useParams();
          const URL=`/project/view/${id}`;
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
                    <Link to='/project/'>HOME</Link>
                      <li><Link to={ `/project/update/${view._id}`}>{view.title}</Link></li>
                      <li><Link>{view.comment}</Link></li>
                    </ul>
                
          </>
          }else return <div>Aucun article</div>

}
export default View