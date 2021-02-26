import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import All from './all';
import View from './view';
import Create from './create';
const Article=(props)=>{
	  	      
	  return <Router>
		         <Switch>
				   <Route exact path='/' render={(props)=> (<All {...props}/>)}/>
		           <Route exact path='/view/:id' render={(props)=> (<View {...props}/>)}/>
		           <Route exact path='/create' render={(props)=> (<Create {...props}/>)}/>
				 </Switch>
	         </Router>
}
export default Article
