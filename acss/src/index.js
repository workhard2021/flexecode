import React from 'react';
import ReactDom from 'react-dom';

import User from './user/user';
import Article from './article/article';
import Project from './project/project';

const App=(props)=>{
	    
	    return <>
		            <User/>
		            <Project/>
		            <Article/>
		       </>
}

ReactDom.render(<App/>,document.getElementById('root'))