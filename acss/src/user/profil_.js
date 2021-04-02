import React, { useState,useCallback,useEffect} from 'react';
import {Link,useHistory,useParams} from 'react-router-dom';
import  * as API from '../api/config/api';
import '../containersite/css/profil.css';
import UpdateProfil from './update-profil';
const Profil=(props)=>{
     
          const history=useHistory();
          const [active,setActive]=useState({p:true});
          const {id}=useParams();
          const {initUser}=props;
          const [alert,setAlert]=useState(false);
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
      
            const destroy= async()=>{
                    const res= await API.destroy(`/user/destroy/${id}`);
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
          
      return <div className='user'>
              
              <ul id="panel" className="dot">
                <li className={active.p?'active':''} onClick={(state)=>setActive({...state,m:false,g:false,p:true})}> <span >Profil</span></li>
                <li className={active.m?'active':''} onClick={(state)=>setActive({...state,m:true,g:false,p:false})}> <span >Modifier</span></li>
                <li className={active.g?'active':''} onClick={(state)=>setActive({...state,m:false,g:true,p:false})}> <span>Gestion project</span></li>
              </ul>
              { active.p && <>
              <section id="profil" className="dot">
                   <img src={view.imageUser} alt="logo"/>
                   <p>{view.comment}</p>
              </section>

     
              <section id="apropos" className="dot">
                    <h4>A propos de moi</h4>
                    
                    <span><b>Nom: </b>{view.fullName}</span>
                    <span><b>address email: </b>{view.email}</span>

                    <span> <b>Compte github: </b> <Link t="dkksdkk">{view.linkGithub}</Link></span>
              </section>
              <section id="supprimer" className="dot">
                   <h4>Supprimer son compte</h4>
                   <span className="btn" onClick={()=>setAlert(!alert)}>{alert? 'Annuler':'Supprimer'}</span>
                   {alert && <p> Cette action est irreversible<span className='confirm' onClick={()=>destroy()}>Confirmez</span></p>}
              </section>
              
              </>
              }
              { active.m &&
                 <section id="update-profil" className='dot'>
                  <UpdateProfil id={id && id} initUser={initUser}/>
                 </section>
              } 
               { active.g &&
         
                   <ul id="gestion_project" className='dot'>
                       <li><Link to="/project/create">Create un project</Link></li>
                       <li><Link to="/project/menager-categorie">Vos projects</Link></li>
                  </ul>
               
              } 
             </div>
}

export default Profil