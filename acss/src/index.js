import React from 'react';
import ReactDom from 'react-dom';
import Article from './article/article';

const App=(props)=>{
	    
	    return <Article/>
}

ReactDom.render(<App/>,document.getElementById('root'))