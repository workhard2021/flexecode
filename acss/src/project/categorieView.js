import React,{useState,useEffect,useCallback} from 'react';
import {Link,useParams} from 'react-router-dom';
import * as API from '../api/config/api';

const CategorieView=(props)=>{

   const [array,setArray]=useState([{}]);
   const {categorie}=useParams();
   const URL=`/project/categorie/${categorie}`;
   const init=useCallback(  async ()=>{
           const res = await API.view(URL);
            if(res.error){
                
                setArray(res.data);
            }
   },[URL])

   useEffect(()=>{
         init()
   },[init])
  
   if(array.length>0) { 

      return   <> <p>{ array[0].categorie}</p>
           <ul>
             {array && array.map(value=> {
                   return <li key={value._id}><Link to={ `${value.linkGithub}`}>{value.categorie} voir linkGithub</Link></li>})
             }
           </ul>  
         </>
         
    }else return  <div>Aucun article</div>
         
}

export default  CategorieView