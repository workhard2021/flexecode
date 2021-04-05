import React,{useState,useEffect, useCallback} from 'react';
import {useHistory,useParams} from 'react-router-dom';
import '../containersite/css/cardProject.css';
import * as API from '../api/config/api';

const CategorieView=(props)=>{

   const [array,setArray]=useState([]);
   const [success,setSucess]=useState(false);
   const history=useHistory();
   const {categorie}=useParams();
   const URL=`/project/categorie/${categorie}`;

   const init=useCallback(  async ()=>{
           const res = await API.view(URL);
           if(res){

                 if(res.error) {
                     setArray(res.data);
                     
                 }

            }else {

                   history.push('/article');
            }
   },[URL,history])

   useEffect(()=>{
      setSucess(true)
         init()
      return  ()=> setSucess(false)
   },[init])

    if(!success){
         
           return  null; 
    }
 ;
   
         
      return <>
            <h2 className="title">Tous les projets en <span>{array.length>0 && array[0].categorie}</span></h2>
           <section className="cardProject">
    
              {array && array.map((value,index)=>{
                 return <div className="project" key={index}>
                     <div className="item">
                          <img id="logo_image" src={value.imageUrl} alt="..."/>
                          <a className="dot-1"  rel="noreferrer" target='_blank' href={value.linkGithub}> <strong>{value.title} </strong></a>
                     </div>
         
                     <p>{value.comment}</p>
                 </div> 

              })}  
        </section>  
        </> 
}
export default CategorieView