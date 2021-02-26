import React from 'react';
import ReactDom from 'react-dom';
import Article from './article/article';
import Project from './project/project';

const App=(props)=>{
	    
	    return <>
		            <Article/>
		            <Project/>
		       </>
}

ReactDom.render(<App/>,document.getElementById('root'))