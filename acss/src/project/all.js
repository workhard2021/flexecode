import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as API from '../api/config/api';

const All=(props)=>{
   const [array,setArray]=useState([]);

   const url="/project/all/";
   const init=async ()=>{
           const res = await API.all(url);
            if(res.error){
                setArray(res.data);
            }
   }

   useEffect(()=>{
         init()
   },[])

  return <>
           <ul>
             {array && array.map(value=> {
                   return <li key={value._id} id={value._id}><Link to={ `${value.linkGithub}`}>{value.title} voir article</Link></li>})
            }
           </ul>  
  </> 

}

export default  All