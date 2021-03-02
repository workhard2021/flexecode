import React, { useState} from 'react';
import './css/formulaire.css';

const UpdateProfil=(props)=>{
      

      return <setion className="formulaire">
                <div className="title">Modifier vos informations</div>
               <div className="login_sign">
                   
                   <div className="item">
                             <span className="btn_redirection"> <i class="fas fa-times-circle"></i></span>
                   </div>
                   <div className="item">
                            <p className={1==1?"valid_msg":"inValid_msg"}>Veuillez renseigner les champs merci de votre comprehensi sdsdsd sdsdsd coucu je suis soule aet vous </p>
                   </div>

                   <div  className="item">
                        <label htmlFor="fullName">Nom utilisateur <span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <input id="fullName" type="text" name="fullName" placeholder="Nom utilisateur"/>
                   </div>
                   <div  className="item">
                        <label htmlFor="email">Email <span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <input id="email" type="email" name="email" placeholder="Votre email"/>
                   </div>

                   <div  className="item">
                        <label htmlFor="image"> <span className="image" >image</span> <span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <input id="image" type="file" name="image"/>
                   </div> 
                   
                   <div  className="item">
                        <label htmlFor="password">Nouveau mot de passe <span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <input id="password" type="password" name="password" placeholder="Nouveau password"/>
                   </div>

                   <div  className="item">
                        <label htmlFor="password2">Ancian mot de passe <span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <input id="password2" type="password" name="password2" placeholder="Ancien mot de passe"/>
                   </div>

                   <div  className="item ">
                       <button>Modifier</button>
                   </div>
                
               </div>
             
        </setion>   
}
export default UpdateProfil