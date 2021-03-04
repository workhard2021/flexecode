import React from 'react';
import {Link} from 'react-router-dom';

const PanelUser=(props)=>{
   

  return <section>
            <h1>Menager user</h1>
            <ul>
              <li><Link to='/user/liste-user/'>Menager utilisateur</Link></li>
            </ul>  
       </section>

}

export default  PanelUser