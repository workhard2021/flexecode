import React,{useState,useCallback,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import '../containersite/css/cardProject.css';
import * as API from '../api/config/api';

const MenagerCategorie=(props)=>{
   const {user}=props;
   const [success,setSucess]=useState(false);
   const history=useHistory();
   const [array,setArray]=useState([]);
   const URL="/project/all/";
   const init=useCallback ( async ()=>{
           const res = await API.all(URL);
           if(res){
                 if(res.error) {
                     
                        const categories= res.data.filter((values,index)=>index===res.data.findIndex( (value,index)=>value.categorie===values.categorie));
                        if(user.role!=='admin') { 
                                const array_cm=categories.filter(value=>value.idUser===user._id);
                                setArray(array_cm)
                                setSucess(true);
                        }else {
                                setArray(categories);
                                setSucess(true);
                        }
                 }

            }else {
                    history.push('/article');
            }
   },[URL,history,user._id,user.role])

   useEffect(()=>{
         init()
   },[success,init])

      return <>
              <h2 className="title">Gestion des Categories</h2>
             <section className="cardProject">
                
              {array && array.map((value,index)=>{
                 return <div className="project" key={value._id}>
                        <div className="item"  >
                           <img id="logo_image" src={value.imageUrl} alt="logo"/>
                           <Link to={ `/project/menager-categorie/${value.categorie}`}>{value.categorie}</Link>
                       </div>
                       <p>Tous les projects  {value.categorie}</p>
                   </div> 
              })}
              </section>  
        </> 
}
export default MenagerCategorie