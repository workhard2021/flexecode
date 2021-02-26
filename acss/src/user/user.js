import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';

import Profil from './profil';
import Sign from './sign';
import Login from './login';
import Update from './update';
import MenagerUser from './menager-user';
import PanelUser from './panelUser'

const Project=(props)=>{
	  	      
	  return <Router>
				   <PanelUser/>
		         <Switch>
				 
				   <Route exact path='/user/profil/:id' render={(props)=> (<Profil {...props}/>)}/>
				   <Route exact path='/user/update/:id' render={(props)=> (<Update {...props}/>)}/>
				   <Route exact path='/user/sign/' render={(props)=> (<Sign {...props}/>)}/>
				   <Route exact path='/user/login/' render={(props)=> (<Login {...props}/>)}/>
                  
				   <Route exact path='/user/user-menager/' render={(props)=> (<MenagerUser {...props}/>)}/>

				 </Switch>
	         </Router>
}
export default Project
