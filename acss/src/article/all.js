import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as API from '../api/config/api';

const All=(props)=>{
   const [array,setArray]=useState([]);
   const [success,setSucess]=useState(false);

   const url="/article/all/";
   const init=async ()=>{
           const res = await API.all(url);
            if(res.error){
                setArray(res.data);
            }
   }
     console.warn('before')
   useEffect(()=>{
     setSucess(true)
         init()
         console.warn('render')
         return ()=>  setSucess(false)
   },[success])
   console.warn('after')

  
    


  return <>
           <ul>
             {array.map(value=> {
                   return <li id={value._id}><Link to={ `/update/${value._id}`}>{value._id}</Link></li>})
            }
           </ul>  
  </> 

}

export default  All