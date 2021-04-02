import React from 'react';
import {Link} from 'react-router-dom';
import '../containersite/css/panel.css';
const PanelUser=(props)=>{
   

  return <section className="panel">
            <ul>
              <li><Link to='/user/liste-user/'>Utilisateur</Link></li>
            </ul>  
       </section>

}

export default  PanelUser