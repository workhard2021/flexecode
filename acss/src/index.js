import React, {useState } from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

import Menu from './containersite/menu';
import IndexUser from './user/indexUser';
import IndexPropject from './project/indexProject';
import IndexArticle from './article/indexArticle';
import FooterPage from './containersite/footer';
const App=(props)=>{

	 const useInfo=localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):{};
	
	 const [user,setUser]=useState(useInfo);
	
	 const initUser=(x)=>{
		   setUser(x)
	 }
	    return  <Router>
		     	
			        <Menu user={user} initUser={initUser}/>	
				    <main>
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
					</main>
					<FooterPage/>
					
		        </Router>
}

ReactDom.render(<App/>,document.getElementById('root'))