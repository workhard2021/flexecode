import React from 'react';
import {Link} from 'react-router-dom';

const PanelProject=(props)=>{
   

  return <section>
                           <h1>Project</h1>

            <ul>
              <li><Link to='/project/categorie'>Categorie  for user</Link></li>
              <li><Link to='/project/create'>Create Project</Link></li>
              <li><Link to='/project/menager-categorie'>Menager</Link></li>
            </ul>  
       </section>

}

export default  PanelProject