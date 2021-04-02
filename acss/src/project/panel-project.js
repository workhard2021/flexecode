import React from 'react';
import {Link} from 'react-router-dom';
import '../containersite/css/panel.css';
const PanelProject=(props)=>{
     
  return <section className="panel">
            <h1>Gestion project</h1>
            <ul>
              <li><Link to='/project/categorie'>Categorie</Link></li>
              <li><Link to='/project/create'>Create Project</Link></li>
              <li><Link to='/project/menager-categorie'>Menager</Link></li>
            </ul>  
       </section>

}

export default  PanelProject