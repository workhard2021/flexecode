import React,{useCallback,useEffect,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import * as API from '../api/config/api';
const View  =(props)=>{

          const {id}=useParams();
          const URL=`/article/view/${id}`;
          const [view,setView]=useState(null)
          const init = useCallback ( async()=>{
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
          
         if(view===null){
              return null;
         }
         
         return <>
                    <ul>
                      <li><Link>{view.title}</Link></li>
                      <li><Link>{view.comment}</Link></li>
                    </ul>
                
          </>

}
export default View