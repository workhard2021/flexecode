import React,{useEffect,useState,useCallback} from 'react';
import CardAccueil from './card-accueil';
import * as API from '../api/config/api';
import './css/card-accueil.css';
import Logo from './logo';
const Accueil=(props)=>{

   const URL="/article/all/";
   const [array1,setArray1]=useState([]);
   const [array2,setArray2]=useState([]);
   const init=useCallback( async ()=>{
           const res = await API.all(URL);
            if(res.error){
                  const categories= res.data.filter((values,index)=>index===res.data.findIndex( (value,index)=>value.categorie===values.categorie))   ;
                  const a=categories.slice(0,5);
                  setArray1(a);
                  setArray2(categories);
            }
   },[URL])

   useEffect(()=>{
         init()
   },[init])
      
    return <div className="accueil">
        <Logo/>
        <h1 className="title_accueil">Apprendre à coder à partir de zéro </h1>
   
        <CardAccueil type="categorie" array={array2}/> 
        <CardAccueil array={array1}/>
     
       
      </div>
}
export default Accueil;