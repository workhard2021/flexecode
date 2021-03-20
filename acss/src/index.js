import React, { useState } from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';


import Menu from './containersite/menu';
 import Logo from './containersite/logo';
import IndexUser from './user/indexUser';
import IndexPropject from './project/indexProject';
import IndexArticle from './article/indexArticle';

const App=(props)=>{

	 const useInfo=localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):{};
	
	 const [user,setUser]=useState(useInfo);
	
	 const initUser=(x)=>{
		   setUser(x)
	 }
	    return  <Router> 
			         <Menu user={user} initUser={initUser}/>	
					 <Logo/>
			        <Switch>
			             <Route path="/user"> 
						    <IndexUser initUser={initUser}/>
						 </Route>
					     <Route path="/project">
						    <IndexPropject/>
						 </Route>
						<Route path="/">
						   <IndexArticle/>
						</Route>

				    </Switch>
		        </Router>
}
ReactDom.render(<App/>,document.getElementById('root'))