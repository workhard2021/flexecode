import React from 'react';
import {Link} from 'react-router-dom';
import '../containersite/css/panel.css';

const PanelArticle=(props)=>{
   

  return <section className="panel">
               <h1>Gestion</h1>
            <ul>
              <li><Link to='/article/create'>Create article</Link></li>
              <li><Link to='/article/menager-categorie'> Article</Link></li>
            </ul>  
       </section>

}

export default  PanelArticle