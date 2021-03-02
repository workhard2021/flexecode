import React, { useState} from 'react';
import './css/formulaire.css';

const Login=(props)=>{
      
    
      return <setion className="formulaire">
                <div className="title">Se connecter</div>
               <div className="login_sign">
                   
                   <div className="item">
                             <span className="btn_redirection"> <i class="fas fa-times-circle"></i></span>
                   </div>
                   <div className="item">
                            <p className={1==1?"valid_msg":"inValid_msg"}>Veuillez renseigner les champs merci de votre comprehensi sdsdsd sdsdsd coucu je suis soule aet vous </p>
                   </div>
                   <div  className="item">
                        <label>Email <span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <input type="email" name="email" placeholder="Nom utilisateur"/>
                   </div>

                    <div  className="item">
                        <label htmlFor="select">Selection</label>
                          <div id="select_item">
                             <select id="select" name="categorie" >
                                 <option >itme 2</option>
                                 <option >itme 2</option>
                                 <option >itme 2</option>
                            </select>
                          </div>
                    </div> 

                   <div  className="item">
                        <label htmlFor="image"> <span className="image" >image</span> <span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <input id="image" type="file" name="image"/>
                   </div> 


                   <div  className="item">
                        <label>Commantaire<span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <textarea  name="comment" placeholder="Commentaire"></textarea>
                   </div> 

                   <div  className="item ">
                       <button>Se connecter</button>
                   </div>
                   <div className="item btn">
                           <a href="">Mot de passe oublier</a>
                   </div>
                   
               </div>
             
        </setion>   
}
export default Login