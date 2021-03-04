import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as API from '../api/config/api';

const MenagerCategorie=(props)=>{

   const [array,setArray]=useState([]);
   const url="/article/all/";

   const init=async ()=>{
           const res = await API.all(url);
            if(res.error){
                  const categories= res.data.filter((values,index)=>index===res.data.findIndex( (value,index)=>value.categorie===values.categorie))   ;
                  setArray(categories);
            }
   }

   useEffect(()=>{
         init()
   },[])

  return <>
              <h2>Gestion des articles categories</h2>
             <setion className="cardProject">
                
              {array && array.map((value,index)=>{
                 return <div className="project" key={value._id}>
                        <div className="item"  >
                           <img id="logo_image" src={value.imageUrl} alt="logo"/>
                           <Link to={ `/article/menager-categorie/${value.categorie}`}>{value.categorie}</Link>
                       </div>
                       <p>Vous trouverez tous les projects concernant {value.categorie}</p>
                   </div> 
              })}
        </setion>  
       </> 

}

export default  MenagerCategorie



