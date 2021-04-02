import React, {useState } from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

import PanelUser from './user/panelUser';
import PanelArticle from './article/panelArticle';
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
					 {user.role==='admin' && user.role!==undefined && 
					    <>
					       <PanelArticle />
						   <PanelUser/>  
						</>
					  }
			        <Switch>
				
			             <Route path="/user"> 
						    <IndexUser user={user} initUser={initUser}/>
						 </Route>
                        
					     <Route path="/project">
						    <IndexPropject user={user} initUser={initUser} />
						 </Route>
						<Route path="/">
						   <IndexArticle user={user} initUser={initUser} />
						</Route>

				    </Switch>
		        </Router>
}
ReactDom.render(<App/>,document.getElementById('root'))