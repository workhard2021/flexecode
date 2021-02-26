import React from 'react';
import '../css/pagination.css';
const Pagination =(props)=>{
       
        const {currentPage,pageTotal,prev,next}=props;

	   	   if(pageTotal>1){ 
	   	     return <div className='pagination'> 

	   	            <button onClick={()=>prev()}>prev</button>
	   	                {currentPage}/{pageTotal}
	   	             <button onClick={()=>next()}>next</button>

	   	           </div>;
	   	    }
	   	    else{
	   	           	  return '';
	   	    }	   	           
}

export default Pagination;
