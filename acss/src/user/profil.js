import React,{useEffect,useCallback,useState} from 'react';
import {Link,useParams,useHistory} from 'react-router-dom';
import * as API from '../api/config/api';
import '../containersite/css/profil.css';
 
const Profil=(props)=>{
          
          const history=useHistory()
          const {id}=useParams();
          const {initUser}=props;
          const URL=`/user/view/${id}`;

          const [view,setView]=useState({});
     
          const init =useCallback(async()=>{
               const res= await  API.view(URL);
               if(res){

                 if(res.error) {

                        setView(res.data)
                 }else{
                        setView({})
                 }

               }

          },[URL]);

          const logOut= async (x)=>{
     
              const res=await API.deconnexionDeni(`/user/deconnexion/${x}`);
              if(res.error){
                     
                     localStorage.removeItem('user')
                     history.push('/');
                     initUser({})
               
              }else{
                     history.push('/');   
              }

            }
            const destroy= async(x)=>{
                    const res= await API.destroy(`/user/destroy/${x}`);
                    if(res){
                         
                         if(res.error){
                                   localStorage.clear();
                                   initUser({});  
                                   history.push('/')
                          }else{
                                 history.push('/');
                          }
                      
                    }
            }
            
          useEffect(()=>{
                init()
          },[init])
          
     
      return <div className='item_user'>
              <div className='btn_home_formulaire' onClick={()=>history.push('/article/')}><i className="far fa-times-circle"></i></div>
              {view.imageUrl? <img src={view.imageUrl} alt='profil images'/> :<i className="far fa-user icon_user_annonyme"></i> }
              <div className='title_user'>
                      <div className='info'>
                         <div className='dot'><span>Nom complet</span>: {view.fullName}</div>
                         <div className='dot'><span>Email </span>: {view.email}</div>
                      </div>
                      <div className='btn'>
                             <div className='dot'><Link to={ `/user/update-profil/${view._id}`}><i className="far fa-user">Paramettre</i> </Link></div>
                             <div className='dot'onClick={()=>logOut(view._id)}><i className="fas fa-sign-out-alt"> Deconnexion</i></div>
                             <div className='dot' ><Link to="#" onClick={()=>destroy(view._id)}> <i className="far fa-trash-alt"> Delete</i></Link></div>
                      </div>
              </div>
           </div>
}

export default Profil