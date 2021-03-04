import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import All from './all';
import View from './view';
import Create from './create';
import Update from './update';
import PanelProject from './panel-project';
import Categorie from './categorie';
import CategorieView from './categorieView';

import MenagerCategorieView from './menager-categorie-view';
import MenagerCategorie from './menager-categorie';

const IndexProject=(props)=>{
	  	      
	  return <Router>
				 {/* <PanelProject/> */}
		         <Switch>
				   <Route exact path='/project/' render={(props)=> (<All {...props}/>)}/>
		           <Route exact path='/project-view/:id' render={(props)=> (<View {...props}/>)}/>
		           <Route exact path='/project/create' render={(props)=> (<Create {...props}/>)}/>
		           <Route exact path='/project/update/:id' render={(props)=> (<Update {...props}/>)}/>
				   <Route exact path='/project/categorie' render={(props)=> (<Categorie {...props}/>)}/>
				   <Route exact path='/project/categorie/:categorie' render={(props)=> (<CategorieView {...props}/>)}/>
				   
				   <Route exact path='/project/menager-categorie' render={(props)=> (<MenagerCategorie {...props}/>)}/>
				   <Route exact path='/project/menager-categorie/:categorie' render={(props)=> (<MenagerCategorieView {...props}/>)}/>
				 </Switch>
	         </Router>
}
export default IndexProject
