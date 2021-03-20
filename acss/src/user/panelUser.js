import React from 'react';
import {Link} from 'react-router-dom';
import '../containersite/css/panel.css';
const PanelUser=(props)=>{
   

  return <section className="panel">
            <h1>Menager user</h1>
            <ul>
              <li><Link to='/user/liste-user/'>Menager utilisateur</Link></li>
            </ul>  
       </section>

}

export default  PanelUser