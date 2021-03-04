import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import '../containersite/css/cardProject.css';
import * as API from '../api/config/api';

const MenagerCategorie=(props)=>{

   const [success,setSucess]=useState(false);
   const history=useHistory();
   const [array,setArray]=useState([]);
   const URL="/project/all/";

   const init=async ()=>{
           const res = await API.all(URL);
           if(res){
                 if(res.error) {
                        const categories= res.data.filter((values,index)=>index===res.data.findIndex( (value,index)=>value.categorie===values.categorie))   ;
                        setArray(categories);
                        setSucess(true)
            
                 }else{
                        alert(JSON.stringify(res.data))
                 }

            }else {

                    history.push('/article');
            }
   }

   useEffect(()=>{
         init()
   },[success])
      return <>
              <h2>Gestion des  Categories</h2>
             <setion className="cardProject">
                
              {array && array.map((value,index)=>{
                 return <div className="project" key={value._id}>
                        <div className="item"  >
                           <img id="logo_image" src={value.imageUrl} alt="logo"/>
                           <Link to={ `/project/menager-categorie/${value.categorie}`}>{value.categorie}</Link>
                       </div>
                       <p>Vous trouverez tous les projects concernant {value.categorie}</p>
                   </div> 
              })}
        </setion>  
        </> 
}
export default MenagerCategorie