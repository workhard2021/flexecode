import React from 'react';
import ReactDom from 'react-dom';

import User from './user/user';

const App=(props)=>{
	    
	    return <>
		            <User/>
		         
		       </>
}

ReactDom.render(<App/>,document.getElementById('root'))