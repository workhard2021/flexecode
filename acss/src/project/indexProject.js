import React from 'react';
import { Route} from 'react-router-dom';
import Create from './create';
import Update from './update';
import Categorie from './categorie';
import CategorieView from './categorieView';

import MenagerCategorieView from './menager-categorie-view';
import MenagerCategorie from './menager-categorie';

const IndexProject=(props)=>{
	  const user=props.user;
	  
	   return <>
				   {/* <Route exact path='/project/' render={(props)=> (<All  {...props}/>)}/>
		           <Route exact path='/project-view/:id' render={(props)=> (<View {...props}/>)}/> */}
				  
				   {user.connexion && 
				      <>
		              <Route exact path='/project/create' render={(props)=> (<Create user={user} {...props}/>)}/>
		              <Route exact path='/project/update/:id' render={(props)=> (<Update user={user}  {...props}/>)}/>		      
					  <Route exact path='/project/menager-categorie/' render={(props)=> (<MenagerCategorie user={user}  {...props}/>)}/>
				      <Route exact path='/project/menager-categorie/:categorie' render={(props)=> (<MenagerCategorieView user={user}  {...props}/>)}/>
					 </>
				   }
				   <Route exact path='/project/categorie' render={(props)=> (<Categorie {...props}/>)}/>
				   <Route exact path='/project/categorie/:categorie' render={(props)=> (<CategorieView {...props}/>)}/>

				  
				 
	         </>
			 	  
			
}
export default IndexProject
