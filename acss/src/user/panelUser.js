import React from 'react';
import {Link} from 'react-router-dom';

const PanelUser=(props)=>{
   

  return <section>
                           <h1>Project</h1>

            <ul>
              <li><Link to='/user/sign'>S'inscrire</Link></li>
              <li><Link to='/user/login'>Se connecter</Link></li>
              <li><Link to='/user/user-menager/'>Menager utilisateur</Link></li>
            </ul>  
       </section>

}

export default  PanelUser