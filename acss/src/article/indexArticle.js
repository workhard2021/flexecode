import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import All from './all';
import View from './view';
import Create from './create';
import Update from './update';
// import PanelArticle from './panelArticle';
import Categorie from './categorie';
import CategorieView from './categorieView';

import MenagerCategorieView from './menager-categorie-view';
import MenagerCategorie from './menager-categorie';

const IndexArticle=(props)=>{
	  	      
	  return <>
				 {/* <PanelArticle /> */}
		         <Switch>
				   <Route exact path='/' render={(props)=> (<All {...props}/>)}/>
		           <Route exact path='/article-view/:id' render={(props)=> (<View {...props}/>)}/>
		           <Route exact path='/article/create' render={(props)=> (<Create {...props}/>)}/>
		           <Route exact path='/article/update/:id' render={(props)=> (<Update {...props}/>)}/>
				   <Route exact path='/article/categorie' render={(props)=> (<Categorie {...props}/>)}/>
				   <Route exact path='/article/categorie/:categorie' render={(props)=> (<CategorieView {...props}/>)}/>
				   
				   <Route exact path='/article/menager-categorie' render={(props)=> (<MenagerCategorie {...props}/>)}/>
				   <Route exact path='/article/menager-categorie/:categorie' render={(props)=> (<MenagerCategorieView {...props}/>)}/>
				 </Switch>
	         </>
}
export default IndexArticle
