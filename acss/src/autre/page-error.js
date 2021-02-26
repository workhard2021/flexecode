import React from 'react';
import {Route,Switch,Link} from 'react-router-dom';
import '../css/pageError.css';

const PageError=(props)=>{
     
    return <Switch> 
               <Route exact path='/app/autre' component={Page_1} />
               <Route exact path='/app/error' render={Page} />
               <Route exact path='/app/searchs/error' component={PageErrorSearch} />
           </Switch>
   }

export const Page_1=(props)=>{
	  return <div className='pageError'>
                  <h1>Ressource est indisponible</h1>
             </div>
}

export const Page=(props)=>{
        
         

	  return <div className='loading'>

                 <div className='pageError'>
                   <h4> cet article n'est pas disponible </h4>
                   <p>Veuillez  <Link to="/" style={{color:'brown'}}> cliquer ici </Link> pour retourner la page d'accueil</p>
                </div>

            </div>
}

export const PageErrorSearch=(props)=>{
    return <div className='wrapper'><div className='pageErrorSearch wrapper'>
                   <h3>Aucun resultat trouvé <Link to="/"> Retour</Link> </h3>
                    
             </div>
             </div>
}


export default PageError;