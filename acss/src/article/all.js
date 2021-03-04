import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../containersite/css/card.css';
import * as API from '../api/config/api';

const All=(props)=>{
   const [array,setArray]=useState([]);
   const [success,setSuccess]=useState(false)
   const url="/project/all/";
   const init=async ()=>{
            const res = await API.all(url);
            if(res.error){
                setArray(res.data);
                setSuccess(true)
            }
   }
   const redirection=(e,x)=>{
          e.preventDefault();
          window.location=x;
   }

   useEffect(()=>{
         init()
   },[success])
  

  return <setion className="card">

   {array && array.map(value=> {
    
     return <div className="item" key={value._id}>
        <div className="btn_image">
        <Link to={`/article-view/${value._id}`}>{value.categorie}</Link>
             <Link to={`/article-view/${value._id}`}><img src={value.imageUrl} alt={value.categorie}/></Link>
        </div>
         <h1><Link to={`/article-view/${value._id}`}>{value.title}</Link></h1>
        <p>{value.comment}</p>
        <div className="icone">
           <Link to={value.linkGithub} onClick={(e)=>redirection(e,value.linkGithub)}>github</Link>
           <Link to={value.linkYoutube} onClick={(e)=>redirection(e,value.linkYoutube)}>youtube</Link>
        </div>
      </div>
     })} 

   </setion>   

}

export default  All