import React,{useState,useEffect, useCallback} from 'react';
import {Link,useHistory,useParams} from 'react-router-dom';
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
                     setSucess(true)
                 }

            }else {

                   history.push('/article');
            }
   },[URL,history])

   const redirection=(e,x)=>{
           // e.preventDefault();
           window.location.href=x;
   }

   useEffect(()=>{
         init()
   },[success,init])
   
         
      return <>
            <h2>{array.length>0 && array[0].categorie}</h2>
           <setion className="cardProject">
    
              {array && array.map((value,index)=>{
                 return <div className="project" key={value._id}>
                     <div className="item">
                          <img id="logo_image" src={value.imageUrl} alt="logo"/>
                          <Link className="dot-1" target='_blank' to={value.linkGithub} onClick={(e)=>redirection(e,value.linkGithub)}> <strong>{value.title} </strong></Link>
                     </div>
                     <p>{value.comment}</p>
                 </div> 

              })}  
        </setion>  
        </> 
}
export default CategorieView