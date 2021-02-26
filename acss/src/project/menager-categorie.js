import React,{useState,useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import * as API from '../api/config/api';

const MenagerCategorie=(props)=>{

   const [array,setArray]=useState([]);
   const url="/project/all/";

   const init=useCallback(  async ()=>{
           const res = await API.all(url);
            if(res.error){
                  const item=[];let i=0;
                  for(let data of res.data){
                        const {categorie}=data;
                        item[i]=categorie;
                        i++;
                   }
                 setArray(Array.from(new Set(item)));
            }
   },[url])

   useEffect(()=>{
         init()
   },[init])

  return <div>
           <p>Categorie Menager</p>
           <ul>
             {array && array.map((value,index)=> {
                   return <li key={index} ><Link to={`/project/menager-categorie/${value}`}>{value}</Link></li>})
            }
           </ul>  
  </div> 

}

export default  MenagerCategorie