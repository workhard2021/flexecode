import React,{useState,useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import * as API from '../api/config/api';
import '../containersite/css/cardProject.css';

const Categorie=(props)=>{
   const [array,setArray]=useState([]);
 
   const URL="/article/all/";
   const init=useCallback( async ()=>{
           const res = await API.all(URL);
            if(res.error){
                  const categories= res.data.filter((values,index)=>index===res.data.findIndex( (value,index)=>value.categorie===values.categorie))   ;
                  setArray(categories);

            }
   },[URL])

   useEffect(()=>{
         init()
   },[init])
 
   return <>
   <h2>Categorie des article</h2>
  <section className="cardProject">
     
   {array && array.map((value)=>{
      return <div className="project" key={value._id}>
             <div className="item"  >
                <img id="logo_image" src={value.imageUrl || ''} alt="logo"/>
                <Link to={ `/article/categorie/${value.categorie || ''}`}>{value.categorie}</Link>
            </div>
            <p>Vous trouverez toute les categories concernant {value.categorie || ''}</p>
        </div> 
   })}
</section>  
</> 

}

export default  Categorie


