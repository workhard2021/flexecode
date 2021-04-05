import React,{useState,useCallback,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import '../containersite/css/cardProject.css';
import * as API from '../api/config/api';

const Categorie=(props)=>{

   const [success,setSucess]=useState(false);
   const history=useHistory();
   const [array,setArray]=useState([]);  
   const URL="/project/all/";

   const init=useCallback(  async ()=>{
           const res = await API.all(URL);
           if(res){
                 if(res.error) {
                        const categories= res.data.filter((values,index)=>index===res.data.findIndex( (value,index)=>value.categorie===values.categorie))   ;
                       
                                setArray(categories);
                                setSucess(true);
                 }else{
                        alert(JSON.stringify(res.data))
                 }

            }else {

                    history.push('/article');
            }
   },[URL,history])

   useEffect(()=>{
         init()
   },[success,init])
      return <>
              <h2 className="title">Categories des projets</h2>
             <section className="cardProject">
                
              {array && array.map((value)=>{
                 return <div className="project" key={value._id}>
                        <div className="item"  >
                           <img id="logo_image" src={value.imageUrl} alt="..."/>
                           <Link to={ `/project/categorie/${value.categorie}`}>{value.categorie}</Link>
                       </div>
                   </div> 
              })}
        </section>  
        </> 
}
export default Categorie