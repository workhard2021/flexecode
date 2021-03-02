import React, { useState} from 'react';
import './css/formulaire.css';

const CreateComment=(props)=>{
      
      return <setion className="formulaire">
                <div className="title">Commantaire</div>
               <div className="login_sign">
                
                   <div className="item">
                            <p className={1==1?"valid_msg":"inValid_msg"}>Veuillez renseigner les champs merci de votre comprehensi sdsdsd sdsdsd coucu je suis soule aet vous </p>
                   </div>

                   <div  className="item">
                        <label htmlFor="fullName">Nom utilisateur <span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <input id="fullName" type="text" name="fullName" placeholder="Votre nom d'utilisateur"/>
                   </div>

                   <div  className="item">
                        <label htmlFor="comment">Commantaire<span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <textarea id="comment"  name="comment" placeholder="Commentaire"></textarea>
                   </div> 

                   <div  className="item ">
                       <button>Envoyer </button>
                   </div>

               </div>
             
        </setion>   
}
export default CreateComment