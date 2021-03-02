import React from 'react';
import ReactDom from 'react-dom';

import Menu from './containersite/menu';
import Logo from './containersite/logo';
import Card from './containersite/card';
import CardProject from './containersite/cardProject';
import ViewVideo from './containersite/viewVideo';

const App=(props)=>{
	    
	    return <>
		            <Menu/>	
					<Logo/>	
					<ViewVideo/>  
		       </>
}

ReactDom.render(<App/>,document.getElementById('root'))