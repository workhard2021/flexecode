import React, { useState} from 'react';
import './css/formulaire.css';

const CreateArticle=(props)=>{
      
      return <section className="formulaire">
                <div className="title">Creer article</div>
               <div className="login_sign">
                   
                   <div className="item">
                             <span className="btn_redirection"> <i class="fas fa-times-circle"></i></span>
                   </div>
                   <div className="item">
                            <p className={1==1?"valid_msg":"inValid_msg"}>Veuillez renseigner les champs merci de votre comprehensi sdsdsd sdsdsd coucu je suis soule aet vous </p>
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
                        <label htmlFor="title">Titre <span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <input id="title" type="text" name="title" placeholder="Titre"/>
                   </div>

                   <div  className="item">
                        <label htmlFor="linkGithub">Link Github <span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <input id="linkGithub" type="text" name="linkGithub" placeholder="lien github"/>
                   </div>

                   <div  className="item">
                        <label htmlFor="linkYoutube">Lien Youtube <span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <input id="linkYoutube" type="text" name="linkYoutube" placeholder="lien Youtube"/>
                   </div>

                   <div  className="item">
                        <label htmlFor="codeSource">Code php <span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <input id="codeSource" type="text" name="php" placeholder="Code php"/>
                   </div>


                   <div  className="item">
                        <label htmlFor="image"> <span className="image" >image</span> <span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <input id="image" type="file" name="image"/>
                   </div> 


                   <div  className="item">
                        <label htmlFor="comment">Commantaire<span className={1==1 ? "valid":"inValid"} > veuillez remplir le tableu</span></label>
                        <textarea id="comment"  name="comment" placeholder="Commentaire"></textarea>
                   </div> 
                   <div  className="item ">
                       <button>Envoyer</button>
                   </div>

               </div>
             
        </section>   
}
export default CreateArticle