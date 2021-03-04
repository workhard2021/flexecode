import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import '../containersite/css/cardProject.css';
import * as API from '../api/config/api';

const All=(props)=>{

   const [array,setArray]=useState([]);
   const [success,setSucess]=useState(false);
   const history=useHistory();
   const url="/project/all/";
   const init=async ()=>{
           const res = await API.all(url);
           if(res){

                 if(res.error) {
                     setArray(res.data);
                     setSucess(true)
                 }

            }else {

                 history.push('/article');
            }
   }

   useEffect(()=>{
         init()
   },[success])
   
   console.warn('after');
          
      return <setion className="cardProject">
                <h2>{array && array[0].categorie}</h2>
              {array && array.map((value,index)=>{
                 return <div className="project" key={value._id}>
                     <div className="item">
                          <img id="logo_image" src={ `${value.imageUrl}`} alt="logo"/>
                          <Link className="dot-1" to={ `${value.linkGithub}`}> <strong>{value.title} </strong></Link>
                     </div>
                     <p>{value.comment}</p>
                 </div> 

              })}  
        </setion>   
}
export default All