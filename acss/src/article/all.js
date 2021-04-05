import React,{useState,useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import '../containersite/css/card.css';
import * as API from '../api/config/api';

const All=(props)=>{
   
   const [array,setArray]=useState([]);
   const URL="/article/all/";
   const init=useCallback( async ()=>{
            const res = await API.all(URL);
            if(res.error){
                setArray(res.data);
            }
   },[URL])
   
   const redirection=(e,x)=>{
          e.preventDefault();
          window.location=x;
   }

   useEffect(()=>{
         init()
   },[init])
  

  return <>
   <section className="card">

   {array && array.map(value=> {
    
     return <div className="item" key={value._id}>
        <div className="btn_image">
        <Link to={`/article-view/${value._id || ''}`}>{value.categorie}</Link>
             <Link to={`/article-view/${value._id || ''}`}><img src={value.imageUrl} alt={value.categorie}/></Link>
        </div>
         <h1><Link to={`/article-view/${value._id || ''}`}>{value.title}</Link></h1>
        <p>{value.comment}</p>
        <div className="icone">
           <Link to={value.linkGithub || ''} onClick={(e)=>redirection(e,value.linkGithub)}>github</Link>
           <Link to={value.linkYoutube || ''} onClick={(e)=>redirection(e,value.linkYoutube)}>youtube</Link>
        </div>
      </div>
     })} 

   </section> 
   </>  

}

export default  All