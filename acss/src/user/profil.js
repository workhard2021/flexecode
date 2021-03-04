import { set } from 'mongoose';
import React,{useEffect,useCallback,useState} from 'react';
import {Link,useParams,useHistory} from 'react-router-dom';
import * as API from '../api/config/api';
import '../containersite/css/profil.css';
 
const Profil=(props)=>{
          
          const history=useHistory()
          const {id}=useParams();
          const URL=`/user/view/${id}`;
          const [view,setView]=useState(null);
          const [up,setUp]=useState(false)
          const init =async()=>{
               const res= await  API.view(URL);
               if(res){ 
                 if(res.error){
                       setView(res.data)
                        setUp(true)
                 }else{
                      setView(res.data)
                 }

               }else{
                      console.warn('Actualiser la page')
               }
          };

          const deconnexion= async(x)=>{
               const res= await API.deconnexionDeni(`/user/deconnexion/${x}`);
                if(res){
                        if(res.data){
                               localStorage.clear(); 
                        }
                         history.push('/article');   
                }else{
                    
                     history.push('/article');
                }
          }

          useEffect(()=>{
                init()
               
          },[up])
          
          if(!up){
                return null
          }
         
      return <div className='item_user'>
              <div className='btn_home_formulaire' onClick={()=>history.push('/article/')}><i className="far fa-times-circle"></i></div>
              {view.imageUrl? <img src={view.imageUrl} alt='profil images'/> :<i class="far fa-user icon_user_annonyme"></i> }
              <div className='title_user'>
                      <div className='info'>
                         <div className='dot'><span>Nom complet</span>: {view.fullName}</div>
                         <div className='dot'><span>Email </span>: {view.email}</div>
                      </div>
                      <div className='btn'>
                             <div className='dot'><Link to={ `/user/update-profil/${view._id}`}><i class="far fa-user">Paramettre</i> </Link></div>
                             <div className='dot'onClick={()=>deconnexion(view._id)}><i class="fas fa-sign-out-alt"> Deconnexion</i></div>
                             <div className='dot' ><Link href={`/delete-compte/${view._id}`}> <i class="far fa-trash-alt"> Delete</i></Link></div>
                      </div>
              </div>
           </div>
}

export default Profil