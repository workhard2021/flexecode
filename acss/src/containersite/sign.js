import React, { useState} from 'react';
import './css/formulaire.css';

const Sign=(props)=>{
      
      return <setion className="formulaire">
                <div className="title">S'inscrire</div>
               <div className="login_sign">
                   
                   <div className="item">
                             <span className="btn_redirection"> <i class="fas fa-times-circle"></i></span>
                   </div>
                   <div className="item">
                            <p className={1==1?"valid_msg":"inValid_msg"}>Veuillez renseigner les champs merci de votre comprehensi sdsdsd sdsdsd coucu je suis soule aet vous </p>
                   </div>
                   <div  className="item">
                        <label htmlFor="email">Email <span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <input id="email" type="email" name="email" placeholder="Votre email"/>
                   </div>

                   <div  className="item">
                        <label htmlFor="fullName">Nom utilisateur <span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <input id="fullName" type="text" name="fullName" placeholder="Nom utilisateur"/>
                   </div>
                   <div  className="item">
                        <label htmlFor="password">Mot de passe <span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <input id="password" type="password" name="password" placeholder="Mot de passe"/>
                   </div>

                   <div  className="item ">
                       <button>S'inscrire</button>
                   </div>
                   <div className="item btn">
                           <a href="">Se connecter</a>
                   </div>
                   
               </div>
             
        </setion>   
}
export default Sign