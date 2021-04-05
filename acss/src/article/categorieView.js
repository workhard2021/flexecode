import React,{useState,useEffect,useCallback} from 'react';
import {Link,useParams} from 'react-router-dom';
import * as API from '../api/config/api';
import '../containersite/css/card.css';

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
   <h2 className='title title_cat_view'> Tous les tutoriels <span>{array.length>0 && array[0].categorie}</span></h2>
   <p className="parag">Voullez vous apprendre de nouvelles choses? alors vous êtes sur le bon chemin au bon moment.</p>
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
        <a href={value.linkGithub || ''}  rel="noreferrer" target="_blank">Github</a>
        <a href={value.linkYoutube || ''} rel="noreferrer" target="_blank">Youtube</a>
     </div>
   </div>
  })} 

</section>   
</> 
         
}

export default  CategorieView