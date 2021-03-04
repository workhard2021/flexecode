import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';


import Menu from './containersite/menu';
 import Logo from './containersite/logo';
import IndexUser from './user/indexUser';
import IndexPropject from './project/indexProject';
import IndexArticle from './article/indexArticle';

const App=(props)=>{
	    
	    return  <Router> 
			            <Menu/>	
						 <Logo/>
					     <IndexUser/>
						 <IndexPropject/>
						 <IndexArticle/>
		        </Router>
}

ReactDom.render(<App/>,document.getElementById('root'))