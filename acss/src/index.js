import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';


import Menu from './containersite/menu';
import Logo from './containersite/logo';
import IndexUser from './user/indexUser';


const App=(props)=>{
	    
	    return  <Router> 
			            <Menu/>	
					    <IndexUser/>
		        </Router>
}

ReactDom.render(<App/>,document.getElementById('root'))