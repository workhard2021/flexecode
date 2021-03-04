import React,{useState,useEffect,useCallback} from 'react';
import {Link,useParams} from 'react-router-dom';
import * as API from '../api/config/api';
import '../containersite/css/cardProject.css';

const CategorieView=(props)=>{

   const [array,setArray]=useState([{}]);
   const {categorie}=useParams();
   const [success,setSuccess]=useState(false)
   const URL=`/article/categorie/${categorie}`;
   const init=useCallback(  async ()=>{
           const res = await API.view(URL);
            if(res.error){
                
                setArray(res.data);
                setSuccess(true)
            }
   },[URL])
   const redirection=(e,x)=>{
          e.preventDefault();
          window.location.href=x;
   }

   useEffect(()=>{
         init()
   },[success])
   
  
   return <>
   <h2>{array.length>0 && array[0].categorie}</h2>
  <setion className="cardProject">

     {array && array.map((value,index)=>{
        return <div className="project" key={value._id}>
            <div className="item">
                 <img id="logo_image" src={value.imageUrl} alt="logo"/>
                 <Link className="dot-1" to={ `/article-view/${value._id}`}><strong>{value.title} </strong></Link>
            </div>
            <p>{value.comment}</p>
        </div> 

     })}  
</setion>  
</> 
         
}

export default  CategorieView