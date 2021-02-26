import React from 'react';
import {Link} from 'react-router-dom';

const PanelArticle=(props)=>{
   

  return <section>
               <h1>Article</h1>
            <ul>
              <li><Link to='/article/categorie'>Categorie  for user</Link></li>
              <li><Link to='/article/create'>Create Project</Link></li>
              <li><Link to='/article/menager-categorie'>Menager</Link></li>
            </ul>  
       </section>

}

export default  PanelArticle