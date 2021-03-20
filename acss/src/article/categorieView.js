import React,{useState,useEffect,useCallback} from 'react';
import {Link,useParams} from 'react-router-dom';
import * as API from '../api/config/api';
import '../containersite/css/cardProject.css';

const CategorieView=(props)=>{

   const [array,setArray]=useState([{}]);
   const {categorie}=useParams();
   const URL=`/article/categorie/${categorie}`;
   const init=useCallback(  async ()=>{
           const res = await API.view(URL);
            if(res.error){
                setArray(res.data);  
                
            }
   },[URL])

   useEffect(()=>{
         init()
   },[init])
   
  
   return <>
   <h2>{array.length>0 && array[0].categorie}</h2>
  <section className="cardProject">

     {array && array.map((value,index)=>{
        return <div className="project" key={index+1}>
              <div className="item">
                 <img id="logo_image" src={value.imageUrl} alt="logo"/>
                 <Link className="dot-1" to={ `/article-view/${value._id || ''}`}><strong>{value.title} </strong></Link>
              </div>
            <p>{value.comment}</p>
        </div> 

     })}  
</section>  
</> 
         
}

export default  CategorieView