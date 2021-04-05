import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import * as API from '../api/config/api';
import './css/search.css';

const Search=(props)=>{

     const [array,setArray]=useState([]);
     const [text,setText]=useState({search:''});
     const {url,visibilite,success,setOpen,setSuccess,setMessage,setSearch}=props; 
     const placeholder="Rechercher...";
     const send=(e)=>{
          e.preventDefault();
          setMessage('');
          setArray([]);
          if(visibilite){ 
              setOpen((c)=> {return  {...c,search:false} });
          }
          
      /*     if(text.search){
                 const res=API.view(`${url}+/${text.search}`);
             if(res.error){
                    setSearch(res.data);
                     setArray(res.data);
                }
                alert(JSON.stringify(text.search));
      }*/
           
     }
     const copie=(e)=>{
           e.preventDefault();
           setText({search:e.target.text});
           setArray([]);
     }
     const saisir= async(e)=>{
           e.preventDefault();
           const {name,value}=e.target;
           setText({[name]:value});
            
           if(value){
            const res= await API.view(`${url}/${value}`);
            if(res.error){
                 if(res.data.length>0) { 
                    if(!visibilite){ 
                       setSearch(res.data);
                       setMessage('');

                    }else{

                        setArray(res.data);
                        setMessage(''); 
                    }

                 }else{
                      setMessage('Aucun resultat');
                  //     setArray([]);
                      setSuccess(!success);
                 }
            }
         }
     }
   
          
    return <div className="search">
           <form onSubmit={(e)=>send(e)}>
            <input type="text" value={text.search} name="search" placeholder={placeholder} onChange={(e)=>saisir(e)}/> 
            <button><i className="fas fa-window-close"></i></button>
           </form>
            
            <ul>
              { array.map((value,index)=> {

                 return <li  key={index} onClick={(e)=>copie(e)} ><Link to={`/article-view/${value._id}`}>{value.title}</Link> </li>;
                  })
               }
             
             </ul>
            

         </div>      
}

export default Search;