import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import '../css/all.css';
import * as API from '../api/config/api';
import Item from '../article/categorie-item';

const Categorie=(props)=>{
          const history=useHistory();
          const x=history.location.pathname.split('/')[3];
          
          const [all,setAll]=useState({data:[],loading:false})


        useEffect(()=>{

               const url=`/app/search/${x}`;
               API.getCategorie(setAll,url);

         },[x])
        
  if(all.loading){

           return <div className='wrapper'>
                       
                       {all.data.length !==0 ?
                           <Item arrayCategorie={all.data} categorie={all.data[0].categorie}/>

                            :
                            history.push('/app/searchs/error')
                       }

                  </div>
      }else{
           return <div className='wrapper'>Chargement...</div>
      }
        
}
export default  Categorie