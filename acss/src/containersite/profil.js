import React, { useState} from 'react';
import {Link,useHistory } from 'react-router-dom';
import './css/profil.css';
const Profil=(props)=>{
     const user={}
     const history=useHistory()
     const deconnexion=()=>{
                alert('dsd') 
      }
      
      return <div className='item_user'>
              <div className='btn_home_formulaire'><i className="far fa-times-circle"></i></div>
              {1===2? <img src={user.image} alt='profil images'/> :<i class="far fa-user icon_user_annonyme"></i> }
              <div className='title_user'>
                      <div className='info'>
                         <div className='dot'><span>Nom complet</span>: {user.fullName}</div>
                         <div className='dot'><span>Email </span>: {user.email}</div>
                         <div className='dot'><span>Tel </span>: {user.tel}</div>
                      </div>
                      <div className='btn'>
                             <div className='dot'><a href={`/update-profil/${user.id}`}> <i class="far fa-user">Paramettre</i> </a></div>
                             <div className='dot' onClick={ (e)=>deconnexion(e) }><i class="fas fa-sign-out-alt"> Deconnexion</i></div>
                             <div className='dot' ><a href={`/delete-compte/${user.id}`}> <i class="far fa-trash-alt"> Delete</i></a></div>
                      </div>
              </div>
           </div>
}

export default Profil