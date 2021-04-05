import React from 'react';
import {Route} from 'react-router-dom';
// import All from './all';
import View from './view';
import Create from './create';
import Update from './update';
import Categorie from './categorie';
import CategorieView from './categorieView';
import MenagerCategorieView from './menager-categorie-view';
import MenagerCategorie from './menager-categorie';
import Accueil from '../containersite/accueil';

const IndexArticle=(props)=>{
	  	    const {user}=props;
	  return <>
	          
				 { user.role==='admin' &&  
				  <>
				     <Route exact path='/article/create' render={(props)=> (<Create {...props}/>)}/>
		             <Route exact path='/article/update/:id' render={(props)=> (<Update {...props}/>)}/>
			 		 <Route exact path='/article/menager-categorie' render={(props)=> (<MenagerCategorie user={user} {...props}/>)}/>
				     <Route exact path='/article/menager-categorie/:categorie' render={(props)=> (<MenagerCategorieView user={user} {...props}/>)}/>
				  </>
				 } 
				   <Route exact path='/' render={(props)=> (<Accueil {...props}/>)}/> 
		           <Route exact path='/article-view/:id' render={(props)=> (<View  user={user} {...props}/>)}/>
				   <Route exact path='/article/categorie' render={(props)=> (<Categorie {...props}/>)}/>
				   <Route exact path='/article/categorie/:categorie' render={(props)=> (<CategorieView {...props}/>)}/>
				          
	         </>
}
export default IndexArticle
